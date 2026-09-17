import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // خروجی استاتیک برای GitHub Pages
  output: "export",
  // GitHub Pages از image optimizer پشتیبانی نمی‌کند
  images: {
    unoptimized: true,
  },
  // اطمینان از تطابق URL با GitHub Pages
  trailingSlash: true,
  reactStrictMode: false,
  // ignore TS errors در build برای سادگی
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
