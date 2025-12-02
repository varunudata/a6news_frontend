"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  }, []);

  if (loading) {
    return (
      <div className="w-[95%] mx-auto mt-12 text-center text-gray-600 text-lg">
        Loading latest posts...
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6 text-red-600">
        Latest From Each Category
      </h2>
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="shadow-md rounded-lg bg-white overflow-hidden flex flex-col border"
            >
              <div className="h-[50px] w-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                {post.category}
              </div>
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {post.subtitle ||
                    (post.content?.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content)}
                </p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-auto bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition text-center"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
