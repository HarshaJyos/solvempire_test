"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function EditorialCta() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 p-8 sm:p-14 lg:p-16 text-white shadow-editorial-lg relative overflow-hidden text-center space-y-8">
          {/* Subtle Background Geometry */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-300 font-display text-xs font-semibold tracking-wide mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>START AN ENGAGEMENT</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
              Have a Problem That Needs Solving? <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Let&apos;s Build It Together.
              </span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              Whether you need rapid CAD proof-of-concept, a custom multi-layer PCB spin, or full automated machine development, connect directly with our engineering leads.
            </p>
          </div>

          {/* CTA Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group btn-editorial btn-editorial-blue px-8 py-4 text-base shadow-editorial-glow"
            >
              <span>Scope Your Project in 60s</span>
              <ArrowRight className="w-4 h-4 ml-2 arrow-slide text-white" />
            </Link>

            <Link
              href="/work"
              className="btn-editorial px-6 py-4 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <span>Explore Deployed Systems &rarr;</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-display">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict Mutual NDA Executed</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Lead Engineer Scoping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Obligation Architecture Review</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
