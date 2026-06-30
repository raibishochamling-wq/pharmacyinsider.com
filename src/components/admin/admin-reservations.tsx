"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  Users,
  Phone,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: string;
  createdAt: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminReservations() {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/reservations");
    const data = await res.json();
    setReservations(data.reservations || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/reservations");
      const data = await res.json();
      if (mounted) {
        setReservations(data.reservations || []);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast({ title: `Reservation ${status}` });
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const remove = async (id: string) => {
    try {
      await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      toast({ title: "Reservation deleted" });
      load();
    } catch {
      toast({ title: "Failed", variant: "destructive" });
    }
  };

  const filtered = reservations.filter((r) => filter === "all" || r.status === filter);

  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">
          Reservations
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage table booking requests from your customers.
        </p>
      </div>

      {/* Filter tabs with counts */}
      <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-muted w-fit">
        {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-6 animate-spin mr-2" /> Loading reservations...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <CalendarClock className="size-12 mx-auto mb-3 opacity-30" />
          <p>No reservations found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <Card className="h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{r.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Submitted {formatDate(r.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        r.status === "confirmed"
                          ? "default"
                          : r.status === "cancelled"
                            ? "destructive"
                            : "secondary"
                      }
                      className="capitalize"
                    >
                      {r.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm flex-1">
                    <div className="flex items-center gap-2 text-foreground/80">
                      <CalendarClock className="size-4 text-primary shrink-0" />
                      <span>
                        {r.date} at {r.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Users className="size-4 text-primary shrink-0" />
                      <span>{r.guests} guest{r.guests !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Phone className="size-4 text-primary shrink-0" />
                      <a href={`tel:${r.phone}`} className="hover:text-primary">
                        {r.phone}
                      </a>
                    </div>
                    {r.email && (
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    )}
                    {r.notes && (
                      <p className="text-xs text-muted-foreground italic mt-2 p-2 bg-muted/50 rounded">
                        &ldquo;{r.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/60">
                    {r.status !== "confirmed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(r.id, "confirmed")}
                        className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      >
                        <CheckCircle2 className="size-3.5" /> Confirm
                      </Button>
                    )}
                    {r.status !== "cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(r.id, "cancelled")}
                        className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        <XCircle className="size-3.5" /> Cancel
                      </Button>
                    )}
                    {r.status !== "pending" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateStatus(r.id, "pending")}
                      >
                        <Clock className="size-3.5" /> Pending
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => remove(r.id)}
                      className="text-destructive ml-auto"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
