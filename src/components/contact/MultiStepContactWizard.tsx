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
  CheckCircle2,
} from "lucide-react";
import {
  projectTypes,
  projectStages,
  projectTimelines,
} from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

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
      setServerMessage("A network error occurred. Please try again or email contact@solvempire.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-lg p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
            Project Brief Received
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            {serverMessage || "Thank you! Our engineering team will review your requirements and reply with a scoping call link within 1 business day."}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 max-w-md mx-auto text-xs font-mono text-slate-700 text-left space-y-1">
          <p><strong>Selected Discipline:</strong> {formData.projectType}</p>
          <p><strong>Current Stage:</strong> {formData.stage}</p>
          <p><strong>Target Timeline:</strong> {formData.timeline}</p>
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
          className="btn-editorial btn-editorial-blue px-7 py-3 text-xs tracking-wide cursor-pointer shadow-editorial-sm"
        >
          <span>Scope Another Project</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-editorial-lg overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="bg-slate-50/80 border-b border-slate-100 px-6 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="font-mono font-bold text-xs text-slate-700 uppercase tracking-wide">
            PROJECT SCOPING // STEP 0{step} OF 04
          </span>
        </div>
        <span className="font-mono font-bold text-xs text-blue-600 uppercase">
          {step === 1 && "DISCIPLINE"}
          {step === 2 && "STAGE"}
          {step === 3 && "TIMELINE"}
          {step === 4 && "DETAILS"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-100">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-10">
        {/* Honeypot */}
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
              <h3 className="font-display font-bold text-2xl text-slate-950 mb-1">
                What are you engineering?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Select the primary engineering domain for your project.
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
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer",
                      isSelected
                        ? "bg-blue-50/60 border-blue-600 shadow-editorial-xs translate-x-1"
                        : "bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-0.5">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleNext}
                className="group btn-editorial btn-editorial-primary px-6 py-3 text-xs tracking-wide shadow-editorial-sm cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 arrow-slide text-blue-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT STAGE */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-950 mb-1">
                Current Development Stage
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Where is your product right now in its development lifecycle?
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
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer",
                      isSelected
                        ? "bg-blue-50/60 border-blue-600 shadow-editorial-xs translate-x-1"
                        : "bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-0.5">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                className="btn-editorial btn-editorial-secondary px-5 py-3 text-xs tracking-wide cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="group btn-editorial btn-editorial-primary px-6 py-3 text-xs tracking-wide shadow-editorial-sm cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 arrow-slide text-blue-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TIMELINE */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-950 mb-1">
                Target Launch Timeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                What is your target milestone delivery timeframe?
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
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer space-y-3",
                      isSelected
                        ? "bg-blue-50/60 border-blue-600 shadow-editorial-xs translate-y-[-2px]"
                        : "bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-slate-900">
                        {opt.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                className="btn-editorial btn-editorial-secondary px-5 py-3 text-xs tracking-wide cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="group btn-editorial btn-editorial-primary px-6 py-3 text-xs tracking-wide shadow-editorial-sm cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 arrow-slide text-blue-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT & BRIEF DETAILS */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-slate-950 mb-1">
                Technical Brief &amp; Contact
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Provide high-level context on your requirements and contact coordinates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 font-display">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name[0]}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 font-display">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
                {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email[0]}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 font-display">
                Company / Organization
              </label>
              <input
                type="text"
                placeholder="e.g. Mercer Robotics"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 font-display">
                Project Summary &amp; Technical Constraints *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe what you are engineering, key packaging/MCU constraints, target volume, or current development roadblocks..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all leading-relaxed"
              />
              {errors.description && (
                <p className="text-xs text-rose-600 mt-1">{errors.description[0]}</p>
              )}
            </div>

            {serverMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {serverMessage}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="btn-editorial btn-editorial-secondary px-5 py-3 text-xs tracking-wide cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group btn-editorial btn-editorial-blue px-7 py-3 text-xs tracking-wide shadow-editorial-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                    <span>Dispatching Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Brief</span>
                    <Send className="w-3.5 h-3.5 ml-2 arrow-slide text-white" />
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
