"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);          // <-- This removes "Hello, username" instantly
    router.push("/");       // <-- Redirect to HOME page (not login)
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black border-b border-gray-800">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        MovieVerse
      </h1>

      <div className="flex gap-3">
        {!user && (
          <>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => router.push("/auth/register")}
            >
              Register
            </button>
          </>
        )}

        {user && (
          <>
            <span className="text-lg font-semibold">
              Hello, {user.name.split(" ")[0]}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() => router.push("/bookings")}
        >
          My Bookings
        </button>
      </div>
    </nav>
  );
}
