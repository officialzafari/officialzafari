"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X, Tag, Calendar, ArrowLeft, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Article, TagCount } from "@/lib/articles";

function formatDate(d: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(
      new Date(d)
    );
  } catch {
    return "—";
  }
}

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  const fa = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲", "۱۳", "۱۴", "۱۵"];
  return fa[Math.min(mins - 1, fa.length - 1)] + " دقیقه";
}

function toPersianNumber(n: number): string {
  return new Intl.NumberFormat("fa-IR").format(n);
}

const PER_PAGE = 6;

export function BlogSearchClient({
  articles,
  tags,
}: {
  articles: Article[];
  tags: TagCount[];
}) {
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | undefined>(undefined);
  const [page, setPage] = React.useState(1);

  // Reset page on filter change
  React.useEffect(() => {
    setPage(1);
  }, [query, activeTag]);

  const filtered = React.useMemo(() => {
    let result = articles;
    if (query.trim()) {
      const q = query.trim();
      result = result.filter(
        (a) =>
          a.title.includes(q) ||
          a.excerpt.includes(q) ||
          a.content.includes(q)
      );
    }
    if (activeTag) {
      result = result.filter((a) => a.tags.includes(activeTag));
    }
    return result;
  }, [articles, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const hasFilters = !!query || !!activeTag;

  const clearAll = () => {
    setQuery("");
    setActiveTag(undefined);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Search + tags */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در یادداشت‌ها…"
            className="pe-9 ps-9 h-11 bg-background/80 border-primary/30 focus-visible:border-primary"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              aria-label="پاک کردن جستجو"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              برچسب‌ها:
            </span>
            {tags.map((t) => (
              <button
                key={t.tag}
                type="button"
                onClick={() =>
                  setActiveTag(activeTag === t.tag ? undefined : t.tag)
                }
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                  activeTag === t.tag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:border-primary hover:text-primary"
                )}
              >
                {t.tag}
                <span
                  className={cn(
                    "text-[10px]",
                    activeTag === t.tag
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground/60"
                  )}
                >
                  {toPersianNumber(t.count)}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Active filters + clear */}
        {hasFilters && (
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/30"
            >
              فیلتر فعال
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              پاک کردن فیلترها
            </Button>
          </div>
        )}
      </div>

      {/* Results count */}
      {hasFilters && (
        <p className="text-sm text-muted-foreground">
          {filtered.length > 0
            ? `${toPersianNumber(filtered.length)} یادداشت یافت شد`
            : "نتیجه‌ای یافت نشد"}
          {query && (
            <>
              {" "}برای «<span className="text-foreground font-medium">{query}</span>»
            </>
          )}
          {activeTag && (
            <>
              {" "}با برچسب «<span className="text-primary font-medium">{activeTag}</span>»
            </>
          )}
        </p>
      )}

      {/* Articles grid */}
      {visible.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border/60 rounded-xl">
          <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">
            {hasFilters
              ? "هیچ یادداشتی با این فیلتر یافت نشد."
              : "هنوز مقاله‌ای منتشر نشده است."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((a) => {
            const articleTags = a.tags.slice(0, 3);
            return (
              <article
                key={a.slug}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/60 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{formatDate(a.publishedAt)}</span>
                    <span className="text-border">•</span>
                    <span>{readingTime(a.content)} مطالعه</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    <Link
                      href={`/blog/${a.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {a.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {a.excerpt}
                  </p>
                  {articleTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {articleTags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px] bg-primary/10 text-primary border-primary/20"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="pt-3 flex items-center gap-1 text-sm font-medium text-primary">
                    ادامه مطلب
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            قبلی
          </Button>
          <span className="text-sm text-muted-foreground px-3 persian-num">
            صفحه {toPersianNumber(currentPage)} از {toPersianNumber(totalPages)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            بعدی
          </Button>
        </div>
      )}
    </div>
  );
}
