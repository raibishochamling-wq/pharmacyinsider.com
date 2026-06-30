"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  UtensilsCrossed,
  Star,
  CheckCircle2,
  XCircle,
  ImageOff,
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

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  tag: string | null;
  badge: string | null;
  image: string | null;
  alt: string | null;
  isFeatured: boolean;
  isAvailable: boolean;
  sortOrder: number;
};

const emptyItem = {
  name: "",
  description: "",
  price: "",
  category: "Main",
  tag: "",
  badge: "",
  image: "",
  alt: "",
  isFeatured: false,
  isAvailable: true,
  sortOrder: 0,
};

export function AdminMenu() {
  const { toast } = useToast();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<typeof emptyItem>(emptyItem);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/menu");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (mounted) {
        setItems(data.items || []);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyItem, sortOrder: items.length + 1 });
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      tag: item.tag || "",
      badge: item.badge || "",
      image: item.image || "",
      alt: item.alt || "",
      isFeatured: item.isFeatured,
      isAvailable: item.isAvailable,
      sortOrder: item.sortOrder,
    });
    setDialogOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      toast({ title: "Name and price are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/menu/${editing.id}` : "/api/menu";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({
          title: editing ? "Dish updated" : "Dish added",
          description: form.name,
        });
        setDialogOpen(false);
        load();
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/menu/${deleteId}`, { method: "DELETE" });
      toast({ title: "Dish deleted" });
      setDeleteId(null);
      load();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const toggleAvailable = async (item: MenuItem) => {
    try {
      await fetch(`/api/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !item.isAvailable }),
      });
      load();
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">
            Menu Management
          </h1>
          <p className="text-muted-foreground mt-1">
            {items.length} dish{items.length !== 1 ? "es" : ""} on your menu
          </p>
        </div>
        <Button onClick={openNew} className="bg-spice-gradient text-white hover:opacity-90">
          <Plus className="size-4" /> Add Dish
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-6 animate-spin mr-2" /> Loading menu...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <UtensilsCrossed className="size-12 mx-auto mb-3 opacity-30" />
          <p>No dishes found. {search ? "Try a different search." : "Add your first dish."}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border/60">
                <tr>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Dish</th>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Category</th>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Price</th>
                  <th className="text-left font-semibold text-foreground/80 px-4 py-3">Status</th>
                  <th className="text-right font-semibold text-foreground/80 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.alt || item.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center text-muted-foreground">
                              <ImageOff className="size-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground truncate">{item.name}</span>
                            {item.isFeatured && (
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="font-normal">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.price}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleAvailable(item)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                          item.isAvailable
                            ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20"
                            : "bg-muted text-muted-foreground hover:bg-muted/70"
                        }`}
                      >
                        {item.isAvailable ? (
                          <>
                            <CheckCircle2 className="size-3" /> Available
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3" /> Hidden
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openEdit(item)}
                          className="size-8"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteId(item.id)}
                          className="size-8 text-destructive hover:text-destructive"
                        >
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
            {filtered.map((item) => (
              <div key={item.id} className="p-4 flex gap-3">
                <div className="size-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt || item.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center text-muted-foreground">
                      <ImageOff className="size-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground truncate">{item.name}</span>
                        {item.isFeatured && (
                          <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.category} · {item.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => toggleAvailable(item)}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        item.isAvailable
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Hidden"}
                    </button>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openEdit(item)}
                        className="size-8"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(item.id)}
                        className="size-8 text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Dish" : "Add New Dish"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Butter Chicken"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="QAR 28"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Tender tandoori chicken simmered in a velvety tomato-butter gravy..."
                rows={3}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Main"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Tag</Label>
                <Input
                  id="tag"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  placeholder="Bestseller"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="Chef's Pick"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
              {form.image && (
                <div className="size-20 rounded-lg overflow-hidden bg-muted">
                  <img src={form.image} alt="Preview" className="size-full object-cover" />
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={form.alt}
                  onChange={(e) => setForm({ ...form, alt: e.target.value })}
                  placeholder="Bowl of butter chicken"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="size-4 rounded accent-primary"
                />
                <span className="text-sm">Featured dish</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                  className="size-4 rounded accent-primary"
                />
                <span className="text-sm">Available</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={save}
              disabled={saving}
              className="bg-spice-gradient text-white hover:opacity-90"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Dish"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this dish?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. The dish will be permanently removed from your menu.
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
