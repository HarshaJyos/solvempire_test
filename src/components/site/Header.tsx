"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COMPANY } from "@/lib/company";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key press & handle focus trap
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
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#f0f7ff]/95 backdrop-blur-md border-b-2 border-[#0f0f10]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label={`${COMPANY.brandName} Home`}
        >
          <Image
            src="/logo.png"
            alt={COMPANY.brandName}
            width={160}
            height={38}
            priority
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 lg:gap-3 font-mono text-xs uppercase"
        >
          <Link
            href="/work"
            className="px-3 py-1.5 text-[#0f0f10] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#0f0f10] transition-colors rounded-sm font-semibold"
          >
            Work
          </Link>
          <Link
            href="/services"
            className="px-3 py-1.5 text-[#0f0f10] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#0f0f10] transition-colors rounded-sm font-semibold"
          >
            Services
          </Link>
          <a
            href="#methodology"
            className="px-3 py-1.5 text-[#0f0f10] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#0f0f10] transition-colors rounded-sm font-semibold"
          >
            Process
          </a>
          <Link
            href="/team"
            className="px-3 py-1.5 text-[#0f0f10] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#0f0f10] transition-colors rounded-sm font-semibold"
          >
            Team
          </Link>
          <Link
            href="/about"
            className="px-3 py-1.5 text-[#0f0f10] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#0f0f10] transition-colors rounded-sm font-semibold"
          >
            About
          </Link>
          <Link
            href="/journal"
            className="px-3 py-1.5 text-[#0f0f10] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#0f0f10] transition-colors rounded-sm font-semibold"
          >
            Journal
          </Link>
        </nav>

        {/* Desktop Action CTA Button */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/contact"
            className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase whitespace-nowrap"
          >
            <span className="text-[#f5c518] font-bold">&gt;</span>
            START A PROJECT
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
          className="md:hidden p-2 text-[#0f0f10] bg-white border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer / Dialog */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dialog"
          ref={mobileDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#f0f7ff] border-b-2 border-[#0f0f10] px-6 py-6 flex flex-col gap-3 shadow-brutal-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#0f0f10]/20">
            <span className="font-mono text-xs text-[#0f0f10]/70 font-semibold">[NAVIGATION]</span>
          </div>
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm font-semibold text-[#0f0f10] py-2 border-b border-[#0f0f10]/10 flex items-center justify-between"
          >
            <span>Work (Case Studies)</span>
            <span className="text-xs text-[#1d4ed8]">&rarr;</span>
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm font-semibold text-[#0f0f10] py-2 border-b border-[#0f0f10]/10 flex items-center justify-between"
          >
            <span>Services &amp; Capabilities</span>
            <span className="text-xs text-[#1d4ed8]">&rarr;</span>
          </Link>
          <a
            href="#methodology"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm font-semibold text-[#0f0f10] py-2 border-b border-[#0f0f10]/10 flex items-center justify-between"
          >
            <span>Our Process</span>
            <span className="text-xs text-[#1d4ed8]">&rarr;</span>
          </a>
          <Link
            href="/team"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm font-semibold text-[#0f0f10] py-2 border-b border-[#0f0f10]/10 flex items-center justify-between"
          >
            <span>Engineering Team</span>
            <span className="text-xs text-[#1d4ed8]">&rarr;</span>
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm font-semibold text-[#0f0f10] py-2 border-b border-[#0f0f10]/10 flex items-center justify-between"
          >
            <span>About SolveMpire</span>
            <span className="text-xs text-[#1d4ed8]">&rarr;</span>
          </Link>
          <Link
            href="/journal"
            onClick={() => setMobileMenuOpen(false)}
            className="font-mono text-sm font-semibold text-[#0f0f10] py-2 border-b border-[#0f0f10]/10 flex items-center justify-between"
          >
            <span>Journal</span>
            <span className="text-xs text-[#1d4ed8]">&rarr;</span>
          </Link>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-brutal bg-[#0f0f10] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal text-center font-mono font-bold text-xs py-3 tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span className="text-[#f5c518]">&gt;</span> START A PROJECT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
