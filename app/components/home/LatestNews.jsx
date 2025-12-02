"use client";

import NewsCard from "./NewsCard";

export default function LatestNews({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 w-[95%] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Latest News</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={post.id} article={post} />
        ))}
      </div>
    </section>
  );
}
