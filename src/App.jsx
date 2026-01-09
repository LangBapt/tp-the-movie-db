import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "./context/WishlistContext";
import styles from "./styles/App.module.css";

export default function App({ children }) {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
      <nav className={styles.navbar}>
      </nav>
      <main>{children}</main>
    </div>
  );
}
