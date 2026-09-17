import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/lib/data";
import { getAllArticles, getAllTags, type Article, type TagCount } from "@/lib/articles";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { BlogSearchClient } from "@/components/blog-search-client";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  FileText,
  Rss,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "وبلاگ و یادداشت‌های اقتصادی",
  description: "مقالات و تحلیل‌های علی ظفری مقدم در حوزه اقتصاد، توسعه و سیاست‌گذاری.",
  openGraph: {
    title: `وبلاگ | ${person.name}`,
    description: "مقالات و تحلیل‌های اقتصادی",
    type: "website",
    locale: "fa_IR",
  },
};

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

export default function BlogPage() {
  const allArticles: Article[] = getAllArticles();
  const allTags: TagCount[] = getAllTags();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-parchment">
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-2xl mb-8">
              <div className="flex items-start justify-between gap-3 mb-4">
                <Link
                  href="/#home"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  بازگشت به خانه
                </Link>
                <a
                  href="/feed.xml"
                  className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  title="اشتراک RSS"
                >
                  <Rss className="h-3 w-3" />
                  RSS
                </a>
              </div>
              <p className="text-sm font-medium tracking-[0.2em] text-primary/80 uppercase">
                وبلاگ
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-persian text-foreground">
                یادداشت‌های اقتصادی
              </h1>
              <div className="flex items-center gap-3 my-4" dir="ltr">
                <span className="h-px w-12 bg-gradient-to-l from-primary to-transparent" />
                <span className="text-primary text-lg">❖</span>
                <span className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
              </div>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                تحلیل‌ها و یادداشت‌هایی در حوزه اقتصاد، توسعه پایدار و
                سیاست‌گذاری — با نگاهی علمی و کاربردی به مسائل اقتصاد ایران.
              </p>
            </div>

            {/* Client-side search + filter */}
            <BlogSearchClient articles={allArticles} tags={allTags} />

            {/* Inline rendering for "no JS" fallback — initial list (all articles) */}
            <noscript>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {allArticles.slice(0, 6).map((a) => (
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
                        <Link href={`/blog/${a.slug}`}>
                          {a.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {a.excerpt}
                      </p>
                      {a.tags.slice(0, 3).map((t) => (
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
                  </article>
                ))}
              </div>
            </noscript>
          </div>
        </section>
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}

// Export utilities for the client component (re-exported to avoid duplication)
export { formatDate, readingTime };
