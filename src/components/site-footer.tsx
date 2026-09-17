"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, Github, MapPin, Rss } from "lucide-react";
import { person } from "@/lib/data";
import { navItems } from "@/lib/data";

export function SiteFooter() {
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
    new Date()
  );

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary font-bold text-sm">
                ع
              </span>
              <span className="font-bold text-foreground tracking-persian">
                {person.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {person.title}، ساکن {person.city}. وبسایت شخصی برای معرفی
              تجربیات، تحصیلات و مهارت‌های حرفه‌ای.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              دسترسی سریع
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">ارتباط</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  dir="ltr"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span className="break-all">{person.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${person.phone}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>{person.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{person.city}، {person.country}</span>
              </li>
              <li>
                <a
                  href={person.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  dir="ltr"
                >
                  <Github className="h-4 w-4 text-primary shrink-0" />
                  <span>github.com/officialzafari</span>
                </a>
              </li>
              <li>
                <a
                  href="/feed.xml"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Rss className="h-4 w-4 text-primary shrink-0" />
                  <span>خوراک RSS</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {year} {person.name}. تمامی حقوق محفوظ است.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            ساخته‌شده با Next.js و Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
