"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CaseStudy } from "@/content/case-studies";
import { COMPANY } from "@/lib/company";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  Sparkles,
  ListOrdered,
  Hash,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  Wrench,
  Building2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface A4CaseStudyArticleProps {
  study: CaseStudy;
  prevStudy?: { title: string; slug: string };
  nextStudy?: { title: string; slug: string };
}

export function A4CaseStudyArticle({
  study,
  prevStudy,
  nextStudy,
}: A4CaseStudyArticleProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  // Build TOC items from sections + key blocks
  const tocItems = [
    { id: "executive-summary", title: "Executive Summary" },
    ...(study.metrics && study.metrics.length > 0
      ? [{ id: "technical-metrics", title: "Key Metrics & KPIs" }]
      : []),
    ...(study.highlights && study.highlights.length > 0
      ? [{ id: "engineering-highlights", title: "Engineering Highlights" }]
      : []),
    ...study.sections.map((s, idx) => ({
      id: `section-${idx + 1}-${s.heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`,
      title: s.heading,
    })),
    ...(study.outcomes && study.outcomes.length > 0
      ? [{ id: "verified-outcomes", title: "Verified Outcomes & Deliverables" }]
      : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }

      // Track active heading for sidebar outline
      const headingElements = tocItems
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.summary,
    author: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: COMPANY.websiteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      logo: `${COMPANY.websiteUrl}/logo.png`,
    },
    articleSection: study.category,
    keywords: study.disciplines.join(", "),
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas text-heading selection:bg-brand/15 selection:text-brand relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            href="/work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>SolveMpire Portfolio</span>
          </Link>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-surface border border-slate-300 text-xs font-medium text-muted hover:text-heading hover:border-brand transition-all shadow-xs cursor-pointer"
            aria-label="Share case study"
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

        {/* 2-Column Layout: Sticky Left Document Outline + Central A4 Case Study Sheet */}
        <div className="flex justify-center items-start gap-8 relative">
          {/* ========================================================================= */}
          {/* STICKY DOCUMENT OUTLINE SIDEBAR (Desktop Left Side, Hidden on Mobile) */}
          {/* ========================================================================= */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-28 space-y-4 select-none">
            <div className="bg-white border border-slate-300 rounded-none p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 text-xs font-bold text-brand uppercase tracking-wider">
                <ListOrdered className="w-4 h-4" />
                <span>Dossier Outline</span>
              </div>
              <nav>
                <ul className="space-y-1 text-xs leading-normal max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {tocItems.map((item, idx) => {
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
                          <span className="line-clamp-2">{item.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* THE CRISP A4 CASE STUDY SHEET (Zero Rounded Corners, Pure Whitepaper) */}
          {/* ========================================================================= */}
          <div className="w-full max-w-[860px] flex-1 min-w-0">
            <article className="w-full bg-white border border-slate-300 rounded-none shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-10 md:p-14 lg:p-16 transition-all relative overflow-hidden break-words">
              {/* Top Paper Header Stamp */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-brand" />
                  <span className="text-brand font-bold tracking-widest">
                    SOLVEMPIRE ENGINEERING DOSSIER
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-700">{study.category}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{study.status}</span>
                </div>
              </div>

              {/* Title Header */}
              <header className="pt-8 pb-6 border-b border-slate-200 space-y-4">
                <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-[2.65rem] text-heading tracking-tight leading-[1.18]">
                  {study.title}
                </h1>

                {/* Technical Metadata Strip */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-brand" />
                      <span className="text-muted">Client:</span>
                      <strong className="text-heading font-semibold">
                        {study.client}
                      </strong>
                    </div>
                    <span className="opacity-30">•</span>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                      <span className="text-muted">Status:</span>
                      <span className="text-brand font-semibold">
                        {study.status}
                      </span>
                    </div>
                  </div>

                  {/* Disciplines */}
                  <div className="flex flex-wrap gap-1.5">
                    {study.disciplines.map((d) => (
                      <span
                        key={d}
                        className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-medium"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              {/* Hero Image Block */}
              <div className="my-8 space-y-2">
                <div className="relative w-full aspect-[16/10] bg-slate-900 border border-slate-300 overflow-hidden">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 860px"
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] text-muted font-mono text-center">
                  Fig 1.0 — {study.hero.alt}
                </p>
              </div>

              {/* Executive Summary Callout */}
              <div
                id="executive-summary"
                className="my-8 p-6 sm:p-8 rounded-none bg-slate-50 border-l-4 border-l-brand border-y border-r border-slate-200 space-y-2 scroll-mt-24"
              >
                <div className="flex items-center gap-2 text-brand font-display font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Executive Summary</span>
                </div>
                <p className="font-body text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                  {study.summary}
                </p>
              </div>

              {/* Key Technical Metrics Grid */}
              {study.metrics && study.metrics.length > 0 && (
                <section
                  id="technical-metrics"
                  className="my-10 space-y-4 scroll-mt-24"
                >
                  <h2 className="font-display font-bold text-lg sm:text-xl text-heading tracking-tight uppercase tracking-wider text-xs flex items-center gap-2 text-brand">
                    <Cpu className="w-4 h-4" />
                    <span>Technical KPIs &amp; Deployment Metrics</span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {study.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-slate-300 rounded-none shadow-2xs"
                      >
                        <span className="block text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wide truncate mb-1">
                          {m.label}
                        </span>
                        <span className="font-display text-xl sm:text-2xl font-bold text-brand block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Key Engineering Highlights */}
              {study.highlights && study.highlights.length > 0 && (
                <section
                  id="engineering-highlights"
                  className="my-10 space-y-4 scroll-mt-24"
                >
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-heading tracking-tight pb-3 border-b border-slate-200">
                    Key Engineering Highlights
                  </h2>
                  <ul className="space-y-3 pt-1 text-slate-800 text-[15px] sm:text-[1.0625rem] leading-[1.75]">
                    {study.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Full Engineering Sections Breakdown */}
              <div className="py-2 space-y-8 font-body text-slate-800 text-[15px] sm:text-[1.0625rem] leading-[1.8]">
                {study.sections.map((s, idx) => {
                  const sectionId = `section-${idx + 1}-${s.heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`;
                  return (
                    <section
                      key={idx}
                      id={sectionId}
                      className="space-y-3 pt-6 border-t border-slate-200 scroll-mt-24 group relative"
                    >
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-heading tracking-tight leading-snug flex items-center gap-2">
                        <a
                          href={`#${sectionId}`}
                          className="text-slate-400 hover:text-brand opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Link to ${s.heading}`}
                        >
                          <Hash className="w-4 h-4 inline" />
                        </a>
                        <span>{s.heading}</span>
                      </h2>
                      <p className="text-slate-700 leading-[1.8]">{s.body}</p>
                    </section>
                  );
                })}
              </div>

              {/* Verified Outcomes Checklist */}
              {study.outcomes && study.outcomes.length > 0 && (
                <section
                  id="verified-outcomes"
                  className="my-10 p-6 sm:p-8 rounded-none bg-slate-50 border-l-4 border-l-brand border-y border-r border-slate-200 space-y-4 scroll-mt-24"
                >
                  <div className="flex items-center gap-2 text-brand font-display font-bold text-base sm:text-lg">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>Verified Outcomes &amp; Engineering Deliverables</span>
                  </div>
                  <ul className="space-y-2.5 pt-1 text-sm sm:text-base text-slate-800">
                    {study.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand mt-1 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Engineering Scoping CTA Card */}
              <div className="mt-12 p-6 sm:p-8 rounded-none bg-slate-50 border border-slate-300 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-ice-light text-brand mx-auto border border-brand/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-heading">
                    Engineer Your Product with SolveMpire
                  </h3>
                  <p className="text-body text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Have an upcoming mechanical packaging, custom PCB, or automated machine requirement? Let&apos;s build it together.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-none shadow-md shadow-brand/20 transition-all"
                  >
                    <span>Scope Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Document Navigation - Next/Prev Project */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevStudy ? (
                <Link
                  href={`/work/${prevStudy.slug}`}
                  className="p-5 rounded-none bg-white border border-slate-300 hover:border-brand/50 shadow-xs hover:shadow-md transition-all text-left group"
                >
                  <span className="text-xs text-muted block mb-1">
                    ← Previous Case Study
                  </span>
                  <span className="font-display font-semibold text-sm text-heading group-hover:text-brand line-clamp-1">
                    {prevStudy.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextStudy && (
                <Link
                  href={`/work/${nextStudy.slug}`}
                  className="p-5 rounded-none bg-white border border-slate-300 hover:border-brand/50 shadow-xs hover:shadow-md transition-all text-right group ml-auto w-full"
                >
                  <span className="text-xs text-muted block mb-1">
                    Next Case Study →
                  </span>
                  <span className="font-display font-semibold text-sm text-heading group-hover:text-brand line-clamp-1">
                    {nextStudy.title}
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
