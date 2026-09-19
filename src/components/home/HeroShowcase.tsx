"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/content/case-studies";
import { COMPANY } from "@/lib/company";

gsap.registerPlugin(ScrollTrigger);

// Four featured projects on the homepage dial
const showcaseProjects = caseStudies.slice(0, 4);

export function HeroShowcase() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const arcDialRef = useRef<HTMLDivElement>(null);
  const showcaseCardRef = useRef<HTMLDivElement>(null);
  const numberNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      if (heroOverlayRef.current) {
        heroOverlayRef.current.style.opacity = "1";
        heroOverlayRef.current.style.transform = "none";
      }
      if (showcaseCardRef.current) {
        showcaseCardRef.current.style.opacity = "1";
        showcaseCardRef.current.style.transform = "none";
        showcaseCardRef.current.removeAttribute("inert");
      }
      return;
    }

    const heroOverlay = heroOverlayRef.current;
    const arcDial = arcDialRef.current;
    const showcaseCard = showcaseCardRef.current;

    // Direct GSAP quickSetters for smooth 60fps compositor-driven updates
    const setHeroOpacity = heroOverlay ? gsap.quickSetter(heroOverlay, "opacity") : null;
    const setHeroY = heroOverlay ? gsap.quickSetter(heroOverlay, "y", "px") : null;
    const setArcY = arcDial ? gsap.quickSetter(arcDial, "y", "vh") : null;
    const setShowcaseOpacity = showcaseCard ? gsap.quickSetter(showcaseCard, "opacity") : null;
    const setShowcaseY = showcaseCard ? gsap.quickSetter(showcaseCard, "y", "px") : null;
    const setShowcaseScale = showcaseCard ? gsap.quickSetter(showcaseCard, "scale") : null;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Hero Content Exit Phase: 0.0 -> 0.16
          if (p < 0.16) {
            const phaseP = p / 0.16;
            const heroOp = Math.max(0, 1 - phaseP * 1.3);
            setHeroOpacity?.(heroOp);
            setHeroY?.(-phaseP * 40);
            if (heroOverlay) {
              heroOverlay.style.pointerEvents = heroOp > 0.4 ? "auto" : "none";
              if (heroOp <= 0.05) heroOverlay.setAttribute("inert", "");
              else heroOverlay.removeAttribute("inert");
            }
          } else {
            setHeroOpacity?.(0);
            if (heroOverlay) {
              heroOverlay.style.pointerEvents = "none";
              heroOverlay.setAttribute("inert", "");
            }
          }

          // 2. Arc Dial Elevation Phase: 0.04 -> 0.20
          if (p < 0.04) {
            setArcY?.(65);
          } else if (p <= 0.20) {
            const phaseP = (p - 0.04) / 0.16;
            const eased = 1 - Math.cos((phaseP * Math.PI) / 2);
            setArcY?.((1 - eased) * 65);
          } else {
            setArcY?.(0);
          }

          // 3. Showcase Card Materialization: 0.12 -> 0.24
          if (p < 0.12) {
            setShowcaseOpacity?.(0);
            setShowcaseY?.(35);
            setShowcaseScale?.(0.96);
            if (showcaseCard) {
              showcaseCard.style.pointerEvents = "none";
              showcaseCard.setAttribute("inert", "");
            }
          } else if (p <= 0.24) {
            const phaseP = (p - 0.12) / 0.12;
            setShowcaseOpacity?.(phaseP);
            setShowcaseY?.((1 - phaseP) * 35);
            setShowcaseScale?.(0.96 + phaseP * 0.04);
            if (showcaseCard) {
              showcaseCard.style.pointerEvents = phaseP > 0.4 ? "auto" : "none";
              if (phaseP <= 0.05) showcaseCard.setAttribute("inert", "");
              else showcaseCard.removeAttribute("inert");
            }
          } else {
            setShowcaseOpacity?.(1);
            setShowcaseY?.(0);
            setShowcaseScale?.(1);
            if (showcaseCard) {
              showcaseCard.style.pointerEvents = "auto";
              showcaseCard.removeAttribute("inert");
            }
          }

          // 4. Dial Continuous Rotation & Project Dwell Mapping across 340vh
          let rotProgress = 0.0;
          let nextIndex = 0;

          if (p <= 0.36) {
            // Solid, unhurried dwell on Project 01 (Freshpod) right as card materializes!
            rotProgress = 0.0;
            nextIndex = 0;
          } else if (p <= 0.56) {
            // Smooth transition from Project 01 -> Project 02 (p: 0.36 to 0.48), then dwell on 02 (p: 0.48 to 0.56)
            const progress01 = Math.min(1, (p - 0.36) / 0.12);
            const eased =
              progress01 < 0.5
                ? 2 * progress01 * progress01
                : 1 - Math.pow(-2 * progress01 + 2, 2) / 2;
            rotProgress = 0.0 + eased * 1.0;
            nextIndex = rotProgress >= 0.5 ? 1 : 0;
          } else if (p <= 0.76) {
            // Smooth transition from Project 02 -> Project 03 (p: 0.56 to 0.68), then dwell on 03 (p: 0.68 to 0.76)
            const progress02 = Math.min(1, (p - 0.56) / 0.12);
            const eased =
              progress02 < 0.5
                ? 2 * progress02 * progress02
                : 1 - Math.pow(-2 * progress02 + 2, 2) / 2;
            rotProgress = 1.0 + eased * 1.0;
            nextIndex = rotProgress >= 1.5 ? 2 : 1;
          } else {
            // Smooth transition from Project 03 -> Project 04 (p: 0.76 to 0.88), then dwell on 04 (p: 0.88 to 1.0)
            const progress03 = Math.min(1, (p - 0.76) / 0.12);
            const eased =
              progress03 < 0.5
                ? 2 * progress03 * progress03
                : 1 - Math.pow(-2 * progress03 + 2, 2) / 2;
            rotProgress = Math.min(3.0, 2.0 + eased * 1.0);
            nextIndex = rotProgress >= 2.5 ? 3 : 2;
          }

          // Guarded discrete React state update
          setActiveProjectIndex((prev) => (prev === nextIndex ? prev : nextIndex));

          // Calculate Arc numbers visibility & position
          const arcGlobalOpacity = Math.min(1, Math.max(0, (p - 0.04) / 0.12));

          showcaseProjects.forEach((_, idx) => {
            const node = numberNodesRef.current[idx];
            if (!node) return;

            const t = 0.5 + (idx - rotProgress) * 0.20;

            if (t < 0.05 || t > 0.95 || arcGlobalOpacity <= 0.01) {
              node.style.opacity = "0";
              return;
            }

            const leftPercent = t * 100;
            const yVal = 115 - 300 * t * (1 - t);
            const topPercent = (yVal / 140) * 100;
            const distanceFromApex = Math.abs(t - 0.5);
            const isActive = distanceFromApex < 0.07;

            const edgeFade = t < 0.16 ? (t - 0.05) / 0.11 : t > 0.84 ? (0.95 - t) / 0.11 : 1;
            const finalOpacity = Math.min(1, Math.max(0, arcGlobalOpacity * edgeFade));

            node.style.left = `${leftPercent}%`;
            node.style.top = `${topPercent}%`;
            node.style.opacity = `${finalOpacity}`;

            // Toggle active apex halo classes
            const innerBadge = node.firstElementChild as HTMLElement;
            if (innerBadge) {
              if (isActive) {
                innerBadge.className =
                  "relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand text-surface flex items-center justify-center font-bold text-sm sm:text-base shadow-xl shadow-brand/40 ring-4 sm:ring-6 ring-brand/15 scale-105 transition-all duration-200";
              } else {
                innerBadge.className =
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface/95 backdrop-blur-xs border-2 border-hairline text-muted flex items-center justify-center font-semibold text-xs sm:text-sm shadow-xs transition-all duration-200";
              }
            }
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const activeProject = showcaseProjects[activeProjectIndex] || showcaseProjects[0];

  return (
    <section
      ref={containerRef}
      aria-label="Featured Engineering Projects"
      className="relative h-[340vh] w-full bg-canvas"
    >
      {/* Pinned Viewport Stage with ample top padding below the fixed header */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-canvas pt-24 sm:pt-28 pb-4">
        {/* Ambient Lighting Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Micro Dot Matrix Grid Layer */}
        <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] -z-10" />

        {/* ========================================================================= */}
        {/* HERO CONTENT OVERLAY (Fades smoothly as scroll begins) */}
        {/* ========================================================================= */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-auto pt-16 sm:pt-20"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center -mt-6 sm:-mt-10">
            <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
              {COMPANY.positioning.eyebrow}
            </span>
            <h1 className="font-display text-display font-bold tracking-tight text-heading leading-[1.08] text-center max-w-5xl mx-auto text-balance">
              <span>We Engineer Ideas Into </span>
              <span className="text-brand">
                Working Products<span className="text-heading">.</span>
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-body font-normal max-w-2xl mx-auto leading-relaxed">
              {COMPANY.positioning.subhead}
            </p>

            <div className="mt-7 sm:mt-9 flex items-center gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2.5 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-base sm:text-[17px] px-8 py-3.5 rounded-full shadow-lg shadow-brand/25 hover:shadow-brand/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Explore Our Work</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE GRAND ARC DIAL (Elevates smoothly, apex sits well below header) */}
        {/* ========================================================================= */}
        <div
          ref={arcDialRef}
          className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden select-none px-0 z-20 pointer-events-none mt-1 sm:mt-3 mb-0"
          style={{ transform: "translateY(65vh)" }}
        >
          <div className="relative w-full h-20 sm:h-24 md:h-28">
            <svg
              viewBox="0 0 1920 140"
              preserveAspectRatio="none"
              className="w-full h-full fill-none overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="arcGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#60a5fa" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d="M 0 115 Q 960 -35 1920 115"
                stroke="url(#arcGlowGradient)"
                strokeWidth="3"
                opacity="0.25"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 0 115 Q 960 -35 1920 115"
                stroke="url(#arcGlowGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Dial Numbers */}
            {showcaseProjects.map((project, index) => (
              <div
                key={project.slug}
                ref={(el) => {
                  numberNodesRef.current[index] = el;
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
                style={{ opacity: 0 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface border-2 border-hairline text-muted flex items-center justify-center font-semibold text-xs sm:text-sm">
                  <span>0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FEATURED SHOWCASE CARD */}
        {/* ========================================================================= */}
        <div
          ref={showcaseCardRef}
          className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center mt-1 sm:mt-2 mb-auto pb-4 sm:pb-6 z-20"
          style={{ opacity: 0 }}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Visual */}
            <div className="lg:col-span-7 relative w-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-ink border border-hairline shadow-2xl group aspect-[16/11] max-h-[340px] sm:max-h-[400px] md:max-h-[440px] lg:max-h-[460px] w-full">
                {showcaseProjects.map((proj, idx) => {
                  const isCurrent = activeProjectIndex === idx;
                  return (
                    <div
                      key={proj.slug}
                      className="absolute inset-0 transition-opacity duration-500 ease-out"
                      style={{
                        opacity: isCurrent ? 1 : 0,
                        pointerEvents: isCurrent ? "auto" : "none",
                        zIndex: isCurrent ? 10 : 0,
                      }}
                    >
                      <Image
                        src={proj.hero.src}
                        alt={proj.hero.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Project Details */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center text-left">
              <div className="w-full mb-2.5 sm:mb-3">
                <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-1.5">
                  {activeProject.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.618rem] font-bold text-heading leading-[1.12] tracking-tight">
                  {activeProject.title}
                </h3>
              </div>

              <div className="w-full mb-5 sm:mb-6">
                <p className="text-body text-sm sm:text-base lg:text-[1.05rem] leading-[1.618] max-w-xl">
                  {activeProject.summary}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.disciplines.slice(0, 3).map((discipline) => (
                  <span
                    key={discipline}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-ice-light text-brand border border-brand/15"
                  >
                    {discipline}
                  </span>
                ))}
              </div>

              {/* CTA Action Button */}
              <div>
                <Link
                  href={`/work/${activeProject.slug}`}
                  className="inline-flex items-center gap-2.5 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-brand/25 hover:shadow-brand/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>View Case Study</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
