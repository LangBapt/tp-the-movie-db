import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#141414",
      color: "#fff",
      fontFamily: "Netflix Sans, Arial, sans-serif"
    }}>
      <Link to="/" style={{ color: "#E50914", textDecoration: "none" }}>Netflux</Link>
      <Link to="/wishlist" style={{ color: "#fff", textDecoration: "none" }}>
        Wishlist ({wishlist.length})
      </Link>
    </nav>
  );
}

export default Navbar;
