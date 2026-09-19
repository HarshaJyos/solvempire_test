"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "@/content/team";

gsap.registerPlugin(ScrollTrigger);

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".gsap-team-header", {
        scrollTrigger: {
          trigger: ".gsap-team-header",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // Cards staggered reveal
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-team-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          delay: i * 0.12,
          ease: "power2.out",
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      aria-labelledby="team-heading"
      className="w-full bg-canvas py-24 sm:py-32 border-t border-hairline/70 overflow-hidden relative"
    >
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-dot-matrix opacity-35 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)] -z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="gsap-team-header text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">
            OUR EXPERTS
          </span>
          <h2
            id="team-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-bold tracking-tight text-heading uppercase leading-tight"
          >
            <span>MEET OUR </span>
            <span className="text-brand">TEAM</span>
          </h2>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto leading-[1.618] mt-3 sm:mt-4">
            A multidisciplinary team turning complex ideas into real-world solutions.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="gsap-team-card group relative bg-surface rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Left Subtle Gradient Ribbon Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-light via-periwinkle to-brand z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Portrait Photo Container */}
              <div className="relative w-full aspect-[4/4.7] sm:aspect-[4/4.5] overflow-hidden bg-ink">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Information Bar */}
              <div className="bg-periwinkle text-surface px-5 py-4 sm:px-6 sm:py-4.5 flex items-center gap-3.5 sm:gap-4 relative z-10">
                <span className="font-display text-2xl sm:text-3xl font-bold text-surface/95 leading-none shrink-0">
                  {member.id}
                </span>
                <div className="w-[1.5px] h-8 sm:h-9 bg-surface/35 shrink-0" />
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <h3 className="font-display font-bold text-sm sm:text-base text-surface tracking-wide uppercase leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-surface/90 font-medium leading-tight mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full shadow-lg shadow-brand/20 hover:shadow-brand/35 transition-all duration-300 hover:scale-105 group"
          >
            <span>Learn More About Us</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
