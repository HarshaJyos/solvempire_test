import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink text-surface relative overflow-hidden pt-16 sm:pt-24">
      {/* Nested Card Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 relative z-10">
        <div className="bg-surface text-heading rounded-[2rem] sm:rounded-[2.75rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-hairline/80">
          {/* Logo Row */}
          <div className="flex items-center justify-between pb-8 sm:pb-10 border-b border-hairline">
            <Link href="/" className="inline-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg">
              <Image
                src="/logo.png"
                alt={COMPANY.brandName}
                width={180}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          {/* 4-Column Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 py-10 sm:py-12 border-b border-hairline">
            {/* Column 1: Company (3 cols on lg) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h4 className="font-bold text-heading text-xs sm:text-sm tracking-wider uppercase mb-1">Company</h4>
              <Link href="/about" className="text-body hover:text-brand text-sm transition-colors duration-150">
                About Us
              </Link>
              <Link href="/#process" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Our Process
              </Link>
              <Link href="/about#team" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Meet Our Team
              </Link>
              <Link href="/journal" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Journal &amp; Insights
              </Link>
              <Link href="/contact" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Contact Us
              </Link>
            </div>


            {/* Column 2: Services (4 cols on lg) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <h4 className="font-bold text-heading text-xs sm:text-sm tracking-wider uppercase mb-1">Services</h4>
              <Link href="/services#mechanical" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Mechanical Product Engineering
              </Link>
              <Link href="/services#electronics" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Electronics &amp; Embedded Systems
              </Link>
              <Link href="/services#hmi" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Machine Software &amp; HMI
              </Link>
              <Link href="/services#cloud" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Cloud, IoT &amp; Digital Platforms
              </Link>
            </div>

            {/* Column 3: Work & Legal (2 cols on lg) */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h4 className="font-bold text-heading text-xs sm:text-sm tracking-wider uppercase mb-1">Portfolio</h4>
              <Link href="/work" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Case Studies
              </Link>
              <Link href="/privacy" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-body hover:text-brand text-sm transition-colors duration-150">
                Terms of Service
              </Link>
            </div>

            {/* Column 4: Contact & Location (3 cols on lg) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h4 className="font-bold text-heading text-xs sm:text-sm tracking-wider uppercase mb-0.5">Contact</h4>

              {/* Primary Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-body hover:text-brand text-sm transition-colors duration-150 group"
              >
                <div className="w-8 h-8 rounded-lg bg-ice-light text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-surface transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{COMPANY.email}</span>
                  <span className="text-[11px] text-muted">New project inquiries</span>
                </div>
              </a>

              {/* Office Location */}
              <a
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-body hover:text-brand text-xs sm:text-[13px] leading-relaxed transition-colors duration-150 group"
              >
                <div className="w-8 h-8 rounded-lg bg-ice-light text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-surface transition-colors mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-heading group-hover:text-brand transition-colors inline-flex items-center gap-1">
                    {COMPANY.city}
                    <svg className="w-3.5 h-3.5 text-brand opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                  <span className="text-[11px] text-muted mt-0.5 leading-normal">
                    {COMPANY.fullAddress}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Copyright, CIN & Legal Links */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p>{COMPANY.getCopyright(currentYear)}</p>
              <span className="hidden sm:inline text-hairline">|</span>
              <p className="font-mono text-[11px] text-muted/80">CIN: {COMPANY.cin}</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-heading transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-heading transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
