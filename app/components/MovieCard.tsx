"use client";

import { useRouter } from "next/navigation";

export default function MovieCard({ movie }: any) {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer hover:scale-105 transition"
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="rounded-lg mb-3"
        alt={movie.title}
      />
      <p className="text-center text-white">{movie.title}</p>
    </div>
  );
}
