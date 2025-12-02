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
    <div className="flex items-center justify-center">
      <div className="flex h-20 w-full justify-between p-4 items-center ">
        <div className="w-40">
          <img src={logo} alt="logo" className="w-full h-auto"></img>
        </div>
        <div className="flex gap-5">
          <a
            href="https://www.youtube.com/@a6newsinfra"
            target="blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-[#FF0000] hover:text-white hover:scale-110"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
            target="blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:scale-110"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/share/16cLcBDyEh/"
            target="blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:scale-110"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
            target="blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-linear-to-tr from-pink-500 via-red-500 to-yellow-500 hover:text-white hover:scale-110"
          >
            <Instagram className="w-5 h-5" />
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

