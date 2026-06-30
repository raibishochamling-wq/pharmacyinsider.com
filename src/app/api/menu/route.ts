import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const items = await db.menuItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item = await db.menuItem.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: body.price || "",
        category: body.category || "Main",
        tag: body.tag || null,
        badge: body.badge || null,
        image: body.image || null,
        alt: body.alt || null,
        isFeatured: body.isFeatured ?? false,
        isAvailable: body.isAvailable ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
