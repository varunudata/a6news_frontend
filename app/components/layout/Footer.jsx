"use client";

import { Facebook, Instagram, Mail, MapPin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const FALLBACK_CATEGORIES = [
  { id: 11, name: "NATIONAL HIGHWAYS" },
  { id: 13, name: "EXPRESS WAYS" },
  { id: 20, name: "RAILWAYS" },
  { id: 15, name: "AIRPORTS" },
  { id: 16, name: "PORTS" },
  { id: 24, name: "PROJECTS" },
];

export default function Footer() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategories(data.data.slice(0, 6));
        }
      } catch {
        // Fallback categories remain displayed
      }
    };
    if (backendUrl) {
      fetchCategories();
    }
  }, [backendUrl]);

  return (
    <footer className="bg-[#E50000] text-white mt-auto border-t-4 border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                A6NEWS
              </span>
              <span className="bg-white text-[#E50000] text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded">
                INFRA
              </span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed max-w-sm">
              జాతీయ రహదారులు, ఎక్స్‌ప్రెస్‌వేలు, విమానాశ్రయాలు, రైల్వేలు, పోర్టులు మరియు రాజధాని మౌలిక సదుపాయాల ప్రాజెక్టులపై ఖచ్చితమైన, విశ్వసనీయ సమాచారాన్ని అందించే మీ తెలుగు న్యూస్ పోర్టల్.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.youtube.com/@a6newsinfra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#E50000] transition-colors"
              >
                <Youtube size={17} />
              </a>

              <a
                href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#E50000] transition-colors"
              >
                <Twitter size={17} />
              </a>

              <a
                href="https://www.facebook.com/share/16cLcBDyEh/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#E50000] transition-colors"
              >
                <Facebook size={17} />
              </a>

              <a
                href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#E50000] transition-colors"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="font-bold mb-4 text-xs tracking-wider uppercase text-white border-b border-red-400/40 pb-2">
              ముఖ్యమైన లింకులు
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/85 hover:text-white hover:underline transition-colors"
                >
                  హోమ్
                </Link>
              </li>
              <li>
                <Link
                  href="/category/11"
                  className="text-sm text-white/85 hover:text-white hover:underline transition-colors"
                >
                  ప్రధాన వార్తలు
                </Link>
              </li>
              <li>
                <Link
                  href="/category/25"
                  className="text-sm text-white/85 hover:text-white hover:underline transition-colors"
                >
                  వీడియో కథనాలు
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/85 hover:text-white hover:underline transition-colors"
                >
                  ఎడిటోరియల్ లాగిన్
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Beats / Categories Column */}
          <div className="lg:col-span-3">
            <h3 className="font-bold mb-4 text-xs tracking-wider uppercase text-white border-b border-red-400/40 pb-2">
              ప్రధాన విభాగాలు
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className="text-sm text-white/85 hover:text-white hover:underline transition-colors inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="font-bold mb-4 text-xs tracking-wider uppercase text-white border-b border-red-400/40 pb-2">
              సంప్రదించండి
            </h3>
            <div className="space-y-3.5 text-sm text-white/90 leading-relaxed">
              <p>
                ప్రాజెక్ట్ అప్‌డేట్స్, ప్రెస్ రిలీజ్‌లు లేదా గ్రౌండ్ రిపోర్ట్స్ మా ఎడిటోరియల్ డెస్క్‌తో పంచుకోవాలనుకుంటున్నారా?
              </p>
              <a
                href="mailto:a6newsinfra@gmail.com"
                className="flex items-center gap-2.5 text-white hover:underline font-medium"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>a6newsinfra@gmail.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-white/90">
                <MapPin className="w-4 h-4 shrink-0 mt-1" />
                <span>
                  విజయవాడ, అమరావతి రాజధాని ప్రాంతం,
                  <br />
                  ఆంధ్రప్రదేశ్, ఇండియా
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-red-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-white">A6NEWS INFRA</span>. All
            Rights Reserved.
          </p>
          <p className="text-white/75">
            జాతీయ రహదారులు, రైల్వేలు, విమానయానం & రాజధాని అభివృద్ధి వార్తల ప్రత్యేకం
          </p>
        </div>
      </div>
    </footer>
  );
}
