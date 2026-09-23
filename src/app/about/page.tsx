import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { getAllTeamMembers } from "@/lib/team-data";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { COMPANY } from "@/lib/company";
import {
  ArrowUpRight,
  Target,
  Compass,
  Layers,
  Cpu,
  Radio,
  Wrench,
  ShieldCheck,
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Studio, Mission & Engineering Leadership | SolveMpire",
  description:
    "SolveMpire is an integrated product engineering studio based in Andhra Pradesh, India. We unite mechanical CAD, custom electronics, embedded firmware, and factory manufacturing under one roof.",
  keywords: [
    "About SolveMpire",
    "Hardware Engineering Studio India",
    "Product Design Company Andhra Pradesh",
    "Turnkey Product Engineering Kakinada",
    "Mechanical CAD and PCB Studio",
    "Hanish Jyosyabhatla",
    "Lohith Medisetti",
    "Teja Mandapalli",
    "Gayathri Boyapati",
    "SolveMpire Private Limited",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/about`,
  },
  openGraph: {
    title: "About Studio, Mission & Engineering Leadership | SolveMpire",
    description:
      "Meet the multidisciplinary engineering studio behind SolveMpire — physical product engineering, custom hardware, firmware, and connected systems.",
    url: `${COMPANY.websiteUrl}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Studio, Mission & Engineering Leadership | SolveMpire",
    description:
      "Meet the multidisciplinary engineering studio behind SolveMpire — physical product engineering, custom hardware, firmware, and connected systems.",
  },
};

export default function AboutPage() {
  const members = getAllTeamMembers();

  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${COMPANY.websiteUrl}/about/#about`,
    name: "About SolveMpire",
    description:
      "SolveMpire Private Limited is an integrated product engineering studio based in Andhra Pradesh, India, partnering with founders and enterprises to engineer turnkey physical products.",
    url: `${COMPANY.websiteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: COMPANY.websiteUrl,
      founder: members.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        url: `${COMPANY.websiteUrl}/team/${m.slug}`,
      })),
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={aboutSchema} />
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-24">
          {/* 01: Hero Section */}
          <div className="max-w-4xl space-y-6">
            <span className="indisea-eyebrow">01 / ABOUT STUDIO &amp; ORIGIN</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[var(--text-heading)] tracking-tight leading-[1.06] uppercase">
              Engineering Real-World Products. <br />
              <span className="text-[#1F56C6]">Built to Solve Critical Problems.</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed font-normal">
              SolveMpire is an integrated, full-stack product engineering studio based in Andhra Pradesh, India. We partner with ambitious founders, venture-backed startups, and industrial enterprises worldwide to engineer turnkey physical machines, custom electronics, real-time embedded firmware, and connected IoT cloud platforms under one roof.
            </p>
          </div>

          {/* 02: Mission & Vision */}
          <section className="space-y-8">
            <span className="indisea-eyebrow block">02 / MISSION &amp; VISION</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="p-8 sm:p-10 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-5 relative overflow-hidden group hover:border-slate-400 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#1F56C6]/10 text-[#1F56C6] rounded-none">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#1F56C6] font-bold uppercase tracking-wider block">
                      Purpose &amp; Objective
                    </span>
                    <h2 className="font-display font-extrabold text-2xl text-[var(--text-heading)] uppercase tracking-tight">
                      Our Mission
                    </h2>
                  </div>
                </div>
                <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed font-normal">
                  To eliminate the devastating friction of fragmented engineering by uniting 3D parametric mechanical CAD, custom multi-layer PCB design, deterministic real-time firmware, and scalable factory manufacturing under single-contract ownership—turning high-risk concepts into certified, production-ready commercial products.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono font-semibold text-[var(--text-heading)]">
                  <span className="px-2.5 py-1 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] uppercase">Zero Vendor Blame</span>
                  <span className="px-2.5 py-1 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] uppercase">DFM From Day Zero</span>
                  <span className="px-2.5 py-1 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] uppercase">100% IP Ownership</span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="p-8 sm:p-10 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-5 relative overflow-hidden group hover:border-slate-400 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#CA8A04]/10 text-[#CA8A04] rounded-none">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#CA8A04] font-bold uppercase tracking-wider block">
                      Long-Term Horizon
                    </span>
                    <h2 className="font-display font-extrabold text-2xl text-[var(--text-heading)] uppercase tracking-tight">
                      Our Vision
                    </h2>
                  </div>
                </div>
                <p className="font-sans text-base text-[var(--text-muted)] leading-relaxed font-normal">
                  To establish India&apos;s foremost deep-tech physical product engineering powerhouse—setting the global standard for rapid electromechanical innovation, rugged industrial automation, and turnkey fleet reliability across international markets.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono font-semibold text-[var(--text-heading)]">
                  <span className="px-2.5 py-1 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] uppercase">Deep-Tech Hardware</span>
                  <span className="px-2.5 py-1 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] uppercase">Global Scalability</span>
                  <span className="px-2.5 py-1 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] uppercase">10-Year Reliability</span>
                </div>
              </div>
            </div>
          </section>

          {/* 03: What We Do (The 4 Core Disciplines) */}
          <section className="space-y-8">
            <div>
              <span className="indisea-eyebrow block">03 / CORE DISCIPLINES</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight uppercase mt-2">
                What We Do
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Discipline 1 */}
              <div className="p-6 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4 hover:border-slate-400 transition-all">
                <div className="p-2.5 bg-[#1F56C6]/10 text-[#1F56C6] w-fit rounded-none">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-[var(--text-heading)] uppercase tracking-tight">
                  1. Mechanical CAD &amp; DFM
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  Parametric 3D CAD modeling in Fusion 360, CNC sheet metal bend tolerances, injection mold tooling, IP65/IP67 gasketing, thermal CFD airflow loops, and vibration damping.
                </p>
              </div>

              {/* Discipline 2 */}
              <div className="p-6 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4 hover:border-slate-400 transition-all">
                <div className="p-2.5 bg-[#CA8A04]/10 text-[#CA8A04] w-fit rounded-none">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-[var(--text-heading)] uppercase tracking-tight">
                  2. Custom Electronics &amp; PCBs
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  Industrial multilayer KiCad schematics, high-speed differential routing, STM32/ESP32 silicon, power MOSFET switching, CAN/RS-485 bus, and automated Bed-of-Nails test fixtures.
                </p>
              </div>

              {/* Discipline 3 */}
              <div className="p-6 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4 hover:border-slate-400 transition-all">
                <div className="p-2.5 bg-[#16A34A]/10 text-[#16A34A] w-fit rounded-none">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-[var(--text-heading)] uppercase tracking-tight">
                  3. Embedded Firmware &amp; HMI
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  Deterministic FreeRTOS multitasking, hierarchical state machines, DWIN DGUS industrial touchscreen interfaces over UART, dynamic UPI payments, and fail-safe safety watchdogs.
                </p>
              </div>

              {/* Discipline 4 */}
              <div className="p-6 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4 hover:border-slate-400 transition-all">
                <div className="p-2.5 bg-[#7C3AED]/10 text-[#7C3AED] w-fit rounded-none">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-[var(--text-heading)] uppercase tracking-tight">
                  4. IoT Telemetry &amp; Support
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  MQTT over TLS 1.3 telemetry, cellular 4G Cat-1 fallback, real-time cloud dashboards, dual-partition A/B OTA remote updates, and multi-year engineering SLAs (up to 10 years).
                </p>
              </div>
            </div>
          </section>

          {/* 04: Operating Tenets & Philosophy */}
          <section className="space-y-8">
            <span className="indisea-eyebrow block">04 / THE SOLVEMPIRE PHILOSOPHY</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-8 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="font-mono text-3xl font-extrabold text-[#1F56C6] block">01</span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] uppercase tracking-tight">
                  Unified Disciplines Under One Roof
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  We eliminate friction between disconnected CAD, electronics, and firmware vendors by housing all engineering disciplines under one synchronized team with single-point accountability.
                </p>
              </div>

              <div className="p-8 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="font-mono text-3xl font-extrabold text-[#CA8A04] block">02</span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] uppercase tracking-tight">
                  DFM Rigor From Day Zero
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  Every 3D model and PCB layout is engineered with real manufacturing constraints in mind — tooling tolerances, bend deductions, component availability, and rapid factory assembly.
                </p>
              </div>

              <div className="p-8 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="font-mono text-3xl font-extrabold text-[#16A34A] block">03</span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] uppercase tracking-tight">
                  Long-Term Production Ownership
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  We stay actively engaged through mass production tooling, initial field deployments, OTA firmware updates, and multi-year engineering lifecycle support agreements.
                </p>
              </div>
            </div>
          </section>

          {/* 05: Proven Commercial Scale Metrics */}
          <section className="p-8 sm:p-12 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
              <div>
                <span className="indisea-eyebrow block">05 / PROVEN COMMERCIAL METRICS</span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-heading)] uppercase tracking-tight mt-1">
                  Built for Volume Deployment
                </h2>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                COMMERCIAL TRACK RECORD
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="space-y-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#1F56C6] block tracking-tight">
                  200+
                </span>
                <span className="font-mono text-xs font-bold text-[var(--text-heading)] uppercase block">
                  Machines Deployed
                </span>
                <p className="font-sans text-xs text-[var(--text-muted)]">Across India, Nepal &amp; Sri Lanka</p>
              </div>

              <div className="space-y-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#16A34A] block tracking-tight">
                  200,000+
                </span>
                <span className="font-mono text-xs font-bold text-[var(--text-heading)] uppercase block">
                  Cycles Completed
                </span>
                <p className="font-sans text-xs text-[var(--text-muted)]">Commercial real-world operations</p>
              </div>

              <div className="space-y-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#CA8A04] block tracking-tight">
                  99.8%
                </span>
                <span className="font-mono text-xs font-bold text-[var(--text-heading)] uppercase block">
                  Fleet Uptime
                </span>
                <p className="font-sans text-xs text-[var(--text-muted)]">Zero catastrophic electrical halts</p>
              </div>

              <div className="space-y-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#7C3AED] block tracking-tight">
                  10 Years
                </span>
                <span className="font-mono text-xs font-bold text-[var(--text-heading)] uppercase block">
                  Support Commitment
                </span>
                <p className="font-sans text-xs text-[var(--text-muted)]">Full SLA hardware &amp; OTA support</p>
              </div>
            </div>
          </section>

          {/* 06: Leadership & Engineering Architects (Refined, Well-Proportioned Dossier Grid) */}
          <section id="team" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="indisea-eyebrow block">06 / TEAM &amp; ARCHITECTS</span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-[48px] text-[var(--text-heading)] tracking-tight uppercase mt-2">
                  Engineering Leadership
                </h2>
              </div>
              <Link
                href="/team"
                className="font-display font-bold text-xs text-[#1F56C6] hover:text-[#17449E] transition-colors inline-flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>View Full Team Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {members.map((member) => (
                <article
                  key={member.slug}
                  className="group rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 p-6 flex flex-col justify-between space-y-5 transition-all duration-300 shadow-xs"
                >
                  <div className="space-y-4">
                    {/* Compact Avatar & Identity Row */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-none border border-[var(--border-hairline)] overflow-hidden shrink-0 bg-slate-900 shadow-xs">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="indisea-eyebrow text-[#1F56C6] block text-[10px] sm:text-[11px] mb-1 uppercase truncate">
                          {member.role}
                        </span>
                        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] group-hover:text-[#1F56C6] transition-colors uppercase tracking-tight truncate">
                          <Link href={`/team/${member.slug}`}>
                            {member.name}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                          <MapPin className="w-3 h-3 text-[#1F56C6]" />
                          <span className="truncate">{(member.location || "Andhra Pradesh, India").toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal line-clamp-3">
                      {member.shortBio}
                    </p>

                    {/* Focus Areas Chips */}
                    {member.focusAreas && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {member.focusAreas.slice(0, 3).map((area) => (
                          <span
                            key={area}
                            className="px-2 py-0.5 rounded-none bg-[var(--surface-canvas)] font-mono text-[10px] font-semibold text-[var(--text-heading)] border border-[var(--border-hairline)] uppercase truncate"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Social Links & Dossier CTA */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2">
                    {member.socials ? (
                      <TeamSocialLinks
                        socials={member.socials}
                        memberName={member.name}
                      />
                    ) : (
                      <div />
                    )}

                    <Link
                      href={`/team/${member.slug}`}
                      className="inline-flex items-center gap-1 font-display font-bold text-[11px] text-[#1F56C6] hover:text-[#17449E] uppercase tracking-wider shrink-0"
                    >
                      <span>Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 07: Legal Credentials & Consultation CTA */}
          <section className="p-8 sm:p-12 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1F56C6]" />
                <span className="indisea-eyebrow block">
                  REGISTERED CORPORATE ENTITY
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[var(--text-heading)] uppercase tracking-tight">
                SolveMpire Private Limited
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Corporate Identity Number (CIN): <strong className="font-mono text-[var(--text-heading)]">U62013AP2025PTC122808</strong>. <br />
                Headquarters: SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, Andhra Pradesh, India.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/contact"
                className="btn-indisea-blue text-xs py-3 px-6 uppercase tracking-wider text-center"
              >
                Schedule Engineering Consultation
              </Link>
              <Link
                href="/work"
                className="px-6 py-3 rounded-none bg-[var(--surface-canvas)] border border-[var(--border-hairline)] font-display font-bold text-xs text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors uppercase tracking-wider text-center"
              >
                Explore Case Studies
              </Link>
            </div>
          </section>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
