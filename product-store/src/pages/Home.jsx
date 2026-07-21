import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import ProductCard from "../components/ProductCard";
import ProductCardClass from "../components/ProductCardClass";
import { toggleFavorite, addToCart, showToast } from "../store";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // E-commerce pagination: 8 items per page

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

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(showToast({ message: `Đã thêm "${product.title || product.name}" vào giỏ hàng!` }));
  };

  // 1. Filter by category
  let processedProducts = products;
  if (selectedCategory !== "all") {
    processedProducts = processedProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  // 2. Filter by search query (case-insensitive)
  if (searchQuery.trim()) {
    processedProducts = processedProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 3. Sort by criteria
  processedProducts = [...processedProducts];
  if (sortBy === "priceAsc") {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    processedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "nameAsc") {
    processedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  // 4. Paginate items
  const totalProducts = processedProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = processedProducts.slice(startIndex, startIndex + pageSize);

  // Reset page to 1 when filters or search change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "electronics", label: "Điện tử" },
    { value: "jewelery", label: "Trang sức" },
    { value: "men's clothing", label: "Thời trang Nam" },
    { value: "women's clothing", label: "Thời trang Nữ" }
  ];

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

      {/* Search, Filter and Sort controls */}
      <div className="row g-3 justify-content-between align-items-center mb-5 bg-dark p-3 rounded shadow-sm border border-secondary border-opacity-25">
        {/* Search Bar */}
        <div className="col-md-4">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-secondary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                className="btn btn-outline-secondary bg-white border-start-0 text-secondary"
                type="button"
                onClick={() => handleSearchChange("")}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (LO6) */}
        <div className="col-lg-6 col-md-5 d-flex flex-wrap gap-2 justify-content-md-center py-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`btn btn-sm px-3 rounded-pill fw-semibold border-secondary ${
                selectedCategory === cat.value ? "btn-primary text-white" : "btn-outline-light text-white"
              }`}
              onClick={() => handleCategoryChange(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="col-md-2 text-md-end">
          <select
            className="form-select form-select-sm bg-dark text-white border-secondary"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">Sắp xếp mặc định</option>
            <option value="priceAsc">Giá: Thấp → Cao</option>
            <option value="priceDesc">Giá: Cao → Thấp</option>
            <option value="nameAsc">Tên: A → Z</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Search results display */}
      {paginatedProducts.length === 0 ? (
        // Matches Screenshot 2 exactly
        <div className="text-center py-5">
          <h3 className="text-white fw-light opacity-95">No products found.</h3>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {paginatedProducts.map((product, index) => {
              // Ensure we render the first item on the current page as a Class component to meet LO2
              // if it is the first item of the array (index 0)
              const renderAsClass = index === 0;
              return (
                <div className="col" key={product.id}>
                  {renderAsClass ? (
                    // Demonstrates Class Component rendering (LO2)
                    <ProductCardClass
                      product={product}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                    />
                  ) : (
                    // Demonstrates Functional Component rendering (LO2)
                    <ProductCard product={product} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-5">
              <ul className="pagination pagination-sm">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link bg-dark border-secondary text-white"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Trước
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                    <button
                      className={`page-link border-secondary fw-semibold ${
                        currentPage === page ? "bg-primary text-white" : "bg-dark text-white"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link bg-dark border-secondary text-white"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
