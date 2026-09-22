"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { CaseStudy } from "@/content/case-studies";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Share2, Sparkles } from "lucide-react";

interface IndiseaDossierArticleProps {
  study: CaseStudy;
  prevStudy?: { title: string; slug: string };
  nextStudy?: { title: string; slug: string };
}

export function IndiseaDossierArticle({
  study,
  prevStudy,
  nextStudy,
}: IndiseaDossierArticleProps) {
  const [copied, setCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const tocItems = [
    { id: "overview", title: "Executive Summary" },
    ...(study.metrics && study.metrics.length > 0
      ? [{ id: "metrics", title: "Key Benchmarks & Metrics" }]
      : []),
    ...study.sections.map((s, idx) => ({
      id: `section-${idx + 1}`,
      title: s.heading,
    })),
    ...(study.outcomes && study.outcomes.length > 0
      ? [{ id: "outcomes", title: "Verified Outcomes" }]
      : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
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
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <article className="indisea-wrap space-y-12 sm:space-y-16">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--text-muted)] hover:text-[#2563EB] uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Case Studies</span>
            </Link>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Dossier</span>
                </>
              )}
            </button>
          </div>

          {/* Dossier Header & Spec Matrix */}
          <header className="space-y-8">
            <div className="space-y-3">
              <span className="indisea-eyebrow">
                ENGINEERING DOSSIER // {study.slug.toUpperCase()}
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-heading)] tracking-tight leading-[1.08]">
                {study.title}
              </h1>
              <p className="font-sans text-lg sm:text-xl text-[var(--text-muted)] max-w-4xl leading-relaxed font-normal">
                {study.summary}
              </p>
            </div>

            {/* Spec Metadata Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs">
              <div>
                <span className="indisea-eyebrow block">Client</span>
                <span className="font-display font-bold text-sm sm:text-base text-[var(--text-heading)] mt-1 block">
                  {study.client}
                </span>
              </div>
              <div>
                <span className="indisea-eyebrow block">Status</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-emerald-600 mt-1 block uppercase">
                  {study.status}
                </span>
              </div>
              <div>
                <span className="indisea-eyebrow block">Category</span>
                <span className="font-mono text-xs sm:text-sm text-[var(--text-heading)] mt-1 block uppercase">
                  {study.category}
                </span>
              </div>
              <div>
                <span className="indisea-eyebrow block">Disciplines</span>
                <span className="font-mono text-xs text-[var(--text-muted)] mt-1 block truncate">
                  {study.disciplines.join(", ")}
                </span>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative aspect-[16/9] w-full rounded-3xl bg-slate-900 overflow-hidden border border-[var(--border-hairline)] shadow-sm">
              <Image
                src={study.hero.src}
                alt={study.hero.alt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </header>

          {/* Main 12-Column Dossier Content Split */}
          <div className="indisea-grid items-start gap-10 lg:gap-14 pt-4">
            {/* Left Sticky Table of Contents (Span 4) */}
            <aside className="hidden lg:block col-span-4 sticky top-28 space-y-6">
              <div className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="indisea-eyebrow block">Dossier Contents</span>
                <nav className="space-y-1 text-sm font-display">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-3 rounded-xl transition-colors ${
                        activeSectionId === item.id
                          ? "bg-[#2563EB] text-white font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--surface-canvas)]"
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Lead Engineering Contact Callout */}
              <div className="p-6 rounded-3xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 space-y-3">
                <span className="indisea-eyebrow text-[#0284C7] block">
                  Building a Similar System?
                </span>
                <p className="font-sans text-xs text-[var(--text-heading)] leading-relaxed">
                  Connect directly with our lead engineers to evaluate mechanical feasibility, component sourcing, and BOM cost modeling.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-display font-bold text-xs text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  <span>Scope With Lead Engineers &rarr;</span>
                </Link>
              </div>
            </aside>

            {/* Right Detailed Dossier Sections (Span 8) */}
            <div className="col-span-12 lg:col-span-8 space-y-12 sm:space-y-16">
              {/* Metrics Grid */}
              {study.metrics && study.metrics.length > 0 && (
                <section id="metrics" className="space-y-4">
                  <span className="indisea-eyebrow">Key Technical Metrics</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {study.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs"
                      >
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase font-semibold block truncate">
                          {m.label}
                        </span>
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-[#2563EB] mt-1 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Engineering Highlights */}
              {study.highlights && study.highlights.length > 0 && (
                <section className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                  <span className="indisea-eyebrow block">Engineering Highlights</span>
                  <ul className="space-y-3 font-sans text-sm sm:text-base text-[var(--text-heading)]">
                    {study.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Detailed Technical Sections */}
              {study.sections.map((sec, idx) => (
                <section
                  key={idx}
                  id={`section-${idx + 1}`}
                  className="space-y-4 pt-4 border-t border-[var(--border-hairline)]"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#2563EB]">
                      0{idx + 1}.0
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-heading)] tracking-tight">
                      {sec.heading}
                    </h2>
                  </div>

                  <p className="font-sans text-base sm:text-lg text-[var(--text-body)] leading-relaxed font-normal whitespace-pre-line">
                    {sec.body}
                  </p>
                </section>
              ))}

              {/* Verified Outcomes */}
              {study.outcomes && study.outcomes.length > 0 && (
                <section
                  id="outcomes"
                  className="p-8 sm:p-10 rounded-3xl bg-[#16A34A]/10 border border-[#16A34A]/20 space-y-4"
                >
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Sparkles className="w-5 h-5" />
                    <span className="indisea-eyebrow text-emerald-800">
                      Verified Production Outcomes
                    </span>
                  </div>
                  <ul className="space-y-3 font-sans text-sm sm:text-base text-emerald-950 font-medium">
                    {study.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span className="leading-relaxed">{out}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* Bottom Pagination Strip */}
          <div className="pt-12 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevStudy ? (
              <Link
                href={`/work/${prevStudy.slug}`}
                className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-colors flex flex-col justify-between"
              >
                <span className="indisea-eyebrow">&larr; Previous Case Study</span>
                <span className="font-display font-bold text-base text-[var(--text-heading)] mt-2">
                  {prevStudy.title}
                </span>
              </Link>
            ) : <div />}

            {nextStudy && (
              <Link
                href={`/work/${nextStudy.slug}`}
                className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-colors flex flex-col justify-between sm:text-right"
              >
                <span className="indisea-eyebrow">Next Case Study &rarr;</span>
                <span className="font-display font-bold text-base text-[var(--text-heading)] mt-2">
                  {nextStudy.title}
                </span>
              </Link>
            )}
          </div>
        </article>
      </main>

      <IndiseaFooter />
    </div>
  );
}
