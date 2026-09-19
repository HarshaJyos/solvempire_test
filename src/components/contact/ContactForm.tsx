"use client";

import { useEffect, useRef, useState } from "react";
import {
  projectTypes,
  projectStages,
  budgetRanges,
  projectTimelines,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: projectTypes[0],
    stage: projectStages[0],
    budget: budgetRanges[0],
    timeline: projectTimelines[0],
    description: "",
    fax_number: "", // honeypot
  });

  const [formRenderTime, setFormRenderTime] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const firstErrorRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  useEffect(() => {
    setFormRenderTime(Date.now());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formRenderTime }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
          setSubmitStatus("error");
          setStatusMessage("Please correct the highlighted fields below.");
          // Focus first invalid element
          setTimeout(() => {
            const firstKey = Object.keys(data.errors)[0];
            const el = document.getElementById(firstKey);
            el?.focus();
          }, 50);
        } else {
          setSubmitStatus("error");
          setStatusMessage(data.message || "Failed to submit. Please try again.");
        }
      } else {
        setSubmitStatus("success");
        setStatusMessage(data.message || "Thank you! We have received your inquiry.");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setStatusMessage("An unexpected network error occurred. Please try again or email support@solvempire.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-brand/20 shadow-md text-center">
        <div className="w-16 h-16 rounded-full bg-ice-light text-brand flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
          ✓
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-heading mb-4">
          Inquiry Received!
        </h3>
        <p className="text-body text-base max-w-lg mx-auto leading-relaxed mb-8">
          {statusMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitStatus("idle");
            setFormData({
              name: "",
              email: "",
              company: "",
              projectType: projectTypes[0],
              stage: projectStages[0],
              budget: budgetRanges[0],
              timeline: projectTimelines[0],
              description: "",
              fax_number: "",
            });
            setFormRenderTime(Date.now());
          }}
          className="inline-flex items-center justify-center bg-brand hover:bg-brand-hover text-white font-medium text-sm px-6 py-3 rounded-full"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-surface rounded-2xl sm:rounded-3xl border border-hairline p-8 sm:p-12 shadow-sm space-y-8"
    >
      {/* Aria-live status announcement */}
      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      {submitStatus === "error" && statusMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {statusMessage}
        </div>
      )}

      {/* Honeypot field (hidden from visual users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="fax_number">Do not fill this field</label>
        <input
          type="text"
          id="fax_number"
          name="fax_number"
          value={formData.fax_number}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
            Your Name <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="e.g. Sarah Jenkins"
            className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.name[0]}
            </p>
          )}
        </div>

        {/* Work Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
            Work Email <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="sarah@company.com"
            className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.email[0]}
            </p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
          Company / Organization <span className="text-muted font-normal text-xs">(Optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Innovations"
          className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
            Project Type <span className="text-brand">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Project Stage */}
        <div>
          <label htmlFor="stage" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
            Current Stage <span className="text-brand">*</span>
          </label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
          >
            {projectStages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Estimated Budget */}
        <div>
          <label htmlFor="budget" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
            Estimated Budget <span className="text-muted font-normal text-xs">(Optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
          >
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
            Target Timeline <span className="text-brand">*</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all"
          >
            {projectTimelines.map((tl) => (
              <option key={tl} value={tl}>
                {tl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-bold text-heading uppercase tracking-wider mb-2">
          What are you building? <span className="text-brand">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          value={formData.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          placeholder="Tell us about the physical form factor, key constraints, electronics, target volumes, or engineering challenges..."
          className="w-full px-4 py-3 rounded-xl bg-canvas border border-hairline focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-heading text-sm transition-all resize-y"
        />
        {errors.description && (
          <p id="description-error" className="mt-1.5 text-xs text-red-600 font-medium">
            {errors.description[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand hover:bg-brand-hover active:bg-blue-800 disabled:opacity-60 text-white font-semibold text-base px-9 py-4 rounded-full shadow-lg shadow-brand/25 transition-all duration-200 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>Submitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Project Inquiry</span>
              <span>&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
