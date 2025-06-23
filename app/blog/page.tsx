import Link from "next/link";
import { BlogService } from "../../lib/blog-service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { ExternalLink, Clock, User, ArrowRight, BookOpen } from "lucide-react";

export default async function BlogPage() {
  const articles = await BlogService.getAllPosts({ 
    published: true 
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative container mx-auto py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium mb-6 transition-colors">
              <BookOpen className="w-4 h-4" />
              Latest Updates
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
              News & Insights
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Stay informed with the latest developments, insights, and updates from our newsroom
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated daily
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {articles.length} articles
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article, index) => {
              const isLarge = index % 7 === 0 || index % 7 === 3;
              return (
                <Link href={`/blog/${article.slug}`} key={article.id}>
                  <Card 
                    className={`group hover:shadow-xl transition-all duration-300 border border-border bg-card hover:bg-muted/50 hover:scale-[1.01] overflow-hidden relative cursor-pointer ${
                      isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-center justify-start mb-4">
                        <Badge variant="outline" className="text-xs font-medium px-3 py-1.5 bg-foreground text-background border-foreground hover:bg-foreground/90 transition-colors">
                          <ExternalLink className="w-3 h-3 mr-1.5" />
                          {article.source}
                        </Badge>
                      </div>
                      <CardTitle className={`font-bold leading-tight text-foreground group-hover:text-foreground/80 transition-colors duration-300 ${
                        isLarge ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
                      }`}>
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 relative z-10">
                      <CardDescription className={`leading-relaxed text-muted-foreground ${
                        isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                      }`}>
                        {article.short_description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-0 relative z-10">
                      <div className="w-full flex items-center justify-between text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">No Articles Available</h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
              There are currently no articles available in this language. Please check back later for updates.
            </p>
            <Button asChild variant="outline" className="border-border hover:bg-foreground hover:text-background">
              <Link href="/">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}