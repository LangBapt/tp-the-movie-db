import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=fr-FR`
        );

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erreur lors du chargement des films :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [category]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Chargement des films...</p>;
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Netflux</h1>

      {/* Boutons de catégorie centrés avec espace */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <button onClick={() => setCategory("now_playing")}>Now Playing</button>
        <button onClick={() => setCategory("popular")}>Popular</button>
        <button onClick={() => setCategory("top_rated")}>Top Rated</button>
        <button onClick={() => setCategory("upcoming")}>Upcoming</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "50%",
            maxWidth: "400px",
            minWidth: "200px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path && (
              <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            )}
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <button disabled>Voir les détails</button>
          </div>
        ))}
      </div>

      <style>{`
        .movie-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(4, 1fr);
        }

        .movie-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
        }

        .movie-card img {
          width: 100%;
          border-radius: 4px;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .movie-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .movie-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .movie-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default MovieList;
