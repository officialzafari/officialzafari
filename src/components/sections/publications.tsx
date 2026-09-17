"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileText, BookMarked, Presentation, BarChart3, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { publications, type Publication } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const typeIcons: Record<Publication["type"], React.ElementType> = {
  "پایان‌نامه": FileText,
  مقاله: BookMarked,
  کارگاهی: Presentation,
  تحلیل: BarChart3,
};

const typeColors: Record<Publication["type"], string> = {
  "پایان‌نامه": "bg-primary/10 text-primary border-primary/30",
  مقاله: "bg-accent/10 text-accent border-accent/30",
  کارگاهی: "bg-secondary text-secondary-foreground border-border",
  تحلیل: "bg-primary/5 text-primary border-primary/20",
};

export function Publications() {
  return (
    <section
      id="publications"
      className="py-20 sm:py-24 lg:py-28 bg-card/30 border-y border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="انتشارات"
            title="پژوهش‌ها و آثار"
            description="فهرستی از پایان‌نامه‌ها، مقالات و کارگاه‌های پژوهشی"
          />
        </SectionReveal>

        <div className="mt-12 space-y-4 max-w-4xl mx-auto">
          {publications.map((pub, i) => {
            const Icon = typeIcons[pub.type] ?? FileText;
            return (
              <SectionReveal key={pub.title} delay={0.06 * i}>
                <Card className="card-lift group border-border/60 bg-background overflow-hidden relative">
                  {/* Left accent bar */}
                  <span
                    aria-hidden
                    className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent"
                  />
                  <CardContent className="p-5 sm:p-6 pe-7">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Icon */}
                      <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1 shrink-0">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-3">
                          <Icon className="h-6 w-6" />
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${typeColors[pub.type]} text-xs`}
                          >
                            {pub.type}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {pub.year}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                          {pub.title}
                        </h3>

                        <p className="flex items-center gap-1 text-xs text-primary font-medium">
                          <MapPin className="h-3 w-3" />
                          {pub.venue}
                        </p>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {pub.description}
                        </p>
                      </div>
                    </div>
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
