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
    <div className="min-h-screen w-full flex flex-col bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6] selection:text-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#0f0f10]/10 z-50 pointer-events-none">
        <div
          className="h-full bg-[#3b82f6] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 pb-24">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 font-mono">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f0f10] hover:text-[#3b82f6] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; RETURN TO CASE ARCHIVES</span>
          </Link>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] text-xs font-bold uppercase text-[#0f0f10] transition-all cursor-pointer"
            aria-label="Share case study"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span className="text-[#3b82f6]">LINK COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE DOSSIER</span>
              </>
            )}
          </button>
        </div>

        {/* 2-Column Layout */}
        <div className="flex justify-center items-start gap-8 lg:gap-10 relative">
          {/* STICKY DOCUMENT OUTLINE SIDEBAR */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-28 space-y-4 select-none font-mono">
            <div className="bg-white border-2 border-[#0f0f10] shadow-brutal-md p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-[#0f0f10] text-xs font-black text-[#0f0f10] uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-[#3b82f6]" />
                <span>DOSSIER OUTLINE</span>
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
                            "flex items-start gap-2 py-1.5 px-2 transition-colors group text-left border",
                            isActive
                              ? "bg-[#3b82f6] text-white font-bold border-[#0f0f10]"
                              : "text-[#3f3f46] hover:bg-[#f0f7ff] hover:text-[#0f0f10] border-transparent"
                          )}
                        >
                          <span className={cn(
                            "text-[10px] shrink-0 mt-0.5 font-bold",
                            isActive ? "text-white" : "text-[#71717a]"
                          )}>
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <span className="line-clamp-2 uppercase font-bold text-[11px]">{item.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* THE CASE STUDY SHEET */}
          <div className="w-full max-w-[880px] flex-1 min-w-0">
            <article className="w-full bg-white border-2 border-[#0f0f10] shadow-brutal-xl p-6 sm:p-12 md:p-14 relative overflow-hidden break-words">
              {/* System Window Header Stamp */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#0f0f10] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#3b82f6] border border-[#0f0f10]" />
                  <span className="font-bold uppercase tracking-wider text-[#0f0f10]">
                    DOSSIER: CASE_STUDY // SOLVEMPIRE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#3b82f6] text-white border border-[#0f0f10] px-2.5 py-0.5 font-bold uppercase text-[11px]">
                    {study.status}
                  </span>
                </div>
              </div>

              {/* Title Header */}
              <header className="pt-6 pb-6 border-b-2 border-[#0f0f10] space-y-4">
                <div className="inline-block px-2.5 py-0.5 bg-[#f7f6f2] border border-[#0f0f10] font-mono font-bold text-xs text-[#0f0f10] tracking-widest uppercase">
                  {study.category}
                </div>
                <h1 className="font-display font-black text-3xl sm:text-5xl text-[#0f0f10] uppercase tracking-tight leading-[1.05]">
                  {study.title}
                </h1>

                {/* Technical Metadata Strip */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span className="text-[#71717a] uppercase">CLIENT:</span>
                      <strong className="text-[#0f0f10] font-bold uppercase">
                        {study.client}
                      </strong>
                    </div>
                  </div>

                  {/* Disciplines */}
                  <div className="flex flex-wrap gap-1.5">
                    {study.disciplines.map((d) => (
                      <span
                        key={d}
                        className="px-2 py-0.5 bg-[#f0f7ff] border border-[#0f0f10] text-[#0f0f10] text-[10px] font-bold uppercase"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              {/* Hero Image Block */}
              <div className="my-8 space-y-2">
                <div className="relative w-full aspect-[16/9] bg-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-md overflow-hidden">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 860px"
                    className="object-cover"
                  />
                </div>
                <p className="font-mono text-[11px] text-[#71717a] text-center uppercase tracking-wider font-bold">
                  // FIG 1.0 — {study.hero.alt}
                </p>
              </div>

              {/* Executive Summary Callout */}
              <div
                id="executive-summary"
                className="my-8 p-6 sm:p-8 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm space-y-3 scroll-mt-24 font-mono"
              >
                <div className="font-bold text-xs uppercase tracking-wider text-[#3b82f6] flex items-center gap-2 pb-2 border-b border-[#0f0f10]/10">
                  <span className="w-2.5 h-2.5 bg-[#3b82f6] border border-[#0f0f10]" />
                  <span>EXECUTIVE SUMMARY</span>
                </div>
                <p className="font-sans text-base sm:text-lg text-[#0f0f10] leading-relaxed font-normal">
                  {study.summary}
                </p>
              </div>

              {/* Key Technical Metrics Grid */}
              {study.metrics && study.metrics.length > 0 && (
                <section
                  id="technical-metrics"
                  className="my-10 space-y-4 scroll-mt-24 font-mono"
                >
                  <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-[#0f0f10]">
                    <Cpu className="w-4 h-4 text-[#3b82f6]" />
                    <span>TECHNICAL KPIS &amp; VERIFIED METRICS</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {study.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border-2 border-[#0f0f10] shadow-brutal-xs"
                      >
                        <span className="block font-mono text-[10px] text-[#71717a] font-bold uppercase tracking-wide truncate mb-1">
                          {m.label}
                        </span>
                        <span className="font-display text-2xl sm:text-3xl font-black text-[#0f0f10] block">
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
                  className="my-10 space-y-4 scroll-mt-24 font-mono"
                >
                  <h2 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] pb-3 border-b-2 border-[#0f0f10]">
                    ENGINEERING HIGHLIGHTS
                  </h2>
                  <ul className="space-y-3 pt-2 font-sans text-sm sm:text-base text-[#27272a] leading-relaxed">
                    {study.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Full Engineering Sections Breakdown */}
              <div className="py-2 space-y-8 text-[15px] sm:text-base text-[#27272a] leading-relaxed font-sans">
                {study.sections.map((s, idx) => {
                  const sectionId = `section-${idx + 1}-${s.heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`;
                  return (
                    <section
                      key={idx}
                      id={sectionId}
                      className="space-y-3 pt-6 border-t-2 border-[#0f0f10] scroll-mt-24 group relative"
                    >
                      <h2 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] flex items-center gap-2">
                        <a
                          href={`#${sectionId}`}
                          className="text-[#71717a] hover:text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity font-mono"
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

              {/* Verified Outcomes Checklist */}
              {study.outcomes && study.outcomes.length > 0 && (
                <section
                  id="verified-outcomes"
                  className="my-10 p-6 sm:p-8 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm space-y-4 scroll-mt-24 font-mono"
                >
                  <div className="flex items-center gap-2 text-[#0f0f10] font-bold text-xs uppercase tracking-wider pb-2 border-b border-[#0f0f10]/10">
                    <ShieldCheck className="w-4 h-4 text-[#3b82f6]" />
                    <span>VERIFIED OUTCOMES &amp; DELIVERABLES</span>
                  </div>
                  <ul className="space-y-3 pt-1 font-sans text-sm sm:text-base text-[#0f0f10]">
                    {study.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] mt-0.5 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Engineering Scoping CTA Card */}
              <div className="mt-12 p-8 sm:p-10 bg-[#3b82f6] border-2 border-[#0f0f10] shadow-brutal-lg text-center space-y-4 font-mono text-white">
                <div className="inline-flex items-center justify-center px-3 py-1 bg-white text-[#0f0f10] border-2 border-[#0f0f10] text-xs font-black uppercase shadow-brutal-xs mx-auto">
                  <Sparkles className="w-3.5 h-3.5 mr-1 fill-[#0f0f10]" />
                  <span>SOLVEMPIRE PROJECT SCOPING</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                  ENGINEER YOUR NEXT PRODUCT
                </h3>
                <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto leading-relaxed font-sans">
                  Have an upcoming mechanical enclosure, custom multi-layer PCB, embedded firmware, or automated machine requirement? Connect directly with our engineering architects.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#0f0f10] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 border-2 border-white shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    <span>&gt; SCOPE YOUR PROJECT IN 60S</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Document Navigation - Next/Prev Project */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              {prevStudy ? (
                <Link
                  href={`/work/${prevStudy.slug}`}
                  className="p-5 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-brutal-sm transition-all text-left group"
                >
                  <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider block mb-1">
                    &larr; PREVIOUS CASE STUDY
                  </span>
                  <span className="font-display font-black text-sm uppercase text-[#0f0f10] group-hover:text-[#3b82f6] line-clamp-1">
                    {prevStudy.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextStudy && (
                <Link
                  href={`/work/${nextStudy.slug}`}
                  className="p-5 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-brutal-sm transition-all text-right group ml-auto w-full"
                >
                  <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider block mb-1">
                    NEXT CASE STUDY &rarr;
                  </span>
                  <span className="font-display font-black text-sm uppercase text-[#0f0f10] group-hover:text-[#3b82f6] line-clamp-1">
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
