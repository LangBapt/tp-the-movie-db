import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const toggleWishlist = (movie) => {
    let updated;
    if (wishlist.some((m) => m.id === movie.id)) {
      updated = wishlist.filter((m) => m.id !== movie.id);
    } else {
      updated = [...wishlist, movie];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
