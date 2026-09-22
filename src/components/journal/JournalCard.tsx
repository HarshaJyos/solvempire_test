import Link from "next/link";
import Image from "next/image";
import { JournalPostMeta } from "@/types/journal";
import { Clock, Calendar, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md transition-all duration-300 hover:-translate-y-1 font-sans">
      <div>
        {/* Top Badges Row: Category + Type Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
              {post.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              {post.type}
            </span>
          </div>

          {post.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" /> Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3 leading-snug tracking-tight">
          <Link href={`/journal/${post.slug}`} className="focus:outline-none flex items-start justify-between gap-2">
            <span>{post.title}</span>
            <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 mt-0.5" />
          </Link>
        </h3>

        {/* Truncated Description */}
        <p className="text-slate-600 text-sm sm:text-base line-clamp-3 leading-relaxed mb-6 font-normal">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer: Author + Metadata */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        {/* Author */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-blue-50">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-blue-700 text-xs font-bold uppercase">
                {post.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-slate-900 font-semibold leading-none mb-1 truncate">{post.author.name}</p>
            <p className="text-[11px] text-slate-400 leading-none truncate">{post.author.role}</p>
          </div>
        </div>

        {/* Reading Time & Date */}
        <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>{post.publishedAt}</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
            <Clock className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
