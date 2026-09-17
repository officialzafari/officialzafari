"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { faqItems } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 sm:py-24 lg:py-28 bg-card/30 border-y border-border/40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="سوالات متداول"
            title="پرسش‌های رایج"
            description="پاسخ به پرسش‌هایی که ممکن است از من داشته باشید"
          />
        </SectionReveal>

        <div className="mt-12 max-w-3xl mx-auto">
          {/* Interactive accordion — hidden in print */}
          <SectionReveal delay={0.1}>
            <Card className="border-border/60 bg-background/60 no-print">
              <div className="p-2 sm:p-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border-border/60 last:border-b-0"
                    >
                      <AccordionTrigger className="text-start text-sm sm:text-base font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                        <span className="flex items-start gap-2.5">
                          <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed ps-7 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Card>
          </SectionReveal>

          {/* Print-only static list — always visible, no JS dependency */}
          <div className="hidden print:block space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-border/60 rounded-md p-3">
                <p className="font-semibold text-foreground text-sm mb-1">
                  {item.question}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <SectionReveal delay={0.2}>
            <p className="mt-6 text-center text-sm text-muted-foreground no-print">
              پرسش دیگری دارید؟{" "}
              <a
                href="#contact"
                className="text-primary font-medium hover:underline underline-offset-4"
              >
                از طریق فرم تماس بپرسید
              </a>
              .
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
