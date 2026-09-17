"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/lib/hooks";

/**
 * A thin gold progress bar fixed to the top of the viewport
 * that fills as the user scrolls down the page.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 z-[60] h-[3px] bg-gradient-to-l from-primary via-accent to-primary origin-right"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1, ease: "linear" }}
    />
  );
}
