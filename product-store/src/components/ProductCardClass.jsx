import React, { Component } from "react";
import { Link } from "react-router-dom";

// Reusable Class Component to display product card (LO2)
class ProductCardClass extends Component {
  componentDidMount() {
    console.log(`ProductCardClass mounted for product ID: ${this.props.product.id}`);
  }

  render() {
    const { id, title, description, price, image } = this.props.product;
    const { favorites, onToggleFavorite } = this.props;
    const isFavorite = favorites.includes(id);

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    const originalPriceStr = `$${(numericPrice * 1.25).toFixed(2)}`;
    const currentPriceStr = `$${numericPrice.toFixed(2)}`;

    return (
      <div className="product-card position-relative border border-warning border-opacity-50">
        {/* Class Badge */}
        <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark opacity-75 small" style={{ zIndex: 10 }}>
          Class UI
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
  }
}

export default ProductCardClass;
