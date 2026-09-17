"use client";

import * as React from "react";
import { Keyboard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ShortcutRow = {
  keys: string[];
  description: string;
};

const navRows: ShortcutRow[] = [
  { keys: ["G", "H"], description: "رفتن به خانه" },
  { keys: ["G", "A"], description: "رفتن به درباره من" },
  { keys: ["G", "E"], description: "رفتن به تجربیات" },
  { keys: ["G", "D"], description: "رفتن به تحصیلات" },
  { keys: ["G", "R"], description: "رفتن به پژوهش" },
  { keys: ["G", "P"], description: "رفتن به انتشارات" },
  { keys: ["G", "S"], description: "رفتن به مهارت‌ها" },
  { keys: ["G", "T"], description: "رفتن به توصیه‌نامه‌ها" },
  { keys: ["G", "L"], description: "رفتن به فهرست مطالعه" },
  { keys: ["G", "F"], description: "رفتن به سوالات متداول" },
  { keys: ["G", "C"], description: "رفتن به تماس" },
];

const actionRows: ShortcutRow[] = [
  { keys: ["T"], description: "تغییر تم روشن/تیره" },
  { keys: ["/"], description: "تمرکز روی فرم تماس" },
  { keys: ["⌘", "K"], description: "باز کردن پنل فرمان" },
  { keys: ["Esc"], description: "بستن پنل/پاک کردن حالت G" },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[11px] font-semibold text-foreground shadow-sm">
      {children}
    </kbd>
  );
}

export function KeyboardHint() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hidden xl:inline-flex gap-1.5 text-muted-foreground hover:text-primary px-2"
          aria-label="میانبرهای صفحه‌کلید"
          title="میانبرهای صفحه‌کلید"
        >
          <Keyboard className="h-3.5 w-3.5" />
          <Kbd>⌘K</Kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Keyboard className="h-5 w-5 text-primary" />
            میانبرهای صفحه‌کلید
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div>
            <h4 className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">
              ناوبری
            </h4>
            <ul className="space-y-1.5">
              {navRows.map((row) => (
                <li
                  key={row.description}
                  className="flex items-center justify-between gap-3 text-sm py-1"
                >
                  <span className="text-muted-foreground">{row.description}</span>
                  <span className="flex items-center gap-1">
                    {row.keys.map((k, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && (
                          <span className="text-muted-foreground text-xs">+</span>
                        )}
                        <Kbd>{k}</Kbd>
                      </React.Fragment>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">
              عملیات سریع
            </h4>
            <ul className="space-y-1.5">
              {actionRows.map((row) => (
                <li
                  key={row.description}
                  className="flex items-center justify-between gap-3 text-sm py-1"
                >
                  <span className="text-muted-foreground">{row.description}</span>
                  <span className="flex items-center gap-1">
                    {row.keys.map((k, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && (
                          <span className="text-muted-foreground text-xs">+</span>
                        )}
                        <Kbd>{k}</Kbd>
                      </React.Fragment>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border/60 pt-3">
            نکته: میانبرها وقتی در حال تایپ در فیلدها هستید غیرفعال می‌شوند.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
