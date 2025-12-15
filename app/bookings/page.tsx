"use client";

import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.id) {
      setLoading(false);
      return;
    }

    async function fetchBookings() {
      const res = await fetch("/api/bookings", {
        method: "GET",
        headers: {
          "user-id": user.id,
        },
      });

      const data = await res.json();
      setBookings(data.bookings || []);
      setLoading(false);
    }

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-white p-20 text-center text-xl">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📑 My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-5 bg-[#111] rounded-xl border border-gray-700"
            >
              <p><strong>Movie:</strong> {b.movieName}</p>
              <p><strong>Theater:</strong> {b.theater}</p>
              <p><strong>Seats:</strong> {b.seats}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>

              <a
  href={`/api/ticket/${b.id}`}
  className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded text-white font-semibold"
>
  Download Ticket
</a>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
