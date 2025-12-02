"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import NavContents from "../../../components/layout/NavContents";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories/${categoryId}`);
        const data = await res.json();

        if (data.success) {
          setCategory(data.data.category);
          setPosts(data.data.posts);
        }
      } catch (err) {
        console.log("Error loading category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Category not found
      </div>
    );
  }

  return (
    <>
      <NavContents />
      <div className="w-[95%] mx-auto mt-8 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-l-8 border-red-600 pl-4">
          {category.name}
        </h1>
        {posts.length === 0 ? (
          <div className="text-gray-500 text-lg py-20 text-center">
            No posts in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {post.subtitle || post.content?.slice(0, 120) + "..."}
                  </p>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
