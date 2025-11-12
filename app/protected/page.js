"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function protectedPage() {
  const [message, setMessage] = useState("");
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must Login in first");
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
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(`Error fetching protected data`);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">{message || "Loading ..."}</h1>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
