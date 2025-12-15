"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR error

    const userData = localStorage.getItem("user");

    if (!userData) {
      router.push("/auth/login");
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-xl">Loading profile...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-[#111] p-10 rounded-xl w-full max-w-md border border-gray-700">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-5">👤 My Profile</h1>

        {/* User Details */}
        <p className="text-lg mb-3">
          <span className="font-semibold">Name:</span> {user.name}
        </p>

        <p className="text-lg mb-3">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <p className="text-lg mb-3">
          <span className="font-semibold">User ID:</span> {user.id}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold"
          >
            ⬅ Back to Dashboard
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/auth/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
