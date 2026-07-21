import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, addToCart, showToast } from "../store";

// Functional Component to display product card (LO2, LO3)
const ProductCard = ({ product }) => {
  const { id, title, description, price, image } = product;
  const dispatch = useDispatch();

  // Redux integration for favorites (LO8)
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(id);

  const handleFavorite = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(id));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(showToast({ message: `Đã thêm "${title || product.name}" vào giỏ hàng!` }));
  };

  // Fake original price calculation to preserve crossed-out price layout from screenshots
  const numericPrice = typeof price === "string" 
    ? parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0
    : price;
  const originalPriceStr = `$${(numericPrice * 1.25).toFixed(2)}`;
  const currentPriceStr = `$${numericPrice.toFixed(2)}`;

  return (
    <div className="product-card position-relative d-flex flex-column justify-content-between h-100">
      <div>
        {/* SALE Discount Badge */}
        <span className="position-absolute top-0 start-0 m-2 badge bg-danger text-white shadow-sm font-monospace" style={{ zIndex: 10, fontSize: "0.75rem" }}>
          Giảm 20%
        </span>

        {/* Redux Favorites icon on the top right (LO8) */}
        <button
          onClick={handleFavorite}
          className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm ${
            isFavorite ? "btn-danger" : "btn-light"
          }`}
          style={{ zIndex: 10, width: "30px", height: "30px", padding: 0 }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>

        {/* Render remote product image from FakeStoreAPI */}
        <img src={image} alt={title} style={{ height: "180px", objectFit: "contain" }} />
        
        <h5 className="card-title text-truncate-2" title={title}>{title}</h5>
        <p className="card-text text-truncate-3">{description}</p>
      </div>
      
      <div>
        <div className="old-price">{originalPriceStr}</div>
        <div className="current-price">{currentPriceStr}</div>
        
        <div className="d-flex flex-column gap-2 mt-2">
          <Link to={`/feature/${id}`} className="btn-view-details w-100 text-center py-2">
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn-add-to-cart w-100 py-2">
            <i className="bi bi-cart-plus-fill me-1"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
