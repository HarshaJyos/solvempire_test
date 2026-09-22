"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
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
  BookOpen,
  X,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 4;

export default function JournalPage() {
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

  // Accordions
  const [authorOpen, setAuthorOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);

  const availableAuthors = useMemo(() => {
    return getAllJournalAuthors();
  }, []);

  const availableCategories = useMemo(() => {
    return manifest.categories.filter((c) => c !== "All");
  }, [manifest.categories]);

  const availableTypes = useMemo(() => {
    return manifest.types.filter((t) => t !== "All Types");
  }, [manifest.types]);

  const availableTags = useMemo(() => {
    const tagMap: Record<string, number> = {};
    allPosts.forEach((post) => {
      post.tags?.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagMap).map(([tag, count]) => ({ tag, count }));
  }, [allPosts]);

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

  const toggleAuthor = (authorName: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName)
        ? prev.filter((a) => a !== authorName)
        : [...prev, authorName]
    );
    setCurrentPage(1);
  };

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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
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

  const getAuthorCount = (authorName: string) => {
    return allPosts.filter(
      (p) => p.author.name.toLowerCase() === authorName.toLowerCase()
    ).length;
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
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <IndiseaHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-xs text-slate-500 hover:text-blue-600 font-bold uppercase mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; Return to Studio</span>
        </Link>

        {/* Hero Title Section */}
        <div className="max-w-3xl space-y-4 mb-10 text-left border-b border-slate-200 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SOLVEMPIRE ENGINEERING JOURNAL</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-950 tracking-tight leading-[1.08]">
            Engineering in Public. <br />
            <span className="text-blue-600">Documenting Science &amp; Systems.</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected physical products engineered at SolveMpire.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 group">
          <div className="relative flex items-center rounded-2xl bg-white border border-slate-200/90 shadow-editorial-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <div className="pl-5 text-slate-400">
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
              className="w-full h-14 sm:h-16 pl-3.5 pr-28 bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-sans focus:outline-none"
            />

            <div className="absolute right-3.5 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-slate-500">
                {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}
              </span>
            </div>
          </div>

          {/* Mobile Active Filter Chips Tray */}
          {isFiltering && (
            <div className="lg:hidden flex flex-wrap items-center gap-1.5 pt-3">
              <span className="text-xs font-semibold text-slate-400 mr-1">Active:</span>
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-xs text-blue-700 font-medium">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-xs text-blue-700 font-medium"
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
                className="text-xs text-blue-600 hover:underline font-semibold ml-1 py-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5 sticky top-28">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-editorial-sm space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <h2 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900">
                    Topic Filters
                  </h2>
                </div>

                {isFiltering && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-3 pb-3.5 border-b border-slate-100">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 block">
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
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border transition-all",
                              isChecked
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={cn(isChecked ? "text-slate-900 font-semibold" : "text-slate-600")}>
                            {cat}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Spec Types */}
              <div className="space-y-3">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 block">
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
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border transition-all",
                              isChecked
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-slate-300 bg-white"
                            )}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={cn(isChecked ? "text-slate-900 font-semibold" : "text-slate-600")}>
                            {t}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Results Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-editorial-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-700"
              >
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Filters</span>
                {totalActiveFilterCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]">
                    {totalActiveFilterCount}
                  </span>
                )}
              </button>

              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{paginatedPosts.length}</strong> of{" "}
                <strong className="text-slate-900">{filteredPosts.length}</strong> articles
              </span>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as JournalSortOption);
                    setCurrentPage(1);
                  }}
                  className="h-8 pl-2.5 pr-7 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
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
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md transition-all relative overflow-hidden group">
                <div className="space-y-4 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
                      {featuredPost.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {featuredPost.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Featured Spotlight</span>
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 group-hover:text-blue-600 transition-colors leading-tight">
                    <Link href={`/journal/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-base leading-relaxed font-normal">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-semibold">{featuredPost.author.name}</span>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">{featuredPost.readTime}</span>
                    </div>

                    <Link
                      href={`/journal/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 font-display font-bold text-blue-600 group-hover:text-blue-700"
                    >
                      <span>Read White Paper</span>
                      <ArrowRight className="w-4 h-4 arrow-slide" />
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
              <div className="py-16 px-6 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="font-display font-bold text-lg text-slate-900">
                  No matching journal entries found
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-editorial btn-editorial-blue px-5 py-2.5 text-xs shadow-editorial-xs cursor-pointer"
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
      </main>

      <IndiseaFooter />
    </div>
  );
}
