"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
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
  User,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 4;

export default function JournalPage() {
  const manifest = getJournalManifest();
  const allPosts = useMemo(() => getAllJournalPosts(), []);

  // Filter State (Strictly persisted until reset)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<JournalSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Accordion open states for filter groups
  const [authorOpen, setAuthorOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);

  // Derive unique authors with counts from allPosts
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

  // Determine if any filters are active
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

  // Apply filters and sorting
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

  // Pagination calculation with edge-case clamping
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const activePage = Math.min(Math.max(1, currentPage), totalPages);

  // Clamp current page when filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (activePage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, activePage]);

  // Featured Spotlight Post (displayed on page 1 when not actively searching)
  const featuredPost = useMemo(() => {
    if (isFiltering || activePage !== 1) return null;
    return allPosts.find((p) => p.featured);
  }, [isFiltering, activePage, allPosts]);

  // Filter Toggle Handlers
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

  // Reset all filters
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
    <div className="min-h-screen w-full flex flex-col bg-canvas text-heading relative selection:bg-brand/15 selection:text-brand">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors mb-6 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Title Section */}
        <div className="space-y-3 mb-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-light border border-brand/20 text-xs font-semibold text-brand">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SolveMpire Engineering Journal</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl text-heading tracking-tight leading-[1.15]">
            Engineering in public. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-heading via-slate-700 to-brand">
              Documenting the science &amp; systems.
            </span>
          </h1>

          <p className="font-body text-body text-sm sm:text-base max-w-2xl leading-relaxed">
            Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected product engineering.
          </p>
        </div>


        {/* Breathable Floating Search Bar */}
        <div className="relative mb-8 group">
          <div className="relative flex items-center rounded-2xl bg-surface border border-hairline focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 transition-all duration-200 shadow-sm">
            <div className="pl-4 sm:pl-5 text-muted group-focus-within:text-brand transition-colors">
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
              className="w-full h-14 sm:h-16 pl-3.5 pr-28 rounded-2xl bg-transparent text-heading placeholder-muted text-sm sm:text-base font-body focus:outline-none"
            />

            <div className="absolute right-3.5 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="p-1.5 rounded-lg text-muted hover:text-heading hover:bg-canvas transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-surface-subtle border border-hairline text-[11px] font-mono text-muted">
                {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}
              </span>
            </div>
          </div>

          {/* Mobile Active Filter Chips Tray */}
          {isFiltering && (
            <div className="lg:hidden flex flex-wrap items-center gap-1.5 pt-3">
              <span className="text-[11px] font-semibold text-muted mr-1">Active:</span>
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery("")} aria-label="Clear query filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedAuthors.map((author) => (
                <span
                  key={author}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                >
                  <span>Author: {author}</span>
                  <button onClick={() => toggleAuthor(author)} aria-label={`Remove ${author} filter`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                >
                  <span>{cat}</span>
                  <button onClick={() => toggleCategory(cat)} aria-label={`Remove ${cat} filter`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedTypes.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                >
                  <span>{t}</span>
                  <button onClick={() => toggleType(t)} aria-label={`Remove ${t} filter`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                >
                  <span>#{tag}</span>
                  <button onClick={() => toggleTag(tag)} aria-label={`Remove ${tag} tag`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-brand hover:underline font-semibold ml-1 py-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Flipkart-Style 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ========================================================= */}
          {/* DESKTOP SIDEBAR FILTERS (Flipkart Style) */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5 sticky top-6">
            <div className="rounded-2xl bg-surface border border-hairline p-5 shadow-xs space-y-5">
              {/* Filter Panel Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand" />
                  <h2 className="font-display font-bold text-sm tracking-wider uppercase text-heading">
                    Filters
                  </h2>
                </div>

                {isFiltering && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-brand hover:text-brand-hover uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Applied Filter Chips (Tray) */}
              {isFiltering && (
                <div className="space-y-2 pb-3.5 border-b border-hairline">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Active Filters
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {searchQuery.trim() && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium">
                        <span>&quot;{searchQuery}&quot;</span>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="hover:text-brand-hover"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {selectedAuthors.map((author) => (
                      <span
                        key={author}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                      >
                        <span>Author: {author}</span>
                        <button
                          onClick={() => toggleAuthor(author)}
                          className="hover:text-brand-hover"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                      >
                        <span>{cat}</span>
                        <button
                          onClick={() => toggleCategory(cat)}
                          className="hover:text-brand-hover"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedTypes.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                      >
                        <span>{t}</span>
                        <button
                          onClick={() => toggleType(t)}
                          className="hover:text-brand-hover"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ice-light border border-brand/20 text-xs text-brand font-medium"
                      >
                        <span>#{tag}</span>
                        <button
                          onClick={() => toggleTag(tag)}
                          className="hover:text-brand-hover"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter Group: Authors */}
              {availableAuthors.length > 0 && (
                <div className="space-y-3 pb-3.5 border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setAuthorOpen(!authorOpen)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="font-display font-semibold text-xs uppercase tracking-wider text-heading">
                      Authors
                    </span>
                    {authorOpen ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </button>

                  {authorOpen && (
                    <div className="space-y-2 pt-1">
                      {availableAuthors.map((author) => {
                        const isChecked = selectedAuthors.includes(author.name);
                        const count = getAuthorCount(author.name);
                        return (
                          <label
                            key={author.name}
                            onClick={() => toggleAuthor(author.name)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-canvas transition-colors cursor-pointer select-none text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={cn(
                                  "w-4 h-4 rounded flex items-center justify-center border transition-all",
                                  isChecked
                                    ? "bg-brand border-brand text-white"
                                    : "border-hairline bg-surface-subtle"
                                )}
                              >
                                {isChecked && (
                                  <Check className="w-3 h-3 stroke-[3]" />
                                )}
                              </div>
                              <div className="relative w-5 h-5 rounded-full overflow-hidden bg-ice-light shrink-0 border border-hairline">
                                {author.avatar ? (
                                  <Image
                                    src={author.avatar}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-brand text-[9px] font-bold">
                                    {author.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <span
                                className={cn(
                                  isChecked
                                    ? "text-heading font-semibold"
                                    : "text-body"
                                )}
                              >
                                {author.name}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-muted">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Filter Group: Categories */}
              <div className="space-y-3 pb-3.5 border-b border-hairline">
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-display font-semibold text-xs uppercase tracking-wider text-heading">
                    Categories
                  </span>
                  {categoryOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </button>

                {categoryOpen && (
                  <div className="space-y-2 pt-1">
                    {availableCategories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat);
                      const count = getCategoryCount(cat);
                      return (
                        <label
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-canvas transition-colors cursor-pointer select-none text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center border transition-all",
                                isChecked
                                  ? "bg-brand border-brand text-white"
                                  : "border-hairline bg-surface-subtle"
                              )}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </div>
                            <span
                              className={cn(
                                isChecked
                                  ? "text-heading font-semibold"
                                  : "text-body"
                              )}
                            >
                              {cat}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-muted">
                            ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Article Type */}
              <div className="space-y-3 pb-3.5 border-b border-hairline">
                <button
                  type="button"
                  onClick={() => setTypeOpen(!typeOpen)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-display font-semibold text-xs uppercase tracking-wider text-heading">
                    Article Type
                  </span>
                  {typeOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </button>

                {typeOpen && (
                  <div className="space-y-2 pt-1">
                    {availableTypes.map((t) => {
                      const isChecked = selectedTypes.includes(t);
                      const count = getTypeCount(t);
                      return (
                        <label
                          key={t}
                          onClick={() => toggleType(t)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-canvas transition-colors cursor-pointer select-none text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center border transition-all",
                                isChecked
                                  ? "bg-brand border-brand text-white"
                                  : "border-hairline bg-surface-subtle"
                              )}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </div>
                            <span
                              className={cn(
                                isChecked
                                  ? "text-heading font-semibold"
                                  : "text-body"
                              )}
                            >
                              {t}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-muted">
                            ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Tags & Topics */}
              {availableTags.length > 0 && (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setTagsOpen(!tagsOpen)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="font-display font-semibold text-xs uppercase tracking-wider text-heading">
                      Topics &amp; Tags
                    </span>
                    {tagsOpen ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </button>

                  {tagsOpen && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {availableTags.map(({ tag, count }) => {
                        const isChecked = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
                              isChecked
                                ? "bg-brand text-white font-semibold shadow-xs"
                                : "bg-surface text-body border border-hairline hover:bg-canvas hover:text-heading"
                            )}
                          >
                            #{tag}{" "}
                            <span className="opacity-60 text-[10px]">
                              ({count})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN RESULTS COLUMN */}
          {/* ========================================================= */}
          <div className="lg:col-span-3 space-y-6">
            {/* Responsive Action Toolbar with Clean Hierarchy */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-hairline shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
              {/* Mobile View: Clean 2-Button Action Row */}
              <div className="flex items-center gap-2.5 sm:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-xl bg-surface border border-hairline text-xs font-semibold text-heading hover:border-brand/50 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <Filter className="w-3.5 h-3.5 text-brand" />
                  <span>Filters</span>
                  {totalActiveFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                      {totalActiveFilterCount}
                    </span>
                  )}
                </button>

                <div className="relative flex-1">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as JournalSortOption);
                      setCurrentPage(1);
                    }}
                    aria-label="Sort journal entries"
                    className="w-full h-10 pl-3 pr-8 rounded-xl bg-surface-subtle border border-hairline text-xs font-medium text-heading focus:outline-none focus:border-brand appearance-none cursor-pointer"
                  >
                    <option value="newest" className="bg-white text-heading">
                      Newest
                    </option>
                    <option value="oldest" className="bg-white text-heading">
                      Oldest
                    </option>
                    <option value="shortest" className="bg-white text-heading">
                      Quick Read
                    </option>
                    <option value="longest" className="bg-white text-heading">
                      Deep Read
                    </option>
                    <option value="alphabetical" className="bg-white text-heading">
                      Title (A-Z)
                    </option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
                </div>
              </div>

              {/* Status Counter & Reset Link */}
              <div className="flex items-center justify-between text-xs text-muted px-1 sm:px-0">
                <p>
                  Showing{" "}
                  <span className="font-semibold text-heading">
                    {paginatedPosts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-heading">
                    {filteredPosts.length}
                  </span>{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"}
                </p>

                {isFiltering && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-brand hover:underline font-medium cursor-pointer sm:hidden"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {/* Desktop Sort Control */}
              <div className="hidden sm:flex items-center gap-2.5">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Sort By:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as JournalSortOption);
                      setCurrentPage(1);
                    }}
                    aria-label="Sort journal entries"
                    className="h-9 pl-3.5 pr-8 rounded-xl bg-surface-subtle border border-hairline text-xs font-medium text-heading focus:outline-none focus:border-brand appearance-none cursor-pointer hover:border-slate-300 transition-colors"
                  >
                    <option value="newest" className="bg-white text-heading">
                      Newest First
                    </option>
                    <option value="oldest" className="bg-white text-heading">
                      Oldest First
                    </option>
                    <option value="shortest" className="bg-white text-heading">
                      Reading Time (Shortest)
                    </option>
                    <option value="longest" className="bg-white text-heading">
                      Reading Time (Longest)
                    </option>
                    <option value="alphabetical" className="bg-white text-heading">
                      Title (A-Z)
                    </option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Featured Spotlight Card (Only on Page 1 without Active Search/Filters) */}
            {featuredPost && (
              <div className="p-7 sm:p-9 rounded-3xl bg-surface border border-hairline hover:border-brand/40 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-ice-light text-brand text-xs font-semibold border border-brand/20 whitespace-nowrap">
                      {featuredPost.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-subtle text-muted text-xs font-medium border border-hairline whitespace-nowrap">
                      {featuredPost.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20 whitespace-nowrap">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Featured Spotlight</span>
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-heading group-hover:text-brand transition-colors leading-tight">
                    <Link href={`/journal/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="font-body text-body text-base sm:text-lg leading-relaxed max-w-3xl">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline text-xs sm:text-sm text-muted">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-hairline shrink-0 bg-ice-light">
                        {featuredPost.author.avatar ? (
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand text-xs font-bold uppercase">
                            {featuredPost.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Link
                          href="/team/pavan-duggirala"
                          className="text-heading font-medium hover:text-brand transition-colors whitespace-nowrap"
                        >
                          {featuredPost.author.name}
                        </Link>
                        <span className="opacity-40">•</span>
                        <span className="text-brand font-medium whitespace-nowrap">{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <Link
                      href={`/journal/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 font-display font-bold text-xs sm:text-sm text-brand group-hover:translate-x-1 transition-transform whitespace-nowrap shrink-0 ml-auto sm:ml-0"
                    >
                      <span>Read Entry</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            {paginatedPosts.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                id="journal-grid"
              >
                {paginatedPosts.map((post) => (
                  <JournalCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="py-16 px-6 text-center rounded-3xl bg-surface border border-hairline space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-surface-subtle border border-hairline flex items-center justify-center text-muted mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-display text-lg text-heading font-bold">
                    No matching journal entries found
                  </p>
                  <p className="font-body text-sm text-body max-w-md mx-auto leading-relaxed">
                    We couldn’t find any entries matching your filters. Try
                    adjusting your search query or clearing selected filters.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-all cursor-pointer shadow-md shadow-brand/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="pt-4">
                <JournalPagination
                  currentPage={activePage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    const el = document.getElementById("journal-grid");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE SLIDE-OVER FILTER DRAWER */}
        {/* ========================================================= */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in-scale">
            <div
              className="fixed inset-0"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface border-t border-hairline p-6 space-y-6 shadow-2xl">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand" />
                  <h3 className="font-display font-bold text-base text-heading">
                    Filters
                  </h3>
                  {totalActiveFilterCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-ice-light text-brand text-xs font-bold border border-brand/20">
                      {totalActiveFilterCount} Active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg text-muted hover:text-heading"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer: Authors */}
              {availableAuthors.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted">
                    Authors
                  </h4>
                  <div className="space-y-2">
                    {availableAuthors.map((author) => {
                      const isChecked = selectedAuthors.includes(author.name);
                      const count = getAuthorCount(author.name);
                      return (
                        <label
                          key={author.name}
                          onClick={() => toggleAuthor(author.name)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-surface-subtle border border-hairline cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center border",
                                isChecked
                                  ? "bg-brand border-brand text-white"
                                  : "border-hairline bg-surface"
                              )}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </div>
                            <span
                              className={
                                isChecked
                                  ? "text-heading font-bold"
                                  : "text-body"
                              }
                            >
                              {author.name}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-muted">
                            ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mobile Drawer: Categories */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted">
                  Categories
                </h4>
                <div className="space-y-2">
                  {availableCategories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    const count = getCategoryCount(cat);
                    return (
                      <label
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-surface-subtle border border-hairline cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border",
                              isChecked
                                ? "bg-brand border-brand text-white"
                                : "border-hairline bg-surface"
                            )}
                          >
                            {isChecked && (
                              <Check className="w-3 h-3 stroke-[3]" />
                            )}
                          </div>
                          <span
                            className={
                              isChecked
                                ? "text-heading font-bold"
                                : "text-body"
                            }
                          >
                            {cat}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-muted">
                          ({count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer: Article Types */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted">
                  Article Type
                </h4>
                <div className="space-y-2">
                  {availableTypes.map((t) => {
                    const isChecked = selectedTypes.includes(t);
                    const count = getTypeCount(t);
                    return (
                      <label
                        key={t}
                        onClick={() => toggleType(t)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-surface-subtle border border-hairline cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-4 h-4 rounded flex items-center justify-center border",
                              isChecked
                                ? "bg-brand border-brand text-white"
                                : "border-hairline bg-surface"
                            )}
                          >
                            {isChecked && (
                              <Check className="w-3 h-3 stroke-[3]" />
                            )}
                          </div>
                          <span
                            className={
                              isChecked
                                ? "text-heading font-bold"
                                : "text-body"
                            }
                          >
                            {t}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-muted">
                          ({count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="pt-4 border-t border-hairline flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 rounded-xl bg-surface-subtle border border-hairline text-xs font-semibold text-muted hover:text-heading cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover cursor-pointer shadow-md shadow-brand/20"
                >
                  Show ({filteredPosts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Engineering Scoping CTA Section */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-surface border border-hairline text-center space-y-6 shadow-sm">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-ice-light text-brand mx-auto border border-brand/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-heading">
              Have an Engineering Project to Build?
            </h3>
            <p className="font-body text-sm sm:text-base text-body max-w-md mx-auto leading-relaxed">
              Connect directly with our engineering architects to scope your CAD, custom PCB, firmware, or connected platform.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-brand/25 transition-all"
            >
              <span>Scope Your Project in 60s</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

