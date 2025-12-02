"use client";

import { Trash } from "lucide-react";

export default function AdminCategoryCard({ category, onDelete }) {
  return (
    <div className="bg-white shadow rounded p-4 border flex justify-between items-center">
      <span className="font-medium">{category.name}</span>

      <button
        onClick={() => onDelete(category.id)}
        className="p-2 bg-red-600 text-white rounded"
      >
        <Trash size={16} />
      </button>
    </div>
  );
}
