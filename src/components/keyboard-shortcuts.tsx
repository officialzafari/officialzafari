"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { navItems } from "@/lib/data";

/**
 * Global keyboard shortcuts for power users.
 * - `t`           toggle dark/light theme
 * - `g` + letter  go to section (e.g. `g h` -> home)
 * - `/`           focus first form input in contact section
 * - `Escape`      clear pending `g` state
 *
 * Letters map to the first letter of each nav item id (Persian):
 *   h=home, a=about, e=experience, d=education, r=research,
 *   p=publications, s=skills, t=testimonials, l=reading, f=faq, c=contact
 *
 * NOTE: uses latin letters so it works regardless of the user's
 * keyboard layout (English keys map to fixed actions).
 */
export function KeyboardShortcuts() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [pendingG, setPendingG] = React.useState(false);

  // Map latin letters to nav ids
  const letterToId: Record<string, string> = {
    h: "home",
    a: "about",
    e: "experience",
    d: "education",
    r: "research",
    p: "publications",
    s: "skills",
    t: "testimonials",
    l: "reading", // 'l' for 'list'
    f: "faq",
    c: "contact",
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let gTimer: ReturnType<typeof setTimeout> | null = null;

    const onKey = (e: KeyboardEvent) => {
      // Skip if user is typing in an input/textarea/contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.getAttribute("role") === "textbox")
      ) {
        // Allow Escape to blur
        if (e.key === "Escape") {
          target.blur();
        }
        return;
      }

      // Skip if any modifier is held (let browser shortcuts work)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toLowerCase();

      // `t` toggles theme — but only if not in pending-g state
      if (key === "t" && !pendingG) {
        e.preventDefault();
        const current = resolvedTheme ?? theme;
        setTheme(current === "dark" ? "light" : "dark");
        return;
      }

      // `g` starts the two-key sequence
      if (key === "g" && !pendingG) {
        e.preventDefault();
        setPendingG(true);
        // Auto-clear after 1.2s if no second key
        if (gTimer) clearTimeout(gTimer);
        gTimer = setTimeout(() => setPendingG(false), 1200);
        return;
      }

      // If in pending-g state, the next key navigates
      if (pendingG) {
        const id = letterToId[key];
        if (id) {
          e.preventDefault();
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        setPendingG(false);
        if (gTimer) clearTimeout(gTimer);
        return;
      }

      // `/` focuses first form input in contact section
      if (key === "/") {
        e.preventDefault();
        const contact = document.getElementById("contact");
        if (contact) {
          contact.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            const firstInput = contact.querySelector<HTMLInputElement>(
              "input, textarea"
            );
            firstInput?.focus();
          }, 600);
        }
        return;
      }

      // Escape clears pending-g
      if (key === "escape" && pendingG) {
        setPendingG(false);
        if (gTimer) clearTimeout(gTimer);
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimer) clearTimeout(gTimer);
    };
  }, [pendingG, theme, resolvedTheme, setTheme]);

  // Visual indicator that `g` is pending
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-200 ${
        pendingG
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 rounded-lg border border-primary/40 bg-background/95 px-3 py-2 text-xs font-medium text-primary shadow-lg backdrop-blur-md">
        <kbd className="font-mono">g</kbd>
        <span>→</span>
        <span className="text-muted-foreground">کلید بعدی…</span>
      </div>
    </div>
  );
}
