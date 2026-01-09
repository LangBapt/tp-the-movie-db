import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Wishlist from "./components/MovieWishlist";
import { WishlistProvider, WishlistContext } from "./context/WishlistContext";
import { useContext } from "react";

function Navbar() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav
      style={{
        backgroundColor: "#141414",
        color: "#fff",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "#E50914", textDecoration: "none", fontFamily: "Netflix Sans, Arial, sans-serif" }}>
        Netflux
      </Link>
      <Link to="/wishlist" style={{ color: "#fff", textDecoration: "none", fontFamily: "Netflix Sans, Arial, sans-serif" }}>
        Wishlist ({wishlist.length})
      </Link>
    </nav>
  );
}

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
