import initialBlogPosts from "../../data/blog-posts.json";
import { db } from "./firebase";
import { collection, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; quote: string; author?: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Acoustic Engineering" | "Home Theater" | "Gym Flooring" | "Luxury Ceilings" | "Fit-Out" | string;
  author: BlogAuthor;
  publishedAt: string; // ISO String
  readTime: string; // e.g., "5 min read"
  coverImage: string;
  tags: string[];
  summary: string;
  content: BlogContentBlock[];
}

// In-memory array of blog posts sorted by published date
let blogPosts: BlogPost[] = (initialBlogPosts as unknown as BlogPost[]).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

// Save to local JSON file safely in server environment
function persistToFile() {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(process.cwd(), "data", "blog-posts.json");
      fs.writeFileSync(filePath, JSON.stringify(blogPosts, null, 2), "utf-8");
    } catch (e) {
      console.warn("[blog-store] Warning saving blog-posts.json:", e);
    }
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getFeaturedBlogPost(): BlogPost | undefined {
  return blogPosts[0];
}

export function getBlogCategories(): string[] {
  const set = new Set<string>();
  blogPosts.forEach((p) => {
    if (p.category) set.add(p.category);
  });
  return ["All", ...Array.from(set)];
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (!category || category === "All") return blogPosts;
  return blogPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedBlogPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, limit);
}

export function searchBlogPosts(queryStr: string): BlogPost[] {
  if (!queryStr || !queryStr.trim()) return blogPosts;
  const q = queryStr.toLowerCase().trim();

  return blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.author.name.toLowerCase().includes(q)
  );
}

// ── CRUD OPERATIONS (Used by Admin Panel) ──

export function addBlogPost(data: Omit<BlogPost, "id" | "publishedAt"> & { id?: string; publishedAt?: string }): BlogPost {
  const id = data.id || `post-${Date.now()}`;
  const slug =
    data.slug?.trim() ||
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const newPost: BlogPost = {
    ...data,
    id,
    slug,
    publishedAt: data.publishedAt || new Date().toISOString(),
    readTime: data.readTime || "5 min read",
    coverImage: data.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tags: data.tags || ["Acoustics", data.category || "General"],
    summary: data.summary || data.excerpt || "",
    author: data.author || {
      name: "Skylink Editorial Team",
      role: "Acoustic Consultant",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    content:
      data.content && data.content.length > 0
        ? data.content
        : [
            { type: "paragraph", text: data.excerpt || "Article content details." },
            { type: "heading2", text: "Engineering Overview" },
            { type: "paragraph", text: "Professional acoustic insulation and spatial acoustic treatment in Bahrain." },
          ],
  };

  blogPosts.unshift(newPost);
  persistToFile();

  // Async sync to Firebase Firestore
  if (db) {
    try {
      setDoc(doc(db, "blogs", newPost.id), newPost).catch((err) =>
        console.warn("[Firebase] Error saving blog to Firestore:", err)
      );
    } catch (err) {
      console.warn("[Firebase] Init error saving blog:", err);
    }
  }

  return newPost;
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const idx = blogPosts.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  blogPosts[idx] = {
    ...blogPosts[idx],
    ...updates,
  };

  persistToFile();

  // Async update in Firebase Firestore
  if (db) {
    try {
      updateDoc(doc(db, "blogs", id), updates as any).catch((err) =>
        console.warn("[Firebase] Error updating blog in Firestore:", err)
      );
    } catch (err) {
      console.warn("[Firebase] Init error updating blog:", err);
    }
  }

  return blogPosts[idx];
}

export function deleteBlogPost(id: string): boolean {
  const originalLength = blogPosts.length;
  blogPosts = blogPosts.filter((p) => p.id !== id);

  if (blogPosts.length === originalLength) return false;

  persistToFile();

  // Async delete from Firebase Firestore
  if (db) {
    try {
      deleteDoc(doc(db, "blogs", id)).catch((err) =>
        console.warn("[Firebase] Error deleting blog in Firestore:", err)
      );
    } catch (err) {
      console.warn("[Firebase] Init error deleting blog:", err);
    }
  }

  return true;
}
