import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { getAllTeamMembers } from "@/lib/team-data";
import { ArrowUpRight } from "lucide-react";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Engineering Team & Leadership | SolveMpire",
  description:
    "Meet the founders, engineers, and product strategists behind SolveMpire — physical product engineering, custom hardware, firmware, and scalable connected platforms.",
  keywords: [
    "SolveMpire Team",
    "Hanish Jyosyabhatla",
    "Lohith Medisetti",
    "Teja Mandapalli",
    "Pavan Kumar Duggirala",
    "Prasad Duggirala",
    "Product Engineers India",
    "Hardware Engineering Leadership",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/team`,
  },
  openGraph: {
    title: "Engineering Team & Leadership | SolveMpire",
    description:
      "Meet the engineers, architects, and builders behind SolveMpire's physical products, embedded firmware, and connected systems.",
    url: `${COMPANY.websiteUrl}/team`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Team & Leadership | SolveMpire",
    description:
      "Meet the engineers, architects, and builders behind SolveMpire's physical products, embedded firmware, and connected systems.",
  },
};

export default function TeamDirectoryPage() {
  const members = getAllTeamMembers();
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Team", url: "/team" },
  ]);

  const teamListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${COMPANY.websiteUrl}/team/#itemlist`,
    name: "SolveMpire Leadership & Engineering Team",
    description: "Founders, engineers, and strategists at SolveMpire.",
    itemListElement: members.map((member, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        url: `${COMPANY.websiteUrl}/team/${member.slug}`,
        description: member.shortBio,
      },
    })),
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={teamListSchema} />
      <IndiseaHeader />

      <main className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-16">
          {/* Hero Section */}
          <div className="max-w-4xl space-y-6">
            <span className="indisea-eyebrow">01 / ENGINEERING TEAM DIRECTORY</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[var(--text-heading)] tracking-tight leading-[1.06] uppercase">
              Engineers, Architects &amp; Builders.
            </h1>
            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-normal">
              Mechanical designers, embedded firmware specialists, PCB engineers, and platform architects building physical machines and connected hardware.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {members.map((member) => (
              <article
                key={member.slug}
                className="rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xs"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 rounded-none border border-[var(--border-hairline)] overflow-hidden shrink-0 bg-[var(--surface-canvas)] shadow-xs">
                      <Image
                        src={member.avatar}
                        alt={`${member.name} — ${member.role} at SolveMpire`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="indisea-eyebrow text-[#1F56C6] block mb-1 uppercase">
                        {member.role}
                      </span>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors uppercase tracking-tight">
                        <Link href={`/team/${member.slug}`}>
                          {member.name}
                        </Link>
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-normal">
                    {member.shortBio}
                  </p>

                  {/* Focus Areas */}
                  {member.focusAreas && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {member.focusAreas.map((area) => (
                        <span
                          key={area}
                          className="px-2.5 py-1 rounded-none bg-[var(--surface-canvas)] font-mono text-xs font-semibold text-[var(--text-heading)] border border-[var(--border-hairline)] uppercase"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social links */}
                  {member.socials && (
                    <div className="pt-2">
                      <TeamSocialLinks
                        socials={member.socials}
                        memberName={member.name}
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    LOCATION: {(member.location || "Andhra Pradesh, India").toUpperCase()}
                  </span>

                  <Link
                    href={`/team/${member.slug}`}
                    className="inline-flex items-center gap-1 font-display font-bold text-xs text-[#1F56C6] hover:text-[#17449E] uppercase tracking-wider"
                  >
                    <span>View Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
