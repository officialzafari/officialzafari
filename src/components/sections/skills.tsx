"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Brain, Users, MessageCircle, Globe } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { skills, type Skill } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categoryIcons: Record<Skill["category"], React.ElementType> = {
  حرفه‌ای: Brain,
  نرم: Users,
  زبان: Globe,
};

const categoryDescriptions: Record<Skill["category"], string> = {
  حرفه‌ای: "مهارت‌های تخصصی و تحلیلی",
  نرم: "مهارت‌های ارتباطی و مدیریتی",
  زبان: "زبان‌های مسلطم",
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const Icon = categoryIcons[skill.category] ?? Brain;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {skill.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {skill.category}
            </p>
          </div>
        </div>
        <span className="text-sm font-bold text-primary persian-num">
          {skill.level}٪
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 1.1,
            delay: 0.1 * index,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full bg-gradient-to-l from-primary via-primary to-accent"
        />
      </div>
    </div>
  );
}

export function Skills() {
  const categories = Object.keys(categoryIcons) as Skill["category"][];

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 lg:py-28 bg-card/30 border-y border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="مهارت‌ها"
            title="توانایی‌های من"
            description="ترکیب مهارت‌های حرفه‌ای، نرم و زبانی که در طول مسیر کسب کرده‌ام"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat];
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <SectionReveal key={cat} delay={0.1 * i}>
                <Card className="card-lift h-full border-border/60 bg-background">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-foreground">
                          {cat}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {categoryDescriptions[cat]}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5 pt-2">
                    {catSkills.map((s, j) => (
                      <SkillBar
                        key={s.name}
                        skill={s}
                        index={i * 4 + j}
                      />
                    ))}
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
