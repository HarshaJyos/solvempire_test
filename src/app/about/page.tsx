import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { teamMembers } from "@/content/team";
import { COMPANY } from "@/lib/company";
import { ArrowLeft, Building2, Layers, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Engineering Leadership | SolveMpire",
  description:
    "Meet the multi-disciplinary team behind SolveMpire — physical product engineering, custom hardware, firmware, and cloud systems.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xs text-slate-500 hover:text-blue-600 font-bold uppercase mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Studio</span>
          </Link>

          {/* Header */}
          <div className="max-w-3xl mb-16 border-b border-slate-200 pb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
              <Building2 className="w-3.5 h-3.5" />
              <span>ABOUT STUDIO &amp; MISSION</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              Engineering Real-World Products. <br />
              <span className="text-blue-600">Built to Solve Critical Problems.</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {COMPANY.legalName} is an integrated product engineering studio based in Kakinada, Andhra Pradesh. We partner with product founders, startups, and industrial clients worldwide to engineer complete physical machines, custom electronics, and connected software.
            </p>
          </div>

          {/* Core Operating Principles Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md transition-all space-y-4">
              <span className="font-mono text-3xl font-extrabold text-blue-600 block">01</span>
              <h3 className="font-display text-xl font-bold text-slate-950">
                Unified Engineering Disciplines
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                We eliminate friction between separate mechanical, electronics, and software contractors by housing CAD, PCB layout, firmware, and cloud under one coordinated team.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md transition-all space-y-4">
              <span className="font-mono text-3xl font-extrabold text-blue-600 block">02</span>
              <h3 className="font-display text-xl font-bold text-slate-950">
                DFM From Day One
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Every CAD model and PCB schematic is built with real manufacturing constraints in mind — wall thicknesses, tooling clearances, component sourcing, and assembly simplicity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-tr from-slate-900 to-blue-950 text-white shadow-editorial-md space-y-4">
              <span className="font-mono text-3xl font-extrabold text-blue-400 block">03</span>
              <h3 className="font-display text-xl font-bold text-white">
                Long-Term Production Partnership
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                We don&apos;t walk away after prototypes. We support commercial manufacturing tooling, resolve real-world field anomalies, and maintain multi-year firmware frameworks.
              </p>
            </div>
          </div>

          {/* Leadership & Engineering Team */}
          <section id="team" className="mb-24">
            <div className="max-w-2xl mb-12 space-y-3">
              <span className="font-mono font-bold text-xs uppercase text-blue-600 tracking-wider">
                LEADERSHIP &amp; ARCHITECTS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950">
                Core Engineering Architects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[4/4.5] bg-slate-900 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-display font-bold text-xl text-slate-950 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Company Facts Card */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm p-8 sm:p-12 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-display font-bold text-lg text-slate-950">
                Corporate Governance &amp; Registration Facts
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
              <div>
                <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 font-mono text-[10px]">
                  Legal Entity Name
                </span>
                <span className="text-slate-900 font-bold text-sm block">{COMPANY.legalName}</span>
              </div>
              <div>
                <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 font-mono text-[10px]">
                  Corporate ID (CIN)
                </span>
                <span className="text-slate-900 font-bold text-sm block font-mono">{COMPANY.cin}</span>
              </div>
              <div>
                <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 font-mono text-[10px]">
                  Headquarters &amp; Lab
                </span>
                <span className="text-slate-900 font-bold text-sm block">{COMPANY.city}, AP, India</span>
              </div>
              <div>
                <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 font-mono text-[10px]">
                  Direct Inquiries
                </span>
                <a href={`mailto:${COMPANY.email}`} className="text-blue-600 font-bold text-sm hover:underline block">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
