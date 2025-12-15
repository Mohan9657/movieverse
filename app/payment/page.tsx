"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PaymentPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [card, setCard] = useState("");

  useEffect(() => {
    const paymentData = localStorage.getItem("pendingPayment");
    if (paymentData) {
      setData(JSON.parse(paymentData));
    } else {
      router.push("/");
    }
  }, []);

  const handlePayment = async () => {
    if (card.length < 10) {
      alert("Enter a valid card number");
      return;
    }

    // Fake loading simulation
    await new Promise((res) => setTimeout(res, 1000));

    try {
      // SAVE BOOKING IN DATABASE
      const res = await axios.post("/api/bookings", {
        userId: data.userId,
        movieId: data.movieId,
        movieName: data.movieName,
        theater: data.theater,
        date: data.date,
        time: data.time,
        seats: data.seats.join(", "),
      });

      // Clear temporary payment data
      localStorage.removeItem("pendingPayment");

      // Store lastBooking details to show on success page
      localStorage.setItem("lastBooking", JSON.stringify(res.data.booking));

      router.push("/booking-success");
    } catch (error) {
      console.log(error);
      alert("Payment Failed! Try again.");
    }
  };

  if (!data) {
    return <div className="text-white p-10">Loading payment...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="bg-[#111] p-8 rounded-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold mb-4">💳 Payment</h1>

        <p className="mb-2"><strong>Movie:</strong> {data.movieName}</p>
        <p className="mb-2"><strong>Seats:</strong> {data.seats.join(", ")}</p>
        <p className="mb-2"><strong>Theater:</strong> {data.theater}</p>
        <p className="mb-2">
          <strong>Date & Time:</strong> {data.date} - {data.time}
        </p>

        <p className="mt-4 text-xl font-semibold text-green-400">
          Total Amount: ₹{data.amount}
        </p>

        <input
          type="text"
          placeholder="Enter Card Number"
          className="w-full p-3 mt-6 mb-4 bg-gray-800 rounded"
          value={card}
          onChange={(e) => setCard(e.target.value)}
        />

        <button
          onClick={handlePayment}
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded text-white font-bold"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
