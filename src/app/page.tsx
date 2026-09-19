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
    image: "/freshpod-kiosks.png",
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
    image: "/freshpod-kiosks.png",
    link: "#medvantage",
    tags: ["Computer Vision", "HIPAA Compliant", "Federated Learning", "DICOM Pipeline"],
  },
];

const partnerPillars = [
  {
    id: "01",
    subtitle: "CONCEPT TO DEPLOYMENT",
    tag: "END-TO-END ENGINEERING",
    title: "Turning Bold Concepts Into Production-Ready Products",
    description:
      "We transform early-stage ideas into functional products through structured engineering, prototyping, testing and refinement, ensuring every concept moves confidently from initial thinking to a practical, scalable and deployment-ready solution.",
    tools: [
      { name: "Figma", category: "UI/UX & Spec" },
      { name: "SolidWorks", category: "Mechanical CAD" },
      { name: "Altium Designer", category: "PCB & Hardware" },
    ],
  },
  {
    id: "02",
    subtitle: "UNIFIED EXPERTISE",
    tag: "MULTI-DISCIPLINARY",
    title: "Multiple Disciplines Working Together As One Team",
    description:
      "Our multidisciplinary approach brings mechanical, electronics, embedded systems, software and product expertise together, allowing complex challenges to be addressed from multiple technical perspectives within one coordinated engineering process.",
    tools: [
      { name: "SolidWorks", category: "Enclosure Design" },
      { name: "Altium Designer", category: "Circuit Layout" },
      { name: "VS Code", category: "Firmware & Cloud" },
    ],
  },
  {
    id: "03",
    subtitle: "INTELLIGENT SYSTEMS",
    tag: "SMART SYSTEMS",
    title: "Building Smarter Connected Systems For Real-World Use",
    description:
      "We develop connected and intelligent systems by integrating embedded hardware, software, sensors, communication technologies and intuitive interfaces to create products that work seamlessly across real-world applications and environments.",
    tools: [
      { name: "Arduino", category: "Rapid Embedded" },
      { name: "ESP32", category: "Wireless IoT" },
      { name: "Firebase", category: "Realtime Telemetry" },
    ],
  },
  {
    id: "04",
    subtitle: "QUALITY & RELIABILITY",
    tag: "RELIABILITY FIRST",
    title: "Engineering Products For Reliable Real-World Performance",
    description:
      "We focus on validation, testing and continuous refinement to identify potential issues early, improve product performance and build dependable engineering solutions capable of delivering consistent results under real-world operating conditions.",
    tools: [
      { name: "MATLAB", category: "Algorithmic Analysis" },
      { name: "Simulink", category: "Model-Based Test" },
      { name: "LabVIEW", category: "Automated QA" },
    ],
  },
  {
    id: "05",
    subtitle: "MANUFACTURING SUPPORT",
    tag: "PRODUCTION READY",
    title: "From Engineering Designs To Production-Ready Solutions",
    description:
      "We connect engineering with manufacturing by considering materials, production methods, component selection, assembly and design constraints early, helping transform technically sound designs into practical and manufacturable products.",
    tools: [
      { name: "SolidWorks", category: "DFM & Assembly" },
      { name: "AutoCAD", category: "Technical Drawings" },
      { name: "Fusion 360", category: "Toolpath & CNC" },
    ],
  },
  {
    id: "06",
    subtitle: "LONG-TERM SUPPORT",
    tag: "LIFECYCLE SUPPORT",
    title: "Supporting Products Through Every Stage Of Their Journey",
    description:
      "Our engineering support continues beyond initial deployment through technical improvements, troubleshooting, iterations and product enhancements, helping solutions adapt to changing requirements while maintaining performance, reliability and long-term usability.",
    tools: [
      { name: "GitHub", category: "Version Control" },
      { name: "Jira", category: "Agile Tracking" },
      { name: "Grafana", category: "Live Telemetry" },
    ],
  },
];

const processSteps = [
  {
    step: "01",
    name: "Discover",
    description: "Understand goals, requirements & user needs",
    image: "/process-discover.jpg",
  },
  {
    step: "02",
    name: "Design",
    description: "Conceptualize, engineer & validate the solution",
    image: "/freshpod.jpg",
  },
  {
    step: "03",
    name: "Develop",
    description: "Build mechanical, electronic, software & integrations",
    image: "/freshpod-kiosks.png",
  },
  {
    step: "04",
    name: "Prototype",
    description: "Prototype, test & iterate for performance and reliability",
    image: "/freshpod.jpg",
  },
  {
    step: "05",
    name: "Manufacture",
    description: "Support production, quality & supply chain",
    image: "/freshpod-kiosks.png",
  },
  {
    step: "06",
    name: "Deploy & Support",
    description: "Deploy in the field and support for long-term success",
    image: "/freshpod.jpg",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotationProgress, setRotationProgress] = useState<number>(-0.6); // -0.6 = hidden/start, 0 = 01, 1 = 02, 2 = 03, 3 = 04
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [heroOpacity, setHeroOpacity] = useState<number>(1);
  const [heroY, setHeroY] = useState<number>(0);
  const [arcShift, setArcShift] = useState<number>(1); // 1 = at bottom of hero, 0 = at showcase position
  const [cardOpacity, setCardOpacity] = useState<number>(0);
  const [cardY, setCardY] = useState<number>(40);
  const [cardScale, setCardScale] = useState<number>(0.96);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const partnerContainerRef = useRef<HTMLDivElement>(null);
  const partnerContentRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [partnerProgress, setPartnerProgress] = useState<number>(0);

  const scrollToPillar = (index: number) => {
    if (!partnerContainerRef.current) return;
    const rect = partnerContainerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollDistance = partnerContainerRef.current.offsetHeight - window.innerHeight;
    const targetP = (index + 0.5) / partnerPillars.length;
    const targetScroll = containerTop + targetP * scrollDistance;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // GSAP Driven Process Section Cinematic Video-Grade Animation
  useEffect(() => {
    if (!processSectionRef.current) return;

    // Small timeout to guarantee DOM metrics & Lenis are calibrated
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // 1. Cinematic Heading Reveal with Rack Focus
      gsap.fromTo(
        ".gsap-process-heading",
        { y: 40, opacity: 0, filter: "blur(12px)", rotateX: 12 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-process-heading",
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".gsap-process-subheading",
        { y: 22, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          delay: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-process-subheading",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 2. Cascading 3D Origami Ribbon Unfold per Row (Reactive On Scroll)
      const rows = gsap.utils.toArray<HTMLElement>(".gsap-process-row");
      rows.forEach((row) => {
        const leftCard = row.querySelector(".gsap-process-left");
        const foldConnector = row.querySelector(".gsap-process-fold");
        const rightCard = row.querySelector(".gsap-process-right");
        const numberBadges = row.querySelectorAll(".gsap-process-num");
        const textBlocks = row.querySelectorAll(".gsap-process-text");
        const photos = row.querySelectorAll(".gsap-process-photo");

        const rowTL = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 86%",
            end: "bottom 14%",
            toggleActions: "play reverse play reverse",
          },
        });

        rowTL
          // Left Card 3D Glide In
          .fromTo(
            leftCard,
            { x: -55, opacity: 0, filter: "blur(8px)", scale: 0.94 },
            { x: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out" }
          )
          // 3D Fold Ribbon Bevel Snaps into Place
          .fromTo(
            foldConnector,
            { scaleY: 0, opacity: 0, transformOrigin: "top center" },
            { scaleY: 1, opacity: 1, duration: 0.65, ease: "back.out(1.4)" },
            "-=0.6"
          )
          // Right Card 3D Glide In
          .fromTo(
            rightCard,
            { x: 55, opacity: 0, filter: "blur(8px)", scale: 0.94 },
            { x: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out" },
            "-=0.65"
          )
          // Number Kinetic Pop & Scale
          .fromTo(
            numberBadges,
            { scale: 0.6, opacity: 0, y: 12 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.8)", stagger: 0.12 },
            "-=0.5"
          )
          // Text Titles & Descriptions Reveal
          .fromTo(
            textBlocks,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 },
            "-=0.45"
          )
          // Photo Cinematic Pull-Focus Zoom-Out
          .fromTo(
            photos,
            { scale: 1.16, filter: "blur(5px)" },
            { scale: 1.0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
            "-=0.7"
          );
      });
    }, processSectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // GSAP Driven Minimal Transition Animation for Why Partner Elements
  useEffect(() => {
    if (!partnerContentRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Tag Animation
      gsap.fromTo(
        ".gsap-pillar-tag",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      // 2. Title Animation with subtle rack unmask
      gsap.fromTo(
        ".gsap-pillar-title",
        { y: 16, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power3.out" }
      );

      // 3. Description Animation
      gsap.fromTo(
        ".gsap-pillar-desc",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.48, delay: 0.05, ease: "power2.out" }
      );

      // 4. Staggered Tool Badges
      gsap.fromTo(
        ".gsap-pillar-tool",
        { y: 8, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          delay: 0.08,
          ease: "power2.out",
        }
      );

      // 5. Isometric Blueprint Graphic Rack-Focus & Subtle Scale
      gsap.fromTo(
        ".gsap-pillar-graphic",
        { scale: 0.94, opacity: 0, filter: "blur(5px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
      );
    }, partnerContentRef);

    return () => ctx.revert();
  }, [activePillarIndex]);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

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

      // 3. Initialize Pinned ScrollTrigger for Why Partner with Solvempire
      const partnerContainer = partnerContainerRef.current;
      if (partnerContainer) {
        ScrollTrigger.create({
          trigger: partnerContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress; // 0.0 to 1.0
            const clampedIdx = Math.min(
              partnerPillars.length - 1,
              Math.floor(p * (partnerPillars.length - 0.001))
            );
            setActivePillarIndex(clampedIdx);
            setPartnerProgress(p);
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
      lenisRef.current = null;
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
                      if (lenisRef.current) {
                        lenisRef.current.scrollTo(targetY, { duration: 1.2 });
                      } else {
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }
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
              marginTop: "2.5rem",
              marginBottom: "0.25rem",
              transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="relative w-full h-24 sm:h-28 md:h-32">
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
          {/* FEATURED SHOWCASE CARD (Scaled-up, filled proportions, balanced vertical rhythm) */}
          {/* ========================================================================= */}
          <div
            className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center mt-3 sm:mt-5 mb-auto pb-8 sm:pb-12 z-20"
            style={{
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) scale(${cardScale})`,
              pointerEvents: cardOpacity > 0.4 ? "auto" : "none",
              transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Column: Scaled-up Showcase Visual with Cinema-Grade Cross-Dissolve */}
              <div className="lg:col-span-7 relative w-full">
                {/* Subtle Background Offset Card 1 */}
                <div
                  className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-[96%] h-[96%] bg-blue-100/70 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-700 ease-out"
                  style={{
                    transform: `scale(${1 + (activeProjectIndex % 2) * 0.005})`,
                  }}
                  aria-hidden="true"
                />

                {/* Subtle Background Offset Card 2 */}
                <div
                  className="absolute -bottom-3.5 -right-3.5 w-[92%] h-[92%] bg-blue-200/40 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-700 ease-out"
                  style={{
                    transform: `scale(${1 - (activeProjectIndex % 2) * 0.005})`,
                  }}
                  aria-hidden="true"
                />

                {/* Main Image Container (Cinema-Grade Rack Focus & Seamless Cross-Dissolve) */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-2xl group aspect-[16/11] max-h-[380px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[500px] w-full">
                  {projects.map((proj, idx) => {
                    const isCurrent = activeProjectIndex === idx;
                    return (
                      <div
                        key={proj.id}
                        className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          opacity: isCurrent ? 1 : 0,
                          transform: isCurrent ? "scale(1.0)" : "scale(1.05)",
                          filter: isCurrent ? "blur(0px)" : "blur(6px)",
                          pointerEvents: isCurrent ? "auto" : "none",
                          zIndex: isCurrent ? 10 : 0,
                        }}
                      >
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          priority={idx === 0}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Scaled Project Details & Kinetic Typography Animations */}
              <div className="lg:col-span-5 flex flex-col items-start justify-center text-left">
                {/* Title Container with Kinetic Masked Reveal */}
                <div className="overflow-hidden w-full mb-4 sm:mb-5">
                  <h3
                    key={`title-${projects[activeProjectIndex].id}`}
                    className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-slate-950 leading-[1.10] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {projects[activeProjectIndex].title}
                  </h3>
                </div>

                {/* Description Container with Staggered Kinetic Reveal */}
                <div className="overflow-hidden w-full mb-7 sm:mb-8">
                  <p
                    key={`desc-${projects[activeProjectIndex].id}`}
                    className="text-slate-600 text-base sm:text-lg lg:text-[1.125rem] leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-600 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {projects[activeProjectIndex].description}
                  </p>
                </div>

                {/* CTA Action Button */}
                <div
                  key={`cta-${projects[activeProjectIndex].id}`}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <Link
                    href={projects[activeProjectIndex].link}
                    className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-base sm:text-[17px] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
      {/* SECTION 3: WHY PARTNER WITH SOLVEMPIRE (Scroll-Pinned Interactive Track) */}
      {/* ========================================================================= */}
      <div
        ref={partnerContainerRef}
        id="why-partner"
        className="relative h-[380vh] w-full bg-white border-t border-slate-100"
      >
        {/* Sticky 100vh Viewport Stage */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
          <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
            {/* Section Heading */}
            <div className="w-full text-center max-w-4xl mx-auto mb-6 sm:mb-8">
              <h2 className="font-[family-name:var(--font-bricolage)] text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-slate-950 uppercase">
                <span>WHY PARTNER WITH </span>
                <span className="text-blue-600">SOLVEMPIRE?</span>
              </h2>
            </div>

            {/* Main Interactive Partner Showcase Card */}
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-200/90 shadow-2xl shadow-blue-500/5 p-6 sm:p-8 lg:p-10 relative w-full">
              {/* Mobile/Tablet Horizontal Stepper Row */}
              <div className="flex lg:hidden items-center justify-between w-full mb-6 pb-2 border-b border-slate-100 gap-2 overflow-x-auto">
                {partnerPillars.map((pillar, idx) => {
                  const isActive = activePillarIndex === idx;
                  return (
                    <button
                      key={`mob-${pillar.id}`}
                      onClick={() => scrollToPillar(idx)}
                      aria-label={`Select pillar ${pillar.id}: ${pillar.title}`}
                      className="focus:outline-none cursor-pointer flex-shrink-0"
                    >
                      {isActive ? (
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/30 ring-2 ring-blue-100 scale-105 transition-all duration-300">
                          <span>{pillar.id}</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 font-semibold text-xs flex items-center justify-center transition-all duration-300">
                          <span>{pillar.id}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div ref={partnerContentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Numbered Timeline Stepper Rail (01 to 06) for Desktop */}
                <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-between h-[340px] relative py-2">
                  {/* Vertical Connector Track Background */}
                  <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-slate-200 z-0" />

                  {/* Dynamic Active Progress Bar Indicator */}
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] bg-blue-600 z-0 transition-all duration-300 ease-out"
                    style={{
                      height: `${(activePillarIndex / (partnerPillars.length - 1)) * 100}%`,
                    }}
                  />

                  {partnerPillars.map((pillar, idx) => {
                    const isActive = activePillarIndex === idx;
                    return (
                      <button
                        key={pillar.id}
                        onClick={() => scrollToPillar(idx)}
                        aria-label={`Select pillar ${pillar.id}: ${pillar.title}`}
                        className="relative z-10 group focus:outline-none cursor-pointer"
                      >
                        {isActive ? (
                          <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/35 ring-4 ring-blue-100 scale-110 transition-all duration-300">
                            <span>{pillar.id}</span>
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-200 group-hover:border-blue-500 text-slate-400 group-hover:text-blue-600 font-semibold text-xs flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-xs">
                            <span>{pillar.id}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Middle Column: Pillar Content, Tools Badges & CTA */}
                <div className="lg:col-span-6 flex flex-col items-start justify-center text-left">
                  {/* Tag Pill with GSAP minimal animation */}
                  <div className="overflow-hidden mb-2 sm:mb-3">
                    <span
                      key={`pillar-tag-${partnerPillars[activePillarIndex].id}`}
                      className="gsap-pillar-tag inline-block text-blue-600 font-bold text-xs sm:text-sm tracking-[0.18em] uppercase"
                    >
                      {partnerPillars[activePillarIndex].tag}
                    </span>
                  </div>

                  {/* Title with GSAP minimal kinetic typography */}
                  <div className="overflow-hidden w-full mb-3.5 sm:mb-4">
                    <h3
                      key={`pillar-title-${partnerPillars[activePillarIndex].id}`}
                      className="gsap-pillar-title font-[family-name:var(--font-bricolage)] text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-slate-950 leading-[1.16] tracking-tight"
                    >
                      {partnerPillars[activePillarIndex].title}
                    </h3>
                  </div>

                  {/* Description with GSAP subtle staggered fade & slide */}
                  <div className="overflow-hidden w-full mb-6 sm:mb-7">
                    <p
                      key={`pillar-desc-${partnerPillars[activePillarIndex].id}`}
                      className="gsap-pillar-desc text-slate-600 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-lg"
                    >
                      {partnerPillars[activePillarIndex].description}
                    </p>
                  </div>

                  {/* Tool Badges / Logos with GSAP stagger */}
                  <div
                    key={`pillar-tools-${partnerPillars[activePillarIndex].id}`}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7 sm:mb-8 w-full max-w-lg"
                  >
                    {partnerPillars[activePillarIndex].tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="gsap-pillar-tool p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-start gap-1 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 text-blue-600 mb-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {tool.category}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Contact CTA Button */}
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    <span>Contact Us Now</span>
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

                {/* Right Column: Isometric 3D Blueprint Visual Graphic */}
                <div className="lg:col-span-5 relative w-full aspect-square max-h-[380px] sm:max-h-[420px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-600/25">
                  {/* Blueprint Background Grid Pattern */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Dynamic Isometric Blueprint Graphics by Pillar */}
                  <div
                    key={`graphic-${partnerPillars[activePillarIndex].id}`}
                    className="gsap-pillar-graphic relative w-full h-full flex items-center justify-center"
                  >
                    {/* Visual 01: Layered Isometric Wireframe Cube & Precision Base */}
                    {activePillarIndex === 0 && (
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] text-white stroke-current fill-none">
                        {/* Isometric Base Plate */}
                        <path
                          d="M 200 280 L 320 220 L 200 160 L 80 220 Z"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          className="opacity-40"
                        />
                        <path
                          d="M 80 220 L 80 250 L 200 310 L 320 250 L 320 220"
                          strokeWidth="1.5"
                          className="opacity-50"
                        />
                        <path
                          d="M 200 280 L 200 310"
                          strokeWidth="1.5"
                          className="opacity-50"
                        />

                        {/* Elevated Glass Cube Top Wireframe */}
                        <g className="animate-pulse duration-1000">
                          {/* Top Face */}
                          <path d="M 200 80 L 270 120 L 200 160 L 130 120 Z" strokeWidth="2.5" className="fill-white/10" />
                          {/* Left Face */}
                          <path d="M 130 120 L 200 160 L 200 240 L 130 200 Z" strokeWidth="2.5" className="fill-white/15" />
                          {/* Right Face */}
                          <path d="M 270 120 L 200 160 L 200 240 L 270 200 Z" strokeWidth="2.5" className="fill-white/20" />
                        </g>

                        {/* Internal Laser Alignment Guides & Glowing Coordinate Points */}
                        <line x1="200" y1="80" x2="200" y2="280" strokeWidth="1.5" strokeDasharray="3 3" className="stroke-blue-200 opacity-70" />
                        <circle cx="200" cy="80" r="4" className="fill-white" />
                        <circle cx="200" cy="160" r="3.5" className="fill-white" />
                        <circle cx="200" cy="240" r="3.5" className="fill-white" />
                        <circle cx="200" cy="280" r="4.5" className="fill-white" />

                        {/* Dimensional Markers */}
                        <line x1="330" y1="120" x2="330" y2="200" strokeWidth="1" className="opacity-40" />
                        <circle cx="330" cy="120" r="1.5" className="fill-white" />
                        <circle cx="330" cy="140" r="1.5" className="fill-white" />
                        <circle cx="330" cy="160" r="1.5" className="fill-white" />
                        <circle cx="330" cy="180" r="1.5" className="fill-white" />
                        <circle cx="330" cy="200" r="1.5" className="fill-white" />
                      </svg>
                    )}

                    {/* Visual 02: Interlocking Multidisciplinary Circuit & Gear Mesh */}
                    {activePillarIndex === 1 && (
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] text-white stroke-current fill-none">
                        <circle cx="200" cy="200" r="110" strokeWidth="1.5" strokeDasharray="6 6" className="opacity-30 animate-spin origin-center" style={{ animationDuration: "20s" }} />
                        <circle cx="200" cy="200" r="80" strokeWidth="2" className="opacity-60" />
                        <circle cx="200" cy="200" r="50" strokeWidth="2.5" className="fill-white/10" />

                        {/* Integrated Circuit Traces */}
                        <path d="M 80 140 L 140 140 L 170 170 L 200 170" strokeWidth="2" className="stroke-blue-200" />
                        <path d="M 320 260 L 260 260 L 230 230 L 200 230" strokeWidth="2" className="stroke-blue-200" />
                        <path d="M 140 260 L 170 230" strokeWidth="2" className="stroke-blue-200" />
                        <path d="M 260 140 L 230 170" strokeWidth="2" className="stroke-blue-200" />

                        <circle cx="80" cy="140" r="4" className="fill-white" />
                        <circle cx="320" cy="260" r="4" className="fill-white" />
                        <circle cx="200" cy="200" r="8" className="fill-white" />
                      </svg>
                    )}

                    {/* Visual 03: Smart IoT Wireless Mesh & Sensor Matrix */}
                    {activePillarIndex === 2 && (
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] text-white stroke-current fill-none">
                        {/* Central Gateway Node */}
                        <circle cx="200" cy="200" r="18" strokeWidth="2.5" className="fill-white/20" />
                        <circle cx="200" cy="200" r="6" className="fill-white" />

                        {/* Radiating Signal Waves */}
                        <circle cx="200" cy="200" r="60" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-50" />
                        <circle cx="200" cy="200" r="100" strokeWidth="1" strokeDasharray="6 6" className="opacity-30" />
                        <circle cx="200" cy="200" r="140" strokeWidth="1" className="opacity-20" />

                        {/* Mesh Nodes */}
                        {[
                          { x: 120, y: 130 },
                          { x: 280, y: 120 },
                          { x: 300, y: 270 },
                          { x: 110, y: 280 },
                          { x: 200, y: 80 },
                        ].map((pt, i) => (
                          <g key={i}>
                            <line x1="200" y1="200" x2={pt.x} y2={pt.y} strokeWidth="1.5" className="stroke-blue-200 opacity-70" />
                            <circle cx={pt.x} cy={pt.y} r="6" strokeWidth="2" className="fill-white" />
                          </g>
                        ))}
                      </svg>
                    )}

                    {/* Visual 04: Oscilloscope Waveform & Reliability Stress Grid */}
                    {activePillarIndex === 3 && (
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] text-white stroke-current fill-none">
                        {/* Grid Frame */}
                        <rect x="70" y="90" width="260" height="220" rx="16" strokeWidth="2" className="fill-white/5 opacity-80" />
                        <line x1="70" y1="200" x2="330" y2="200" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
                        <line x1="200" y1="90" x2="200" y2="310" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />

                        {/* Smooth Sine Waveform */}
                        <path
                          d="M 80 200 Q 110 120 140 200 T 200 200 T 260 200 T 320 200"
                          strokeWidth="3"
                          className="stroke-white"
                        />
                        <path
                          d="M 80 200 Q 110 150 140 200 T 200 200 T 260 200 T 320 200"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          className="stroke-blue-200 opacity-60"
                        />
                        <circle cx="140" cy="200" r="4" className="fill-white" />
                        <circle cx="200" cy="200" r="4" className="fill-white" />
                        <circle cx="260" cy="200" r="4" className="fill-white" />
                      </svg>
                    )}

                    {/* Visual 05: CAD DFM Precision Toolpath & Fabrication Geometry */}
                    {activePillarIndex === 4 && (
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] text-white stroke-current fill-none">
                        {/* Isometric Machined Part Wireframe */}
                        <polygon points="200,90 310,150 310,250 200,310 90,250 90,150" strokeWidth="2" className="fill-white/10" />
                        <polygon points="200,130 270,170 270,230 200,270 130,230 130,170" strokeWidth="1.5" strokeDasharray="4 4" className="fill-white/15" />
                        <circle cx="200" cy="200" r="28" strokeWidth="2" className="fill-white/20" />
                        <circle cx="200" cy="200" r="6" className="fill-white" />

                        {/* Toolpath Coordinates */}
                        <line x1="90" y1="150" x2="200" y2="90" strokeWidth="2.5" className="stroke-blue-200" />
                        <line x1="200" y1="90" x2="310" y2="150" strokeWidth="2.5" className="stroke-blue-200" />
                        <circle cx="200" cy="90" r="4.5" className="fill-white" />
                        <circle cx="310" cy="150" r="4.5" className="fill-white" />
                        <circle cx="90" cy="150" r="4.5" className="fill-white" />
                      </svg>
                    )}

                    {/* Visual 06: Infinite Continuous Lifecycle Orbit Loop */}
                    {activePillarIndex === 5 && (
                      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] text-white stroke-current fill-none">
                        {/* Infinity Loop Geometry */}
                        <path
                          d="M 140 200 C 100 140 60 200 140 200 C 220 200 260 140 300 200 C 340 260 300 200 260 200 C 180 200 180 260 140 200 Z"
                          strokeWidth="3"
                          className="stroke-white"
                        />
                        <ellipse cx="140" cy="200" rx="55" ry="35" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />
                        <ellipse cx="260" cy="200" rx="55" ry="35" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />

                        <circle cx="140" cy="200" r="5" className="fill-white" />
                        <circle cx="260" cy="200" r="5" className="fill-white" />
                        <circle cx="200" cy="200" r="7" className="fill-white" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========================================================================= */}
      {/* SECTION 4: OUR PROCESS (Cinematic 3D Folded Ribbon Pipeline) */}
      {/* ========================================================================= */}
      <section
        ref={processSectionRef}
        id="process"
        className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading with GSAP Rack Focus & Unmask */}
          <div className="w-full text-center max-w-4xl mx-auto mb-14 sm:mb-20 overflow-hidden">
            <h2 className="gsap-process-heading font-[family-name:var(--font-bricolage)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-950 uppercase">
              <span>OUR </span>
              <span className="text-blue-600">PROCESS</span>
            </h2>
            <p className="gsap-process-subheading mt-3 sm:mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              A structured, end-to-end engineering lifecycle from initial discovery to real-world deployment and long-term lifecycle support.
            </p>
          </div>

          {/* 3D Folded Ribbon Rows with 5px Gap Rhythm & Video Animator Cascade */}
          <div className="max-w-[880px] mx-auto flex flex-col gap-[5px] relative">
            {[
              {
                left: { step: "01", name: "Discover", desc: "Understand goals, requirements & user needs", img: "/process-discover.jpg", theme: "blue" },
                right: { step: "02", name: "Design", desc: "Conceptualize, engineer & validate the solution", img: "/freshpod.jpg", theme: "blue" },
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
                left: { step: "03", name: "Develop", desc: "Build mechanical, electronic, software & integrations", img: "/freshpod-kiosks.png", theme: "ice" },
                right: { step: "04", name: "Prototype", desc: "Prototype, test & iterate for performance and reliability", img: "/freshpod.jpg", theme: "ice" },
                gradId: "foldGrad2",
                stops: [
                  { offset: "0%", color: "#233238" },
                  { offset: "35%", color: "#3b4f59" },
                  { offset: "70%", color: "#688294" },
                  { offset: "100%", color: "#c8d7f6" },
                ],
              },
              {
                left: { step: "05", name: "Manufacture", desc: "Support production, quality & supply chain", img: "/freshpod-kiosks.png", theme: "blue" },
                right: { step: "06", name: "Deploy & Support", desc: "Deploy in the field and support for long-term success", img: "/freshpod.jpg", theme: "blue" },
                gradId: "foldGrad3",
                stops: [
                  { offset: "0%", color: "#141c2b" },
                  { offset: "30%", color: "#1e2d48" },
                  { offset: "70%", color: "#415a8c" },
                  { offset: "100%", color: "#6c85c4" },
                ],
              },
            ].map((row, rIdx) => (
              <div
                key={`process-row-${rIdx}`}
                className="gsap-process-row relative filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] group transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Desktop / Tablet View: Continuous 3D Isometric Folded Row Pair */}
                <div className="hidden md:flex relative w-full items-start">
                  {/* Left Step Card */}
                  <div
                    className={`gsap-process-left w-[calc(50%-22px)] h-[190px] flex rounded-l-2xl rounded-r-none overflow-hidden shrink-0 transition-colors duration-200 ${
                      row.left.theme === "ice" ? "bg-[#c8d7f6] text-blue-900" : "bg-[#6c85c4] text-white"
                    }`}
                  >
                    {/* Text Panel */}
                    <div className="w-[45%] p-5 lg:p-6 flex flex-col justify-between shrink-0">
                      <span
                        className={`gsap-process-num font-[family-name:var(--font-bricolage)] text-3xl lg:text-4xl font-bold tracking-tight leading-none ${
                          row.left.theme === "ice" ? "text-blue-600" : "text-white"
                        }`}
                      >
                        {row.left.step}
                      </span>
                      <div className="gsap-process-text">
                        <h3
                          className={`font-[family-name:var(--font-bricolage)] text-lg lg:text-xl font-bold leading-tight mb-1 ${
                            row.left.theme === "ice" ? "text-blue-600" : "text-white"
                          }`}
                        >
                          {row.left.name}
                        </h3>
                        <p
                          className={`text-[11px] lg:text-[12px] leading-snug ${
                            row.left.theme === "ice" ? "text-slate-700" : "text-white/85"
                          }`}
                        >
                          {row.left.desc}
                        </p>
                      </div>
                    </div>
                    {/* Photo Container */}
                    <div className="w-[55%] h-full relative overflow-hidden bg-slate-900 rounded-none">
                      <Image
                        src={row.left.img}
                        alt={row.left.name}
                        fill
                        unoptimized
                        sizes="250px"
                        className="gsap-process-photo object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>
                  </div>

                  {/* Central 3D Isometric Fold Connector */}
                  <div className="gsap-process-fold w-[44px] h-[216px] relative shrink-0 z-0 overflow-visible">
                    <svg viewBox="0 0 44 216" className="w-full h-full block" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={row.gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                          {row.stops.map((stop, sIdx) => (
                            <stop key={sIdx} offset={stop.offset} stopColor={stop.color} />
                          ))}
                        </linearGradient>
                      </defs>

                      {/* 3D Fold Surface */}
                      <polygon points="0,0 44,26 44,216 0,190" fill={`url(#${row.gradId})`} />

                      {/* Crease Highlights */}
                      <line x1="0" y1="0" x2="44" y2="26" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                      <line x1="0" y1="190" x2="44" y2="216" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Right Step Card - Shifted down by 26px */}
                  <div
                    className={`gsap-process-right w-[calc(50%-22px)] h-[190px] flex rounded-r-2xl rounded-l-none overflow-hidden shrink-0 mt-[26px] transition-colors duration-200 ${
                      row.right.theme === "ice" ? "bg-[#c8d7f6] text-blue-900" : "bg-[#6c85c4] text-white"
                    }`}
                  >
                    {/* Photo Container */}
                    <div className="w-[55%] h-full relative overflow-hidden bg-slate-900 rounded-none">
                      <Image
                        src={row.right.img}
                        alt={row.right.name}
                        fill
                        unoptimized
                        sizes="250px"
                        className="gsap-process-photo object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>
                    {/* Text Panel */}
                    <div className="w-[45%] p-5 lg:p-6 flex flex-col justify-between items-end text-right shrink-0">
                      <span
                        className={`gsap-process-num font-[family-name:var(--font-bricolage)] text-3xl lg:text-4xl font-bold tracking-tight leading-none ${
                          row.right.theme === "ice" ? "text-blue-600" : "text-white"
                        }`}
                      >
                        {row.right.step}
                      </span>
                      <div className="gsap-process-text">
                        <h3
                          className={`font-[family-name:var(--font-bricolage)] text-lg lg:text-xl font-bold leading-tight mb-1 ${
                            row.right.theme === "ice" ? "text-blue-600" : "text-white"
                          }`}
                        >
                          {row.right.name}
                        </h3>
                        <p
                          className={`text-[11px] lg:text-[12px] leading-snug ${
                            row.right.theme === "ice" ? "text-slate-700" : "text-white/85"
                          }`}
                        >
                          {row.right.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile View (< md): Clean stacked paired cards */}
                <div className="flex md:hidden flex-col gap-3 rounded-2xl overflow-hidden shadow-lg">
                  {/* Left Step */}
                  <div
                    className={`flex h-40 overflow-hidden ${
                      row.left.theme === "ice" ? "bg-[#c8d7f6] text-blue-900" : "bg-[#6c85c4] text-white"
                    }`}
                  >
                    <div className="w-1/2 p-4 flex flex-col justify-between">
                      <span
                        className={`font-[family-name:var(--font-bricolage)] text-2xl font-bold ${
                          row.left.theme === "ice" ? "text-blue-600" : "text-white"
                        }`}
                      >
                        {row.left.step}
                      </span>
                      <div>
                        <h3
                          className={`font-bold text-base leading-tight ${
                            row.left.theme === "ice" ? "text-blue-600" : "text-white"
                          }`}
                        >
                          {row.left.name}
                        </h3>
                        <p
                          className={`text-[11px] leading-tight mt-0.5 ${
                            row.left.theme === "ice" ? "text-slate-700" : "text-white/85"
                          }`}
                        >
                          {row.left.desc}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 relative bg-slate-900">
                      <Image src={row.left.img} alt={row.left.name} fill unoptimized sizes="200px" className="object-cover" />
                    </div>
                  </div>

                  {/* Right Step */}
                  <div
                    className={`flex h-40 overflow-hidden ${
                      row.right.theme === "ice" ? "bg-[#c8d7f6] text-blue-900" : "bg-[#6c85c4] text-white"
                    }`}
                  >
                    <div className="w-1/2 relative bg-slate-900">
                      <Image src={row.right.img} alt={row.right.name} fill unoptimized sizes="200px" className="object-cover" />
                    </div>
                    <div className="w-1/2 p-4 flex flex-col justify-between items-end text-right">
                      <span
                        className={`font-[family-name:var(--font-bricolage)] text-2xl font-bold ${
                          row.right.theme === "ice" ? "text-blue-600" : "text-white"
                        }`}
                      >
                        {row.right.step}
                      </span>
                      <div>
                        <h3
                          className={`font-bold text-base leading-tight ${
                            row.right.theme === "ice" ? "text-blue-600" : "text-white"
                          }`}
                        >
                          {row.right.name}
                        </h3>
                        <p
                          className={`text-[11px] leading-tight mt-0.5 ${
                            row.right.theme === "ice" ? "text-slate-700" : "text-white/85"
                          }`}
                        >
                          {row.right.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Solvempire Inc. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS &amp; GSAP.</p>
        </div>
      </footer>
    </div>
  );
}
