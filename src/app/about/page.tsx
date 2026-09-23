import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { teamMembers } from "@/content/team";
import { COMPANY } from "@/lib/company";
import { ArrowUpRight } from "lucide-react";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Studio & Engineering Mission | SolveMpire",
  description:
    "Meet the multidisciplinary engineering studio behind SolveMpire — physical product engineering, custom hardware, firmware, and connected systems in Andhra Pradesh, India.",
  keywords: [
    "About SolveMpire",
    "Hardware Engineering Company India",
    "Product Design Studio Kakinada",
    "Turnkey Product Engineering",
    "Mechanical CAD and PCB Studio",
    "Hanish Jyosyabhatla",
    "SolveMpire Private Limited",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/about`,
  },
  openGraph: {
    title: "About Studio & Engineering Mission | SolveMpire",
    description:
      "Meet the multidisciplinary engineering studio behind SolveMpire — physical product engineering, custom hardware, firmware, and connected systems.",
    url: `${COMPANY.websiteUrl}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Studio & Engineering Mission | SolveMpire",
    description:
      "Meet the multidisciplinary engineering studio behind SolveMpire — physical product engineering, custom hardware, firmware, and connected systems.",
  },
};

export default function AboutPage() {
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
      "SolveMpire is an integrated product engineering studio based in Andhra Pradesh, India, partnering with founders and enterprises to engineer turnkey physical products.",
    url: `${COMPANY.websiteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: COMPANY.websiteUrl,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={aboutSchema} />
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-20">
          {/* Header */}
          <div className="max-w-4xl space-y-6">
            <span className="indisea-eyebrow">01 / ABOUT STUDIO &amp; MISSION</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[var(--text-heading)] tracking-tight leading-[1.06] uppercase">
              Engineering Real-World Products. <br />
              <span className="text-[#1F56C6]">Built to Solve Critical Problems.</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-normal">
              SolveMpire is an integrated product engineering studio based in Andhra Pradesh, India. We partner with founders, venture-backed startups, and industrial clients worldwide to build turnkey machines, custom electronics, and connected software.
            </p>
          </div>

          {/* Operating Tenets */}
          <section className="space-y-8">
            <span className="indisea-eyebrow block">02 / OPERATING TENETS</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-8 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="font-mono text-3xl font-extrabold text-[#1F56C6] block">01</span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] uppercase tracking-tight">
                  Unified Disciplines Under One Roof
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  We eliminate friction between disconnected CAD, electronics, and firmware vendors by housing all engineering disciplines under one synchronized team.
                </p>
              </div>

              <div className="p-8 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="font-mono text-3xl font-extrabold text-[#CA8A04] block">02</span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] uppercase tracking-tight">
                  DFM Rigor From Day One
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  Every 3D model and PCB layout is engineered with real manufacturing constraints in mind — tooling tolerances, component availability, and assembly simplicity.
                </p>
              </div>

              <div className="p-8 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-4">
                <span className="font-mono text-3xl font-extrabold text-[#16A34A] block">03</span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] uppercase tracking-tight">
                  Long-Term Production Ownership
                </h3>
                <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                  We stay actively engaged through mass production tooling, initial field deployments, firmware updates, and multi-year lifecycle support.
                </p>
              </div>
            </div>
          </section>

          {/* Leadership & Engineering Architects */}
          <section id="team" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="indisea-eyebrow block">03 / TEAM &amp; ARCHITECTS</span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-[48px] text-[var(--text-heading)] tracking-tight uppercase mt-2">
                  Engineering Leadership
                </h2>
              </div>
              <Link
                href="/team"
                className="font-display font-bold text-xs text-[#1F56C6] hover:text-[#17449E] transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Full Team Directory &rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs overflow-hidden flex flex-col justify-between transition-all hover:border-slate-400"
                >
                  <div className="relative w-full aspect-[4/4.5] bg-slate-900 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-[var(--text-heading)] uppercase tracking-tight">
                        {member.name}
                      </h3>
                      <span className="font-mono text-xs text-[#1F56C6] font-bold block mt-0.5 uppercase tracking-wide">
                        {member.role}
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <IndiseaFooter />
    </div>
  );
}
