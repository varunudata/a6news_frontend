"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavContents() {
  const [categories, setCategories] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories`);
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
    <div className="flex items-center justify-between gap-6 h-12 border w-full bg-red-600 text-white cursor-pointer px-4 overflow-x-auto sticky top-0 z-40">
      <Link href="/" className="whitespace-nowrap">
        Home
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className="whitespace-nowrap"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
