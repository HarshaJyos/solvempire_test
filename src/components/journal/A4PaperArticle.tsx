"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/lib/company";
import { BlogArticleData, BlogSection } from "@/types/blog-article";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Check,
  User,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ListOrdered,
  Hash,
  Lightbulb,
  AlertCircle,
  Info,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface A4PaperArticleProps {
  article: BlogArticleData;
  prevPost?: { title: string; slug: string };
  nextPost?: { title: string; slug: string };
}

export function A4PaperArticle({ article, prevPost, nextPost }: A4PaperArticleProps) {
  const { meta, tableOfContents, sections, takeaways, faqs } = article;
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }

      // Track active heading for sidebar outline
      if (tableOfContents && tableOfContents.length > 0) {
        const headingElements = tableOfContents
          .map((item) => document.getElementById(item.id))
          .filter(Boolean) as HTMLElement[];

        for (let i = headingElements.length - 1; i >= 0; i--) {
          const el = headingElements[i];
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSectionId(el.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const authorSlug =
    meta.author.slug ||
    meta.author.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  // Schema.org TechArticle + FAQPage Structured Data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.isoDate || meta.publishedAt,
    dateModified: meta.isoDate || meta.publishedAt,
    author: {
      "@type": "Person",
      name: meta.author.name,
      jobTitle: meta.author.role,
      url: `${COMPANY.websiteUrl}/team/${authorSlug}`,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.brandName,
      url: COMPANY.websiteUrl,
    },
    articleSection: meta.category,
    keywords: meta.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY.websiteUrl}/journal/${meta.slug}`,
    },
  };

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas text-heading selection:bg-brand/15 selection:text-brand relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-brand to-brand-light transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 max-w-[860px] mx-auto xl:max-w-none">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>SolveMpire Journal</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-surface border border-slate-300 text-xs font-medium text-muted hover:text-heading hover:border-brand transition-all shadow-xs cursor-pointer"
              aria-label="Share article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand" />
                  <span className="text-brand font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Sticky Left Document Outline + Central A4 Document Sheet */}
        <div className="flex justify-center items-start gap-8 relative">
          {/* ========================================================================= */}
          {/* STICKY DOCUMENT OUTLINE SIDEBAR (Desktop Left Side, Hidden on Mobile) */}
          {/* ========================================================================= */}
          {tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden xl:block w-72 shrink-0 sticky top-28 space-y-4 select-none">
              <div className="bg-white border border-slate-300 rounded-none p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 text-xs font-bold text-brand uppercase tracking-wider">
                  <ListOrdered className="w-4 h-4" />
                  <span>Document Outline</span>
                </div>
                <nav>
                  <ul className="space-y-1 text-xs leading-normal max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {tableOfContents.map((item, idx) => {
                      const isActive = activeSectionId === item.id;
                      return (
                        <li key={item.id || idx}>
                          <a
                            href={`#${item.id}`}
                            className={cn(
                              "flex items-start gap-2 py-1.5 px-2 rounded-none transition-colors group text-left",
                              isActive
                                ? "bg-ice-light text-brand font-semibold border-l-2 border-brand"
                                : "text-slate-600 hover:text-brand hover:bg-slate-50"
                            )}
                          >
                            <span
                              className={cn(
                                "font-mono text-[10px] shrink-0 mt-0.5",
                                isActive
                                  ? "text-brand font-bold"
                                  : "text-slate-400 group-hover:text-brand"
                              )}
                            >
                              {String(idx + 1).padStart(2, "0")}.
                            </span>
                            <span className="line-clamp-2">
                              {item.title}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          {/* ========================================================================= */}
          {/* THE CRISP A4 DOCUMENT SHEET (Zero Rounded Corners, Pure Crisp Whitepaper) */}
          {/* ========================================================================= */}
          <div className="w-full max-w-[860px] flex-1 min-w-0">
            <article className="w-full bg-white border border-slate-300 rounded-none shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-10 md:p-14 lg:p-16 transition-all relative overflow-hidden break-words">
              {/* Article Title */}
              <header className="pb-6 mb-6 border-b border-slate-200">
                <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-[2.65rem] text-heading tracking-tight leading-[1.18]">
                  {meta.title}
                </h1>
              </header>

              {/* Document Body - Clean Linear Flow */}
              <div className="py-2 space-y-6 font-body text-body text-[15px] sm:text-[1.0625rem] leading-[1.8] text-slate-800">
                {sections.map((section, idx) => (
                  <RenderSection key={idx} section={section} />
                ))}
              </div>

              {/* Summary Takeaways Box */}
              {takeaways && takeaways.length > 0 && (
                <div className="my-10 p-6 sm:p-8 rounded-none bg-slate-50 border-l-4 border-l-brand border-y border-r border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-brand font-display font-bold text-base sm:text-lg">
                    <Sparkles className="w-5 h-5 shrink-0" />
                    <span>Executive Summary &amp; Key Takeaways</span>
                  </div>
                  <ul className="space-y-2.5 pt-2 text-sm sm:text-base text-slate-800">
                    {takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Frequently Asked Questions */}
              {faqs && faqs.length > 0 && (
                <section
                  className="my-12 pt-8 border-t border-slate-200 space-y-5 scroll-mt-24"
                  id="faq"
                >
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-ice-light border border-brand/20 text-xs font-semibold text-brand uppercase tracking-wider">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>FAQ Breakdown</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-heading tracking-tight">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2">
                    {faqs.map((faq, idx) => {
                      const isOpen = openFaqIndexes.includes(idx);
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "rounded-none border transition-all duration-200 overflow-hidden",
                            isOpen
                              ? "bg-slate-50/70 border-brand/40 shadow-xs"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                            aria-expanded={isOpen}
                          >
                            <span className="font-display font-semibold text-sm sm:text-base text-heading">
                              {faq.question}
                            </span>
                            <div
                              className={cn(
                                "w-7 h-7 rounded-none border flex items-center justify-center shrink-0 transition-transform duration-200",
                                isOpen
                                  ? "bg-ice-light border-brand/30 text-brand rotate-180"
                                  : "bg-slate-100 border-slate-200 text-slate-500"
                              )}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 pt-1 text-sm sm:text-base text-body leading-relaxed border-t border-slate-100">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Tags */}
              {meta.tags && meta.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted font-semibold mr-1">Filed under:</span>
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-none bg-slate-50 border border-slate-200 text-slate-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio & Merged Publication Details Box */}
              <div className="mt-12 p-6 sm:p-8 rounded-none bg-slate-50 border border-slate-300 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link
                    href={`/team/${authorSlug}`}
                    className="flex items-center gap-3.5 group focus:outline-none"
                  >
                    <div className="relative w-14 h-14 rounded-none overflow-hidden border border-slate-300 shrink-0 bg-ice-light group-hover:border-brand transition-colors">
                      {meta.author.avatar ? (
                        <Image
                          src={meta.author.avatar}
                          alt={meta.author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand text-lg font-bold uppercase">
                          {meta.author.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-lg text-heading group-hover:text-brand transition-colors">
                        {meta.author.name}
                      </h4>
                      <span className="inline-block text-xs font-semibold text-brand">
                        {meta.author.role}
                      </span>
                    </div>
                  </Link>

                  <Link
                    href={`/team/${authorSlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-white hover:bg-brand text-brand hover:text-white border border-brand/30 text-xs font-semibold transition-all shadow-xs self-start sm:self-auto group"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>View Author Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <p className="text-sm text-body leading-relaxed">
                  {meta.author.bio || `${meta.author.role} at SolveMpire.`}
                </p>

                {/* Merged Publication Date, Reading Time & Categories */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 opacity-70" />
                      <span>Published {meta.publishedAt}</span>
                    </span>
                    <span className="opacity-40">•</span>
                    <span className="inline-flex items-center gap-1.5 text-brand font-medium whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{meta.readTime}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-none bg-white border border-slate-200 text-slate-700 font-medium text-[11px]">
                      {meta.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-none bg-white border border-slate-200 text-slate-500 font-medium text-[11px]">
                      {meta.type}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Document Navigation - Next/Prev */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/journal/${prevPost.slug}`}
                  className="p-5 rounded-none bg-white border border-slate-300 hover:border-brand/50 shadow-xs hover:shadow-md transition-all text-left group"
                >
                  <span className="text-xs text-muted block mb-1">← Previous Article</span>
                  <span className="font-display font-semibold text-sm text-heading group-hover:text-brand line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  href={`/journal/${nextPost.slug}`}
                  className="p-5 rounded-none bg-white border border-slate-300 hover:border-brand/50 shadow-xs hover:shadow-md transition-all text-right group ml-auto w-full"
                >
                  <span className="text-xs text-muted block mb-1">Next Article →</span>
                  <span className="font-display font-semibold text-sm text-heading group-hover:text-brand line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// =============================================================================
// SECTION RENDERER ENGINE (Crisp Paper Layout)
// =============================================================================
function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-lg sm:text-xl font-normal leading-[1.7] text-heading mb-6">
          {section.text}
        </p>
      );

    case "paragraph":
      return (
        <p className="text-[15px] sm:text-[1.0625rem] leading-[1.78] text-slate-700 mb-5">
          {section.text}
        </p>
      );

    case "heading": {
      const h2Styles =
        "font-display font-bold text-2xl sm:text-3xl text-heading tracking-tight leading-[1.25] mb-4 mt-10 pt-6 border-t border-slate-200 group relative scroll-mt-24";
      const h3Styles =
        "font-display font-bold text-xl sm:text-2xl text-heading tracking-tight leading-[1.3] mb-3 mt-7 group relative scroll-mt-24";
      const h4Styles =
        "font-display font-semibold text-lg sm:text-xl text-heading mb-2 mt-5 group relative scroll-mt-24";

      if (section.level === 3) {
        return (
          <h3 id={section.id} className={h3Styles}>
            <a
              href={`#${section.id}`}
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand p-1"
              aria-label={`Link to ${section.id}`}
            >
              <Hash className="w-4 h-4" />
            </a>
            {section.text}
          </h3>
        );
      }

      if (section.level === 4) {
        return (
          <h4 id={section.id} className={h4Styles}>
            <a
              href={`#${section.id}`}
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand p-1"
              aria-label={`Link to ${section.id}`}
            >
              <Hash className="w-4 h-4" />
            </a>
            {section.text}
          </h4>
        );
      }

      return (
        <h2 id={section.id} className={h2Styles}>
          <a
            href={`#${section.id}`}
            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand p-1"
            aria-label={`Link to ${section.id}`}
          >
            <Hash className="w-4 h-4" />
          </a>
          {section.text}
        </h2>
      );
    }

    case "bullets":
      return (
        <ul className="list-disc list-outside pl-6 space-y-2.5 my-5 text-slate-700 marker:text-brand text-[15px] sm:text-[1.0625rem] leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal list-outside pl-6 space-y-3 my-5 text-slate-700 marker:text-brand marker:font-semibold text-[15px] sm:text-[1.0625rem] leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-brand italic text-base sm:text-lg text-heading leading-[1.65] bg-slate-50/80 py-4 pr-6 rounded-none border-y border-r border-slate-200">
          <p className="mb-1">“{section.text}”</p>
          {(section.author || section.source) && (
            <footer className="text-xs font-normal not-italic text-muted pt-1">
              {section.author && (
                <strong className="text-heading font-semibold">
                  {section.author}
                </strong>
              )}
              {section.author && section.source && " — "}
              {section.source && <span>{section.source}</span>}
            </footer>
          )}
        </blockquote>
      );

    case "callout": {
      const configs = {
        insight: {
          icon: <Sparkles className="w-5 h-5 text-brand" />,
          bg: "bg-slate-50 border-l-4 border-l-brand border-y border-r border-slate-200 text-slate-800",
          title: "text-brand",
        },
        science: {
          icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
          bg: "bg-blue-50/50 border-l-4 border-l-blue-600 border-y border-r border-blue-200 text-slate-800",
          title: "text-blue-700",
        },
        warning: {
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          bg: "bg-amber-50/50 border-l-4 border-l-amber-600 border-y border-r border-amber-200 text-amber-950",
          title: "text-amber-800",
        },
        tip: {
          icon: <Info className="w-5 h-5 text-cyan-600" />,
          bg: "bg-cyan-50/50 border-l-4 border-l-cyan-600 border-y border-r border-cyan-200 text-cyan-950",
          title: "text-cyan-800",
        },
      };
      const cfg = configs[section.variant || "insight"];

      return (
        <div className={cn("my-7 p-5 sm:p-6 rounded-none border space-y-2", cfg.bg)}>
          <div className="flex items-center gap-2.5">
            <div className="shrink-0">{cfg.icon}</div>
            <h4
              className={cn(
                "font-display font-bold text-sm sm:text-base",
                cfg.title
              )}
            >
              {section.title}
            </h4>
          </div>
          <div className="text-sm sm:text-base leading-[1.7] pl-7">
            {section.text}
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="my-8 space-y-2">
          {section.data.caption && (
            <p className="text-xs text-muted font-medium text-center">
              {section.data.caption}
            </p>
          )}
          <div className="overflow-x-auto rounded-none border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <tr>
                  {section.data.headers.map((h, i) => (
                    <th key={i} className="p-3.5 sm:p-4 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {section.data.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={cn(
                          "p-3.5 sm:p-4",
                          cIdx === 0 && "font-semibold text-heading",
                          cIdx === (section.data.highlightColumnIndex ?? -1) &&
                            "text-brand font-medium bg-ice-light/30"
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "divider":
      return (
        <div className="my-10 flex items-center justify-center gap-3">
          <div className="h-px bg-slate-200 flex-1" />
          <div className="w-1.5 h-1.5 rounded-none bg-brand" />
          <div className="h-px bg-slate-200 flex-1" />
        </div>
      );

    case "cta":
      return (
        <div className="my-10 p-6 sm:p-8 rounded-none bg-slate-50 border border-slate-300 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-ice-light text-brand mx-auto border border-brand/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xl text-heading">
              {section.title}
            </h4>
            <p className="text-body text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {section.text}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={section.buttonHref}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-none shadow-md shadow-brand/20 transition-all"
            >
              <span>{section.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      );

    default:
      return null;
  }
}
