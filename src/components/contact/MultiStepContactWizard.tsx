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
    title: "ASAP (< 2 weeks)",
    desc: "Immediate project kickoff and scoping",
  },
  {
    value: projectTimelines[1],
    icon: Clock,
    title: "1 – 3 Months",
    desc: "Standard product development sprint",
  },
  {
    value: projectTimelines[2],
    icon: CalendarDays,
    title: "3 – 6 Months",
    desc: "Phased commercial development roadmap",
  },
  {
    value: projectTimelines[3],
    icon: Compass,
    title: "Exploring / Scoping",
    desc: "Early research, planning and feasibility",
  },
];


export function MultiStepContactWizard({ theme = "light", onSuccess }: MultiStepContactWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    projectType: projectTypes[0] as string,
    stage: projectStages[0] as string,
    timeline: projectTimelines[1] as string,
    description: "",
    name: "",
    email: "",
    company: "",
    fax_number: "", // honeypot
  });

  const [formRenderTime, setFormRenderTime] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    setFormRenderTime(Date.now());
  }, []);

  const handleSelectOption = (field: "projectType" | "stage" | "timeline", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setServerMessage("");

    // Client-side quick check
    const validationErrors: Record<string, string[]> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      validationErrors.name = ["Please enter your full name."];
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      validationErrors.email = ["Please enter a valid work email address."];
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
      setServerMessage("A network error occurred. Please try again or email hello@solvempire.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === "dark";

  if (isSubmitted) {
    return (
      <div
        className={`p-8 sm:p-12 rounded-3xl text-center border animate-in fade-in zoom-in-95 duration-400 ${
          isDark
            ? "bg-slate-900/90 border-slate-700/80 text-white"
            : "bg-surface border-brand/20 text-heading shadow-xl"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-brand/20 text-brand flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
          Project Scoping Inquiry Received!
        </h3>
        <p className={`text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6 ${isDark ? "text-slate-300" : "text-body"}`}>
          {serverMessage || "Thank you! Our engineering team will review your requirements and reply with a 30-minute scoping call link within 1 business day."}
        </p>
        <div className={`p-4 rounded-xl max-w-md mx-auto text-xs leading-relaxed mb-8 ${isDark ? "bg-slate-800 text-slate-300 border border-slate-700" : "bg-ice-light text-slate-700 border border-brand/15"}`}>
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
          className="inline-flex items-center gap-2 justify-center bg-brand hover:bg-brand-hover text-white font-medium text-sm px-7 py-3 rounded-full shadow-lg shadow-brand/25 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Scope Another Project</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
        isDark
          ? "bg-slate-900/90 backdrop-blur-md border-slate-800 text-white p-6 sm:p-10 shadow-2xl"
          : "bg-surface border-hairline text-heading p-6 sm:p-10 shadow-lg"
      }`}
    >
      {/* Progress Bar & Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2.5">
          <span className="text-brand">Step {step} of 4</span>
          <span className={isDark ? "text-slate-400" : "text-muted"}>
            {step === 1 && "Engineering Discipline"}
            {step === 2 && "Project Stage"}
            {step === 3 && "Target Timeline"}
            {step === 4 && "Contact Details"}
          </span>
        </div>
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-canvas"}`}>
          <div
            className="h-full bg-brand transition-all duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Honeypot field (hidden from human users) */}
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

      {/* ========================================================================= */}
      {/* STEP 1: ENGINEERING DISCIPLINE / FOCUS */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-3 duration-300">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
            What are you engineering?
          </h3>
          <p className={`text-xs sm:text-sm mb-6 ${isDark ? "text-slate-400" : "text-body"}`}>
            Select the primary engineering area for your project.
          </p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {typeOptions.map((opt) => {
              const isSelected = formData.projectType === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleSelectOption("projectType", opt.value);
                  }}
                  className={`w-full text-left p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    isSelected
                      ? "border-brand bg-brand/10 ring-2 ring-brand/30 shadow-sm"
                      : isDark
                      ? "border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800"
                      : "border-hairline bg-canvas hover:border-brand/40 hover:bg-surface-subtle"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-brand text-white shadow-md shadow-brand/30"
                        : isDark
                        ? "bg-slate-800 text-brand-light"
                        : "bg-surface text-brand border border-hairline shadow-xs"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-bold text-sm sm:text-base leading-tight mb-1">
                      {opt.title}
                    </div>
                    <div className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-muted"}`}>
                      {opt.desc}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                      isSelected ? "border-brand bg-brand text-white" : "border-slate-400/50"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full shadow-lg shadow-brand/20 transition-all cursor-pointer"
            >
              <span>Continue to Stage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: PROJECT STAGE */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-3 duration-300">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
            What stage is the project currently in?
          </h3>
          <p className={`text-xs sm:text-sm mb-6 ${isDark ? "text-slate-400" : "text-body"}`}>
            Helps our architects prepare relevant case studies and DFM frameworks.
          </p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {stageOptions.map((opt) => {
              const isSelected = formData.stage === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleSelectOption("stage", opt.value);
                  }}
                  className={`w-full text-left p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    isSelected
                      ? "border-brand bg-brand/10 ring-2 ring-brand/30 shadow-sm"
                      : isDark
                      ? "border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800"
                      : "border-hairline bg-canvas hover:border-brand/40 hover:bg-surface-subtle"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-brand text-white shadow-md shadow-brand/30"
                        : isDark
                        ? "bg-slate-800 text-brand-light"
                        : "bg-surface text-brand border border-hairline shadow-xs"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-bold text-sm sm:text-base leading-tight mb-1">
                      {opt.title}
                    </div>
                    <div className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-muted"}`}>
                      {opt.desc}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                      isSelected ? "border-brand bg-brand text-white" : "border-slate-400/50"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? "text-slate-400 hover:text-white" : "text-muted hover:text-heading"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full shadow-lg shadow-brand/20 transition-all cursor-pointer"
            >
              <span>Continue to Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: TARGET TIMELINE */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-3 duration-300">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
            What is your estimated timeline?
          </h3>
          <p className={`text-xs sm:text-sm mb-6 ${isDark ? "text-slate-400" : "text-body"}`}>
            Select when you would like engineering work to commence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            {timelineOptions.map((opt) => {
              const isSelected = formData.timeline === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleSelectOption("timeline", opt.value);
                  }}
                  className={`text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    isSelected
                      ? "border-brand bg-brand/10 ring-2 ring-brand/30 shadow-sm"
                      : isDark
                      ? "border-slate-800 bg-slate-800/50 hover:border-slate-700 hover:bg-slate-800"
                      : "border-hairline bg-canvas hover:border-brand/40 hover:bg-surface-subtle"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand text-white shadow-md shadow-brand/30"
                          : isDark
                          ? "bg-slate-800 text-brand-light"
                          : "bg-surface text-brand border border-hairline shadow-xs"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? "border-brand bg-brand text-white" : "border-slate-400/50"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm sm:text-base leading-tight mb-1">
                      {opt.title}
                    </div>
                    <div className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-muted"}`}>
                      {opt.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? "text-slate-400 hover:text-white" : "text-muted hover:text-heading"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full shadow-lg shadow-brand/20 transition-all cursor-pointer"
            >
              <span>Final Step: Contact Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: CONTACT & DETAILS */}
      {/* ========================================================================= */}
      {step === 4 && (
        <form onSubmit={handleSubmit} noValidate className="animate-in fade-in slide-in-from-right-3 duration-300">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
            Where should we send your scoping review?
          </h3>
          <p className={`text-xs sm:text-sm mb-6 ${isDark ? "text-slate-400" : "text-body"}`}>
            We reply within 1 business day with a 30-minute scoping call link. No sales deck.
          </p>

          {serverMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs mb-6">
              {serverMessage}
            </div>
          )}

          <div className="space-y-4 mb-6">
            {/* Selected Summary Badge */}
            <div className={`p-3.5 rounded-xl text-xs flex flex-wrap items-center gap-2 ${isDark ? "bg-slate-800 text-slate-300 border border-slate-700" : "bg-ice-light text-slate-700 border border-brand/15"}`}>
              <span className="font-semibold text-brand">Scope:</span>
              <span>{formData.projectType}</span>
              <span className="opacity-50">·</span>
              <span>{formData.stage}</span>
              <span className="opacity-50">·</span>
              <span>{formData.timeline}</span>
            </div>

            {/* Project Notes */}
            <div>
              <label htmlFor="wizard_desc" className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                Brief Project Notes / Constraints <span className="text-brand">*</span>
              </label>
              <textarea
                id="wizard_desc"
                required
                rows={3}
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) setErrors((prev) => ({ ...prev, description: [] }));
                }}
                placeholder="e.g. 90x60mm compact profile, waterproof sealing, 10,000 units target, STM32 or ESP32..."
                className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all ${
                  isDark
                    ? "bg-slate-800 border-slate-700 focus:border-brand text-white"
                    : "bg-canvas border-hairline focus:border-brand text-heading"
                }`}
              />
              {errors.description && errors.description[0] && (
                <p className="mt-1 text-xs text-red-500">{errors.description[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="wizard_name" className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Your Name <span className="text-brand">*</span>
                </label>
                <input
                  type="text"
                  id="wizard_name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: [] }));
                  }}
                  placeholder="Sarah Jenkins"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-slate-700 focus:border-brand text-white"
                      : "bg-canvas border-hairline focus:border-brand text-heading"
                  }`}
                />
                {errors.name && errors.name[0] && (
                  <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="wizard_email" className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Work Email <span className="text-brand">*</span>
                </label>
                <input
                  type="email"
                  id="wizard_email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: [] }));
                  }}
                  placeholder="sarah@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-slate-700 focus:border-brand text-white"
                      : "bg-canvas border-hairline focus:border-brand text-heading"
                  }`}
                />
                {errors.email && errors.email[0] && (
                  <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="wizard_company" className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                Company / Organization <span className={`text-[11px] font-normal ${isDark ? "text-slate-400" : "text-muted"}`}>(Optional)</span>
              </label>
              <input
                type="text"
                id="wizard_company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Acme Innovations"
                className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all ${
                  isDark
                    ? "bg-slate-800 border-slate-700 focus:border-brand text-white"
                    : "bg-canvas border-hairline focus:border-brand text-heading"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrevStep}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? "text-slate-400 hover:text-white" : "text-muted hover:text-heading"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2.5 bg-brand hover:bg-brand-hover active:bg-blue-800 disabled:opacity-60 text-white font-medium text-sm sm:text-base px-8 py-3 rounded-full shadow-lg shadow-brand/25 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Request 30-Min Scoping Call</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

