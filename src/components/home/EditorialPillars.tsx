"use client";

import Link from "next/link";
import { ArrowRight, Box, Cpu, HardDrive, Wifi, Layers, Compass, CheckCircle2 } from "lucide-react";

interface Pillar {
  id: string;
  icon: typeof Box;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  deliverables: string[];
  slug: string;
}

const PILLARS: Pillar[] = [
  {
    id: "mechanical",
    icon: Box,
    title: "Mechanical Engineering & CAD",
    tagline: "SolidWorks &bull; DFM/DFA &bull; CNC &bull; Injection Molding",
    description:
      "Bespoke industrial enclosures, complex kinematics, and structural mechanisms designed with strict Design for Manufacturing (DFM) tolerances.",
    specs: ["Tolerance: ±0.05mm", "CAD: SolidWorks / Fusion360", "FEA / Thermal CFD Simulation"],
    deliverables: ["STEP / IGES 3D Models", "2D GD&T Engineering Drawings", "Production BOM & Sourcing Sheets"],
    slug: "/services#mechanical",
  },
  {
    id: "electronics",
    icon: Cpu,
    title: "Custom PCB & Hardware Engineering",
    tagline: "Multi-Layer PCB &bull; High-Speed &bull; Power Electronics",
    description:
      "Schematic capture, high-speed differential routing, impedance control, and component qualification optimized for volume SMT fabrication.",
    specs: ["Up to 8-Layer Multilayer", "IPC-2221 / IPC-A-610 Compliant", "ESD / EMI / EMC Hardened"],
    deliverables: ["Gerber & ODB++ Packages", "Interactive Drill / Pick & Place", "Tested Hardware Prototypes"],
    slug: "/services#electronics",
  },
  {
    id: "firmware",
    icon: HardDrive,
    title: "Embedded Firmware & RTOS",
    tagline: "Bare-Metal C/C++ &bull; FreeRTOS &bull; Nordic &bull; ESP32",
    description:
      "Deterministic low-level firmware, driver development for sensors/actuators, cryptographic security, and robust OTA update pipelines.",
    specs: ["MCU: STM32, ESP32, nRF52", "Protocols: CAN, UART, SPI, I2C", "Deterministic Task Scheduling"],
    deliverables: ["Documented C/C++ Codebase", "Bootloaders & Encrypted OTA", "Hardware Abstraction Layers (HAL)"],
    slug: "/services#firmware",
  },
  {
    id: "cloud",
    icon: Wifi,
    title: "Connected IoT & Platform Cloud",
    tagline: "MQTT &bull; AWS IoT &bull; Telemetry Dashboards &bull; HMI",
    description:
      "End-to-end device management, high-throughput time-series telemetry pipelines, touchscreen HMIs, and secure cloud control dashboards.",
    specs: ["Connectivity: BLE, WiFi, LTE-M, LoRa", "Latency: <120ms Roundtrip", "Fleet Management & Analytics"],
    deliverables: ["Custom Web Dashboards", "REST & GraphQL Telemetry APIs", "Payment & Fleet Integrations"],
    slug: "/services#cloud",
  },
];

export function EditorialPillars() {
  return (
    <section id="capabilities" className="py-24 sm:py-32 bg-[#fafcff] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>FULL-STACK ENGINEERING DISCIPLINES</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-[1.12]">
            Complete In-House Capabilities. <br />
            <span className="text-blue-600">From Raw CAD to Production Fleet.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            We don’t outsource the hard parts. Our multidisciplinary engineering team develops physical enclosures, multi-layer circuits, firmware, and connected cloud software under one unified roof.
          </p>
        </div>

        {/* Soft Bento Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-editorial-sm hover:shadow-editorial-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top Bar: Icon with Stroke Reveal + Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 transition-transform duration-200 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="w-6 h-6 transition-colors duration-200" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      SPEC://0{PILLARS.indexOf(pillar) + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="font-mono text-xs text-blue-700 font-semibold" dangerouslySetInnerHTML={{ __html: pillar.tagline }} />
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Technical Specifications Pills */}
                  <div className="pt-2 space-y-2">
                    <span className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
                      Key Technical Benchmarks:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pillar.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 font-mono text-xs text-slate-700 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-display">
                    Full engineering deliverables included
                  </span>
                  <Link
                    href={pillar.slug}
                    className="inline-flex items-center gap-1.5 font-display font-bold text-xs text-blue-600 group-hover:text-blue-700 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 arrow-slide" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
