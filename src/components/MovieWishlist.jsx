import { useState, useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function Wishlist() {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const [search, setSearch] = useState("");

    const filteredWishlist = wishlist.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#141414", color: "#fff", padding: "1rem" }}>
            <h1 style={{ textAlign: "center", color: "#E50914", fontFamily: "Netflix Sans, Arial, sans-serif", marginBottom: "1.5rem" }}>
                Ma Wishlist ({wishlist.length})
            </h1>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "0.5rem", width: "50%", maxWidth: "400px", minWidth: "200px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "Netflix Sans, Arial, sans-serif" }}
                />
            </div>

            <div className="wishlist-grid">
                {filteredWishlist.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#fff" }}>Aucun film dans la wishlist.</p>
                ) : (
                    filteredWishlist.map((movie) => (
                        <div key={movie.id} className="wishlist-card">
                            {movie.poster_path ? <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} /> : <div style={{ width: "100%", height: "300px", backgroundColor: "#333", borderRadius: "8px" }} />}
                            <h3 style={{ marginTop: "0.5rem", textAlign: "center" }}>
                                <Link to={`/movie/${movie.id}`} style={{ color: "#fff", textDecoration: "none" }}>
                                    {movie.title}
                                </Link>
                            </h3>
                            <button
                                onClick={() => toggleWishlist(movie)}
                                style={{ marginTop: "0.5rem", backgroundColor: "#E50914", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", fontFamily: "Netflix Sans, Arial, sans-serif" }}
                            >
                                Supprimer
                            </button>
                        </div>
                    ))
                )}
            </div>

            <style>{`
        .wishlist-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1200px;
          margin: 0 auto;
        }
        .wishlist-card {
          border: 1px solid #333;
          border-radius: 8px;
          padding: 0.5rem;
          background-color: #181818;
          text-align: center;
        }
        .wishlist-card img {
          width: 100%;
          border-radius: 4px;
          object-fit: cover;
        }
        @media (max-width: 1024px) { .wishlist-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .wishlist-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .wishlist-grid { grid-template-columns: repeat(1, 1fr); } }
      `}</style>
        </div>
    );
}

export default Wishlist;
