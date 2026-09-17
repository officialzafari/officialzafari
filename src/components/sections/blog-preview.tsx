import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BlogPreview() {
  const articles = getAllArticles().slice(0, 3);

  if (articles.length === 0) return null;

  const formatDate = (d: string) => {
    try {
      return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(
        new Date(d)
      );
    } catch {
      return "";
    }
  };

  return (
    <section
      id="blog"
      className="py-20 sm:py-24 lg:py-28 bg-card/30 border-y border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="وبلاگ"
            title="آخرین یادداشت‌ها"
            description="تحلیل‌ها و یادداشت‌های اقتصادی در حوزه توسعه، سیاست‌گذاری و اقتصاد ایران"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => {
            const tags = a.tags.slice(0, 2);
            return (
              <SectionReveal key={a.slug} delay={0.08 * i}>
                <Card className="card-lift group h-full border-border/60 bg-background overflow-hidden relative">
                  <span
                    aria-hidden
                    className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary via-primary to-accent"
                  />
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                        <FileText className="h-5 w-5" />
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(a.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      <Link
                        href={`/blog/${a.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {a.excerpt}
                    </p>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tags.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="text-[10px] bg-primary/5 text-primary border-primary/20"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md"
            >
              مشاهده همه یادداشت‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
