"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, BookOpen, Pill } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Honest & Research-Backed",
    description:
      "Every article is grounded in verified pharmacy knowledge and real-world experience — no marketing hype, no exaggeration.",
  },
  {
    icon: HeartPulse,
    title: "Patient-First Perspective",
    description:
      "Written from behind the pharmacy counter, addressing the questions real customers ask every single week.",
  },
  {
    icon: BookOpen,
    title: "Clear & Practical",
    description:
      "Complex medical information translated into simple, actionable guidance you can actually use today.",
  },
  {
    icon: Pill,
    title: "Hands-On Experience",
    description:
      "Three-plus years working with medicines, supplements, and patients in Qatar — not theory, but daily practice.",
  },
];

export function AboutSection() {
  return (
    <section className="relative py-20 sm:py-24 bg-cream-gradient">
      <div className="absolute inset-0 pattern-dots opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            About the Author
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            From the pharmacy counter to your screen
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-card border border-border/60 shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-3">
            {/* Author card */}
            <div className="bg-teal-gradient p-7 sm:p-8 text-white text-center flex flex-col items-center justify-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-2xl mb-4">
                PI
              </span>
              <h3 className="font-serif-display text-xl font-bold">PharmacyInsider</h3>
              <p className="text-sm text-white/80 mt-1">Pharmacy Professional</p>
              <p className="text-xs text-white/70 mt-3 leading-relaxed">
                3+ years in Qatar
              </p>
              <p className="mt-4 text-amber-200 font-serif-display text-base italic">
                &ldquo;Your health is my priority.&rdquo;
              </p>
            </div>

            {/* Bio */}
            <div className="md:col-span-2 p-7 sm:p-9">
              <p className="text-base text-foreground/85 leading-relaxed">
                I am a pharmacy professional with hands-on experience in medicines,
                supplements, and patient care. Through PharmacyInsider, I share
                honest, research-backed health and wellness tips to help you make
                better decisions about your health.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                After years of answering the same questions at the pharmacy
                counter — about magnesium, iron, folic acid, vitamin D, and dozens
                of other supplements — I decided to write it all down in one place.
                No sales pitch, no scare tactics. Just clear, practical guidance
                from someone who handles these products every day.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {VALUES.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div key={v.title} className="flex items-start gap-3">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="size-4.5" />
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{v.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {v.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
