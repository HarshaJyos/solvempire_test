"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const MENU_MODAL_ITEMS = [
  { num: "01", label: "Home", href: "/", color: "blue", desc: "Product engineering studio overview" },
  { num: "02", label: "Work", href: "/work", color: "green", desc: "Real-world production machines & systems" },
  { num: "03", label: "Capabilities", href: "/services", color: "yellow", desc: "Mechanical CAD, Multi-Layer PCB, RTOS & Cloud" },
  { num: "04", label: "Process", href: "/process", color: "blue", desc: "Our 6-stage engineering lifecycle from discovery to fleet support" },
  { num: "05", label: "Team", href: "/team", color: "green", desc: "Core engineers, architects, and builders" },
  { num: "06", label: "About", href: "/about", color: "yellow", desc: "Studio mission, tenets, and manufacturing lab" },
  { num: "07", label: "Journal", href: "/journal", color: "blue", desc: "Engineering research papers & whitepapers" },
  { num: "08", label: "Contact", href: "/contact", color: "red", desc: "Scope your project directly with engineering leads" },
];

export function IndiseaHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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

  const activeItem = hoveredIndex !== null ? MENU_MODAL_ITEMS[hoveredIndex] : MENU_MODAL_ITEMS[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !menuOpen
            ? "bg-[#F0EDEA]/90 backdrop-blur-md border-b border-[var(--border-hairline)] py-3 shadow-xs"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="indisea-wrap flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            aria-label="SolveMpire home"
            className="flex items-center gap-3 group relative z-50 shrink-0"
          >
            <div className="relative h-7 sm:h-8 w-32 sm:w-40">
              <Image
                src="/logo.png"
                alt="SolveMpire — Turnkey Physical Product Engineering Studio"
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
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F56C6] text-white font-display font-bold text-xs tracking-wide uppercase hover:bg-[#17449E] transition-all shadow-2xs"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Circular Menu Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--text-heading)] bg-[var(--surface-canvas)] text-[var(--text-heading)] flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
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
          <nav className="lg:col-span-7 flex flex-col justify-center space-y-1.5 sm:space-y-2">
            {MENU_MODAL_ITEMS.map((item, idx) => {
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
                        ? "text-[#1F56C6]"
                        : item.color === "yellow"
                        ? "text-[var(--indisea-yellow-800)]"
                        : item.color === "red"
                        ? "text-[var(--indisea-node-red)]"
                        : "text-[var(--indisea-link-green)]"
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[44px] uppercase tracking-tight leading-none text-[var(--text-heading)] group-hover:text-[#1F56C6] group-hover:translate-x-2 transition-all">
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
                <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[var(--text-heading)]">
                  {activeItem.label}
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                  {activeItem.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>SOLVEMPIRE // STUDIO</span>
                <span className="text-[#1F56C6] font-bold uppercase">PHYSICAL + DIGITAL</span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Contact & Studio Details Bar */}
        <div className="border-t border-[var(--border-hairline)] bg-[var(--surface-card)]/50 py-5">
          <div className="indisea-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="indisea-eyebrow block mb-1">Direct Engineering Email</span>
              <a
                href="mailto:support@solvempire.com"
                className="font-medium text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors"
              >
                support@solvempire.com
              </a>
            </div>

            <div>
              <span className="indisea-eyebrow block mb-1">Direct Phone</span>
              <a
                href="tel:+919701341323"
                className="font-medium text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors"
              >
                +91 97013 41323
              </a>
            </div>

            <div>
              <span className="indisea-eyebrow block mb-1">Design Studio &amp; Lab</span>
              <a
                href="https://maps.app.goo.gl/7awCUTuTPqBsHT4c7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[#1F56C6] font-normal text-xs leading-relaxed block"
              >
                Kakinada, Andhra Pradesh, India ↗
              </a>
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
