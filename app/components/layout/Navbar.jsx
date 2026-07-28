"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const logo =
    "https://res.cloudinary.com/dkdidynja/image/upload/v1784568115/a6newsinfra_irdltr.png";
  const router = useRouter();

  const [tickerText, setTickerText] = useState("");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {

    // Fetch ticker
    const fetchTicker = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/ticker`);
        const data = await res.json();
        if (data.success && data.data && data.data.text) {
          setTickerText(data.data.text);
        }
      } catch (error) {
        console.error("Error loading ticker updates:", error);
      }
    };
    fetchTicker();
  }, [backendUrl]);

  return (
    <header className="w-full bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 relative overflow-hidden">

          {/* Logo Section */}
          <div
            className="flex-shrink-0 cursor-pointer group relative z-20 bg-white h-full flex items-center pr-6"
            onClick={() => router.push('/')}
          >
            <img
              src={logo}
              alt="A6News Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>

          {/* Ticker Section */}
          {tickerText && (
            <div className="absolute inset-0 flex items-center z-10">
              <div className="w-full overflow-hidden">
                <div className="animate-marquee-mobile sm:animate-marquee whitespace-nowrap text-[#E50000] font-medium text-sm">
                  {tickerText.split('•').map((item, index, array) => (
                    <span key={index}>
                      {item}
                      {index < array.length - 1 && (
                        <span className="mx-8 text-red-300 font-bold">•</span>
                      )}
                    </span>
                  ))}
                  <span className="pr-16"></span>
                </div>
              </div>
            </div>
          )}

          {/* Actions & Socials Section */}
          <div className="flex items-center gap-4 lg:gap-6 relative z-20 bg-white h-full pl-6">

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://www.youtube.com/@a6newsinfra"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#FF0000] hover:border-[#FF0000] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16cLcBDyEh/"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-pink-600 hover:border-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
