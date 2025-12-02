"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[rgb(229,0,0)] text-white mt-10 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
          <h2 className="text-2xl font-extrabold tracking-wide">A6NEWS</h2>
          <p className="mt-3 text-sm text-red-100 leading-relaxed">
            Your trusted source for structured updates on  
            National Highways, Expressways, Airports, Railways,  
            Infrastructure and Real-Time News.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://www.youtube.com/@a6newsinfra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-red-600 transition hover:bg-[#FF0000] hover:text-white hover:scale-110"
            >
              <Youtube size={20} />
            </a>

            <a
              href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-red-600 transition hover:bg-black hover:text-white hover:scale-110"
            >
              <Twitter size={20} />
            </a>

            <a
              href="https://www.facebook.com/share/16cLcBDyEh/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-red-600 transition hover:bg-[#1877F2] hover:text-white hover:scale-110"
            >
              <Facebook size={20} />
            </a>

            <a
              href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-red-600 transition hover:bg-linear-to-tr from-pink-500 via-red-500 to-yellow-500 hover:text-white hover:scale-110"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-xl">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-xl">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/nh-projects" className="hover:underline">NH Projects</Link></li>
            <li><Link href="/express-ways" className="hover:underline">Express Ways</Link></li>
            <li><Link href="/airports" className="hover:underline">Airports</Link></li>
            <li><Link href="/railway-projects" className="hover:underline">Railway Projects</Link></li>
            <li><Link href="/city-infra" className="hover:underline">City Infra</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-xl">Contact Us</h3>
          <p className="text-sm text-red-100">Have any suggestions or news updates?</p>
          <p className="mt-2 text-sm">📧 contact@a6news.in</p>
          <p className="text-sm mt-1">📍Vijayawada, Andhra Pradesh, India</p>
        </div>
      </div>

      <div className="mt-10 border-t border-red-300 pt-4 text-center text-sm text-red-100">
        © {new Date().getFullYear()} <span className="font-semibold">A6NEWS</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
