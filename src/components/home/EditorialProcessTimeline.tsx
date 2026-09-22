"use client";

import React, { useState } from "react";
import { Compass, Cpu, Wrench, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProcessStep {
  number: string;
  title: string;
  icon: typeof Compass;
  tagline: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Architecture",
    icon: Compass,
    tagline: "Feasibility &bull; Component Selection &bull; BOM Modeling",
    description:
      "We dissect the fundamental physics and user requirements, selecting MCUs, sensors, actuators, and enclosure materials to guarantee commercial viability.",
    activities: ["Physics & Load Calculation", "Component Availability Sourcing", "Initial Preliminary CAD Layout"],
    deliverables: ["Technical Architecture Dossier", "Preliminary BOM & Cost Estimation", "Risk & Tolerance Matrix"],
  },
  {
    number: "02",
    title: "Detailed CAD & Circuit Design",
    icon: Cpu,
    tagline: "SolidWorks &bull; Multi-Layer PCB &bull; Thermal Simulation",
    description:
      "Simultaneous mechanical and electronics engineering. We route high-speed traces and model internal clearances with sub-millimeter precision.",
    activities: ["3D GD&T Mechanical Design", "High-Speed PCB Schematic & Layout", "Thermal CFD & Stress FEA"],
    deliverables: ["Full 3D STEP Assembly", "Production Gerber Packages", "Firmware Hardware Abstraction Layer"],
  },
  {
    number: "03",
    title: "Rapid Prototyping & Bring-Up",
    icon: Wrench,
    tagline: "CNC Milling &bull; SMT Assembly &bull; Bare-Metal Firmware",
    description:
      "We build physical units in-house. Mechanical parts are CNC milled, boards are assembled and tested under real-world stress loads.",
    activities: ["Precision CNC & 3D Prototyping", "SMT Assembly & Board Bring-Up", "Firmware RTOS Integration"],
    deliverables: ["Fully Functional Working Prototype", "Diagnostic & Test Reports", "DFM Optimization Feedback"],
  },
  {
    number: "04",
    title: "Tooling & Volume Production",
    icon: Rocket,
    tagline: "Injection Tooling &bull; QA Test Jigs &bull; Cloud Fleet",
    description:
      "We manage injection mold tooling, sheet metal stamping, automated testing rigs, and cloud deployment pipelines for seamless scaling.",
    activities: ["Tooling & Mold Verification", "Automated QA End-of-Line Jigs", "Cloud Telemetry Fleet Rollout"],
    deliverables: ["Production-Ready Tooling", "End-of-Line Testing Firmware", "Fleet Management Dashboard"],
  },
];

export function EditorialProcessTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#fafcff] bg-editorial-grid border-b border-slate-200/80 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
            <Compass className="w-3.5 h-3.5" />
            <span>RIGOROUS METHODOLOGY</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-[1.12]">
            Discovery to Deployment. <br />
            <span className="text-blue-600">A Repeatable Engineering Pipeline.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Eliminate costly rework and multi-vendor finger-pointing. Our synchronized physical and digital workflow moves predictably from concept validation to mass production.
          </p>
        </div>

        {/* Progressive Timeline Node Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-3 relative overflow-hidden",
                  isActive
                    ? "bg-white border-blue-600 shadow-editorial-md translate-y-[-2px]"
                    : "bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300"
                )}
              >
                {/* Active Indicator Top Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                      isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={cn(
                      "font-mono text-xs font-bold",
                      isActive ? "text-blue-600" : "text-slate-400"
                    )}
                  >
                    PHASE {step.number}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-base text-slate-900">
                    {step.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-lg p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wide">
                  PHASE {activeStep.number} SPECIFICATION
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
                  {activeStep.title}
                </h3>
              </div>
            </div>
            <span className="font-mono text-xs text-slate-400 uppercase font-semibold">
              STAGE 0{activeStepIndex + 1} OF 04
            </span>
          </div>

          <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            {activeStep.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Core Engineering Activities */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 block">
                Key Engineering Focus
              </span>
              <ul className="space-y-2.5 text-sm text-slate-600 font-sans">
                {activeStep.activities.map((act) => (
                  <li key={act} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Deliverables */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/50 space-y-3">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-blue-800 block">
                Phase Deliverables &amp; Artifacts
              </span>
              <ul className="space-y-2.5 text-sm text-blue-950 font-sans font-medium">
                {activeStep.deliverables.map((del) => (
                  <li key={del} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
