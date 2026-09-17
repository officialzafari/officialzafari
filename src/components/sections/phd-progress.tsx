"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, PenLine, GraduationCap, CheckCircle2, Circle } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

type Stage = {
  id: string;
  title: string;
  description: string;
  status: "done" | "active" | "todo";
  icon: React.ElementType;
};

const stages: Stage[] = [
  {
    id: "coursework",
    title: "گذراندن واحدهای تخصصی",
    description: "تکمیل دوره‌های پیشرفته اقتصاد، اقتصادسنجی و توسعه اقتصادی",
    status: "done",
    icon: BookOpen,
  },
  {
    id: "comprehensive",
    title: "آزمون جامع",
    description: "قبولی در آزمون جامع دکتری با موفقیت",
    status: "done",
    icon: CheckCircle2,
  },
  {
    id: "proposal",
    title: "دفاع از پروپوزال",
    description: "تصویب پروپوزال رساله در حوزه اقتصاد رفتاری و توسعه",
    status: "done",
    icon: FlaskConical,
  },
  {
    id: "research",
    title: "انجام پژوهش و نگارش",
    description: "در حال نگارش فصل‌های اصلی رساله و تحلیل داده‌ها",
    status: "active",
    icon: PenLine,
  },
  {
    id: "defense",
    title: "دفاع نهایی",
    description: "دفاع عمومی رساله و اخذ مدرک دکتری اقتصاد",
    status: "todo",
    icon: GraduationCap,
  },
];

const statusConfig = {
  done: {
    icon: CheckCircle2,
    color: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    label: "تکمیل‌شده",
  },
  active: {
    icon: PenLine,
    color: "text-accent",
    bg: "bg-accent",
    border: "border-accent",
    label: "در حال انجام",
  },
  todo: {
    icon: Circle,
    color: "text-muted-foreground",
    bg: "bg-muted-foreground/40",
    border: "border-border",
    label: "آینده",
  },
} as const;

export function PhDProgress() {
  const activeIndex = stages.findIndex((s) => s.status === "active");

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-[0.2em] text-primary/80 uppercase">
              مسیر دکتری
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-persian text-foreground">
              پیشرفت رساله دکتری
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
              مراحل پنج‌گانه مسال دکتری اقتصاد — اکنون در مرحله پژوهش و نگارش
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="relative max-w-4xl mx-auto">
            {/* Horizontal progress line (desktop) */}
            <div className="hidden md:block absolute top-6 right-0 left-0 h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{
                  width: `${(activeIndex / (stages.length - 1)) * 100}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-l from-primary via-primary to-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2">
              {stages.map((stage, i) => {
                const cfg = statusConfig[stage.status];
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="relative flex md:flex-col items-start md:items-center gap-3 md:gap-0 md:space-y-3"
                  >
                    {/* Node circle */}
                    <div className="relative z-10 shrink-0">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background shadow-md transition-all ${
                          stage.status === "active"
                            ? "border-accent ring-4 ring-accent/20"
                            : cfg.border
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            stage.status === "done"
                              ? "text-primary"
                              : stage.status === "active"
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </span>
                      {/* Pulse for active */}
                      {stage.status === "active" && (
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-40"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:text-center md:px-1">
                      <p className="text-xs font-bold text-primary persian-num mb-0.5">
                        مرحله {["۱", "۲", "۳", "۴", "۵"][i]}
                      </p>
                      <h3 className="text-sm font-bold text-foreground leading-snug">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed md:px-1">
                        {stage.description}
                      </p>
                      <span
                        className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full ${
                          stage.status === "done"
                            ? "bg-primary/10 text-primary"
                            : stage.status === "active"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {cfg.label}
                      </span>
                    </div>
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
