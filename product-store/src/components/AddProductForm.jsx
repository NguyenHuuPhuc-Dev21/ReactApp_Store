import React, { useState } from "react";

const initialForm = {
  name: "",
  description: "",
  price: "",
  currentPrice: "",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Default valid sample image from FakeStoreAPI
};

const AddProductForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) return;
    
    // Map custom fields to FakeStoreAPI structure (LO6)
    onAdd({
      title: form.name,
      description: form.description,
      // Map currentPrice (or price) as the API price field
      price: parseFloat(form.currentPrice || form.price) || 0,
      image: form.image,
      category: "electronics",
    });

    setForm(initialForm);
  };

  return (
    <div className="add-product-container shadow-sm">
      {/* Matches Screenshot 3: Centered white title */}
      <h2 className="add-product-title">Add Product</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Row 1: Name */}
        <div className="form-horizontal-row">
          <label className="form-horizontal-label">Name:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="form-horizontal-row">
          <label className="form-horizontal-label">Description:</label>
          <div className="form-horizontal-input">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="1"
            />
          </div>
        </div>

        {/* Row 3: Price */}
        <div className="form-horizontal-row">
          <label className="form-horizontal-label">Price:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 4: Current Price */}
        <div className="form-horizontal-row">
          <label className="form-horizontal-label">Current Price:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="currentPrice"
              value={form.currentPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Matches Screenshot 3: Centered blue Add Product submit button */}
        <button type="submit" className="btn-add-product-submit shadow-sm">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
