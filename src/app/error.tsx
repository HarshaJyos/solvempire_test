"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime client error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fafcff] text-[#0f172a] flex flex-col items-center justify-center p-6 font-sans text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-slate-900">
            System Anomaly
          </h2>
          <p className="font-sans text-xs text-slate-500 leading-relaxed">
            An unexpected error occurred while rendering this interface. Our engineering telemetry has logged the issue.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1F56C6] text-white font-display font-bold text-xs uppercase tracking-wide hover:bg-[#17449E] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-display font-bold text-xs uppercase tracking-wide hover:bg-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
