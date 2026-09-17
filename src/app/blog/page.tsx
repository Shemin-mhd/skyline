"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, X, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blog-store";

export default function BlogListingPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allPosts = useMemo(() => getAllBlogPosts(), []);
  const categories = useMemo(() => getBlogCategories(), []);

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white">
      {/* Global Fixed Header */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main>
        {/* Header Section - Matches Site Container (1600px) */}
        <section className="w-full bg-[#FAF9F6] border-b border-gray-200/80 pt-10 pb-8">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            {/* Top Row: Title on Left, Search on Right */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
                  SKYLINK ACOUSTICS • EDITORIAL
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111] uppercase tracking-tight">
                  Our Blog &amp; Articles
                </h1>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Engineering blueprints, room decoupling physics, reverberation control, and turnkey interior fit-out guides across Bahrain.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, STC, cinema..."
                  className="w-full bg-white border border-gray-300 rounded-full pl-10 pr-9 py-2.5 text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-0.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-gray-500 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Blogs Grid Listing */}
        <section className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500">
              Showing All Articles ({filteredPosts.length})
            </h2>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs font-semibold text-black underline cursor-pointer"
              >
                Clear search filter
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAF9F6] rounded-2xl border border-gray-200 p-8 max-w-lg mx-auto">
              <p className="text-gray-600 text-sm mb-4">No articles found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white border border-gray-200/90 rounded-2xl overflow-hidden hover:border-gray-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <Link href={`/blog/${post.slug}`} className="block relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-black shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold text-[#111] group-hover:text-gray-600 transition-colors leading-snug mb-3 line-clamp-2 uppercase">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-200"
                      />
                      <span className="text-xs font-semibold text-gray-800 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
