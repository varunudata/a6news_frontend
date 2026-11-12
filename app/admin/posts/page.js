/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Trash2,
  Pencil,
  X,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isTokenExpired } from "../../../utils/auth";
import Loader from "../../components/shared/Loader";

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/posts?limit=6&page=${page}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalPosts(data.pagination?.totalPosts || 0);
      } else {
        toast.error("Failed to load posts");
      }
    } catch (err) {
      toast.error("Server error while fetching posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }
    try {
      setDeleting(true);
      const res = await fetch(`${backendUrl}/api/posts/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Post deleted successfully");
        setPosts((prev) => prev.filter((post) => post.id !== deleteId));
        setTotalPosts((prev) => Math.max(0, prev - 1));
      } else {
        toast.error(data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting post");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50000]">
            Article Management
          </span>
          <div className="flex items-center gap-3 mt-0.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              All Posts
            </h1>
            {!loading && (
              <span className="bg-red-50 text-[#E50000] border border-red-200 text-xs font-bold px-2.5 py-0.5 rounded">
                {totalPosts} Total
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/posts/create")}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#E50000] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create New Post</span>
        </button>
      </div>

      {/* Main Content Box */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <Loader label="Loading published articles..." />
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No posts available. Click &ldquo;Create New Post&rdquo; to publish your first article.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                      Thumbnail
                    </th>
                    <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                      Title
                    </th>
                    <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                      Category
                    </th>
                    <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                      Published On
                    </th>
                    <th className="py-3.5 px-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3.5 px-4 w-32">
                        <div className="w-28 aspect-[16/9] rounded border border-gray-200 bg-neutral-100 overflow-hidden flex items-center justify-center">
                          {post.thumbnail ? (
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-contain block"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-400">
                              No image
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-bold text-sm text-gray-900 line-clamp-2">
                          {post.title}
                        </div>
                        {post.subtitle && (
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {post.subtitle}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-red-50 text-[#E50000] border border-red-200 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded">
                          {post.category?.name || "—"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-gray-600 whitespace-nowrap font-medium">
                        {new Date(post.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            title="View Live Article"
                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[#E50000] hover:text-[#E50000] transition-colors"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <button
                            type="button"
                            title="Edit Post"
                            onClick={() =>
                              router.push(`/admin/posts/edit/${post.id}`)
                            }
                            className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:border-[#E50000] hover:text-[#E50000] transition-colors cursor-pointer"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            title="Delete Post"
                            onClick={() => {
                              setDeleteId(post.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 rounded-lg border border-red-200 bg-red-50 text-[#E50000] hover:bg-[#E50000] hover:text-white transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-28 aspect-[16/9] rounded border border-gray-200 bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-contain block"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400">No img</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-block bg-red-50 text-[#E50000] border border-red-200 text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-1">
                        {post.category?.name || "—"}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 rounded border border-gray-200 text-xs font-bold text-gray-700"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/admin/posts/edit/${post.id}`)
                        }
                        className="px-2.5 py-1.5 rounded border border-gray-200 text-xs font-bold text-gray-700 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(post.id);
                          setShowDeleteModal(true);
                        }}
                        className="px-2.5 py-1.5 rounded bg-red-50 border border-red-200 text-xs font-bold text-[#E50000] cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination Bar */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 bg-white px-4 sm:px-6 py-3.5 rounded-xl border border-gray-200">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-xs sm:text-sm text-gray-700 font-bold">
            Page <span className="text-[#E50000]">{page}</span> of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal (Solid Overlay - No Glassmorphism) */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm rounded-xl border border-gray-200 p-6 relative">
            <button
              type="button"
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              onClick={() => setShowDeleteModal(false)}
            >
              <X size={20} />
            </button>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
              <Trash2 size={22} className="text-[#E50000]" />
            </div>
            <h2 className="text-lg font-extrabold text-gray-900 text-center mb-1.5">
              Delete this post?
            </h2>
            <p className="text-center text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              This action is permanent and cannot be undone. The article will be
              removed from the database.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-lg bg-[#E50000] text-white text-xs sm:text-sm font-bold hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {deleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
