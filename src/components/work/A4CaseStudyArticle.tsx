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
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Building2,
  Hash,
  Sparkles,
  ListOrdered,
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
    <div className="min-h-screen w-full flex flex-col bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50 pointer-events-none">
        <div
          className="h-full bg-blue-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 font-display">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Case Archives</span>
          </Link>

          <button
            onClick={handleCopy}
            className="btn-editorial btn-editorial-secondary px-3.5 py-1.5 text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer shadow-xs"
            aria-label="Share case study"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-blue-600 font-bold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Case Study</span>
              </>
            )}
          </button>
        </div>

        {/* 2-Column Layout: Sticky Left Outline + Central Editorial Article */}
        <div className="flex justify-center items-start gap-8 lg:gap-10 relative">
          {/* Sticky Document Outline Sidebar */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-28 space-y-4 select-none">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-editorial-sm p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <ListOrdered className="w-4 h-4 text-blue-600" />
                <span>Document Outline</span>
              </div>
              <nav>
                <ul className="space-y-1 text-xs leading-normal max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar">
                  {tocItems.map((item, idx) => {
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

          {/* Central Editorial Case Study Document */}
          <div className="w-full max-w-[880px] flex-1 min-w-0">
            <article className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-editorial-md p-6 sm:p-12 md:p-14 relative overflow-hidden break-words">
              {/* Header Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="font-semibold uppercase tracking-wide text-slate-500">
                    ENGINEERING CASE DOSSIER // {study.slug.toUpperCase()}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase border border-emerald-200/60">
                  {study.status}
                </span>
              </div>

              {/* Title Header */}
              <header className="pt-6 pb-6 border-b border-slate-100 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-display font-bold text-xs tracking-wide">
                  {study.category}
                </div>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-[1.08]">
                  {study.title}
                </h1>

                {/* Technical Metadata Strip */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Client:</span>
                    <strong className="text-slate-900 font-bold">
                      {study.client}
                    </strong>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {study.disciplines.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-medium"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              {/* Hero Image Showcase */}
              <div className="my-8 space-y-2">
                <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden shadow-editorial-sm">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 860px"
                    className="object-cover"
                  />
                </div>
                <p className="font-mono text-[11px] text-slate-400 text-center uppercase tracking-wider">
                  Figure 1.0 &mdash; {study.hero.alt}
                </p>
              </div>

              {/* Executive Summary Callout */}
              <div
                id="executive-summary"
                className="my-8 p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-3 scroll-mt-24"
              >
                <div className="font-display font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Executive Summary</span>
                </div>
                <p className="font-sans text-base sm:text-lg text-slate-900 leading-relaxed font-normal">
                  {study.summary}
                </p>
              </div>

              {/* Key Technical Metrics Grid */}
              {study.metrics && study.metrics.length > 0 && (
                <section
                  id="technical-metrics"
                  className="my-10 space-y-4 scroll-mt-24 font-sans"
                >
                  <div className="flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-slate-500">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>Technical KPIs &amp; Verified Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {study.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1"
                      >
                        <span className="block font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-wide truncate">
                          {m.label}
                        </span>
                        <span className="font-display font-bold text-xl sm:text-2xl text-slate-900 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Engineering Highlights */}
              {study.highlights && study.highlights.length > 0 && (
                <section
                  id="engineering-highlights"
                  className="my-10 space-y-4 scroll-mt-24"
                >
                  <h2 className="font-display font-bold text-2xl text-slate-950 pb-3 border-b border-slate-100">
                    Engineering Highlights
                  </h2>
                  <ul className="space-y-3 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {study.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Engineering Sections Breakdown */}
              <div className="py-2 space-y-8 text-[15px] sm:text-base text-slate-700 leading-relaxed font-sans">
                {study.sections.map((s, idx) => {
                  const sectionId = `section-${idx + 1}-${s.heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`;
                  return (
                    <section
                      key={idx}
                      id={sectionId}
                      className="space-y-3 pt-6 border-t border-slate-100 scroll-mt-24 group relative"
                    >
                      <h2 className="font-display font-bold text-2xl text-slate-950 flex items-center gap-2">
                        <a
                          href={`#${sectionId}`}
                          className="text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Link to ${s.heading}`}
                        >
                          <Hash className="w-4 h-4 inline" />
                        </a>
                        <span>{s.heading}</span>
                      </h2>
                      <p className="leading-relaxed">{s.body}</p>
                    </section>
                  );
                })}
              </div>

              {/* Verified Outcomes */}
              {study.outcomes && study.outcomes.length > 0 && (
                <section
                  id="verified-outcomes"
                  className="my-10 p-6 sm:p-8 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-4 scroll-mt-24"
                >
                  <div className="flex items-center gap-2 text-emerald-800 font-display font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Outcomes &amp; Deliverables</span>
                  </div>
                  <ul className="space-y-2.5 pt-1 text-sm sm:text-base text-slate-800">
                    {study.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Engineering Scoping CTA Card */}
              <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-slate-950 to-blue-950 text-center space-y-4 text-white shadow-editorial-md">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Engineer Your Next Product With SolveMpire
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Have an upcoming mechanical enclosure, custom multi-layer PCB, embedded firmware, or automated machine requirement? Let&apos;s build it together.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="btn-editorial btn-editorial-blue px-6 py-3 text-xs tracking-wide shadow-editorial-sm"
                  >
                    <span>Scope Your Project in 60s &rarr;</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Document Navigation - Next/Prev Project */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-display">
              {prevStudy ? (
                <Link
                  href={`/work/${prevStudy.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-editorial-xs hover:shadow-editorial-sm transition-all text-left group"
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    &larr; Previous Case Study
                  </span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-1">
                    {prevStudy.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextStudy && (
                <Link
                  href={`/work/${nextStudy.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-editorial-xs hover:shadow-editorial-sm transition-all text-right group ml-auto w-full"
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Next Case Study &rarr;
                  </span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-1">
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
