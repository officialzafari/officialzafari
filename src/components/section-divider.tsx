"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Decorative divider with a central gold ornament and gradient lines.
 * Use between major sections to add classic, formal texture.
 */
export function SectionDivider({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "diamond" | "double";
}) {
  const ornament =
    variant === "diamond" ? "◆" : variant === "double" ? "❖" : "✦";

  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-3 py-2 ${className ?? ""}`}
    >
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/60 origin-right"
      />
      <motion.span
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-primary text-lg leading-none"
      >
        {ornament}
      </motion.span>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/60 origin-left"
      />
    </div>
  );
}
