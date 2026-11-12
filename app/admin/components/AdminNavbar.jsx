"use client";

import { ExternalLink, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar({ onOpenSidebar }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login");
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          className="md:hidden p-2 border border-gray-200 rounded-lg text-gray-700 hover:border-[#E50000] hover:text-[#E50000] transition-colors cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900">
            <span className="text-[#E50000]">A6</span>News
          </h2>
          <span className="bg-red-50 text-[#E50000] border border-red-200 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
            Admin CMS
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] transition-colors"
        >
          <span className="hidden sm:inline">Live Website</span>
          <ExternalLink size={14} />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 bg-[#E50000] px-3.5 py-1.5 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
