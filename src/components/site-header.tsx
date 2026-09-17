"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { DownloadCVButton } from "@/components/download-cv-button";
import { KeyboardHint } from "@/components/keyboard-hint";
import { navItems, person } from "@/lib/data";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const sectionIds = React.useMemo(() => navItems.map((n) => n.id), []);
  const active = useActiveSection(sectionIds);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 no-print",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-2">
        {/* Logo / Name */}
        <Link
          href="#home"
          className="group flex items-center gap-2 shrink-0"
          onClick={closeMobile}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary font-bold text-sm transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            ع
            <span className="absolute inset-0 rounded-full border border-primary/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-persian text-foreground">
              {person.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {person.title}
            </span>
          </span>
        </Link>

        {/* Desktop nav — xl breakpoint because we have 11 items */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative px-2.5 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-primary rounded-full"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <KeyboardHint />
          <DownloadCVButton
            size="sm"
            variant="ghost"
            className="hidden lg:inline-flex text-muted-foreground hover:text-primary"
          />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="#contact">ارتباط با من</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="منو"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md"
          >
            <nav className="container mx-auto flex flex-col px-4 py-3">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex gap-2">
                <Button
                  asChild
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="#contact" onClick={closeMobile}>
                    ارتباط با من
                  </Link>
                </Button>
                <DownloadCVButton
                  size="sm"
                  variant="outline"
                  className="flex-1 border-primary/40 text-primary hover:bg-primary/10"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
