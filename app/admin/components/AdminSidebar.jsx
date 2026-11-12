"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  Megaphone,
  PlusCircle,
  X,
} from "lucide-react";

export default function AdminSidebar({ isOpen = false, onClose }) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "All Posts",
      href: "/admin/posts",
      icon: <FileText size={18} />,
    },
    {
      label: "Create Post",
      href: "/admin/posts/create",
      icon: <PlusCircle size={18} />,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: <FolderKanban size={18} />,
    },
    {
      label: "News Ticker",
      href: "/admin/ticker",
      icon: <Megaphone size={18} />,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: <Users size={18} />,
    },
  ];

  const getActive = (href) => {
    if (!activePath) return false;
    if (href === "/admin") return activePath === "/admin";
    if (href === "/admin/posts") {
      return (
        activePath === "/admin/posts" ||
        activePath.startsWith("/admin/posts/edit")
      );
    }
    return activePath.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <Link href="/admin" className="text-xl font-extrabold tracking-tight">
          <span className="text-[#E50000]">A6</span>News Editorial
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1.5">
        {links.map((item) => {
          const isActive = getActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isActive
                  ? "bg-[#E50000] text-white"
                  : "text-gray-700 hover:bg-red-50 hover:text-[#E50000]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 text-xs text-gray-500 border-t border-gray-200">
        <p className="font-semibold text-gray-700">A6News Infra CMS</p>
        <p className="mt-0.5">© {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white min-h-screen text-gray-900 border-r border-gray-200 p-5 hidden md:flex flex-col shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay (Solid dark overlay, zero blur) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden flex"
          onClick={onClose}
        >
          <aside
            className="w-64 bg-white h-full p-5 border-r border-gray-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
