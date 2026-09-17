"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, Check, Bookmark, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { readingList, type Book } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<
  Book["status"],
  { icon: React.ElementType; className: string; label: string }
> = {
  "خوانده‌شده": {
    icon: Check,
    className: "bg-primary/10 text-primary border-primary/30",
    label: "خوانده‌شده",
  },
  "در حال خواندن": {
    icon: Loader2,
    className: "bg-accent/10 text-accent border-accent/30",
    label: "در حال خواندن",
  },
  "در فهرست": {
    icon: Bookmark,
    className: "bg-secondary text-secondary-foreground border-border",
    label: "در فهرست",
  },
};

export function ReadingList() {
  return (
    <section id="reading" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="فهرست مطالعه"
            title="کتاب‌های پیشنهادی"
            description="آثاری که در مسیر پژوهشی من تأثیرگذار بوده‌اند"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {readingList.map((book, i) => {
            const status = statusConfig[book.status];
            const StatusIcon = status.icon;
            return (
              <SectionReveal key={book.title} delay={0.05 * i}>
                <Card className="card-lift group h-full border-border/60 bg-card/40 relative overflow-hidden">
                  {/* Decorative book spine on the right (RTL) */}
                  <span
                    aria-hidden
                    className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b from-primary/60 via-accent/40 to-primary/60 transition-all duration-500 group-hover:w-2.5"
                  />
                  <CardContent className="p-5 pe-7 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                        <BookOpen className="h-5 w-5" />
                      </span>
                      <Badge
                        variant="outline"
                        className={`${status.className} text-[10px] gap-1`}
                      >
                        <StatusIcon
                          className={`h-3 w-3 ${
                            book.status === "در حال خواندن"
                              ? "animate-spin"
                              : ""
                          }`}
                        />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-foreground leading-snug text-sm sm:text-base">
                        {book.title}
                      </h3>
                      <p className="text-xs text-muted-foreground" dir="rtl">
                        {book.author}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                        {book.category}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                      {book.note}
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
