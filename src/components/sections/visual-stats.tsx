"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Animated circular progress ring using SVG + Framer Motion.
 * Draws a gold arc that fills as it scrolls into view.
 */
function CircularProgress({
  value,
  size = 140,
  stroke = 10,
  label,
  sublabel,
  delay = 0,
}: {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label: string;
  sublabel?: string;
  delay?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          aria-hidden
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 1.4,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
            className="text-2xl font-bold text-primary persian-num"
          >
            {value}٪
          </motion.span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

const stats = [
  {
    value: 85,
    label: "پیشرفت رساله دکتری",
    sublabel: "مرحله نگارش نهایی",
  },
  {
    value: 92,
    label: "مهارت ارتباطات",
    sublabel: "ارزیابی همکاران",
  },
  {
    value: 90,
    label: "مهارت حل مسئله",
    sublabel: "ارزیابی همکاران",
  },
  {
    value: 88,
    label: "مهارت رهبری",
    sublabel: "ارزیابی همکاران",
  },
];

export function VisualStats() {
  return (
    <section
      id="impact"
      className="py-20 sm:py-24 lg:py-28 bg-card/30 border-y border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="تصویر کلی"
            title="نمای یک‌نگاهی"
            description="شاخص‌های کلیدی مسیر آکادمیک و حرفه‌ای به‌صورت بصری"
          />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <SectionReveal key={s.label} delay={0.1 * i}>
              <Card className="card-lift h-full border-border/60 bg-background/60 flex items-center justify-center py-6">
                <CardContent className="p-4">
                  <CircularProgress
                    value={s.value}
                    label={s.label}
                    sublabel={s.sublabel}
                    delay={0.1 * i}
                  />
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            * درصد پیشرفت رساله تخمینی است و ارقام مهارت‌ها بر اساس بازخورد
            همکاران و ارزیابی خودی تنظیم شده‌اند. این شاخص‌ها به‌صورت دوره‌ای
            به‌روز می‌شوند.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
