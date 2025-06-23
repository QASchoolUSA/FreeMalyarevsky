import { NextRequest, NextResponse } from 'next/server'
import { sql, BlogPostInsert } from '../../../lib/neon'
import { z } from 'zod'
import { validateApiKey, createUnauthorizedResponse } from '../../../lib/auth'
// Note: Markdown processing is now handled client-side with react-markdown

// Validation schema for blog post creation
const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  short_description: z.string().min(1, 'Short description is required'),
  source: z.string().min(1, 'Source is required'),
  language: z.enum(['en', 'ru']),
  published: z.boolean().default(true)
})

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')
    const published = searchParams.get('published')

    let query = 'SELECT * FROM blog_posts'
    const conditions: string[] = []
    const params: any[] = []

    if (language) {
      conditions.push(`language = $${params.length + 1}`)
      params.push(language)
    }

    if (published !== null) {
      conditions.push(`published = $${params.length + 1}`)
      params.push(published === 'true')
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY created_at DESC'

    const data = await sql(query, params)

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  // Check API key authentication
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = createBlogPostSchema.parse(body)
    
    // Check if slug already exists
    const existingPostQuery = 'SELECT id FROM blog_posts WHERE slug = $1 AND language = $2 LIMIT 1'
    const existingPost = await sql(existingPostQuery, [validatedData.slug, validatedData.language])

    if (existingPost.length > 0) {
      return NextResponse.json(
        { error: 'A post with this slug already exists in this language' },
        { status: 409 }
      )
    }

    // Insert the new blog post (store raw markdown)
    const insertQuery = `
      INSERT INTO blog_posts (title, slug, content, short_description, source, language, published)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `
    const insertParams = [
      validatedData.title,
      validatedData.slug,
      validatedData.content, // Store raw markdown instead of processed HTML
      validatedData.short_description,
      validatedData.source,
      validatedData.language,
      validatedData.published
    ]
    
    const result = await sql(insertQuery, insertParams)
    const data = result[0]

    return NextResponse.json(
      { message: 'Blog post created successfully', data },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}