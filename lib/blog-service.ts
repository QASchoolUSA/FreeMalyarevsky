import { sql, BlogPost, BlogPostInsert } from './neon'
import { generateSlug } from './utils'

export class BlogService {
  // Fetch all blog posts with optional filtering
  static async getAllPosts(options?: {
    language?: 'en' | 'ru'
    published?: boolean
  }): Promise<BlogPost[]> {
    try {
      let query = 'SELECT * FROM blog_posts'
      const conditions: string[] = []
      const params: any[] = []

      if (options?.language) {
        conditions.push(`language = $${params.length + 1}`)
        params.push(options.language)
      }

      if (options?.published !== undefined) {
        conditions.push(`published = $${params.length + 1}`)
        params.push(options.published)
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ')
      }

      query += ' ORDER BY created_at DESC'

      const result = await sql(query, params)
      return result as BlogPost[]
    } catch (error) {
      console.error('BlogService.getAllPosts error:', error)
      return []
    }
  }

  // Fetch a single blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const query = 'SELECT * FROM blog_posts WHERE slug = $1 AND published = true LIMIT 1'
      const result = await sql(query, [slug])
      
      return result.length > 0 ? result[0] as BlogPost : null
    } catch (error) {
      console.error('BlogService.getPostBySlug error:', error)
      return null
    }
  }

  // Fetch a single blog post by ID
  static async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const query = 'SELECT * FROM blog_posts WHERE id = $1 LIMIT 1'
      const result = await sql(query, [id])
      
      return result.length > 0 ? result[0] as BlogPost : null
    } catch (error) {
      console.error('BlogService.getPostById error:', error)
      return null
    }
  }

  // Create a new blog post
  static async createPost(postData: BlogPostInsert): Promise<BlogPost | null> {
    try {
      const query = `
        INSERT INTO blog_posts (title, slug, content, short_description, source, language, published)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `
      const params = [
        postData.title,
        postData.slug,
        postData.content,
        postData.short_description,
        postData.source,
        postData.language,
        postData.published
      ]
      
      const result = await sql(query, params)
      return result.length > 0 ? result[0] as BlogPost : null
    } catch (error) {
      console.error('BlogService.createPost error:', error)
      return null
    }
  }

  // Generate a URL-friendly slug from a title
  static generateSlug(title: string): string {
    return generateSlug(title)
  }

  // Check if a slug is available for a given language
  static async isSlugAvailable(
    slug: string,
    language: 'en' | 'ru',
    excludeId?: string
  ): Promise<boolean> {
    try {
      let query = 'SELECT id FROM blog_posts WHERE slug = $1 AND language = $2'
      const params: any[] = [slug, language]

      if (excludeId) {
        query += ' AND id != $3'
        params.push(excludeId)
      }

      query += ' LIMIT 1'
      
      const result = await sql(query, params)
      return result.length === 0 // If no results, slug is available
    } catch (error) {
      console.error('BlogService.isSlugAvailable error:', error)
      return false
    }
  }
}