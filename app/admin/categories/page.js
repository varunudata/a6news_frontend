"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical, Plus, Save, Trash2, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "../../../utils/auth";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);

  // Drag-and-drop state
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchCategories = useCallback(async () => {
    if (!backendUrl) {
      toast.error("Backend Url is not configured");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/categories`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
        setOrderChanged(false);
      } else {
        toast.error(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while fetching categories");
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  // --- Drag & Drop handlers (only used when search is empty) ---
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
    // Visual reorder in real-time
    if (dragItem.current === null || dragItem.current === index) return;
    setCategories((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(dragItem.current, 1);
      updated.splice(index, 0, moved);
      dragItem.current = index;
      return updated;
    });
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
    setOrderChanged(true);
  };

  const handleSaveOrder = async () => {
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
    setSavingOrder(true);
    try {
      const order = categories.map((cat, index) => ({
        id: cat.id,
        sortOrder: index,
      }));
      const res = await fetch(`${backendUrl}/api/categories/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Category order saved! Changes are live on the website.");
        setOrderChanged(false);
      } else {
        toast.error(data.message || "Failed to save order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while saving order");
    } finally {
      setSavingOrder(false);
    }
  };

  const isSearching = search.trim().length > 0;
  const filteredCategories = isSearching
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
      )
    : categories;

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

        <div className="flex items-center gap-3">
          {orderChanged && !isSearching && (
            <button
              onClick={handleSaveOrder}
              disabled={savingOrder}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-60"
            >
              <Save size={16} />
              {savingOrder ? "Saving..." : "Save Order"}
            </button>
          )}
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {!isSearching && (
          <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
            <GripVertical size={13} />
            Drag rows to reorder — changes appear on the website navbar after
            saving.
          </p>
        )}

        {loading ? (
          <div className="text-gray-500 text-sm">Loading...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-gray-500 text-sm">No categories found</div>
        ) : (
          <ul className="space-y-2">
            {filteredCategories.map((cat, index) => (
              <li
                key={cat.id}
                draggable={!isSearching}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`flex items-center justify-between p-3 border rounded-lg transition select-none ${
                  !isSearching
                    ? "cursor-grab active:cursor-grabbing hover:bg-gray-50 active:opacity-60 active:scale-[0.99] active:shadow-md"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {!isSearching && (
                    <GripVertical
                      size={18}
                      className="text-gray-300 shrink-0"
                    />
                  )}
                  <div>
                    <div className="font-medium">{cat.name}</div>
                    {cat.createdAt && (
                      <div className="text-xs text-gray-500">
                        Created: {new Date(cat.createdAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm shrink-0"
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
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
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
