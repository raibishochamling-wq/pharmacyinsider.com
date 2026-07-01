import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const row = await db.blogSetting.findUnique({ where: { key: "adminPassword" } });
    const stored = row?.value || "admin123";
    if (password === stored) {
      return NextResponse.json({
        success: true,
        token: Buffer.from(`admin:${Date.now()}`).toString("base64"),
      });
    }
    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
