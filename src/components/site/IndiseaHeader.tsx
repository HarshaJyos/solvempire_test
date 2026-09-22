"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Moon, Sun, Mail, Phone, MapPin, X } from "lucide-react";

const NAV_ITEMS = [
  { num: "01", label: "Home", href: "/", color: "blue", desc: "Product engineering studio overview" },
  { num: "02", label: "Capabilities", href: "/services", color: "yellow", desc: "CAD, PCB, RTOS & Cloud specifications" },
  { num: "03", label: "Case Studies", href: "/work", color: "green", desc: "Real-world production machines & systems" },
  { num: "04", label: "FreshPod Machine", href: "/work/freshpod-machine", color: "red", desc: "Featured automated sanitation system" },
  { num: "05", label: "Process", href: "/#process", color: "blue", desc: "Discovery to volume manufacturing" },
  { num: "06", label: "Studio & Team", href: "/about", color: "yellow", desc: "Engineers, labs, and operating tenets" },
  { num: "07", label: "Contact", href: "/contact", color: "green", desc: "Scope your project directly with engineering leads" },
];

export function IndiseaHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const activeItem = hoveredIndex !== null ? NAV_ITEMS[hoveredIndex] : NAV_ITEMS[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !menuOpen
            ? "bg-[#F0EDEA]/90 backdrop-blur-md border-b border-[var(--border-hairline)] py-3.5 shadow-xs"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <div className="indisea-wrap flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            aria-label="SolveMpire home"
            className="flex items-center gap-3 group relative z-50"
          >
            <div className="relative h-8 sm:h-9 w-36 sm:w-44">
              <Image
                src="/logo.png"
                alt="SolveMpire"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Right Header Controls: Talk to Us CTA + Circular Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-50">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-heading)] text-[var(--surface-canvas)] font-display font-bold text-xs tracking-wide uppercase hover:opacity-90 transition-all"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Indisea-style 48px Circular Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="w-12 h-12 rounded-full border-2 border-[var(--text-heading)] bg-[var(--surface-canvas)] text-[var(--text-heading)] flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`block w-4 h-0.5 bg-[var(--text-heading)] rounded-full transition-transform duration-300 ease-out ${
                    menuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-[var(--text-heading)] rounded-full transition-transform duration-300 ease-out ${
                    menuOpen ? "-rotate-45 -translate-y-0" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Menu Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation menu"
        className={`fixed inset-0 z-40 bg-[var(--surface-canvas)] text-[var(--text-heading)] flex flex-col justify-between transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Main Menu Grid */}
        <div className="flex-1 indisea-wrap pt-28 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 overflow-y-auto">
          {/* Left Column: Numbered Navigation Links */}
          <nav className="lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-3">
            {NAV_ITEMS.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="group flex items-baseline gap-4 sm:gap-6 py-1 transition-colors"
                >
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold tracking-widest transition-colors ${
                      item.color === "blue"
                        ? "text-[var(--indisea-sky-blue)]"
                        : item.color === "yellow"
                        ? "text-[var(--indisea-yellow-800)]"
                        : item.color === "red"
                        ? "text-[var(--indisea-node-red)]"
                        : "text-[var(--indisea-link-green)]"
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-[var(--text-heading)] group-hover:text-[#2563EB] group-hover:translate-x-2 transition-all">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Column: Dynamic Preview & Description Card */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full">
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="indisea-eyebrow">
                  SECTION {activeItem.num} // SPECIFICATION
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[var(--text-heading)]">
                  {activeItem.label}
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  {activeItem.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>SOLVEMPIRE // STUDIO</span>
                <span className="text-[#2563EB] font-bold uppercase">PHYSICAL + DIGITAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Contact & Studio Details Bar */}
        <div className="border-t border-[var(--border-hairline)] bg-[var(--surface-card)]/50 py-6">
          <div className="indisea-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="indisea-eyebrow block mb-1">Direct Engineering Email</span>
              <a
                href="mailto:contact@solvempire.com"
                className="font-medium text-[var(--text-heading)] hover:text-[#2563EB] transition-colors"
              >
                contact@solvempire.com
              </a>
            </div>

            <div>
              <span className="indisea-eyebrow block mb-1">Direct Phone</span>
              <a
                href="tel:+919121996739"
                className="font-medium text-[var(--text-heading)] hover:text-[#2563EB] transition-colors"
              >
                +91 91219 96739
              </a>
            </div>

            <div>
              <span className="indisea-eyebrow block mb-1">Design Studio &amp; Lab</span>
              <p className="text-[var(--text-muted)] font-normal text-xs leading-relaxed">
                Bhimavaram, Andhra Pradesh, India
              </p>
            </div>

            <div className="flex items-center sm:justify-end">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-indisea-blue text-xs py-2.5 px-5"
              >
                <span>Scope Project &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
