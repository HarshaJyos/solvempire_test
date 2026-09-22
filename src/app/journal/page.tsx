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
  ArrowLeft,
  ArrowUpRight,
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
    <div className="min-h-screen w-full flex flex-col bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] relative selection:bg-[#3b82f6] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0f0f10] hover:text-[#3b82f6] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; BACK TO INDEX</span>
        </Link>

        {/* Hero Title Section */}
        <div className="space-y-4 mb-10 text-left border-b-2 border-[#0f0f10] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3b82f6] text-white border-2 border-[#0f0f10] font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SOLVEMPIRE ENGINEERING JOURNAL // DISPATCHES</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-[#0f0f10] tracking-tight uppercase leading-[0.95]">
            ENGINEERING IN PUBLIC. <br />
            <span className="text-[#3b82f6]">DOCUMENTING THE SCIENCE &amp; SYSTEMS.</span>
          </h1>

          <p className="font-mono text-xs sm:text-sm text-[#3f3f46] max-w-3xl leading-relaxed font-medium">
            Hardware teardowns, embedded firmware architecture, DFM principles, and deep dives into connected physical products engineered at SolveMpire.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 group">
          <div className="relative flex items-center bg-white border-2 border-[#0f0f10] shadow-brutal-sm focus-within:shadow-brutal-md transition-all">
            <div className="pl-4 sm:pl-5 text-[#0f0f10]">
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
              className="w-full h-14 sm:h-16 pl-3.5 pr-28 bg-transparent text-[#0f0f10] placeholder-[#71717a] font-mono text-xs sm:text-sm uppercase tracking-wide focus:outline-none"
            />

            <div className="absolute right-3.5 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="p-1.5 border border-[#0f0f10] bg-[#f7f6f2] text-[#0f0f10] hover:bg-[#0f0f10] hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <span className="hidden sm:inline-block px-2.5 py-1 bg-[#f0f7ff] border border-[#0f0f10] text-[11px] font-mono font-bold text-[#0f0f10]">
                {filteredPosts.length} {filteredPosts.length === 1 ? "RESULT" : "RESULTS"}
              </span>
            </div>
          </div>

          {/* Mobile Active Filter Chips Tray */}
          {isFiltering && (
            <div className="lg:hidden flex flex-wrap items-center gap-1.5 pt-3 font-mono">
              <span className="text-[11px] font-bold text-[#71717a] uppercase mr-1">ACTIVE:</span>
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#3b82f6] text-white border border-[#0f0f10] text-xs font-bold uppercase">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery("")} aria-label="Clear query filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedAuthors.map((author) => (
                <span
                  key={author}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#0f0f10] text-xs font-bold text-[#0f0f10] uppercase"
                >
                  <span>AUTHOR: {author}</span>
                  <button onClick={() => toggleAuthor(author)} aria-label={`Remove ${author} filter`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#3b82f6] text-white border border-[#0f0f10] text-xs font-bold uppercase"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f7f6f2] text-[#0f0f10] border border-[#0f0f10] text-xs font-bold uppercase"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f0f7ff] text-[#0f0f10] border border-[#0f0f10] text-xs font-bold uppercase"
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
                className="text-xs text-[#dc2626] font-bold uppercase hover:underline ml-1 py-1 cursor-pointer"
              >
                RESET ALL
              </button>
            </div>
          )}
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ========================================================= */}
          {/* DESKTOP SIDEBAR FILTERS */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5 sticky top-28 font-mono">
            <div className="bg-white border-2 border-[#0f0f10] p-5 shadow-brutal-md space-y-5">
              {/* Filter Panel Header */}
              <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#0f0f10]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#3b82f6]" />
                  <h2 className="font-display font-black text-sm tracking-wider uppercase text-[#0f0f10]">
                    INDEX FILTERS
                  </h2>
                </div>

                {isFiltering && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-[#dc2626] hover:underline uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Applied Filter Chips */}
              {isFiltering && (
                <div className="space-y-2 pb-3.5 border-b border-[#0f0f10]/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">
                    ACTIVE SELECTIONS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {searchQuery.trim() && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3b82f6] text-white border border-[#0f0f10] text-[11px] font-bold uppercase">
                        <span>&quot;{searchQuery}&quot;</span>
                        <button onClick={() => setSearchQuery("")}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {selectedAuthors.map((author) => (
                      <span
                        key={author}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f0f7ff] text-[#0f0f10] border border-[#0f0f10] text-[11px] font-bold uppercase"
                      >
                        <span>{author}</span>
                        <button onClick={() => toggleAuthor(author)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#3b82f6] text-white border border-[#0f0f10] text-[11px] font-bold uppercase"
                      >
                        <span>{cat}</span>
                        <button onClick={() => toggleCategory(cat)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedTypes.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f7f6f2] text-[#0f0f10] border border-[#0f0f10] text-[11px] font-bold uppercase"
                      >
                        <span>{t}</span>
                        <button onClick={() => toggleType(t)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-white text-[#0f0f10] border border-[#0f0f10] text-[11px] font-bold uppercase"
                      >
                        <span>#{tag}</span>
                        <button onClick={() => toggleTag(tag)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter Group: Authors */}
              {availableAuthors.length > 0 && (
                <div className="space-y-3 pb-3.5 border-b border-[#0f0f10]/20">
                  <button
                    type="button"
                    onClick={() => setAuthorOpen(!authorOpen)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="font-display font-black text-xs uppercase tracking-wider text-[#0f0f10]">
                      AUTHORS
                    </span>
                    {authorOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#0f0f10]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#0f0f10]" />
                    )}
                  </button>

                  {authorOpen && (
                    <div className="space-y-1.5 pt-1">
                      {availableAuthors.map((author) => {
                        const isChecked = selectedAuthors.includes(author.name);
                        const count = getAuthorCount(author.name);
                        return (
                          <label
                            key={author.name}
                            onClick={() => toggleAuthor(author.name)}
                            className="flex items-center justify-between p-1.5 hover:bg-[#f0f7ff] border border-transparent hover:border-[#0f0f10] transition-colors cursor-pointer select-none text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "w-3.5 h-3.5 border border-[#0f0f10] flex items-center justify-center transition-all",
                                  isChecked ? "bg-[#3b82f6] text-white" : "bg-white"
                                )}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className={cn(isChecked ? "text-[#0f0f10] font-bold" : "text-[#3f3f46]")}>
                                {author.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#71717a]">[{count}]</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Filter Group: Categories */}
              <div className="space-y-3 pb-3.5 border-b border-[#0f0f10]/20">
                <button
                  type="button"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-display font-black text-xs uppercase tracking-wider text-[#0f0f10]">
                    CATEGORIES
                  </span>
                  {categoryOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#0f0f10]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0f0f10]" />
                  )}
                </button>

                {categoryOpen && (
                  <div className="space-y-1.5 pt-1">
                    {availableCategories.map((cat) => {
                      const isChecked = selectedCategories.includes(cat);
                      const count = getCategoryCount(cat);
                      return (
                        <label
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className="flex items-center justify-between p-1.5 hover:bg-[#f0f7ff] border border-transparent hover:border-[#0f0f10] transition-colors cursor-pointer select-none text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-3.5 h-3.5 border border-[#0f0f10] flex items-center justify-center transition-all",
                                isChecked ? "bg-[#3b82f6] text-white" : "bg-white"
                              )}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={cn(isChecked ? "text-[#0f0f10] font-bold" : "text-[#3f3f46]")}>
                              {cat}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#71717a]">[{count}]</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Article Type */}
              <div className="space-y-3 pb-3.5 border-b border-[#0f0f10]/20">
                <button
                  type="button"
                  onClick={() => setTypeOpen(!typeOpen)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <span className="font-display font-black text-xs uppercase tracking-wider text-[#0f0f10]">
                    SPEC TYPE
                  </span>
                  {typeOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#0f0f10]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0f0f10]" />
                  )}
                </button>

                {typeOpen && (
                  <div className="space-y-1.5 pt-1">
                    {availableTypes.map((t) => {
                      const isChecked = selectedTypes.includes(t);
                      const count = getTypeCount(t);
                      return (
                        <label
                          key={t}
                          onClick={() => toggleType(t)}
                          className="flex items-center justify-between p-1.5 hover:bg-[#f0f7ff] border border-transparent hover:border-[#0f0f10] transition-colors cursor-pointer select-none text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-3.5 h-3.5 border border-[#0f0f10] flex items-center justify-center transition-all",
                                isChecked ? "bg-[#3b82f6] text-white" : "bg-white"
                              )}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={cn(isChecked ? "text-[#0f0f10] font-bold" : "text-[#3f3f46]")}>
                              {t}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#71717a]">[{count}]</span>
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
                    <span className="font-display font-black text-xs uppercase tracking-wider text-[#0f0f10]">
                      TAGS &amp; TOPICS
                    </span>
                    {tagsOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#0f0f10]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#0f0f10]" />
                    )}
                  </button>

                  {tagsOpen && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {availableTags.map(({ tag, count }) => {
                        const isChecked = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={cn(
                              "px-2 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer border",
                              isChecked
                                ? "bg-[#3b82f6] text-white border-[#0f0f10]"
                                : "bg-white text-[#0f0f10] border-[#0f0f10]/30 hover:border-[#0f0f10]"
                            )}
                          >
                            #{tag} <span className="opacity-60 text-[9px]">[{count}]</span>
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
            {/* Action Toolbar */}
            <div className="p-3.5 sm:p-4 bg-white border-2 border-[#0f0f10] shadow-brutal-sm flex flex-wrap items-center justify-between gap-3 font-mono">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3 py-2 bg-white border-2 border-[#0f0f10] text-xs font-bold text-[#0f0f10] shadow-brutal-xs"
              >
                <Filter className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>FILTERS</span>
                {totalActiveFilterCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#3b82f6] text-white text-[10px]">
                    {totalActiveFilterCount}
                  </span>
                )}
              </button>

              {/* Status Counter */}
              <div className="text-xs text-[#71717a] uppercase font-bold">
                SHOWING <span className="text-[#0f0f10]">{paginatedPosts.length}</span> OF{" "}
                <span className="text-[#0f0f10]">{filteredPosts.length}</span> SPECIFICATIONS
              </div>

              {/* Desktop Sort Control */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#71717a] uppercase">SORT:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as JournalSortOption);
                      setCurrentPage(1);
                    }}
                    aria-label="Sort journal entries"
                    className="h-8 pl-2 pr-7 bg-[#f0f7ff] border border-[#0f0f10] text-xs font-bold text-[#0f0f10] uppercase focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="newest">NEWEST FIRST</option>
                    <option value="oldest">OLDEST FIRST</option>
                    <option value="shortest">QUICK READ</option>
                    <option value="longest">DEEP DIVE</option>
                    <option value="alphabetical">TITLE (A-Z)</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0f0f10] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Featured Spotlight Card */}
            {featuredPost && (
              <div className="p-6 sm:p-8 bg-white border-2 border-[#0f0f10] shadow-brutal-lg relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#0f0f10]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-[#3b82f6] text-white text-xs font-mono font-bold uppercase border border-[#0f0f10]">
                        {featuredPost.category}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#f7f6f2] text-[#0f0f10] text-xs font-mono font-bold uppercase border border-[#0f0f10]">
                        {featuredPost.type}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-[#0f0f10] bg-[#f5c518] px-2.5 py-0.5 border border-[#0f0f10] uppercase">
                      <Sparkles className="w-3.5 h-3.5 fill-[#0f0f10]" />
                      <span>FEATURED SPOTLIGHT</span>
                    </span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0f0f10] group-hover:text-[#3b82f6] transition-colors leading-tight uppercase tracking-tight">
                    <Link href={`/journal/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-[#3f3f46] text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#0f0f10]/10 text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 overflow-hidden border border-[#0f0f10] shrink-0 bg-[#f0f7ff]">
                        {featuredPost.author.avatar ? (
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#0f0f10] text-xs font-black uppercase">
                            {featuredPost.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#0f0f10] font-bold">{featuredPost.author.name}</span>
                        <span className="text-[#71717a]">•</span>
                        <span className="text-[#3b82f6] font-bold">{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <Link
                      href={`/journal/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono font-bold text-xs uppercase text-[#0f0f10] group-hover:text-[#3b82f6] transition-colors"
                    >
                      <span>READ WHITE PAPER</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <div className="py-16 px-6 text-center bg-white border-2 border-[#0f0f10] shadow-brutal-md space-y-4 font-mono">
                <div className="w-12 h-12 border-2 border-[#0f0f10] bg-[#f0f7ff] flex items-center justify-center text-[#0f0f10] mx-auto shadow-brutal-xs">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-display font-black text-xl text-[#0f0f10] uppercase">
                    NO MATCHING SPECIFICATIONS FOUND
                  </p>
                  <p className="text-xs text-[#71717a] max-w-md mx-auto">
                    Try adjusting search query or clearing selected author and topic filters.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#3b82f6] text-white border-2 border-[#0f0f10] font-mono text-xs font-bold uppercase shadow-brutal-xs hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                >
                  RESET ALL FILTERS
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

        {/* Mobile Slide-Over Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 font-mono lg:hidden animate-fade-in-scale">
            <div className="fixed inset-0" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto bg-white border-t-4 border-[#0f0f10] p-6 space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#0f0f10]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#3b82f6]" />
                  <h3 className="font-display font-black text-base text-[#0f0f10] uppercase">
                    INDEX FILTERS
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 border border-[#0f0f10] bg-[#f7f6f2] text-[#0f0f10]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer: Categories */}
              <div className="space-y-2">
                <h4 className="font-display font-black text-xs uppercase text-[#71717a]">
                  CATEGORIES
                </h4>
                <div className="space-y-1.5">
                  {availableCategories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={cn(
                          "w-full flex items-center justify-between p-2.5 border-2 text-xs font-bold uppercase cursor-pointer",
                          isChecked
                            ? "bg-[#3b82f6] text-white border-[#0f0f10]"
                            : "bg-white text-[#0f0f10] border-[#0f0f10]/30"
                        )}
                      >
                        <span>{cat}</span>
                        <span>[{getCategoryCount(cat)}]</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="pt-4 border-t-2 border-[#0f0f10] flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 bg-[#f7f6f2] border-2 border-[#0f0f10] text-xs font-bold uppercase text-[#0f0f10] cursor-pointer"
                >
                  CLEAR
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#3b82f6] border-2 border-[#0f0f10] text-white text-xs font-bold uppercase cursor-pointer shadow-brutal-xs"
                >
                  APPLY ({filteredPosts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Engineering Scoping CTA Section */}
        <div className="mt-20 p-8 sm:p-12 bg-white border-2 border-[#0f0f10] shadow-brutal-lg text-center space-y-6">
          <div className="inline-flex items-center justify-center px-3 py-1 bg-[#3b82f6] text-white border-2 border-[#0f0f10] font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-xs mx-auto">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            <span>SOLVEMPIRE RAPID SCOPING</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-[#0f0f10] uppercase tracking-tight">
              HAVE AN ENGINEERING PROJECT TO BUILD?
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#3f3f46] max-w-xl mx-auto leading-relaxed">
              Connect directly with our engineering architects to scope your custom enclosure CAD, multi-layer PCB, embedded firmware, or IoT platform.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#3b82f6] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 border-2 border-[#0f0f10] shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span>SCOPE YOUR PROJECT IN 60S</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
