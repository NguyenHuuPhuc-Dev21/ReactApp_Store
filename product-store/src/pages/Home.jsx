import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import ProductCard from "../components/ProductCard";
import ProductCardClass from "../components/ProductCardClass";
import { toggleFavorite } from "../store";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  // Retrieve Redux state for Favorites (LO8)
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    // Fetches from https://fakestoreapi.com/products (LO7)
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => setError("Unable to fetch products from FakeStoreAPI."))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  // Perform case-insensitive search on title or description (LO6)
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header Title matching Mockup */}
      <h1 className="text-center text-white mb-4 fw-bold" style={{ fontSize: "2rem" }}>
        Product List
      </h1>

      {/* Dynamic Search Bar (LO6) */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 col-lg-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-secondary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="btn btn-outline-secondary bg-white border-start-0 text-secondary"
                type="button"
                onClick={() => setSearchQuery("")}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Search results display */}
      {filteredProducts.length === 0 ? (
        // Matches Screenshot 2 exactly
        <div className="text-center py-5">
          <h3 className="text-white fw-light opacity-95">No products found.</h3>
        </div>
      ) : (
        // Grid matching Screenshot 1
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((product, index) => (
            <div className="col" key={product.id}>
              {index === 0 ? (
                // Demonstrates Class Component rendering (LO2)
                <ProductCardClass
                  product={product}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                // Demonstrates Functional Component rendering (LO2)
                <ProductCard product={product} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
