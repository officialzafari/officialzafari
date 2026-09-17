"use client";

import * as React from "react";
import {
  Sprout,
  Map,
  TrendingUp,
  Globe,
  BarChart3,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { researchInterests } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  sprout: Sprout,
  map: Map,
  "trending-up": TrendingUp,
  globe: Globe,
  chart: BarChart3,
  brain: Brain,
};

export function Research() {
  return (
    <section id="research" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="پژوهش"
            title="علایق پژوهشی"
            description="حوزه‌هایی که در مسیر دکتری اقتصاد روی آن‌ها متمرکزم"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchInterests.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Brain;
            return (
              <SectionReveal key={item.title} delay={0.06 * i}>
                <Card className="card-lift group h-full border-border/60 bg-card/40 overflow-hidden relative">
                  {/* Decorative corner ornament */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 -left-6 h-20 w-20 rounded-full bg-primary/5 transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-150"
                  />
                  <CardContent className="p-6 space-y-3 relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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
