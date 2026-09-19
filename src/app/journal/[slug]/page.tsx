import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogMetas,
  getBlogArticleBySlug,
  getAdjacentBlogs,
} from "@/data/blogs";
import { A4PaperArticle } from "@/components/journal/A4PaperArticle";

export function generateStaticParams() {
  const allMetas = getAllBlogMetas();
  return allMetas.map((meta) => ({
    slug: meta.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) return { title: "Article Not Found — SolveMpire Journal" };

  return {
    title: `${article.meta.title} — SolveMpire Journal`,
    description: article.meta.excerpt,
    openGraph: {
      title: article.meta.title,
      description: article.meta.excerpt,
      type: "article",
      publishedTime: article.meta.isoDate,
      authors: [article.meta.author.name],
    },
  };
}

export default async function DynamicJournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { prev, next } = getAdjacentBlogs(slug);

  return (
    <A4PaperArticle
      article={article}
      prevPost={prev}
      nextPost={next}
    />
  );
}
