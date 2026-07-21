import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomModal from "./components/CustomModal";
import NotificationToast from "./components/NotificationToast";
import { logoutSuccess, loadUserCart } from "./store";

// Lazy-loaded pages to satisfy LO7 (lazy load with React.lazy & Suspense)
const ProductList = React.lazy(() => import("./pages/ProductList"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const EditProduct = React.lazy(() => import("./pages/EditProduct"));
const About = React.lazy(() => import("./pages/About"));
const Login = React.lazy(() => import("./pages/Login"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const Favorites = React.lazy(() => import("./pages/Favorites"));

function AppContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Redux state integration (LO8)
  const favorites = useSelector((state) => state.favorites.items);
  const favoriteCount = favorites.length;

  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logoutSuccess());
    dispatch(loadUserCart());
    setShowLogoutModal(false);
    navigate("/login"); // Immediately redirect to login screen on logout
  };

  return (
    <>
      {/* Bootstrap Navbar (LO4) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
            <span className="fs-3 me-2">🛍️</span> Product Store
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active text-primary" : ""}`} end>
                  Trang chủ
                </NavLink>
              </li>
              
              {/* Only show Admin page option in navbar if user is Admin */}
              {isAuthenticated && currentUser?.role === "admin" && (
                <li className="nav-item">
                  <NavLink to="/feature" className={({ isActive }) => `nav-link ${isActive ? "active text-primary" : ""}`}>
                    Quản lý kho
                  </NavLink>
                </li>
              )}
              
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active text-primary" : ""}`}>
                  Giới thiệu
                </NavLink>
              </li>
            </ul>
            
            <div className="d-flex align-items-center gap-2">
              {/* Only show Cart and Favorites if user is logged in */}
              {isAuthenticated && (
                <>
                  {/* Cart link button */}
                  <Link to="/cart" className="btn btn-outline-warning position-relative shadow-sm py-1 px-3 d-flex align-items-center me-2" style={{ borderRadius: "20px" }}>
                    <i className="bi bi-cart-fill text-warning me-1"></i> Giỏ hàng
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Redux State Summary Badge (LO8) as clickable Link */}
                  <Link to="/favorites" className="btn btn-outline-danger position-relative shadow-sm py-1 px-3 d-flex align-items-center me-3" style={{ borderRadius: "20px" }}>
                    <i className="bi bi-heart-fill text-danger me-1"></i> Yêu thích
                    {favoriteCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {favoriteCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {/* Authentication Controls */}
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-light small">
                    Chào, <strong className="text-warning">{currentUser.name}</strong>
                  </span>
                  <button onClick={handleLogoutClick} className="btn btn-sm btn-outline-danger px-3 rounded-pill">
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-sm btn-primary px-4 rounded-pill fw-bold">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Routing */}
      <main className="app-main container py-4">
        {/* Suspense boundary for lazy bundles (LO7) */}
        <React.Suspense fallback={
          <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "400px" }}>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Đang tải trang...</span>
            </div>
          </div>
        }>
          <Routes>
            {/* Require login to view homepage */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            {/* Protected Route for Admin only */}
            <Route path="/feature" element={
              <ProtectedRoute requiredRole="admin">
                <ProductList />
              </ProtectedRoute>
            } />
            
            {/* Details and editing pages require login */}
            <Route path="/feature/:id" element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } />
            <Route path="/products/:id" element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/products/:id/edit" element={
              <ProtectedRoute requiredRole="admin">
                <EditProduct />
              </ProtectedRoute>
            } />

            {/* Standard Routes require login */}
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            
            <Route path="/login" element={<Login />} />
            
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            
            {/* Protected route for checkout (requires login) */}
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            {/* Favorites List page */}
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } />

            <Route path="/unauthorized" element={
              <ProtectedRoute>
                <Unauthorized />
              </ProtectedRoute>
            } />
          </Routes>
        </React.Suspense>
      </main>

      <footer className="bg-dark text-muted text-center py-3 mt-5">
        <small>&copy; 2026 Product Store - FER202 React Assignment - Nguyen Huu Phuc</small>
      </footer>

      {/* Custom Confirmation Modals and Toast */}
      <CustomModal 
        show={showLogoutModal}
        type="confirm"
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản hiện tại?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      <NotificationToast />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
