"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavContents from "../../../components/layout/NavContents";

export default function SinglePostPage() {
  const params = useParams();
  const slug = params?.slug;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug || slug === "undefined" || slug === "null") return;

    console.log("Slug on production", slug);

    const fetchPost = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/posts/${slug}`);
        const data = await res.json();

        if (data.success) {
          setPost(data.data);
          fetchRelated(data.data.categoryId);
        }
      } catch (err) {
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async (catId) => {
      try {
        const res = await fetch(`${backendUrl}/api/categories/${catId}`);
        const data = await res.json();
        if (data.success) {
          setRelated(data.data.posts.filter((p) => p.slug !== slug));
        }
      } catch (err) {
        console.log("Error fetching related posts:", err);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Post not found
      </div>
    );
  }

  return (
    <>
      <NavContents />
      <div className="w-[95%] mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg text-gray-600 mt-2">{post.subtitle}</p>
          )}
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-semibold">
              {post.category?.name}
            </span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {post.thumbnail && (
          <div className="my-6 max-w-4xl mx-auto rounded-xl overflow-hidden shadow">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full object-cover max-h-[450px]"
            />
          </div>
        )}
        <div className="max-w-4xl mx-auto text-[17px] leading-[1.8] text-gray-800">
          {post.content.split("\n").map((para, i) => (
            <p key={i} className="mb-4">
              {para}
            </p>
          ))}
          {post.gallery?.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-lg w-full h-40 object-cover shadow"
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Related Posts
          </h2>
          {related.length === 0 ? (
            <p className="text-gray-500">No related posts found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/posts/${r.slug}`}
                  className="bg-white rounded-xl border shadow hover:shadow-lg transition overflow-hidden"
                >
                  {r.thumbnail && (
                    <img
                      src={r.thumbnail}
                      alt={r.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {r.subtitle || r.content.slice(0, 100) + "..."}
                    </p>
                    <span className="text-red-600 text-sm font-medium mt-3 inline-block">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
