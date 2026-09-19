"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/lib/company";
import { JournalPostMeta } from "@/types/journal";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Check,
  ArrowRight,
  ListOrdered,
  User,
} from "lucide-react";

interface JournalLayoutProps {
  post: JournalPostMeta;
  children: React.ReactNode;
  headings?: Array<{ id: string; text: string; level?: number }>;
  nextPost?: { title: string; slug: string };
  prevPost?: { title: string; slug: string };
}

export function JournalLayout({
  post,
  children,
  headings = [],
  nextPost,
  prevPost,
}: JournalLayoutProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Derive author slug for profile linking (e.g. "pavan-duggirala")
  const authorSlug = post.author.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  // Article JSON-LD Structured Data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate || post.publishedAt,
    dateModified: post.isoDate || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.brandName,
      url: COMPANY.websiteUrl,
    },
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY.websiteUrl}/journal/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas text-heading relative selection:bg-brand/15 selection:text-brand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-brand to-brand-light transition-all duration-75 shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-5 sm:px-8 pt-28 sm:pt-36 pb-16">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors group font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>All Journals</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-hairline text-xs font-medium text-muted hover:text-heading hover:border-brand/40 transition-all cursor-pointer shadow-xs"
            aria-label="Share article"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand" />
                <span className="text-brand font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pb-6 border-b border-hairline mb-10">
          {/* Category & Type Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-ice-light text-brand text-xs font-semibold border border-brand/20">
              {post.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-subtle text-muted text-xs font-medium border border-hairline">
              {post.type}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-heading tracking-tight leading-[1.14]">
            {post.title}
          </h1>
        </header>

        {/* Table of Contents if headings provided */}
        {headings.length > 0 && (
          <nav className="mb-10 p-5 sm:p-6 rounded-2xl bg-surface border border-hairline shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-brand uppercase tracking-wider">
              <ListOrdered className="w-4 h-4" />
              <span>In This Journal Entry</span>
            </div>
            <ul className="space-y-2 text-sm">
              {headings.map((h, i) => (
                <li key={i} className={h.level === 3 ? "pl-4 text-xs" : ""}>
                  <a
                    href={`#${h.id}`}
                    className="text-body hover:text-brand transition-colors underline-offset-4 hover:underline"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body Content */}
        <article className="max-w-none">
          {children}
        </article>

        {/* Tags Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-hairline flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-surface border border-hairline text-xs text-body font-medium shadow-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio & Post Meta Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-surface border border-hairline shadow-sm space-y-4">
          {/* Top Row: Avatar + Name & Role Badge */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-brand/30 shrink-0 bg-ice-light shadow-xs">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand text-lg font-bold uppercase">
                  {post.author.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="space-y-1 min-w-0">
              <h4 className="font-display font-bold text-lg sm:text-xl text-heading">
                {post.author.name}
              </h4>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-ice-light text-brand text-[11px] font-semibold border border-brand/20 whitespace-nowrap">
                {post.author.role}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-body leading-relaxed w-full">
            {post.author.bio || `${post.author.role} at SolveMpire.`}
          </p>

          {/* Publishing Date, Read Time */}
          <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-muted">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                <span>{post.publishedAt}</span>
              </span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1.5 text-brand font-medium whitespace-nowrap">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/journal/${prevPost.slug}`}
              className="p-5 rounded-xl bg-surface border border-hairline hover:border-brand/40 hover:shadow-md transition-all text-left group shadow-xs"
            >
              <span className="text-xs text-muted block mb-1">← Previous Entry</span>
              <span className="font-display font-semibold text-sm text-heading group-hover:text-brand line-clamp-1">
                {prevPost.title}
              </span>
            </Link>
          ) : <div />}

          {nextPost && (
            <Link
              href={`/journal/${nextPost.slug}`}
              className="p-5 rounded-xl bg-surface border border-hairline hover:border-brand/40 hover:shadow-md transition-all text-right group ml-auto w-full shadow-xs"
            >
              <span className="text-xs text-muted block mb-1">Next Entry →</span>
              <span className="font-display font-semibold text-sm text-heading group-hover:text-brand line-clamp-1">
                {nextPost.title}
              </span>
            </Link>
          )}
        </div>


        {/* Bottom Engineering CTA Card */}
        <div id="contact-cta" className="mt-16 scroll-mt-24 p-8 sm:p-10 rounded-3xl bg-surface border border-hairline text-center space-y-6 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-ice-light text-brand mx-auto border border-brand/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-heading">
              Turn Your Engineering Concept Into Reality
            </h3>
            <p className="text-body text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Scope your mechanical design, custom PCB, firmware, or connected platform with SolveMpire&apos;s engineering architects.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-brand/25 transition-all"
            >
              <span>Scope Your Project in 60s</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}

