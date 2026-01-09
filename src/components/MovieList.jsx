import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        console.error(error);
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
    return <p style={{ color: "#fff", textAlign: "center" }}>Chargement des films...</p>;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#141414", color: "#fff", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#E50914", fontFamily: 'Netflix Sans, Arial, sans-serif' }}>
        Netflux
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {["now_playing", "popular", "top_rated", "upcoming"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              backgroundColor: "#E50914",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: 'Netflix Sans, Arial, sans-serif'
            }}
          >
            {cat.replace("_", " ").toUpperCase()}
          </button>
        ))}
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
            fontFamily: 'Netflix Sans, Arial, sans-serif'
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
            <Link to={`/movie/${movie.id}`}>
              <button>Voir les détails</button>
            </Link>
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
          border: 1px solid #333;
          border-radius: 8px;
          padding: 1rem;
          background-color: #181818;
          text-align: center;
        }

        .movie-card img {
          width: 100%;
          border-radius: 4px;
          object-fit: cover;
        }

        .movie-card button {
          margin-top: 0.5rem;
          background-color: #E50914;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Netflix Sans, Arial, sans-serif';
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
