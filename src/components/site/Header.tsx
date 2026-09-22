"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COMPANY } from "@/lib/company";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);

  // Scroll awareness for sticky glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-editorial-xs py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            aria-label={`${COMPANY.brandName} Home`}
          >
            <Image
              src="/logo.png"
              alt={COMPANY.brandName}
              width={160}
              height={38}
              priority
              className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Live Studio Status Pill */}
          <div className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200/60 text-[11px] font-mono font-medium text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span>STUDIO ACTIVE</span>
          </div>
        </div>

        {/* Desktop Primary Navigation (Swiss / International Minimalist Grid) */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/70 shadow-editorial-xs font-display text-xs font-semibold text-slate-600"
        >
          <Link
            href="/work"
            className="px-3.5 py-1.5 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Work
          </Link>
          <Link
            href="/services"
            className="px-3.5 py-1.5 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Capabilities
          </Link>
          <a
            href="#process"
            className="px-3.5 py-1.5 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Process
          </a>
          <Link
            href="/team"
            className="px-3.5 py-1.5 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Team
          </Link>
          <Link
            href="/about"
            className="px-3.5 py-1.5 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            About
          </Link>
          <Link
            href="/journal"
            className="px-3.5 py-1.5 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Journal
          </Link>
        </nav>

        {/* Desktop Action CTA Button with Arrow Slide */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/contact"
            className="group btn-editorial btn-editorial-primary px-4 sm:px-5 py-2.5 text-xs tracking-wide flex items-center gap-2 whitespace-nowrap shadow-editorial-sm"
          >
            <span>Let&apos;s Build Together</span>
            <ArrowRight className="w-3.5 h-3.5 arrow-slide text-blue-400" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          ref={menuTriggerRef}
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-dialog"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden p-2 text-slate-700 bg-white border border-slate-200 rounded-xl shadow-xs"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dialog"
          ref={mobileDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 flex flex-col gap-3 shadow-editorial-lg animate-in slide-in-from-top-2 duration-200"
        >
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-sm font-semibold text-slate-900 py-2.5 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Featured Case Studies</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-sm font-semibold text-slate-900 py-2.5 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Engineering Capabilities</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-sm font-semibold text-slate-900 py-2.5 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Engineering Process</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </a>
          <Link
            href="/team"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-sm font-semibold text-slate-900 py-2.5 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Leadership &amp; Engineers</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-sm font-semibold text-slate-900 py-2.5 border-b border-slate-100 flex items-center justify-between"
          >
            <span>About SolveMpire</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
          <Link
            href="/journal"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-sm font-semibold text-slate-900 py-2.5 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Journal &amp; White Papers</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>

          <div className="pt-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-editorial btn-editorial-blue w-full py-3 text-xs tracking-wide shadow-editorial-sm"
            >
              <span>Scope Your Project in 60s</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
