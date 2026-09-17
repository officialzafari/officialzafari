"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check, Twitter, Linkedin, Facebook, Send } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { person } from "@/lib/data";
import { toast } from "sonner";

export function ShareCard() {
  const [copied, setCopied] = React.useState(false);
  const siteUrl = `https://${person.domain}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      toast.success("آدرس سایت کپی شد!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("کپی ناموفق بود. آدرس را دستی کپی کنید.");
    }
  };

  const shareLinks = [
    {
      name: "توییتر/X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${person.name} — ${person.title}`
      )}&url=${encodeURIComponent(siteUrl)}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "لینکدین",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        siteUrl
      )}`,
      color: "hover:bg-[#0a66c2] hover:text-white",
    },
    {
      name: "فیسبوک",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        siteUrl
      )}`,
      color: "hover:bg-[#1877f2] hover:text-white",
    },
    {
      name: "تلگرام",
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(
        siteUrl
      )}&text=${encodeURIComponent(`${person.name} — ${person.title}`)}`,
      color: "hover:bg-[#0088cc] hover:text-white",
    },
  ];

  return (
    <SectionReveal delay={0.2}>
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden relative">
        {/* Decorative corner ornaments — در داخل wrapper با overflow-hidden */}
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          <span className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <CardContent className="p-5 sm:p-6 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Share2 className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">
                  این صفحه را به اشتراک بگذارید
                </h3>
                <p
                  className="text-xs text-muted-foreground mt-0.5"
                  dir="ltr"
                >
                  {siteUrl}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Social share buttons */}
              {shareLinks.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`اشتراک در ${s.name}`}
                  title={`اشتراک در ${s.name}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors ${s.color}`}
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}

              {/* Copy URL button */}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onCopy}
                className="ms-1 border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    کپی شد
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    کپی آدرس
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionReveal>
  );
}
