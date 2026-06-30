import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await db.review.findUnique({ where: { id } });
    if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ review });
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
    const review = await db.review.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.meta !== undefined && { meta: body.meta }),
        ...(body.initials !== undefined && { initials: body.initials }),
        ...(body.rating !== undefined && { rating: Number(body.rating) }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.text !== undefined && { text: body.text }),
        ...(body.ownerResponse !== undefined && { ownerResponse: body.ownerResponse }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
      },
    });
    return NextResponse.json({ review });
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
    await db.review.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
