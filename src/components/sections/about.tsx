"use client";

import * as React from "react";
import { Compass, Globe2, Sprout } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { aboutText, person } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

const valueIcons = [Compass, Globe2, Sprout];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="درباره من"
            title="معرفی کوتاه"
            description="آشنا شدن با مسیر آکادمیک و حرفه‌ای من در حوزه اقتصاد و توسعه"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Narrative */}
          <SectionReveal className="lg:col-span-7" delay={0.1}>
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p className="text-foreground font-medium text-lg sm:text-xl">
                {aboutText.intro}
              </p>
              <p>{aboutText.body}</p>
              <p className="border-r-2 border-primary pr-4 italic text-foreground/90">
                {aboutText.mission}
              </p>
            </div>
          </SectionReveal>

          {/* Side card — quick facts */}
          <SectionReveal className="lg:col-span-5" delay={0.2}>
            <Card className="card-lift border-border/60 bg-card/60">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-semibold text-primary tracking-widest">
                  اطلاعات سریع
                </h3>
                <dl className="divide-y divide-border/60">
                  {[
                    { k: "نام", v: person.name },
                    { k: "عنوان", v: person.title },
                    { k: "تاریخ تولد", v: person.birthDate },
                    { k: "شهر", v: `${person.city}، ${person.country}` },
                    { k: "ایمیل", v: person.email, ltr: true },
                    { k: "تلفن", v: person.phone, ltr: true },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between gap-4 py-2.5 text-sm"
                    >
                      <dt className="text-muted-foreground">{row.k}</dt>
                      <dd
                        className="font-medium text-foreground text-end"
                        dir={row.ltr ? "ltr" : "rtl"}
                      >
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>

        {/* Values */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutText.values.map((val, i) => {
            const Icon = valueIcons[i] ?? Compass;
            return (
              <SectionReveal key={val.title} delay={0.1 * i}>
                <Card className="card-lift h-full border-border/60 bg-card/40">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-foreground">{val.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {val.description}
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
