"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Loader2,
  Star,
  MessageSquare,
  Eye,
  EyeOff,
  Reply,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Review = {
  id: string;
  name: string;
  meta: string | null;
  initials: string;
  rating: number;
  title: string;
  text: string;
  ownerResponse: string | null;
  isPublished: boolean;
  createdAt: string;
};

function avatarColor(initials: string) {
  const colors = ["bg-amber-500", "bg-rose-500", "bg-emerald-500", "bg-orange-500", "bg-purple-500"];
  return colors[initials.charCodeAt(0) % colors.length];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AdminReviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "unpublished">("all");
  const [replyTo, setReplyTo] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data.reviews || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (mounted) {
        setReviews(data.reviews || []);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const togglePublish = async (r: Review) => {
    try {
      await fetch(`/api/reviews/${r.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !r.isPublished }),
      });
      toast({
        title: r.isPublished ? "Review hidden" : "Review published",
      });
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const saveReply = async () => {
    if (!replyTo) return;
    try {
      await fetch(`/api/reviews/${replyTo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerResponse: replyText }),
      });
      toast({ title: "Reply saved" });
      setReplyTo(null);
      setReplyText("");
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/reviews/${deleteId}`, { method: "DELETE" });
      toast({ title: "Review deleted" });
      setDeleteId(null);
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const filtered = reviews.filter((r) => {
    if (filter === "published") return r.isPublished;
    if (filter === "unpublished") return !r.isPublished;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">
          Reviews
        </h1>
        <p className="text-muted-foreground mt-1">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""} ·{" "}
          {reviews.filter((r) => r.isPublished).length} published
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
        {(["all", "published", "unpublished"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-6 animate-spin mr-2" /> Loading reviews...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <MessageSquare className="size-12 mx-auto mb-3 opacity-30" />
          <p>No reviews found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="rounded-xl border border-border/60 bg-card p-5"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex size-11 items-center justify-center rounded-full ${avatarColor(
                    r.initials
                  )} text-white font-semibold text-sm shrink-0`}
                >
                  {r.initials}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{r.name}</span>
                    {!r.isPublished && (
                      <Badge variant="secondary" className="text-[10px]">
                        Hidden
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatDate(r.createdAt)}
                    </span>
                  </div>

                  {r.meta && (
                    <p className="text-xs text-muted-foreground mb-1.5">{r.meta}</p>
                  )}

                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${
                          i <= r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="font-medium text-foreground text-sm mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>

                  {r.ownerResponse && (
                    <div className="mt-3 pl-3 border-l-2 border-primary/30 bg-primary/5 rounded-r-md py-2 pr-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="inline-flex items-center justify-center size-4 rounded-full bg-spice-gradient text-white text-[8px] font-bold">
                          S
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          Owner response
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {r.ownerResponse}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/60">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(r)}
                >
                  {r.isPublished ? (
                    <>
                      <EyeOff className="size-3.5" /> Hide
                    </>
                  ) : (
                    <>
                      <Eye className="size-3.5" /> Publish
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setReplyTo(r);
                    setReplyText(r.ownerResponse || "");
                  }}
                >
                  <Reply className="size-3.5" />
                  {r.ownerResponse ? "Edit Reply" : "Reply"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteId(r.id)}
                  className="text-destructive hover:text-destructive ml-auto"
                >
                  <Trash2 className="size-3.5" /> Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply dialog */}
      <Dialog open={!!replyTo} onOpenChange={(o) => !o && setReplyTo(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Reply to review</DialogTitle>
          </DialogHeader>
          {replyTo && (
            <div className="rounded-lg bg-muted/50 p-3 text-sm">
              <p className="font-medium text-foreground">{replyTo.title}</p>
              <p className="text-muted-foreground mt-1 line-clamp-2">{replyTo.text}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="reply">Your response</Label>
            <Textarea
              id="reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Thank you for your feedback..."
              rows={5}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={saveReply}
              className="bg-spice-gradient text-white hover:opacity-90"
            >
              Save Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this review?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={confirmDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
