import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "./context/WishlistContext";

export default function App({ children }) {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
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
        <Link
          to="/"
          style={{
            color: "#E50914",
            textDecoration: "none",
            fontFamily: "Netflix Sans, Arial, sans-serif",
          }}
        >
          Netflux
        </Link>
        <Link
          to="/wishlist"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontFamily: "Netflix Sans, Arial, sans-serif",
          }}
        >
          Wishlist ({wishlist.length})
        </Link>
      </nav>

      <main>{children}</main>
    </div>
  );
}
