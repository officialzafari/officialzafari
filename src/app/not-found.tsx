"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { person, navItems } from "@/lib/data";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20 bg-parchment relative overflow-hidden">
      {/* Decorative gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 30%, hsl(38 60% 55% / 0.15), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-md mx-auto"
      >
        {/* Big 404 */}
        <div className="relative inline-block">
          <span className="text-[8rem] sm:text-[10rem] font-extrabold leading-none text-gold-gradient persian-num">
            ۴۰۴
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-[8rem] sm:text-[10rem] font-extrabold leading-none text-primary/5 persian-num"
          >
            ۴۰۴
          </span>
        </div>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground tracking-persian">
          صفحه پیدا نشد
        </h1>

        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          متأسفیم، صفحه‌ای که به دنبال آن بودید پیدا نشد. ممکن است آدرس اشتباه
          باشد یا صفحه جابجا شده باشد.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/">
              <Home className="ms-1 h-4 w-4" />
              بازگشت به خانه
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/40">
            <Link href="/#contact">
              <Search className="ms-1 h-4 w-4" />
              تماس با من
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-6 border-t border-border/60">
          <p className="text-xs text-muted-foreground mb-3">
            یا به یکی از این بخش‌ها بروید:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/${item.href}`}
                className="rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          {person.name} — {person.title}
        </p>
      </motion.div>
    </main>
  );
}
