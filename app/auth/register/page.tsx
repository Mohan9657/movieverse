"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      router.push("/auth/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#121212] p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Register
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            className="p-3 bg-gray-800 text-white rounded"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="p-3 bg-gray-800 text-white rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="p-3 bg-gray-800 text-white rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
