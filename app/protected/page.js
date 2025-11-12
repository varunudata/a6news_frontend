"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProtectedPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must log in first");
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${backend_url}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message);
        } else {
          toast.error(data.message || "Failed to fetch protected data");
        }
      } catch (error) {
        console.error("Error fetching protected data:", error);
        toast.error("Server error while fetching data");
      }
    };

    fetchData();
  }, [backend_url, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <ToastContainer position="top-center" />
      <h1 className="text-xl font-bold mb-4">{message || "Loading..."}</h1>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
