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
import { ArrowLeft, MapPin, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen w-full flex flex-col bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 font-display text-xs text-slate-500 hover:text-blue-600 font-bold uppercase transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Team Directory</span>
          </Link>
        </div>

        {/* Profile Card */}
        <section className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm p-6 sm:p-10 mb-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border border-slate-200/80 overflow-hidden relative bg-slate-100 shadow-xs">
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
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-xs font-semibold border border-blue-200/60">
                {member.role}
              </span>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
                {member.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {member.shortBio}
              </p>

              {member.location && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-sans text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
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
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
              Engineering Perspective &amp; Background
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm space-y-4 text-base text-slate-700 leading-relaxed font-normal">
            {member.story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Focus Areas */}
          {member.focusAreas && member.focusAreas.length > 0 && (
            <div className="space-y-3 pt-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">
                Focus Areas &amp; Specializations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {member.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs shrink-0 border border-blue-200/60">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base text-slate-900 font-semibold font-display">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Written Journals by Member */}
        <AuthorArticlesList posts={authorPosts} authorName={member.name} />

        {/* Scoping CTA Card */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-slate-950 to-blue-950 text-center space-y-4 text-white shadow-editorial-md">
          <h3 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Build Your Product With SolveMpire
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Connect with our engineering team to bring your hardware, embedded firmware, or connected platform from spec to deployment.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-editorial btn-editorial-blue px-8 py-3.5 text-xs tracking-wide shadow-editorial-sm"
            >
              <span>Start a Project &rarr;</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
