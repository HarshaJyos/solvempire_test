import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { getAllTeamMembers } from "@/lib/team-data";
import { ArrowLeft, ArrowRight, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "The Engineering & Leadership Team — SolveMpire",
  description:
    "Meet the engineers, architects, and strategists behind SolveMpire's connected hardware, embedded systems, and digital platforms.",
};

export default function TeamDirectoryPage() {
  const members = getAllTeamMembers();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-xs text-slate-500 hover:text-blue-600 font-bold uppercase mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; Return to Studio</span>
        </Link>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16 border-b border-slate-200 pb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
            <UserCheck className="w-3.5 h-3.5" />
            <span>CORE ENGINEERING TEAM &amp; LEADERSHIP</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-slate-950 leading-[1.08]">
            Engineers, Architects &amp; Builders.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Mechanical designers, embedded firmware specialists, PCB engineers, and platform architects building connected hardware and software products.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {members.map((member) => (
            <article
              key={member.slug}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md transition-all duration-300 hover:-translate-y-1 p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-2xl border border-slate-200/80 overflow-hidden shrink-0 bg-slate-100 shadow-xs">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold border border-blue-200/60 mb-1.5">
                      {member.role}
                    </span>
                    <h2 className="font-display font-bold text-2xl text-slate-950 hover:text-blue-600 transition-colors">
                      <Link href={`/team/${member.slug}`}>
                        {member.name}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {member.shortBio}
                </p>

                {/* Focus Areas */}
                {member.focusAreas && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-slate-700 font-mono text-xs font-medium"
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

              {/* Footer Action */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 font-medium">
                  {member.focusAreas?.length || 0} Core Disciplines
                </span>
                <Link
                  href={`/team/${member.slug}`}
                  className="btn-editorial btn-editorial-primary px-4 py-2 text-xs flex items-center gap-2 group shadow-editorial-xs"
                >
                  <span>View Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 arrow-slide text-blue-400" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
