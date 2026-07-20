import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        const prod = res.data;
        // Map FakeStoreAPI properties to our local edit form inputs
        setForm({
          name: prod.title,
          description: prod.description,
          price: (prod.price * 1.25).toFixed(2), // Mock original price
          currentPrice: prod.price.toString(),
          image: prod.image,
          category: prod.category || "electronics"
        });
      })
      .catch(() => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // Execute simulated PUT updates on FakeStoreAPI
      await api.put(`/products/${id}`, {
        title: form.name,
        description: form.description,
        price: parseFloat(form.currentPrice || form.price) || 0,
        image: form.image,
        category: form.category
      });
      // Navigate back to detail page
      navigate(`/feature/${id}`);
    } catch (err) {
      setError("Failed to update the product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading product specs...</span>
        </div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(`/feature/${id}`)}>
        <i className="bi bi-arrow-left me-1"></i> Cancel & Back
      </button>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold py-3 text-center">
          <i className="bi bi-pencil-square me-2"></i> Edit Product Specifications
        </div>
        <div className="card-body p-4 text-dark">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="edit-name" className="form-label fw-semibold text-secondary small">Product Name:</label>
                <input
                  id="edit-name"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="edit-price" className="form-label fw-semibold text-secondary small">Original Price (USD):</label>
                <input
                  id="edit-price"
                  name="price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="edit-current-price" className="form-label fw-semibold text-secondary small">Current Price (USD):</label>
                <input
                  id="edit-current-price"
                  name="currentPrice"
                  className="form-control"
                  value={form.currentPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label htmlFor="edit-description" className="form-label fw-semibold text-secondary small">Description Specifications:</label>
                <textarea
                  id="edit-description"
                  name="description"
                  rows="4"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 d-flex gap-3 justify-content-center mt-4">
                <button type="submit" className="btn btn-primary px-4 fw-semibold" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-1"></i> Save Changes
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary px-4 fw-semibold"
                  onClick={() => navigate(`/feature/${id}`)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
