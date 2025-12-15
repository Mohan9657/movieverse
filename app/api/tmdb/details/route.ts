import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "TMDB key missing" }, { status: 500 });
    }

    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`
    );

    return NextResponse.json(res.data);

  } catch (error) {
    console.error("MOVIE DETAILS ERROR:", error);
    return NextResponse.json({ error: "Failed to load movie details" }, { status: 500 });
  }
}
