"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const logo =
    "https://res.cloudinary.com/dkdidynja/image/upload/v1760958996/logo_slyy7t.png";
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  },[]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    setIsLoggedIn(false);
    router.push("/login");
  };
  return (
    <header className="w-full bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 cursor-pointer group" 
            onClick={() => router.push('/')}
          >
            <img 
              src={logo} 
              alt="A6News Logo" 
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
            />
          </div>

          {/* Actions & Socials Section */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Social Icons - Hidden on very small screens for cleaner look */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://www.youtube.com/@a6newsinfra"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 border border-gray-100 shadow-sm transition-all duration-300 hover:bg-[#FF0000] hover:text-white hover:-translate-y-1 hover:shadow-md"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 border border-gray-100 shadow-sm transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:-translate-y-1 hover:shadow-md"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16cLcBDyEh/"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 border border-gray-100 shadow-sm transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 hover:shadow-md"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 border border-gray-100 shadow-sm transition-all duration-300 hover:bg-linear-to-tr from-pink-500 via-red-500 to-yellow-500 hover:text-white hover:-translate-y-1 hover:shadow-md"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-white text-gray-700 border border-gray-200 shadow-sm px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 hover:shadow transition-all cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="bg-red-600 text-white shadow-md shadow-red-600/20 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 transition-all cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
