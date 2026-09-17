"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { skills } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Animated SVG radar chart showing skill levels across all skills.
 * Classic gold/amber theme, dark/light aware via CSS variables.
 */
function RadarChart({
  data,
  size = 280,
}: {
  data: { name: string; level: number }[];
  size?: number;
}) {
  const center = size / 2;
  const radius = size / 2 - 36; // padding for labels
  const count = data.length;
  const angleStep = (Math.PI * 2) / count;

  // Compute polygon points for each skill level ring
  const rings = [0.25, 0.5, 0.75, 1.0];

  const pointAt = (i: number, ratio: number) => {
    // Start from top (-90deg) and go clockwise
    const angle = -Math.PI / 2 + i * angleStep;
    const r = radius * ratio;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
    };
  };

  const dataPoints = data.map((d, i) => pointAt(i, d.level / 100));
  const dataPath =
    dataPoints
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ") + " Z";

  return (
    <div className="flex justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="radar-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="radar-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        {/* Concentric rings */}
        {rings.map((r, ri) => {
          const pts = data
            .map((_, i) => {
              const p = pointAt(i, r);
              return `${p.x},${p.y}`;
            })
            .join(" ");
          return (
            <polygon
              key={ri}
              points={pts}
              fill="none"
              stroke="var(--border)"
              strokeWidth={1}
              opacity={0.5}
            />
          );
        })}

        {/* Spokes */}
        {data.map((_, i) => {
          const p = pointAt(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="var(--border)"
              strokeWidth={1}
              opacity={0.4}
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="url(#radar-fill)"
          stroke="url(#radar-stroke)"
          strokeWidth={2}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--primary)"
            stroke="var(--background)"
            strokeWidth={2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const p = pointAt(i, 1.18);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[11px] font-semibold fill-foreground"
            >
              {d.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function SkillsRadar() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <SectionHeading
                align="start"
                eyebrow="نمودار مهارت‌ها"
                title="نمای راداری مهارت‌ها"
                description="نمایش بصری یکپارچه از مهارت‌های حرفه‌ای، نرم و زبانی"
              />
              <div className="mt-6 space-y-2.5">
                {skills.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="flex items-center justify-between gap-3 py-2 border-b border-border/40 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary persian-num">
                      {s.level}٪
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <SectionReveal delay={0.15}>
              <Card className="card-lift border-border/60 bg-card/40">
                <CardContent className="p-6 sm:p-8">
                  <RadarChart data={skills} />
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
