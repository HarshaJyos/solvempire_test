import Link from "next/link";
import Image from "next/image";
import { JournalPostMeta } from "@/types/journal";
import { Clock, Calendar, Sparkles, ArrowUpRight } from "lucide-react";

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white border-2 border-[#0f0f10] shadow-brutal-sm hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
      <div>
        {/* Top Badges Row: Category + Type Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-[#0f0f10]/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#3b82f6] text-white text-[11px] font-mono font-bold uppercase tracking-wider border border-[#0f0f10]">
              {post.category}
            </span>
            <span className="px-2.5 py-0.5 bg-[#f7f6f2] text-[#0f0f10] text-[11px] font-mono font-bold uppercase tracking-wider border border-[#0f0f10]">
              {post.type}
            </span>
          </div>

          {post.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-black text-[#0f0f10] bg-[#f5c518] px-2 py-0.5 border border-[#0f0f10] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 fill-[#0f0f10]" /> Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] group-hover:text-[#3b82f6] transition-colors line-clamp-2 mb-3 leading-snug uppercase tracking-tight">
          <Link href={`/journal/${post.slug}`} className="focus:outline-none flex items-start justify-between gap-2">
            <span>{post.title}</span>
            <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#3b82f6] mt-0.5" />
          </Link>
        </h3>

        {/* Truncated Description */}
        <p className="text-[#3f3f46] text-sm sm:text-base line-clamp-3 leading-relaxed mb-6 font-normal">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer: Author + Metadata */}
      <div className="pt-4 border-t-2 border-[#0f0f10]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Author */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 overflow-hidden border border-[#0f0f10] shrink-0 bg-[#f0f7ff]">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#0f0f10] text-xs font-black uppercase">
                {post.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[#0f0f10] font-bold leading-none mb-1 truncate">{post.author.name}</p>
            <p className="text-[10px] text-[#71717a] leading-none truncate uppercase">{post.author.role}</p>
          </div>
        </div>

        {/* Reading Time & Date */}
        <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0 text-[#71717a] font-bold">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>{post.publishedAt}</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="inline-flex items-center gap-1 text-[#3b82f6] font-bold">
            <Clock className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
