// API Key authentication utility

export function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!apiKey) {
    return false
  }

  // Get API key from environment variable
  const validApiKey = process.env.BLOG_API_KEY
  
  if (!validApiKey) {
    console.warn('BLOG_API_KEY environment variable is not set')
    return false
  }

  return apiKey === validApiKey
}

export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: 'Unauthorized. Valid API key required.' }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}