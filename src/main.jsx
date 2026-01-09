import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import MovieList from "./pages/MovieList.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Wishlist from "./pages/MovieWishlist.jsx";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <BrowserRouter>
        <Navbar />
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
