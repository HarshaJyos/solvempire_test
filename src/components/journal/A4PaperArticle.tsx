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
  Hash,
  Lightbulb,
  AlertCircle,
  Info,
  CheckCircle2,
  BookOpen,
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

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans relative">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[var(--border-hairline)] z-50 pointer-events-none">
        <div
          className="h-full bg-[#2563EB] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <IndiseaHeader />

      <main className="flex-1 w-full pt-36 pb-24">
        <article className="indisea-wrap space-y-12 sm:space-y-16">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 font-bold text-[var(--text-muted)] hover:text-[#2563EB] uppercase tracking-wider transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>&larr; Back to Journal Index</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[#2563EB] font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                <span>{meta.category}</span>
              </span>

              <button
                type="button"
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
                    <span>Share Paper</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hero Section: Giant Headline + Highlight Badges */}
          <header className="space-y-8 max-w-5xl">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="indisea-eyebrow">
                  07 / RESEARCH &amp; ENGINEERING DEEP DIVE
                </span>
                <span className="marker-pill marker-pill-yellow text-[11px] uppercase tracking-wide font-mono">
                  {meta.type}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--text-heading)] tracking-tight leading-[1.02]">
                {meta.title}
              </h1>

              <p className="font-sans text-lg sm:text-2xl text-[var(--text-muted)] leading-relaxed font-normal pt-2">
                {meta.excerpt}
              </p>
            </div>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs text-xs font-mono">
              <Link
                href={`/team/${authorSlug}`}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--border-hairline)] shrink-0 bg-[#2563EB]/10">
                  {meta.author.avatar ? (
                    <Image
                      src={meta.author.avatar}
                      alt={meta.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2563EB] text-sm font-bold uppercase">
                      {meta.author.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-display font-bold text-sm text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors block">
                    {meta.author.name}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] block">
                    {meta.author.role}
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-4 text-[var(--text-muted)]">
                <span>Published {meta.publishedAt}</span>
                <span>•</span>
                <span className="text-[#2563EB] font-bold">{meta.readTime}</span>
              </div>
            </div>
          </header>

          {/* Upfront Key Takeaways (Project What Matters First!) */}
          {takeaways && takeaways.length > 0 && (
            <section className="p-8 sm:p-10 rounded-3xl bg-[#2563EB]/10 border border-[#2563EB]/25 space-y-6">
              <div className="flex items-center gap-2 text-[#1E40AF]">
                <Sparkles className="w-5 h-5 text-[#2563EB]" />
                <span className="indisea-eyebrow text-[#1E40AF]">
                  01 / executive summary &amp; core thesis
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--text-heading)] tracking-tight">
                Key Insights At A Glance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0" />
                    <p className="font-sans text-sm sm:text-base text-[var(--text-heading)] font-medium leading-snug">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 12-Column Swiss Grid Layout */}
          <div className="indisea-grid items-start gap-10 lg:gap-14 pt-8 border-t border-[var(--border-hairline)]">
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
                                "flex items-start gap-2 py-2 px-3 rounded-xl transition-colors group text-left",
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

              {/* Lead Engineering Scope Callout */}
              <div className="p-6 rounded-3xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 space-y-3">
                <span className="indisea-eyebrow text-[#0284C7] block">
                  Have a Technical Challenge?
                </span>
                <p className="font-sans text-xs text-[var(--text-heading)] leading-relaxed">
                  Discuss physical system architecture, embedded electronics, and continuous engineering workflows directly with our leads.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-display font-bold text-xs text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  <span>Scope With Lead Engineers &rarr;</span>
                </Link>
              </div>

              {/* Tags */}
              {meta.tags && meta.tags.length > 0 && (
                <div className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs space-y-3">
                  <span className="indisea-eyebrow block">Topics Filed</span>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-[var(--surface-canvas)] text-[var(--text-muted)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Central Article Content Body (Span 8) */}
            <div className="col-span-12 lg:col-span-8 min-w-0 space-y-8">
              <div className="space-y-6 text-base sm:text-lg leading-[1.8] text-[var(--text-body)] font-normal font-sans">
                {sections.map((section, idx) => (
                  <RenderSection key={idx} section={section} />
                ))}
              </div>

              {/* FAQ Section */}
              {faqs && faqs.length > 0 && (
                <section className="my-12 pt-10 border-t border-[var(--border-hairline)] space-y-6 scroll-mt-24 font-sans" id="faq">
                  <div className="space-y-1">
                    <span className="indisea-eyebrow text-[#2563EB] block">
                      Frequently Asked Questions
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight">
                      Technical Inquiries &amp; Clarifications
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
                            isOpen
                              ? "bg-[var(--surface-card)] border-[#2563EB]/40 shadow-xs"
                              : "bg-[var(--surface-card)] border-[var(--border-hairline)]"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span className="font-display font-bold text-base sm:text-lg text-[var(--text-heading)]">
                              {faq.question}
                            </span>
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                              isOpen ? "bg-[#2563EB] text-white rotate-180" : "bg-[var(--surface-canvas)] text-[var(--text-muted)]"
                            )}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-6 pt-1 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-hairline)]">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Bottom Adjacent Articles Switcher */}
              <div className="pt-12 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/journal/${prevPost.slug}`}
                    className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-all text-left group"
                  >
                    <span className="indisea-eyebrow block mb-2">&larr; Previous Deep Dive</span>
                    <span className="font-display font-bold text-lg text-[var(--text-heading)] group-hover:text-[#2563EB] line-clamp-1 transition-colors">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost && (
                  <Link
                    href={`/journal/${nextPost.slug}`}
                    className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-all text-right group ml-auto w-full"
                  >
                    <span className="indisea-eyebrow block mb-2">Next Deep Dive &rarr;</span>
                    <span className="font-display font-bold text-lg text-[var(--text-heading)] group-hover:text-[#2563EB] line-clamp-1 transition-colors">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>

      <IndiseaFooter />
    </div>
  );
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-xl sm:text-2xl font-medium leading-[1.6] text-[var(--text-heading)] mb-8 p-6 sm:p-8 rounded-3xl bg-[#2563EB]/10 border border-[#2563EB]/25">
          {section.text}
        </p>
      );

    case "paragraph":
      return (
        <p className="text-base sm:text-lg leading-[1.8] text-[var(--text-body)] mb-6 font-normal">
          {section.text}
        </p>
      );

    case "heading": {
      const h2Styles =
        "font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight leading-[1.15] mb-5 mt-12 pt-8 border-t border-[var(--border-hairline)] group relative scroll-mt-24";
      const h3Styles =
        "font-display font-extrabold text-xl sm:text-2xl text-[var(--text-heading)] tracking-tight leading-[1.25] mb-4 mt-8 group relative scroll-mt-24";
      const h4Styles =
        "font-display font-bold text-lg sm:text-xl text-[var(--text-heading)] mb-3 mt-6 group relative scroll-mt-24";

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
        <ul className="list-disc list-outside pl-6 space-y-3 my-6 text-[var(--text-body)] marker:text-[#2563EB] text-base sm:text-lg leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal list-outside pl-6 space-y-3 my-6 text-[var(--text-body)] marker:text-[#2563EB] marker:font-bold text-base sm:text-lg leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-10 pl-6 sm:pl-8 border-l-4 border-[#2563EB] italic text-lg sm:text-2xl text-[var(--text-heading)] leading-[1.5] bg-[var(--surface-card)] py-6 pr-6 rounded-r-3xl border-y border-r border-[var(--border-hairline)] shadow-2xs font-display">
          <p className="mb-2">“{section.text}”</p>
          {(section.author || section.source) && (
            <footer className="text-xs font-mono font-normal not-italic text-[var(--text-muted)] pt-2">
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
        <div className={cn("my-8 p-6 sm:p-8 rounded-3xl border space-y-3 shadow-2xs", cfg.bg)}>
          <div className="flex items-center gap-2.5">
            <div className="shrink-0">{cfg.icon}</div>
            <h4 className={cn("font-display font-extrabold text-base sm:text-lg", cfg.title)}>
              {section.title}
            </h4>
          </div>
          <div className="text-sm sm:text-base leading-[1.7] pl-7 font-normal">
            {section.text}
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="my-10 space-y-2">
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
                    <th key={i} className="p-4 whitespace-nowrap font-mono text-xs">
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
                          "p-4",
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
        <div className="my-12 flex items-center justify-center gap-3">
          <div className="h-px bg-[var(--border-hairline)] flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <div className="h-px bg-[var(--border-hairline)] flex-1" />
        </div>
      );

    case "cta":
      return (
        <div className="my-12 p-8 sm:p-10 rounded-3xl bg-[#2563EB]/10 border border-[#2563EB]/25 text-center space-y-4 shadow-xs">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2563EB] text-white mx-auto shadow-2xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-extrabold text-2xl text-[var(--text-heading)]">
              {section.title}
            </h4>
            <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              {section.text}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={section.buttonHref}
              className="btn-indisea-blue text-xs py-3 px-8 tracking-wide"
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
