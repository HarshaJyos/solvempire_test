"use client";

import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2, Shield } from "lucide-react";

interface CounterItem {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const METRICS: CounterItem[] = [
  { target: 5, suffix: "+", label: "End-to-End Systems", sublabel: "Delivered from CAD to field deployment" },
  { target: 1000, suffix: "+", label: "Field Deployments", sublabel: "Production cycles logged across machines" },
  { target: 10, suffix: "+", label: "Specialized Engineers", sublabel: "Mechanical, PCB, firmware & cloud architects" },
  { target: 100, suffix: "%", label: "Direct Engineering Focus", sublabel: "Zero middle-management overhead" },
];

const CLIENTS = [
  { name: "FreshPod", domain: "Smart Sanitation Automation" },
  { name: "Veyo", domain: "Smart Connected Mobility" },
  { name: "Loah", domain: "Consumer Tech & Hardware" },
  { name: "Aditya University", domain: "Industrial R&D Lab" },
  { name: "Risenine", domain: "Digital Enterprise Systems" },
];

export function EditorialTrustBar() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(METRICS.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate count-up smoothly over 1.2 seconds
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              METRICS.map((m) => Math.floor(easeOut * m.target))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(METRICS.map((m) => m.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-16 bg-white border-y border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Client Logos with Hover Emphasis */}
        <div className="space-y-4 text-center">
          <p className="font-display font-semibold text-xs uppercase tracking-wider text-slate-400">
            Trusted by Innovative Teams &amp; Industrial Labs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 pt-2">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="group flex flex-col items-center justify-center p-3 rounded-xl hover:bg-slate-50 transition-all cursor-default"
              >
                <span className="font-display font-bold text-base sm:text-lg text-slate-700 group-hover:text-blue-600 transition-colors">
                  {client.name}
                </span>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-tight">
                  {client.domain}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Count-Up Metrics Modular Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:border-slate-300/80 transition-all hover:bg-white hover:shadow-editorial-sm space-y-2 group"
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                {counts[idx]}
                {metric.suffix}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-bold text-sm text-slate-800">
                  {metric.label}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {metric.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
