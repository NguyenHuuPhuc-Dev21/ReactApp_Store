import React from "react";

const CustomModal = ({ show, title, message, type = "info", onConfirm, onCancel }) => {
  if (!show) return null;

  const isConfirm = type === "confirm" || type === "danger" || !!onCancel;
  
  // Custom icons based on notification type
  const icon = 
    type === "success" ? "🎉" : 
    type === "danger" ? "🗑️" : 
    type === "warning" ? "⚠️" : 
    type === "confirm" ? "❓" : "ℹ️";

  // Card header color schemes
  const headerClass = 
    type === "danger" ? "bg-danger text-white" : 
    type === "warning" || type === "confirm" ? "bg-warning text-dark" : 
    type === "success" ? "bg-success text-white" : "bg-dark text-white";

  return (
    <div 
      className="custom-modal-wrapper d-flex text-white justify-content-center align-items-center animate-fade-in" 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.65)",
        zIndex: 2000,
        backdropFilter: "blur(5px)",
      }}
    >
      <div 
        className="card shadow-lg border-0 m-3" 
        style={{ 
          maxWidth: "420px", 
          width: "100%", 
          borderRadius: "12px", 
          overflow: "hidden",
          backgroundColor: "#1e222b",
          border: "1px solid rgba(255,255,255,0.1) !important"
        }}
      >
        <div className={`card-header ${headerClass} py-3 d-flex align-items-center gap-2 fw-bold`}>
          <span className="fs-5">{icon}</span>
          <span>{title}</span>
        </div>
        <div className="card-body p-4 text-center bg-dark text-white">
          <p className="mb-0 text-white" style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>{message}</p>
        </div>
        <div className="card-footer bg-dark border-secondary py-3 px-4 d-flex justify-content-end gap-2">
          {isConfirm ? (
            <>
              <button className="btn btn-sm btn-outline-secondary px-3 py-1.5 fw-semibold" onClick={onCancel}>
                Hủy bỏ
              </button>
              <button className="btn btn-sm btn-danger px-3 py-1.5 fw-bold" onClick={onConfirm}>
                Xác nhận
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary px-4 py-1.5 fw-bold" onClick={onConfirm}>
              Đồng ý
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
