import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginSuccess, loadUserCart } from "../store";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Pre-configured accounts for testing (LO6, LO8)
  const sampleAccounts = [
    { username: "admin", password: "admin", name: "Nguyễn Hữu Phúc (Admin)", role: "admin", badge: "danger" },
    { username: "customer", password: "customer", name: "Nguyễn Hữu Phúc (Customer)", role: "customer", badge: "success" }
  ];

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Tên tài khoản không được để trống.";
    }
    if (!password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (password.length < 4) {
      newErrors.password = "Mật khẩu phải có ít nhất 4 ký tự.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    const matchedAccount = sampleAccounts.find(
      (acc) => acc.username === username.trim() && acc.password === password
    );

    if (matchedAccount) {
      dispatch(loginSuccess({
        username: matchedAccount.username,
        name: matchedAccount.name,
        role: matchedAccount.role
      }));
      dispatch(loadUserCart());
      navigate(from, { replace: true });
    } else {
      setError("Tài khoản hoặc mật khẩu không chính xác. Hãy sử dụng thông tin tài khoản mẫu bên dưới.");
    }
  };

  const handleFieldChange = (field, val, setter) => {
    setter(val);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleQuickLogin = (account) => {
    dispatch(loginSuccess({
      username: account.username,
      name: account.name,
      role: account.role
    }));
    dispatch(loadUserCart());
    navigate(from, { replace: true });
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="login-card-container card border-0 shadow-lg p-4" style={{ maxWidth: "450px", width: "100%", backgroundColor: "rgba(33, 37, 41, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}>
        
        <div className="text-center mb-4">
          <span className="fs-1">🔐</span>
          <h2 className="text-white fw-bold mt-2 mb-1" style={{ fontSize: "1.75rem" }}>Đăng Nhập</h2>
          <p className="text-muted small">Cửa hàng Product Store</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center small mb-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label htmlFor="login-username" className="form-label text-light small fw-semibold">Tên tài khoản</label>
            <div className="input-group has-validation">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                id="login-username"
                type="text"
                className={`form-control bg-dark border-secondary text-white ${errors.username ? "is-invalid" : ""}`}
                placeholder="Nhập tên tài khoản"
                value={username}
                onChange={(e) => handleFieldChange("username", e.target.value, setUsername)}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="login-password" className="form-label text-light small fw-semibold">Mật khẩu</label>
            <div className="input-group has-validation">
              <span className="input-group-text bg-dark border-secondary text-secondary">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                id="login-password"
                type="password"
                className={`form-control bg-dark border-secondary text-white ${errors.password ? "is-invalid" : ""}`}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => handleFieldChange("password", e.target.value, setPassword)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-4 shadow">
            Đăng Nhập
          </button>
        </form>

        {/* Sample Credentials & Quick Login Section */}
        <div className="border-top border-secondary pt-3 mt-2">
          <h6 className="text-warning fw-bold mb-3 text-center small uppercase tracking-wider">
            <i className="bi bi-info-circle me-1"></i> TÀI KHOẢN MẪU DÀNH CHO GIÁM KHẢO
          </h6>
          
          <div className="d-flex flex-column gap-2">
            {sampleAccounts.map((acc) => (
              <div 
                key={acc.username} 
                className="quick-login-box d-flex justify-content-between align-items-center p-2 rounded bg-dark border border-secondary"
                style={{ transition: "all 0.2s ease" }}
              >
                <div className="text-start">
                  <div className="small fw-bold text-light">
                    {acc.username} <span className={`badge bg-${acc.badge} ms-1`} style={{ fontSize: "0.7rem" }}>{acc.role.toUpperCase()}</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>Mật khẩu: <span className="font-monospace text-warning">{acc.password}</span></div>
                </div>
                <button 
                  type="button" 
                  className="btn btn-sm btn-outline-warning py-1 px-3 fw-bold"
                  onClick={() => handleQuickLogin(acc)}
                  style={{ fontSize: "0.8rem" }}
                >
                  Vào nhanh
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
