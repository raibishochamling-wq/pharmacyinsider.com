"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, Eye } from "lucide-react";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  readMinutes: number;
  publishedAt: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function categoryColor(category: string): string {
  const map: Record<string, string> = {
    Vitamins: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    Minerals: "bg-teal-500/15 text-teal-700 border-teal-500/30",
    Supplements: "bg-violet-500/15 text-violet-700 border-violet-500/30",
    "General Health": "bg-slate-500/15 text-slate-700 border-slate-500/30",
  };
  return map[category] || map["General Health"];
}

function coverGradient(category: string): string {
  const map: Record<string, string> = {
    Vitamins: "from-amber-500 via-orange-500 to-rose-500",
    Minerals: "from-teal-500 via-cyan-500 to-blue-500",
    Supplements: "from-violet-500 via-purple-500 to-fuchsia-500",
    "General Health": "from-slate-500 via-slate-600 to-slate-700",
  };
  return map[category] || map["General Health"];
}

export function FeaturedPost({
  post,
  onOpen,
}: {
  post: Post;
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      onClick={() => onOpen(post.slug)}
      className="group relative grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-border/60 bg-card cursor-pointer hover:shadow-2xl transition-all"
    >
      {/* Cover */}
      <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[20rem] bg-gradient-to-br ${coverGradient(post.category)} overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif-display text-7xl sm:text-8xl font-black text-white/30 select-none">
            {post.category.charAt(0)}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 shadow-md">
            ⭐ Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 sm:p-9 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColor(post.category)}`}>
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readMinutes} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3.5" /> {post.views} views
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Read article <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function PostCard({
  post,
  onOpen,
}: {
  post: Post;
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      onClick={() => onOpen(post.slug)}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
    >
      {/* Cover */}
      <div className={`relative aspect-[16/9] bg-gradient-to-br ${coverGradient(post.category)} overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif-display text-5xl font-black text-white/30 select-none">
            {post.category.charAt(0)}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium bg-white/95 backdrop-blur-sm ${categoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
        {post.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="text-amber-500 text-lg" title="Featured">★</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {post.readMinutes} min
          </span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </motion.article>
  );
}
