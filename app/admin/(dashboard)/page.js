/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  FolderKanban,
  Megaphone,
  Pencil,
  Plus,
} from "lucide-react";
import Loader from "../../components/shared/Loader";

export default function AdminDashboard() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [tickerItemsCount, setTickerItemsCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [postsRes, catsRes, tickerRes] = await Promise.all([
          fetch(`${backendUrl}/api/posts?limit=5&page=1`),
          fetch(`${backendUrl}/api/categories`),
          fetch(`${backendUrl}/api/ticker`),
        ]);

        const [postsData, catsData, tickerData] = await Promise.all([
          postsRes.json(),
          catsRes.json(),
          tickerRes.json(),
        ]);

        if (postsData.success) {
          setRecentPosts(postsData.data || []);
          setTotalPosts(postsData.pagination?.totalPosts || postsData.data?.length || 0);
        }
        if (catsData.success && Array.isArray(catsData.data)) {
          setCategoriesCount(catsData.data.length);
        }
        if (tickerData.success && tickerData.data?.text) {
          const items = tickerData.data.text
            .split(/[•\n]+/)
            .map((t) => t.trim())
            .filter(Boolean);
          setTickerItemsCount(items.length);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (backendUrl) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader label="Loading dashboard metrics..." size="lg" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Published Reports",
      value: totalPosts,
      href: "/admin/posts",
      icon: <FileText className="w-5 h-5 text-[#E50000]" />,
    },
    {
      label: "Active Categories",
      value: categoriesCount,
      href: "/admin/categories",
      icon: <FolderKanban className="w-5 h-5 text-[#E50000]" />,
    },
    {
      label: "Live Ticker Headlines",
      value: tickerItemsCount,
      href: "/admin/ticker",
      icon: <Megaphone className="w-5 h-5 text-[#E50000]" />,
    },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50000]">
            Editorial Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/posts/create"
            className="inline-flex items-center gap-1.5 bg-[#E50000] hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
          <Link
            href="/admin/ticker"
            className="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:border-[#E50000] text-gray-700 hover:text-[#E50000] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <Megaphone className="w-4 h-4" />
            <span>Update Ticker</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#E50000] transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {stat.label}
              </span>
              <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {stat.value}
              </h2>
              <span className="text-xs font-bold text-[#E50000] inline-flex items-center gap-1">
                Manage <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
              Recent Dispatches
            </h2>
            <p className="text-xs text-gray-500">
              Latest 5 articles published on A6News
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs font-bold text-[#E50000] hover:underline inline-flex items-center gap-1"
          >
            <span>View All ({totalPosts})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No posts published yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-24 aspect-[16/9] rounded border border-gray-200 bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-contain block"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400">No img</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-50 text-[#E50000] border border-red-200 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        {post.category?.name || "News"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Link
                    href={`/posts/${post.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>
                  <Link
                    href={`/admin/posts/edit/${post.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E50000] hover:bg-red-700 text-white text-xs font-bold transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
