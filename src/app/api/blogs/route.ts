import { NextRequest, NextResponse } from "next/server";
import {
  getAllBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/blog-store";

export async function GET() {
  try {
    const blogs = getAllBlogPosts();
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    return NextResponse.json({ success: false, error: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: "Blog title is required" }, { status: 400 });
    }

    const created = addBlogPost({
      title: body.title,
      slug: body.slug,
      category: body.category || "Acoustic Engineering",
      excerpt: body.excerpt || "",
      summary: body.summary || body.excerpt || "",
      readTime: body.readTime || "5 min read",
      coverImage: body.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      tags: body.tags || [body.category || "Acoustics"],
      author: body.author || {
        name: "Skylink Editorial Team",
        role: "Acoustic Consultant",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      content: body.content,
    });

    return NextResponse.json({ success: true, blog: created }, { status: 201 });
  } catch (err) {
    console.error("POST /api/blogs error:", err);
    return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Blog ID is required" }, { status: 400 });
    }

    const updated = updateBlogPost(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (err) {
    console.error("PUT /api/blogs error:", err);
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Blog ID is required" }, { status: 400 });
    }

    const success = deleteBlogPost(id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/blogs error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}
