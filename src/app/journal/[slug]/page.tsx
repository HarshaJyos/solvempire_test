import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalLayout } from "@/components/journal/JournalLayout";
import { JournalJsonLd } from "@/components/journal/JournalJsonLd";
import { getAllJournalPosts, getPostBySlug } from "@/lib/journal-data";
import {
  EndToEndProductEngineeringArticle,
  tocWhatIsEndToEnd,
} from "@/components/journal/articles/EndToEndProductEngineeringArticle";
import {
  PhysicalProductManufacturingArticle,
  tocPhysicalProduct,
} from "@/components/journal/articles/PhysicalProductManufacturingArticle";
import {
  ProductEngineeringCompanyIndiaArticle,
  tocIndiaGuide,
} from "@/components/journal/articles/ProductEngineeringCompanyIndiaArticle";
import {
  CustomAutomatedMachineArticle,
  tocCustomMachine,
} from "@/components/journal/articles/CustomAutomatedMachineArticle";

export function generateStaticParams() {
  const posts = getAllJournalPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Journal Entry Not Found" };

  return {
    title: `${post.title} — SolveMpire Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
    },
  };
}

export default async function DynamicJournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllJournalPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : undefined;

  // Render article content and headings matching the slug
  let articleContent: React.ReactNode = null;
  let tableOfContents = tocWhatIsEndToEnd;

  switch (slug) {
    case "what-is-end-to-end-product-engineering":
      articleContent = <EndToEndProductEngineeringArticle post={post} />;
      tableOfContents = tocWhatIsEndToEnd;
      break;

    case "how-to-develop-a-physical-product-from-idea-to-manufacturing":
      articleContent = <PhysicalProductManufacturingArticle post={post} />;
      tableOfContents = tocPhysicalProduct;
      break;

    case "product-engineering-company-in-india":
      articleContent = <ProductEngineeringCompanyIndiaArticle post={post} />;
      tableOfContents = tocIndiaGuide;
      break;

    case "how-to-build-a-custom-automated-machine":
      articleContent = <CustomAutomatedMachineArticle post={post} />;
      tableOfContents = tocCustomMachine;
      break;

    default:
      articleContent = <EndToEndProductEngineeringArticle post={post} />;
      tableOfContents = tocWhatIsEndToEnd;
      break;
  }

  return (
    <>
      <JournalJsonLd post={post} />

      <JournalLayout
        post={post}
        headings={tableOfContents}
        prevPost={prevPost ? { title: prevPost.title, slug: prevPost.slug } : undefined}
        nextPost={nextPost ? { title: nextPost.title, slug: nextPost.slug } : undefined}
      >
        {articleContent}
      </JournalLayout>
    </>
  );
}
