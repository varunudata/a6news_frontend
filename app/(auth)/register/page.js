/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Eye, EyeOff, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logo =
    "https://res.cloudinary.com/dkdidynja/image/upload/v1784568115/a6newsinfra_irdltr.png";
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error("Username and password are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${backend_url}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success(data.message || "Account created successfully");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        toast.error(data.message || "Registration failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error. Try again later");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#E50000] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to A6News
          </Link>
        </div>

        <div className="bg-white py-8 px-6 sm:px-10 border border-gray-200 rounded-xl shadow-xs">
          <div className="flex flex-col items-center mb-7 pb-6 border-b border-gray-100">
            <img
              src={logo}
              alt="A6News Logo"
              className="h-11 w-auto object-contain mb-3"
            />
            <span className="inline-block bg-red-50 text-[#E50000] border border-red-200 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded mb-2">
              Reader & Staff Portal
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center">
              Create your account
            </h1>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Register for an A6News account below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a username"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#E50000] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-[#E50000] rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>

          <p className="mt-6 pt-5 border-t border-gray-100 text-xs text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#E50000] font-bold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
