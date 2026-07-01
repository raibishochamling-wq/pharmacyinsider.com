"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  Star,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["Vitamins", "Minerals", "Supplements", "General Health"];

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  isPublished: boolean;
  isFeatured: boolean;
  readMinutes: number;
  publishedAt: string;
};

const EMPTY = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Vitamins",
  tags: "",
  isPublished: true,
  isFeatured: false,
};

export function AdminEditor({
  postId,
  onBack,
}: {
  postId: string | null; // null = new post
  onBack: () => void;
}) {
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!postId) {
      setForm(EMPTY);
      setLoading(false);
      return;
    }
    (async () => {
      const res = await fetch(`/api/posts/${postId}`);
      const data = await res.json();
      if (mounted && data.post) {
        setPost(data.post);
        setForm({
          title: data.post.title,
          slug: data.post.slug,
          excerpt: data.post.excerpt,
          content: data.post.content,
          category: data.post.category,
          tags: data.post.tags,
          isPublished: data.post.isPublished,
          isFeatured: data.post.isFeatured,
        });
        setAutoSlug(false);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [postId]);

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const updateTitle = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: autoSlug ? slugify(title) : f.slug,
    }));
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const body = {
        ...form,
        slug: form.slug || slugify(form.title),
        readMinutes: Math.max(3, Math.round(form.content.split(/\s+/).filter(Boolean).length / 200)),
      };
      const url = post ? `/api/posts/${post.id}` : "/api/posts";
      const method = post ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast({ title: post ? "Post updated" : "Post created", description: form.title });
        onBack();
      } else throw new Error("Failed");
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-muted-foreground">
        <Loader2 className="size-6 animate-spin mr-2" /> Loading editor…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
            <ArrowLeft className="size-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="font-serif-display text-xl sm:text-2xl font-bold text-foreground truncate">
              {post ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {post ? post.title.slice(0, 50) : "Write a new article"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))}
            className={form.isFeatured ? "border-amber-300 text-amber-700" : ""}
          >
            <Star className={`size-4 ${form.isFeatured ? "fill-amber-400 text-amber-400" : ""}`} />
            <span className="hidden sm:inline">Featured</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setForm((f) => ({ ...f, isPublished: !f.isPublished }))}
            className={form.isPublished ? "border-emerald-300 text-emerald-700" : ""}
          >
            <Eye className="size-4" />
            <span className="hidden sm:inline">{form.isPublished ? "Published" : "Draft"}</span>
          </Button>
          <Button
            onClick={save}
            disabled={saving}
            className="bg-teal-gradient text-white hover:opacity-90"
          >
            {saving ? <><Loader2 className="size-4 animate-spin" /> Saving</> : <><Save className="size-4" /> Save</>}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder="e.g. Magnesium Oxide — The Cheapest Magnesium Form…"
              className="text-base h-12 font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL slug</Label>
            <div className="flex items-center gap-2">
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                  setAutoSlug(false);
                }}
                placeholder="magnesium-oxide-guide"
                className="font-mono text-sm"
              />
              {post && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  /#post/{form.slug || "…"}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (short summary for cards & SEO)</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="A one-to-two sentence summary that appears on post cards and in search results."
              rows={3}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">{form.excerpt.length} chars</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder={"Write your article here.\n\nUse --- on its own line to separate sections.\n\nNumbered lists like:\n1. First point\n2. Second point\n\nWill render nicely on the public post page."}
              rows={18}
              className="font-mono text-sm leading-relaxed resize-y"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{form.content.split(/\s+/).filter(Boolean).length} words</span>
              <span>~{Math.max(3, Math.round(form.content.split(/\s+/).filter(Boolean).length / 200))} min read</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish settings */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-serif-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="size-4 text-primary" /> Publish Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-foreground">Published</span>
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                  className="size-4 accent-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-foreground">Featured</span>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                  className="size-4 accent-primary"
                />
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-serif-display text-base font-bold text-foreground mb-4">
              Category
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, category: c }))}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.category === c
                      ? "bg-teal-gradient text-white"
                      : "bg-muted text-foreground/70 hover:bg-muted/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h3 className="font-serif-display text-base font-bold text-foreground mb-3">
              Tags
            </h3>
            <p className="text-xs text-muted-foreground mb-2">Comma-separated</p>
            <Textarea
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              placeholder="magnesium, sleep, anxiety"
              rows={3}
              className="text-sm resize-none"
            />
            {form.tags && (
              <div className="mt-3 flex flex-wrap gap-1">
                {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full bg-muted text-foreground/70 text-xs font-medium px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Preview hint */}
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ImageIcon className="size-3.5" />
              <span>Cover images use auto-generated gradients based on category.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
