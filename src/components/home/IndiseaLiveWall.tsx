"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Box, HardDrive, Wifi, Shield, Layers, Zap, Wrench } from "lucide-react";

interface MarqueeCard {
  name: string;
  category: string;
  tag: string;
  link?: string;
  icon: typeof Box;
}

const ROW_A: MarqueeCard[] = [
  { name: "FreshPod Kiosk", category: "Automated Sanitation", tag: "Production Fleet", link: "/work/freshpod-machine", icon: Box },
  { name: "Veyo Mobility", category: "Connected EV Telemetry", tag: "Deployed", link: "/work", icon: Zap },
  { name: "USS2 Switcher", category: "Microcontroller Relay", tag: "Hardware", link: "/work/uss2-switcher", icon: Cpu },
  { name: "Loah Hardware", category: "Consumer Product Kinematics", tag: "DFM Verified", link: "/work", icon: Layers },
  { name: "Aditya University Lab", category: "Industrial R&D Testbed", tag: "Lab System", link: "/work", icon: Wrench },
  { name: "Egg Vending Machine", category: "Custom Mechatronics", tag: "Turnkey Machine", link: "/work", icon: Box },
];

const ROW_B: MarqueeCard[] = [
  { name: "SolidWorks GD&T", category: "Mechanical Engineering", tag: "CAD Standard", icon: Box },
  { name: "Altium Designer", category: "Custom Multi-Layer PCB", tag: "Hardware", icon: Cpu },
  { name: "FreeRTOS Kernel", category: "Embedded Deterministic Firmware", tag: "Firmware", icon: HardDrive },
  { name: "ESP32-S3 & STM32", category: "Industrial Silicon Architecture", tag: "Microcontrollers", icon: Cpu },
  { name: "AWS IoT Core", category: "MQTT Fleet Telemetry", tag: "Cloud", icon: Wifi },
  { name: "Razorpay / UPI", category: "Dynamic QR & Payment Gateway", tag: "HMI & Payments", icon: Shield },
  { name: "IPC-A-610 Class 2", category: "Quality & Reliability Standard", tag: "Fabrication", icon: Shield },
];

export function IndiseaLiveWall() {
  return (
    <section id="live-wall" className="py-20 sm:py-28 overflow-hidden bg-[var(--surface-canvas)] font-sans border-y border-[var(--border-hairline)]">
      <div className="indisea-wrap pb-8">
        <span className="indisea-eyebrow">02 / live deployments &amp; engineering stack</span>
      </div>

      <div className="space-y-4">
        {/* Row A: Moving Left */}
        <div className="flex overflow-hidden select-none">
          <div className="flex shrink-0 gap-4 animate-marquee-left">
            {[...ROW_A, ...ROW_A, ...ROW_A].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="group relative flex-none w-[240px] sm:w-[280px] h-[120px] sm:h-[135px] p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400/80 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-canvas)] flex items-center justify-center text-[#2563EB]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-mono text-[11px] text-[var(--text-muted)] truncate">
                      {item.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row B: Moving Right */}
        <div className="flex overflow-hidden select-none">
          <div className="flex shrink-0 gap-4 animate-marquee-right">
            {[...ROW_B, ...ROW_B, ...ROW_B].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="group relative flex-none w-[240px] sm:w-[280px] h-[120px] sm:h-[135px] p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400/80 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-canvas)] flex items-center justify-center text-slate-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-mono text-[11px] text-[var(--text-muted)] truncate">
                      {item.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
