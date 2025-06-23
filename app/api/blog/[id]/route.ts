import { NextRequest, NextResponse } from 'next/server'
import { sql, BlogPostUpdate } from '../../../../lib/neon'
import { z } from 'zod'
import { validateApiKey, createUnauthorizedResponse } from '../../../../lib/auth'
// Note: Markdown processing is now handled client-side with react-markdown

// Validation schema for blog post updates
const updateBlogPostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  short_description: z.string().min(1).optional(),
  source: z.string().min(1).optional(),
  language: z.enum(['en', 'ru']).optional(),
  published: z.boolean().optional()
})

// GET - Fetch a single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const query = 'SELECT * FROM blog_posts WHERE id = $1 LIMIT 1'
    const result = await sql(query, [params.id])

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: result[0] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update a blog post by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check API key authentication
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = updateBlogPostSchema.parse(body)
    
    // Content will be stored as raw markdown for client-side processing
    
    // Check if the post exists
    const existingPostQuery = 'SELECT id FROM blog_posts WHERE id = $1 LIMIT 1'
    const existingPost = await sql(existingPostQuery, [params.id])

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // If slug is being updated, check for conflicts
    if (validatedData.slug) {
      const conflictQuery = 'SELECT id FROM blog_posts WHERE slug = $1 AND language = $2 AND id != $3 LIMIT 1'
      const conflictingPost = await sql(conflictQuery, [
        validatedData.slug,
        validatedData.language || 'en',
        params.id
      ])

      if (conflictingPost.length > 0) {
        return NextResponse.json(
          { error: 'A post with this slug already exists in this language' },
          { status: 409 }
        )
      }
    }

    // Build dynamic update query
    const updateFields = Object.keys(validatedData)
    const setClause = updateFields.map((field, index) => `${field} = $${index + 1}`).join(', ')
    const updateQuery = `
      UPDATE blog_posts 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${updateFields.length + 1}
      RETURNING *
    `
    const updateParams = [...Object.values(validatedData), params.id]
    
    const result = await sql(updateQuery, updateParams)
    const data = result[0]

    return NextResponse.json(
      { message: 'Blog post updated successfully', data }
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

// DELETE - Delete a blog post by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check API key authentication
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    // Check if the post exists
    const existingPostQuery = 'SELECT id FROM blog_posts WHERE id = $1 LIMIT 1'
    const existingPost = await sql(existingPostQuery, [params.id])

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Delete the blog post
    const deleteQuery = 'DELETE FROM blog_posts WHERE id = $1'
    await sql(deleteQuery, [params.id])

    return NextResponse.json(
      { message: 'Blog post deleted successfully' }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}