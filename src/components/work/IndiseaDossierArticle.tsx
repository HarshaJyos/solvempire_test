"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { CaseStudy } from "@/content/case-studies";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Share2,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  Wrench,
  Activity,
  CheckCircle2,
} from "lucide-react";

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
    { id: "overview", title: "Executive Overview" },
    ...(study.metrics && study.metrics.length > 0
      ? [{ id: "metrics", title: "Key Production Metrics" }]
      : []),
    ...(study.highlights && study.highlights.length > 0
      ? [{ id: "highlights", title: "Core Engineering Highlights" }]
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

      <main id="main-content" className="flex-1 w-full pt-36 pb-24">
        <article className="indisea-wrap space-y-12 sm:space-y-16">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-bold text-[var(--text-muted)] hover:text-[#2563EB] uppercase tracking-wider transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>&larr; Back to Case Studies</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-600 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{study.status}</span>
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
                aria-label="Share case study"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Case Study</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hero Section: Giant Headline + Highlight Badges */}
          <header className="space-y-8" id="overview">
            <div className="space-y-4 max-w-5xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="indisea-eyebrow">
                  06 / CASE STUDY ARCHIVE // {study.client.toUpperCase()}
                </span>
                <span className="marker-pill marker-pill-yellow text-[11px] uppercase tracking-wide">
                  {study.category}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--text-heading)] tracking-tight leading-[1.02]">
                {study.title}
              </h1>

              <p className="font-sans text-lg sm:text-2xl text-[var(--text-muted)] leading-relaxed font-normal pt-2">
                {study.summary}
              </p>
            </div>

            {/* Immersive Hero Machine Visual */}
            <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full rounded-3xl bg-slate-950 overflow-hidden border border-[var(--border-hairline)] shadow-sm">
              <Image
                src={study.hero.src}
                alt={study.hero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-hairline)] text-xs font-mono font-bold text-[var(--text-heading)] uppercase shadow-xs">
                  CLIENT: {study.client}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-mono font-bold uppercase shadow-xs">
                  {study.status}
                </span>
              </div>
            </div>

            {/* Spec Quick Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs text-xs font-mono">
              <div>
                <span className="indisea-eyebrow block mb-1">Client Entity</span>
                <span className="font-bold text-sm text-[var(--text-heading)] block truncate font-display">
                  {study.client}
                </span>
              </div>
              <div>
                <span className="indisea-eyebrow block mb-1">Production Status</span>
                <span className="font-bold text-emerald-600 block truncate uppercase">
                  {study.status}
                </span>
              </div>
              <div>
                <span className="indisea-eyebrow block mb-1">Primary Discipline</span>
                <span className="font-bold text-[var(--text-heading)] block truncate uppercase">
                  {study.category}
                </span>
              </div>
              <div>
                <span className="indisea-eyebrow block mb-1">Engineering Scope</span>
                <span className="font-medium text-[var(--text-muted)] block truncate">
                  {study.disciplines.join(" • ")}
                </span>
              </div>
            </div>
          </header>

          {/* Key Production Metrics Wall (Giant Numbers First!) */}
          {study.metrics && study.metrics.length > 0 && (
            <section id="metrics" className="space-y-6 pt-4">
              <div className="flex items-center gap-2">
                <span className="indisea-eyebrow">
                  01 / verified production metrics &amp; volume
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {study.metrics.map((m, idx) => (
                  <div
                    key={m.label}
                    className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs space-y-2 relative overflow-hidden group hover:border-slate-400 transition-colors"
                  >
                    <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase font-semibold block tracking-wider truncate">
                      {m.label}
                    </span>
                    <span className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#2563EB] block tracking-tight">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upfront Engineering Highlights (The Core Feats) */}
          {study.highlights && study.highlights.length > 0 && (
            <section id="highlights" className="space-y-6 pt-6 border-t border-[var(--border-hairline)]">
              <div className="space-y-2">
                <span className="indisea-eyebrow">
                  02 / tangible engineering highlights
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight">
                  What Makes This System Unique
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {study.highlights.map((highlight, idx) => {
                  const badgeColor =
                    idx % 3 === 0
                      ? "marker-pill-yellow"
                      : idx % 3 === 1
                      ? "marker-pill-blue"
                      : "marker-pill-green";

                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-400 transition-colors"
                    >
                      <div className="space-y-3">
                        <span className={`marker-pill ${badgeColor} text-[10px] uppercase font-mono`}>
                          FEAT 0{idx + 1}
                        </span>
                        <p className="font-sans text-sm sm:text-base font-semibold text-[var(--text-heading)] leading-snug">
                          {highlight}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                        <span>SOLVEMPIRE LAB</span>
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 12-Column Deep-Dive System Architecture Breakdown */}
          <div className="indisea-grid items-start gap-10 lg:gap-14 pt-8 border-t border-[var(--border-hairline)]">
            {/* Left Sticky Table of Contents & Scoping Drawer (Span 4) */}
            <aside className="hidden lg:block col-span-4 sticky top-28 space-y-6">
              <div className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="indisea-eyebrow block">System Sections</span>
                <nav className="space-y-1 text-xs font-display">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded-xl transition-colors ${
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

              {/* Lead Engineering Scoping Box */}
              <div className="p-6 rounded-3xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 space-y-3">
                <span className="indisea-eyebrow text-[#0284C7] block">
                  Building a Similar System?
                </span>
                <p className="font-sans text-xs text-[var(--text-heading)] leading-relaxed">
                  Connect directly with our lead engineers to evaluate mechanical CAD packaging, custom PCB layouts, and volume manufacturing feasibility.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-display font-bold text-xs text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  <span>Scope With Lead Engineers &rarr;</span>
                </Link>
              </div>

              {/* Disciplines Chips */}
              <div className="p-6 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs space-y-3">
                <span className="indisea-eyebrow block">Disciplines Covered</span>
                <div className="flex flex-wrap gap-1.5">
                  {study.disciplines.map((d) => (
                    <span
                      key={d}
                      className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-[var(--surface-canvas)] text-[var(--text-muted)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Detailed Engineering Chapters (Span 8) */}
            <div className="col-span-12 lg:col-span-8 space-y-12 sm:space-y-16">
              {study.sections.map((sec, idx) => (
                <section
                  key={idx}
                  id={`section-${idx + 1}`}
                  className="space-y-4 pt-6 first:pt-0 border-t first:border-0 border-[var(--border-hairline)]"
                >
                  <div className="space-y-2">
                    <span className="indisea-eyebrow text-[#2563EB]">
                      0{idx + 3} // ARCHITECTURE CHAPTER
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight">
                      {sec.heading}
                    </h2>
                  </div>

                  <p className="font-sans text-base sm:text-lg text-[var(--text-body)] leading-relaxed font-normal whitespace-pre-line">
                    {sec.body}
                  </p>
                </section>
              ))}

              {/* Verified Production Outcomes Section */}
              {study.outcomes && study.outcomes.length > 0 && (
                <section
                  id="outcomes"
                  className="p-8 sm:p-10 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 space-y-5"
                >
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span className="indisea-eyebrow text-emerald-800">
                      Verified Field &amp; Production Outcomes
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                    Validated Performance In The Real World
                  </h3>

                  <ul className="space-y-3 font-sans text-sm sm:text-base text-emerald-950 font-medium">
                    {study.outcomes.map((out, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{out}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* Bottom Adjacent Case Studies Switcher */}
          <div className="pt-12 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevStudy ? (
              <Link
                href={`/work/${prevStudy.slug}`}
                className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-colors flex flex-col justify-between group"
              >
                <span className="indisea-eyebrow block mb-2">&larr; Previous Case Study</span>
                <span className="font-display font-bold text-lg text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
                  {prevStudy.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextStudy && (
              <Link
                href={`/work/${nextStudy.slug}`}
                className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-colors flex flex-col justify-between sm:text-right group"
              >
                <span className="indisea-eyebrow block mb-2">Next Case Study &rarr;</span>
                <span className="font-display font-bold text-lg text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
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
