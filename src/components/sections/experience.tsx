"use client";

import * as React from "react";
import { Briefcase, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { experiences } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export function Experience() {
  return (
    <section
      id="experience"
      className="py-20 sm:py-24 lg:py-28 bg-card/30 border-y border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="تجربه‌ها"
            title="مسیر حرفه‌ای"
            description="تجربیات کاری در نهادهای بین‌المللی و داخلی"
          />
        </SectionReveal>

        <div className="mt-14 relative">
          {/* Timeline line */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 right-[19px] sm:right-1/2 sm:translate-x-1/2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent"
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <SectionReveal key={exp.companyEn} delay={0.05 * i}>
                <div
                  className={`relative flex flex-col sm:flex-row gap-6 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Marker */}
                  <div className="absolute right-0 sm:right-1/2 sm:translate-x-1/2 top-1 z-10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-md">
                      <Briefcase className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden sm:block sm:flex-1" />

                  {/* Card */}
                  <div className="sm:flex-1 me-14 sm:me-0 sm:ms-14">
                    <Card className="card-lift border-border/60 bg-background">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                            {exp.period}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs text-muted-foreground"
                            dir="rtl"
                          >
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {exp.company}
                          <span className="text-muted-foreground font-normal">
                            {" "}
                            ({exp.companyEn})
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {exp.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              <span className="leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
