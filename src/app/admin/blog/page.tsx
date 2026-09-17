"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  RefreshCw,
  FileText,
  ExternalLink,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";
import { BlogPost } from "@/lib/blog-store";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState<boolean>(false);
  const [blogSearch, setBlogSearch] = useState<string>("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("all");

  const [isBlogModalOpen, setIsBlogModalOpen] = useState<boolean>(false);
  const [blogModalMode, setBlogModalMode] = useState<"add" | "edit">("add");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "Acoustic Engineering",
    excerpt: "",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    authorName: "Eng. Tariq Al-Hashimi",
    authorRole: "Chief Acoustic Consultant",
    contentText: "",
  });

  const fetchBlogs = async () => {
    try {
      setIsLoadingBlogs(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      if (blogCategoryFilter !== "all" && b.category.toLowerCase() !== blogCategoryFilter.toLowerCase()) return false;
      if (blogSearch.trim()) {
        const q = blogSearch.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.slug.toLowerCase().includes(q) ||
          (b.author?.name || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [blogs, blogCategoryFilter, blogSearch]);

  const handleOpenAddBlog = () => {
    setBlogModalMode("add");
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      slug: "",
      category: "Acoustic Engineering",
      excerpt: "",
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      authorName: "Eng. Tariq Al-Hashimi",
      authorRole: "Chief Acoustic Consultant",
      contentText: "",
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b: BlogPost) => {
    setBlogModalMode("edit");
    setEditingBlogId(b.id);
    const textContent =
      b.content && b.content.length > 0
        ? b.content
            .map((c) => ("text" in c ? c.text : ""))
            .filter(Boolean)
            .join("\n\n")
        : b.excerpt;

    setBlogForm({
      title: b.title,
      slug: b.slug,
      category: b.category,
      excerpt: b.excerpt,
      readTime: b.readTime,
      coverImage: b.coverImage,
      authorName: b.author?.name || "Skylink Editorial Team",
      authorRole: b.author?.role || "Acoustic Consultant",
      contentText: textContent,
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const paragraphs = blogForm.contentText
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean)
        .map((text) => ({ type: "paragraph" as const, text }));

      const payload = {
        title: blogForm.title,
        slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        category: blogForm.category,
        excerpt: blogForm.excerpt,
        readTime: blogForm.readTime,
        coverImage: blogForm.coverImage,
        author: {
          name: blogForm.authorName,
          role: blogForm.authorRole,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        },
        content: paragraphs.length > 0 ? paragraphs : undefined,
      };

      if (blogModalMode === "add") {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          fetchBlogs();
          setIsBlogModalOpen(false);
        }
      } else if (blogModalMode === "edit" && editingBlogId) {
        const res = await fetch("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: editingBlogId }),
        });
        const data = await res.json();
        if (data.success) {
          fetchBlogs();
          setIsBlogModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
  };

  const handleConfirmDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      const res = await fetch(`/api/blogs?id=${blogToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== blogToDelete.id));
        setBlogToDelete(null);
      }
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Header Banner */}
      <div className="bg-white p-4 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Blog &amp; Knowledge Base CMS
            </h3>
            <p className="text-xs text-slate-500">
              Manage acoustic engineering case studies, STC guides, and technical articles
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAddBlog}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles, topics, authors..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
          />
          {blogSearch && (
            <button
              onClick={() => setBlogSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={blogCategoryFilter}
            onChange={(e) => setBlogCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="all">All Categories ({blogs.length})</option>
            <option value="Acoustic Engineering">Acoustic Engineering</option>
            <option value="Home Theater">Home Theater</option>
            <option value="Gym Flooring">Gym Flooring</option>
            <option value="Luxury Ceilings">Luxury Ceilings</option>
            <option value="Fit-Out">Fit-Out</option>
          </select>
        </div>
      </div>

      {/* Dynamic Articles Grid */}
      {isLoadingBlogs && blogs.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-900 mb-2" />
          <span>Loading articles catalog...</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="p-12 text-center bg-slate-50/50 border border-slate-200 rounded-xl space-y-3">
          <FileText className="w-8 h-8 text-slate-300 mx-auto" />
          <div className="text-sm font-bold text-slate-700">No articles found</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {blogSearch || blogCategoryFilter !== "all"
              ? "No articles match your current search and filter settings."
              : "You currently have no published blog posts. Click below to draft your first guide."}
          </p>
          <button
            onClick={handleOpenAddBlog}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {filteredBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-900/60 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                      {b.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 bg-white/95 text-slate-800 text-[10px] font-semibold rounded-full shadow-xs">
                      {b.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    /{b.slug}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-slate-900 transition-colors leading-snug line-clamp-2">
                    {b.title}
                  </h4>

                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                    {b.excerpt}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-400">
                    <span>By {b.author?.name || "Skylink"}</span>
                    <span>•</span>
                    <span>{new Date(b.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/blog/${b.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-slate-900 hover:text-black flex items-center gap-1 transition-colors"
                >
                  <span>Live View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditBlog(b)}
                    title="Edit Article"
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setBlogToDelete(b)}
                    title="Delete Article"
                    className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Add / Edit Blog */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {blogModalMode === "add" ? "Draft New Article" : "Edit Article"}
                  </h3>
                  <p className="text-[11px] text-slate-400">Manage article metadata, cover image, and body content</p>
                </div>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STC 65+ Sound Isolation Standards for Luxury Private Cinemas"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  >
                    <option value="Acoustic Engineering">Acoustic Engineering</option>
                    <option value="Home Theater">Home Theater</option>
                    <option value="Gym Flooring">Gym Flooring</option>
                    <option value="Luxury Ceilings">Luxury Ceilings</option>
                    <option value="Fit-Out">Fit-Out</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 min read"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={blogForm.coverImage}
                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief 1-2 sentence preview for search results and social cards..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.authorName}
                    onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={blogForm.authorRole}
                    onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Article Body Content (Paragraphs)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write the article content here. Separate paragraphs with double newlines (Enter twice)..."
                  value={blogForm.contentText}
                  onChange={(e) => setBlogForm({ ...blogForm, contentText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{blogModalMode === "add" ? "Publish Article" : "Update Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Blog Confirmation */}
      {blogToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Delete Blog Article?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently delete <strong className="text-slate-900">{blogToDelete.title}</strong>?
              </p>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-700 text-left mt-2">
                This will immediately remove the article from the public blog and search results.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBlogToDelete(null)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer text-xs text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteBlog}
                className="w-1/2 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
