import { neon } from '@neondatabase/serverless'

// Neon PostgreSQL configuration
const sql = neon(process.env.DATABASE_URL!)

// Database types
export interface BlogPost {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  content: string
  short_description: string
  source: string
  language: 'en' | 'ru'
  published: boolean
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
export type BlogPostUpdate = Partial<BlogPostInsert>

// Export the SQL client
export { sql }