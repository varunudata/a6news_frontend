"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";
import Loader from "../components/shared/Loader";
import { isTokenExpired } from "../../utils/auth";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.replace("/login");
      return;
    }
    if (role !== "admin") {
      router.replace("/");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader label="Verifying admin access..." size="lg" />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
