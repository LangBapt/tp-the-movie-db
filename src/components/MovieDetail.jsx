import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function MovieDetail() {
  const { id } = useParams();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const inWishlist = movie ? wishlist.some((m) => m.id === movie.id) : false;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const [movieRes, castRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`),
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ color: "#fff", textAlign: "center" }}>Chargement...</p>;
  if (!movie) return <p style={{ color: "#fff", textAlign: "center" }}>Film introuvable</p>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#141414", color: "#fff", padding: "1rem" }}>
      <Link to="/" style={{ color: "#E50914", textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}>
        &larr; Retour
      </Link>

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        {movie.poster_path && <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} style={{ width: "250px", borderRadius: "8px", marginBottom: "1rem" }} />}
        <h1 style={{ color: "#E50914", marginBottom: "0.5rem" }}>{movie.title}</h1>
        <p style={{ marginBottom: "0.5rem", textAlign: "justify" }}>{movie.overview}</p>
        <p style={{ marginBottom: "0.5rem" }}>Date de sortie : {movie.release_date}</p>
        <p style={{ marginBottom: "1rem" }}>⭐ {movie.vote_average}</p>

        <button
          onClick={() => toggleWishlist(movie)}
          style={{ marginBottom: "2rem", backgroundColor: "#E50914", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
        >
          {inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;
