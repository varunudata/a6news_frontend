/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Newspaper, PlayCircle } from "lucide-react";
import Loader, { CardGridSkeleton } from "../shared/Loader";

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

function ArticleCard({ post, categoryLabel }) {
  const categoryName = categoryLabel || post.category?.name || post.category || "News";

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#E50000] transition-colors duration-200 flex flex-col"
    >
      {/* Card Header: Category Badge & Date */}
      <div className="px-4 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between gap-2">
        <span className="inline-block bg-[#E50000] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded truncate max-w-[65%]">
          {categoryName}
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
            <span className="text-xs font-medium">No Image Available</span>
          </div>
        )}

        {post.youtubeLink && (
          <span className="absolute bottom-2 right-2 bg-[#E50000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-flex items-center gap-1 shadow-xs">
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

        <p className="mt-2.5 text-sm text-gray-600 line-clamp-3 leading-relaxed">
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
  );
}

export default function Posts() {
  const [topPosts, setTopPosts] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchTopByCategories = async () => {
      try {
        setLoadingTop(true);
        const res = await fetch(`${backendUrl}/api/posts/latest-per-category`);
        const data = await res.json();

        if (data.success) {
          const recentSixCategories = (data.data || [])
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
          setTopPosts(recentSixCategories);
        }
      } catch (error) {
        console.error("Error loading latest posts per category:", error);
      } finally {
        setLoadingTop(false);
      }
    };

    if (backendUrl) {
      fetchTopByCategories();
    } else {
      setLoadingTop(false);
    }
  }, [backendUrl]);

  const fetchRecentPosts = useCallback(
    async (pageNum = 1) => {
      if (!backendUrl) {
        setLoadingRecent(false);
        return;
      }
      try {
        setLoadingRecent(true);
        const res = await fetch(`${backendUrl}/api/posts?limit=6&page=${pageNum}`);
        const data = await res.json();
        if (data.success) {
          setRecentPosts(data.data || []);
          setTotalPages(data.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.error("Error loading recent posts:", error);
      } finally {
        setLoadingRecent(false);
      }
    },
    [backendUrl]
  );

  useEffect(() => {
    fetchRecentPosts(page);
  }, [page, fetchRecentPosts]);

  return (
    <div className="bg-white">
      {/* SECTION 1: TOP STORIES BY CATEGORY (RESTRICTED TO 6 MOST RECENT) */}
      <section className="py-10 sm:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b-2 border-gray-900">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#E50000] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E50000]" />
                విభాగాల వారీగా
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                ప్రధాన విభాగాల తాజా వార్తలు
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              వివిధ మౌలిక సదుపాయాల రంగాల నుండి ఎంపిక చేసిన 6 తాజా కథనాలు
            </p>
          </div>

          {loadingTop ? (
            <CardGridSkeleton count={6} />
          ) : topPosts.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-10 text-center text-gray-500">
              ప్రస్తుతం వార్తలు అందుబాటులో లేవు.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {topPosts.slice(0, 6).map((post) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  categoryLabel={post.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: ALL LATEST REPORTS (CHRONOLOGICAL WITH PAGINATION) */}
      <section id="latest-reports" className="py-10 sm:py-14 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b-2 border-gray-900">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#E50000] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E50000]" />
                తాజా అప్‌డేట్స్
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                ఇటీవలి వార్తలు & కథనాలు
              </h2>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-600">
              పేజీ {page} / {totalPages}
            </span>
          </div>

          {loadingRecent ? (
            <>
              <Loader label="వార్తలు లోడ్ అవుతున్నాయి..." />
              <CardGridSkeleton count={6} />
            </>
          ) : recentPosts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
              ప్రస్తుతం వార్తలు అందుబాటులో లేవు.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {recentPosts.map((post) => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    categoryLabel={post.category?.name}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-between bg-white px-4 sm:px-6 py-3.5 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1));
                      document
                        .getElementById("latest-reports")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    మునుపటి
                  </button>

                  <div className="hidden sm:flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => {
                            setPage(pageNum);
                            document
                              .getElementById("latest-reports")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            page === pageNum
                              ? "bg-[#E50000] text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:border-[#E50000] hover:text-[#E50000]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  <span className="sm:hidden text-xs font-bold text-gray-700">
                    పేజీ {page} / {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage((p) => Math.min(totalPages, p + 1));
                      document
                        .getElementById("latest-reports")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-bold text-gray-700 hover:border-[#E50000] hover:text-[#E50000] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    తదుపరి
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
