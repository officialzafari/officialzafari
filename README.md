# وبسایت شخصی علی ظفری مقدم

سایت شخصی علی ظفری مقدم — دانشجوی دکتری اقتصاد. طراحی فارسی RTL، کلاسیک و رسمی با پالت طلایی/کهربایی، با حالت روشن/تیره، وبلاگ، و فرم تماس.

## توسعه محلی

```bash
bun install
bun run dev
```

سایت روی `http://localhost:3000` در دسترس است.

## ساخت خروجی استاتیک

```bash
bun run build
```

خروجی در پوشه `out/` ساخته می‌شود.

## Deploy

این سایت کاملاً استاتیک است و روی GitHub Pages deploy می‌شود. فایل `.github/workflows/deploy.yml` به‌طور خودکار build و deploy را انجام می‌دهد.

برای راهنمای کامل deploy و تنظیم دامنه، فایل `DEPLOYMENT.md` را ببینید.

## ساختار پروژه

```
.
├── content/articles/      # مقالات وبلاگ (Markdown)
├── public/                # فایل‌های استاتیک (تصاویر، CNAME، robots.txt)
├── src/
│   ├── app/               # صفحات Next.js (App Router)
│   ├── components/        # کامپوننت‌های React
│   └── lib/               # helper functions و data
├── .github/workflows/     # GitHub Actions workflow
└── next.config.ts         # تنظیمات Next.js (output: export)
```

## دامنه

سایت روی `https://zafarimoghaddam.ir` در دسترس است.
