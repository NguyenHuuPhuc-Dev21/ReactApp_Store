import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Favorites() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve favorited product IDs from Redux
  const favoriteIds = useSelector((state) => state.favorites.items);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        // Filter products that are in the favorites list (checking string and numeric comparison)
        const favProducts = res.data.filter(
          (p) => favoriteIds.includes(String(p.id)) || favoriteIds.includes(Number(p.id))
        );
        setProducts(favProducts);
      })
      .catch(() => setError("Không thể tải danh sách sản phẩm yêu thích."))
      .finally(() => setLoading(false));
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Đang tải danh sách...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-white fw-bold mb-4">❤️ Danh Sách Yêu Thích Của Bạn</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {products.length === 0 ? (
        <div className="text-center py-5 bg-dark rounded border border-secondary text-white">
          <span className="fs-1 d-block mb-3">❤️</span>
          <h3 className="fw-light text-muted">Danh sách yêu thích đang trống!</h3>
          <p className="text-muted small">Hãy nhấn nút trái tim trên các sản phẩm ở trang chủ để lưu lại vào đây.</p>
          <Link to="/" className="btn btn-primary mt-3 px-4 fw-bold shadow">
            Duyệt sản phẩm ngay
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
