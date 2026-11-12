/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Newspaper,
  PlayCircle,
  Share2,
  Tag,
  X,
} from "lucide-react";
import Loader, { ArticleSkeleton } from "../../../components/shared/Loader";

const getEmbedUrl = (url) => {
  if (!url) return null;
  const videoIdMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\n/]+)/
  );
  return videoIdMatch && videoIdMatch[1]
    ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
    : null;
};

function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function SinglePostPage() {
  const params = useParams();
  const slug = params?.slug;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    if (!slug || slug === "undefined" || slug === "null") return;

    const fetchRelated = async (catId, currentPostId) => {
      try {
        const res = await fetch(`${backendUrl}/api/categories/${catId}`);
        const data = await res.json();
        if (data.success && data.data?.posts) {
          const latestThree = data.data.posts
            .filter((p) => p.slug !== slug && p.id !== currentPostId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          setRelated(latestThree);
        }
      } catch (err) {
        console.error("Error fetching related posts:", err);
      }
    };

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/posts/${slug}`);
        const data = await res.json();

        if (data.success && data.data) {
          setPost(data.data);
          fetchRelated(data.data.categoryId, data.data.id);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, backendUrl]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Loader label="కథనం లోడ్ అవుతోంది..." />
        <ArticleSkeleton />
      </>
    );
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-xl p-10">
          <Newspaper className="w-10 h-10 text-gray-400 mx-auto mb-3 stroke-[1.5]" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">ఈ కథనం అందుబాటులో లేదు</h1>
          <p className="text-sm text-gray-600 mb-6">
            మీరు వెతుకుతున్న వార్త తొలగించబడి ఉండవచ్చు లేదా మార్చబడి ఉండవచ్చు.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#E50000] hover:bg-red-700 text-white text-xs font-bold tracking-wider px-5 py-2.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            హోమ్ పేజీకి వెళ్ళండి
          </Link>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(post.youtubeLink);
  const galleryImages = Array.isArray(post.gallery)
    ? post.gallery
        .map((g) => (typeof g === "string" ? g.trim() : ""))
        .filter(Boolean)
    : [];

  let paragraphs = post.content
    ? post.content
        .split(/\n+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : [];

  // If the post was entered as a single block of text and has gallery images,
  // split it into natural sentence groups so photos still appear between paragraphs while reading.
  if (paragraphs.length === 1 && galleryImages.length > 0) {
    const sentences = paragraphs[0]
      .split(/(?<=[.!?।])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (sentences.length >= 2) {
      const targetGroups = Math.min(sentences.length, galleryImages.length + 1);
      const groupSize = Math.ceil(sentences.length / targetGroups);
      const grouped = [];
      for (let i = 0; i < sentences.length; i += groupSize) {
        grouped.push(sentences.slice(i, i + groupSize).join(" "));
      }
      if (grouped.length >= 2) {
        paragraphs = grouped;
      }
    }
  }

  // Distribute gallery images between paragraphs while reading the post
  const imagesAfterParagraph = {};
  if (galleryImages.length > 0 && paragraphs.length > 0) {
    const P = paragraphs.length;
    const G = galleryImages.length;
    galleryImages.forEach((imgUrl, idx) => {
      let targetParaIdx;
      if (P === 1) {
        targetParaIdx = 0;
      } else if (G < P) {
        const internalBreaks = P - 1;
        const pos = Math.floor(((idx + 1) * P) / (G + 1)) - 1;
        targetParaIdx = Math.min(internalBreaks - 1, Math.max(0, pos));
      } else {
        targetParaIdx = Math.min(P - 1, Math.floor((idx * P) / G));
      }
      if (!imagesAfterParagraph[targetParaIdx]) {
        imagesAfterParagraph[targetParaIdx] = [];
      }
      imagesAfterParagraph[targetParaIdx].push({ url: imgUrl, index: idx });
    });
  }

  const validTags = Array.isArray(post.tags)
    ? post.tags.map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Article Container */}
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-5"
        >
          <Link
            href="/"
            className="hover:text-[#E50000] font-medium transition-colors"
          >
            హోమ్
          </Link>
          <span>/</span>
          {post.category && (
            <>
              <Link
                href={`/category/${post.category.id}`}
                className="hover:text-[#E50000] font-semibold uppercase text-gray-700 transition-colors"
              >
                {post.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-400 truncate max-w-[220px] sm:max-w-xs">
            {post.title}
          </span>
        </nav>

        {/* Meta Bar: Category, Date & Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {post.category && (
              <Link
                href={`/category/${post.category.id}`}
                className="px-3 py-1 bg-[#E50000] hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {post.category.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500">
              <Calendar className="w-4 h-4 text-[#E50000]" />
              {formatDate(post.createdAt)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-[#E50000] rounded-lg text-xs font-bold text-gray-700 hover:text-[#E50000] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700">లింక్ కాపీ అయింది</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>షేర్ చేయండి</span>
              </>
            )}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && post.subtitle.trim() !== "" && (
          <p className="text-base sm:text-lg text-gray-700 font-medium mt-4 border-l-4 border-[#E50000] pl-4 py-1.5 bg-gray-50 rounded-r-lg">
            {post.subtitle}
          </p>
        )}

        {/* Uncropped Main Thumbnail */}
        {post.thumbnail && (
          <figure className="my-6 sm:my-8 rounded-xl overflow-hidden border border-gray-200 bg-neutral-100">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto max-h-[580px] object-contain mx-auto block"
            />
          </figure>
        )}

        {/* Article Body Paragraphs with Inline Interleaved Photos */}
        <div className="mt-6 text-base sm:text-[17px] leading-[1.9] text-gray-800 space-y-5">
          {paragraphs.map((para, i) => {
            const inlineImgs = imagesAfterParagraph[i] || [];
            return (
              <div key={i} className="space-y-5">
                <p className="text-gray-800">{para}</p>

                {inlineImgs.length === 1 && (
                  <figure
                    onClick={() => setLightboxImg(inlineImgs[0].url)}
                    className="max-w-md sm:max-w-lg mx-auto my-5 rounded-xl overflow-hidden border border-gray-200 hover:border-[#E50000] bg-neutral-50 cursor-pointer transition-colors shadow-2xs"
                  >
                    <img
                      src={inlineImgs[0].url}
                      alt={`${post.title} - ${inlineImgs[0].index + 1}`}
                      loading="lazy"
                      className="w-full h-auto max-h-[230px] sm:max-h-[270px] object-contain mx-auto block"
                    />
                  </figure>
                )}

                {inlineImgs.length > 1 && (
                  <div className="max-w-2xl mx-auto my-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {inlineImgs.map((imgItem) => (
                      <figure
                        key={`inline-photo-${imgItem.index}`}
                        onClick={() => setLightboxImg(imgItem.url)}
                        className="rounded-xl overflow-hidden border border-gray-200 hover:border-[#E50000] bg-neutral-50 cursor-pointer transition-colors shadow-2xs flex items-center justify-center"
                      >
                        <img
                          src={imgItem.url}
                          alt={`${post.title} - ${imgItem.index + 1}`}
                          loading="lazy"
                          className="w-full h-auto max-h-[200px] sm:max-h-[220px] object-contain mx-auto block"
                        />
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {paragraphs.length === 0 &&
            galleryImages.map((imgUrl, idx) => (
              <figure
                key={`inline-photo-${idx}`}
                onClick={() => setLightboxImg(imgUrl)}
                className="max-w-md sm:max-w-lg mx-auto my-5 rounded-xl overflow-hidden border border-gray-200 hover:border-[#E50000] bg-neutral-50 cursor-pointer transition-colors shadow-2xs"
              >
                <img
                  src={imgUrl}
                  alt={`${post.title} - ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto max-h-[230px] sm:max-h-[270px] object-contain mx-auto block"
                />
              </figure>
            ))}
        </div>

        {/* YouTube Video Embed */}
        {embedUrl && (
          <div className="mt-10 rounded-xl overflow-hidden border border-gray-200 bg-white">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-[#E50000]" />
              <h2 className="text-sm font-bold tracking-wider text-gray-900">
                వీడియో రిపోర్ట్
              </h2>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Article Tags */}
        {validTags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-gray-500 mr-1">
              <Tag className="w-3.5 h-3.5 text-[#E50000]" />
              టాపిక్స్:
            </span>
            {validTags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Posts Section */}
      <section className="mt-14 pt-10 border-t-2 border-gray-900">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#E50000] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E50000]" />
              ఇదే విభాగం నుండి మరిన్ని
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              సంబంధిత వార్తలు
            </h2>
          </div>
          {post.category && (
            <Link
              href={`/category/${post.category.id}`}
              className="text-xs sm:text-sm font-bold text-[#E50000] hover:underline inline-flex items-center gap-1"
            >
              <span>అన్నీ చూడండి</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {related.length === 0 ? (
          <p className="text-sm text-gray-500 py-6">
            ఈ విభాగంలో సంబంధిత వార్తలు అందుబాటులో లేవు.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/posts/${r.slug}`}
                className="group bg-white rounded-xl border border-gray-200 hover:border-[#E50000] transition-colors overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-[16/9] bg-neutral-100 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                  {r.thumbnail ? (
                    <img
                      src={r.thumbnail}
                      alt={r.title}
                      loading="lazy"
                      className="w-full h-full object-contain block"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#E50000] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {r.subtitle ||
                      (r.content?.length > 100
                        ? r.content.slice(0, 100) + "..."
                        : r.content)}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-[#E50000] text-xs font-bold tracking-wide mt-4">
                    <span>పూర్తి కథనం చదవండి</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal for Gallery Images (Solid Overlay - No Glassmorphism) */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden border border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Image Preview
              </span>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#E50000] hover:text-white text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-neutral-950 p-2 flex items-center justify-center max-h-[80vh]">
              <img
                src={lightboxImg}
                alt="Enlarged project view"
                className="max-h-[76vh] w-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
