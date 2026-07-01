import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // id can be either a cuid or a slug
    const post = await db.post.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Increment views (only if query param says so)
    const { searchParams } = new URL(req.url);
    if (searchParams.get("track") === "true") {
      await db.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      });
    }
    return NextResponse.json({ post });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const update: any = {};
    const fields = ["title","slug","excerpt","content","coverImage","category","tags","author","isPublished","isFeatured","readMinutes","views"];
    for (const f of fields) {
      if (body[f] !== undefined) update[f] = body[f];
    }
    if (body.publishedAt) update.publishedAt = new Date(body.publishedAt);

    const post = await db.post.update({ where: { id }, data: update });
    return NextResponse.json({ post });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
