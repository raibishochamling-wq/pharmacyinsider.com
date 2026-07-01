"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  FileText,
  Star,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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
  views: number;
  readMinutes: number;
  publishedAt: string;
};

export function AdminPosts({
  onEditPost,
  onNewPost,
}: {
  onEditPost: (id: string) => void;
  onNewPost: () => void;
}) {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/posts?published=false");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/posts?published=false");
      const data = await res.json();
      if (mounted) {
        setPosts(data.posts || []);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const togglePublished = async (p: Post) => {
    try {
      await fetch(`/api/posts/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !p.isPublished }),
      });
      toast({ title: p.isPublished ? "Unpublished" : "Published" });
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const toggleFeatured = async (p: Post) => {
    try {
      await fetch(`/api/posts/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !p.isFeatured }),
      });
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/posts/${deleteId}`, { method: "DELETE" });
      toast({ title: "Post deleted" });
      setDeleteId(null);
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">Posts</h1>
          <p className="text-muted-foreground mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} · {posts.filter((p) => p.isPublished).length} published
          </p>
        </div>
        <Button onClick={onNewPost} className="bg-teal-gradient text-white hover:opacity-90">
          <Plus className="size-4" /> New Post
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-6 animate-spin mr-2" /> Loading posts…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <FileText className="size-12 mx-auto mb-3 opacity-30" />
          <p>No posts found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border/60">
                <tr>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Title</th>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Category</th>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Views</th>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Status</th>
                  <th className="text-right font-semibold text-foreground/80 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground line-clamp-1 max-w-md">{p.title}</span>
                        {p.isFeatured && <Star className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="font-normal">{p.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.views.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublished(p)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                          p.isPublished
                            ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.isPublished ? <><Eye className="size-3" /> Published</> : <><EyeOff className="size-3" /> Draft</>}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => toggleFeatured(p)} className={`size-8 ${p.isFeatured ? "text-amber-500" : "text-muted-foreground"}`}>
                          <Star className={`size-4 ${p.isFeatured ? "fill-amber-400" : ""}`} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => onEditPost(p.id)} className="size-8">
                          <Pencil className="size-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setDeleteId(p.id)} className="size-8 text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border/60">
            {filtered.map((p) => (
              <div key={p.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-foreground line-clamp-2 flex-1">{p.title}</span>
                  {p.isFeatured && <Star className="size-4 fill-amber-400 text-amber-400 shrink-0" />}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Badge variant="secondary" className="font-normal">{p.category}</Badge>
                  <span>·</span>
                  <span>{p.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => togglePublished(p)} className="h-7 text-xs">
                    {p.isPublished ? "Unpublish" : "Publish"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onEditPost(p.id)} className="h-7 text-xs">
                    <Pencil className="size-3" /> Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(p.id)} className="h-7 text-xs text-destructive ml-auto">
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl shadow-2xl border border-border/60 p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif-display text-lg font-bold text-foreground">Delete this post?</h3>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
            <div className="mt-5 flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
