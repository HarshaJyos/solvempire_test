"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { JournalPostMeta } from "@/types/journal";
import { JournalPagination } from "@/components/journal/JournalPagination";
import {
  Search,
  BookOpen,
  X,
  Clock,
  Calendar,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

interface AuthorArticlesListProps {
  posts: JournalPostMeta[];
  authorName: string;
  postsPerPage?: number;
}

export function AuthorArticlesList({
  posts,
  authorName,
  postsPerPage = 4,
}: AuthorArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest" | "shortest" | "longest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories available among this author's posts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  // Filter & Sort
  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All" && post.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchCategory = post.category.toLowerCase().includes(query);
        const matchTags = post.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchTitle && !matchExcerpt && !matchCategory && !matchTags) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result = [...result].sort((a, b) => {
      if (selectedSort === "newest") {
        return new Date(b.isoDate || b.publishedAt).getTime() - new Date(a.isoDate || a.publishedAt).getTime();
      }
      if (selectedSort === "oldest") {
        return new Date(a.isoDate || a.publishedAt).getTime() - new Date(b.isoDate || b.publishedAt).getTime();
      }
      if (selectedSort === "shortest") {
        return (parseInt(a.readTime) || 0) - (parseInt(b.readTime) || 0);
      }
      if (selectedSort === "longest") {
        return (parseInt(b.readTime) || 0) - (parseInt(a.readTime) || 0);
      }
      return 0;
    });

    return result;
  }, [posts, searchQuery, selectedCategory, selectedSort]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (activePage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, activePage, postsPerPage]);

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSort("newest");
    setCurrentPage(1);
  };

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 mb-12" id="articles">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1F56C6] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles by {authorName.split(" ")[0]}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[var(--text-heading)] uppercase tracking-tight">
            Published Journal Entries
          </h2>
        </div>

        <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-card)] px-3 py-1.5 rounded-none border border-[var(--border-hairline)] shadow-xs self-start sm:self-auto uppercase font-mono">
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} available
        </span>
      </div>

      {/* Breathable Search & Filter Controls */}
      <div className="p-4 sm:p-5 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] space-y-3.5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={`Search within ${authorName.split(" ")[0]}'s articles...`}
              className="w-full h-11 pl-10 pr-9 rounded-none bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-sm text-[var(--text-heading)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#1F56C6] focus:ring-1 focus:ring-[#1F56C6]/30 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-muted)] hidden sm:inline" />
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Sort articles"
              className="h-11 px-3 rounded-none bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-xs text-[var(--text-body)] focus:text-[var(--text-heading)] focus:outline-none focus:border-[#1F56C6] cursor-pointer font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="shortest">Quick Read (Shortest)</option>
              <option value="longest">Deep Read (Longest)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        {categories.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs font-semibold text-[var(--text-muted)] mr-1 hidden sm:inline uppercase font-mono">
              Category:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-none text-xs font-semibold whitespace-nowrap transition-all cursor-pointer uppercase font-mono ${
                    isActive
                      ? "bg-[#1F56C6] text-white shadow-xs"
                      : "bg-[var(--surface-canvas)] text-[var(--text-body)] border border-[var(--border-hairline)] hover:bg-[var(--surface-canvas-alt)] hover:text-[var(--text-heading)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Filter Summary / Reset */}
        {isFiltering && (
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-hairline)] text-xs font-mono">
            <span className="text-[var(--text-muted)]">
              Showing <strong className="text-[var(--text-heading)] font-semibold">{filteredPosts.length}</strong> filtered{" "}
              {filteredPosts.length === 1 ? "result" : "results"}
            </span>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#1F56C6] hover:underline font-semibold cursor-pointer uppercase"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="space-y-4">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="group p-6 sm:p-7 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-[#1F56C6]/40 transition-all duration-200 shadow-xs hover:shadow-md space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-none bg-[#1F56C6]/10 text-[#1F56C6] text-xs font-semibold border border-[#1F56C6]/20 uppercase font-mono">
                  {post.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-none bg-[var(--surface-canvas)] text-[var(--text-muted)] text-xs border border-[var(--border-hairline)] uppercase font-mono">
                  {post.type}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-xl text-[var(--text-heading)] group-hover:text-[#1F56C6] transition-colors leading-snug uppercase tracking-tight">
                <Link href={`/journal/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="font-sans text-sm sm:text-base text-[var(--text-body)] line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-3.5 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2.5 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap font-mono text-[11px] uppercase">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
                    <span>{post.publishedAt}</span>
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="inline-flex items-center gap-1.5 text-[#1F56C6] font-bold whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link
                  href={`/journal/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1F56C6] group-hover:translate-x-1 transition-transform whitespace-nowrap shrink-0 uppercase tracking-wider font-display"
                >
                  <span>Read Journal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 px-6 text-center rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] space-y-3 shadow-xs">
          <p className="font-display text-base font-bold text-[var(--text-heading)] uppercase">
            No matching articles found
          </p>
          <p className="font-sans text-xs sm:text-sm text-[var(--text-body)] max-w-sm mx-auto">
            Try adjusting your search terms or clearing your category filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-indisea-blue text-xs py-2 px-5 cursor-pointer uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination (Works even when filtered) */}
      {totalPages > 1 && (
        <div className="pt-2">
          <JournalPagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              const el = document.getElementById("articles");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      )}
    </section>
  );
}
