import { person } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

// Generate sitemap.xml for static export
export function GET() {
  const base = `https://${person.domain}`;
  const lastModified = new Date().toISOString();

  const routes = [
    { url: `${base}/`, priority: "1.0", changefreq: "monthly" },
    { url: `${base}/blog`, priority: "0.9", changefreq: "weekly" },
    { url: `${base}/#about`, priority: "0.8", changefreq: "monthly" },
    { url: `${base}/#experience`, priority: "0.8", changefreq: "monthly" },
    { url: `${base}/#education`, priority: "0.7", changefreq: "yearly" },
    { url: `${base}/#research`, priority: "0.7", changefreq: "monthly" },
    { url: `${base}/#publications`, priority: "0.7", changefreq: "monthly" },
    { url: `${base}/#skills`, priority: "0.6", changefreq: "yearly" },
    { url: `${base}/#contact`, priority: "0.6", changefreq: "yearly" },
  ];

  const articles = getAllArticles();
  for (const a of articles) {
    routes.push({
      url: `${base}/blog/${a.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${r.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
