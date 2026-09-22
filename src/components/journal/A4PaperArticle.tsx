"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
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

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[var(--border-hairline)] z-50 pointer-events-none">
        <div
          className="h-full bg-[#2563EB] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <IndiseaHeader />

      <main className="flex-1 w-full pt-36 pb-24">
        <div className="indisea-wrap space-y-10">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[#2563EB] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>&larr; Return to Journal Index</span>
            </Link>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
              aria-label="Share article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

          {/* Dossier Title Header */}
          <header className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="indisea-eyebrow">
                R&amp;D WHITE PAPER // SOLVEMPIRE // {meta.category.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-[10px] font-mono font-bold uppercase text-[var(--text-muted)]">
                {meta.type}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-heading)] tracking-tight leading-[1.08]">
              {meta.title}
            </h1>

            <p className="font-sans text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed font-normal">
              {meta.excerpt}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
              <span className="text-[var(--text-heading)] font-semibold">By {meta.author.name}</span>
              <span>•</span>
              <span>Published {meta.publishedAt}</span>
              <span>•</span>
              <span className="text-[#2563EB] font-bold">{meta.readTime}</span>
            </div>
          </header>

          {/* 12-Column Swiss Grid Layout */}
          <div className="indisea-grid items-start gap-10 lg:gap-14 pt-4">
            {/* Left Sticky Table of Contents (Span 4) */}
            <aside className="hidden lg:block col-span-4 sticky top-28 space-y-6">
              {tableOfContents && tableOfContents.length > 0 && (
                <div className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                  <span className="indisea-eyebrow block">Document Outline</span>
                  <nav>
                    <ul className="space-y-1 text-xs font-display leading-normal max-h-[calc(100vh-260px)] overflow-y-auto no-scrollbar">
                      {tableOfContents.map((item, idx) => {
                        const isActive = activeSectionId === item.id;
                        return (
                          <li key={item.id || idx}>
                            <a
                              href={`#${item.id}`}
                              className={cn(
                                "flex items-start gap-2 py-1.5 px-2.5 rounded-xl transition-colors group text-left",
                                isActive
                                  ? "bg-[#2563EB] text-white font-bold"
                                  : "text-[var(--text-muted)] hover:bg-[var(--surface-canvas)] hover:text-[var(--text-heading)]"
                              )}
                            >
                              <span
                                className={cn(
                                  "text-[10px] shrink-0 mt-0.5 font-mono",
                                  isActive ? "text-white font-bold" : "text-[var(--text-muted)]"
                                )}
                              >
                                {String(idx + 1).padStart(2, "0")}.
                              </span>
                              <span className="line-clamp-2">{item.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="indisea-eyebrow block">Author &amp; Lead</span>
                <Link
                  href={`/team/${authorSlug}`}
                  className="flex items-center gap-3.5 group focus:outline-none"
                >
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[var(--border-hairline)] shrink-0 bg-[#2563EB]/10">
                    {meta.author.avatar ? (
                      <Image
                        src={meta.author.avatar}
                        alt={meta.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2563EB] text-base font-bold uppercase">
                        {meta.author.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-base text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
                      {meta.author.name}
                    </h4>
                    <span className="inline-block text-xs font-mono text-[#2563EB]">
                      {meta.author.role}
                    </span>
                  </div>
                </Link>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {meta.author.bio || `${meta.author.role} at SolveMpire.`}
                </p>
              </div>

              {/* Lead Engineering Scope Callout */}
              <div className="p-6 rounded-3xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 space-y-3">
                <span className="indisea-eyebrow text-[#0284C7] block">
                  Have a Technical Question?
                </span>
                <p className="font-sans text-xs text-[var(--text-heading)] leading-relaxed">
                  Discuss hardware architecture, DFM constraints, and embedded systems directly with our leads.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-display font-bold text-xs text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  <span>Scope With Lead Engineers &rarr;</span>
                </Link>
              </div>
            </aside>

            {/* Central White Paper Body (Span 8) */}
            <div className="col-span-12 lg:col-span-8 min-w-0">
              <article className="rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs p-6 sm:p-10 md:p-12 space-y-8 break-words">
                {/* Document Body */}
                <div className="space-y-6 text-[15px] sm:text-base leading-[1.8] text-[var(--text-body)] font-normal font-sans">
                  {sections.map((section, idx) => (
                    <RenderSection key={idx} section={section} />
                  ))}
                </div>

                {/* Summary Takeaways Box */}
                {takeaways && takeaways.length > 0 && (
                  <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 space-y-4 font-sans">
                    <div className="flex items-center gap-2 text-[#1E40AF] font-display font-bold text-base sm:text-lg">
                      <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0" />
                      <span>Key Takeaways &amp; Executive Summary</span>
                    </div>
                    <ul className="space-y-2.5 pt-1 text-sm sm:text-base text-[var(--text-heading)]">
                      {takeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FAQ Section */}
                {faqs && faqs.length > 0 && (
                  <section className="my-12 pt-8 border-t border-[var(--border-hairline)] space-y-5 scroll-mt-24 font-sans" id="faq">
                    <div className="space-y-1">
                      <span className="indisea-eyebrow text-[#2563EB] block">
                        FAQ Breakdown
                      </span>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-heading)]">
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
                              "rounded-2xl border transition-all duration-200 overflow-hidden",
                              isOpen ? "bg-[var(--surface-canvas)] border-[#2563EB]/40" : "bg-[var(--surface-card)] border-[var(--border-hairline)]"
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => toggleFaq(idx)}
                              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                              aria-expanded={isOpen}
                            >
                              <span className="font-display font-bold text-sm sm:text-base text-[var(--text-heading)]">
                                {faq.question}
                              </span>
                              <div className={cn(
                                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200",
                                isOpen ? "bg-[#2563EB]/15 text-[#2563EB] rotate-180" : "bg-[var(--surface-canvas)] text-[var(--text-muted)]"
                              )}>
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </button>
                            {isOpen && (
                              <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-hairline)]">
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
                  <div className="mt-10 pt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[var(--text-muted)] font-mono font-semibold mr-1">Filed under:</span>
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[var(--surface-canvas)] text-[var(--text-muted)] font-mono font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>

              {/* Document Navigation */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/journal/${prevPost.slug}`}
                    className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-all text-left group"
                  >
                    <span className="indisea-eyebrow block mb-1">
                      &larr; Previous Article
                    </span>
                    <span className="font-display font-bold text-sm text-[var(--text-heading)] group-hover:text-[#2563EB] line-clamp-1">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost && (
                  <Link
                    href={`/journal/${nextPost.slug}`}
                    className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-all text-right group ml-auto w-full"
                  >
                    <span className="indisea-eyebrow block mb-1">
                      Next Article &rarr;
                    </span>
                    <span className="font-display font-bold text-sm text-[var(--text-heading)] group-hover:text-[#2563EB] line-clamp-1">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-lg sm:text-xl font-medium leading-[1.7] text-[var(--text-heading)] mb-6 p-5 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20">
          {section.text}
        </p>
      );

    case "paragraph":
      return (
        <p className="text-[15px] sm:text-base leading-[1.78] text-[var(--text-body)] mb-5">
          {section.text}
        </p>
      );

    case "heading": {
      const h2Styles =
        "font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-heading)] tracking-tight leading-[1.25] mb-4 mt-10 pt-6 border-t border-[var(--border-hairline)] group relative scroll-mt-24";
      const h3Styles =
        "font-display font-extrabold text-xl sm:text-2xl text-[var(--text-heading)] tracking-tight leading-[1.3] mb-3 mt-7 group relative scroll-mt-24";
      const h4Styles =
        "font-display font-bold text-lg sm:text-xl text-[var(--text-heading)] mb-2 mt-5 group relative scroll-mt-24";

      if (section.level === 3) {
        return (
          <h3 id={section.id} className={h3Styles}>
            <a
              href={`#${section.id}`}
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-[#2563EB] p-1"
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
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-[#2563EB] p-1"
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
            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-[#2563EB] p-1"
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
        <ul className="list-disc list-outside pl-6 space-y-2.5 my-5 text-[var(--text-body)] marker:text-[#2563EB] text-[15px] sm:text-base leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal list-outside pl-6 space-y-3 my-5 text-[var(--text-body)] marker:text-[#2563EB] marker:font-semibold text-[15px] sm:text-base leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-[#2563EB] italic text-base sm:text-lg text-[var(--text-heading)] leading-[1.65] bg-[var(--surface-canvas)] py-4 pr-6 rounded-r-2xl border-y border-r border-[var(--border-hairline)]">
          <p className="mb-1">“{section.text}”</p>
          {(section.author || section.source) && (
            <footer className="text-xs font-normal not-italic text-[var(--text-muted)] pt-1 font-mono">
              {section.author && (
                <strong className="text-[var(--text-heading)] font-semibold">
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
          icon: <Sparkles className="w-5 h-5 text-[#2563EB]" />,
          bg: "bg-[#2563EB]/10 border border-[#2563EB]/20 text-[var(--text-heading)]",
          title: "text-[#1E40AF]",
        },
        science: {
          icon: <Lightbulb className="w-5 h-5 text-[#CA8A04]" />,
          bg: "bg-[#FACC15]/10 border border-[#FACC15]/30 text-[var(--text-heading)]",
          title: "text-[#854D0E]",
        },
        warning: {
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          bg: "bg-amber-500/10 border border-amber-500/20 text-amber-950",
          title: "text-amber-800",
        },
        tip: {
          icon: <Info className="w-5 h-5 text-emerald-600" />,
          bg: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-950",
          title: "text-emerald-800",
        },
      };
      const cfg = configs[section.variant || "insight"];

      return (
        <div className={cn("my-7 p-5 sm:p-6 rounded-2xl border space-y-2", cfg.bg)}>
          <div className="flex items-center gap-2.5">
            <div className="shrink-0">{cfg.icon}</div>
            <h4 className={cn("font-display font-bold text-sm sm:text-base", cfg.title)}>
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
            <p className="text-xs text-[var(--text-muted)] font-mono text-center">
              {section.data.caption}
            </p>
          )}
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-[var(--surface-canvas)] border-b border-[var(--border-hairline)] text-[var(--text-heading)] uppercase font-semibold">
                <tr>
                  {section.data.headers.map((h, i) => (
                    <th key={i} className="p-3.5 sm:p-4 whitespace-nowrap font-mono text-xs">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-hairline)] text-[var(--text-body)]">
                {section.data.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[var(--surface-canvas)]/60 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={cn(
                          "p-3.5 sm:p-4",
                          cIdx === 0 && "font-semibold text-[var(--text-heading)]",
                          cIdx === (section.data.highlightColumnIndex ?? -1) &&
                            "text-[#2563EB] font-bold bg-[#2563EB]/5"
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
          <div className="h-px bg-[var(--border-hairline)] flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <div className="h-px bg-[var(--border-hairline)] flex-1" />
        </div>
      );

    case "cta":
      return (
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] text-white mx-auto shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-extrabold text-xl text-[var(--text-heading)]">
              {section.title}
            </h4>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {section.text}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={section.buttonHref}
              className="btn-indisea-blue text-xs py-2.5 px-6 tracking-wide"
            >
              <span>{section.buttonText} &rarr;</span>
            </Link>
          </div>
        </div>
      );

    default:
      return null;
  }
}
