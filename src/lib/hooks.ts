"use client";

import * as React from "react";

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Returns the id of the active section.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry most in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Trigger when section's top passes ~40% of viewport
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Returns scroll progress as a 0–100 number.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const calc = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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

  return progress;
}

/**
 * Returns true once the user has scrolled past the threshold (default 400px).
 */
export function useScrolledPast(threshold = 400): boolean {
  const [past, setPast] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return past;
}
