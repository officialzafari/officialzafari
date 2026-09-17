# راهنمای کامل Deploy — نسخه استاتیک

این سایت اکنون **کاملاً استاتیک** است و روی GitHub Pages، Netlify static یا هر static host کار می‌کند. هیچ backend یا دیتابیانی لازم نیست.

---

## مراحل Deploy

### مرحله ۱: دانلود فایل پروژه

فایل `download/zafarimoghaddam-site-static.zip` (۴۲۹ کیلوبایت) را دانلود کنید.

### مرحله ۲: استخراج فایل‌ها

فایل zip را در یک پوشه (مثلاً `~/Downloads/Project/officialzafari`) استخراج کنید.

### مرحله ۳: نصب پکیج‌ها

```bash
cd officialzafari
bun install
```

### مرحله ۴: تست محلی (اختیاری)

```bash
bun run dev
```

سپس به `http://localhost:3000` بروید — سایت باید کار کند.

### مرحله ۵: commit و push به GitHub

```bash
git init
git add .
git commit -m "Static personal branding site for Ali Zafari Moghaddam"
git branch -M main
git remote add origin https://github.com/officialzafari/officialzafari.git
git push -u origin main
```

### مرحله ۶: فعال‌سازی GitHub Pages

1. به `https://github.com/officialzafari/officialzafari` بروید
2. **Settings → Pages**
3. **Source:** `GitHub Actions` انتخاب کنید
4. صبر کنید تا workflow سبز شود (۲-۳ دقیقه)

### مرحله ۷: تنظیم Custom Domain

1. در همان **Settings → Pages**
2. در بخش **Custom domain** بنویسید: `zafarimoghaddam.ir`
3. روی **Save** کلیک کنید
4. صبر کنید تا GitHub تأیید کند
5. تیک **Enforce HTTPS** را بزنید (وقتی فعال شد)

### مرحله ۸: تنظیم Cloudflare DNS

1. به https://dash.cloudflare.com بروید (یا ثبت‌نام کنید)
2. روی **+ Add site** کلیک کنید
3. نام دامنه: `zafarimoghaddam.ir`
4. طرح **Free** انتخاب کنید
5. روی **Continue** کلیک کنید

این رکوردها را اضافه کنید (همه روی **DNS only** = خاکستری):

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `officialzafari.github.io` |

سپس در **SSL/TLS → Overview**: حالت را روی **Full** بگذارید.

### مرحله ۹: تغییر Name Server در ثبت‌کننده دامنه .ir

1. وارد پنل ثبت‌کننده دامنه شوید (پارس‌دیتا، ایرانیک، پیشگامان، و...)
2. به بخش **Name Servers** بروید
3. دو Name Server Cloudflare را وارد کنید (مثل `aria.ns.cloudflare.com` و `kai.ns.cloudflare.com`)
4. ذخیره کنید

### مرحله ۱۰: انتظار و فعال‌سازی HTTPS

- ۱۵ دقیقه تا ۲۴ ساعت صبر کنید
- در Cloudflare وقتی پیام **"Status: Active"** را دیدید، یعنی فعال شد
- در GitHub → **Settings → Pages** تیک **Enforce HTTPS** را بزنید

### مرحله ۱۱: تست نهایی

به `https://zafarimoghaddam.ir` بروید — سایت باید باز شود! 🎉

---

## ویژگی‌های نسخه استاتیک

| بخش | وضعیت |
|-----|-------|
| طراحی فارسی RTL کلاسیک/رسمی با پالت طلایی | ✅ |
| تم روشن/تیره با toggle | ✅ |
| ۱۹+ بخش استاتیک (Hero, About, Now, PhDProgress, Journey, Experience, Education, Quote, Research, Publications, BlogPreview, VisualStats, Skills, SkillsRadar, Testimonials, ReadingList, FAQ, Contact, ShareCard) | ✅ |
| وبلاگ با ۵ مقاله Markdown | ✅ |
| جستجو + فیلتر برچسب + pagination (client-side) | ✅ |
| صفحه جزئیات مقاله با TOC + ReadingProgress + Related | ✅ |
| فرم تماس با mailto | ✅ |
| RSS feed `/feed.xml` | ✅ |
| Sitemap `/sitemap.xml` | ✅ |
| OG image داینامیک `/api/og` (static pre-rendered) | ✅ |
| SEO + Schema.org Person | ✅ |
| Keyboard shortcuts + Command Palette | ✅ |
| Print-to-PDF CV download | ✅ |
| Favicon + PWA manifest | ✅ |
| **پنل مدیریت `/admin`** | ❌ حذف شد (نیاز به backend داشت) |
| **خبرنامه** | ❌ حذف شد (نیاز به backend داشت) |
| **نظرات** | ❌ حذف شد (نیاز به backend داشت) |
| **ذخیره پیام‌های تماس در DB** | ❌ حذف شد (mailto استفاده می‌شود) |

---

## اضافه کردن مقاله جدید

برای اضافه کردن مقاله جدید:

1. فایل جدید در `content/articles/` بسازید (مثلاً `new-article.md`)
2. با این frontmatter شروع کنید:

```markdown
---
title: "عنوان مقاله"
slug: new-article
excerpt: "خلاصه کوتاه"
tags: ["برچسب۱", "برچسب۲", "اقتصاد"]
publishedAt: "2024-10-01"
---

# عنوان مقاله

محتوای مقاله...
```

3. commit و push کنید — GitHub Actions به‌طور خودکار سایت را rebuild می‌کند.

---

## عیب‌یابی

### Build ناموفق در GitHub Actions

به تب **Actions** بروید و log را ببینید. اگر خطای Prisma دیدید — نباید ببینید چون Prisma حذف شده. اگر خطای دیگری بود، log را برایم بفرستید.

### سایت باز نمی‌شود

- چک کنید `nslookup zafarimoghaddam.ir` یک IP برگرداند
- اگر خطای SSL داد، در Cloudflare → SSL/TLS → حالت را روی **Full** بگذارید

### فرم تماس کار نمی‌کند

فرم تماس از `mailto:` استفاده می‌کند — باید client ایمیل شما (مثل Mail.app یا Outlook) باز شود. اگر نشد، مستقیماً به `zafari_moghadam@yahoo.com` ایمیل بزنید.
