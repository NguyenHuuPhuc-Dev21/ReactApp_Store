import React, { useState } from "react";

const initialForm = {
  name: "",
  description: "",
  price: "",
  currentPrice: "",
  image: "", // Initialize empty, can be custom typed
};

const AddProductForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 3) {
      newErrors.name = "Tên sản phẩm phải có ít nhất 3 ký tự.";
    }
    
    const priceVal = parseFloat(form.price);
    if (!form.price.trim()) {
      newErrors.price = "Giá sản phẩm không được để trống.";
    } else if (isNaN(priceVal) || priceVal <= 0) {
      newErrors.price = "Giá sản phẩm phải là một số dương hợp lệ.";
    }

    if (form.currentPrice.trim()) {
      const currentPriceVal = parseFloat(form.currentPrice);
      if (isNaN(currentPriceVal) || currentPriceVal <= 0) {
        newErrors.currentPrice = "Giá hiện tại phải là số dương hợp lệ.";
      } else if (!isNaN(priceVal) && currentPriceVal > priceVal) {
        newErrors.currentPrice = "Giá hiện tại không được lớn hơn giá gốc.";
      }
    }

    if (form.image.trim()) {
      // Basic URL verification pattern
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(form.image.trim())) {
        newErrors.image = "Đường dẫn hình ảnh (URL) không hợp lệ.";
      }
    }

    if (form.description.trim().length < 10) {
      newErrors.description = "Mô tả sản phẩm phải có ít nhất 10 ký tự.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Use default placeholder image if the user leaves the URL field empty
    const finalImage = form.image.trim() || "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";
    
    // Map custom fields to FakeStoreAPI structure (LO6)
    onAdd({
      title: form.name,
      description: form.description,
      price: parseFloat(form.currentPrice || form.price) || 0,
      image: finalImage,
      category: "electronics",
    });

    setForm(initialForm);
    setErrors({});
  };

  return (
    <div className="add-product-container shadow-sm">
      {/* Matches Screenshot 3: Centering white title */}
      <h2 className="add-product-title">Add Product</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Row 1: Name */}
        <div className="form-horizontal-row align-items-start mb-3">
          <label className="form-horizontal-label pt-2">Name:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && <div className="invalid-feedback text-danger fw-semibold mt-1">{errors.name}</div>}
          </div>
        </div>

        {/* Row 2: Description */}
        <div className="form-horizontal-row align-items-start mb-3">
          <label className="form-horizontal-label pt-2">Description:</label>
          <div className="form-horizontal-input">
            <textarea
              name="description"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              value={form.description}
              onChange={handleChange}
              rows="2"
              placeholder="Nhập mô tả chi tiết sản phẩm"
            />
            {errors.description && <div className="invalid-feedback text-danger fw-semibold mt-1">{errors.description}</div>}
          </div>
        </div>

        {/* Row 3: Price */}
        <div className="form-horizontal-row align-items-start mb-3">
          <label className="form-horizontal-label pt-2">Price:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="price"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              value={form.price}
              onChange={handleChange}
              placeholder="Nhập giá bán gốc (ví dụ: 100)"
            />
            {errors.price && <div className="invalid-feedback text-danger fw-semibold mt-1">{errors.price}</div>}
          </div>
        </div>

        {/* Row 4: Current Price */}
        <div className="form-horizontal-row align-items-start mb-3">
          <label className="form-horizontal-label pt-2">Current Price:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="currentPrice"
              className={`form-control ${errors.currentPrice ? "is-invalid" : ""}`}
              value={form.currentPrice}
              onChange={handleChange}
              placeholder="Nhập giá khuyến mãi hiện tại (nếu có)"
            />
            {errors.currentPrice && <div className="invalid-feedback text-danger fw-semibold mt-1">{errors.currentPrice}</div>}
          </div>
        </div>

        {/* Row 5: Image URL */}
        <div className="form-horizontal-row align-items-start mb-3">
          <label className="form-horizontal-label pt-2">Image URL:</label>
          <div className="form-horizontal-input">
            <input
              type="text"
              name="image"
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              value={form.image}
              onChange={handleChange}
              placeholder="Nhập link hình ảnh (để trống sẽ tự động lấy hình mẫu)"
            />
            {errors.image && <div className="invalid-feedback text-danger fw-semibold mt-1">{errors.image}</div>}
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
