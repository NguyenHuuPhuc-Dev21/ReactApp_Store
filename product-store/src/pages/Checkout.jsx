import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [errors, setErrors] = useState({});
  
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  // If cart is empty and order not placed, go back to cart
  React.useEffect(() => {
    if (cartItems.length === 0 && !isOrderCompleted) {
      navigate("/cart");
    }
  }, [cartItems, isOrderCompleted, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (fullName.trim().length < 3) {
      newErrors.fullName = "Họ tên phải có ít nhất 3 ký tự.";
    }
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Số điện thoại Việt Nam không hợp lệ (ví dụ: 0987654321).";
    }
    if (address.trim().length < 10) {
      newErrors.address = "Địa chỉ nhận hàng chi tiết phải có ít nhất 10 ký tự.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Save info for success screen
    setOrderedItems([...cartItems]);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setOrderTotal(total);

    // Generate random order ID
    const randomId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);

    // Clear cart and mark completed
    dispatch(clearCart());
    setIsOrderCompleted(true);
  };

  const handleFieldChange = (field, val, setter) => {
    setter(val);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const vndAmount = Math.round(orderTotal * 25000);

  if (isOrderCompleted) {
    return (
      <div className="container py-5 d-flex justify-content-center">
        <div className="card shadow-lg border-0 p-4 text-dark bg-white" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="text-center mb-4">
            <span className="display-4 text-success">🎉</span>
            <h2 className="fw-bold text-success mt-2">Đặt Hàng Thành Công!</h2>
            <p className="text-muted">Cảm ơn bạn đã mua hàng tại Product Store.</p>
          </div>

          <div className="bg-light p-3 rounded mb-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">Thông Tin Nhận Hàng</h5>
            <div className="row g-2 small">
              <div className="col-4 text-secondary">Mã đơn hàng:</div>
              <div className="col-8 fw-bold text-danger">{orderId}</div>

              <div className="col-4 text-secondary">Người nhận:</div>
              <div className="col-8 fw-semibold">{fullName}</div>

              <div className="col-4 text-secondary">Số điện thoại:</div>
              <div className="col-8 font-monospace">{phone}</div>

              <div className="col-4 text-secondary">Địa chỉ giao hàng:</div>
              <div className="col-8">{address}</div>

              <div className="col-4 text-secondary">Thanh toán:</div>
              <div className="col-8">
                {paymentMethod === "COD" && "Thanh toán khi nhận hàng (COD)"}
                {paymentMethod === "BANK" && "Chuyển khoản ngân hàng"}
                {paymentMethod === "CARD" && "Thanh toán bằng thẻ tín dụng"}
              </div>
            </div>
          </div>

          {/* VietQR Payment block if user selected BANK */}
          {paymentMethod === "BANK" && (
            <div className="border border-warning rounded p-3 mb-4" style={{ backgroundColor: "#fffbeb" }}>
              <h5 className="fw-bold text-warning-emphasis mb-3 d-flex align-items-center">
                <i className="bi bi-qr-code-scan me-2 text-warning fs-4 animate-pulse"></i> 
                Quét mã VietQR để thanh toán đơn hàng
              </h5>
              <div className="row align-items-center g-3">
                <div className="col-md-7 text-start">
                  <div className="small mb-1">
                    <strong>Ngân hàng:</strong> MB Bank (Ngân hàng Quân đội)
                  </div>
                  <div className="small mb-1">
                    <strong>Số tài khoản:</strong> <span className="font-monospace fw-bold text-danger">123456789999</span>
                  </div>
                  <div className="small mb-1">
                    <strong>Chủ tài khoản:</strong> NGUYEN HUU PHUC
                  </div>
                  <div className="small mb-1">
                    <strong>Số tiền chuyển:</strong> <span className="text-danger fw-bold">{vndAmount.toLocaleString("vi-VN")} VNĐ</span> 
                    <span className="text-muted font-monospace small ms-1">(${orderTotal.toFixed(2)})</span>
                  </div>
                  <div className="small mb-2">
                    <strong>Nội dung:</strong> <span className="badge bg-danger font-monospace px-2 py-1">{orderId}</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.72rem", lineHeight: "1.3" }}>
                    * Vui lòng quét mã bên cạnh bằng ứng dụng Ngân hàng để thanh toán nhanh hơn. Hệ thống sẽ tự động đối soát nội dung chuyển khoản <strong>{orderId}</strong>.
                  </div>
                </div>
                <div className="col-md-5 text-center">
                  <div className="bg-white p-2 rounded shadow-sm d-inline-block border">
                    <img 
                      src={`https://img.vietqr.io/image/MB-123456789999-compact.png?amount=${vndAmount}&addInfo=${orderId}&accountName=NGUYEN%20HUU%20PHUC`} 
                      alt="VietQR Pay Code"
                      className="img-fluid"
                      style={{ width: "160px", height: "160px", objectFit: "contain" }}
                    />
                    <div className="text-dark fw-bold small mt-1" style={{ fontSize: "0.7rem" }}>VietQR quét nhanh</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Sản Phẩm Đã Mua</h5>
            <div className="list-group list-group-flush border-bottom">
              {orderedItems.map((item) => (
                <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-2 px-0 bg-transparent">
                  <div className="d-flex align-items-center">
                    <img src={item.image} alt={item.title} className="me-2 rounded border" style={{ width: "40px", height: "40px", objectFit: "contain", backgroundColor: "#fff" }} />
                    <div>
                      <span className="fw-semibold small d-block text-truncate" style={{ maxWidth: "250px" }}>{item.title}</span>
                      <span className="text-muted small">Số lượng: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="fw-bold text-danger small">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="fw-bold text-dark">Tổng thanh toán:</span>
              <span className="fw-bold text-danger fs-4">${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn btn-danger w-100 fw-bold py-2 shadow" onClick={() => navigate("/")}>
            Quay Lại Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 text-white">
      <h2 className="fw-bold mb-4">💳 Tiến Hành Thanh Toán</h2>

      <form onSubmit={handleCheckout}>
        <div className="row g-4">
          {/* Shipping Form */}
          <div className="col-lg-7">
            <div className="card border-0 bg-dark text-white p-4 shadow-sm h-100">
              <h4 className="fw-bold border-bottom pb-2 mb-4">Thông Tin Nhận Hàng</h4>
              
              <div className="mb-3">
                <label htmlFor="ship-name" className="form-label small fw-semibold text-light">Họ và tên người nhận</label>
                <input
                  id="ship-name"
                  type="text"
                  className={`form-control bg-dark border-secondary text-white ${errors.fullName ? "is-invalid" : ""}`}
                  value={fullName}
                  onChange={(e) => handleFieldChange("fullName", e.target.value, setFullName)}
                  placeholder="Nhập họ tên"
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="ship-phone" className="form-label small fw-semibold text-light">Số điện thoại</label>
                <input
                  id="ship-phone"
                  type="tel"
                  className={`form-control bg-dark border-secondary text-white ${errors.phone ? "is-invalid" : ""}`}
                  value={phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value, setPhone)}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="ship-address" className="form-label small fw-semibold text-light">Địa chỉ nhận hàng</label>
                <textarea
                  id="ship-address"
                  className={`form-control bg-dark border-secondary text-white ${errors.address ? "is-invalid" : ""}`}
                  rows="3"
                  value={address}
                  onChange={(e) => handleFieldChange("address", e.target.value, setAddress)}
                  placeholder="Nhập địa chỉ giao hàng đầy đủ"
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>

              <h4 className="fw-bold border-bottom pb-2 mb-3 mt-2">Phương Thức Thanh Toán</h4>
              
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="pay-cod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label className="form-check-label small" htmlFor="pay-cod">
                  Thanh toán khi nhận hàng (COD)
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="pay-bank"
                  value="BANK"
                  checked={paymentMethod === "BANK"}
                  onChange={() => setPaymentMethod("BANK")}
                />
                <label className="form-check-label small" htmlFor="pay-bank">
                  Chuyển khoản ngân hàng (ATM / Internet Banking - Tạo VietQR nhanh)
                </label>
              </div>

              {/* Bank preview notice if selected BANK */}
              {paymentMethod === "BANK" && (
                <div className="alert alert-info py-2 px-3 small mt-1 mb-2 bg-info bg-opacity-10 text-info border border-info border-opacity-25 rounded">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Mã VietQR thanh toán tự động với đầy đủ Số tiền và Mã Đơn Hàng sẽ hiển thị ở màn hình Hoàn thành đơn hàng tiếp theo.
                </div>
              )}

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="pay-card"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                />
                <label className="form-check-label small" htmlFor="pay-card">
                  Thanh toán bằng thẻ tín dụng (Visa, Mastercard)
                </label>
              </div>
            </div>
          </div>

          {/* Cart review */}
          <div className="col-lg-5">
            <div className="card border-0 bg-white text-dark p-4 shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="fw-bold border-bottom pb-2 mb-3 text-dark">Sản Phẩm Đơn Hàng</h4>
                <div className="mb-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <img src={item.image} alt={item.title} className="border p-1 rounded bg-light me-2" style={{ width: "45px", height: "45px", objectFit: "contain" }} />
                        <div>
                          <span className="fw-semibold small d-block text-truncate text-dark" style={{ maxWidth: "180px" }}>{item.title}</span>
                          <span className="text-secondary small">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="fw-bold text-danger small">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between border-top pt-3 mb-4">
                  <span className="fw-bold text-dark fs-5">Tổng số tiền:</span>
                  <span className="fw-bold text-danger fs-4">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-danger w-100 fw-bold py-2 shadow">
                    Xác Nhận Đặt Hàng
                  </button>
                  <button type="button" className="btn btn-outline-secondary fw-semibold py-2" onClick={() => navigate("/cart")}>
                    Quay Lại Giỏ Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
