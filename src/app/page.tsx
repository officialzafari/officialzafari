import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { CommandPalette } from "@/components/command-palette";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { NowSection } from "@/components/sections/now-section";
import { PhDProgress } from "@/components/sections/phd-progress";
import { Journey } from "@/components/sections/journey";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { QuoteBanner } from "@/components/sections/quote-banner";
import { Research } from "@/components/sections/research";
import { Publications } from "@/components/sections/publications";
import { VisualStats } from "@/components/sections/visual-stats";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Skills } from "@/components/sections/skills";
import { SkillsRadar } from "@/components/sections/skills-radar";
import { Testimonials } from "@/components/sections/testimonials";
import { ReadingList } from "@/components/sections/reading-list";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { ShareCard } from "@/components/sections/share-card";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <NowSection />
        <PhDProgress />
        <Journey />
        <Experience />
        <Education />
        <QuoteBanner />
        <Research />
        <Publications />
        <BlogPreview />
        <VisualStats />
        <Skills />
        <SkillsRadar />
        <Testimonials />
        <ReadingList />
        <FAQ />
        <Contact />
        <section className="py-12 bg-background border-t border-border/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ShareCard />
          </div>
        </section>
      </main>
      <SiteFooter />
      <BackToTop />
      <KeyboardShortcuts />
      <CommandPalette />
    </>
  );
}
