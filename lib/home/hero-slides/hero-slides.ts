export type HomeHeroSlide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export const homeHeroSlides: readonly HomeHeroSlide[] = [
  {
    id: "surveying",
    imageSrc: "/images/home/slide 1.png",
    imageAlt: "بنر معرفی خدمات نقشه‌برداری و اجرای ساختمان",
    headline: "از نقشه‌برداری و طراحی",
    description: "تا اخذ مجوز و اجرای پروژه در کنار شما هستیم",
    ctaLabel: "مشاهده نقشه‌برداری",
    ctaHref: "/services/land-surveying",
  },
  {
    id: "engineers",
    imageSrc: "/images/home/slide 2.png",
    imageAlt: "مهندس پروژه در محیط ساختمان",
    headline: "ارتباط رایگان با مهندسان و متخصصان",
    description: "مهندسان، پیمانکاران و متخصصان ساخت‌وساز را پیدا کنید.",
    ctaLabel: "مشاهده متخصصان",
    ctaHref: "#home-marketplace",
  },
  {
    id: "interior",
    imageSrc: "/images/home/slide 3.png",
    imageAlt: "نمونه طراحی فضای داخلی ساختمان",
    headline: "طراحی نما و فضای داخلی",
    description: "از ایده تا انتخاب طراح برای پروژه ساختمانی.",
    ctaLabel: "مشاهده طراحی نما و داخلی",
    ctaHref: "/services/interior-design",
  },
];
