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
            
            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://www.youtube.com/@a6newsinfra"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#FF0000] hover:border-[#FF0000] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16cLcBDyEh/"
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-pink-600 hover:border-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#E50000] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="bg-[#E50000] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all cursor-pointer"
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
