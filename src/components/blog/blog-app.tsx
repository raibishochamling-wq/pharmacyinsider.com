"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, Search, FileQuestion } from "lucide-react";
import { BlogNavbar } from "./blog-navbar";
import { BlogHero } from "./blog-hero";
import { FeaturedPost, PostCard, type Post } from "./post-card";
import { PostDetail } from "./post-detail";
import { AboutSection } from "./about-section";
import { BlogFooter } from "./blog-footer";

type View =
  | { kind: "home" }
  | { kind: "post"; slug: string };

export function BlogApp({ onAdminClick }: { onAdminClick: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<View>({ kind: "home" });
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(false);

  // Load all posts once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/posts?published=true");
        const data = await res.json();
        if (mounted) {
          setPosts(data.posts || []);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Track view changes (post open)
  const openPost = useCallback(async (slug: string) => {
    setPostLoading(true);
    setCurrentPost(null);
    setView({ kind: "post", slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const res = await fetch(`/api/posts/${slug}?track=true`);
      const data = await res.json();
      if (data.post) {
        setCurrentPost(data.post as Post);
        // Update the post in our local list (view count)
        setPosts((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, views: (p.views || 0) + 1 } : p))
        );
      }
    } catch {
      // ignore
    } finally {
      setPostLoading(false);
    }
  }, []);

  const goHome = useCallback(() => {
    setView({ kind: "home" });
    setCurrentPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filtering
  const filtered = posts.filter((p) => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Only separate a featured post when on the default home view (no search, all categories)
  const showFeatured = !searchQuery && activeCategory === "All";
  const featured = showFeatured ? filtered.filter((p) => p.isFeatured) : [];
  const featuredToShow = featured.slice(0, 1)[0];
  const rest = showFeatured
    ? filtered.filter((p) => p !== featuredToShow)
    : filtered;

  // Related posts (same category, excluding current)
  const related = currentPost
    ? posts
        .filter((p) => p.slug !== currentPost.slug && p.category === currentPost.category)
        .slice(0, 3)
    : [];

  // POST VIEW
  if (view.kind === "post") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <BlogNavbar
          activeCategory="All"
          onCategoryChange={(c) => {
            setActiveCategory(c);
            goHome();
          }}
          onSearch={(q) => {
            setSearchQuery(q);
            goHome();
          }}
          searchQuery=""
          onHomeClick={goHome}
        />
        <main className="flex-1">
          {postLoading ? (
            <div className="flex items-center justify-center py-32 text-muted-foreground">
              <Loader2 className="size-8 animate-spin mr-2" /> Loading article…
            </div>
          ) : currentPost ? (
            <PostDetail
              post={currentPost}
              onBack={goHome}
              relatedPosts={related}
              onOpenPost={openPost}
            />
          ) : (
            <div className="text-center py-32 px-4">
              <FileQuestion className="size-12 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">Article not found.</p>
              <button onClick={goHome} className="mt-4 text-primary font-medium hover:underline">
                Back to all articles
              </button>
            </div>
          )}
        </main>
        <BlogFooter onAdminClick={onAdminClick} />
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BlogNavbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onHomeClick={goHome}
      />
      <main className="flex-1">
        {/* Hero — only when no search and "All" category */}
        {!searchQuery && activeCategory === "All" && (
          <BlogHero onSearch={setSearchQuery} searchQuery={searchQuery} />
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <Loader2 className="size-8 animate-spin mr-2" /> Loading articles…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 px-4">
            <Search className="size-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-foreground font-medium">No articles found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery
                ? `No matches for "${searchQuery}". Try a different search.`
                : `No articles in ${activeCategory} yet.`}
            </p>
            {(searchQuery || activeCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Section header */}
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">
                  {searchQuery
                    ? `Search results`
                    : activeCategory === "All"
                      ? "Latest articles"
                      : activeCategory}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Featured */}
            {!searchQuery && activeCategory === "All" && featuredToShow && (
              <div className="mb-10">
                <FeaturedPost post={featuredToShow} onOpen={openPost} />
              </div>
            )}

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <PostCard key={p.id} post={p} onOpen={openPost} />
              ))}
            </div>
          </div>
        )}

        {/* About section — only on default home */}
        {!searchQuery && activeCategory === "All" && !loading && (
          <div id="about">
            <AboutSection />
          </div>
        )}
      </main>
      <BlogFooter onAdminClick={onAdminClick} />
    </div>
  );
}
