"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchCategories = async () => {
    if (!backendUrl) {
      toast.error("Backend Url is not configured");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/categories`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      } else {
        toast.error(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const name = newCategoryName.trim();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    if (!backendUrl) {
      toast.error("Backend URL is not configured");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in ");
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("New category added successfully");
        setNewCategoryName("");
        setIsAddOpen(false);
        setCategories((prev) => [...prev, data.data]);
      } else {
        toast.error(data.message || "Failed to add new category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while adding category");
    }
  };

  const handleDelete = async (id) => {
    if (!backendUrl) {
      toast.error("Backend URL is not configured");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      return;
    }
    try {
      setDeleteLoadingId(id);
      const res = await fetch(`${backendUrl}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Category deleted successfully");
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while deleting category");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl">
      <ToastContainer />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage news categories for A6News.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {loading ? (
          <div className="text-gray-500 text-sm">Loading...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-gray-500 text-sm">No categories found</div>
        ) : (
          <ul className="space-y-2">
            {filteredCategories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <div className="font-medium">{cat.name}</div>
                  {cat.createdAt && (
                    <div className="text-xs text-gray-500">
                      Created: {new Date(cat.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                  disabled={deleteLoadingId === cat.id}
                >
                  <Trash2 size={16} />
                  {deleteLoadingId === cat.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setIsAddOpen(false)}
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Add Category</h2>

            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name..."
              className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
