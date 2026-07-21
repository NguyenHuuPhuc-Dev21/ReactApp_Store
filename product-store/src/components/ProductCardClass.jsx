import React, { Component } from "react";
import { Link } from "react-router-dom";

// Reusable Class Component to display product card (LO2)
class ProductCardClass extends Component {
  componentDidMount() {
    console.log(`ProductCardClass mounted for product ID: ${this.props.product.id}`);
  }

  render() {
    const { id, title, description, price, image } = this.props.product;
    const { favorites, onToggleFavorite, onAddToCart } = this.props;
    const isFavorite = favorites.includes(id);

    const numericPrice = typeof price === "string" 
      ? parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0
      : price;
    const originalPriceStr = `$${(numericPrice * 1.25).toFixed(2)}`;
    const currentPriceStr = `$${numericPrice.toFixed(2)}`;

    return (
      <div className="product-card position-relative border border-warning border-opacity-50 d-flex flex-column justify-content-between h-100">
        <div>
          {/* Class Badge */}
          <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark opacity-75 small" style={{ zIndex: 10 }}>
            Class UI
          </span>

          {/* SALE Discount Badge */}
          <span className="position-absolute start-0 badge bg-danger text-white shadow-sm font-monospace" style={{ zIndex: 10, fontSize: "0.75rem", margin: "32px 0 0 8px" }}>
            Giảm 20%
          </span>

          {/* Favorites trigger */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(id);
            }}
            className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm ${
              isFavorite ? "btn-danger" : "btn-light"
            }`}
            style={{ zIndex: 10, width: "30px", height: "30px", padding: 0 }}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
          </button>

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
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onAddToCart) onAddToCart(this.props.product);
              }}
              className="btn-add-to-cart w-100 py-2"
            >
              <i className="bi bi-cart-plus-fill me-1"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCardClass;
