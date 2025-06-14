export interface BlogArticle {
  id: string;
  source: string;
  header: string;
  shortDescription: string;
  content: string;
  language: 'en' | 'ru';
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    source: "Example News",
    header: "First News Article",
    shortDescription: "This is a short description of the first news article.",
    content: `This is the full content of the first news article.\nYou can add more details here.`,
    language: 'en'
  },
  {
    id: "2",
    source: "Another Source",
    header: "Second News Article",
    shortDescription: "A brief summary of the second article.",
    content: `Full content for the second article goes here.\nAdd as much detail as needed.`,
    language: 'en'
  }
];