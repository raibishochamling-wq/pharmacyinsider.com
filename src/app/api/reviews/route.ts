import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") === "true";
    const reviews = await db.review.findMany({
      where: publishedOnly ? { isPublished: true } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ reviews });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const review = await db.review.create({
      data: {
        name: body.name,
        meta: body.meta || null,
        initials: body.initials || body.name?.slice(0, 2).toUpperCase() || "?",
        rating: Number(body.rating) || 5,
        title: body.title || "",
        text: body.text || "",
        ownerResponse: body.ownerResponse || null,
        isPublished: body.isPublished ?? true,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
