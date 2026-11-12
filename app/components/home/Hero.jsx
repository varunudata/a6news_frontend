/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const HERO_SLIDES = [
  {
    image:
      "https://res.cloudinary.com/dkdidynja/image/upload/q_auto,f_auto/v1760958811/slide0_kqjow7.jpg",
    category: "జాతీయ రహదారులు",
    categoryId: 11,
    title: "అత్యాధునిక జాతీయ రహదారులు & ఎకనామిక్ కారిడార్ల నిర్మాణం",
    subtitle:
      "6-లేన్ల యాక్సెస్ కంట్రోల్డ్ హైవేలు, ఇంటర్‌ఛేంజ్‌లు మరియు భారత్‌మాల ప్రాజెక్టుల తాజా గ్రౌండ్ రిపోర్ట్స్.",
  },
  {
    image:
      "https://res.cloudinary.com/dkdidynja/image/upload/q_auto,f_auto/v1785492785/imnlppgdrl7hcstbqhve.png",
    category: "విమానాశ్రయాలు",
    categoryId: 15,
    title: "అంతర్జాతీయ ప్రమాణాలతో నూతన విమానాశ్రయ టెర్మినళ్ల అభివృద్ధి",
    subtitle:
      "గ్రీన్‌ఫీల్డ్ ఎయిర్‌పోర్టుల నిర్మాణం, రన్‌వే విస్తరణ మరియు ప్రాంతీయ విమానయాన కనెక్టివిటీపై సమగ్ర సమాచారం.",
  },
  {
    image:
      "https://res.cloudinary.com/dkdidynja/image/upload/q_auto,f_auto/v1786592136/ohcxiupxm2jbwqa8msik.jpg",
    category: "అమరావతి ప్రాజెక్టులు",
    categoryId: 24,
    title: "అమరావతి సీడ్ యాక్సెస్ రోడ్లు & భారీ వంతెనల నిర్మాణ పురోగతి",
    subtitle:
      "రాజధాని రహదారులు, ఐకానిక్ టవర్లు, కృష్ణా నదిపై నూతన వంతెనలు మరియు పట్టణ మౌలిక సదుపాయాల ప్రత్యక్ష విశేషాలు.",
  },
  {
    image:
      "https://res.cloudinary.com/dkdidynja/image/upload/q_auto,f_auto/v1783094759/ofvrqapdt9qpt4d8onrk.jpg",
    category: "రైల్వే ప్రాజెక్టులు",
    categoryId: 20,
    title: "ఆధునిక రైల్వే వంతెనలు, కొత్త లైన్లు & ఫ్రైట్ కారిడార్లు",
    subtitle:
      "రైల్వే డబ్లింగ్, విద్యుదీకరణ, ఆర్‌ఓబీలు (ROB) మరియు అమృత్ భారత్ స్టేషన్ల ఆధునీకరణ పనుల పూర్తి వివరాలు.",
  },
  {
    image:
      "https://res.cloudinary.com/dkdidynja/image/upload/q_auto,f_auto/v1785492783/wtddy4bbss8oomwtkwzr.png",
    category: "ఏవియేషన్ ఇన్‌ఫ్రా",
    categoryId: 15,
    title: "ఆధునిక ఎయిర్‌ఫీల్డ్ ఇంజనీరింగ్ & ఇంటిగ్రేటెడ్ టెర్మినల్ భవనాలు",
    subtitle:
      "కొత్త టెర్మినల్ నిర్మాణాలు, ఏప్రాన్ పనులు మరియు మల్టీ-మోడల్ రవాణా కేంద్రాల తాజా అప్‌డేట్స్.",
  },
  {
    image:
      "https://res.cloudinary.com/dkdidynja/image/upload/q_auto,f_auto/v1760958900/slide5_xuzkzy.jpg",
    category: "ఫ్లైఓవర్లు & ఎక్స్‌ప్రెస్‌వేలు",
    categoryId: 23,
    title: "ఎలివేటెడ్ ఫ్లైఓవర్లు, బైపాస్ కారిడార్లు & గ్రేడ్ సెపరేటర్లు",
    subtitle:
      "ప్రధాన నగరాల్లో ట్రాఫిక్ రద్దీని తగ్గించే మల్టీ-లేన్ ఎలివేటెడ్ హైవేలు మరియు రింగ్ రోడ్ల నిర్మాణ విశేషాలు.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const current = HERO_SLIDES[index];

  return (
    <section className="bg-white pt-5 sm:pt-7 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="border border-gray-200 rounded-xl overflow-hidden bg-white"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image Viewport */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-neutral-900 overflow-hidden">
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* Solid Crisp Prev / Next Controls */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-gray-900 border border-gray-300 flex items-center justify-center hover:bg-[#E50000] hover:text-white hover:border-[#E50000] transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-gray-900 border border-gray-300 flex items-center justify-center hover:bg-[#E50000] hover:text-white hover:border-[#E50000] transition-colors cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Top-left Slide Counter Pill */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-white text-gray-900 border border-gray-200 px-2.5 py-1 rounded text-xs font-bold tracking-wider">
              <span className="text-[#E50000]">0{index + 1}</span> / 0{HERO_SLIDES.length}
            </div>
          </div>

          {/* Solid Editorial Caption & Controls Bar (Zero Gradients / Zero Blur) */}
          <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 sm:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-block bg-[#E50000] text-white text-xs font-bold tracking-wide px-2.5 py-0.5 rounded">
                  {current.category}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  ప్రత్యేక మౌలిక సదుపాయాల విభాగం
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                {current.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-5 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
              {/* Slide Dots */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}: ${s.category}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      index === i
                        ? "w-7 bg-[#E50000]"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Category Beat Link */}
              <Link
                href={`/category/${current.categoryId}`}
                className="inline-flex items-center gap-1.5 bg-[#E50000] hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors shrink-0"
              >
                <span>మరిన్ని వార్తలు</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
