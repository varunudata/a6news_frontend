"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavContents() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const pathname = usePathname();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (backendUrl) {
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, [backendUrl]);

  // Auto-scroll the active category into view
  useEffect(() => {
    let activeId = "nav-link-home";
    if (pathname && pathname.startsWith("/category/")) {
      const parts = pathname.split("/");
      const catId = parts[2];
      if (catId) {
        activeId = `nav-link-${catId}`;
      }
    }

    const timer = setTimeout(() => {
      const activeEl = document.getElementById(activeId);
      if (activeEl && scrollRef.current) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, categories]);

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#E50000] text-white sticky top-0 z-40 border-b border-red-700 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-12 gap-1">
        {/* Sticky Home Link */}
        <Link
          id="nav-link-home"
          href="/"
          className={`text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors flex items-center h-full shrink-0 pr-4 sm:pr-5 mr-2 border-r border-red-400/50 ${
            pathname === "/"
              ? "text-white border-b-[3px] border-b-white"
              : "text-white/90 hover:text-white"
          }`}
        >
          Home
        </Link>

        {/* Left Scroll Button (Desktop) */}
        <button
          type="button"
          onClick={() => scrollByAmount(-240)}
          aria-label="Scroll categories left"
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded bg-red-700/60 hover:bg-red-800 text-white shrink-0 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Category Links */}
        <nav
          ref={scrollRef}
          aria-label="Categories Navigation"
          className="flex-1 flex items-center gap-5 sm:gap-7 h-full overflow-x-auto whitespace-nowrap hide-scrollbar px-2"
        >
          {loading ? (
            <div className="flex items-center gap-5">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div
                  key={n}
                  className="h-3.5 w-24 bg-white/25 rounded animate-pulse shrink-0"
                />
              ))}
            </div>
          ) : (
            categories.map((cat) => {
              const isActive = pathname === `/category/${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  id={`nav-link-${cat.id}`}
                  href={`/category/${cat.id}`}
                  className={`text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors flex items-center h-full shrink-0 px-0.5 ${
                    isActive
                      ? "text-white border-b-[3px] border-white"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })
          )}
        </nav>

        {/* Right Scroll Button (Desktop) */}
        <button
          type="button"
          onClick={() => scrollByAmount(240)}
          aria-label="Scroll categories right"
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded bg-red-700/60 hover:bg-red-800 text-white shrink-0 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
