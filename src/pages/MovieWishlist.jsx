import { useState, useContext, useEffect } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import styles from "../styles/MovieList.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredWishlist = wishlist.filter(movie =>
    movie.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (wishlist.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Ma Wishlist</h1>
        <p style={{ textAlign: "center" }}>Votre wishlist est vide.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ma Wishlist ({wishlist.length})</h1>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.inputSearch}
      />

      <div className={styles.movieGrid}>
        {filteredWishlist.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#fff",
              gridColumn: "1 / -1",
            }}
          >
            Aucun film ne correspond à votre recherche.
          </p>
        ) : (
          filteredWishlist.map(movie => (
            <div key={movie.id} className={styles.movieCard}>
              {movie.poster_path && (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              )}

              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Link to={`/movie/${movie.id}`}>
                  <button>Voir les détails</button>
                </Link>

                <button onClick={() => toggleWishlist(movie)}>
                  Supprimer de la wishlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
