import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
};

/**
 * تمام مقالات را از پوشه content/articles می‌خواند.
 * هر فایل .md با frontmatter (title, slug, excerpt, tags, publishedAt) parse می‌شود.
 */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) return [];

  const fileNames = fs.readdirSync(articlesDirectory).filter((f) => f.endsWith(".md"));

  const articles = fileNames.map((name) => {
    const fullPath = path.join(articlesDirectory, name);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: (data.slug as string) || name.replace(/\.md$/, ""),
      title: (data.title as string) || name,
      excerpt: (data.excerpt as string) || "",
      content,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      publishedAt: (data.publishedAt as string) || new Date().toISOString(),
    } as Article;
  });

  // جدیدترین‌ها اول
  return articles.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) || null;
}

export type TagCount = { tag: string; count: number };

export function getAllTags(): TagCount[] {
  const articles = getAllArticles();
  const tagMap = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags) {
      tagMap.set(t, (tagMap.get(t) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * مقالات مرتبط — دارای حداقل یک برچسب مشترک.
 */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  return getAllArticles()
    .filter((a) => a.slug !== slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, limit);
}
