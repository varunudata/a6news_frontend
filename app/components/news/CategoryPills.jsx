"use client";

import { useRouter } from "next/navigation";

const categories = [
  "All",
  "Tech",
  "World",
  "India",
  "Startups",
  "Sports",
  "Crypto",
];

export default function CategoryPills({ active = "All" }) {
  const router = useRouter();

  const handleClick = (cat) => {
    if (cat === "All") router.push("/");
    else router.push(`/categories/${cat.toLowerCase()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={[
              "px-3 py-1 rounded-full text-xs border transition",
              isActive
                ? "bg-emerald-500 text-slate-950 border-emerald-500"
                : "border-slate-700 text-slate-200 hover:bg-slate-800",
            ].join(" ")}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
