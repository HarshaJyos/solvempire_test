import Link from "next/link";
import { getAllJournalPosts } from "@/lib/journal-data";
import { Clock, Calendar, ArrowRight, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalRelatedProps {
  currentSlug: string;
  category?: string;
  relatedSlugs?: string[];
  maxCount?: number;
  className?: string;
}

export function JournalRelated({
  currentSlug,
  category,
  relatedSlugs,
  maxCount = 2,
  className,
}: JournalRelatedProps) {
  const allPosts = getAllJournalPosts();

  // 1. Pick specific related slugs if provided
  let related = allPosts.filter(
    (p) => relatedSlugs && relatedSlugs.includes(p.slug) && p.slug !== currentSlug
  );

  // 2. If not enough, fill with posts from the same category
  if (related.length < maxCount && category) {
    const sameCategory = allPosts.filter(
      (p) => p.category === category && p.slug !== currentSlug && !related.some((r) => r.slug === p.slug)
    );
    related = [...related, ...sameCategory];
  }

  // 3. If still not enough, fill with any other posts
  if (related.length < maxCount) {
    const remaining = allPosts.filter(
      (p) => p.slug !== currentSlug && !related.some((r) => r.slug === p.slug)
    );
    related = [...related, ...remaining];
  }

  const displayPosts = related.slice(0, maxCount);

  if (displayPosts.length === 0) return null;

  return (
    <section className={cn("my-12 pt-8 border-t border-hairline space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Recommended Reading</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-heading">
            Related Journals & Engineering Deep Dives
          </h3>
        </div>

        <Link
          href="/journal"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
        >
          <span>View All Journals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {displayPosts.map((post) => (
          <article
            key={post.id}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface border border-hairline hover:border-brand/40 transition-all hover:shadow-lg hover:-translate-y-0.5 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-ice-light text-brand text-[11px] font-semibold border border-brand/20">
                  {post.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-subtle text-muted text-[11px] border border-hairline">
                  {post.type}
                </span>
              </div>

              <h4 className="font-display font-bold text-base sm:text-lg text-heading group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                <Link href={`/journal/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h4>

              <p className="font-body text-xs sm:text-sm text-body line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-hairline flex items-center justify-between text-xs text-muted">
              <span>{post.publishedAt}</span>
              <span className="flex items-center gap-1 text-brand font-medium">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
