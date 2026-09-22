import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogMetas,
  getBlogArticleBySlug,
  getAdjacentBlogs,
} from "@/data/blogs";
import { A4PaperArticle } from "@/components/journal/A4PaperArticle";
import { buildBreadcrumbsJsonLd, buildJournalArticleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

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
    title: `${article.meta.title} — SolveMpire Engineering Journal`,
    description: article.meta.excerpt,
    keywords: [
      article.meta.category,
      ...(article.meta.tags || []),
      "Hardware Engineering Article",
      "SolveMpire Engineering Journal",
      "Product Development Guide",
    ],
    alternates: {
      canonical: `${COMPANY.websiteUrl}/journal/${article.meta.slug}`,
    },
    openGraph: {
      title: article.meta.title,
      description: article.meta.excerpt,
      type: "article",
      url: `${COMPANY.websiteUrl}/journal/${article.meta.slug}`,
      publishedTime: article.meta.isoDate,
      authors: [article.meta.author.name],
    },
    twitter: {
      card: "summary",
      title: article.meta.title,
      description: article.meta.excerpt,
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

  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Journal", url: "/journal" },
    { name: article.meta.title, url: `/journal/${article.meta.slug}` },
  ]);
  const articleSchema = buildJournalArticleJsonLd(article);

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={articleSchema} />
      <A4PaperArticle
        article={article}
        prevPost={prev}
        nextPost={next}
      />
    </>
  );
}

