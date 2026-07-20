import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store";

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

  // Fake original price calculation to preserve crossed-out price layout from screenshots
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const originalPriceStr = `$${(numericPrice * 1.25).toFixed(2)}`;
  const currentPriceStr = `$${numericPrice.toFixed(2)}`;

  return (
    <div className="product-card position-relative">
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
      <img src={image} alt={title} />
      
      <h5 className="card-title" title={title}>{title}</h5>
      <p className="card-text">{description}</p>
      
      <div className="old-price">{originalPriceStr}</div>
      <div className="current-price">{currentPriceStr}</div>
      
      <Link to={`/feature/${id}`} className="btn-view-details">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
