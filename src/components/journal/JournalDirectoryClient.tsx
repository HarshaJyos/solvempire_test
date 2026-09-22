"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { JournalCard } from "@/components/journal/JournalCard";
import { JournalPagination } from "@/components/journal/JournalPagination";
import {
  getJournalManifest,
  getAllJournalPosts,
  getAllJournalAuthors,
  filterAndSortPosts,
  JournalSortOption,
} from "@/lib/journal-data";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 4;

export function JournalDirectoryClient() {
  const manifest = getJournalManifest();
  const allPosts = useMemo(() => getAllJournalPosts(), []);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<JournalSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const availableCategories = useMemo(() => {
    return manifest.categories.filter((c) => c !== "All");
  }, [manifest.categories]);

  const availableTypes = useMemo(() => {
    return manifest.types.filter((t) => t !== "All Types");
  }, [manifest.types]);

  const isFiltering =
    searchQuery.trim().length > 0 ||
    selectedAuthors.length > 0 ||
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedTags.length > 0 ||
    sortBy !== "newest";

  const totalActiveFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    selectedAuthors.length +
    selectedCategories.length +
    selectedTypes.length +
    selectedTags.length +
    (sortBy !== "newest" ? 1 : 0);

  const filteredPosts = useMemo(() => {
    return filterAndSortPosts(allPosts, {
      query: searchQuery,
      authors: selectedAuthors,
      categories: selectedCategories,
      types: selectedTypes,
      tags: selectedTags,
      sortBy,
    });
  }, [
    allPosts,
    searchQuery,
    selectedAuthors,
    selectedCategories,
    selectedTypes,
    selectedTags,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(Math.max(1, currentPage), totalPages);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (activePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, activePage]);

  const featuredPost = useMemo(() => {
    if (isFiltering || activePage !== 1) return null;
    return allPosts.find((p) => p.featured);
  }, [isFiltering, activePage, allPosts]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedTags([]);
    setSortBy("newest");
    setCurrentPage(1);
  };

  const getCategoryCount = (cat: string) => {
    return allPosts.filter(
      (p) => p.category.toLowerCase() === cat.toLowerCase()
    ).length;
  };

  const getTypeCount = (t: string) => {
    return allPosts.filter((p) => p.type.toLowerCase() === t.toLowerCase())
      .length;
  };

  return (
    <div className="space-y-12">
      {/* Top Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--text-muted)] hover:text-[#2563EB] uppercase tracking-wider transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>&larr; Return to Studio</span>
      </Link>

      {/* Hero Title Section */}
      <div className="max-w-4xl space-y-4 text-left border-b border-[var(--border-hairline)] pb-10">
        <span className="indisea-eyebrow">
          01 / research &amp; engineering papers
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[var(--text-heading)] tracking-tight leading-[1.05]">
          Engineering in Public. <br />
          <span className="text-[#2563EB]">Documenting Science &amp; Systems.</span>
        </h1>

        <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-normal">
          Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected physical products engineered at SolveMpire.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="relative flex items-center rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/10 transition-all">
          <div className="pl-5 text-[var(--text-muted)]">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search journals by keyword, architecture topic, or author..."
            className="w-full h-14 sm:h-16 pl-3.5 pr-28 bg-transparent text-[var(--text-heading)] placeholder:text-[var(--text-muted)] text-sm sm:text-base font-sans focus:outline-none"
          />

          <div className="absolute right-3.5 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--surface-canvas)] transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-muted)]">
              {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}
            </span>
          </div>
        </div>

        {/* Mobile Active Filter Chips Tray */}
        {isFiltering && (
          <div className="lg:hidden flex flex-wrap items-center gap-1.5 pt-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] mr-1">Active:</span>
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2563EB]/10 text-xs text-[#2563EB] font-medium">
                <span>&quot;{searchQuery}&quot;</span>
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2563EB]/10 text-xs text-[#2563EB] font-medium"
              >
                <span>{cat}</span>
                <button onClick={() => toggleCategory(cat)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#2563EB] hover:underline font-semibold ml-1 py-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main 12-Column Swiss Grid Layout */}
      <div className="indisea-grid items-start gap-8 lg:gap-10">
        {/* Desktop Filter Sidebar (Span 4) */}
        <aside className="hidden lg:block col-span-4 space-y-5 sticky top-28">
          <div className="rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2563EB]" />
                <h2 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--text-heading)]">
                  Topic Filters
                </h2>
              </div>

              {isFiltering && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3 pb-3.5 border-b border-[var(--border-hairline)]">
              <span className="indisea-eyebrow block">
                Categories
              </span>
              <div className="space-y-1.5">
                {availableCategories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  const count = getCategoryCount(cat);
                  return (
                    <label
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--surface-canvas)] transition-colors cursor-pointer select-none text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-4 h-4 rounded flex items-center justify-center border transition-all",
                            isChecked
                              ? "bg-[#2563EB] border-[#2563EB] text-white"
                              : "border-[var(--border-hairline)] bg-[var(--surface-canvas)]"
                          )}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={cn(isChecked ? "text-[var(--text-heading)] font-semibold" : "text-[var(--text-muted)]")}>
                          {cat}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Spec Types */}
            <div className="space-y-3">
              <span className="indisea-eyebrow block">
                Spec Type
              </span>
              <div className="space-y-1.5">
                {availableTypes.map((t) => {
                  const isChecked = selectedTypes.includes(t);
                  const count = getTypeCount(t);
                  return (
                    <label
                      key={t}
                      onClick={() => toggleType(t)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--surface-canvas)] transition-colors cursor-pointer select-none text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-4 h-4 rounded flex items-center justify-center border transition-all",
                            isChecked
                              ? "bg-[#2563EB] border-[#2563EB] text-white"
                              : "border-[var(--border-hairline)] bg-[var(--surface-canvas)]"
                          )}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={cn(isChecked ? "text-[var(--text-heading)] font-semibold" : "text-[var(--text-muted)]")}>
                          {t}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Results Column (Span 8) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Toolbar */}
          <div className="p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-hairline)] font-semibold text-[var(--text-heading)]"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Filters</span>
              {totalActiveFilterCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#2563EB] text-white text-[10px]">
                  {totalActiveFilterCount}
                </span>
              )}
            </button>

            <span className="text-[var(--text-muted)] font-medium">
              Showing <strong className="text-[var(--text-heading)]">{paginatedPosts.length}</strong> of{" "}
              <strong className="text-[var(--text-heading)]">{filteredPosts.length}</strong> articles
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[var(--text-muted)] font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as JournalSortOption);
                  setCurrentPage(1);
                }}
                className="h-8 pl-2.5 pr-7 rounded-lg bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-xs font-medium text-[var(--text-heading)] focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="shortest">Quick Read</option>
                <option value="longest">Deep Read</option>
              </select>
            </div>
          </div>

          {/* Featured Spotlight Card */}
          {featuredPost && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400/80 shadow-xs transition-all relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-[11px] font-mono font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--surface-canvas)] text-[var(--text-muted)] text-[11px] font-mono font-medium">
                    {featuredPost.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 bg-[#FACC15]/20 px-2 py-0.5 rounded-full border border-amber-300">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Featured Spotlight
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors leading-tight">
                  <Link href={`/journal/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-[var(--text-heading)] font-semibold">{featuredPost.author.name}</span>
                    <span>•</span>
                    <span className="text-[#2563EB] font-bold">{featuredPost.readTime}</span>
                  </div>

                  <Link
                    href={`/journal/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 font-display font-bold text-xs text-[#2563EB] group-hover:text-[#1D4ED8]"
                  >
                    <span>Read White Paper</span>
                    <ArrowRight className="w-3.5 h-3.5 arrow-slide" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="journal-grid">
              {paginatedPosts.map((post) => (
                <JournalCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 px-6 text-center rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] space-y-4">
              <Search className="w-8 h-8 text-[var(--text-muted)] mx-auto" />
              <p className="font-display font-bold text-lg text-[var(--text-heading)]">
                No matching journal entries found
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-indisea-blue text-xs py-2.5 px-5 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4">
              <JournalPagination
                currentPage={activePage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  const el = document.getElementById("journal-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
