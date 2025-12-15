"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [theater, setTheater] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Load movie name from TMDB
  useEffect(() => {
    const loadMovie = async () => {
      const res = await axios.get(`/api/tmdb/details?id=${id}`);
      setMovie(res.data);
    };
    loadMovie();
  }, [id]);

  const theaters = ["PVR Cinemas", "Inox", "Miraj Cinemas", "Cinepolis"];

  const dates = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const times = ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"];

  const seatsList = Array.from({ length: 50 }, (_, i) => `S${i + 1}`);

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const goToPayment = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.id) {
      alert("Please login to book tickets");
      router.push("/auth/login");
      return;
    }

    if (!theater || !date || !time || selectedSeats.length === 0) {
      alert("Please select all options");
      return;
    }

    // Save booking details temporarily
    const details = {
      movieName: movie.title,
      seats: selectedSeats,
      theater,
      date,
      time,
      amount: selectedSeats.length * 150, // ₹150 each
      movieId: id,
      userId: user.id
    };

    localStorage.setItem("pendingPayment", JSON.stringify(details));

    router.push("/payment");
  };

  if (!movie)
    return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

      {/* THEATER */}
      <h2 className="text-xl mb-2">Select Theater</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {theaters.map((t) => (
          <button
            key={t}
            onClick={() => setTheater(t)}
            className={`p-3 rounded ${
              theater === t ? "bg-red-600" : "bg-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* DATE */}
      <h2 className="text-xl mb-2">Select Date</h2>
      <div className="flex gap-3 overflow-x-auto mb-6">
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => setDate(d)}
            className={`p-3 rounded min-w-[120px] ${
              date === d ? "bg-red-600" : "bg-gray-800"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* TIME */}
      <h2 className="text-xl mb-2">Select Time</h2>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => setTime(t)}
            className={`p-3 rounded ${
              time === t ? "bg-red-600" : "bg-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* SEATS */}
      <h2 className="text-xl mb-2">Select Seats</h2>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-10">
        {seatsList.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            className={`p-2 rounded ${
              selectedSeats.includes(seat)
                ? "bg-green-600"
                : "bg-gray-700"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <button
        onClick={goToPayment}
        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-xl font-bold"
      >
        Confirm Booking & Continue to Payment
      </button>
    </div>
  );
}
