import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import styles from "../styles/MovieDetail.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function formatDate(dateString) {
  if (!dateString) return "Date inconnue";

  const date = new Date(dateString);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function MovieDetail() {
  const { id } = useParams();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const inWishlist = movie ? wishlist.some((m) => m.id === movie.id) : false;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);

        const [movieRes, castRes, similarRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`)
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
        setSimilarMovies(similarData.results.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading)
    return <p className={styles.loading}>Chargement...</p>;

  if (!movie)
    return <p className={styles.loading}>Film introuvable</p>;

  return (
    <div className={styles.container}>
      {movie.poster_path && (
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      )}

      <h1 className={styles.title}>{movie.title}</h1>

      <p className={styles.overview}>{movie.overview}</p>

      <p className={styles.info}>
        Date de sortie : {formatDate(movie.release_date)}
      </p>

      <p className={styles.info}>⭐ {movie.vote_average}</p>

      <button
        onClick={() => toggleWishlist(movie)}
        className={styles.buttonWishlist}
      >
        {inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
      </button>

      {/* ACTEURS */}
      <h2 className={styles.sectionTitle}>Acteurs principaux</h2>

      <div className={styles.castGrid}>
        {cast.map((actor) => (
          <div key={actor.cast_id} className={styles.castCard}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <div className={styles.placeholder}></div>
            )}
            <p>{actor.name}</p>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Films similaires</h2>

      <div className={styles.similarGrid}>
        {similarMovies.map((movie) => (
          <div key={movie.id} className={styles.similarCard}>
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className={styles.placeholder}></div>
            )}

            <h3>{movie.title}</h3>

            <Link to={`/movie/${movie.id}`}>
              <button className={styles.similarButton}>
                Voir les détails
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
