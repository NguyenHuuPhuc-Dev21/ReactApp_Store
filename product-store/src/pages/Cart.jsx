import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store";
import CustomModal from "../components/CustomModal";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom Modal States
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleQuantityChange = (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty > 0) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleRemoveClick = (id) => {
    setItemToRemove(id);
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove));
    }
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  // Calculate totals
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <h2 className="text-white fw-bold mb-4">🛒 Giỏ Hàng Của Bạn</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 bg-dark rounded border border-secondary text-white">
          <span className="fs-1 d-block mb-3">🛒</span>
          <h3 className="fw-light text-muted">Giỏ hàng của bạn đang trống!</h3>
          <p className="text-muted small">Hãy quay lại trang chủ để tìm và chọn mua sản phẩm.</p>
          <Link to="/" className="btn btn-primary mt-3 px-4 fw-bold shadow">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart items list */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm bg-dark text-white p-3">
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "12%" }}>Ảnh</th>
                      <th style={{ width: "43%" }}>Sản phẩm</th>
                      <th style={{ width: "15%" }} className="text-center">Đơn giá</th>
                      <th style={{ width: "15%" }} className="text-center">Số lượng</th>
                      <th style={{ width: "15%" }} className="text-center">Thành tiền</th>
                      <th style={{ width: "5%" }} className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="bg-light p-1 rounded text-center" style={{ width: "50px", height: "50px" }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                          </div>
                        </td>
                        <td>
                          <Link to={`/feature/${item.id}`} className="text-decoration-none text-white fw-semibold small d-block text-truncate" style={{ maxWidth: "280px" }}>
                            {item.title}
                          </Link>
                        </td>
                        <td className="text-center small">${item.price.toFixed(2)}</td>
                        <td className="text-center">
                          <div className="d-inline-flex align-items-center bg-secondary bg-opacity-25 rounded">
                            <button
                              className="btn btn-sm btn-link text-white py-0 px-2 text-decoration-none fw-bold"
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            >
                              -
                            </button>
                            <span className="px-2 font-monospace text-warning fw-bold small">{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-link text-white py-0 px-2 text-decoration-none fw-bold"
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-center text-danger fw-bold small">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger border-0"
                            onClick={() => handleRemoveClick(item.id)}
                            title="Xóa sản phẩm"
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm text-dark bg-white p-4">
              <h4 className="fw-bold mb-4 border-bottom pb-2 text-dark">Tổng Đơn Hàng</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary small">Tổng số lượng:</span>
                <span className="fw-semibold text-dark">{totalItems} sản phẩm</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
                <span className="text-secondary small">Tổng chi phí:</span>
                <span className="fw-bold text-danger fs-5">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-danger fw-bold py-2 shadow"
                  onClick={() => navigate("/checkout")}
                >
                  Tiến hành thanh toán
                </button>
                <Link to="/" className="btn btn-outline-secondary fw-semibold py-2">
                  Tiếp tục mua hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reusable modal for cart removal confirmation */}
      <CustomModal 
        show={showRemoveModal}
        type="confirm"
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
        onConfirm={handleConfirmRemove}
        onCancel={() => {
          setShowRemoveModal(false);
          setItemToRemove(null);
        }}
      />
    </div>
  );
}

export default Cart;
