"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, User } from "lucide-react";
import Loader from "../../components/shared/Loader";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/api/auth/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data);
        }
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (backendUrl) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [backendUrl]);

  return (
    <div className="max-w-4xl">
      <div className="mb-6 pb-5 border-b border-gray-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E50000]">
          Access Control
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
          Registered Users ({users.length})
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <Loader label="Loading user accounts..." />
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No registered users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    ID
                  </th>
                  <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Username
                  </th>
                  <th className="py-3.5 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 text-xs font-bold text-gray-500">
                      #{u.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#E50000]">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {u.username}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 bg-[#E50000] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-700 border border-gray-200 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                          {u.role}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
