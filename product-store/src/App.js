import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

// Lazy-loaded pages to satisfy LO7 (lazy load with React.lazy & Suspense)
const ProductList = React.lazy(() => import("./pages/ProductList"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const EditProduct = React.lazy(() => import("./pages/EditProduct"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  // Redux favorites count for global state summary (LO8)
  const favorites = useSelector((state) => state.favorites.items);
  const favoriteCount = favorites.length;

  return (
    <BrowserRouter>
      {/* Bootstrap Navbar (LO4) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            🛍️ Product Store
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active text-primary" : ""}`} end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/feature" className={({ isActive }) => `nav-link ${isActive ? "active text-primary" : ""}`}>
                  Main Feature
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active text-primary" : ""}`}>
                  About
                </NavLink>
              </li>
            </ul>
            
            {/* Redux State Summary Badge (LO8) */}
            <span className="navbar-text bg-secondary text-white px-3 py-1 rounded shadow-sm">
              <i className="bi bi-heart-fill text-danger me-1"></i> Favorites: <strong>{favoriteCount}</strong>
            </span>
          </div>
        </div>
      </nav>

      {/* Page Routing */}
      <main className="app-main container py-4">
        {/* Suspense boundary for lazy bundles (LO7) */}
        <React.Suspense fallback={<p className="text-center py-5 text-white">Loading page module...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feature" element={<ProductList />} />
            {/* Routes to details and editing pages */}
            <Route path="/feature/:id" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </React.Suspense>
      </main>

      <footer className="bg-dark text-muted text-center py-3 mt-5">
        <small>&copy; 2026 Product Store - FER202 React Assignment</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;
