# Custom React Web Application - Product Store App
## Course: FER202 ReactJS | Student Submission
## Name: Nguyen Huu Phuc  | Class: SE20A04  

Ứng dụng ReactJS hoàn chỉnh đáp ứng đầy đủ và bám sát các chuẩn đầu ra **LO1 - LO8** của môn học FER202, kết nối trực tiếp với API công khai **FakeStoreAPI** và được mở rộng thành một hệ thống thương mại điện tử (E-commerce) thu nhỏ chuyên nghiệp.

---

## 1. Cách Khởi Chạy Ứng Dụng (Run Instructions)

Ứng dụng kết nối trực tiếp tới API trực tuyến, do đó **không cần chạy cơ sở dữ liệu giả lập (json-server) ở local nữa**. Bạn chỉ cần mở terminal tại thư mục dự án và chạy:

```bash
# Cài đặt thư viện
npm install

# Khởi chạy ứng dụng React
npm start
```
Ứng dụng sẽ chạy tại địa chỉ: **http://localhost:3000**

> [!IMPORTANT]
> Mặc định hệ thống sẽ tự động chuyển hướng mọi trang (trừ `/login`) về trang Đăng nhập nếu chưa xác thực tài khoản. Giám khảo có thể dùng các nút **Vào nhanh (Quick Login)** ở trang đăng nhập để kiểm thử nhanh mà không cần nhập tay.

---

## 2. Các Tính Năng Đã Phát Triển & Nâng Cấp (Features & Upgrades)

### 🔑 A. Đăng Nhập, Đăng Xuất & Bảo Vệ Tuyến Đường (Auth & Protection)
*   **Quản lý phiên đăng nhập:** Quản lý bởi `authSlice` (Redux) và lưu trạng thái ở `localStorage`.
*   **Bảo vệ Route (`ProtectedRoute`):** Yêu cầu đăng nhập trước khi xem Trang chủ, Giỏ hàng, Chi tiết, và Yêu thích.
*   **Phân quyền (Role-based Routing):** Phân chia vai trò rõ rệt:
    *   Tài khoản **Admin** (`admin` / `admin`): Có quyền vào trang quản lý kho hàng `/feature` và sửa sản phẩm.
    *   Tài khoản **Customer** (`customer` / `customer`): Bị chặn truy cập các trang quản trị (chuyển sang trang báo lỗi 403 `/unauthorized`).
*   **Đăng xuất an toàn:** Click Đăng xuất lập tức xóa phiên, tải lại giỏ hàng và đưa người dùng ra màn hình `/login`.

### 🛒 B. Giỏ Hàng & Tách Biệt Dữ Liệu Theo Tài Khoản
*   **Tách biệt giỏ hàng:** Khắc phục lỗi dùng chung giỏ hàng giữa các người dùng. Khi chuyển đổi tài khoản, giỏ hàng của `admin` (lưu ở `cart_admin`) và `customer` (lưu ở `cart_customer`) được tách biệt hoàn toàn.
*   **Thao tác giỏ hàng:** Tích hợp bộ đếm badge ở Navbar, tăng/giảm số lượng sản phẩm bằng nút bấm `+`/`-` và nút xóa khỏi giỏ hàng.

### 💳 C. Thanh Toán Đơn Hàng & Tích Hợp VietQR Quốc Gia
*   **Form thanh toán:** Nhập Họ tên, Số điện thoại và Địa chỉ nhận hàng.
*   **Tự động tạo VietQR động:** Khi chọn phương thức *Chuyển khoản ngân hàng*, hệ thống tự động tính toán tổng hóa đơn chuyển đổi sang VNĐ (tỷ giá 1 USD = 25,000đ) và tạo mã QR động theo tiêu chuẩn quốc gia qua public API của MB Bank (Chủ TK: `NGUYEN HUU PHUC`). Khi quét mã này bằng App ngân hàng, thông tin Số tài khoản, Số tiền, và Nội dung chuyển khoản (chứa Mã đơn hàng `ORD-XXXXXX`) sẽ tự động được điền chính xác.

### 🔍 D. Lọc Danh Mục, Sắp Xếp & Phân Trang (Pagination)
*   **Phân trang (Pagination):** Hiển thị tối đa 8 sản phẩm mỗi trang trên Trang chủ, hỗ trợ thanh chuyển trang ở chân trang.
*   **Lọc theo danh mục (Category Filter):** Phân loại sản phẩm qua thanh chọn tab (Tất cả, Điện tử, Trang sức, Thời trang Nam, Thời trang Nữ).
*   **Sắp xếp (Sorting):** Cho phép sắp xếp theo Giá (Thấp → Cao, Cao → Thấp) và Tên sản phẩm (A-Z).
*   **Giảm giá:** Hiển thị thẻ giảm giá 20% trên mỗi sản phẩm (do giá gốc được giả định bằng 125% giá hiện tại).

### 📝 E. Xác Thực Biểu Mẫu Chặt Chẽ (Form Validations)
*   **Login form:** Kiểm tra tên tài khoản và độ dài mật khẩu tối thiểu.
*   **Checkout form:** Xác minh tên (> 3 ký tự), số điện thoại Việt Nam hợp lệ (10 chữ số bắt đầu bằng các đầu số di động chuẩn), và địa chỉ (> 10 ký tự).
*   **Add/Edit Product form:** Xác minh giá gốc và giá khuyến mại phải là số dương, đồng thời giá khuyến mại không được lớn hơn giá gốc.

### 🔔 F. Hộp Thoại Custom Modal & Toast Tự Thiết Kế
*   **CustomModal.jsx:** Thay thế hoàn toàn các hộp thoại trình duyệt xấu xí (`alert`, `confirm`) bằng modal tối sang trọng của hệ thống (hỏi xác nhận khi Xóa sản phẩm, Xóa khỏi giỏ hàng, Đăng xuất).
*   **NotificationToast.jsx:** Hiển thị thông báo trôi nhỏ gọn, tự tắt sau 3 giây ở góc dưới khi thêm sản phẩm vào giỏ hàng thành công.

### ❤️ G. Trang Danh Sách Yêu Thích (Favorites Page)
*   **Trang Yêu thích riêng biệt `/favorites`:** Navbar có nút liên kết Yêu thích hiển thị số lượng. Click vào sẽ đưa người dùng tới trang lưu trữ các sản phẩm đã thả tim để xem và tương tác.

---

## 3. Ma Trận Đáp Ứng Chuẩn Đầu Ra (LO1 - LO8 Compliance Matrix)

| Outcome | Requirement Description | How It Is Implemented In This App / File Location |
|---|---|---|
| **LO1** | CRA & Git Setup | Khởi tạo qua Create React App (`react-scripts`). Tệp tin `ASSIGNMENT_GUIDE.md` hướng dẫn chi tiết cách chạy 5 lệnh Git commits để lưu vết lịch sử. |
| **LO2** | Class & Functional Components | Xây dựng [ProductCard.jsx](src/components/ProductCard.jsx) (Functional Component) và [ProductCardClass.jsx](src/components/ProductCardClass.jsx) (Class Component) để hiển thị dữ liệu động của sản phẩm. |
| **LO3** | JSX & ES6 rendering | Sử dụng các kỹ thuật JSX, arrow functions, destructuring và template literals xuyên suốt mã nguồn dự án. |
| **LO4** | Bootstrap & Custom CSS | Nhúng Bootstrap 5.3 CDN định dạng lưới, bảng biểu và navbar. Tùy biến hiệu ứng hover card sản phẩm bằng CSS thuần trong [App.css](src/App.css). |
| **LO5** | React Router (3 routes) | Thiết lập trong [App.js](src/App.js) với nhiều tuyến đường: Trang chủ (`/`), Quản lý kho (`/feature`), Giới thiệu (`/about`), Đăng nhập (`/login`), Giỏ hàng (`/cart`), Thanh toán (`/checkout`), Yêu thích (`/favorites`). |
| **LO6** | Hooks & Event handling | Dùng `useState` quản lý danh sách sản phẩm, bộ lọc danh mục, sắp xếp, phân trang, dữ liệu form nhập liệu và lỗi validation. Dùng `useEffect` gọi API bất đồng bộ. Bắt sự kiện `onSubmit` và `onClick`. |
| **LO7** | API Fetching & Lazy loading | Gọi API công khai `https://fakestoreapi.com/products` bằng `axios` xử lý tốt trạng thái tải trang/lỗi. Đồng thời lazy-load các tuyến đường trang qua `React.lazy` và `Suspense`. |
| **LO8** | Redux Global State | Sử dụng Redux Toolkit trong [store.js](src/store.js) quản lý danh sách yêu thích (Favorites), giỏ hàng (Cart) và phiên đăng nhập (Auth) đồng bộ trực tiếp với `localStorage`. |

---

## 4. Cấu Trúc Thư Mục Dự Án (Project Structure)

```text
product-store/
├── package.json             # Khai báo thư viện (Redux, Router, Axios...)
├── public/
│   └── index.html           # HTML gốc nhúng Bootstrap CDN & Icons
└── src/
    ├── api.js               # Cấu hình Axios instance gọi tới fakestoreapi.com
    ├── App.js               # Cấu hình Router, Navbar và global Modals / Toasts
    ├── App.css              # Custom styling (glassmorphism login, responsive grids, custom scrollbars)
    ├── index.js             # Nhúng Redux Provider
    ├── store.js             # Redux store (authSlice, cartSlice, favoritesSlice, toastSlice)
    ├── components/
    │   ├── ProductCard.jsx      # Functional card component
    │   ├── ProductCardClass.jsx # Class card component (LO2)
    │   ├── AddProductForm.jsx   # Form thêm sản phẩm nằm ngang (có input ảnh & validate)
    │   ├── ProtectedRoute.jsx   # Route wrapper chặn đăng nhập và kiểm tra phân quyền Admin/Customer
    │   ├── CustomModal.jsx      # Modal thông báo và xác nhận tùy biến thay cho browser popups
    │   └── NotificationToast.jsx # Toast thông báo góc phải dưới màn hình tự động ẩn sau 3 giây
    └── pages/
        ├── Home.jsx             # Trang chủ chứa bộ lọc danh mục, sắp xếp, tìm kiếm và phân trang
        ├── ProductList.jsx      # Trang quản lý kho của Admin (Bảng danh sách xóa)
        ├── ProductDetail.jsx    # Trang chi tiết sản phẩm và mô tả thông số
        ├── EditProduct.jsx      # Trang sửa thông số sản phẩm (chỉ dành cho Admin, có validate)
        ├── Cart.jsx             # Giỏ hàng với nút tăng giảm số lượng
        ├── Checkout.jsx         # Form thanh toán và mã QR VietQR chuyển khoản tự động
        ├── Favorites.jsx        # Trang danh sách sản phẩm yêu thích của người dùng
        ├── About.jsx            # Thông tin sinh viên & ma trận LO
        └── Unauthorized.jsx     # Trang báo lỗi 403 từ chối quyền truy cập của Customer
```

---

## 5. Minh Bạch Tài Nguyên (Resource Transparency)
*   **API:** Sử dụng Public REST API phi thương mại miễn phí từ [FakeStoreAPI](https://fakestoreapi.com).
*   **VietQR:** Sử dụng ảnh sinh nhanh từ cổng công nghệ VietQR quốc gia [VietQR.io](https://vietqr.io).
*   **Giấy phép:** Mã nguồn tự viết bởi sinh viên phục vụ mục đích học tập môn FER202.
