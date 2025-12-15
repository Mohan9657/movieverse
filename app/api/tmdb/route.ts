import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "TMDB_API_KEY is missing!" },
        { status: 500 }
      );
    }

    const url = req.url;

    // ----------------------------------------------------
    // ✅ 1. FETCH SINGLE MOVIE DETAILS
    // ----------------------------------------------------
    if (url.includes("?id=")) {
      const movieId = url.split("id=")[1];

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );

      return NextResponse.json({ movie: response.data });
    }

    // ----------------------------------------------------
    // ✅ 2. FETCH POPULAR MOVIES (DEFAULT)
    // ----------------------------------------------------
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("TMDB API Error:", error);
    return NextResponse.json(
      { error: "Failed to load data from TMDB" },
      { status: 500 }
    );
  }
}
