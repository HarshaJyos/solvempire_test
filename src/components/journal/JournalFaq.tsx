"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface JournalFaqProps {
  items: FaqItem[];
  title?: string;
  description?: string;
  className?: string;
}

export function JournalFaq({
  items,
  title = "Frequently Asked Questions",
  description = "Common questions about the science and application in this journal entry.",
  className,
}: JournalFaqProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={cn("my-12 space-y-5 scroll-mt-24", className)} id="faq">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-ice-light border border-brand/20 text-xs font-semibold text-brand">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQ Breakdown</span>
        </div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-heading tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="font-body text-sm text-muted">{description}</p>
        )}
      </div>

      <div className="space-y-3 pt-2">
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs",
                isOpen
                  ? "bg-surface border-brand/40 shadow-sm"
                  : "bg-surface border-hairline hover:border-brand/20"
              )}
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-expanded={isOpen}
              >
                <span className="font-display font-semibold text-base sm:text-lg text-heading">
                  {item.question}
                </span>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                    isOpen
                      ? "bg-ice-light text-brand rotate-180"
                      : "bg-surface-subtle text-muted"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 font-body text-sm sm:text-base text-body leading-relaxed animate-fade-in-scale border-t border-hairline">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
