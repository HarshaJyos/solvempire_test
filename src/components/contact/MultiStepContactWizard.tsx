"use client";

import { useEffect, useState } from "react";
import {
  Cog,
  CircuitBoard,
  Terminal,
  Globe,
  Rocket,
  Lightbulb,
  DraftingCompass,
  FlaskConical,
  Factory,
  Wrench,
  Zap,
  Clock,
  CalendarDays,
  Compass,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import {
  projectTypes,
  projectStages,
  projectTimelines,
} from "@/lib/validations/contact";

interface MultiStepContactWizardProps {
  theme?: "light" | "dark";
  onSuccess?: () => void;
}

const typeOptions = [
  {
    value: projectTypes[0],
    icon: Cog,
    title: "Mechanical Product Engineering",
    desc: "Industrial CAD, sheet metal, injection DFM, sealing & thermal design",
  },
  {
    value: projectTypes[1],
    icon: CircuitBoard,
    title: "Electronics & Custom PCB",
    desc: "KiCad schematics, multilayer board layout, power & actuator circuitry",
  },
  {
    value: projectTypes[2],
    icon: Terminal,
    title: "Embedded Firmware & Control",
    desc: "ESP32 / STM32 firmware, real-time control, CAN / UART communication",
  },
  {
    value: projectTypes[3],
    icon: Globe,
    title: "Cloud, IoT & Digital Platforms",
    desc: "Fleet telemetry dashboards, Next.js / Node.js backends, OTA pipelines",
  },
  {
    value: projectTypes[4],
    icon: Rocket,
    title: "Full End-to-End Product",
    desc: "Complete concept-to-production lifecycle across all disciplines",
  },
];

const stageOptions = [
  {
    value: projectStages[0],
    icon: Lightbulb,
    title: "Early Idea / Problem Statement",
    desc: "Need technical feasibility, architecture scoping & concept validation",
  },
  {
    value: projectStages[1],
    icon: DraftingCompass,
    title: "Technical Spec Exists",
    desc: "Requirements defined, ready for CAD design, PCB schematics & simulation",
  },
  {
    value: projectStages[2],
    icon: FlaskConical,
    title: "Functional Prototype Exists",
    desc: "Working prototype built, need DFM, tooling, or hardware revision",
  },
  {
    value: projectStages[3],
    icon: Factory,
    title: "Commercial Production & Scaling",
    desc: "Ready for tooling support, assembly documentation & volume manufacturing",
  },
  {
    value: projectStages[4],
    icon: Wrench,
    title: "Existing Product Engineering Support",
    desc: "Field troubleshooting, firmware enhancements & long-term maintenance",
  },
];

const timelineOptions = [
  {
    value: projectTimelines[0],
    icon: Zap,
    title: "Urgent (< 1 Month)",
    desc: "Critical prototype sprint or immediate troubleshooting deadline",
  },
  {
    value: projectTimelines[1],
    icon: Clock,
    title: "1–3 Months",
    desc: "Standard hardware prototype, PCB spin, or firmware milestone",
  },
  {
    value: projectTimelines[2],
    icon: CalendarDays,
    title: "3–6 Months",
    desc: "Comprehensive multi-discipline design cycle through field validation",
  },
  {
    value: projectTimelines[3],
    icon: Compass,
    title: "Flexible / Long-Term",
    desc: "Strategic phased engagement or multi-stage engineering roadmap",
  },
];

export function MultiStepContactWizard({
  theme = "light",
  onSuccess,
}: MultiStepContactWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: projectTypes[0],
    stage: projectStages[0],
    timeline: projectTimelines[1],
    description: "",
    name: "",
    email: "",
    company: "",
    fax_number: "", // Honeypot
  });

  const [formRenderTime, setFormRenderTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setFormRenderTime(Date.now());
  }, []);

  const handleSelectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerMessage(null);
    setErrors({});

    const validationErrors: Record<string, string[]> = {};
    if (!formData.name.trim()) validationErrors.name = ["Name is required."];
    if (!formData.email.trim() || !formData.email.includes("@")) {
      validationErrors.email = ["Please enter a valid work email."];
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      validationErrors.description = ["Please provide a brief note about your project (at least 10 characters)."];
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: "Not sure yet / Need scoping",
          formRenderTime,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerMessage(data.message || "Failed to submit. Please try again.");
        }
      } else {
        setIsSubmitted(true);
        setServerMessage(data.message);
        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
      setServerMessage("A network error occurred. Please try again or email support@solvempire.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border-2 border-[#0f0f10] shadow-brutal-xl p-8 sm:p-12 text-center">
        <div className="size-16 bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] text-[#0f0f10] flex items-center justify-center mx-auto mb-6">
          <Check className="size-8 stroke-[3]" />
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0f0f10] mb-3">
          Project Inquiry Dispatched!
        </h3>
        <p className="font-display text-sm sm:text-base text-[#0f0f10]/80 max-w-md mx-auto leading-relaxed mb-6">
          {serverMessage || "Thank you! Our engineering team will review your requirements and reply with a scoping call link within 1 business day."}
        </p>
        <div className="p-4 bg-[#f0f7ff] border-2 border-[#0f0f10] max-w-md mx-auto font-mono text-xs text-[#0f0f10] text-left leading-relaxed mb-8">
          <strong>Selected Focus:</strong> {formData.projectType} <br />
          <strong>Current Stage:</strong> {formData.stage} <br />
          <strong>Target Timeline:</strong> {formData.timeline}
        </div>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            setFormData({
              projectType: projectTypes[0],
              stage: projectStages[0],
              timeline: projectTimelines[1],
              description: "",
              name: "",
              email: "",
              company: "",
              fax_number: "",
            });
            setFormRenderTime(Date.now());
          }}
          className="btn-brutal bg-[#0f0f10] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal font-mono text-xs font-bold uppercase tracking-wider px-7 py-3 inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#f5c518]" />
          <span>SCOPE ANOTHER PROJECT</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-2 border-[#0f0f10] shadow-brutal-xl overflow-hidden">
      {/* System Window Header */}
      <div className="bg-[#f7f6f2] border-b-2 border-[#0f0f10] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#0f0f10]" />
          <span className="size-3 rounded-full bg-[#f5c518] border border-[#0f0f10]" />
          <span className="size-3 rounded-full bg-[#ecebe4] border border-[#0f0f10]" />
          <span className="font-mono font-bold text-xs text-[#0f0f10] ml-2 tracking-wide uppercase">
            SCOPING WIZARD // STEP 0{step}
          </span>
        </div>
        <span className="font-mono font-bold text-xs text-[#1d4ed8] uppercase">
          {step === 1 && "01 / DISCIPLINE"}
          {step === 2 && "02 / STAGE"}
          {step === 3 && "03 / TIMELINE"}
          {step === 4 && "04 / DETAILS"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#ecebe4] border-b-2 border-[#0f0f10]">
        <div
          className="h-full bg-[#3b82f6] transition-all duration-300 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-10">
        {/* Honeypot field (hidden from humans) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="fax_number"
            value={formData.fax_number}
            onChange={(e) => setFormData((prev) => ({ ...prev, fax_number: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* STEP 1: ENGINEERING DISCIPLINE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] mb-1">
                What are you engineering?
              </h3>
              <p className="font-mono text-xs text-[#0f0f10]/70">
                Select the primary engineering discipline for your project.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {typeOptions.map((opt) => {
                const isSelected = formData.projectType === opt.value;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectOption("projectType", opt.value)}
                    className={`w-full text-left p-4 border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] transition-all flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? "bg-[#3b82f6] text-[#0f0f10]"
                        : "bg-white text-[#0f0f10] hover:bg-[#f0f7ff]"
                    }`}
                  >
                    <div
                      className={`size-10 border border-[#0f0f10] flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-[#0f0f10] text-[#f5c518]" : "bg-[#f0f7ff] text-[#0f0f10]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base uppercase mb-0.5">
                        {opt.title}
                      </h4>
                      <p className={`font-display text-xs ${isSelected ? "text-[#0f0f10]/90" : "text-[#0f0f10]/70"}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t-2 border-[#0f0f10]/15">
              <button
                type="button"
                onClick={handleNext}
                className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-4 h-4 text-[#f5c518]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT STAGE */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] mb-1">
                Current Development Stage
              </h3>
              <p className="font-mono text-xs text-[#0f0f10]/70">
                Where is your product right now in its lifecycle?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {stageOptions.map((opt) => {
                const isSelected = formData.stage === opt.value;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectOption("stage", opt.value)}
                    className={`w-full text-left p-4 border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] transition-all flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? "bg-[#3b82f6] text-[#0f0f10]"
                        : "bg-white text-[#0f0f10] hover:bg-[#f0f7ff]"
                    }`}
                  >
                    <div
                      className={`size-10 border border-[#0f0f10] flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-[#0f0f10] text-[#f5c518]" : "bg-[#f0f7ff] text-[#0f0f10]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base uppercase mb-0.5">
                        {opt.title}
                      </h4>
                      <p className={`font-display text-xs ${isSelected ? "text-[#0f0f10]/90" : "text-[#0f0f10]/70"}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-[#0f0f10]/15">
              <button
                type="button"
                onClick={handleBack}
                className="btn-brutal bg-white hover:bg-[#fafaf8] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-xs font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-4 h-4 text-[#f5c518]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TIMELINE */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] mb-1">
                Target Launch Timeline
              </h3>
              <p className="font-mono text-xs text-[#0f0f10]/70">
                What is your target timeframe for this deliverable?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timelineOptions.map((opt) => {
                const isSelected = formData.timeline === opt.value;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectOption("timeline", opt.value)}
                    className={`w-full text-left p-4 border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#3b82f6] text-[#0f0f10]"
                        : "bg-white text-[#0f0f10] hover:bg-[#f0f7ff]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`size-8 border border-[#0f0f10] flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-[#0f0f10] text-[#f5c518]" : "bg-[#f0f7ff] text-[#0f0f10]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-bold text-sm uppercase">
                        {opt.title}
                      </h4>
                    </div>
                    <p className={`font-display text-xs ${isSelected ? "text-[#0f0f10]/90" : "text-[#0f0f10]/70"}`}>
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-[#0f0f10]/15">
              <button
                type="button"
                onClick={handleBack}
                className="btn-brutal bg-white hover:bg-[#fafaf8] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-xs font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-4 h-4 text-[#f5c518]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT & BRIEF DETAILS */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#0f0f10] mb-1">
                Technical Brief &amp; Contact
              </h3>
              <p className="font-mono text-xs text-[#0f0f10]/70">
                Provide brief context on your requirements and contact coordinates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f0f10] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 bg-[#f0f7ff] border-2 border-[#0f0f10] font-mono text-xs text-[#0f0f10] placeholder:text-[#0f0f10]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#0f0f10]"
                />
                {errors.name && <p className="font-mono text-[10px] text-[#dc2626] mt-1">{errors.name[0]}</p>}
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f0f10] mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 bg-[#f0f7ff] border-2 border-[#0f0f10] font-mono text-xs text-[#0f0f10] placeholder:text-[#0f0f10]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#0f0f10]"
                />
                {errors.email && <p className="font-mono text-[10px] text-[#dc2626] mt-1">{errors.email[0]}</p>}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f0f10] mb-1">
                Company / Project Entity
              </label>
              <input
                type="text"
                placeholder="e.g. Mercer Robotics"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="w-full p-3 bg-[#f0f7ff] border-2 border-[#0f0f10] font-mono text-xs text-[#0f0f10] placeholder:text-[#0f0f10]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#0f0f10]"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f0f10] mb-1">
                Project Summary &amp; Technical Constraints *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe what you are building, key constraints (dimensions, environment, MCU, volume), or where you are stuck..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 bg-[#f0f7ff] border-2 border-[#0f0f10] font-mono text-xs text-[#0f0f10] placeholder:text-[#0f0f10]/40 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_#0f0f10]"
              />
              {errors.description && (
                <p className="font-mono text-[10px] text-[#dc2626] mt-1">{errors.description[0]}</p>
              )}
            </div>

            {serverMessage && (
              <div className="p-3 bg-[#fef2f2] border-2 border-[#dc2626] font-mono text-xs text-[#dc2626]">
                {serverMessage}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t-2 border-[#0f0f10]/15">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="btn-brutal bg-white hover:bg-[#fafaf8] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-xs font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider px-7 py-3 inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#f5c518]" />
                    <span>DISPATCHING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#f5c518]" />
                    <span>DISPATCH PROJECT BRIEF</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
