"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Reading progress bar fixed to the top of the viewport.
 * Tracks scroll within the article element (not whole page, so header
 * and footer don't count). Falls back to page scroll if no article found.
 */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const calc = () => {
      const article = document.querySelector("article");
      let scrollTop = window.scrollY;
      let docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (article) {
        const rect = article.getBoundingClientRect();
        // scrollTop relative to article start
        const articleTop = rect.top + window.scrollY;
        const articleHeight = rect.height;
        const scrollIntoArticle = window.scrollY - articleTop;
        const usable = Math.max(0, articleHeight - window.innerHeight);
        if (usable > 0) {
          const p = Math.min(100, Math.max(0, (scrollIntoArticle / usable) * 100));
          setProgress(p);
          return;
        }
      }
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc, { passive: true });
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 z-[60] h-[3px] bg-gradient-to-l from-primary via-accent to-primary origin-right"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1, ease: "linear" }}
    />
  );
}
