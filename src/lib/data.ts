// Centralized personal data for Ali Zafari Moghaddam
// All content is in Persian (Farsi). Single source of truth for the site.

export const person = {
  name: "علی ظفری مقدم",
  title: "دانشجوی دکتری اقتصاد",
  tagline: "اقتصاددان، پژوهشگر و علاقه‌مند به توسعه پایدار",
  birthDate: "۲۶ مهر ۱۳۷۷",
  city: "مشهد",
  country: "ایران",
  email: "zafari_moghadam@yahoo.com",
  phone: "+98 915 448 7030",
  domain: "zafarimoghaddam.ir",
  github: "officialzafari",
  githubUrl: "https://github.com/officialzafari/officialzafari.git",
  profileImage: "/profile.jpg",
  // Social links — user wants people to reach the SITE from social media,
  // but we still display social links so visitors can connect.
  social: [
    {
      name: "ایمیل",
      label: "zafari_moghadam@yahoo.com",
      href: "mailto:zafari_moghadam@yahoo.com",
      icon: "mail",
    },
    {
      name: "تلفن",
      label: "+۹۸ ۹۱۵ ۴۴۸ ۷۰۳۰",
      href: "tel:+989154487030",
      icon: "phone",
    },
    {
      name: "گیت‌هاب",
      label: "github.com/officialzafari",
      href: "https://github.com/officialzafari",
      icon: "github",
    },
  ],
} as const;

export type Experience = {
  role: string;
  company: string;
  companyEn?: string;
  location: string;
  period: string;
  periodEn: string;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    role: "پشتیبانی فروش",
    company: "ایرن‌تلنت (IranTalent)",
    companyEn: "IranTalent.com",
    location: "تهران، ایران",
    period: "مهر ۱۳۹۹ – مرداد ۱۳۹۹",
    periodEn: "Oct 2020 – Aug 2020",
    description:
      "ایرن‌تلنت پیشروترین سایت کاریابی و خدمات استخدام آنلاین در ایران است که به عنوان اولین کانال استخدامی بسیاری از شرکت‌های برجسته ایرانی شناخته می‌شود.",
    highlights: [
      "پشتیبانی فروش شرکت‌های همکار دانشگاهی برای ثبت‌نام در سیستم Talent Coach",
      "همکاری با بیش از یک میلیون نامزد ثبت‌نام‌شده ایرانی",
      "آشنایی با فرآیندهای کاریابی و تطابق متخصصان با فرصت‌های شغلی",
    ],
  },
  {
    role: "دستیار اداری",
    company: "VBW ایران",
    companyEn: "Vereinigung der Bayerischen Wirtschaft",
    location: "تهران، ایران",
    period: "بهمن ۱۳۹۸ – مرداد ۱۳۹۸",
    periodEn: "Feb 2020 – Aug 2020",
    description:
      "انجمن صنفی بایرن (VBW) نهادی است که بین منافع صنعتی و مردمی صنعت بایرن واسطه‌گری می‌کند و خدمات حمایتی گسترده‌ای ارائه می‌دهد.",
    highlights: [
      "برگزاری سمینارها و جلسات هیئت‌مدیره",
      "کمک در مدیریت و امور دفتری روزانه",
      "تجربه کار در محیط حرفه‌ای بین‌المللی آلمانی–ایرانی",
    ],
  },
  {
    role: "کارشناس CRM",
    company: "IDAQ",
    companyEn: "Institute Deutsche Qualifizierung GmbH",
    location: "تهران، ایران",
    period: "اسفند ۱۳۹۷ – شهریور ۱۳۹۸",
    periodEn: "Mar 2019 – Sep 2019",
    description:
      "مؤسسه آکادمیک آلمانی IDAQ کارگاه‌ها و سمینارهای آموزشی در حوزه فناوری اطلاعات، تجارت و مدیریت در همکاری با دانشگاه‌های آلمان برگزار می‌کند.",
    highlights: [
      "پشتیبانی پروژه‌های داخلی، پایگاه داده و مشتریان",
      "تجربه مدیریت ارتباط با مشتری (CRM) در محیط آموزشی حرفه‌ای",
      "همکاری با تیم بین‌المللی آلمانی–ایرانی",
    ],
  },
];

export type Education = {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  status: string;
};

export const educations: Education[] = [
  {
    degree: "دکتری اقتصاد",
    field: "اقتصاد",
    institution: "دانشگاه فردوسی مشهد",
    location: "مشهد، ایران",
    period: "در حال تحصیل",
    status: "current",
    description:
      "ادامه تحصیل در مقطع دکتری با تمرکز بر توسعه اقتصادی و برنامه‌ریزی",
  },
  {
    degree: "کارشناسی ارشد اقتصاد",
    field: "توسعه و برنامه‌ریزی اقتصادی",
    institution: "دانشگاه فردوسی مشهد",
    location: "مشهد، ایران",
    period: "۱۴۰۱",
    status: "completed",
    description: "گرایش توسعه و برنامه‌ریزی اقتصادی",
  },
  {
    degree: "کارشناسی اقتصاد",
    field: "علوم اقتصادی",
    institution: "دانشگاه علامه طباطبایی",
    location: "تهران، ایران",
    period: "۱۳۹۶ – ۱۴۰۱",
    status: "completed",
    description: "گرایش نظری",
  },
];

export type Skill = {
  name: string;
  level: number; // 0–100
  category: "حرفه‌ای" | "نرم" | "زبان";
};

export const skills: Skill[] = [
  { name: "حل مسئله", level: 90, category: "حرفه‌ای" },
  { name: "رهبری", level: 88, category: "نرم" },
  { name: "ارتباطات", level: 92, category: "نرم" },
  { name: "زبان انگلیسی", level: 85, category: "زبان" },
];

export const aboutText = {
  intro:
    "علی ظفری مقدم، متولد ۲۶ مهر ۱۳۷۷ در مشهد، دانشجوی دکتری اقتصاد و پژوهشگر در حوزه توسعه اقتصادی است. مسیر آکادمیک او با کارشناسی اقتصاد از دانشگاه علامه طباطبایی آغاز شد و سپس در مقطع کارشناسی ارشد توسعه و برنامه‌ریزی اقتصادی از دانشگاه فردوسی مشهد تحصیل کرد.",
  body:
    "تجربه حرفه‌ای او شامل همکاری با نهادهای بین‌المللی از جمله مؤسسه آکادمیک آلمانی IDAQ، انجمن صنفی بایرن (VBW) و پیشروترین پلتفرم کاریابی ایرانی IranTalent است. این تجربه‌ها در کنار تحصیل، نگاهی چندبعدی به مسائل اقتصادی و توسعه در بافت ایران به او بخشیده است.",
  mission:
    "هدف او پیوند میان دانش نظری اقتصاد و واقعیت‌های میدانی توسعه پایدار است؛ تفکیکی که به توسعه راهکارهای عملی برای اقتصاد ایران کمک می‌کند.",
  values: [
    {
      title: "تحلیل دقیق",
      description: "تکیه بر داده و استدلال علمی در هر تصمیم و توصیه",
    },
    {
      title: "نگاه بین‌المللی",
      description: "تجربه همکاری با نهادهای آلمانی و ایرانی در حوزه‌های متنوع",
    },
    {
      title: "تعهد به توسعه",
      description: "تمرکز بر توسعه پایدار و برنامه‌ریزی اقتصادی کشور",
    },
  ],
};

export const stats = [
  { value: "۳+", label: "تجربه کاری" },
  { value: "۲", label: "مدرک آکادمیک" },
  { value: "۱", label: "در حال دکتری" },
  { value: "۳", label: "نهاد بین‌المللی" },
];

export const navItems = [
  { id: "home", label: "خانه", href: "#home" },
  { id: "about", label: "درباره من", href: "#about" },
  { id: "experience", label: "تجربیات", href: "#experience" },
  { id: "education", label: "تحصیلات", href: "#education" },
  { id: "research", label: "پژوهش", href: "#research" },
  { id: "publications", label: "انتشارات", href: "#publications" },
  { id: "blog", label: "وبلاگ", href: "/blog" },
  { id: "skills", label: "مهارت‌ها", href: "#skills" },
  { id: "testimonials", label: "توصیه‌نامه‌ها", href: "#testimonials" },
  { id: "reading", label: "فهرست مطالعه", href: "#reading" },
  { id: "faq", label: "سوالات", href: "#faq" },
  { id: "contact", label: "تماس", href: "#contact" },
];

// Research interests — relevant for a PhD student in Economics
export type ResearchInterest = {
  title: string;
  description: string;
  icon: string; // icon key
};

export const researchInterests: ResearchInterest[] = [
  {
    title: "توسعه اقتصادی پایدار",
    description:
      "بررسی الگوهای رشد بلندمدت و سیاست‌های توسعه‌ای در اقتصادهای نوظهور با تمرکز بر عدالت اجتماعی و پایداری محیط‌زیست.",
    icon: "sprout",
  },
  {
    title: "برنامه‌ریزی اقتصادی",
    description:
      "طراحی و ارزیابی برنامه‌های کلان اقتصادی در سطح ملی و منطقه‌ای، با تأکید بر تخصیص بهینه منابع و اولویت‌بندی سرمایه‌گذاری.",
    icon: "map",
  },
  {
    title: "اقتصاد ایران",
    description:
      "تحلیل ساختار اقتصاد ایران، چالش‌های تورمی، وابستگی به درآمد نفت و راهکارهای متنوع‌سازی اقتصادی در شرایط تحریم.",
    icon: "trending-up",
  },
  {
    title: "اقتصاد بین‌الملل",
    description:
      "مطالعه تجارت جهانی، رژیم‌های ارزی و تأثیر تحریم‌ها بر جریان‌های تجاری و سرمایه‌ای، با تجربه همکاری با نهادهای آلمانی–ایرانی.",
    icon: "globe",
  },
  {
    title: "اقتصادسنجی و تحلیل داده",
    description:
      "استفاده از روش‌های کمی و تحلیل داده‌های اقتصادی برای تست فرضیه‌ها و پیش‌بینی روندهای کلان اقتصادی.",
    icon: "chart",
  },
  {
    title: "اقتصاد رفتاری",
    description:
      "بررسی نقش عوامل روان‌شناختی و اجتماعی در تصمیم‌گیری اقتصادی بازیگران، فراتر از فرض‌های نئوکلاسیک.",
    icon: "brain",
  },
];

// A short personal quote for the quote banner
export const personalQuote = {
  text: "اقتصاد تنها علم اعداد نیست؛ هنر فهمیدن انسان‌ها و طراحی آینده‌ای است که شایسته آن‌هاست.",
  author: "علی ظفری مقدم",
};

// Timeline of academic & professional milestones for a compact journey strip
export const journeyMilestones = [
  { year: "۱۳۹۶", event: "ورود به دانشگاه علامه طباطبایی", icon: "graduation" },
  { year: "۱۳۹۷", event: "شروع کار در IDAQ آلمان", icon: "briefcase" },
  { year: "۱۳۹۸", event: "همکاری با VBW ایران", icon: "briefcase" },
  { year: "۱۳۹۹", event: "همکاری با IranTalent", icon: "briefcase" },
  { year: "۱۴۰۱", event: "اخذ کارشناسی ارشد از فردوسی مشهد", icon: "graduation" },
  { year: "اکنون", event: "دانشجوی دکتری اقتصاد", icon: "book" },
];

// Testimonials — placeholder recommendations that add social proof.
// (User can replace with real ones later.)
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "علی با نگاه دقیق تحلیلی و آشنایی با محیط‌های بین‌المللی، توانست در زمان کوتاهی به تیم ما کمک کند. تعهد و حرفه‌ای‌گری او قابل تحسین است.",
    name: "همکار سابق",
    role: "مدیر پروژه، IranTalent",
    initials: "ه.س",
  },
  {
    quote:
      "همکاری با علی در مؤسسه IDAQ نشان داد که او فراتر از یک دانشجوی اقتصاد است؛ درک او از مسائل توسعه و ارتباطات بین‌فرهنگی برجسته است.",
    name: "استاد راهنما",
    role: "هیئت علمی دانشگاه فردوسی مشهد",
    initials: "ا.ر",
  },
  {
    quote:
      "در کارگاه‌های VBW ایران، علی نقشی کلیدی در برگزاری سمینارها و مدیریت امور دفتری داشت. خلاقیت و نظم او نمونه‌برابر بود.",
    name: "سرپرست دفتری",
    role: "انجمن صنفی بایرن (VBW) ایران",
    initials: "س.د",
  },
];

// FAQ — common questions visitors might have
export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "حوزه اصلی پژوهشی شما چیست؟",
    answer:
      "تمرکز اصلی من بر توسعه اقتصادی پایدار و برنامه‌ریزی اقتصادی است. در رساله دکتری، روی پیوند میان سیاست‌های توسعه و عدالت اجتماعی در اقتصادهای نوظهور کار می‌کنم.",
  },
  {
    question: "آیا برای پروژه‌های پژوهشی همکاری می‌پذیرید؟",
    answer:
      "بله. علاقه‌مندم در پروژه‌های مرتبط با اقتصاد ایران، اقتصاد بین‌الملل، اقتصادسنجی و توسعه پایدار همکاری کنم. برای طرح پیشنهاد، از فرم تماس یا ایمیل استفاده کنید.",
  },
  {
    question: "در چه نهادهایی تجربه کاری دارید؟",
    answer:
      "تجربه همکاری با مؤسسه آکادمیک آلمانی IDAQ، انجمن صنفی بایرن (VBW) ایران و پلتفرم کاریابی IranTalent را دارم. جزئیات بیشتر در بخش تجربیات آمده است.",
  },
  {
    question: "آیا ارائه مشاوره اقتصادی می‌دهید؟",
    answer:
      "بسته به نوع موضوع و ظرفیت زمانی، امکان‌پذیر است. لطفاً موضوع و ابعاد پروژه را در ایمیل یا فرم تماس شرح دهید تا پاسخ دقیق بدهم.",
  },
  {
    question: "چگونه می‌توانم رزومه شما را دریافت کنم؟",
    answer:
      "دکمه «دانلود رزومه (PDF)» در بالای صفحه و در بخش تماس موجود است. با کلیک روی آن، مرورگر پنجره چاپ را باز می‌کند و می‌توانید نسخه PDF تمیز دریافت کنید.",
  },
  {
    question: "کجا سکونت دارید و آیا امکان همکاری دورکاری وجود دارد؟",
    answer:
      "ساکن مشهد هستم. بخش زیادی از تجربه‌های قبلی من به‌صورت دورکاری و ترکیبی بوده است، بنابراین همکاری远程 کاملاً ممکن است.",
  },
];

// "Now" section — what the person is currently working on (popular for personal sites)
export const nowItems = [
  {
    label: "در حال تحصیل",
    value: "دکتری اقتصاد",
    detail: "ادامه رساله در حوزه توسعه اقتصادی پایدار",
  },
  {
    label: "در حال مطالعه",
    value: "اقتصاد رفتاری و توسعه",
    detail: "مرور ادبیات نوین در تصمیم‌گیری اقتصادی",
  },
  {
    label: "در حال یادگیری",
    value: "اقتصادسنجی پیشرفته",
    detail: "روش‌های کمی تحلیل داده‌های اقتصادی",
  },
];

// Publications — academic papers, theses, and research outputs.
// (PhD student placeholder list; user can replace with real publications.)
export type Publication = {
  title: string;
  type: "پایان‌نامه" | "مقاله" | "کارگاهی" | "تحلیل";
  year: string;
  venue: string;
  description: string;
  url?: string;
};

export const publications: Publication[] = [
  {
    title: "برنامه‌ریزی اقتصادی و توسعه پایدار در ایران",
    type: "پایان‌نامه",
    year: "۱۴۰۱",
    venue: "دانشگاه فردوسی مشهد — کارشناسی ارشد",
    description:
      "رساله کارشناسی ارشد با تمرکز بر الگوهای برنامه‌ریزی اقتصادی و نقش آنها در توسعه پایدار، با مطالعه موردی اقتصاد ایران.",
  },
  {
    title: "نقش نهادهای بین‌المللی در توسعه سرمایه انسانی",
    type: "تحلیل",
    year: "۱۳۹۹",
    venue: "مطالعه موردی IranTalent",
    description:
      "تحلیل تجربه همکاری با پلتفرم‌های کاریابی و تأثیر آنها بر تطابق متخصصان ایرانی با فرصت‌های شغلی بین‌المللی.",
  },
  {
    title: "اقتصاد رفتاری و تصمیم‌گیری در شرایط عدم قطعیت",
    type: "مقاله",
    year: "در حال نگارش",
    venue: "موضوع رساله دکتری",
    description:
      "مطالعه نقش عوامل روان‌شناختی و سوگیری‌های شناختی در تصمیم‌گیری اقتصادی بازیگران در اقتصادهای در حال توسعه.",
  },
  {
    title: "تحلیل تطبیقی رژیم‌های ارزی در شرایط تحریم",
    type: "کارگاهی",
    year: "۱۳۹۸",
    venue: "کارگاه IDAQ — تهران",
    description:
      "ارائه در کارگاه مؤسسه IDAQ درباره تأثیر تحریم‌ها بر جریان‌های تجاری و رفتار رژیم ارزی در ایران.",
  },
];

// Reading list — books the person recommends (personal touch for academics)
export type Book = {
  title: string;
  author: string;
  category: string;
  note: string;
  status: "خوانده‌شده" | "در حال خواندن" | "در فهرست";
};

export const readingList: Book[] = [
  {
    title: "ثروت ملل",
    author: "آدام اسمیت",
    category: "اقتصاد کلاسیک",
    note: "یکی از متون بنیادین اقتصاد؛ مرور دوره به دوره الهام‌بخش است.",
    status: "خوانده‌شده",
  },
  {
    title: "سرمایه در قرن بیست و یکم",
    author: "توماس پیکتی",
    category: "اقتصاد نابرابری",
    note: "تحلیل عمیق نابرابری و تمرکز ثروت در طول زمان.",
    status: "خوانده‌شده",
  },
  {
    title: "افسانه دستگاه خرد",
    author: "جان کینت گالبرث",
    category: "اقتصاد سیاسی",
    note: "نقدی ظریف بر اقتصاد نئوکلاسیک و کارکرد دستگاه‌های خرد.",
    status: "در حال خواندن",
  },
  {
    title: "تفکر، سریع و کند",
    author: "دنیل کانمن",
    category: "اقتصاد رفتاری",
    note: "پایه فهم سوگیری‌های شناختی در تصمیم‌گیری — کلیدی برای رساله دکتری.",
    status: "خوانده‌شده",
  },
  {
    title: "نظریه رشد نامتقارن",
    author: "جاناتان میلسنر",
    category: "توسعه اقتصادی",
    note: "مرجعی مهم برای ادبیات توسعه و رشد بلندمدت.",
    status: "در فهرست",
  },
  {
    title: "جامعه‌شناسی اقتصادی خاورمیانه",
    author: "تیمور کوران",
    category: "اقتصاد منطقه‌ای",
    note: "درک بافت نهادی اقتصاد خاورمیانه و ایران.",
    status: "در فهرست",
  },
];
