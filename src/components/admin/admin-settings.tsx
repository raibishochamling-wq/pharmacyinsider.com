"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Settings as SettingsIcon, Phone, MapPin, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const fieldGroups = [
  {
    title: "Restaurant Identity",
    icon: SettingsIcon,
    fields: [
      { key: "name", label: "Restaurant Name" },
      { key: "branch", label: "Branch" },
      { key: "tagline", label: "Tagline" },
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    fields: [
      { key: "phone", label: "Phone (for tel: links)" },
      { key: "phoneDisplay", label: "Phone (display)" },
      { key: "website", label: "Website (display)" },
      { key: "websiteUrl", label: "Website URL" },
      { key: "orderUrl", label: "Order Link (Talabat etc.)" },
    ],
  },
  {
    title: "Address",
    icon: MapPin,
    fields: [
      { key: "address1", label: "Address Line 1" },
      { key: "address2", label: "Address Line 2" },
      { key: "city", label: "City" },
      { key: "country", label: "Country" },
      { key: "plusCode", label: "Plus Code" },
    ],
  },
  {
    title: "Opening Hours",
    icon: Clock,
    fields: [
      { key: "hoursToday", label: "Today's Status (e.g. 'Open · Closes 1 AM')" },
      { key: "hoursMon", label: "Monday" },
      { key: "hoursTue", label: "Tuesday" },
      { key: "hoursWed", label: "Wednesday" },
      { key: "hoursThu", label: "Thursday" },
      { key: "hoursFri", label: "Friday" },
      { key: "hoursSat", label: "Saturday" },
      { key: "hoursSun", label: "Sunday" },
    ],
  },
] as const;

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
        if (mounted) setValues(d.settings || {});
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast({ title: "Settings saved successfully" });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="size-6 animate-spin mr-2" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">
            Restaurant Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Update your restaurant&apos;s information, contact details, and hours.
          </p>
        </div>
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
            <>
              <Save className="size-4" /> Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {fieldGroups.map((group, gIdx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: gIdx * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <Label htmlFor={field.key} className="text-xs text-muted-foreground">
                        {field.label}
                      </Label>
                      <Input
                        id={field.key}
                        value={values[field.key] || ""}
                        onChange={(e) =>
                          setValues({ ...values, [field.key]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end">
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
            <>
              <Save className="size-4" /> Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
