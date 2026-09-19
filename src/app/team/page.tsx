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
    <div className="min-h-screen w-full flex flex-col bg-[#0B0F17] text-[#F8FAFC] relative selection:bg-brand/20 selection:text-brand-light">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 sm:px-8 pt-28 sm:pt-36 pb-16">
        {/* Top Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-light transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Journal</span>
        </Link>

        {/* Hero Section */}
        <div className="space-y-4 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-xs font-semibold text-brand-light">
            <Users className="w-3.5 h-3.5" />
            <span>The SolveMpire Team</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F8FAFC] tracking-tight leading-[1.15]">
            Engineers, Architects &amp; Builders <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-brand-light">
              Engineering ideas into working products.
            </span>
          </h1>

          <p className="font-body text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Mechanical designers, embedded firmware specialists, PCB engineers, and platform architects building connected hardware and software products.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {members.map((member) => (
            <article
              key={member.slug}
              className="group p-6 sm:p-8 rounded-3xl bg-[#161F2E]/80 border border-white/10 hover:border-brand/40 transition-all duration-200 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-brand/40 shrink-0 bg-[#161F2E]">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand/15 text-brand-light text-[11px] font-semibold border border-brand/20 mb-1">
                      {member.role}
                    </span>
                    <h2 className="font-heading font-bold text-xl text-[#F8FAFC] group-hover:text-brand-light transition-colors">
                      <Link href={`/team/${member.slug}`}>
                        {member.name}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="font-body text-sm text-slate-300 leading-relaxed">
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

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {member.focusAreas[0]}
                </span>
                <Link
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-light group-hover:translate-x-1 transition-transform"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Engineering Scoping CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#161F2E] to-[#0F172A] border border-brand/30 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/15 text-brand mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Work With Our Engineering Team
            </h3>
            <p className="font-body text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
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
