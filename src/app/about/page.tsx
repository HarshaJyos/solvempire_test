import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { teamMembers } from "@/content/team";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "About Us & Engineering Leadership",
  description:
    "Meet the multi-disciplinary team behind SolveMpire — physical product engineering, custom hardware, firmware, and cloud systems.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
              ABOUT SOLVEMPIRE
            </span>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.10]">
              Engineering Real-World Products, From First Spec to Field Support.
            </h1>
            <p className="mt-4 sm:mt-6 text-body text-base sm:text-lg leading-relaxed">
              SolveMpire Private Limited is a specialized product engineering company based in Kakinada, Andhra Pradesh. We partner with product companies, startups, and industrial clients worldwide to engineer complete hardware, firmware, and connected systems.
            </p>
          </div>

          {/* Core Operating Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xs">
              <span className="font-display text-2xl font-bold text-brand block mb-3">01</span>
              <h3 className="font-display text-lg font-bold text-heading mb-2">Unified Disciplines</h3>
              <p className="text-body text-sm leading-[1.618]">
                We eliminate the friction between separate mechanical, electronics, and software agencies by housing CAD, PCB layout, firmware, and cloud under one coordinated engineering team.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xs">
              <span className="font-display text-2xl font-bold text-brand block mb-3">02</span>
              <h3 className="font-display text-lg font-bold text-heading mb-2">DFM from Day One</h3>
              <p className="text-body text-sm leading-[1.618]">
                Every CAD model and PCB schematic is built with real manufacturing constraints in mind — wall thicknesses, tooling clearances, component availability, and assembly simplicity.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-hairline shadow-xs">
              <span className="font-display text-2xl font-bold text-brand block mb-3">03</span>
              <h3 className="font-display text-lg font-bold text-heading mb-2">Long-Term Partnership</h3>
              <p className="text-body text-sm leading-[1.618]">
                We don&apos;t walk away after prototypes. We support commercial manufacturing tooling, resolve real-world field anomalies, and maintain multi-year firmware and cloud upgrade frameworks.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <section id="team" className="mb-20">
            <div className="max-w-2xl mb-12">
              <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">
                LEADERSHIP
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-heading">
                Meet the Core Engineering Team
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-surface rounded-2xl sm:rounded-3xl border border-hairline overflow-hidden shadow-sm flex flex-col"
                >
                  <div className="relative w-full aspect-[4/4.5] bg-ink">
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
                      <h3 className="font-display text-lg font-bold text-heading">{member.name}</h3>
                      <p className="text-xs font-semibold text-brand tracking-wider uppercase mb-3">
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="text-body text-xs sm:text-sm leading-relaxed mb-4">
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
          <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-hairline shadow-sm">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-heading mb-6">
              Entity Information &amp; Headquarters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                  Legal Entity Name
                </span>
                <span className="text-heading font-medium">{COMPANY.legalName}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                  Corporate Identity (CIN)
                </span>
                <span className="font-mono text-heading font-medium">{COMPANY.cin}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                  Headquarters
                </span>
                <span className="text-heading font-medium">{COMPANY.city}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                  Direct Inquiries
                </span>
                <a href={`mailto:${COMPANY.email}`} className="text-brand font-medium hover:underline">
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
