"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import MovieDetails from "@/app/components/MovieDetails";

export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      const res = await axios.get(`/api/tmdb/details?id=${id}`);
      setMovie(res.data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-white text-center mt-20 text-xl">
        Loading movie...
      </div>
    );
  }

  return <MovieDetails movie={movie} />;
}


