"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Converts latin digits in a string to Persian digits.
 */
function toPersianDigits(input: string): string {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/[0-9]/g, (d) => fa[Number(d)]);
}

/**
 * Animated count-up component that runs once when scrolled into view.
 * Supports a numeric `value` and optional `suffix` (e.g. "+", "٪").
 * The displayed number is converted to Persian digits.
 *
 * If the value contains non-numeric characters (e.g. "اکنون"), it is
 * rendered as-is without animation.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Try to parse a leading integer out of the value (e.g. "۳+" -> 3)
  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : null;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    toPersianDigits(String(Math.round(v))) + suffix
  );
  const [display, setDisplay] = React.useState(
    target === null ? value : toPersianDigits("0") + suffix
  );

  React.useEffect(() => {
    if (target === null) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(count, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        setDisplay(toPersianDigits(String(Math.round(v))) + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, target, duration, suffix, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: inView ? 1 : 0.4 }}
      transition={{ duration: 0.4 }}
    >
      {display}
    </motion.span>
  );
}
