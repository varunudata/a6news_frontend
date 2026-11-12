/* eslint-disable @next/next/no-img-element */
"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const logo =
    "https://res.cloudinary.com/dkdidynja/image/upload/v1784568115/a6newsinfra_irdltr.png";

  const [tickerText, setTickerText] = useState("");
  const [loadingTicker, setLoadingTicker] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/ticker`);
        const data = await res.json();
        if (data.success && data.data && data.data.text) {
          setTickerText(data.data.text);
        }
      } catch (error) {
        console.error("Error loading ticker updates:", error);
      } finally {
        setLoadingTicker(false);
      }
    };
    if (backendUrl) {
      fetchTicker();
    } else {
      setLoadingTicker(false);
    }
  }, [backendUrl]);

  const tickerItems = tickerText
    ? tickerText
        .split(/[•\n]+/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <header className="w-full bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-5">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center pr-3 sm:pr-5 border-r border-gray-200 h-10 sm:h-12"
          >
            <img
              src={logo}
              alt="A6News Logo"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </Link>

          {/* Breaking News Ticker Section */}
          <div className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3 overflow-hidden bg-red-50/60 border border-red-100 rounded-lg px-2.5 sm:px-3.5 py-1.5 sm:py-2">
            <span className="inline-flex items-center gap-1.5 bg-[#E50000] text-white text-[10px] sm:text-xs font-bold tracking-wide px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              తాజా వార్తలు
            </span>

            <div className="flex-1 min-w-0 overflow-hidden">
              {loadingTicker ? (
                <div className="h-4 w-3/4 bg-red-100 rounded animate-pulse" />
              ) : tickerItems.length > 0 ? (
                <div className="ticker-marquee text-[#E50000] font-semibold text-xs sm:text-sm">
                  {tickerItems.map((item, index) => (
                    <span key={index} className="inline-flex items-center">
                      <span>{item}</span>
                      {index < tickerItems.length - 1 && (
                        <span className="mx-6 text-red-400 font-bold">•</span>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs sm:text-sm text-[#E50000] font-medium truncate block">
                  జాతీయ రహదారులు, ఎక్స్‌ప్రెస్‌వేలు, రైల్వేలు, విమానాశ్రయాలు మరియు మౌలిక సదుపాయాల తాజా వార్తలు
                </span>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-gray-200 shrink-0">
            <a
              href="https://www.youtube.com/@a6newsinfra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 text-gray-600 hover:text-[#E50000] hover:border-[#E50000] hover:bg-red-50 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-[#E50000] hover:border-[#E50000] hover:bg-red-50 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/share/16cLcBDyEh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-[#E50000] hover:border-[#E50000] hover:bg-red-50 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-[#E50000] hover:border-[#E50000] hover:bg-red-50 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
