import { getAllArticles } from "@/lib/articles";
import { person } from "@/lib/data";

export const dynamic = "force-static";

// Generate RSS 2.0 feed for the blog (static)
export function GET() {
  const siteUrl = `https://${person.domain}`;
  const now = new Date().toUTCString();

  const articles = getAllArticles().slice(0, 20);

  const items = articles
    .map((a) => {
      const url = `${siteUrl}/blog/${a.slug}`;
      const pubDate = new Date(a.publishedAt).toUTCString();
      const plainExcerpt = a.excerpt
        .replace(/[#*`]/g, "")
        .replace(/\n+/g, " ")
        .trim();
      const htmlDesc = `<p>${plainExcerpt}</p>`;
      return `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${htmlDesc}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${person.name} — یادداشت‌های اقتصادی]]></title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description><![CDATA[مقالات و تحلیل‌های اقتصادی علی ظفری مقدم]]></description>
    <language>fa-IR</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>${person.email} (${person.name})</managingEditor>
    <webMaster>${person.email} (${person.name})</webMaster>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
