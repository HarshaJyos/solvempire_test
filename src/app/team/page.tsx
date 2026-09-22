import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TeamSocialLinks } from "@/components/team/TeamSocialLinks";
import { getAllTeamMembers } from "@/lib/team-data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Engineering & Leadership Team — SolveMpire",
  description:
    "Meet the engineers, architects, and strategists behind SolveMpire's connected hardware, embedded systems, and digital platforms.",
};

export default function TeamDirectoryPage() {
  const members = getAllTeamMembers();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6]/20 selection:text-[#1d4ed8]">
      <Header />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 pt-12 pb-24">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#0f0f10]/70 hover:text-[#1d4ed8] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; Return to Studio</span>
        </Link>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16 border-b-2 border-[#0f0f10] pb-10">
          <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1 inline-flex items-center gap-2 mb-4">
            <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
              [TEAM // ARCHITECTS &amp; BUILDERS]
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#0f0f10] leading-[0.95]">
            ENGINEERS, ARCHITECTS &amp; BUILDERS.
          </h1>

          <p className="mt-5 text-[#0f0f10]/80 font-display text-lg sm:text-xl leading-relaxed">
            Mechanical designers, embedded firmware specialists, PCB engineers, and platform architects building connected hardware and software products.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {members.map((member, idx) => (
            <article
              key={member.slug}
              className="bg-white border-2 border-[#0f0f10] shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Window Top */}
              <div className="bg-[#f7f6f2] border-b-2 border-[#0f0f10] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#0f0f10]" />
                  <span className="size-3 rounded-full bg-[#f5c518] border border-[#0f0f10]" />
                  <span className="size-3 rounded-full bg-[#ecebe4] border border-[#0f0f10]" />
                  <span className="font-mono font-bold text-xs text-[#0f0f10] ml-2 tracking-wide uppercase">
                    MEMBER // 0{idx + 1}
                  </span>
                </div>
                <span className="bg-[#3b82f6] text-[#0f0f10] border border-[#0f0f10] font-mono font-bold text-[10px] px-2 py-0.5 tracking-wider uppercase">
                  ACTIVE
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-5">
                    <div className="relative size-20 border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] shrink-0 bg-[#0f0f10] overflow-hidden">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-[#ecebe4] text-[#0f0f10] font-mono text-[10px] font-bold border border-[#0f0f10] mb-1.5 uppercase">
                        {member.role}
                      </span>
                      <h2 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] hover:text-[#1d4ed8] transition-colors">
                        <Link href={`/team/${member.slug}`}>
                          {member.name}
                        </Link>
                      </h2>
                    </div>
                  </div>

                  <p className="font-display text-sm sm:text-base text-[#0f0f10]/80 leading-relaxed">
                    {member.shortBio}
                  </p>

                  {/* Social links on directory card */}
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
                <div className="pt-4 border-t-2 border-[#0f0f10]/15 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#0f0f10]/60 font-semibold">
                    {member.focusAreas?.length || 0} CORE DISCIPLINES
                  </span>
                  <Link
                    href={`/team/${member.slug}`}
                    className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border border-[#0f0f10] shadow-brutal-xs px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>VIEW PROFILE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f5c518]" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
