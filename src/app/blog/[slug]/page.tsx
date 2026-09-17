import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { person } from "@/lib/data";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { ArticleContent } from "@/components/article-content";
import { ArrowRight, Calendar, Tag, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Params = { params: Promise<{ slug: string }> };

// Pre-render کردن همه مقالات در build time (استاتیک)
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

// تولید metadata برای هر مقاله
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "مقاله یافت نشد" };
  }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      locale: "fa_IR",
      publishedTime: article.publishedAt,
      authors: [person.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

function formatPersianDate(d: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "long",
    }).format(new Date(d));
  } catch {
    return "—";
  }
}

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  const fa = [
    "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰",
    "۱۱", "۱۲", "۱۳", "۱۴", "۱۵",
  ];
  return fa[Math.min(mins - 1, fa.length - 1)] + " دقیقه";
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const tags = article.tags;
  const related = getRelatedArticles(slug, 3);

  const siteUrl = `https://${person.domain}`;
  const shareUrl = `${siteUrl}/blog/${article.slug}`;

  return (
    <>
      <ReadingProgress />
      {/* Desktop TOC */}
      <div className="hidden xl:block">
        <TableOfContents content={article.content} />
      </div>
      <SiteHeader />
      <main className="flex-1 bg-parchment">
        <article className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile TOC trigger */}
            <div className="xl:hidden mb-6 relative">
              <TableOfContents content={article.content} />
            </div>

            <div className="xl:px-14">
              <div className="max-w-3xl mx-auto">
                {/* Back link */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  بازگشت به وبلاگ
                </Link>

                {/* Header */}
                <header className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {formatPersianDate(article.publishedAt)}
                    </span>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {readingTime(article.content)} مطالعه
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-persian text-foreground leading-tight">
                    {article.title}
                  </h1>

                  <div className="flex items-center gap-3" dir="ltr">
                    <span className="h-px w-10 bg-gradient-to-l from-primary to-transparent" />
                    <span className="text-primary">❖</span>
                    <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
                  </div>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[11px] bg-primary/10 text-primary border-primary/20"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Author + Share */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-6 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary font-bold text-xs">
                        ع
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {person.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {person.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          article.title
                        )}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        aria-label="اشتراک در توییتر"
                      >
                        <Share2 className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          shareUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        aria-label="اشتراک در لینکدین"
                      >
                        <Share2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </header>

                {/* Content */}
                <div className="mt-8">
                  <ArticleContent content={article.content} />
                </div>

                {/* Footer CTA */}
                <div className="mt-12 p-6 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    از این یادداشت خوشتان آمد؟
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    با من در ارتباط باشید
                  </Link>
                </div>

                {/* Related articles */}
                {related.length > 0 && (
                  <div className="mt-16 pt-8 border-t border-border/60">
                    <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                      <span className="h-px w-6 bg-primary" />
                      یادداشت‌های مرتبط
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {related.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/blog/${r.slug}`}
                          className="group block rounded-lg border border-border/60 bg-background/60 p-4 transition-all hover:border-primary hover:shadow-md"
                        >
                          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-primary" />
                            {formatPersianDate(r.publishedAt)}
                          </p>
                          <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {r.title}
                          </h3>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {r.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
