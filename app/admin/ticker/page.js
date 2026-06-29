"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Save, RefreshCw } from "lucide-react";

export default function TickerPage() {
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
    fetchTicker();
  }, [backendUrl]);

  const handleSave = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast.error("Ticker text cannot be empty");
      return;
    }
    setSaving(true);
    const token = localStorage.getItem("token");
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
      <div className="flex justify-center items-center h-[50vh] text-lg font-medium text-gray-500">
        <RefreshCw className="animate-spin mr-2" size={20} />
        Loading news ticker configuration...
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <ToastContainer />
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Latest News Ticker</h1>
        <p className="text-gray-500 mt-1">
          Update the scrolling announcement text shown on the homepage of your website.
        </p>
      </div>

      {/* Live Preview Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Live Preview</h2>
        
        <div className="flex items-center w-full bg-[#FFEBEB] rounded-md overflow-hidden relative border border-red-100 select-none">
          {/* Latest Badge */}
          <div className="relative flex items-center bg-[#E50000] px-5 py-2.5 z-10 shrink-0">
            <span className="text-white font-bold tracking-wider uppercase text-xs">Latest</span>
            <div className="absolute -right-3 top-0 bottom-0 w-6 bg-[#E50000] -skew-x-12 translate-x-1/2 z-10"></div>
          </div>

          {/* Ticker Content */}
          <div className="relative flex-1 h-full overflow-hidden flex items-center pl-6">
            <div className="animate-marquee whitespace-nowrap text-[#E50000] font-medium text-xs sm:text-sm py-2.5">
              {text || "Enter ticker text below to see live preview..."}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Ticker Text</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="ticker-text" className="block text-sm font-medium text-gray-700 mb-1">
              Ticker Content
            </label>
            <textarea
              id="ticker-text"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Breaking: New Tech Regulations Announced • AI is reshaping content creation • Stock markets open higher today..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-sans text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use bullet points (•) or dashes to separate multiple headlines.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || text.trim() === ""}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              disabled={saving || text === originalText}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
