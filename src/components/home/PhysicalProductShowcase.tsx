"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Cpu,
  Box,
  HardDrive,
  CreditCard,
  CloudCheck,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeconstructLayer {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: typeof Box;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
}

const LAYERS: DeconstructLayer[] = [
  {
    id: "problem",
    stepNumber: "STEP 01",
    title: "The Problem & Architecture",
    subtitle: "High-Throughput Public Helmet Sanitization",
    icon: ShieldAlert,
    description:
      "Rapidly disinfect shared motorcycle helmets in under 60 seconds with certified UV-C and hot-air sterilization while maintaining zero user ozone exposure.",
    specs: [
      { label: "Cycle Time", value: "< 60 seconds" },
      { label: "Sterilization Efficacy", value: "99.9% Bacteria & Virus" },
      { label: "Safety Rating", value: "Zero UV-C Leakage Interlock" },
    ],
    highlight: "Multi-sensor fail-safe mechanical interlock system.",
  },
  {
    id: "mechanical",
    stepNumber: "STEP 02",
    title: "Mechanical Engineering",
    subtitle: "80+ Custom Sheet Metal & CNC Components",
    icon: Box,
    description:
      "Engineered an ergonomic 1.2mm powder-coated CRCA steel chassis with aerodynamic internal air channels, vibration dampers, and sealed chamber seals.",
    specs: [
      { label: "Chassis Material", value: "CRCA Sheet Metal + Powder Coat" },
      { label: "Component Count", value: "84 Custom CAD Parts" },
      { label: "CAD Environment", value: "SolidWorks GD&T Toleranced" },
    ],
    highlight: "Designed for high-volume automated CNC punch & press-brake fabrication.",
  },
  {
    id: "electronics",
    stepNumber: "STEP 03",
    title: "Custom Electronics & PCB",
    subtitle: "High-Reliability Power & Relay Control Board",
    icon: Cpu,
    description:
      "Custom 2-layer PCB integrating 230V AC solid-state relays for dual industrial blowers, UV-C quartz drivers, optoisolated safety cutoffs, and EMI filtering.",
    specs: [
      { label: "Power Rail", value: "Universal 110-240V AC / 12V DC / 3.3V" },
      { label: "Isolation", value: "3.75kV Optocoupled I/O" },
      { label: "Thermal Rating", value: "-10°C to +65°C Industrial" },
    ],
    highlight: "Surge-protected power supply rated for volatile public grid conditions.",
  },
  {
    id: "firmware",
    stepNumber: "STEP 04",
    title: "Embedded Firmware & RTOS",
    subtitle: "ESP32-S3 Deterministic State Machine",
    icon: HardDrive,
    description:
      "Low-level FreeRTOS multi-threaded firmware managing closed-loop temperature control, interlock safety polling at 100Hz, and watchdog health monitors.",
    specs: [
      { label: "Controller", value: "ESP32-S3 Dual Core 240MHz" },
      { label: "OS Architecture", value: "FreeRTOS Preemptive Tasks" },
      { label: "OTA Updates", value: "Dual-Bank Encrypted Rollback" },
    ],
    highlight: "Self-healing watchdog that auto-recovers from field brownouts.",
  },
  {
    id: "hmi-payments",
    stepNumber: "STEP 05",
    title: "HMI, Payments & Connectivity",
    subtitle: "Touchscreen + Dynamic UPI QR + Cloud Telemetry",
    icon: CreditCard,
    description:
      "Interactive UART touchscreen display generating dynamic Razorpay UPI QR codes. Real-time MQTT telemetry streaming operational health to AWS IoT Core.",
    specs: [
      { label: "Display Protocol", value: "DWIN Industrial UART Panel" },
      { label: "Payment Gateway", value: "Instant Razorpay Webhooks" },
      { label: "Cellular Cloud", value: "LTE-M / 4G + Fallback WiFi" },
    ],
    highlight: "Zero-app touchless workflow: Scan QR -> Machine Cycles -> Unlock.",
  },
];

export function PhysicalProductShowcase() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const activeLayer = LAYERS[activeLayerIndex];
  const LayerIcon = activeLayer.icon;

  return (
    <section className="py-24 sm:py-32 bg-[#fafcff] bg-editorial-grid border-b border-slate-200/80 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
              <Layers className="w-3.5 h-3.5" />
              <span>SIGNATURE PRODUCT DECONSTRUCTION</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-[1.12]">
              How We Build Physical Machines. <br />
              <span className="text-blue-600">The FreshPod Engineering Breakdown.</span>
            </h2>
          </div>

          <Link
            href="/work/freshpod-machine"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            <span>Read Complete Case Study</span>
            <ArrowRight className="w-4 h-4 arrow-slide" />
          </Link>
        </div>

        {/* 2-Column Interactive Scrollytelling / Deconstruction Rig */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Layer Navigation Stack */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 block px-1">
              Select Engineering Layer:
            </span>

            <div className="space-y-2">
              {LAYERS.map((layer, idx) => {
                const isActive = activeLayerIndex === idx;
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayerIndex(idx)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer",
                      isActive
                        ? "bg-white border-blue-600 shadow-editorial-md translate-x-1.5"
                        : "bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:text-slate-900"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <span
                          className={cn(
                            "font-mono text-[10px] font-bold block uppercase tracking-wider",
                            isActive ? "text-blue-600" : "text-slate-400"
                          )}
                        >
                          {layer.stepNumber}
                        </span>
                        <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">
                          {layer.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isActive ? "text-blue-600 translate-x-0.5" : "text-slate-300 group-hover:text-slate-500"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Layer Spec Inspector Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-lg p-6 sm:p-10 space-y-8 relative overflow-hidden transition-all duration-300">
              {/* Top Inspector Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <LayerIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wide">
                      {activeLayer.stepNumber} // DOSSIER SPEC
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-950">
                      {activeLayer.subtitle}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  PRODUCTION VERIFIED
                </span>
              </div>

              {/* Layer Description */}
              <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
                {activeLayer.description}
              </p>

              {/* Technical Benchmarks Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeLayer.specs.map((s) => (
                  <div key={s.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold block">
                      {s.label}
                    </span>
                    <span className="font-display font-bold text-sm text-slate-900 block">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Engineering Highlight Callout */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-3 text-xs sm:text-sm text-blue-950 font-medium">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Engineering Takeaway:</strong> {activeLayer.highlight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
