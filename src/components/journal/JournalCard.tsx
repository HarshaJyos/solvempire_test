import Link from "next/link";
import Image from "next/image";
import { JournalPostMeta } from "@/types/journal";
import { Clock, Calendar, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 shadow-xs transition-all duration-300 font-sans">
      <div>
        {/* Top Badges Row: Category + Type Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-none bg-[#1F56C6]/10 text-[#1F56C6] text-[11px] font-mono font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="px-2 py-0.5 rounded-none bg-[var(--surface-canvas)] text-[var(--text-muted)] text-[11px] font-mono font-medium uppercase">
              {post.type}
            </span>
          </div>

          {post.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 bg-[#FACC15]/20 px-2 py-0.5 rounded-none border border-amber-300 uppercase">
              <Sparkles className="w-3 h-3 text-amber-600" /> Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)] group-hover:text-[#1F56C6] transition-colors line-clamp-2 mb-2.5 leading-snug tracking-tight uppercase">
          <Link href={`/journal/${post.slug}`} className="focus:outline-none flex items-start justify-between gap-2">
            <span>{post.title}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#1F56C6] mt-1" />
          </Link>
        </h3>

        {/* Truncated Description */}
        <p className="text-[var(--text-muted)] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-5 font-normal">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer: Author + Metadata */}
      <div className="pt-3.5 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        {/* Author */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-7 h-7 rounded-none overflow-hidden border border-[var(--border-hairline)] shrink-0 bg-[#1F56C6]/10">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#1F56C6] text-[10px] font-bold uppercase">
                {post.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[var(--text-heading)] font-semibold text-xs leading-none mb-0.5 truncate uppercase">{post.author.name}</p>
            <p className="text-[10px] text-[var(--text-muted)] leading-none truncate uppercase">{post.author.role}</p>
          </div>
        </div>

        {/* Reading Time & Date */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0 text-[var(--text-muted)] text-[11px] font-mono uppercase">
          <span>{post.publishedAt}</span>
          <span className="opacity-40">•</span>
          <span className="text-[#1F56C6] font-bold">
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
