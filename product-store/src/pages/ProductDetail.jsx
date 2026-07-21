import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { addToCart, showToast } from "../store";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAdmin = currentUser?.role === "admin";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    dispatch(showToast({ message: `Đã thêm ${quantity} sản phẩm "${product.title || product.name}" vào giỏ hàng!` }));
  };

  if (loading) return <p className="text-center py-5 text-white">Loading details...</p>;
  
  if (error) {
    return (
      <div className="container py-4 text-center">
        <div className="alert alert-danger mb-3">{error}</div>
        <button className="btn btn-primary btn-sm" onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>
    );
  }

  if (!product) return null;

  const { title, description, price, image } = product;
  const numericPrice = typeof price === "string" 
    ? parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0
    : price;
  const originalPriceStr = `$${(numericPrice * 1.25).toFixed(2)}`;
  const currentPriceStr = `$${numericPrice.toFixed(2)}`;

  return (
    <div className="container py-4 text-center" style={{ maxWidth: "650px" }}>
      {/* Dynamic Title */}
      <h2 className="text-white fw-bold mb-4">{title}</h2>

      <div className="card border-0 shadow-sm" style={{ backgroundColor: "#2b3035", color: "#ffffff" }}>
        {/* Product image block */}
        <div className="bg-light p-4 rounded-top text-center">
          <img 
            src={image} 
            alt={title} 
            className="img-fluid" 
            style={{ maxHeight: "250px", objectFit: "contain" }}
          />
        </div>
        
        {/* Specs and info */}
        <div className="card-body p-4">
          <p className="text-light opacity-90 small mb-4" style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
            {description}
          </p>
          
          <div className="mb-3">
            <div className="text-white small">Original Price: <span className="text-decoration-line-through">{originalPriceStr}</span></div>
            <div className="text-danger fw-bold fs-3">{currentPriceStr}</div>
          </div>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
            <span className="text-light small me-2">Số lượng:</span>
            <button 
              className="btn btn-sm btn-outline-light px-2 py-0 fw-bold" 
              type="button" 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-3 py-1 bg-dark text-warning border border-secondary rounded font-monospace fw-bold">{quantity}</span>
            <button 
              className="btn btn-sm btn-outline-light px-2 py-0 fw-bold" 
              type="button" 
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>

          {/* Action buttons matching specs */}
          <div className="d-flex justify-content-center gap-3">
            <button className="btn-back-home shadow-sm" onClick={() => navigate("/")}>
              Back Home
            </button>
            <button className="btn-add-to-cart shadow-sm" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus-fill me-1"></i> Add to Cart
            </button>
            {isAdmin && (
              <Link to={`/products/${id}/edit`} className="btn-edit-detail shadow-sm text-center">
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
