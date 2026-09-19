"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    category: "PRODUCT ENGINEERING",
    title: "Freshpod Helmet Sanitization System",
    description:
      "An automated helmet hygiene system that uses advanced sanitization & sterilization technology to keep helmets clean, safe and germ-free.",
    image: "/freshpod.jpg",
    link: "#freshpod",
    tags: ["IoT Hardware", "Microcontrollers", "Cloud Telemetry", "Industrial Design"],
  },
  {
    id: "02",
    category: "FINTECH & CLOUD SYSTEMS",
    title: "ApexFlow Real-Time Financial Engine",
    description:
      "High-throughput, ultra-low latency financial data platform built for real-time asset settlement, multi-currency routing, and institutional execution.",
    image: "/freshpod.jpg",
    link: "#apexflow",
    tags: ["Distributed Systems", "Sub-millisecond Latency", "Event Sourcing", "Rust & Go"],
  },
  {
    id: "03",
    category: "AI & IOT PLATFORMS",
    title: "OmniTrack Smart Fleet Telemetry",
    description:
      "Intelligent IoT fleet tracking system powering next-gen route optimization, predictive maintenance scheduling, and driver safety intelligence.",
    image: "/freshpod.jpg",
    link: "#omnitrack",
    tags: ["Edge AI", "Geofencing", "Predictive Analytics", "Real-time Telematics"],
  },
  {
    id: "04",
    category: "HEALTHCARE INNOVATION",
    title: "MedVantage Diagnostic AI Suite",
    description:
      "Clinical decision support software harnessing advanced computer vision to deliver fast, highly accurate medical image triage and diagnostics.",
    image: "/freshpod.jpg",
    link: "#medvantage",
    tags: ["Computer Vision", "HIPAA Compliant", "Federated Learning", "DICOM Pipeline"],
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotationProgress, setRotationProgress] = useState<number>(-0.6); // -0.6 = hidden/start, 0 = 01, 1 = 02, 2 = 03, 3 = 04
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [heroOpacity, setHeroOpacity] = useState<number>(1);
  const [heroY, setHeroY] = useState<number>(0);
  const [arcShift, setArcShift] = useState<number>(1); // 1 = at bottom of hero, 0 = at showcase position
  const [cardOpacity, setCardOpacity] = useState<number>(0);
  const [cardY, setCardY] = useState<number>(40);
  const [cardScale, setCardScale] = useState<number>(0.96);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. Initialize Pinned ScrollTrigger for Hero & Arc Rotation
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        onUpdate: (self) => {
          const p = self.progress;

          // =========================================================================
          // PHASE 1: HERO READING BUFFER (p: 0.0 -> 0.12)
          // Hero remains 100% visible and readable for initial scroll duration
          // =========================================================================
          if (p <= 0.12) {
            setHeroOpacity(1);
            setHeroY(0);
            setArcShift(1);
            setCardOpacity(0);
            setCardY(40);
            setCardScale(0.96);
            setRotationProgress(-0.6); // No numbers on arc
            setActiveProjectIndex(0);
            return;
          }

          // =========================================================================
          // PHASE 2: CINEMATIC HERO EXIT & ARC ELEVATION (p: 0.12 -> 0.26)
          // Hero lifts smoothly upward like a video camera pan; Arc elevates to showcase position; stage below is clean
          // =========================================================================
          if (p > 0.12 && p <= 0.26) {
            const transP = (p - 0.12) / 0.14; // 0 to 1
            setHeroOpacity(Math.max(0, 1 - transP));
            setHeroY(-transP * 90);
            setArcShift(Math.max(0, 1 - transP));
            setCardOpacity(0);
            setCardY(40);
            setCardScale(0.96);
            setRotationProgress(-0.6); // Empty stage until number arrives
            setActiveProjectIndex(0);
            return;
          }

          // =========================================================================
          // PHASE 3: NUMBER 01 GLIDES IN & PROJECT 01 CARD UNMASKS (p: 0.26 -> 0.40)
          // =========================================================================
          setHeroOpacity(0);
          setHeroY(-100);
          setArcShift(0);

          if (p > 0.26 && p <= 0.40) {
            const entryP = (p - 0.26) / 0.14; // 0 to 1
            const u = -0.6 + entryP * 0.6; // -0.6 -> 0.0 (Project 01 arrives at apex)
            setRotationProgress(u);

            // Card cinematic entrance as number 01 hits apex
            const cP = Math.max(0, (entryP - 0.2) / 0.8);
            setCardOpacity(cP);
            setCardY((1 - cP) * 35);
            setCardScale(0.96 + 0.04 * cP);
            setActiveProjectIndex(0);
            return;
          }

          // =========================================================================
          // PHASE 4: KINETIC NUMBER ROTATION ACROSS 01 -> 02 -> 03 -> 04 (p: 0.40 -> 1.0)
          // =========================================================================
          setCardOpacity(1);
          setCardY(0);
          setCardScale(1);

          const rotP = (p - 0.40) / 0.58; // 0 to 1
          const u = Math.min(3.0, Math.max(0.0, rotP * 3.0)); // 0.0 to 3.0
          setRotationProgress(u);

          const activeIdx = Math.max(0, Math.min(projects.length - 1, Math.round(u)));
          setActiveProjectIndex(activeIdx);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      {/* ========================================================================= */}
      {/* PINNED HERO & SHOWCASE STAGE (400vh scroll distance for smooth scrubbing) */}
      {/* ========================================================================= */}
      <div ref={containerRef} className="relative h-[380vh] w-full">
        {/* Sticky 100vh Viewport Stage */}
        <div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-white"
        >
          {/* Header Navigation */}
          <header className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between relative z-40">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Solvempire Logo"
                width={190}
                height={44}
                priority
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              <Link
                href="#about"
                className="text-slate-600 hover:text-blue-600 text-[15px] font-medium transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="#services"
                className="text-slate-600 hover:text-blue-600 text-[15px] font-medium transition-colors duration-200"
              >
                Capabilities
              </Link>
              <Link
                href="#process"
                className="text-slate-600 hover:text-blue-600 text-[15px] font-medium transition-colors duration-200"
              >
                Process
              </Link>
            </nav>

            {/* Desktop Contact CTA */}
            <div className="hidden md:block">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-[15px] px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-200 active:scale-95"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </header>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200 relative z-50">
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium py-1"
              >
                About Us
              </Link>
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium py-1"
              >
                Capabilities
              </Link>
              <Link
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-blue-600 font-medium py-1"
              >
                Process
              </Link>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-full text-center mt-2 shadow-sm"
              >
                Contact Us
              </Link>
            </div>
          )}

          {/* ========================================================================= */}
          {/* HERO CONTENT OVERLAY (Fades smoothly as scroll begins) */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30"
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroY - 16}px)`,
              pointerEvents: heroOpacity > 0.4 ? "auto" : "none",
              transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="max-w-5xl mx-auto flex flex-col items-center pt-0 -mt-8 sm:-mt-12">
              <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-slate-950 leading-[1.08] text-center max-w-5xl mx-auto text-balance">
                <span>We Engineer Ideas Into </span>
                <span className="text-blue-600">
                  Working Products<span className="text-slate-950">.</span>
                </span>
              </h1>

              <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-slate-500 font-normal max-w-xl mx-auto leading-relaxed">
                Custom software. Scalable platforms. Real-world impact.
              </p>

              <div className="mt-7 sm:mt-9">
                <button
                  type="button"
                  onClick={() => {
                    const el = containerRef.current;
                    if (el) {
                      const targetY = el.offsetTop + el.offsetHeight * 0.35;
                      window.scrollTo({ top: targetY, behavior: "smooth" });
                    }
                  }}
                  className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-base sm:text-[17px] px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
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
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE GRAND ARC DIAL (Positioned at bottom of Hero, elevates smoothly on scroll) */}
          {/* ========================================================================= */}
          <div
            className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden select-none px-0 z-20 pointer-events-none"
            style={{
              transform: `translateY(${arcShift * 65}vh)`,
              marginTop: "2rem",
              marginBottom: "0px",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="relative w-full h-24 sm:h-28 md:h-30">
              {/* SVG Glowing Arc Curve stretching across the entire screen */}
              <svg
                viewBox="0 0 1920 140"
                preserveAspectRatio="none"
                className="w-full h-full fill-none overflow-visible"
              >
                <defs>
                  <linearGradient id="arcGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.25" />
                    <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#2563eb" stopOpacity="0.95" />
                    <stop offset="75%" stopColor="#60a5fa" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.25" />
                  </linearGradient>
                  <filter id="arcGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ambient glow line */}
                <path
                  d="M 0 115 Q 960 -35 1920 115"
                  stroke="url(#arcGlowGradient)"
                  strokeWidth="4"
                  opacity="0.2"
                  filter="url(#arcGlowFilter)"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Primary track line */}
                <path
                  d="M 0 115 Q 960 -35 1920 115"
                  stroke="url(#arcGlowGradient)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Dynamically Rotating Project Numbers along the Arc Curve */}
              {rotationProgress > -0.5 &&
                projects.map((project, index) => {
                  // Continuous curve parameter t
                  const t = 0.5 + (index - rotationProgress) * 0.18;

                  // Hide if outside visible arc bounds
                  if (t < 0.04 || t > 0.96) return null;

                  // Exact quadratic Bézier coordinates: y(t) = 115 - 300*t*(1-t) in viewBox height 140
                  const leftPercent = t * 100;
                  const yVal = 115 - 300 * t * (1 - t);
                  const topPercent = (yVal / 140) * 100;

                  // Active focal state when near apex (t ~ 0.5)
                  const distanceFromApex = Math.abs(t - 0.5);
                  const isActive = distanceFromApex < 0.08;

                  // Smooth fade-in as numbers enter
                  const entryOpacity = Math.min(1, Math.max(0, (rotationProgress + 0.5) / 0.5));
                  // Edge fade out
                  const edgeFade = t < 0.12 ? t / 0.12 : t > 0.88 ? (0.96 - t) / 0.08 : 1;
                  const finalOpacity = Math.min(1, Math.max(0, entryOpacity * edgeFade));

                  return (
                    <div
                      key={project.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none transition-transform duration-200"
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                        opacity: finalOpacity,
                      }}
                    >
                      {isActive ? (
                        <div className="relative flex flex-col items-center">
                          {/* Luminous Pulsing Halo */}
                          <span className="absolute -inset-2 rounded-full bg-blue-400/30 animate-pulse blur-xs" />
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-xl shadow-blue-500/40 ring-4 sm:ring-6 ring-blue-100 scale-105 transition-all duration-300">
                            <span>{project.id}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm border-2 border-slate-200 text-slate-500 flex items-center justify-center font-semibold text-xs sm:text-sm shadow-sm transition-all duration-300">
                          <span>{project.id}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURED SHOWCASE CARD (Elevated higher, clean minimalist composition) */}
          {/* ========================================================================= */}
          <div
            className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center mt-2 sm:mt-3 mb-auto pb-6 sm:pb-8 z-20"
            style={{
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) scale(${cardScale})`,
              pointerEvents: cardOpacity > 0.4 ? "auto" : "none",
              transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Minimalist Layered Showcase Visual */}
              <div className="lg:col-span-7 relative w-full">
                {/* Subtle Background Offset Card 1 */}
                <div
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-[96%] h-[96%] bg-blue-100/70 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-500"
                  aria-hidden="true"
                />

                {/* Subtle Background Offset Card 2 */}
                <div
                  className="absolute -bottom-3 -right-3 w-[92%] h-[92%] bg-blue-200/40 rounded-2xl sm:rounded-3xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Main Image Container */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl group aspect-[16/10] max-h-[300px] sm:max-h-[340px] md:max-h-[380px] w-full">
                  <Image
                    key={projects[activeProjectIndex].id}
                    src={projects[activeProjectIndex].image}
                    alt={projects[activeProjectIndex].title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 animate-in fade-in duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Minimalist Project Details & Action */}
              <div
                key={projects[activeProjectIndex].id}
                className="lg:col-span-5 flex flex-col items-start justify-center text-left"
              >
                {/* Title */}
                <h3 className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-slate-950 leading-[1.12] tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-2 duration-400 ease-out">
                  {projects[activeProjectIndex].title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-7 max-w-lg animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75 ease-out">
                  {projects[activeProjectIndex].description}
                </p>

                {/* CTA Action Button */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 ease-out">
                  <Link
                    href={projects[activeProjectIndex].link}
                    className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-base px-8 py-3.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: CAPABILITIES & SERVICES */}
      {/* ========================================================================= */}
      <section id="services" className="py-24 sm:py-32 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-xs sm:text-sm uppercase">
              Our Capabilities
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-5xl font-bold text-slate-950 mt-2 mb-4 tracking-tight">
              End-to-End Engineering for Visionary Teams.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We design, build, and deploy mission-critical software systems and connected hardware platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Web & Cloud Platforms",
                desc: "Scalable microservices, distributed architectures, and modern web applications built for reliability under high load.",
                icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
              },
              {
                title: "IoT & Hardware Integration",
                desc: "Firmware, embedded telemetry, and cloud orchestration bridging the physical world with real-time digital systems.",
                icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
              },
              {
                title: "AI & Machine Learning",
                desc: "Applied computer vision, predictive intelligence, and specialized LLM pipelines embedded natively into workflows.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-bricolage)] text-xl font-bold text-slate-950 mb-2.5">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: PROCESS */}
      {/* ========================================================================= */}
      <section id="process" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-16">
            <span className="text-blue-600 font-semibold tracking-wider text-xs sm:text-sm uppercase">
              How We Work
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-5xl font-bold text-slate-950 mt-2 mb-4 tracking-tight">
              Predictable Velocity. Rigorous Craft.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A disciplined, transparent delivery framework honed across dozens of successful product launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", name: "Discover & Scope", text: "Deep technical audit, architecture roadmapping, and requirement validation." },
              { num: "02", name: "System Design", text: "Component blueprints, data modeling, API contracts, and UX prototypes." },
              { num: "03", name: "Rapid Build", text: "Iterative milestone-driven sprints with automated CI/CD and automated test suites." },
              { num: "04", name: "Deploy & Scale", text: "Zero-downtime rollouts, telemetry dashboards, and 24/7 SLA infrastructure support." },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
                <span className="font-[family-name:var(--font-bricolage)] text-3xl font-bold text-blue-600 mb-3">
                  {step.num}
                </span>
                <h4 className="font-bold text-slate-950 text-base mb-2">{step.name}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer id="contact" className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-800 pb-12">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/logo.png"
              alt="Solvempire Logo"
              width={180}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="text-slate-400 text-sm max-w-sm text-center md:text-left">
              Engineering ideas into high-performance digital products and scalable systems.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#about" className="text-slate-400 hover:text-white text-sm transition-colors">
              About
            </Link>
            <Link href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">
              Capabilities
            </Link>
            <Link href="#process" className="text-slate-400 hover:text-white text-sm transition-colors">
              Process
            </Link>
            <Link
              href="mailto:contact@solvempire.com"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Solvempire Inc. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS &amp; GSAP.</p>
        </div>
      </footer>
    </div>
  );
}
