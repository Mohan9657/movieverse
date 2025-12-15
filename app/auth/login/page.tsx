"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });

      alert("Login successful!");

      // Save token
      localStorage.setItem("token", res.data.token);
      Cookies.set("token", res.data.token);

      // Save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#121212] p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="p-3 bg-gray-800 text-white rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="p-3 bg-gray-800 text-white rounded"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-600 text-white p-3 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
