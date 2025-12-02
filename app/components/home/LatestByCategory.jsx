"use client";

import Link from "next/link";

export default function LatestByCategory({ data }) {
  return (
    <section className="w-[95%] mx-auto mt-12">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Latest by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item) => (
          <Link
            key={item.id}
            href={`/posts/${item.slug}`}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Thumbnail */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-40 w-full object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                {item.category}
              </span>

              <h3 className="mt-2 font-bold text-lg text-gray-800 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {item.content}
              </p>
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}
