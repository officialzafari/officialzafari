"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { testimonials } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 lg:py-28 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="توصیه‌نامه‌ها"
            title="نظر همکاران"
            description="گزارشی از تجربه همکاران و اساتید در کار با من"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.name} delay={0.08 * i}>
              <Card className="card-lift group h-full border-border/60 bg-card/40 relative overflow-hidden">
                {/* Decorative quote mark in corner */}
                <Quote
                  aria-hidden
                  className="absolute -top-2 -left-2 h-20 w-20 text-primary/5 rotate-12 transition-all duration-500 group-hover:text-primary/10 group-hover:scale-110"
                />
                <CardContent className="p-6 space-y-4 relative">
                  {/* Stars */}
                  <div className="flex gap-0.5" aria-label="۵ از ۵ ستاره">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm leading-relaxed text-foreground/85">
                    «{t.quote}»
                  </blockquote>

                  <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                      {t.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            * این توصیه‌نامه‌ها نمونه‌ای هستند و در نسخه نهایی با توصیه‌نامه‌های
            واقعی همکاران جایگزین می‌شوند.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
