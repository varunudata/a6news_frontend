"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavContents from "../../../components/layout/NavContents";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest"); // NEW
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1, sortValue = sort) => {
    try {
      const res = await fetch(
        `${backendUrl}/api/categories/${categoryId}?page=${page}&sort=${sortValue}`
      );
      const data = await res.json();

      if (data.success) {
        setCategory(data.data.category || []);
        setPosts(data.data.posts || []);
        setPagination(data.data.pagination || []);
      }
    } catch (err) {
      console.log("Error loading category:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) fetchData(1, sort);
  }, [categoryId, sort]);

  const handlePageChange = (pg) => {
    if (pg >= 1 && pg <= pagination.totalPages) {
      setLoading(true);
      fetchData(pg, sort);
    }
  };

  return (
    <>
      <NavContents />
      <div className="w-[95%] mx-auto mt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-red-600">{category?.name}</h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded-md bg-white shadow-sm cursor-pointer"
          >
            <option value="latest">Sort: Latest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
            Loading...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500 text-lg">No posts available.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="shadow rounded-lg overflow-hidden bg-white"
                >
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {post.subtitle || post.content.slice(0, 100)}
                    </p>
                    <a
                      href={`/posts/${post.slug}`}
                      className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10 gap-4 mb-10">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>
              <span className="px-4 py-2 font-semibold">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
