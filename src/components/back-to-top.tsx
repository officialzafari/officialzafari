"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolledPast } from "@/lib/hooks";

/**
 * Floating "back to top" button that appears after scrolling.
 * Placed in the bottom-left corner to avoid overlapping with
 * the LTR scroll cue and to be thumb-friendly on mobile (RTL).
 */
export function BackToTop() {
  const show = useScrolledPast(500);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="بازگشت به بالا"
          title="بازگشت به بالا"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-background/90 text-primary shadow-lg backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
