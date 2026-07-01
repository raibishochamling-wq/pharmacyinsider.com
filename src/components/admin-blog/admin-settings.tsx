"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Settings as SettingsIcon, User, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const FIELDS = [
  { group: "Blog Identity", icon: SettingsIcon, items: [
    { key: "blogName", label: "Blog Name" },
    { key: "tagline", label: "Tagline" },
    { key: "authorName", label: "Author Name" },
    { key: "authorRole", label: "Author Role" },
  ]},
  { group: "About Section", icon: User, items: [
    { key: "about", label: "About Text (shown on homepage)", textarea: true },
    { key: "footerNote", label: "Footer Quote" },
  ]},
  { group: "Contact & Social", icon: Mail, items: [
    { key: "socialEmail", label: "Email" },
    { key: "socialInstagram", label: "Instagram URL" },
    { key: "socialFacebook", label: "Facebook URL" },
    { key: "socialX", label: "X (Twitter) URL" },
  ]},
  { group: "Security", icon: Heart, items: [
    { key: "adminPassword", label: "Admin Password (change to secure your blog)" },
  ]},
];

export function AdminSettings() {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (mounted) {
          // Note: adminPassword is not returned by API for security, but we allow updating it
          setValues({ ...d.settings, adminPassword: "" });
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      // Only send fields that have values
      const toUpdate: Record<string, string> = {};
      for (const [k, v] of Object.entries(values)) {
        if (v && v.trim()) toUpdate[k] = v;
      }
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toUpdate),
      });
      if (res.ok) {
        toast({ title: "Settings saved" });
        // Clear password field after save
        setValues((v) => ({ ...v, adminPassword: "" }));
      } else throw new Error("Failed");
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="size-6 animate-spin mr-2" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Update your blog information, about text, and security.</p>
        </div>
        <Button onClick={save} disabled={saving} className="bg-teal-gradient text-white hover:opacity-90">
          {saving ? <><Loader2 className="size-4 animate-spin" /> Saving</> : <><Save className="size-4" /> Save Changes</>}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {FIELDS.map((group, gIdx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: gIdx * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    {group.group}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item.key} className="space-y-1.5">
                      <Label htmlFor={item.key} className="text-xs text-muted-foreground">
                        {item.label}
                      </Label>
                      {item.textarea ? (
                        <Textarea
                          id={item.key}
                          value={values[item.key] || ""}
                          onChange={(e) => setValues((v) => ({ ...v, [item.key]: e.target.value }))}
                          rows={4}
                          className="resize-none"
                        />
                      ) : (
                        <Input
                          id={item.key}
                          type={item.key === "adminPassword" ? "password" : "text"}
                          value={values[item.key] || ""}
                          onChange={(e) => setValues((v) => ({ ...v, [item.key]: e.target.value }))}
                          placeholder={item.key === "adminPassword" ? "Enter new password to change" : ""}
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving} className="bg-teal-gradient text-white hover:opacity-90">
          {saving ? <><Loader2 className="size-4 animate-spin" /> Saving</> : <><Save className="size-4" /> Save All Changes</>}
        </Button>
      </div>
    </div>
  );
}
