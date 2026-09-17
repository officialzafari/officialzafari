"use client";

import * as React from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { educations } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="تحصیلات"
            title="مسیر آکادمیک"
            description="سوابق تحصیلی در دانشگاه‌های معتبر ایران"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educations.map((edu, i) => (
            <SectionReveal key={edu.degree + edu.period} delay={0.08 * i}>
              <Card
                className={`card-lift h-full border-border/60 ${
                  edu.status === "current"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "bg-card/40"
                }`}
              >
                <CardContent className="p-6 space-y-4 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    {edu.status === "current" ? (
                      <Badge
                        variant="default"
                        className="bg-primary text-primary-foreground"
                      >
                        در حال تحصیل
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                        تکمیل‌شده
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {edu.field}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground/90">
                      {edu.institution}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {edu.location}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="text-primary">◆</span>
                      {edu.period}
                    </p>
                  </div>

                  {edu.description && (
                    <p className="mt-auto pt-2 border-t border-border/60 text-xs text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
