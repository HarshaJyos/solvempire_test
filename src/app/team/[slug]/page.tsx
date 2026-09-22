import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { AuthorArticlesList } from "@/components/team/AuthorArticlesList";
import { getTeamMember, getAllTeamMembers } from "@/lib/team-data";
import { getAllJournalPosts } from "@/lib/journal-data";
import { ArrowLeft, MapPin } from "lucide-react";

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
  if (!member) return { title: "Team Member Not Found" };

  return {
    title: `${member.name} — ${member.role} | SolveMpire Team`,
    description: member.shortBio,
    openGraph: {
      title: `${member.name} — SolveMpire`,
      description: member.shortBio,
      images: [member.avatar],
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

  // Get articles written by this team member
  const allPosts = getAllJournalPosts();
  const authorPosts = allPosts.filter(
    (post) =>
      post.author.name.toLowerCase() === member.name.toLowerCase() ||
      post.author.avatar.includes(member.slug.split("-")[0])
  );

  const socialUrls = member.socials
    ? Object.values(member.socials).filter((url): url is string => typeof url === "string" && !url.startsWith("mailto:"))
    : [];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.shortBio,
      image: `https://www.solvempire.com${member.avatar}`,
      worksFor: {
        "@type": "Organization",
        name: "SolveMpire",
        url: "https://www.solvempire.com",
      },
      sameAs: socialUrls,
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6]/20 selection:text-[#1d4ed8] relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 pt-12 pb-24">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#0f0f10]/70 hover:text-[#1d4ed8] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Team Directory</span>
          </Link>
        </div>

        {/* Profile Card */}
        <section className="bg-white border-2 border-[#0f0f10] shadow-brutal-lg p-6 sm:p-10 mb-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar with ink border */}
            <div className="relative shrink-0">
              <div className="size-28 sm:size-36 border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] bg-[#0f0f10] overflow-hidden relative">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Header Details */}
            <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
              <span className="inline-block px-3 py-1 bg-[#3b82f6] text-[#0f0f10] font-mono text-xs font-bold border border-[#0f0f10] shadow-[1px_1px_0px_#0f0f10] uppercase tracking-wider">
                {member.role}
              </span>

              <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#0f0f10]">
                {member.name}
              </h1>

              <p className="font-display text-base sm:text-lg text-[#0f0f10]/80 leading-relaxed">
                {member.shortBio}
              </p>

              {member.location && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-mono text-xs text-[#0f0f10]/70">
                  <MapPin className="size-3.5 text-[#1d4ed8] shrink-0" />
                  <span>{member.location}</span>
                </div>
              )}

              {/* Social Media Links */}
              {member.socials && (
                <div className="pt-2 flex justify-center sm:justify-start">
                  <TeamSocialLinks
                    socials={member.socials}
                    memberName={member.name}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Story / About Section */}
        <section className="space-y-6 mb-12">
          <div className="space-y-2 border-b-2 border-[#0f0f10] pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0f0f10]">
              Engineering Perspective &amp; Background
            </h2>
          </div>

          <div className="p-6 sm:p-8 bg-white border-2 border-[#0f0f10] shadow-brutal-md space-y-4 font-display text-base text-[#0f0f10]/85 leading-relaxed">
            {member.story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Focus Areas */}
          {member.focusAreas && member.focusAreas.length > 0 && (
            <div className="space-y-3 pt-4">
              <h3 className="font-mono font-bold text-xs text-[#0f0f10] uppercase tracking-wider">
                [FOCUS AREAS AT SOLVEMPIRE]
              </h3>
              <ol className="space-y-2.5 font-mono list-none p-0 m-0">
                {member.focusAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 bg-white border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10]"
                  >
                    <span className="flex items-center justify-center size-7 bg-[#3b82f6] text-[#0f0f10] font-bold text-xs shrink-0 border border-[#0f0f10]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base text-[#0f0f10] font-bold uppercase">
                      {area}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* Written Journals by Member */}
        <AuthorArticlesList posts={authorPosts} authorName={member.name} />

        {/* Scoping CTA Card */}
        <div className="mt-16 p-8 sm:p-12 bg-[#3b82f6] border-2 border-[#0f0f10] shadow-brutal-lg text-center space-y-4">
          <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#0f0f10]">
            BUILD YOUR PRODUCT WITH SOLVEMPIRE
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#0f0f10]/80 max-w-md mx-auto leading-relaxed">
            Connect with our engineering team to bring your hardware, embedded firmware, or connected platform from spec to deployment.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] font-mono font-bold text-xs uppercase tracking-wider px-8 py-3.5 border-2 border-[#0f0f10] shadow-brutal inline-flex items-center gap-2"
            >
              <span>&gt; START A PROJECT</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
