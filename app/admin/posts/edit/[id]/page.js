"use client";

import { useEffect, useState } from "react";
import { Upload, X, Loader } from "lucide-react";
import { uploadToCloudinary } from "../../../../../utils/uploadToCloudinary";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditPostPage({ params }) {
  const [postId, setPostId] = useState(null);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loadingPost, setLoadingPost] = useState(true);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    Promise.resolve(params).then((p) => {
      setPostId(p.id);
    });
  }, [params]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories`);
        const data = await res.json();
        if (data.success) setCategories(data.data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

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
        setTags(post.tags.join(", "));
        setThumbnail(post.thumbnail);
        setGallery(post.gallery || []);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      setThumbnail(url);
      toast.success("Thumbnail updated");
    } catch (err) {
      toast.error("Thumbnail upload failed");
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
      toast.error("Gallery upload failed");
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !content || !categoryId || !thumbnail) {
      toast.error("Please fill all required fields");
      return;
    }

    setUpdating(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${backendUrl}/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          subtitle,
          categoryId,
          content,
          tags: tags.split(",").map((t) => t.trim()),
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
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setUpdating(false);
    }
  };

  if (loadingPost) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-600">
        Loading post details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6">Edit Post</h1>
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
        <div>
          <label className="font-medium">Title *</label>
          <input
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Subtitle</label>
          <input
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Category *</label>
          <select
            className="w-full px-3 py-2 border rounded-lg mt-1"
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

        <div>
          <label className="font-medium">Content *</label>
          <textarea
            rows="8"
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="font-medium">Tags</label>
          <input
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Thumbnail *</label>

          <label
            className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer ${
              thumbnailLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {thumbnailLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} /> Upload Thumbnail
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
            <div className="mt-3 relative w-40">
              <img src={thumbnail} className="rounded-lg border" />
              <button
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded"
                onClick={() => setThumbnail(null)}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="font-medium">Gallery</label>

          <label className="mt-2 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border hover:bg-gray-200 cursor-pointer">
            {galleryLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </div>
            ) : (
              <>
                <Upload size={18} /> Upload Images
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

          <div className="grid grid-cols-4 gap-3 mt-3">
            {gallery.map((img, index) => (
              <div className="relative" key={index}>
                <img
                  src={img}
                  className="h-24 w-full rounded-lg border object-cover"
                />
                <button
                  className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded"
                  onClick={() =>
                    setGallery(gallery.filter((_, i) => i !== index))
                  }
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {updating && <Loader size={16} className="animate-spin" />}
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
}
