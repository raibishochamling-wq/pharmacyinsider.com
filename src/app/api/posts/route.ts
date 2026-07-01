import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const publishedOnly = searchParams.get("published") !== "false";
    const featuredOnly = searchParams.get("featured") === "true";
    const limit = searchParams.get("limit");

    const where: any = {};
    if (publishedOnly) where.isPublished = true;
    if (featuredOnly) where.isFeatured = true;
    if (category && category !== "All") where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    let query = db.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });
    let posts = await query;
    if (limit) posts = posts.slice(0, Number(limit));

    return NextResponse.json({ posts });
  } catch (e: any) {
    console.error("API /api/posts GET error:", e?.message, e?.stack);
    return NextResponse.json({ error: "Failed to fetch posts", detail: e?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const post = await db.post.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt || "",
        content: body.content || "",
        coverImage: body.coverImage || null,
        category: body.category || "General Health",
        tags: body.tags || "",
        author: body.author || "PharmacyInsider",
        isPublished: body.isPublished ?? true,
        isFeatured: body.isFeatured ?? false,
        readMinutes: body.readMinutes || Math.max(3, Math.round((body.content || "").split(/\s+/).length / 200)),
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
