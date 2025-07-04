import React from "react";
import { BlogService } from "../../../lib/blog-service";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { ExternalLink, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";

// Force dynamic rendering and revalidate every 60 seconds
export const dynamic = 'force-dynamic';
export const revalidate = 60;

// Helper function to convert [URL] text format to standard Markdown links
function convertCustomLinksToMarkdown(content: string): string {
  // Handle the format: [URL] text - convert to [text](URL)
  let result = content.replace(/\[([^\]]+)\]\s+([^\[\n]+?)(?=\s*\[|\n|$)/g, (match, url, text) => {
    // Check if URL is relative (starts with /) and prepend https://ovd.info
    const fullUrl = url.startsWith('/') ? `https://ovd.info${url}` : url;
    return `[${text.trim()}](${fullUrl})`;
  });
  
  // Handle standalone URLs in brackets [URL] without following text
  result = result.replace(/\[([^\]]+)\](?!\()/g, (match, url) => {
    // Check if URL is relative (starts with /) and prepend https://ovd.info
    const fullUrl = url.startsWith('/') ? `https://ovd.info${url}` : url;
    // Create user-friendly link text based on URL structure
    let linkText = 'Читать далее'; // Default "Read more" in Russian
    
    if (url.includes('/express-news/')) {
      linkText = 'ОВД Инфо';
    } else if (url.includes('/news/')) {
      linkText = 'Новость';
    } else if (url.includes('/article/')) {
      linkText = 'Статья';
    } else if (url.includes('/blog/')) {
      linkText = 'Блог';
    }
    
    return `[${linkText}](${fullUrl})`;
  });
  
  return result;
}

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = params;
  
  try {
    const article = await BlogService.getPostBySlug(slug);
    
    if (!article) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
          <div className="relative container mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Button asChild variant="outline" className="group hover:bg-foreground hover:text-background border-border">
                  <Link href="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
              
              {/* Article Header */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Badge variant="outline" className="text-sm font-medium px-4 py-2 bg-foreground text-background border-foreground">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {article.source}
                  </Badge>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {article.title}
                </h1>
                
                {/* {article.short_description && (
                  <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                    {article.short_description}
                  </p>
                )} */}
                

              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-border shadow-lg bg-card overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div 
                   className="prose prose-lg sm:prose-xl lg:prose-2xl max-w-none text-foreground leading-relaxed font-serif prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground prose-p:mb-6 prose-p:leading-8 prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-code:font-mono prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:text-muted-foreground prose-blockquote:border-l-foreground [&>p]:mb-6 [&>p:last-child]:mb-0 [&>p]:text-lg [&>p]:leading-8 [&_a]:bg-blue-100 [&_a]:border [&_a]:border-blue-300 [&_a]:px-2 [&_a]:py-1 [&_a]:rounded [&_a]:no-underline [&_a]:font-medium [&_a]:text-blue-700 [&_a]:transition-all [&_a]:duration-200 [&_a]:cursor-pointer [&_a]:inline-block hover:[&_a]:bg-blue-600 hover:[&_a]:text-white hover:[&_a]:border-blue-600 hover:[&_a]:shadow-md dark:[&_a]:bg-blue-900/40 dark:[&_a]:border-blue-600 dark:[&_a]:text-blue-200 dark:hover:[&_a]:bg-blue-500 dark:hover:[&_a]:text-white dark:hover:[&_a]:border-blue-500"
                   dangerouslySetInnerHTML={{ __html: marked(convertCustomLinksToMarkdown(article.content)) }}
                 />
              </CardContent>
            </Card>

            {/* Article Footer */}
            <footer className="mt-12 sm:mt-16">
              <Card className="border border-border shadow-lg bg-muted/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Get the latest news and insights delivered directly to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild variant="default" className="group bg-foreground text-background hover:bg-foreground/90">
                        <Link href="/blog">
                          <BookOpen className="w-4 h-4 mr-2" />
                          More Articles
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="group border-border hover:bg-foreground hover:text-background">
                        <Link href="/">
                          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                          Back to Home
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </footer>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogSlugPageProps) {
  const { slug } = params;
  
  try {
    const article = await BlogService.getPostBySlug(slug);
    
    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }

    return {
      title: article.title,
      description: article.short_description || 'Read the latest news and insights.',
      openGraph: {
        title: article.title,
        description: article.short_description || 'Read the latest news and insights.',
        type: 'article',
        publishedTime: article.created_at,
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }
}