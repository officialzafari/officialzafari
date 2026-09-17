"use client";

import * as React from "react";

/**
 * Lightweight Markdown renderer for Persian RTL articles.
 * Supports: headings (h1-h3), paragraphs, unordered/ordered lists,
 * bold, inline code, and blockquotes. No external markdown lib needed.
 *
 * This is intentionally simple — for production you'd want remark/rehype.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Pattern matches **bold**, `code`
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(pattern);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
          dir="ltr"
        >
          {part.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(<React.Fragment key={`${keyPrefix}-t-${i}`}>{part}</React.Fragment>);
    }
  });
  return nodes;
}

export function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = (key: string) => {
    if (!list) return;
    const items = list.items;
    const Tag = list.type === "ol" ? "ol" : "ul";
    blocks.push(
      <Tag
        key={key}
        className={`my-4 space-y-2 ${
          list.type === "ol" ? "list-decimal" : "list-disc"
        } ps-6 text-foreground/90 leading-relaxed marker:text-primary`}
      >
        {items.map((it, i) => (
          <li key={i} className="text-base">
            {renderInline(it, `${key}-${i}`)}
          </li>
        ))}
      </Tag>
    );
    list = null;
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList(`list-${i}`);
      return;
    }
    if (line.startsWith("### ")) {
      flushList(`list-${i}`);
      blocks.push(
        <h3
          key={`h3-${i}`}
          className="mt-8 mb-3 text-xl font-bold text-foreground tracking-persian"
        >
          {line.slice(4)}
        </h3>
      );
      return;
    }
    if (line.startsWith("## ")) {
      flushList(`list-${i}`);
      blocks.push(
        <h2
          key={`h2-${i}`}
          className="mt-10 mb-4 text-2xl font-bold text-foreground tracking-persian border-b border-border/60 pb-2"
        >
          {line.slice(3)}
        </h2>
      );
      return;
    }
    if (line.startsWith("# ")) {
      flushList(`list-${i}`);
      blocks.push(
        <h1
          key={`h1-${i}`}
          className="mt-8 mb-4 text-3xl font-extrabold text-foreground tracking-persian"
        >
          {line.slice(2)}
        </h1>
      );
      return;
    }
    // Unordered list
    if (line.startsWith("- ")) {
      if (!list || list.type !== "ul") {
        flushList(`list-${i}`);
        list = { type: "ul", items: [] };
      }
      list.items.push(line.slice(2));
      return;
    }
    // Ordered list (e.g. "1. text")
    if (/^\d+\.\s/.test(line)) {
      if (!list || list.type !== "ol") {
        flushList(`list-${i}`);
        list = { type: "ol", items: [] };
      }
      list.items.push(line.replace(/^\d+\.\s/, ""));
      return;
    }
    // Blockquote
    if (line.startsWith("> ")) {
      flushList(`list-${i}`);
      blocks.push(
        <blockquote
          key={`bq-${i}`}
          className="my-4 border-r-4 border-primary ps-4 py-2 text-muted-foreground italic bg-muted/30 rounded-s"
        >
          {renderInline(line.slice(2), `bq-${i}`)}
        </blockquote>
      );
      return;
    }
    // Regular paragraph
    flushList(`list-${i}`);
    blocks.push(
      <p
        key={`p-${i}`}
        className="my-4 text-base sm:text-lg text-foreground/85 leading-relaxed"
      >
        {renderInline(line, `p-${i}`)}
      </p>
    );
  });
  flushList("list-final");

  return <div className="prose-persian">{blocks}</div>;
}
