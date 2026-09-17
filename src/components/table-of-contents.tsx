"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * Extracts H2/H3 headings from rendered Markdown content.
 * The ArticleContent component renders `## ` as h2 and `### ` as h3.
 * We generate URL-safe ids from the heading text (transliteration not needed —
 * we just slugify any non-alphanumeric chars).
 */
function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) {
      items.push({ id: slugify(h2[1]), text: h2[1].trim(), level: 2 });
    } else if (h3) {
      items.push({ id: slugify(h3[1]), text: h3[1].trim(), level: 3 });
    }
  }
  return items;
}

function slugify(text: string): string {
  // Keep Persian chars but replace spaces and punctuation
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\u0600-\u06FF\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Client-side TOC that highlights the active section and allows navigation.
 * Renders as a sticky sidebar on desktop, collapsible button on mobile.
 */
export function TableOfContents({ content }: { content: string }) {
  const items = React.useMemo(() => extractToc(content), [content]);
  const [activeId, setActiveId] = React.useState<string>("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (items.length === 0) return;
    if (typeof window === "undefined") return;

    // Assign ids to actual heading elements in the DOM
    items.forEach((item) => {
      // Find heading elements whose text matches
      const headings = document.querySelectorAll("h2, h3");
      headings.forEach((h) => {
        if (h.textContent?.trim() === item.text && !h.id) {
          h.id = item.id;
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 0.5, 1] }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  const TocList = (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 flex items-center gap-1.5">
        <List className="h-3.5 w-3.5" />
        فهرست مطالب
      </p>
      <ul className="space-y-0.5 border-r border-border/60 pe-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block py-1 text-xs leading-relaxed transition-colors",
                item.level === 3 && "ps-3 text-[11px]",
                activeId === item.id
                  ? "text-primary font-medium border-r-2 border-primary -me-0.5 pe-1.5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside className="hidden xl:block fixed top-24 start-8 w-56 max-h-[70vh] overflow-y-auto scrollbar-gold z-30">
        {TocList}
      </aside>

      {/* Mobile: collapsible button */}
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md"
          aria-expanded={mobileOpen}
        >
          <List className="h-3.5 w-3.5" />
          فهرست مطالب
          <span className="text-[10px] text-muted-foreground persian-num">
            ({items.length})
          </span>
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute z-40 mt-2 p-4 rounded-lg border border-border/60 bg-background shadow-lg max-w-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-primary">فهرست</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="بستن"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {TocList}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
