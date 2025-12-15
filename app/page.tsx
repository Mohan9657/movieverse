"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadMovies() {
      const res = await fetch("/api/tmdb");
      const data = await res.json();
      setMovies(data.results || []);
    }
    loadMovies();
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Trending Movies 🎬</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => router.push(`/movies/${movie.id}`)}
          >
            <img
              className="rounded shadow-md"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
