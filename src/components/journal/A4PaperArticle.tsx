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
    <div className="min-h-screen w-full flex flex-col bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6] selection:text-white relative">
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
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#0f0f10]/10 z-50 pointer-events-none">
        <div
          className="h-full bg-[#3b82f6] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 max-w-[880px] mx-auto xl:max-w-none font-mono">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f0f10] hover:text-[#3b82f6] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; BACK TO JOURNAL INDEX</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] text-xs font-bold uppercase text-[#0f0f10] transition-all cursor-pointer"
              aria-label="Share article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3b82f6]" />
                  <span className="text-[#3b82f6]">LINK COPIED!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>SHARE SPEC</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Sticky Left Document Outline + Central A4 Document Sheet */}
        <div className="flex justify-center items-start gap-8 relative">
          {/* ========================================================================= */}
          {/* STICKY DOCUMENT OUTLINE SIDEBAR (Desktop Left Side) */}
          {/* ========================================================================= */}
          {tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden xl:block w-72 shrink-0 sticky top-28 space-y-4 select-none font-mono">
              <div className="bg-white border-2 border-[#0f0f10] p-5 shadow-brutal-md">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-[#0f0f10] text-xs font-black text-[#0f0f10] uppercase tracking-wider">
                  <ListOrdered className="w-4 h-4 text-[#3b82f6]" />
                  <span>DOCUMENT OUTLINE</span>
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
                              "flex items-start gap-2 py-1.5 px-2 transition-colors group text-left border",
                              isActive
                                ? "bg-[#3b82f6] text-white font-bold border-[#0f0f10]"
                                : "text-[#3f3f46] hover:bg-[#f0f7ff] hover:text-[#0f0f10] border-transparent"
                            )}
                          >
                            <span
                              className={cn(
                                "text-[10px] shrink-0 mt-0.5 font-bold",
                                isActive ? "text-white" : "text-[#71717a]"
                              )}
                            >
                              {String(idx + 1).padStart(2, "0")}.
                            </span>
                            <span className="line-clamp-2 uppercase font-bold text-[11px]">
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
          {/* THE TECHNICAL DOSSIER WHITE PAPER */}
          {/* ========================================================================= */}
          <div className="w-full max-w-[880px] flex-1 min-w-0">
            <article className="w-full bg-white border-2 border-[#0f0f10] shadow-brutal-xl p-6 sm:p-12 md:p-14 transition-all relative overflow-hidden break-words">
              {/* Top Dossier Terminal Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b-2 border-[#0f0f10] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#3b82f6] border border-[#0f0f10]" />
                  <span className="font-bold uppercase tracking-wider text-[#0f0f10]">
                    SPEC: WHITE_PAPER // SOLVEMPIRE R&D
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#3b82f6] text-white font-bold uppercase border border-[#0f0f10]">
                    {meta.category}
                  </span>
                  <span className="px-2 py-0.5 bg-[#f7f6f2] text-[#0f0f10] font-bold uppercase border border-[#0f0f10]">
                    {meta.type}
                  </span>
                </div>
              </div>

              {/* Article Title */}
              <header className="pb-6 mb-8 border-b-2 border-[#0f0f10]">
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#0f0f10] tracking-tight uppercase leading-[1.05]">
                  {meta.title}
                </h1>
                
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-[#71717a] uppercase">
                  <span>BY {meta.author.name}</span>
                  <span>•</span>
                  <span>PUBLISHED: {meta.publishedAt}</span>
                  <span>•</span>
                  <span className="text-[#3b82f6]">{meta.readTime}</span>
                </div>
              </header>

              {/* Document Body */}
              <div className="py-2 space-y-6 font-body text-[15px] sm:text-base leading-[1.8] text-[#27272a]">
                {sections.map((section, idx) => (
                  <RenderSection key={idx} section={section} />
                ))}
              </div>

              {/* Summary Takeaways Box */}
              {takeaways && takeaways.length > 0 && (
                <div className="my-10 p-6 sm:p-8 bg-[#f7f6f2] border-2 border-[#0f0f10] shadow-brutal-sm space-y-4 font-mono">
                  <div className="flex items-center gap-2 text-[#0f0f10] font-display font-black text-lg uppercase tracking-tight pb-2 border-b-2 border-[#0f0f10]">
                    <Sparkles className="w-5 h-5 text-[#3b82f6] fill-[#3b82f6]" />
                    <span>KEY TECHNICAL TAKEAWAYS &amp; FINDINGS</span>
                  </div>
                  <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#0f0f10]">
                    {takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#3b82f6] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Frequently Asked Questions */}
              {faqs && faqs.length > 0 && (
                <section className="my-12 pt-8 border-t-2 border-[#0f0f10] space-y-5 scroll-mt-24 font-mono" id="faq">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#3b82f6] text-white border border-[#0f0f10] text-xs font-bold uppercase tracking-wider">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>FAQ SPECIFICATION</span>
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0f0f10] uppercase tracking-tight">
                      FREQUENTLY ASKED QUESTIONS
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2">
                    {faqs.map((faq, idx) => {
                      const isOpen = openFaqIndexes.includes(idx);
                      return (
                        <div
                          key={idx}
                          className="border-2 border-[#0f0f10] bg-white shadow-brutal-xs"
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                            aria-expanded={isOpen}
                          >
                            <span className="font-display font-black text-sm sm:text-base text-[#0f0f10] uppercase">
                              {faq.question}
                            </span>
                            <div className={cn(
                              "w-7 h-7 border-2 border-[#0f0f10] flex items-center justify-center shrink-0 transition-transform",
                              isOpen ? "bg-[#3b82f6] text-white rotate-180" : "bg-[#f7f6f2] text-[#0f0f10]"
                            )}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-[#3f3f46] leading-relaxed border-t-2 border-[#0f0f10] bg-[#f0f7ff] font-normal font-sans">
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
                <div className="mt-10 pt-6 border-t-2 border-[#0f0f10] flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="text-[#71717a] font-bold uppercase mr-1">TOPIC INDEX:</span>
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#f7f6f2] border border-[#0f0f10] text-[#0f0f10] font-bold uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-12 p-6 sm:p-8 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-md space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0f0f10]">
                  <Link
                    href={`/team/${authorSlug}`}
                    className="flex items-center gap-3.5 group focus:outline-none"
                  >
                    <div className="relative w-14 h-14 overflow-hidden border-2 border-[#0f0f10] shrink-0 bg-white">
                      {meta.author.avatar ? (
                        <Image
                          src={meta.author.avatar}
                          alt={meta.author.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#0f0f10] text-lg font-black uppercase">
                          {meta.author.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-display font-black text-lg text-[#0f0f10] group-hover:text-[#3b82f6] uppercase tracking-tight">
                        {meta.author.name}
                      </h4>
                      <span className="inline-block text-xs font-bold text-[#3b82f6] uppercase">
                        {meta.author.role}
                      </span>
                    </div>
                  </Link>

                  <Link
                    href={`/team/${authorSlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#3b82f6] text-[#0f0f10] hover:text-white border-2 border-[#0f0f10] text-xs font-bold uppercase transition-all shadow-brutal-xs self-start sm:self-auto group"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>AUTHOR DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-[#3f3f46] leading-relaxed font-sans">
                  {meta.author.bio || `${meta.author.role} at SolveMpire.`}
                </p>
              </div>
            </article>

            {/* Document Navigation - Next/Prev */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              {prevPost ? (
                <Link
                  href={`/journal/${prevPost.slug}`}
                  className="p-5 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-brutal-sm transition-all text-left group"
                >
                  <span className="text-xs font-bold text-[#71717a] uppercase block mb-1">&larr; PREVIOUS SPECIFICATION</span>
                  <span className="font-display font-black text-sm text-[#0f0f10] group-hover:text-[#3b82f6] line-clamp-1 uppercase">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  href={`/journal/${nextPost.slug}`}
                  className="p-5 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-brutal-sm transition-all text-right group ml-auto w-full"
                >
                  <span className="text-xs font-bold text-[#71717a] uppercase block mb-1">NEXT SPECIFICATION &rarr;</span>
                  <span className="font-display font-black text-sm text-[#0f0f10] group-hover:text-[#3b82f6] line-clamp-1 uppercase">
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
// SECTION RENDERER ENGINE (Neo-Brutalist Technical Spec Layout)
// =============================================================================
function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "lead":
      return (
        <p className="text-base sm:text-lg font-medium leading-[1.7] text-[#0f0f10] mb-6 p-4 bg-[#f0f7ff] border-l-4 border-[#3b82f6] border-y border-r border-[#0f0f10]/10">
          {section.text}
        </p>
      );

    case "paragraph":
      return (
        <p className="text-[15px] sm:text-base leading-[1.78] text-[#27272a] mb-5">
          {section.text}
        </p>
      );

    case "heading": {
      const h2Styles =
        "font-display font-black text-2xl sm:text-3xl text-[#0f0f10] tracking-tight uppercase leading-[1.2] mb-4 mt-10 pt-6 border-t-2 border-[#0f0f10] group relative scroll-mt-24";
      const h3Styles =
        "font-display font-black text-xl sm:text-2xl text-[#0f0f10] tracking-tight uppercase leading-[1.25] mb-3 mt-7 group relative scroll-mt-24";
      const h4Styles =
        "font-display font-black text-lg sm:text-xl text-[#0f0f10] uppercase mb-2 mt-5 group relative scroll-mt-24";

      if (section.level === 3) {
        return (
          <h3 id={section.id} className={h3Styles}>
            <a
              href={`#${section.id}`}
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#71717a] hover:text-[#3b82f6] p-1 font-mono"
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
              className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#71717a] hover:text-[#3b82f6] p-1 font-mono"
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
            className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#71717a] hover:text-[#3b82f6] p-1 font-mono"
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
        <ul className="list-disc list-outside pl-6 space-y-2.5 my-5 text-[#27272a] marker:text-[#3b82f6] text-[15px] sm:text-base leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal list-outside pl-6 space-y-3 my-5 text-[#27272a] marker:text-[#3b82f6] marker:font-bold font-mono text-[15px] sm:text-base leading-[1.75]">
          {section.items.map((item, i) => (
            <li key={i} className="pl-1 font-sans">
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-[#3b82f6] bg-[#f0f7ff] border-y-2 border-r-2 border-[#0f0f10] shadow-brutal-xs py-5 pr-6 font-mono text-sm sm:text-base text-[#0f0f10] leading-[1.65]">
          <p className="mb-2 italic">“{section.text}”</p>
          {(section.author || section.source) && (
            <footer className="text-xs uppercase font-bold text-[#71717a] pt-1">
              {section.author && (
                <strong className="text-[#0f0f10]">
                  {section.author}
                </strong>
              )}
              {section.author && section.source && " // "}
              {section.source && <span>{section.source}</span>}
            </footer>
          )}
        </blockquote>
      );

    case "callout": {
      const configs = {
        insight: {
          icon: <Sparkles className="w-5 h-5 text-[#3b82f6]" />,
          bg: "bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-xs",
          title: "text-[#3b82f6]",
        },
        science: {
          icon: <Lightbulb className="w-5 h-5 text-[#1d4ed8]" />,
          bg: "bg-[#e0e7ff] border-2 border-[#0f0f10] shadow-brutal-xs",
          title: "text-[#1d4ed8]",
        },
        warning: {
          icon: <AlertCircle className="w-5 h-5 text-[#b45309]" />,
          bg: "bg-[#fef3c7] border-2 border-[#0f0f10] shadow-brutal-xs text-[#78350f]",
          title: "text-[#92400e]",
        },
        tip: {
          icon: <Info className="w-5 h-5 text-[#0369a1]" />,
          bg: "bg-[#e0f2fe] border-2 border-[#0f0f10] shadow-brutal-xs text-[#0c4a6e]",
          title: "text-[#0369a1]",
        },
      };
      const cfg = configs[section.variant || "insight"];

      return (
        <div className={cn("my-7 p-5 sm:p-6 space-y-2 font-mono", cfg.bg)}>
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#0f0f10]/10">
            <div className="shrink-0">{cfg.icon}</div>
            <h4 className={cn("font-display font-black text-sm uppercase", cfg.title)}>
              {section.title}
            </h4>
          </div>
          <div className="text-xs sm:text-sm leading-[1.7] font-sans text-[#0f0f10]">
            {section.text}
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="my-8 space-y-2 font-mono">
          {section.data.caption && (
            <p className="text-xs text-[#71717a] font-bold uppercase text-center">
              // {section.data.caption}
            </p>
          )}
          <div className="overflow-x-auto border-2 border-[#0f0f10] bg-white shadow-brutal-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#f0f7ff] border-b-2 border-[#0f0f10] text-[#0f0f10] uppercase font-black">
                <tr>
                  {section.data.headers.map((h, i) => (
                    <th key={i} className="p-3.5 whitespace-nowrap border-r border-[#0f0f10]/20 last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0f0f10]/10 text-[#27272a]">
                {section.data.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#f0f7ff]/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={cn(
                          "p-3.5 border-r border-[#0f0f10]/10 last:border-r-0",
                          cIdx === 0 && "font-bold text-[#0f0f10]",
                          cIdx === (section.data.highlightColumnIndex ?? -1) &&
                            "text-[#3b82f6] font-bold bg-[#f0f7ff]"
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
          <div className="h-0.5 bg-[#0f0f10] flex-1" />
          <div className="w-2.5 h-2.5 bg-[#3b82f6] border border-[#0f0f10]" />
          <div className="h-0.5 bg-[#0f0f10] flex-1" />
        </div>
      );

    case "cta":
      return (
        <div className="my-10 p-6 sm:p-8 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-md text-center space-y-4 font-mono">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-white text-[#3b82f6] mx-auto border-2 border-[#0f0f10] shadow-brutal-xs">
            <Sparkles className="w-5 h-5 fill-[#3b82f6]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-black text-xl text-[#0f0f10] uppercase">
              {section.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#3f3f46] max-w-md mx-auto leading-relaxed font-sans">
              {section.text}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={section.buttonHref}
              className="inline-flex items-center gap-2 bg-[#3b82f6] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs uppercase px-6 py-3 border-2 border-[#0f0f10] shadow-brutal-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
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
