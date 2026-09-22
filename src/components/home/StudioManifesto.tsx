"use client";

export function StudioManifesto() {
  return (
    <section id="thesis" className="w-full bg-[#1d4ed8] border-b-2 border-[#0f0f10] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Thesis Eyebrow */}
        <div className="font-mono font-bold text-xs uppercase tracking-widest text-[#dbeafe] mb-6">
          // THESIS //
        </div>

        {/* Manifesto Quote */}
        <blockquote className="font-display font-black text-3xl sm:text-5xl lg:text-[52px] text-[#f7f6f2] uppercase tracking-tight leading-[1.08] mb-8 max-w-4xl">
          “MEDIOCRE ENGINEERING IS A LIABILITY. HIGH-PERFORMANCE PRODUCT INFRASTRUCTURE IS AN ACCUMULATIVE ASSET.”
        </blockquote>

        {/* Supporting Narrative */}
        <p className="font-mono text-xs sm:text-sm text-[#f7f6f2]/80 leading-relaxed max-w-2xl mb-10">
          Solvempire transforms ambitious product briefs into definitive commercial flagships. We eliminate multi-vendor friction in favor of razor-sharp CAD modeling, bespoke PCBA electronics, and high-concurrency cloud telemetry.
        </p>

        {/* Signature Divider */}
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-12 bg-[#3b82f6]" />
          <span className="font-mono font-bold text-xs uppercase text-[#f7f6f2] tracking-wider">
            ENGINEERING ARCHITECTURE STUDIO
          </span>
          <div className="h-[2px] w-12 bg-[#3b82f6]" />
        </div>
      </div>
    </section>
  );
}
