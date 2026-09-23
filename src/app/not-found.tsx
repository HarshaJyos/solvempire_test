import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, Home, FolderArchive, Layers, Mail } from "lucide-react";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <IndiseaHeader />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-28 flex flex-col justify-center items-center text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-xs font-mono text-[#1F56C6] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Error 404 // Coordinate Not Found</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase text-[var(--text-heading)] tracking-tight">
            Design File Not Found.
          </h1>

          <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            The engineering dossier or resource you requested could not be located in our production repository.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F56C6] text-white font-display font-bold text-xs uppercase tracking-wide hover:bg-[#17449E] transition-colors shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-[var(--text-heading)] font-display font-bold text-xs uppercase tracking-wide hover:border-slate-400 transition-colors shadow-xs"
            >
              <FolderArchive className="w-4 h-4" />
              <span>Case Studies</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-[var(--text-heading)] font-display font-bold text-xs uppercase tracking-wide hover:border-slate-400 transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Studio</span>
            </Link>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
