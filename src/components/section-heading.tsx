"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Classic section heading with Persian ornament divider.
 * Renders a small eyebrow label, a centered title, and a gold divider.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-[0.2em] text-primary/80 uppercase"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-persian text-foreground"
      >
        {title}
      </motion.h2>
      <div className="flex items-center gap-2 my-1" dir="ltr">
        <span className="h-px w-12 bg-gradient-to-l from-primary to-transparent" />
        <span className="text-primary text-lg leading-none">❖</span>
        <span className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
      </div>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={cn(
            "text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
