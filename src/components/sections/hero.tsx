"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadCVButton } from "@/components/download-cv-button";
import { AnimatedCounter } from "@/components/animated-counter";
import { person, stats } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-parchment"
      aria-label="معرفی کوتاه"
    >
      {/* Decorative gold radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 30%, hsl(38 60% 55% / 0.18), transparent 60%), radial-gradient(40% 40% at 20% 80%, hsl(20 70% 50% / 0.10), transparent 60%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>در دسترس از شبکه‌های اجتماعی</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-persian text-foreground leading-tight"
            >
              {person.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 text-xl sm:text-2xl text-gold-gradient font-bold"
            >
              {person.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {person.tagline}. ساکن {person.city}، با تجربه همکاری با
              نهادهای بین‌المللی و علاقه‌مند به پیوند میان اقتصاد نظری و
              توسعه پایدار.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="#contact">
                  ارتباط با من
                  <ArrowLeft className="ms-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/40 text-foreground hover:bg-primary/10 hover:text-primary"
              >
                <Link href="#about">درباره من</Link>
              </Button>
              <DownloadCVButton
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
              />
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="group rounded-lg border border-border/60 bg-card/50 px-3 py-3 text-center transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
                >
                  <dt className="text-2xl font-bold text-primary persian-num tabular-nums">
                    <AnimatedCounter value={s.value} />
                  </dt>
                  <dd className="mt-0.5 text-[11px] text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative frame */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full border border-primary/30"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, transparent 0deg, hsl(38 60% 55% / 0.25) 90deg, transparent 180deg, hsl(20 70% 50% / 0.20) 270deg, transparent 360deg)",
                  filter: "blur(8px)",
                }}
              />
              <div className="relative aspect-[4/5] w-56 sm:w-72 lg:w-80 overflow-hidden rounded-full border-4 border-card shadow-2xl">
                <Image
                  src={person.profileImage}
                  alt={person.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 20rem"
                  className="object-cover object-top"
                />
              </div>
              {/* Name plate */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-primary/40 bg-background/95 px-4 py-1.5 text-xs font-medium text-foreground whitespace-nowrap shadow-md"
              >
                {person.city}، ایران
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-[10px] tracking-widest">پایین</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="h-4 w-4 text-primary" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
