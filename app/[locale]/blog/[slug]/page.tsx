import { blogArticles } from "../../../../data/blog-data";
import Link from "next/link";

export default function BlogArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const article = blogArticles.find(
    (a) => a.id === slug && a.language === locale
  );

  if (!article) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p>The article you are looking for does not exist in this language.</p>
        <Link href={`/${locale}/blog`} className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-2 text-xs text-muted-foreground">Source: {article.source}</div>
      <h1 className="text-3xl font-bold mb-4">{article.header}</h1>
      <div className="mb-6 text-lg">{article.shortDescription}</div>
      <div className="prose prose-lg max-w-none mb-8 whitespace-pre-line">{article.content}</div>
      <Link href={`/${locale}/blog`} className="text-primary hover:underline">Back to Blog</Link>
    </div>
  );
}