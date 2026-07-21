import React, { useState, useEffect } from "react";
import api from "../api";
import AddProductForm from "../components/AddProductForm";
import CustomModal from "../components/CustomModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Custom Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Unable to load products. Make sure your network is connected.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      const res = await api.post("/products", newProduct);
      // Simulate real persistence in React local state:
      const savedProduct = {
        ...newProduct,
        id: res.data.id || (products.length + 1)
      };
      setProducts((prev) => [...prev, savedProduct]);
    } catch (err) {
      setError("Failed to add product to the API database.");
    }
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    if (!productToDelete) return;
    try {
      await api.delete(`/products/${productToDelete}`);
      // Sync local state:
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
    } catch (err) {
      setError("Failed to delete product from database.");
    } finally {
      setProductToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading inventory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {error && (
        <div className="alert alert-danger text-center mb-4" role="alert">
          {error}
        </div>
      )}

      {/* Screenshot 3: Horizontal Form at the top */}
      <AddProductForm onAdd={handleAdd} />

      {/* Screenshot 4: White Table container below form */}
      <div className="product-table-container shadow-sm mt-4">
        <div className="product-table-title fw-bold">Product List</div>
        
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr className="text-center">
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "22%" }}>Name</th>
                <th style={{ width: "42%" }}>Description</th>
                <th style={{ width: "12%" }}>Price</th>
                <th style={{ width: "11%" }}>Current Price</th>
                <th style={{ width: "8%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const numericPrice = typeof product.price === "string" ? parseFloat(product.price) : product.price;
                const originalPriceStr = `$${(numericPrice * 1.25).toFixed(2)}`;
                const currentPriceStr = `$${numericPrice.toFixed(2)}`;

                return (
                  <tr key={product.id}>
                    <td className="text-center font-monospace">{index + 1}</td>
                    <td className="fw-semibold" style={{ fontSize: "0.95rem" }}>{product.title}</td>
                    <td className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {product.description}
                    </td>
                    {/* Struck-through original price calculation */}
                    <td className="text-center text-nowrap">
                      <span className="old-price-table">{originalPriceStr}</span>
                    </td>
                    {/* Bold red current price */}
                    <td className="text-center text-nowrap fw-bold text-danger">
                      <span>{currentPriceStr}</span>
                    </td>
                    {/* Delete action button */}
                    <td className="text-center">
                      <button
                        className="btn-delete-table shadow-sm fw-semibold"
                        onClick={() => handleDeleteClick(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No products in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Confirmation Modal for Deletion */}
      <CustomModal 
        show={showDeleteModal}
        type="danger"
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi cơ sở dữ liệu? Hành động này không thể hoàn tác."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}

export default ProductList;
