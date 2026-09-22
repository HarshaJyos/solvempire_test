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
    <div className="min-h-screen w-full flex flex-col bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50 pointer-events-none">
        <div
          className="h-full bg-blue-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 font-display">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Journal Index</span>
          </Link>

          <button
            onClick={handleCopy}
            className="btn-editorial btn-editorial-secondary px-3.5 py-1.5 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer shadow-xs"
            aria-label="Share article"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-blue-600 font-bold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="flex justify-center items-start gap-8 lg:gap-10 relative">
          {/* Sticky Document Outline Sidebar */}
          {tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden xl:block w-72 shrink-0 sticky top-28 space-y-4 select-none">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-editorial-sm p-5">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <ListOrdered className="w-4 h-4 text-blue-600" />
                  <span>Document Outline</span>
                </div>
                <nav>
                  <ul className="space-y-1 text-xs leading-normal max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar">
                    {tableOfContents.map((item, idx) => {
                      const isActive = activeSectionId === item.id;
                      return (
                        <li key={item.id || idx}>
                          <a
                            href={`#${item.id}`}
                            className={cn(
                              "flex items-start gap-2 py-1.5 px-2.5 rounded-lg transition-colors group text-left",
                              isActive
                                ? "bg-blue-50 text-blue-700 font-bold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                          >
                            <span
                              className={cn(
                                "text-[10px] shrink-0 mt-0.5 font-mono",
                                isActive ? "text-blue-600 font-bold" : "text-slate-400"
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
            </aside>
          )}

          {/* Central Editorial White Paper Article */}
          <div className="w-full max-w-[880px] flex-1 min-w-0">
            <article className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-editorial-md p-6 sm:p-12 md:p-14 relative overflow-hidden break-words">
              {/* Header Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="font-semibold uppercase tracking-wide text-slate-500">
                    R&amp;D WHITE PAPER // SOLVEMPIRE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] uppercase">
                    {meta.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">
                    {meta.type}
                  </span>
                </div>
              </div>

              {/* Title Header */}
              <header className="pt-6 pb-6 border-b border-slate-100 space-y-4">
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-[1.08]">
                  {meta.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-slate-500">
                  <span className="font-semibold text-slate-900">By {meta.author.name}</span>
                  <span>•</span>
                  <span>Published {meta.publishedAt}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-semibold">{meta.readTime}</span>
                </div>
              </header>

              {/* Document Body */}
              <div className="py-2 space-y-6 text-[15px] sm:text-base leading-[1.8] text-slate-700 font-normal font-sans">
                {sections.map((section, idx) => (
                  <RenderSection key={idx} section={section} />
                ))}
              </div>

              {/* Summary Takeaways Box */}
              {takeaways && takeaways.length > 0 && (
                <div className="my-10 p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-4 font-sans">
                  <div className="flex items-center gap-2 text-blue-900 font-display font-bold text-base sm:text-lg">
                    <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Key Takeaways &amp; Executive Summary</span>
                  </div>
                  <ul className="space-y-2.5 pt-1 text-sm sm:text-base text-slate-800">
                    {takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ Section */}
              {faqs && faqs.length > 0 && (
                <section className="my-12 pt-8 border-t border-slate-100 space-y-5 scroll-mt-24 font-sans" id="faq">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>FAQ Breakdown</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
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
                            isOpen ? "bg-slate-50/70 border-blue-300" : "bg-white border-slate-200"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span className="font-display font-semibold text-sm sm:text-base text-slate-900">
                              {faq.question}
                            </span>
                            <div className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200",
                              isOpen ? "bg-blue-100 text-blue-700 rotate-180" : "bg-slate-100 text-slate-500"
                            )}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
                <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold mr-1">Filed under:</span>
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link
                    href={`/team/${authorSlug}`}
                    className="flex items-center gap-3.5 group focus:outline-none"
                  >
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-blue-50">
                      {meta.author.avatar ? (
                        <Image
                          src={meta.author.avatar}
                          alt={meta.author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-700 text-lg font-bold uppercase">
                          {meta.author.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {meta.author.name}
                      </h4>
                      <span className="inline-block text-xs font-semibold text-blue-600">
                        {meta.author.role}
                      </span>
                    </div>
                  </Link>

                  <Link
                    href={`/team/${authorSlug}`}
                    className="btn-editorial btn-editorial-secondary px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs"
                  >
                    <span>View Profile &rarr;</span>
                  </Link>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {meta.author.bio || `${meta.author.role} at SolveMpire.`}
                </p>
              </div>
            </article>

            {/* Document Navigation */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-display">
              {prevPost ? (
                <Link
                  href={`/journal/${prevPost.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-editorial-xs hover:shadow-editorial-sm transition-all text-left group"
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    &larr; Previous Article
                  </span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  href={`/journal/${nextPost.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-editorial-xs hover:shadow-editorial-sm transition-all text-right group ml-auto w-full"
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Next Article &rarr;
                  </span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-1">
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

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-lg sm:text-xl font-medium leading-[1.7] text-slate-900 mb-6 p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
          {section.text}
        </p>
      );

    case "paragraph":
      return (
        <p className="text-[15px] sm:text-base leading-[1.78] text-slate-700 mb-5">
          {section.text}
        </p>
      );

    case "heading": {
      const h2Styles =
        "font-display font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight leading-[1.25] mb-4 mt-10 pt-6 border-t border-slate-100 group relative scroll-mt-24";
      const h3Styles =
        "font-display font-bold text-xl sm:text-2xl text-slate-950 tracking-tight leading-[1.3] mb-3 mt-7 group relative scroll-mt-24";
      const h4Styles =
        "font-display font-semibold text-lg sm:text-xl text-slate-950 mb-2 mt-5 group relative scroll-mt-24";

      if (section.level === 3) {
        return (
          <h3 id={section.id} className={h3Styles}>
            <a
              href={`#${section.id}`}
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 p-1"
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
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 p-1"
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
            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 p-1"
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
        <ul className="list-disc list-outside pl-6 space-y-2.5 my-5 text-slate-700 marker:text-blue-600 text-[15px] sm:text-base leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal list-outside pl-6 space-y-3 my-5 text-slate-700 marker:text-blue-600 marker:font-semibold text-[15px] sm:text-base leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-blue-600 italic text-base sm:text-lg text-slate-900 leading-[1.65] bg-slate-50/80 py-4 pr-6 rounded-r-2xl border-y border-r border-slate-200">
          <p className="mb-1">“{section.text}”</p>
          {(section.author || section.source) && (
            <footer className="text-xs font-normal not-italic text-slate-500 pt-1 font-mono">
              {section.author && (
                <strong className="text-slate-900 font-semibold">
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
          icon: <Sparkles className="w-5 h-5 text-blue-600" />,
          bg: "bg-blue-50/60 border border-blue-200/80 text-slate-800",
          title: "text-blue-800",
        },
        science: {
          icon: <Lightbulb className="w-5 h-5 text-indigo-600" />,
          bg: "bg-indigo-50/50 border border-indigo-200/80 text-slate-800",
          title: "text-indigo-800",
        },
        warning: {
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          bg: "bg-amber-50/50 border border-amber-200 text-amber-950",
          title: "text-amber-800",
        },
        tip: {
          icon: <Info className="w-5 h-5 text-cyan-600" />,
          bg: "bg-cyan-50/50 border border-cyan-200 text-cyan-950",
          title: "text-cyan-800",
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
            <p className="text-xs text-slate-400 font-medium text-center">
              {section.data.caption}
            </p>
          )}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
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
                          cIdx === 0 && "font-semibold text-slate-950",
                          cIdx === (section.data.highlightColumnIndex ?? -1) &&
                            "text-blue-600 font-medium bg-blue-50/30"
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
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <div className="h-px bg-slate-200 flex-1" />
        </div>
      );

    case "cta":
      return (
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-blue-50/80 border border-blue-200/80 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white mx-auto shadow-editorial-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xl text-slate-950">
              {section.title}
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {section.text}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={section.buttonHref}
              className="btn-editorial btn-editorial-blue px-6 py-3 text-xs tracking-wide shadow-editorial-sm"
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
