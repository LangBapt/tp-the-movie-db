import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext"; 
import App from "./App.jsx";
import MovieList from "./pages/MovieList.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Wishlist from "./pages/MovieWishlist.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </App>
      </BrowserRouter>
    </WishlistProvider>
  </React.StrictMode>
);
