import Link from "next/link";
import Image from "next/image";
import { JournalPostMeta } from "@/types/journal";
import { Clock, Calendar, Sparkles } from "lucide-react";

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-surface border border-hairline hover:border-brand/40 transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-0.5">
      <div>
        {/* Top Badges Row: Category + Type Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold border border-brand/20 whitespace-nowrap">
              {post.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-surface-subtle text-muted text-xs font-medium border border-hairline whitespace-nowrap">
              {post.type}
            </span>
          </div>

          {post.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full border border-brand/20 whitespace-nowrap">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-heading group-hover:text-brand transition-colors line-clamp-2 mb-3 leading-snug">
          <Link href={`/journal/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" />
            {post.title}
          </Link>
        </h3>

        {/* Truncated Description */}
        <p className="text-body text-sm sm:text-base line-clamp-3 leading-relaxed mb-6">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer: Author + Metadata */}
      <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        {/* Author */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-hairline shrink-0 bg-ice-light">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand text-xs font-bold uppercase">
                {post.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-heading font-medium leading-none mb-1 truncate">{post.author.name}</p>
            <p className="text-[11px] text-muted leading-none truncate">{post.author.role}</p>
          </div>
        </div>

        {/* Reading Time & Date */}
        <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>{post.publishedAt}</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="inline-flex items-center gap-1 text-brand font-medium">
            <Clock className="w-3.5 h-3.5 opacity-80 shrink-0" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

