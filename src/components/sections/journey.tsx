"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen, type LucideIcon } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { journeyMilestones } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  book: BookOpen,
};

export function Journey() {
  return (
    <section className="py-16 sm:py-20 bg-card/30 border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-[0.2em] text-primary/80 uppercase">
              مسیر
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-persian text-foreground">
              نقاط عطف مسیر من
            </h2>
          </div>
        </SectionReveal>

        {/* Horizontal scroller on mobile, row on desktop */}
        <SectionReveal delay={0.1}>
          <div className="relative overflow-x-auto scrollbar-gold pb-4 -mx-4 px-4">
            <div className="flex items-start gap-2 sm:gap-4 min-w-max md:min-w-0 md:justify-between">
              {/* Connecting line */}
              <div
                aria-hidden
                className="absolute top-5 right-4 left-4 h-px bg-gradient-to-l from-primary via-primary/40 to-transparent md:right-0 md:left-0"
              />
              {journeyMilestones.map((m, i) => {
                const Icon = iconMap[m.icon] ?? Briefcase;
                return (
                  <motion.div
                    key={m.year + m.event}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                    className="relative flex flex-col items-center text-center w-32 sm:w-40 shrink-0"
                  >
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-md">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="mt-3 text-sm font-bold text-primary persian-num">
                      {m.year}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground leading-snug">
                      {m.event}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
