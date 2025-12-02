"use client";

import { useEffect, useState } from "react";
import { Trash2, Pencil, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/posts`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        toast.error("Failed to load posts");
      }
    } catch (err) {
      toast.error("Server error while fetching posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
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
      } else {
        toast.error(data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting post");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl">
      <ToastContainer />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">All Posts</h1>

        <button
          onClick={() => router.push("/admin/posts/create")}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          + Create New Post
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts available</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                  Thumbnail
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                  Created At
                </th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={post.thumbnail}
                      className="h-14 w-20 object-cover rounded border"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{post.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {post.category?.name || "—"}
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(post.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() =>
                          router.push(`/admin/posts/edit/${post.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(post.id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-gray-200 p-7 relative animate-[fadeIn_0.18s_ease-out]">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition cursor-pointer"
              onClick={() => setShowDeleteModal(false)}
            >
              <X size={20} />
            </button>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Delete this post?
            </h2>
            <p className="text-center text-gray-600 text-sm leading-relaxed mb-6">
              This action is permanent and cannot be undone. The post will be
              removed from your database.
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-sm transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
