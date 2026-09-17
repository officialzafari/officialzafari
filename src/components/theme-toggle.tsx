"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = resolvedTheme ?? theme;
  const isDark = current === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "روشن کردن حالت روز" : "روشن کردن حالت شب"}
      title={isDark ? "حالت روز" : "حالت شب"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-9 w-9 rounded-full border border-border/60 hover:border-primary hover:bg-accent/10"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 text-primary" />
        ) : (
          <Moon className="h-4 w-4 text-primary" />
        )
      ) : (
        <div className="h-4 w-4" />
      )}
    </Button>
  );
}
