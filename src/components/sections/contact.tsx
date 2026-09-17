"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { person } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  subject: z.string().min(3, "موضوع را وارد کنید"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ حرف باشد"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    // در حالت استاتیک، از mailto استفاده می‌کنیم.
    // این روش مطمئن‌ترین راه برای سایت‌های استاتیک بدون backend است.
    try {
      const body = `نام: ${data.name}
ایمیل: ${data.email}
موضوع: ${data.subject}

پیام:
${data.message}`;

      const subject = encodeURIComponent(`[تماس از سایت] ${data.subject}`);
      const bodyEncoded = encodeURIComponent(body);
      const mailtoUrl = `mailto:${person.email}?subject=${subject}&body=${bodyEncoded}`;

      // باز کردن client ایمیل کاربر
      window.location.href = mailtoUrl;

      // نمایش پیام موفقیت
      setSubmitted(true);
      reset();
      toast.success("client ایمیل شما باز شد. پیام را ارسال کنید.");
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      toast.error("خطا در باز کردن client ایمیل. لطفاً مستقیماً ایمیل کنید.");
    }
  };

  const socials = [
    {
      icon: Mail,
      label: "ایمیل",
      value: person.email,
      href: `mailto:${person.email}`,
      ltr: true,
    },
    {
      icon: Phone,
      label: "تلفن",
      value: person.phone,
      href: `tel:${person.phone}`,
      ltr: true,
    },
    {
      icon: Github,
      label: "گیت‌هاب",
      value: "github.com/officialzafari",
      href: person.githubUrl,
      ltr: true,
    },
    {
      icon: MapPin,
      label: "موقعیت",
      value: `${person.city}، ${person.country}`,
      href: "#",
      ltr: false,
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="ارتباط"
            title="تماس با من"
            description="برای همکاری، پرسش یا هر موضوع دیگری با من در ارتباط باشید"
          />
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact info */}
          <SectionReveal className="lg:col-span-5" delay={0.1}>
            <div className="space-y-4 h-full">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-foreground">
                  راه‌های ارتباطی
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  من از طریق شبکه‌های اجتماعی نیز در دسترس هستم. در سریع‌ترین
                  حالت از ایمیل یا فرم زیر استفاده کنید.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.label === "گیت‌هاب" ? "_blank" : undefined}
                    rel={s.label === "گیت‌هاب" ? "noopener noreferrer" : undefined}
                    className="group rounded-xl border border-border/60 bg-card/50 p-4 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {s.label}
                        </p>
                        <p
                          className="text-sm font-medium text-foreground truncate"
                          dir={s.ltr ? "ltr" : "rtl"}
                        >
                          {s.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-5 space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">
                    چگونگی ارسال پیام:
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    با کلیک روی «ارسال پیام»، client ایمیل شما (مثل Gmail یا
                    Outlook) با پیام آماده باز می‌شود. فقط کافی است روی Send
                    بزنید. اگر client ایمیل ندارید، مستقیماً به{" "}
                    <a
                      href={`mailto:${person.email}`}
                      className="text-primary font-medium hover:underline"
                    >
                      {person.email}
                    </a>{" "}
                    ایمیل بزنید.
                  </p>
                </CardContent>
              </Card>
            </div>
          </SectionReveal>

          {/* Form */}
          <SectionReveal className="lg:col-span-7" delay={0.2}>
            <Card className="border-border/60 bg-card/60">
              <CardContent className="p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <CheckCircle2 className="h-14 w-14 text-primary" />
                    <h3 className="mt-4 text-xl font-bold text-foreground">
                      client ایمیل باز شد!
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      پیام آماده شده است. روی Send در client ایمیل خود کلیک
                      کنید تا ارسال شود.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">
                          نام و نام خانوادگی
                        </Label>
                        <Input
                          id="name"
                          placeholder="مثلاً: علی رضایی"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">
                          ایمیل
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          dir="ltr"
                          placeholder="you@example.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        موضوع
                      </Label>
                      <Input
                        id="subject"
                        placeholder="موضوع پیام شما"
                        {...register("subject")}
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && (
                        <p className="text-xs text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm font-medium">
                        پیام
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="پیام خود را اینجا بنویسید..."
                        {...register("message")}
                        className={
                          errors.message
                            ? "border-destructive resize-none"
                            : "resize-none"
                        }
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="ms-2 h-4 w-4 animate-spin" />
                          در حال آماده‌سازی...
                        </>
                      ) : (
                        <>
                          ارسال پیام
                          <Send className="ms-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
