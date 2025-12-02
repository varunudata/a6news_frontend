"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    router.replace("/login")
  }
  return (
    <header className="w-full h-14 bg-white border-b border-gray-300 px-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <h2 className="text-xl font-bold">
        <span className="text-red-600">A6</span>News Admin
      </h2>

      <div className="flex items-center gap-4">
        <button className="bg-red-600 px-4 py-1.5 text-white rounded hover:bg-red-700 transition cursor-pointer" onClick={handleLogout}>
          Logout
        </button>

        <button className="md:hidden p-2 border rounded">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
