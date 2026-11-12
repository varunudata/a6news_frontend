/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  PlayCircle,
  SlidersHorizontal,
} from "lucide-react";
import Loader, { CardGridSkeleton } from "../../../components/shared/Loader";

function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (page = 1, sortValue = sort) => {
      if (!categoryId || categoryId === "undefined") return;
      try {
        const res = await fetch(
          `${backendUrl}/api/categories/${categoryId}?page=${page}&sort=${sortValue}`
        );
        const data = await res.json();

        if (data.success) {
          setCategory(data.data.category || null);
          setPosts(data.data.posts || []);

          setPagination(
            data?.data?.pagination ?? {
              currentPage: 1,
              totalPages: 1,
              totalPosts: 0,
            }
          );
        }
      } catch (err) {
        console.error("Error loading category:", err);
      } finally {
        setLoading(false);
      }
    },
    [categoryId, backendUrl, sort]
  );

  useEffect(() => {
    if (!categoryId || categoryId === "undefined") return;

    setLoading(true);
    fetchData(1, sort);
  }, [categoryId, sort, fetchData]);

  const handlePageChange = (pg) => {
    if (pg >= 1 && pg <= pagination.totalPages) {
      setLoading(true);
      fetchData(pg, sort);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#E50000] font-medium transition-colors">
          హోమ్
        </Link>
        <span>/</span>
        <span className="text-gray-400">విభాగం</span>
        {category?.name && (
          <>
            <span>/</span>
            <span className="text-[#E50000] font-bold uppercase">{category.name}</span>
          </>
        )}
      </nav>

      {/* Section Header & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 mb-8 border-b-2 border-gray-900">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#E50000] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#E50000]" />
            విభాగం వార్తలు
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
              {category?.name || (loading ? "లోడ్ అవుతోంది..." : "విభాగం")}
            </h1>
            {!loading && pagination.totalPosts !== undefined && (
              <span className="bg-red-50 text-[#E50000] border border-red-200 text-xs font-bold px-2.5 py-0.5 rounded">
                {pagination.totalPosts} కథనాలు
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <label htmlFor="category-sort" className="text-xs font-bold text-gray-500">
            క్రమం:
          </label>
          <select
            id="category-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg bg-white text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#E50000] cursor-pointer"
          >
            <option value="latest">కొత్తవి ముందుగా</option>
            <option value="oldest">పాతవి ముందుగా</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <>
          <Loader label="విభాగం వార్తలు లోడ్ అవుతున్నాయి..." />
          <CardGridSkeleton count={6} />
        </>
      ) : posts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <Newspaper className="w-10 h-10 text-gray-400 mx-auto mb-3 stroke-[1.5]" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            ఈ విభాగంలో ప్రస్తుతం వార్తలు లేవు
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            ఇతర విభాగాల వార్తల కోసం పైన ఉన్న మెనూను చూడండి.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#E50000] hover:bg-red-700 text-white text-xs font-bold tracking-wider px-4 py-2.5 rounded-lg transition-colors"
          >
            హోమ్ పేజీకి వెళ్ళండి
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#E50000] transition-colors duration-200 flex flex-col"
              >
                {/* Card Header */}
                <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between gap-2">
                  <span className="inline-block bg-[#E50000] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded truncate max-w-[65%]">
                    {category?.name || "News"}
                  </span>
                  {post.createdAt && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-medium shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(post.createdAt)}
                    </span>
                  )}
                </div>

                {/* Uncropped 16:9 Thumbnail Container */}
                <div className="relative w-full aspect-[16/9] bg-neutral-100 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-contain block"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1.5">
                      <Newspaper className="w-7 h-7 stroke-[1.5]" />
                      <span className="text-xs font-medium">No Image</span>
                    </div>
                  )}

                  {post.youtubeLink && (
                    <span className="absolute bottom-2 right-2 bg-[#E50000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      Video
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#E50000] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {post.subtitle ||
                      (post.content?.length > 130
                        ? post.content.slice(0, 130) + "..."
                        : post.content)}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-[#E50000] font-bold text-xs tracking-wide mt-4">
                    <span>పూర్తి కథనం చదవండి</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Bar */}
          {pagination.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between bg-gray-50 px-4 sm:px-6 py-3.5 rounded-xl border border-gray-200">
              <button
                type="button"
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                మునుపటి
              </button>

              <span className="text-xs sm:text-sm font-bold text-gray-700">
                పేజీ <span className="text-[#E50000]">{pagination.currentPage}</span> /{" "}
                {pagination.totalPages}
              </span>

              <button
                type="button"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                తదుపరి
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
