"use client";

export default function MovieDetails({ movie }: any) {
  const trailer =
    movie.videos?.results?.find((v: any) => v.type === "Trailer")?.key;

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">

      {/* Poster Smaller + Centered */}
      <img
        src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
        className="w-full max-w-md mx-auto rounded-lg mb-6 shadow-lg"
        alt={movie.title}
      />

      <h1 className="text-4xl font-bold mb-3 text-center">{movie.title}</h1>

      <p className="text-yellow-400 mb-2 text-center">
        ⭐ Rating: {movie.vote_average}
      </p>

      <p className="text-gray-300 mb-6 text-center">
        📅 Release Date: {movie.release_date}
      </p>

      <p className="text-lg text-gray-200 mb-6">{movie.overview}</p>

      {/* Cast */}
      <h2 className="text-2xl font-semibold mb-2">Cast</h2>
      <div className="flex gap-4 overflow-x-auto mb-6 pb-2">
        {movie.credits?.cast?.slice(0, 10).map((c: any) => (
          <div key={c.cast_id} className="text-center">
            <img
              src={
                c.profile_path
                  ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                  : "/no-image.png"
              }
              className="w-24 h-24 rounded-full mb-2 object-cover"
            />
            <p className="text-sm">{c.name}</p>
          </div>
        ))}
      </div>

      {/* Trailer */}
      {trailer && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Trailer</h2>
          <iframe
            width="100%"
            height="350"
            src={`https://www.youtube.com/embed/${trailer}`}
            className="rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={() => (window.location.href = `/book/${movie.id}`)}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-xl font-semibold"
      >
        🎟️ Book Ticket
      </button>
    </div>
  );
}
