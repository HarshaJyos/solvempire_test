import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { getAllTeamMembers } from "@/lib/team-data";
import {
  ArrowLeft,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Engineering & Leadership Team — SolveMpire",
  description:
    "Meet the engineers, architects, and strategists behind SolveMpire's connected hardware, embedded systems, and digital platforms.",
};

export default function TeamDirectoryPage() {
  const members = getAllTeamMembers();

  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas text-heading relative selection:bg-brand/15 selection:text-brand">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-8 pt-28 sm:pt-36 pb-16">
        {/* Top Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors mb-8 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Journal</span>
        </Link>

        {/* Hero Section */}
        <div className="space-y-4 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-light border border-brand/20 text-xs font-semibold text-brand">
            <Users className="w-3.5 h-3.5" />
            <span>The SolveMpire Team</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl text-heading tracking-tight leading-[1.15]">
            Engineers, Architects &amp; Builders <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-heading via-slate-700 to-brand">
              Engineering ideas into working products.
            </span>
          </h1>

          <p className="font-body text-body text-base sm:text-lg max-w-2xl leading-relaxed">
            Mechanical designers, embedded firmware specialists, PCB engineers, and platform architects building connected hardware and software products.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {members.map((member) => (
            <article
              key={member.slug}
              className="group p-6 sm:p-8 rounded-3xl bg-surface border border-hairline hover:border-brand/40 transition-all duration-200 shadow-xs hover:shadow-xl hover:shadow-brand/5 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-brand/20 shrink-0 bg-ice-light shadow-xs">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-ice-light text-brand text-[11px] font-semibold border border-brand/20 mb-1">
                      {member.role}
                    </span>
                    <h2 className="font-display font-bold text-xl text-heading group-hover:text-brand transition-colors">
                      <Link href={`/team/${member.slug}`}>
                        {member.name}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="font-body text-sm text-body leading-relaxed">
                  {member.shortBio}
                </p>

                {/* Social links on directory card */}
                {member.socials && (
                  <div className="pt-1">
                    <TeamSocialLinks
                      socials={member.socials}
                      memberName={member.name}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-between">
                <span className="text-xs text-muted">
                  {member.focusAreas[0]}
                </span>
                <Link
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:translate-x-1 transition-transform"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Engineering Scoping CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-hairline text-center space-y-6 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-ice-light text-brand mx-auto border border-brand/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-heading">
              Work With Our Engineering Team
            </h3>
            <p className="font-body text-sm sm:text-base text-body max-w-md mx-auto leading-relaxed">
              Have a custom hardware idea, PCB challenge, or connected product platform to design? Let&apos;s build it.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-brand/25 transition-all"
            >
              <span>Scope Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
