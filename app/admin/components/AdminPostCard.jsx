"use client";

import Link from "next/link";
import { Trash, Pencil } from "lucide-react";

export default function AdminPostCard({ post, onDelete }) {
  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-start border">
      <div className="flex gap-4">
        <img
          src={post.thumbnail}
          className="w-28 h-20 object-cover rounded border"
        />

        <div>
          <h3 className="font-bold">{post.title}</h3>

          <p className="text-sm text-gray-500">
            {post.subtitle || "No subtitle"}
          </p>

          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/admin/posts/edit/${post.id}`}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <Pencil size={16} />
        </Link>

        <button
          onClick={() => onDelete(post.id)}
          className="p-2 bg-red-600 text-white rounded"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
