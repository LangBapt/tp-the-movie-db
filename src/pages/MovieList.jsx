import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/MovieList.module.css";

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

  if (loading) return <p style={{ color: "#fff", textAlign: "center" }}>Chargement des films...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Netflux</h1>

      <div className={styles.categoryButtons}>
        {["now_playing", "popular", "top_rated", "upcoming"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={styles.categoryButton}
          >
            {cat.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.inputSearch}
      />

      <div className={styles.movieGrid}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
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
    </div>
  );
}

export default MovieList;
