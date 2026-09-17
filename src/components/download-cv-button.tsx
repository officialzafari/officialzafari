"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Triggers the browser's print dialog so the user can save the page as PDF.
 * A print stylesheet hides the header/footer/forms and keeps only the
 * professional content for a clean CV-style PDF.
 */
export function DownloadCVButton({
  className,
  variant = "outline",
  size = "lg",
}: {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  const onDownload = React.useCallback(() => {
    if (typeof window === "undefined") return;
    window.print();
  }, []);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={onDownload}
      className={className}
    >
      <Download className="h-4 w-4" />
      دانلود رزومه (PDF)
    </Button>
  );
}
