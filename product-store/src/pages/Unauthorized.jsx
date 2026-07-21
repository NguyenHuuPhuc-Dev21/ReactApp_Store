import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card text-center shadow-lg border-0 p-5 bg-dark text-white" style={{ maxWidth: "550px", border: "1px solid rgba(255, 0, 0, 0.2)", borderRadius: "10px" }}>
        <div className="mb-4">
          <span className="display-1 text-danger">⚠️</span>
        </div>
        <h2 className="fw-bold text-danger mb-3">Từ Chối Truy Cập</h2>
        <p className="lead text-light mb-4" style={{ fontSize: "1.1rem" }}>
          Bạn không có quyền truy cập vào chức năng này. Trang này chỉ dành riêng cho tài khoản có vai trò <strong>Quản Trị Viên (Admin)</strong>.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-light px-4 py-2" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i>Quay lại
          </button>
          <button className="btn btn-danger px-4 py-2" onClick={() => navigate("/")}>
            <i className="bi bi-house-door me-2"></i>Về Trang Chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
