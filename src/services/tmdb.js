export const fetchTrailer = async (id, type = "movie") => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=fr-FR`
  );

  const data = await response.json();

  return data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
};
