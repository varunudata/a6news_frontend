"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Save, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "../../../utils/auth";
import Loader from "../../components/shared/Loader";

export default function TickerPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/ticker`);
        const data = await res.json();
        if (data.success && data.data) {
          setText(data.data.text);
          setOriginalText(data.data.text);
        }
      } catch (error) {
        console.error("Failed to load ticker:", error);
        toast.error("Failed to load news ticker text");
      } finally {
        setLoading(false);
      }
    };
    if (backendUrl) {
      fetchTicker();
    } else {
      setLoading(false);
    }
  }, [backendUrl]);

  const handleSave = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast.error("Ticker text cannot be empty");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${backendUrl}/api/ticker`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("News ticker updated successfully!");
        setOriginalText(trimmed);
      } else {
        toast.error(data.message || "Failed to update news ticker");
      }
    } catch (error) {
      console.error("Error saving ticker:", error);
      toast.error("Server error while updating ticker");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setText(originalText);
    toast.info("Changes reset to original text");
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader label="Loading news ticker configuration..." size="lg" />
      </div>
    );
  }

  const previewItems = text
    ? text
        .split(/[•\n]+/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="mb-6 pb-5 border-b border-gray-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E50000]">
          Live Breaking Bar
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
          Latest News Ticker
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Update the scrolling announcement headlines shown in the top header of A6News.
        </p>
      </div>

      {/* Live Preview Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Live Header Preview
        </h2>

        <div className="flex items-center gap-3 w-full bg-red-50/70 rounded-lg px-3.5 py-2.5 overflow-hidden border border-red-100 select-none">
          <span className="inline-flex items-center gap-1.5 bg-[#E50000] text-white text-xs font-bold tracking-wide px-2.5 py-1 rounded shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            తాజా వార్తలు
          </span>

          <div className="flex-1 min-w-0 overflow-hidden">
            {previewItems.length > 0 ? (
              <div className="ticker-marquee text-[#E50000] font-semibold text-xs sm:text-sm">
                {previewItems.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center">
                    <span>{item}</span>
                    {idx < previewItems.length - 1 && (
                      <span className="mx-6 text-red-400 font-bold">•</span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs sm:text-sm text-red-400">
                Enter ticker headlines below to see live preview...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-extrabold text-gray-900 mb-4">
          Edit Ticker Headlines
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="ticker-text"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5"
            >
              Headlines Content
            </label>
            <textarea
              id="ticker-text"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter each headline on a new line or separate with bullet points (•)..."
              className="w-full border border-gray-300 rounded-lg p-3.5 focus:outline-none focus:border-[#E50000] transition-colors text-sm leading-relaxed"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Tip: Place each breaking news item on a new line or separate with{" "}
              <span className="font-bold text-[#E50000]">•</span> bullets.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || text.trim() === ""}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E50000] hover:bg-red-700 text-white rounded-lg font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={saving || text === originalText}
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-bold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
