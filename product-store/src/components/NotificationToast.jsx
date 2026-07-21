import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../store";

const NotificationToast = () => {
  const { show, message, type } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  if (!show) return null;

  const bgClass = 
    type === "success" ? "bg-success text-white" : 
    type === "danger" ? "bg-danger text-white" : 
    type === "warning" ? "bg-warning text-dark" : "bg-info text-white";

  const icon = 
    type === "success" ? "bi-check-circle-fill text-white" : 
    type === "danger" ? "bi-x-circle-fill text-white" : 
    type === "warning" ? "bi-exclamation-triangle-fill text-dark" : "bi-info-circle-fill text-white";

  return (
    <div 
      className={`toast show align-items-center ${bgClass} border-0 shadow-lg p-2`} 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 3000,
        borderRadius: "8px",
        minWidth: "260px",
        maxWidth: "360px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)"
      }}
    >
      <div className="d-flex align-items-center">
        <div className="toast-body d-flex align-items-center gap-2 small">
          <i className={`bi ${icon} fs-5`}></i>
          <span className="fw-semibold">{message}</span>
        </div>
        <button 
          type="button" 
          className={`btn-close ms-auto me-2 ${type !== "warning" ? "btn-close-white" : ""}`} 
          onClick={() => dispatch(hideToast())}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default NotificationToast;
