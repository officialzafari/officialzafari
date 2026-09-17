"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Lightbulb } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { nowItems } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const icons = [GraduationCap, BookOpen, Lightbulb];

export function NowSection() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              اکنون
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-persian text-foreground">
              در حال حاضر مشغولِ…
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nowItems.map((item, i) => {
            const Icon = icons[i] ?? BookOpen;
            return (
              <SectionReveal key={item.label} delay={0.08 * i}>
                <Card className="card-lift h-full border-border/60 bg-card/40">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span>{item.label}</span>
                    </div>
                    <p className="text-base font-bold text-foreground">
                      {item.value}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
