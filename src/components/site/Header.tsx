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
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/85 backdrop-blur-md border-b border-hairline/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg p-1 -m-1"
          aria-label={`${COMPANY.brandName} Home`}
        >
          <Image
            src="/logo.png"
            alt={COMPANY.brandName}
            width={160}
            height={36}
            priority
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-body"
        >
          <Link
            href="/work"
            className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1.5 py-0.5"
          >
            Work
          </Link>
          <Link
            href="/services"
            className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1.5 py-0.5"
          >
            Services
          </Link>
          <Link
            href="/#process"
            className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1.5 py-0.5"
          >
            Process
          </Link>
          <Link
            href="/team"
            className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1.5 py-0.5"
          >
            Team
          </Link>
          <Link
            href="/journal"
            className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1.5 py-0.5"
          >
            Journal
          </Link>
          <Link
            href="/about"
            className="hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1.5 py-0.5"
          >
            About
          </Link>
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-brand/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Start a Project
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
          className="md:hidden p-2 text-heading hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
          className="md:hidden bg-surface/95 backdrop-blur-md border-b border-hairline px-6 py-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <Link
            href="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-heading hover:text-brand font-medium text-base py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          >
            Work (Case Studies)
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-heading hover:text-brand font-medium text-base py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          >
            Services & Capabilities
          </Link>
          <Link
            href="/#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-heading hover:text-brand font-medium text-base py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          >
            Our Process
          </Link>
          <Link
            href="/team"
            onClick={() => setMobileMenuOpen(false)}
            className="text-heading hover:text-brand font-medium text-base py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          >
            Team
          </Link>
          <Link
            href="/journal"
            onClick={() => setMobileMenuOpen(false)}
            className="text-heading hover:text-brand font-medium text-base py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          >
            Journal (Blog)
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-heading hover:text-brand font-medium text-base py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          >
            About Us & Team
          </Link>
          <div className="pt-2 border-t border-hairline flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center bg-brand hover:bg-brand-hover text-white font-medium px-5 py-3 rounded-full text-center text-sm shadow-sm"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
