import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import styles from "../styles/MovieDetail.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function MovieDetail() {
  const { id } = useParams();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const inWishlist = movie ? wishlist.some(m => m.id === movie.id) : false;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const [movieRes, castRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`)
        ]);
        const movieData = await movieRes.json();
        const castData = await castRes.json();
        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", color: "#fff" }}>Chargement...</p>;
  if (!movie) return <p style={{ textAlign: "center", color: "#fff" }}>Film introuvable</p>;

  return (
    <div className={styles.container}>

      {movie.poster_path && <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className={styles.poster} />}
      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.overview}>{movie.overview}</p>
      <p className={styles.info}>Date de sortie : {movie.release_date}</p>
      <p className={styles.info}>⭐ {movie.vote_average}</p>

      <button onClick={() => toggleWishlist(movie)} className={styles.buttonWishlist}>
        {inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
      </button>

      <h2 style={{ color: "#E50914", marginBottom: "1rem" }}>Acteurs principaux</h2>
      <div className={styles.castGrid}>
        {cast.map(actor => (
          <div key={actor.cast_id} className={styles.castCard}>
            {actor.profile_path ? <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} /> :
              <div style={{ width: "100%", height: "300px", backgroundColor: "#333", borderRadius: "8px" }} />}
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
