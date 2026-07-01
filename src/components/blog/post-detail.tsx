"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Tag,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Post } from "./post-card";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
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

// Render the post content — supports ## headings, --- dividers, numbered/bullet lists, paragraphs
function renderContent(content: string) {
  // Normalize literal \n strings to real newlines (safety for content from editor)
  const normalized = content.replace(/\\n/g, "\n");
  const lines = normalized.split("\n");
  const blocks: { type: "heading" | "divider" | "numbered" | "bullet" | "para"; content: string; items?: string[] }[] = [];
  let currentPara: string[] = [];
  let currentList: { type: "numbered" | "bullet"; items: string[] } | null = null;

  const flushPara = () => {
    if (currentPara.length > 0) {
      const text = currentPara.join(" ").replace(/\s+/g, " ").trim();
      if (text) blocks.push({ type: "para", content: text });
      currentPara = [];
    }
  };
  const flushList = () => {
    if (currentList) {
      blocks.push({ type: currentList.type, content: "", items: currentList.items });
      currentList = null;
    }
  };

  for (const line of lines) {
    const l = line.trim();
    // Blank line — flush current paragraph/list
    if (!l) {
      flushPara();
      flushList();
      continue;
    }
    // Section divider
    if (/^-{3,}$/.test(l)) {
      flushPara();
      flushList();
      blocks.push({ type: "divider", content: "" });
      continue;
    }
    // Markdown heading ## 
    if (/^##\s+/.test(l)) {
      flushPara();
      flushList();
      blocks.push({ type: "heading", content: l.replace(/^##\s+/, "") });
      continue;
    }
    // Numbered list item
    if (/^\d+\.\s/.test(l)) {
      flushPara();
      if (!currentList || currentList.type !== "numbered") {
        flushList();
        currentList = { type: "numbered", items: [] };
      }
      currentList.items.push(l.replace(/^\d+\.\s*/, ""));
      continue;
    }
    // Bullet list item
    if (/^[•·\-]\s/.test(l)) {
      flushPara();
      if (!currentList || currentList.type !== "bullet") {
        flushList();
        currentList = { type: "bullet", items: [] };
      }
      currentList.items.push(l.replace(/^[•·\-]\s*/, ""));
      continue;
    }
    // Regular text
    if (currentList) flushList();
    currentPara.push(l);
  }
  flushPara();
  flushList();

  return blocks.map((block, idx) => {
    if (block.type === "divider") {
      return <hr key={idx} className="my-6 border-t border-border/60" />;
    }
    if (block.type === "heading") {
      return (
        <h2 key={idx} className="font-serif-display text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3">
          {block.content}
        </h2>
      );
    }
    if (block.type === "numbered") {
      return (
        <ol key={idx} className="list-decimal mb-4 pl-5">
          {block.items!.map((item, i) => (
            <li key={i} className="mb-1.5">{item}</li>
          ))}
        </ol>
      );
    }
    if (block.type === "bullet") {
      return (
        <ul key={idx} className="list-disc mb-4 pl-5">
          {block.items!.map((item, i) => (
            <li key={i} className="mb-1.5">{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="mb-4 leading-relaxed">
        {block.content}
      </p>
    );
  });
}

export function PostDetail({
  post,
  onBack,
  relatedPosts,
  onOpenPost,
}: {
  post: Post;
  onBack: () => void;
  relatedPosts: Post[];
  onOpenPost: (slug: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const tags = post.tags.split(",").map((t) => t.trim()).filter(Boolean);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const share = (platform: string) => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(shareUrl);
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    if (platform === "copy") {
      navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (links[platform]) {
      window.open(links[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="pb-16">
      {/* Back button */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to all articles
        </button>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-8"
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColor(post.category)}`}>
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" /> {post.readMinutes} min read
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Eye className="size-3" /> {post.views} views
          </span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] text-balance">
          {post.title}
        </h1>

        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author + share */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-teal-gradient text-white font-semibold">
              PI
            </span>
            <div>
              <div className="font-semibold text-sm text-foreground">{post.author}</div>
              <div className="text-xs text-muted-foreground">Pharmacy Professional · 3+ years in Qatar</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">Share:</span>
            <button onClick={() => share("facebook")} className="size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors" aria-label="Share on Facebook">
              <Facebook className="size-3.5" />
            </button>
            <button onClick={() => share("twitter")} className="size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors" aria-label="Share on X">
              <Twitter className="size-3.5" />
            </button>
            <button onClick={() => share("linkedin")} className="size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors" aria-label="Share on LinkedIn">
              <Linkedin className="size-3.5" />
            </button>
            <button onClick={() => share("copy")} className="size-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors" aria-label="Copy link">
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <LinkIcon className="size-3.5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Cover gradient banner */}
      <div className={`mx-auto max-w-4xl px-4 sm:px-6`}>
        <div className={`relative aspect-[16/7] rounded-2xl bg-gradient-to-br ${coverGradient(post.category)} overflow-hidden shadow-md`}>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif-display text-9xl font-black text-white/20 select-none">
              {post.category.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-auto max-w-3xl px-4 sm:px-6 mt-10 article-content"
      >
        {renderContent(post.content)}
      </motion.div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-10 pt-6 border-t border-border/60">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Tags:</span>
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-muted text-foreground/70 text-xs font-medium px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author CTA box */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-12">
        <div className="rounded-2xl bg-teal-gradient text-white p-7 sm:p-8 shadow-md">
          <div className="flex items-start gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-lg shrink-0">
              PI
            </span>
            <div>
              <h3 className="font-serif-display text-xl font-bold">{post.author}</h3>
              <p className="text-sm text-white/80 mt-0.5">Pharmacy Professional · 3+ years in Qatar</p>
              <p className="text-sm text-white/90 mt-3 leading-relaxed">
                I share honest, research-backed health and wellness tips to help you make better
                decisions about your health. <strong className="text-amber-200">Your health is my priority.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-16">
          <h2 className="font-serif-display text-2xl font-bold text-foreground mb-6">
            Related articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenPost(p.slug)}
                className="group rounded-xl border border-border/60 bg-card overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${coverGradient(p.category)} flex items-center justify-center`}>
                  <span className="font-serif-display text-4xl font-black text-white/30">{p.category.charAt(0)}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif-display text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.readMinutes} min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
