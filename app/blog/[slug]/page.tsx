import React from "react";
import { BlogService } from "../../../lib/blog-service";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { CalendarDays, ExternalLink, ArrowLeft, Clock, User, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Force dynamic rendering and revalidate every 60 seconds
export const dynamic = 'force-dynamic';
export const revalidate = 60;

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
                   className="prose prose-lg sm:prose-xl lg:prose-2xl max-w-none text-foreground leading-relaxed font-serif prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground prose-p:mb-6 prose-p:leading-8 prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-code:font-mono prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:text-muted-foreground prose-blockquote:border-l-foreground prose-a:text-foreground prose-a:underline hover:prose-a:text-muted-foreground [&>p]:mb-6 [&>p:last-child]:mb-0 [&>p]:text-lg [&>p]:leading-8"
                   dangerouslySetInnerHTML={{ __html: article.content }}
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