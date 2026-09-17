"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { personalQuote } from "@/lib/data";
import { SectionReveal } from "@/components/section-reveal";

export function QuoteBanner() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-primary text-primary-foreground">
      {/* Wrapper برای عناصر تزئینی — اطمینان از overflow-hidden روی blur orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Blur orbs — حالا در داخل یک wrapper با overflow-hidden */}
        <div
          aria-hidden
          className="absolute top-10 right-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur-sm mx-auto"
            >
              <Quote className="h-7 w-7 text-primary-foreground" />
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-persian"
            >
              «{personalQuote.text}»
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="h-px w-8 bg-primary-foreground/50" />
              <cite className="text-base font-medium not-italic text-primary-foreground/90">
                {personalQuote.author}
              </cite>
              <span className="h-px w-8 bg-primary-foreground/50" />
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
