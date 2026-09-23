"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CLIENTS = [
  { name: "FreshPod", sector: "Automated Sanitation Robotics", link: "/work/freshpod-machine" },
  { name: "Veyo Mobility", sector: "Smart Connected EV Telemetry", link: "/work" },
  { name: "Loah Tech", sector: "Consumer Kinematic Hardware", link: "/work" },
  { name: "Aditya University", sector: "Industrial R&D Testbed", link: "/work" },
  { name: "Risenine", sector: "Enterprise Cloud Platforms", link: "/work" },
];

export function IndiseaWhoWeWorkWith() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans border-t border-[var(--border-hairline)]">
      <div className="indisea-wrap space-y-16">
        {/* Asymmetric Split */}
        <div className="indisea-grid items-start">
          <div className="col-span-12 lg:col-span-3">
            <span className="indisea-eyebrow">10 / CLIENTS &amp; ECOSYSTEM PARTNERS</span>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-[var(--text-heading)] leading-[1.25] tracking-tight">
              We work with <span className="indisea-verb-yellow font-bold">venture-backed hardware startups, IoT companies, and industrial labs</span>. We own the complete hardware and firmware engineering layers so your team can scale with confidence.
            </p>
          </div>
        </div>

        {/* Client & Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CLIENTS.map((c) => (
            <Link
              key={c.name}
              href={c.link}
              className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 transition-all flex flex-col justify-between min-h-[140px] group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="indisea-eyebrow">PARTNER</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#1F56C6] transition-colors" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight text-[var(--text-heading)] group-hover:text-[#1F56C6] transition-colors">
                  {c.name}
                </h3>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mt-1">
                  {c.sector}
                </span>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
