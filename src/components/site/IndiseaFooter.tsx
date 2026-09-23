"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Copy, Check, Mail, Phone, MapPin } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

export function IndiseaFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support@solvempire.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--surface-canvas-alt)] text-[var(--text-heading)] pt-20 pb-8 border-t border-[var(--border-hairline)] font-sans">
      <div className="indisea-wrap space-y-16">
        {/* 12-Column Swiss Navigation Grid */}
        <div className="indisea-grid">
          {/* Brand Column (Span 3) */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block relative h-8 w-44">
              <Image
                src="/logo.png"
                alt="SolveMpire — Physical Product Engineering Studio Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
              We design, engineer, prototype, and manufacture physical machines, custom electronics, and connected IoT platforms.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] text-[10px] font-mono font-bold text-slate-700 uppercase">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
                <span>IN-HOUSE LAB ACTIVE</span>
              </span>
              <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase">DFM // ISO STANDARDS</span>
            </div>
          </div>

          {/* Navigation Column (Span 2) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-3">
            <span className="indisea-eyebrow block">Navigation</span>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors font-medium">
                  Case Studies Archive
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  Research &amp; Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  Engineering Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Case Studies Column (Span 3) */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3 space-y-3">
            <span className="indisea-eyebrow block">Case Studies</span>
            <ul className="space-y-2 text-sm">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors block leading-snug"
                  >
                    {study.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines Column (Span 2) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-3">
            <span className="indisea-eyebrow block">Disciplines</span>
            <ul className="space-y-2 text-sm text-[var(--text-body)]">
              <li>
                <Link href="/services#mechanical" className="hover:text-[#1F56C6] transition-colors">
                  Mechanical CAD &amp; DFM
                </Link>
              </li>
              <li>
                <Link href="/services#electronics" className="hover:text-[#1F56C6] transition-colors">
                  Custom Multi-Layer PCB
                </Link>
              </li>
              <li>
                <Link href="/services#firmware" className="hover:text-[#1F56C6] transition-colors">
                  Embedded RTOS Firmware
                </Link>
              </li>
              <li>
                <Link href="/services#cloud" className="hover:text-[#1F56C6] transition-colors">
                  Cloud IoT &amp; Telemetry
                </Link>
              </li>
              <li>
                <Link href="/services#manufacturing" className="hover:text-[#1F56C6] transition-colors">
                  Volume Manufacturing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Column (Span 2) */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-2 space-y-3">
            <span className="indisea-eyebrow block">Contact Directly</span>
            <div className="space-y-2 text-sm">
              <div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-[var(--text-body)] hover:text-[#1F56C6] transition-colors cursor-pointer"
                >
                  <span className="break-all">support@solvempire.com</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  )}
                </button>
              </div>

              <div>
                <a
                  href="tel:+919701341323"
                  className="text-[var(--text-body)] hover:text-[#1F56C6] transition-colors block font-mono text-xs"
                >
                  +91 97013 41323
                </a>
              </div>

              <div className="pt-1">
                <a
                  href="https://maps.app.goo.gl/7awCUTuTPqBsHT4c7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--text-muted)] hover:text-[#1F56C6] leading-relaxed block"
                >
                  SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, Andhra Pradesh, India ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Monolithic Full-Width Brand Wordmark Watermark */}
        <div className="py-6 border-y border-[var(--border-hairline)] overflow-hidden">
          <div className="relative w-full aspect-[2000/350] opacity-20 hover:opacity-35 transition-opacity">
            <Image
              src="/logo.svg"
              alt="SolveMpire Monolithic Hardware Engineering Brand Wordmark"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[var(--text-muted)]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>&copy; {new Date().getFullYear()} SolveMpire Technologies Pvt Ltd.</span>
            <Link href="/privacy" className="hover:text-[var(--text-heading)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-heading)] transition-colors">
              Terms of Service
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
