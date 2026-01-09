import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Netflux</Link>
      <Link to="/wishlist" className={styles.wishlist}>
        Wishlist ({wishlist.length})
      </Link>
    </nav>
  );
}
