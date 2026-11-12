"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "../../../utils/auth";
import Loader from "../../components/shared/Loader";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchCategories = useCallback(async () => {
    if (!backendUrl) {
      toast.error("Backend URL is not configured");
      setLoading(false);
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
      console.error(error);
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
      setAdding(true);
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
      console.error(error);
      toast.error("Server error while adding category");
    } finally {
      setAdding(false);
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
      console.error(error);
      toast.error("Server error while deleting category");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
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

  const moveCategory = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    setCategories((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(targetIndex, 0, moved);
      return updated;
    });
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
      console.error(error);
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
    <div className="max-w-4xl">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50000]">
            Navigation & Taxonomy
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
            Categories ({categories.length})
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {orderChanged && !isSearching && (
            <button
              type="button"
              onClick={handleSaveOrder}
              disabled={savingOrder}
              className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer"
            >
              <Save size={15} />
              <span>{savingOrder ? "Saving..." : "Save Order"}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#E50000] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#E50000]"
          />
        </div>

        {!isSearching && (
          <p className="text-xs text-gray-500 mb-4 flex items-center gap-1.5 font-medium">
            <GripVertical size={14} className="text-[#E50000]" />
            Drag rows or use the Up / Down arrows to reorder navbar categories, then click &ldquo;Save Order&rdquo;.
          </p>
        )}

        {loading ? (
          <Loader label="Loading categories..." />
        ) : filteredCategories.length === 0 ? (
          <div className="text-gray-500 text-sm py-8 text-center">
            No categories found
          </div>
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
                className={`flex items-center justify-between p-3.5 border border-gray-200 rounded-lg transition-colors select-none ${
                  !isSearching
                    ? "cursor-grab active:cursor-grabbing hover:border-[#E50000] bg-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!isSearching && (
                    <GripVertical
                      size={18}
                      className="text-gray-400 shrink-0 hidden sm:block"
                    />
                  )}
                  <span className="w-6 h-6 rounded bg-red-50 text-[#E50000] border border-red-100 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-gray-900 truncate">
                      {cat.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!isSearching && (
                    <>
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveCategory(index, -1)}
                        title="Move Up"
                        className="p-1.5 rounded border border-gray-200 text-gray-600 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={index === filteredCategories.length - 1}
                        onClick={() => moveCategory(index, 1)}
                        title="Move Down"
                        className="p-1.5 rounded border border-gray-200 text-gray-600 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-red-200 bg-red-50 text-[#E50000] hover:bg-[#E50000] hover:text-white text-xs font-bold transition-colors shrink-0 ml-1 cursor-pointer"
                    disabled={deleteLoadingId === cat.id}
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">
                      {deleteLoadingId === cat.id ? "Deleting..." : "Delete"}
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setIsAddOpen(false)}
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-extrabold text-gray-900 mb-4">
              Add New Category
            </h2>

            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="e.g. INDUSTRIAL CORRIDORS"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-[#E50000]"
            />

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 text-xs sm:text-sm font-bold border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={adding}
                onClick={handleAdd}
                className="px-5 py-2 text-xs sm:text-sm font-bold bg-[#E50000] text-white rounded-lg hover:bg-red-700 disabled:opacity-60 cursor-pointer"
              >
                {adding ? "Adding..." : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
