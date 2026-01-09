import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import styles from "../styles/MovieDetail.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const IMAGE_SIMILAR = "https://image.tmdb.org/t/p/w200";

function MovieDetail() {
  const { id } = useParams();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  const inWishlist = movie ? wishlist.some(m => m.id === movie.id) : false;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);

        const [movieRes, castRes, videosRes, similarRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`)
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const videosData = await videosRes.json();
        const similarData = await similarRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
        setSimilarMovies(similarData.results || []);

        const trailer = videosData.results.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        ) || videosData.results.find(v => v.site === "YouTube");
        setTrailerKey(trailer?.key || null);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  };

  if (loading) return <p style={{ textAlign: "center", color: "#fff" }}>Chargement...</p>;
  if (!movie) return <p style={{ textAlign: "center", color: "#fff" }}>Film introuvable</p>;

  return (
    <div className={styles.container}>

      {movie.poster_path && (
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className={styles.poster} />
      )}

      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.overview}>{movie.overview}</p>
      <p className={styles.info}>Date de sortie : {formatDate(movie.release_date)}</p>
      <p className={styles.info}>⭐ {movie.vote_average}</p>

      {trailerKey && (
        <div className={styles.trailerSection}>
          <button
            className={styles.trailerButton}
            onClick={() => setShowTrailer(prev => !prev)}
          >
            {showTrailer ? "Masquer la bande-annonce" : "Voir la bande-annonce"}
          </button>
        </div>
      )}

      {showTrailer && trailerKey && (
        <div className={styles.trailerWrapper}>
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <button
        onClick={() => toggleWishlist(movie)}
        className={styles.buttonWishlist}
      >
        {inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
      </button>

      <h2 className={styles.subtitle}>Acteurs principaux</h2>
      <div className={styles.castGrid}>
        {cast.map(actor => (
          <div key={actor.cast_id} className={styles.castCard}>
            {actor.profile_path ? (
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            ) : (
              <div className={styles.placeholder}></div>
            )}
            <p>{actor.name}</p>
          </div>
        ))}
      </div>

      {similarMovies.length > 0 && (
        <>
          <h2 className={styles.subtitle}>Films similaires</h2>
          <div className={styles.similarGrid}>
            {similarMovies.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className={styles.similarCard}>
                {movie.poster_path ? (
                  <img src={`${IMAGE_SIMILAR}${movie.poster_path}`} alt={movie.title} />
                ) : (
                  <div className={styles.placeholder}></div>
                )}
                <p>{movie.title}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
