import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { AuthorArticlesList } from "@/components/team/AuthorArticlesList";
import { getTeamMember, getAllTeamMembers } from "@/lib/team-data";
import { getAllJournalPosts } from "@/lib/journal-data";
import { ArrowLeft, MapPin, ArrowUpRight } from "lucide-react";
import { buildBreadcrumbsJsonLd, buildPersonJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

export function generateStaticParams() {
  const members = getAllTeamMembers();
  return members.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return { title: "Team Member Not Found | SolveMpire" };

  const avatarUrl = member.avatar.startsWith("http")
    ? member.avatar
    : `${COMPANY.websiteUrl}${member.avatar}`;

  return {
    title: `${member.name} — ${member.role} | SolveMpire Leadership`,
    description: member.shortBio,
    keywords: [
      member.name,
      member.role,
      ...(member.focusAreas || []),
      "SolveMpire Engineering",
      "Product Development India",
    ],
    alternates: {
      canonical: `${COMPANY.websiteUrl}/team/${member.slug}`,
    },
    openGraph: {
      title: `${member.name} — ${member.role} | SolveMpire`,
      description: member.shortBio,
      url: `${COMPANY.websiteUrl}/team/${member.slug}`,
      type: "profile",
      images: [
        {
          url: avatarUrl,
          width: 800,
          height: 800,
          alt: `${member.name} - ${member.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${member.name} — ${member.role}`,
      description: member.shortBio,
      images: [avatarUrl],
    },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  const allPosts = getAllJournalPosts();
  const authorPosts = allPosts.filter(
    (post) =>
      post.author.name.toLowerCase() === member.name.toLowerCase() ||
      post.author.avatar.includes(member.slug.split("-")[0])
  );

  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Team", url: "/team" },
    { name: member.name, url: `/team/${member.slug}` },
  ]);
  const personSchema = buildPersonJsonLd(member);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans relative">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={personSchema} />
      <IndiseaHeader />

      <main className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-12 sm:space-y-16">
          {/* Breadcrumb Back Link */}
          <div className="border-b border-[var(--border-hairline)] pb-4">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--text-muted)] hover:text-[#1F56C6] uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Team Directory</span>
            </Link>
          </div>

          {/* Profile Card Dossier */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-none border border-[var(--border-hairline)] overflow-hidden shrink-0 bg-[var(--surface-canvas)] shadow-xs">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 flex-1">
                <span className="indisea-eyebrow text-[#1F56C6] block uppercase">
                  {member.role}
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-heading)] tracking-tight uppercase">
                  {member.name}
                </h1>
                <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal max-w-3xl">
                  {member.shortBio}
                </p>

                {/* Socials & Location */}
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{(member.location || "Andhra Pradesh, India").toUpperCase()}</span>
                  </div>
                  {member.socials && (
                    <TeamSocialLinks
                      socials={member.socials}
                      memberName={member.name}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Focus Areas Matrix */}
            {member.focusAreas && (
              <div className="pt-6 border-t border-[var(--border-hairline)] space-y-2.5">
                <span className="indisea-eyebrow block">
                  Technical Focus &amp; Core Domains
                </span>
                <div className="flex flex-wrap gap-2">
                  {member.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 rounded-none bg-[var(--surface-canvas)] font-mono text-xs font-semibold text-[var(--text-heading)] border border-[var(--border-hairline)] uppercase"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author Publications if any */}
          {authorPosts.length > 0 && (
            <section className="space-y-6">
              <span className="indisea-eyebrow block">
                Research Publications by {member.name.toUpperCase()}
              </span>
              <AuthorArticlesList posts={authorPosts} authorName={member.name} />
            </section>
          )}
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
