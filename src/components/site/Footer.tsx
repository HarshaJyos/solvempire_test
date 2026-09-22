import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1d4ed8] text-[#f7f6f2] border-t-2 border-[#0f0f10] relative overflow-hidden py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#f7f6f2]/20">
          {/* Column 1: Studio Identity */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 px-3 py-1.5 border border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] inline-flex items-center">
                <Image
                  src="/logo.png"
                  alt={COMPANY.brandName}
                  width={150}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
            <p className="font-mono text-xs text-[#f7f6f2]/70 leading-relaxed max-w-sm">
              Node 2-2 Renovated Edition.
              <br />
              Architectural Web Systems &amp; Autonomous Brand Supremacy.
            </p>
            <div className="flex items-center gap-3 pt-2 font-mono text-[11px] text-[#f7f6f2]/60">
              <span>CIN: {COMPANY.cin}</span>
            </div>
          </div>

          {/* Column 2: Engineering Nodes */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-mono font-semibold text-xs tracking-wider uppercase text-[#f5c518]">
              ENGINEERING NODES
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs text-[#f7f6f2]/80">
              <a href="#capabilities" className="hover:text-[#f5c518] transition-colors">
                &gt; Vector Stroke Engine
              </a>
              <a href="#capabilities" className="hover:text-[#f5c518] transition-colors">
                &gt; Autonomous Agents
              </a>
              <a href="#methodology" className="hover:text-[#f5c518] transition-colors">
                &gt; High-Speed CDN Matrix
              </a>
              <a href="#archives" className="hover:text-[#f5c518] transition-colors">
                &gt; Smart Contracts Hub
              </a>
            </div>
          </div>

          {/* Column 3: Accreditation */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-mono font-semibold text-xs tracking-wider uppercase text-[#f5c518]">
              ACCREDITATION
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs text-[#f7f6f2]/80">
              <span>Awwwards Site of the Day</span>
              <span>FWA of the Month</span>
              <span>Red Dot: Best of Category</span>
              <span>CSSDA Special Kudos</span>
            </div>
          </div>

          {/* Column 4: Node Origin */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-mono font-semibold text-xs tracking-wider uppercase text-[#f5c518]">
              NODE ORIGIN
            </h4>
            <div className="font-mono text-xs text-[#f7f6f2]/80 leading-relaxed flex flex-col gap-1">
              <p>Figma Canvas: renovated_solvempire</p>
              <p>Node Identifier: 2:2 / 38:380</p>
              <p>Export Engine: HTML5 Pure Vector</p>
              <p>Timestamp: {currentYear}.Q3</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <p className="text-[#f7f6f2]/60 text-center sm:text-left">
            &copy; {currentYear} SOLVEMPIRE VENTURE STUDIO. ALL VECTOR RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[#dbeafe]">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#f5c518] animate-pulse" />
              <span>SYSTEM STATUS: OPTIMAL</span>
            </div>
            <span className="text-[#f7f6f2]/30">|</span>
            <span className="text-[#f7f6f2]/60">SECURITY: AIR-GAPPED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
