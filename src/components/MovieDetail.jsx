import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Chargement...</p>;
  }

  if (!movie) {
    return <p style={{ color: "#fff", textAlign: "center" }}>Film introuvable</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#141414",
        color: "#fff",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#E50914",
          textDecoration: "none",
          fontFamily: "Netflix Sans, Arial, sans-serif",
          marginBottom: "1rem",
          display: "inline-block"
        }}
      >
        &larr; Retour
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {movie.poster_path && (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}

        <h1
          style={{
            color: "#E50914",
            textAlign: "center",
            fontFamily: "Netflix Sans, Arial, sans-serif",
            marginBottom: "1rem",
          }}
        >
          {movie.title}
        </h1>

        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>{movie.overview}</p>
        <p style={{ marginBottom: "0.5rem", textAlign: "center" }}>
          Date de sortie : {movie.release_date}
        </p>
        <p style={{ marginBottom: "1rem", textAlign: "center" }}>⭐ {movie.vote_average}</p>

        <button
          style={{
            marginBottom: "2rem",
            backgroundColor: "#E50914",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "Netflix Sans, Arial, sans-serif",
          }}
        >
          Ajouter / Retirer de la wishlist
        </button>

        <h2
          style={{
            color: "#E50914",
            textAlign: "center",
            fontFamily: "Netflix Sans, Arial, sans-serif",
            marginBottom: "1rem",
          }}
        >
          Acteurs principaux
        </h2>

        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.cast_id} className="cast-card">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "#333",
                    borderRadius: "8px",
                  }}
                />
              )}
              <p style={{ marginTop: "0.5rem", textAlign: "center" }}>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cast-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(5, 1fr);
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cast-card {
          border: 1px solid #333;
          border-radius: 8px;
          padding: 0.5rem;
          background-color: #181818;
          text-align: center;
        }

        .cast-card img {
          width: 100%;
          border-radius: 4px;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .cast-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cast-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .cast-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default MovieDetail;
