import { ChevronLeft, ChevronRight } from "lucide-react";

interface JournalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function JournalPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JournalPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 my-10 font-mono"
      aria-label="Journal pages navigation"
    >
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] text-xs font-bold uppercase text-[#0f0f10] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all cursor-pointer"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">PREV</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 border-2 border-[#0f0f10] text-xs font-black transition-all cursor-pointer ${
                isActive
                  ? "bg-[#3b82f6] text-white shadow-none translate-x-[1px] translate-y-[1px]"
                  : "bg-white text-[#0f0f10] shadow-brutal-xs hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {String(p).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 bg-white border-2 border-[#0f0f10] shadow-brutal-xs hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] text-xs font-bold uppercase text-[#0f0f10] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all cursor-pointer"
        aria-label="Next Page"
      >
        <span className="hidden sm:inline">NEXT</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
