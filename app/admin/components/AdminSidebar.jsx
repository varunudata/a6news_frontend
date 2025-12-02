"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderKanban, Users } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const links = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Posts", href: "/admin/posts", icon: <FileText size={18} /> },
    { label: "Categories", href: "/admin/categories", icon: <FolderKanban size={18} /> },
    { label: "Users", href: "/admin/users", icon: <Users size={18} /> },
  ];

  const getActive = (href) => {
    if (!activePath) return false;
    if (href === "/admin") return activePath === "/admin";
    return activePath.startsWith(href);
  };

  return (
    <aside className="w-60 bg-white min-h-screen text-black border-r border-gray-300 p-5 hidden md:flex flex-col shadow-md">
      <h1 className="text-2xl font-extrabold tracking-wide mb-6">
        <span className="text-red-600">A6</span>News Admin
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map((item) => {
          const isActive = getActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-red-100 hover:text-red-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 text-xs text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} A6News Admin
      </div>
    </aside>
  );
}
