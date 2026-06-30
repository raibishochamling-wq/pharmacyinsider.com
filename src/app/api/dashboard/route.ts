import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [totalPosts, publishedPosts, featuredPosts, drafts] = await Promise.all([
      db.post.count(),
      db.post.count({ where: { isPublished: true } }),
      db.post.count({ where: { isFeatured: true } }),
      db.post.count({ where: { isPublished: false } }),
    ]);

    const totalViewsAgg = await db.post.aggregate({ _sum: { views: true } });
    const totalViews = totalViewsAgg._sum.views || 0;

    // Category counts
    const allPosts = await db.post.findMany({
      select: { category: true, views: true },
      where: { isPublished: true },
    });
    const categoryStats: Record<string, { count: number; views: number }> = {};
    for (const p of allPosts) {
      if (!categoryStats[p.category]) categoryStats[p.category] = { count: 0, views: 0 };
      categoryStats[p.category].count++;
      categoryStats[p.category].views += p.views;
    }

    const recentPosts = await db.post.findMany({
      take: 6,
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, slug: true, category: true, views: true, publishedAt: true, isPublished: true },
    });

    const topPosts = await db.post.findMany({
      take: 5,
      orderBy: { views: "desc" },
      where: { isPublished: true },
      select: { id: true, title: true, slug: true, views: true, category: true },
    });

    return NextResponse.json({
      stats: {
        totalPosts,
        publishedPosts,
        featuredPosts,
        drafts,
        totalViews,
      },
      categoryStats,
      recentPosts,
      topPosts,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
