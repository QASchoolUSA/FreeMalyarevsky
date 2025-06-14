import Link from "next/link";
import { blogArticles } from "../../../data/blog-data";

export default function BlogPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {blogArticles.filter(article => article.language === locale).map(article => (
          <div key={article.id} className="border rounded-lg p-4 bg-background shadow-sm">
            <div className="text-xs text-muted-foreground mb-1">Source: {article.source}</div>
            <h2 className="text-xl font-semibold mb-2">{article.header}</h2>
            <p className="mb-3">{article.shortDescription}</p>
            <Link href={`/${locale}/blog/${article.id}`} className="text-primary hover:underline font-medium">Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
}