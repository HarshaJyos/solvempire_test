"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processRows = [
  {
    left: {
      step: "01",
      name: "Discover",
      desc: "Define core goals, scope, and user requirements.",
      img: "/process-discover.jpg",
      theme: "blue",
    },
    right: {
      step: "02",
      name: "Design",
      desc: "Architect, engineer, and validate product systems.",
      img: "/freshpod.jpg",
      theme: "blue",
    },
    gradId: "foldGrad1",
    stops: [
      { offset: "0%", color: "#1a202c" },
      { offset: "25%", color: "#2d3748" },
      { offset: "60%", color: "#4a5568" },
      { offset: "85%", color: "#6c85c4" },
      { offset: "100%", color: "#8ba1d9" },
    ],
  },
  {
    left: {
      step: "03",
      name: "Develop",
      desc: "Build hardware, firmware, and software systems.",
      img: "/freshpod-kiosks.png",
      theme: "ice",
    },
    right: {
      step: "04",
      name: "Prototype",
      desc: "Fabricate working prototypes and test performance.",
      img: "/freshpod.jpg",
      theme: "ice",
    },
    gradId: "foldGrad2",
    stops: [
      { offset: "0%", color: "#233238" },
      { offset: "35%", color: "#3b4f59" },
      { offset: "70%", color: "#688294" },
      { offset: "100%", color: "#c8d7f6" },
    ],
  },
  {
    left: {
      step: "05",
      name: "Manufacture",
      desc: "Scale production, quality control, and assembly.",
      img: "/freshpod-kiosks.png",
      theme: "blue",
    },
    right: {
      step: "06",
      name: "Deploy & Support",
      desc: "Launch in field with continuous lifecycle support.",
      img: "/freshpod.jpg",
      theme: "blue",
    },
    gradId: "foldGrad3",
    stops: [
      { offset: "0%", color: "#141c2b" },
      { offset: "30%", color: "#1e2d48" },
      { offset: "70%", color: "#415a8c" },
      { offset: "100%", color: "#6c85c4" },
    ],
  },
];

export function ProcessRibbon() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".gsap-process-header", {
        scrollTrigger: {
          trigger: ".gsap-process-header",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // Rows entrance: opacity and compositor-only transform
      const rows = gsap.utils.toArray<HTMLElement>(".gsap-process-row");
      rows.forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="py-24 sm:py-32 bg-canvas relative overflow-hidden border-t border-hairline/70"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-dot-matrix opacity-35 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="gsap-process-header w-full text-center max-w-4xl mx-auto mb-14 sm:mb-20">
          <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">
            OUR LIFECYCLE
          </span>
          <h2
            id="process-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-bold tracking-tight text-heading uppercase leading-tight"
          >
            <span>OUR </span>
            <span className="text-brand">PROCESS</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-body text-base sm:text-lg max-w-2xl mx-auto leading-[1.618]">
            A structured, end-to-end engineering lifecycle from initial discovery to real-world deployment and long-term lifecycle support.
          </p>
        </div>

        {/* 3D Folded Ribbon Rows */}
        <div className="max-w-5xl mx-auto flex flex-col gap-3 md:gap-0 relative">
          {processRows.map((row, rIdx) => (
            <div
              key={`process-row-${rIdx}`}
              className={`gsap-process-row relative filter drop-shadow-sm group transition-transform duration-300 hover:-translate-y-0.5 ${
                rIdx > 0 ? "md:-mt-[26px]" : ""
              }`}
            >
              {/* Desktop / Tablet View */}
              <div className="hidden md:flex relative w-full items-start">
                {/* Left Step Card */}
                <div
                  className={`w-[calc(50%-24px)] h-[225px] flex rounded-l-2xl rounded-r-none overflow-hidden shrink-0 ${
                    row.left.theme === "ice" ? "bg-ice text-slate-900" : "bg-periwinkle text-white"
                  }`}
                >
                  <div className="w-[48%] p-6 lg:p-7 flex flex-col justify-between shrink-0">
                    <span
                      className={`font-display text-4xl lg:text-[2.618rem] font-bold tracking-tight leading-none ${
                        row.left.theme === "ice" ? "text-brand" : "text-white"
                      }`}
                    >
                      {row.left.step}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-xl lg:text-[1.35rem] font-bold leading-tight mb-1.5 ${
                          row.left.theme === "ice" ? "text-brand" : "text-white"
                        }`}
                      >
                        {row.left.name}
                      </h3>
                      <p
                        className={`text-xs lg:text-[13px] leading-[1.618] line-clamp-2 ${
                          row.left.theme === "ice" ? "text-slate-800" : "text-white/90"
                        }`}
                      >
                        {row.left.desc}
                      </p>
                    </div>
                  </div>
                  <div className="w-[52%] h-full relative overflow-hidden bg-ink rounded-none">
                    <Image
                      src={row.left.img}
                      alt={row.left.name}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Central 3D Fold Connector */}
                <div className="w-[48px] h-[255px] relative shrink-0 z-0 overflow-visible">
                  <svg viewBox="0 0 48 255" className="w-full h-full block" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id={row.gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                        {row.stops.map((s, idx) => (
                          <stop key={idx} offset={s.offset} stopColor={s.color} />
                        ))}
                      </linearGradient>
                      <linearGradient id={`${row.gradId}_leftEdge`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id={`${row.gradId}_rightEdge`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>

                    <polygon points="0,0 48,30 48,255 0,225" fill={`url(#${row.gradId})`} />
                    <polygon points="0,0 12,7.5 12,232.5 0,225" fill={`url(#${row.gradId}_leftEdge)`} />
                    <polygon points="36,22.5 48,30 48,255 36,247.5" fill={`url(#${row.gradId}_rightEdge)`} />
                    <line x1="0" y1="0" x2="48" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                    <line x1="0" y1="225" x2="48" y2="255" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
                  </svg>
                </div>

                {/* Right Step Card */}
                <div
                  className={`w-[calc(50%-24px)] h-[225px] flex rounded-r-2xl rounded-l-none overflow-hidden shrink-0 mt-[30px] ${
                    row.right.theme === "ice" ? "bg-ice text-slate-900" : "bg-periwinkle text-white"
                  }`}
                >
                  <div className="w-[52%] h-full relative overflow-hidden bg-ink rounded-none">
                    <Image
                      src={row.right.img}
                      alt={row.right.name}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-[48%] p-6 lg:p-7 flex flex-col justify-between items-end text-right shrink-0">
                    <span
                      className={`font-display text-4xl lg:text-[2.618rem] font-bold tracking-tight leading-none ${
                        row.right.theme === "ice" ? "text-brand" : "text-white"
                      }`}
                    >
                      {row.right.step}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-xl lg:text-[1.35rem] font-bold leading-tight mb-1.5 ${
                          row.right.theme === "ice" ? "text-brand" : "text-white"
                        }`}
                      >
                        {row.right.name}
                      </h3>
                      <p
                        className={`text-xs lg:text-[13px] leading-[1.618] line-clamp-2 ${
                          row.right.theme === "ice" ? "text-slate-800" : "text-white/90"
                        }`}
                      >
                        {row.right.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View: Vertical Stack */}
              <div className="flex md:hidden flex-col gap-2 rounded-2xl overflow-hidden shadow-sm">
                <div className={`flex h-48 overflow-hidden ${row.left.theme === "ice" ? "bg-ice text-slate-900" : "bg-periwinkle text-white"}`}>
                  <div className="w-1/2 p-5 flex flex-col justify-between">
                    <span className="font-display text-3xl font-bold">{row.left.step}</span>
                    <div>
                      <h3 className="font-display font-bold text-base leading-tight">{row.left.name}</h3>
                      <p className="text-xs leading-[1.618] mt-1 line-clamp-2 opacity-90">{row.left.desc}</p>
                    </div>
                  </div>
                  <div className="w-1/2 relative bg-ink">
                    <Image src={row.left.img} alt={row.left.name} fill sizes="240px" className="object-cover" />
                  </div>
                </div>

                <div className={`flex h-48 overflow-hidden ${row.right.theme === "ice" ? "bg-ice text-slate-900" : "bg-periwinkle text-white"}`}>
                  <div className="w-1/2 relative bg-ink">
                    <Image src={row.right.img} alt={row.right.name} fill sizes="240px" className="object-cover" />
                  </div>
                  <div className="w-1/2 p-5 flex flex-col justify-between items-end text-right">
                    <span className="font-display text-3xl font-bold">{row.right.step}</span>
                    <div>
                      <h3 className="font-display font-bold text-base leading-tight">{row.right.name}</h3>
                      <p className="text-xs leading-[1.618] mt-1 line-clamp-2 opacity-90">{row.right.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
