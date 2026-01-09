import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);


  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (movie) => {
    const exists = wishlist.some((m) => m.id === movie.id);
    if (exists) {
      setWishlist(wishlist.filter((m) => m.id !== movie.id));
    } else {
      setWishlist([...wishlist, movie]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
