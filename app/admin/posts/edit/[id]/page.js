/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Upload, X, Loader as LucideLoader, ArrowLeft } from "lucide-react";
import { uploadToCloudinary } from "../../../../../utils/uploadToCloudinary";
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { isTokenExpired } from "../../../../../utils/auth";
import Loader from "../../../../components/shared/Loader";

export default function EditPostPage() {
  const params = useParams();
  const postId = params?.id;
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loadingPost, setLoadingPost] = useState(true);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success) setCategories(data.data || []);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    if (backendUrl) {
      fetchCategories();
    }
  }, [backendUrl]);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoadingPost(true);
      try {
        const res = await fetch(`${backendUrl}/api/posts/id/${postId}`);
        const data = await res.json();

        if (!data.success) {
          toast.error("Failed to load post");
          return;
        }

        const post = data.data;

        setTitle(post.title);
        setSubtitle(post.subtitle || "");
        setCategoryId(String(post.categoryId));
        setContent(post.content);
        setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
        setYoutubeLink(post.youtubeLink || "");
        setThumbnail(post.thumbnail);
        setGallery(post.gallery || []);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [postId, backendUrl]);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      setThumbnail(url);
      toast.success("Thumbnail updated");
    } catch (err) {
      toast.error(err.message || "Thumbnail upload failed");
    } finally {
      setThumbnailLoading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setGalleryLoading(true);

    try {
      const uploaded = [];
      for (const f of files) {
        const url = await uploadToCloudinary(f);
        uploaded.push(url);
      }
      setGallery((prev) => [...prev, ...uploaded]);
      toast.success("Gallery updated");
    } catch (err) {
      toast.error(err.message || "Gallery upload failed");
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim() || !categoryId || !thumbnail) {
      toast.error("Please fill all required fields");
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
    setUpdating(true);

    try {
      const res = await fetch(`${backendUrl}/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim(),
          categoryId,
          content,
          tags: tags
            ? tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
          youtubeLink: youtubeLink.trim(),
          thumbnail,
          gallery,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Post Updated Successfully");
        setTimeout(() => {
          router.push("/admin/posts");
        }, 1000);
      } else {
        toast.error(data.message || "Update failed");
        setUpdating(false);
      }
    } catch {
      toast.error("Server error");
      setUpdating(false);
    }
  };

  if (loadingPost) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader label="Loading post details..." size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#E50000] mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Posts
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Edit Post
          </h1>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Title <span className="text-[#E50000]">*</span>
            </label>
            <input
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Category <span className="text-[#E50000]">*</span>
            </label>
            <select
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:border-[#E50000] focus:outline-none cursor-pointer"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
            Subtitle
          </label>
          <input
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
            Article Content <span className="text-[#E50000]">*</span>
          </label>
          <textarea
            rows="10"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Tags (Comma separated)
            </label>
            <input
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              YouTube Video Link (Optional)
            </label>
            <input
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="pt-2 border-t border-gray-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Main Thumbnail <span className="text-[#E50000]">*</span>
          </label>

          <label
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
              thumbnailLoading
                ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#E50000] hover:text-[#E50000]"
            }`}
          >
            {thumbnailLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#E50000] border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span>Replace Thumbnail</span>
              </>
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleThumbnailUpload}
              disabled={thumbnailLoading}
            />
          </label>

          {thumbnail && (
            <div className="mt-4 relative w-full max-w-md aspect-[16/9] rounded-xl border border-gray-200 bg-neutral-100 overflow-hidden flex items-center justify-center">
              <img
                src={thumbnail}
                alt="Thumbnail preview"
                className="w-full h-full object-contain block"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/75 hover:bg-[#E50000] text-white p-1.5 rounded-lg transition-colors cursor-pointer"
                onClick={() => setThumbnail(null)}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Gallery Upload */}
        <div className="pt-2 border-t border-gray-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Project Gallery
          </label>

          <label
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
              galleryLoading
                ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#E50000] hover:text-[#E50000]"
            }`}
          >
            {galleryLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#E50000] border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span>Add Gallery Images</span>
              </>
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              disabled={galleryLoading}
            />
          </label>

          {gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {gallery.map((img, index) => (
                <div
                  className="relative aspect-[16/10] rounded-lg border border-gray-200 bg-neutral-100 overflow-hidden flex items-center justify-center"
                  key={index}
                >
                  <img
                    src={img}
                    alt={`Gallery preview ${index + 1}`}
                    className="w-full h-full object-contain block"
                  />
                  <button
                    type="button"
                    className="absolute top-1.5 right-1.5 bg-black/75 hover:bg-[#E50000] text-white p-1 rounded transition-colors cursor-pointer"
                    onClick={() =>
                      setGallery(gallery.filter((_, i) => i !== index))
                    }
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <Link
            href="/admin/posts"
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={updating}
            className="px-6 py-2.5 bg-[#E50000] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            {updating && <LucideLoader size={16} className="animate-spin" />}
            <span>{updating ? "Updating..." : "Update Post"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
