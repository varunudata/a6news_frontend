"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/posts/latest-per-category`);
        const data = await res.json();

        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("Failed:", data.message);
        }
      } catch (error) {
        console.error("Error loading latest posts per category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, [backendUrl]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <section className="bg-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Top Stories
            </h2>
            <span className="h-1.5 w-16 sm:w-20 bg-red-600 rounded-full"></span>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Top Stories
          </h2>
          <span className="h-1.5 w-16 sm:w-20 bg-red-600 rounded-full"></span>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No top stories found.</p>
        ) : (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {post.subtitle ||
                      (post.content?.length > 120
                        ? post.content.slice(0, 120) + "..."
                        : post.content)}
                  </p>

                  <div className="mt-auto pt-5 flex items-center text-red-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                    Read article 
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
