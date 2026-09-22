import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { teamMembers } from "@/content/team";
import { COMPANY } from "@/lib/company";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Engineering Leadership | SolveMpire",
  description:
    "Meet the multi-disciplinary team behind SolveMpire — physical product engineering, custom hardware, firmware, and cloud systems.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6]/20 selection:text-[#1d4ed8]">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-12 pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#0f0f10]/70 hover:text-[#1d4ed8] font-bold uppercase mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Studio</span>
          </Link>

          {/* Header */}
          <div className="max-w-3xl mb-16 border-b-2 border-[#0f0f10] pb-10">
            <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1 inline-flex items-center gap-2 mb-4">
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                [ABOUT // ENGINEERING LEADERSHIP]
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0f0f10] uppercase leading-[0.95]">
              ENGINEERING REAL-WORLD PRODUCTS.
            </h1>
            <p className="mt-5 text-[#0f0f10]/80 font-display text-lg sm:text-xl leading-relaxed">
              SolveMpire Private Limited is a specialized product engineering studio based in Kakinada, Andhra Pradesh. We partner with product companies, startups, and industrial clients worldwide to engineer complete hardware, firmware, and connected systems.
            </p>
          </div>

          {/* Core Operating Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 bg-white border-2 border-[#0f0f10] shadow-brutal-md relative flex flex-col justify-between">
              <span className="font-mono text-3xl font-black text-[#1d4ed8] block mb-4">01</span>
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-[#0f0f10] mb-3">
                  Unified Disciplines
                </h3>
                <p className="font-display text-sm text-[#0f0f10]/80 leading-relaxed">
                  We eliminate friction between separate mechanical, electronics, and software agencies by housing CAD, PCB layout, firmware, and cloud under one coordinated team.
                </p>
              </div>
            </div>

            <div className="p-8 bg-white border-2 border-[#0f0f10] shadow-brutal-md relative flex flex-col justify-between">
              <span className="font-mono text-3xl font-black text-[#1d4ed8] block mb-4">02</span>
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-[#0f0f10] mb-3">
                  DFM From Day One
                </h3>
                <p className="font-display text-sm text-[#0f0f10]/80 leading-relaxed">
                  Every CAD model and PCB schematic is built with real manufacturing constraints in mind — wall thicknesses, tooling clearances, component sourcing, and assembly simplicity.
                </p>
              </div>
            </div>

            <div className="p-8 bg-[#3b82f6] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-md relative flex flex-col justify-between">
              <span className="font-mono text-3xl font-black text-[#0f0f10] block mb-4">03</span>
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-[#0f0f10] mb-3">
                  Long-Term Partnership
                </h3>
                <p className="font-display text-sm text-[#0f0f10] leading-relaxed font-medium">
                  We don&apos;t walk away after prototypes. We support commercial manufacturing tooling, resolve real-world field anomalies, and maintain multi-year firmware frameworks.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <section id="team" className="mb-20">
            <div className="max-w-2xl mb-12">
              <div className="font-mono font-bold text-xs uppercase text-[#1d4ed8] tracking-widest mb-2">
                [LEADERSHIP &amp; ARCHITECTS]
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#0f0f10]">
                CORE ENGINEERING TEAM
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border-2 border-[#0f0f10] shadow-brutal-lg overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[4/4.5] bg-[#0f0f10] border-b-2 border-[#0f0f10]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl uppercase text-[#0f0f10] mb-1">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs font-bold text-[#1d4ed8] tracking-wider uppercase mb-3">
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="font-display text-xs sm:text-sm text-[#0f0f10]/80 leading-relaxed mb-4">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Company Facts Card */}
          <div className="bg-white border-2 border-[#0f0f10] shadow-brutal-lg overflow-hidden">
            <div className="bg-[#f7f6f2] border-b-2 border-[#0f0f10] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#0f0f10]" />
                <span className="size-3 rounded-full bg-[#f5c518] border border-[#0f0f10]" />
                <span className="size-3 rounded-full bg-[#ecebe4] border border-[#0f0f10]" />
                <span className="font-mono font-bold text-xs text-[#0f0f10] ml-2 tracking-wide uppercase">
                  LEGAL ENTITY &amp; HEADQUARTERS
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              <div>
                <span className="block text-[10px] font-bold text-[#0f0f10]/60 uppercase tracking-wider mb-1">
                  Legal Entity Name
                </span>
                <span className="text-[#0f0f10] font-bold text-sm">{COMPANY.legalName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#0f0f10]/60 uppercase tracking-wider mb-1">
                  Corporate Identity (CIN)
                </span>
                <span className="text-[#0f0f10] font-bold text-sm">{COMPANY.cin}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#0f0f10]/60 uppercase tracking-wider mb-1">
                  Headquarters
                </span>
                <span className="text-[#0f0f10] font-bold text-sm">{COMPANY.city}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#0f0f10]/60 uppercase tracking-wider mb-1">
                  Direct Inquiries
                </span>
                <a href={`mailto:${COMPANY.email}`} className="text-[#1d4ed8] font-bold text-sm hover:underline">
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
