import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [menuItems, reviews, reservations] = await Promise.all([
      db.menuItem.count(),
      db.review.count(),
      db.reservation.count(),
    ]);

    const publishedReviews = await db.review.count({
      where: { isPublished: true },
    });
    const availableItems = await db.menuItem.count({
      where: { isAvailable: true },
    });
    const pendingReservations = await db.reservation.count({
      where: { status: "pending" },
    });

    // Average rating
    const allReviews = await db.review.findMany({
      where: { isPublished: true },
      select: { rating: true },
    });
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
        : 0;

    // Recent reviews
    const recentReviews = await db.review.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    // Recent reservations
    const recentReservations = await db.reservation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      stats: {
        menuItems,
        availableItems,
        reviews,
        publishedReviews,
        avgRating: Number(avgRating.toFixed(1)),
        reservations,
        pendingReservations,
      },
      recentReviews,
      recentReservations,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
