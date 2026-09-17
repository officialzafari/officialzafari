"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Wrapper that reveals its children with a subtle upward fade
 * when scrolled into view. Classic, restrained motion.
 *
 * Robustness: content is rendered visible by default (good for SEO,
 * no-JS users, and full-page screenshot tools). The hide-until-inView
 * behavior only kicks in after the component has mounted on the client.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount (SSR + first client paint): render plain visible content.
  // This guarantees crawlers, no-JS users, and screenshot tools see everything.
  if (!mounted) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
