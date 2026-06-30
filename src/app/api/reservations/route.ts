import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ reservations });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const reservation = await db.reservation.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        date: body.date,
        time: body.time,
        guests: Number(body.guests) || 2,
        notes: body.notes || null,
        status: "pending",
      },
    });
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
