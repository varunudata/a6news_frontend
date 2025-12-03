"use client";

import { Loader, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../../../utils/uploadToCloudinary.js";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreatePostsPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      console.log("Uploaded url", url);
      setThumbnail(url);
      toast.success("Thumbnail uploaded successfully");
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      toast.error("Thumbnail upload failed");
    } finally {
      setThumbnailLoading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setGalleryLoading(true);
    try {
      const uploadedImages = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        uploadedImages.push(url);
      }
      setGallery((prev) => [...prev, ...uploadedImages]);
      toast.success("Gallery images uploaded successfully");
    } catch (err) {
      console.error("Gallery upload failed:", err);
      toast.error("Failed to upload gallery images.");
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/categories`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handlePublish = async () => {
    if (!title || !content || !categoryId || !thumbnail) {
      toast.error("Please fill all required fields");
      return;
    }
    setPublishing(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${backendUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          subtitle,
          content,
          categoryId,
          tags: tags.split(",").map((t) => t.trim()),
          thumbnail,
          gallery,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Post Published Successfully");
        setTimeout(() => {
          router.push("/admin/posts");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to publish post");
      }
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6">Create New Post</h1>
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
        <div>
          <label className="font-medium">Title *</label>
          <input
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />
        </div>
        <div>
          <label className="font-medium">Subtitle</label>
          <input
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="SubTitle"
          />
        </div>
        <div>
          <label className="font-medium">Category *</label>
          <select
            className="w-full px-3 py-2 border rounded-lg mt-1 bg-white"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
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
            placeholder="Write the full article here ..."
          ></textarea>
        </div>
        <div>
          <label className="font-medium">Tags</label>
          <input
            className="w-full px-3 py-2 border rounded-lg mt-1"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Politics, Economy, NH-Projects"
          />
        </div>

        <div>
          <label className="font-medium">Thumbnail *</label>
          <div className="mt-2 flex items-center gap-4">
            <label
              className={`mt-2 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border cursor-pointer ${
                thumbnailLoading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {thumbnailLoading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Thumbnail
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
          </div>
          {thumbnail && (
            <div className="mt-3 relative w-40">
              <img src={thumbnail} className="rounded-lg border" />
              <button
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded cursor-pointer"
                onClick={() => setThumbnail(null)}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <div>
          <div>
            <label className="font-medium">Gallery (optional)</label>
            <label className="mt-2 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-200">
              {galleryLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </div>
              ) : (
                <>
                  <Upload size={18} />
                  Upload Images
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryUpload}
                disabled={galleryLoading}
              />
            </label>

            {/* Gallery Preview */}
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="rounded-lg border h-24 w-full object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded cursor-pointer"
                    onClick={() =>
                      setGallery(gallery.filter((_, index) => index !== i))
                    }
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {publishing && <Loader size={16} className="animate-spin" />}
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}
