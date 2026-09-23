"use client";

import React from "react";
import Link from "next/link";

export function IndiseaWhoWeAre() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans">
      <div className="indisea-wrap space-y-16 sm:space-y-24">
        {/* Asymmetric 2-Column Split */}
        <div className="indisea-grid items-start">
          <div className="col-span-12 lg:col-span-3">
            <span className="indisea-eyebrow">03 / STUDIO POSITIONING &amp; DIRECT OWNERSHIP</span>
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-8">
            <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-[var(--text-heading)] leading-[1.2] tracking-tight">
              SolveMpire is a specialist product engineering studio that designs, prototypes, and manufactures custom physical machines, electronics, and connected software.
            </p>

            <p className="font-display font-medium text-xl sm:text-3xl lg:text-4xl text-[var(--text-heading)] leading-[1.25] tracking-tight">
              Our multidisciplinary engineers take complex real-world problems from{" "}
              <span className="indisea-verb-yellow font-bold">SolidWorks CAD</span> and{" "}
              <span className="indisea-verb-yellow font-bold">Custom Multi-Layer PCB</span> to{" "}
              <span className="indisea-verb-yellow font-bold">Deterministic RTOS</span> and{" "}
              <span className="indisea-verb-yellow font-bold">Turnkey Production</span>.
            </p>
          </div>
        </div>

        {/* 4 Figure Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="indisea-card flex flex-col justify-between space-y-4">
            <div className="indisea-figure text-[#1F56C6]">005+</div>
            <div>
              <h4 className="font-display font-bold text-sm text-[var(--text-heading)]">
                End-to-End Systems
              </h4>
              <span className="indisea-eyebrow block mt-1">Delivered CAD to Field</span>
            </div>
          </div>

          <div className="indisea-card flex flex-col justify-between space-y-4">
            <div className="indisea-figure text-[var(--text-heading)]">010+</div>
            <div>
              <h4 className="font-display font-bold text-sm text-[var(--text-heading)]">
                Specialized Engineers
              </h4>
              <span className="indisea-eyebrow block mt-1">Mechanical, PCB, RTOS &amp; Cloud</span>
            </div>
          </div>

          <div className="indisea-card flex flex-col justify-between space-y-4">
            <div className="indisea-figure text-[var(--text-heading)]">004</div>
            <div>
              <h4 className="font-display font-bold text-sm text-[var(--text-heading)]">
                Unified Disciplines
              </h4>
              <span className="indisea-eyebrow block mt-1">Single Point of Ownership</span>
            </div>
          </div>

          <div className="indisea-card flex flex-col justify-between space-y-4">
            <div className="indisea-figure text-emerald-600">100%</div>
            <div>
              <h4 className="font-display font-bold text-sm text-[var(--text-heading)]">
                Direct Engineering
              </h4>
              <span className="indisea-eyebrow block mt-1">Zero Middle-Management</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
