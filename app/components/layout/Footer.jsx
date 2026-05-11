"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#e50000] text-white mt-12 sm:mt-20 pt-16 pb-8 shadow-[0_-10px_40px_rgba(229,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">A6NEWS</h2>
          <p className="text-sm text-white/80 leading-relaxed pr-4">
            Your trusted source for structured updates on  
            National Highways, Expressways, Airports, Railways,  
            Infrastructure and Real-Time News.
          </p>

          <div className="flex gap-3 mt-4">
            <a
              href="https://www.youtube.com/@a6newsinfra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-[#FF0000] hover:-translate-y-1"
            >
              <Youtube size={18} />
            </a>

            <a
              href="https://x.com/A6NewsTelugu?t=CLS91x4_28ro0cjprwyD9Q&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-[#1DA1F2] hover:-translate-y-1"
            >
              <Twitter size={18} />
            </a>

            <a
              href="https://www.facebook.com/share/16cLcBDyEh/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-[#1877F2] hover:-translate-y-1"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/a6newsinfra?igsh=MW5zcGRjYWMxcDAwMg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-pink-600 hover:-translate-y-1"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-5 text-lg tracking-wide uppercase text-white/90">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-5 text-lg tracking-wide uppercase text-white/90">Categories</h3>
          <ul className="space-y-3">
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">NH Projects</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">Express Ways</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">Airports</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">Railway Projects</Link></li>
            <li><Link href="/#" className="text-sm text-white/80 hover:text-white transition-colors">City Infra</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-5 text-lg tracking-wide uppercase text-white/90">Contact Us</h3>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>Have any suggestions or news updates?</p>
            <p className="flex items-center gap-2 mt-2"><span className="text-lg">📧</span> contact@a6news.in</p>
            <p className="flex items-start gap-2"><span className="text-lg">📍</span> Vijayawada,<br/>Andhra Pradesh, India</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-red-500/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/70 text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-white/90">A6NEWS</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
