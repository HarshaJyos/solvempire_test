import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0d14] text-slate-400 border-t border-slate-800/80 relative overflow-hidden py-16 sm:py-20 font-sans">
      {/* Background Organic SolveMpire SVG Curve Watermark */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-5 translate-x-1/3 -translate-y-1/3">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full text-blue-500">
          <path
            d="M 50,350 C 150,350 150,150 250,150 C 350,150 350,50 350,50"
            stroke="currentColor"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <circle cx="250" cy="150" r="40" stroke="currentColor" strokeWidth="24" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          {/* Column 1: Studio Identity & Positioning */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block bg-white/95 px-3 py-1.5 rounded-lg w-fit shadow-xs">
              <Image
                src="/logo.png"
                alt={COMPANY.brandName}
                width={150}
                height={34}
                className="h-7 w-auto object-contain"
              />
            </Link>
            
            <p className="font-display text-sm text-slate-300 leading-relaxed max-w-sm mt-1 font-medium">
              We engineer ideas into working products. Full-stack product engineering across mechanical design, custom electronics, embedded firmware, and connected software.
            </p>

            <div className="pt-2 text-xs font-mono text-slate-500 space-y-1">
              <p>{COMPANY.legalName}</p>
              <p>CIN: {COMPANY.cin}</p>
            </div>
          </div>

          {/* Column 2: Core Engineering Capabilities */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Capabilities
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-display">
              <Link href="/services#mechanical" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                <span>Mechanical Engineering &amp; CAD</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
              </Link>
              <Link href="/services#electronics" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                <span>Custom PCB &amp; Hardware</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
              </Link>
              <Link href="/services#firmware" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                <span>Embedded Firmware &amp; RTOS</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
              </Link>
              <Link href="/services#cloud" className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                <span>Connected Cloud &amp; IoT</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
              </Link>
            </div>
          </div>

          {/* Column 3: Featured Case Studies */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Featured Work
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-display">
              <Link href="/work/freshpod-machine" className="hover:text-blue-400 transition-colors">
                FreshPod Sanitization Machine
              </Link>
              <Link href="/work/secure-comms-enclosure" className="hover:text-blue-400 transition-colors">
                IP67 Jammer Enclosure
              </Link>
              <Link href="/work/uss2-switcher" className="hover:text-blue-400 transition-colors">
                USS2 Hardware Switcher
              </Link>
              <Link href="/work" className="hover:text-blue-400 transition-colors text-blue-400 font-medium">
                View All Case Studies &rarr;
              </Link>
            </div>
          </div>

          {/* Column 4: Studio & Governance */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Studio
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-display">
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About Studio
              </Link>
              <Link href="/team" className="hover:text-blue-400 transition-colors">
                Engineering Team
              </Link>
              <Link href="/journal" className="hover:text-blue-400 transition-colors">
                Technical Journal
              </Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Studio Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              <span>ISO 9001 / DFM CERTIFIED PROCESS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
