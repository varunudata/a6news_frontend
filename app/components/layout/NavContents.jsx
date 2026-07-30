"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function NavContents() {
  const [categories, setCategories] = useState([]);
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
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Auto-scroll the active category to the center
  useEffect(() => {
    let activeId = "nav-link-home";
    if (pathname && pathname.startsWith("/category/")) {
      const parts = pathname.split("/");
      const catId = parts[2];
      if (catId) {
        activeId = `nav-link-${catId}`;
      }
    }
    
    // Slight timeout ensures DOM is ready after categories load
    setTimeout(() => {
      const activeEl = document.getElementById(activeId);
      if (activeEl && scrollRef.current) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }, 100);
  }, [pathname, categories]);

  return (
    <div className="bg-[#E50000] text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav ref={scrollRef} className="flex items-center gap-8 h-12 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link 
            id="nav-link-home"
            href="/" 
            className={`text-sm font-semibold tracking-wide transition-colors flex items-center h-full sticky left-0 z-10 bg-[#E50000] pr-4 sm:pr-8 ${pathname === '/' ? 'text-white border-b-2 border-white' : 'text-white/90 hover:text-white'}`}
          >
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              id={`nav-link-${cat.id}`}
              href={`/category/${cat.id}`}
              className={`text-sm font-semibold tracking-wide transition-colors flex items-center h-full ${pathname === '/category/' + cat.id ? 'text-white border-b-2 border-white' : 'text-white/90 hover:text-white'}`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
