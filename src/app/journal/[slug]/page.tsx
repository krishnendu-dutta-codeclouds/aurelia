import { notFound } from "next/navigation";
import { getArticleBySlug, articles } from "@/lib/articles";
import ArticleClient from "./ArticleClient";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleClient article={article} />;
}
