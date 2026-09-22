import React from "react";
import type { Metadata } from "next";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { JournalDirectoryClient } from "@/components/journal/JournalDirectoryClient";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllJournalPosts } from "@/lib/journal-data";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Engineering Journal & Research Papers | SolveMpire",
  description:
    "Engineering in public: Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected physical products engineered at SolveMpire.",
  keywords: [
    "Hardware Engineering Journal",
    "Product Engineering White Papers",
    "Embedded Firmware Architecture",
    "Design for Manufacturing Principles",
    "Custom Machine Engineering",
    "SolveMpire Research",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/journal`,
  },
  openGraph: {
    title: "Engineering Journal & Research Papers | SolveMpire",
    description:
      "Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected physical products.",
    url: `${COMPANY.websiteUrl}/journal`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Journal & Research Papers | SolveMpire",
    description:
      "Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected physical products.",
  },
};

export default function JournalPage() {
  const allPosts = getAllJournalPosts();
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Journal", url: "/journal" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${COMPANY.websiteUrl}/journal/#blog`,
    name: "SolveMpire Engineering Journal",
    description:
      "Research papers, firmware architecture, and hardware engineering teardowns from SolveMpire.",
    url: `${COMPANY.websiteUrl}/journal`,
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: COMPANY.websiteUrl,
    },
    blogPost: allPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${COMPANY.websiteUrl}/journal/${post.slug}`,
      datePublished: post.isoDate,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={collectionSchema} />
      <IndiseaHeader />

      <main className="flex-1 w-full pt-36 pb-24">
        <div className="indisea-wrap">
          <JournalDirectoryClient />
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
