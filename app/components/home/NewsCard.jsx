"use client";

import Link from "next/link";

export default function NewsCard({ article }) {
  return (
    <Link
      href={`/posts/${article.slug}`}
      className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={article.thumbnail}
        alt={article.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
        {article.subtitle && (
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {article.subtitle}
          </p>
        )}

        <div className="text-xs text-gray-400 mt-2">
          {new Date(article.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
