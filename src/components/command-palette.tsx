"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  FlaskConical,
  FileText,
  Brain,
  Quote,
  BookOpen,
  HelpCircle,
  Mail,
  Sun,
  Moon,
  Download,
  Github,
  Phone,
  ExternalLink,
} from "lucide-react";
import { navItems, person } from "@/lib/data";
import { useTheme } from "next-themes";

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ElementType;
  keywords?: string[];
  run: () => void;
  group: string;
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd+K (mac) or Ctrl+K (others)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const navIcons: Record<string, React.ElementType> = {
    home: Home,
    about: User,
    experience: Briefcase,
    education: GraduationCap,
    research: FlaskConical,
    publications: FileText,
    skills: Brain,
    testimonials: Quote,
    reading: BookOpen,
    faq: HelpCircle,
    contact: Mail,
  };

  // Letter shortcuts matching the KeyboardShortcuts component
  const letterHints: Record<string, string> = {
    home: "G H",
    about: "G A",
    experience: "G E",
    education: "G D",
    research: "G R",
    publications: "G P",
    skills: "G S",
    testimonials: "G T",
    reading: "G L",
    faq: "G F",
    contact: "G C",
  };

  const navActions: Action[] = navItems.map((item) => ({
    id: item.id,
    label: item.label,
    icon: navIcons[item.id] ?? Home,
    group: "ناوبری",
    run: () => scrollTo(item.id),
    hint: letterHints[item.id],
  }));

  const quickActions: Action[] = [
    {
      id: "toggle-theme",
      label:
        (resolvedTheme ?? theme) === "dark"
          ? "تغییر به حالت روز"
          : "تغییر به حالت شب",
      icon: (resolvedTheme ?? theme) === "dark" ? Sun : Moon,
      group: "عملیات سریع",
      keywords: ["theme", "dark", "light", "تم", "تاریک", "روشن"],
      run: () => {
        const current = resolvedTheme ?? theme;
        setTheme(current === "dark" ? "light" : "dark");
        setOpen(false);
      },
      hint: "T",
    },
    {
      id: "download-cv",
      label: "دانلود رزومه (PDF)",
      icon: Download,
      group: "عملیات سریع",
      keywords: ["cv", "resume", "pdf", "رزومه", "دانلود"],
      run: () => {
        setOpen(false);
        setTimeout(() => window.print(), 200);
      },
    },
    {
      id: "focus-contact-form",
      label: "شروع نوشتن پیام تماس",
      icon: Mail,
      group: "عملیات سریع",
      keywords: ["contact", "message", "تماس", "پیام", "فرم"],
      run: () => {
        scrollTo("contact");
        setTimeout(() => {
          const firstInput =
            document.querySelector<HTMLInputElement>("#contact input");
          firstInput?.focus();
        }, 700);
      },
      hint: "/",
    },
  ];

  const externalActions: Action[] = [
    {
      id: "email",
      label: "ارسال ایمیل",
      icon: Mail,
      group: "ارتباط",
      keywords: ["email", "ایمیل", person.email],
      run: () => {
        window.open(`mailto:${person.email}`, "_self");
        setOpen(false);
      },
    },
    {
      id: "phone",
      label: "تماس تلفنی",
      icon: Phone,
      group: "ارتباط",
      keywords: ["phone", "call", "تلفن", "تماس"],
      run: () => {
        window.open(`tel:${person.phone.replace(/\s/g, "")}`, "_self");
        setOpen(false);
      },
    },
    {
      id: "github",
      label: "مشاهده گیت‌هاب",
      icon: Github,
      group: "ارتباط",
      keywords: ["github", "code", "گیت‌هاب", "کد"],
      run: () => {
        window.open(person.githubUrl, "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
    {
      id: "og-image",
      label: "مشاهده تصویر اشتراک‌گذاری (OG)",
      icon: ExternalLink,
      group: "ارتباط",
      keywords: ["og", "image", "share", "تصویر", "اشتراک"],
      run: () => {
        window.open("/api/og", "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
  ];

  const groups: { name: string; items: Action[] }[] = [
    { name: "ناوبری", items: navActions },
    { name: "عملیات سریع", items: quickActions },
    { name: "ارتباط", items: externalActions },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="جستجو یا اجرای فرمان… (مثلاً «تماس»، «تم»، «رزومه»)" />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>نتیجه‌ای یافت نشد.</CommandEmpty>
        {groups.map((g, gi) => (
          <React.Fragment key={g.name}>
            <CommandGroup
              heading={g.name}
              className="[&_[cmdk-group-heading]]:text-primary [&_[cmdk-group-heading]]:font-semibold"
            >
              {g.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.label} ${item.keywords?.join(" ") ?? ""}`}
                  onSelect={() => item.run()}
                  className="gap-3"
                >
                  <item.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.hint && (
                    <CommandShortcut className="font-mono text-[10px] tracking-wider">
                      {item.hint}
                    </CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {gi < groups.length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
