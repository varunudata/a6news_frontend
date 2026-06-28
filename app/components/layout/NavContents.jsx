"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavContents() {
  const [categories, setCategories] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  return (
    <div className="bg-[#E50000] text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-8 h-12 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link 
            href="/" 
            className="text-sm font-semibold tracking-wide text-white hover:text-white/80 transition-colors flex items-center h-full"
          >
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="text-sm font-semibold tracking-wide text-white hover:text-white/80 transition-colors flex items-center h-full"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
