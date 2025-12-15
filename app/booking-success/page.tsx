"use client";

import { useEffect, useState } from "react";

export default function BookingSuccess() {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const b = localStorage.getItem("lastBooking");
    if (b) {
      setBooking(JSON.parse(b));
    }
  }, []);

  if (!booking) {
    return <div className="text-white p-10">Loading...</div>;
  }

  // Seats in DB are stored as: "S1, S2, S3"
  const seatsArray = booking.seats.includes(",")
    ? booking.seats.split(",").map((s: string) => s.trim())
    : [booking.seats];

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white p-6">
      <div className="bg-[#111] p-8 rounded-xl w-full max-w-lg border border-gray-700">
        
        <h1 className="text-3xl font-bold mb-5 text-green-400">
          🎉 Booking Successful!
        </h1>

        <p className="text-lg mb-2">
          <strong>Movie:</strong> {booking.movieName}
        </p>

        <p className="text-lg mb-2">
          <strong>Seats:</strong> {seatsArray.join(", ")}
        </p>

        <p className="text-lg mb-2">
          <strong>Total Seats:</strong> {seatsArray.length}
        </p>

        <p className="text-lg mb-2">
          <strong>Theater:</strong> {booking.theater}
        </p>

        <p className="text-lg mb-5">
          <strong>Date & Time:</strong> {booking.date} - {booking.time}
        </p>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold mt-4"
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
