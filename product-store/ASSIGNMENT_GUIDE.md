# HƯỚNG DẪN HOÀN THÀNH ASSIGNMENT: PRODUCT CATALOG APP
## Môn học: FER202 - ReactJS | FPT University

Tài liệu này hướng dẫn chi tiết cách chạy ứng dụng, cấu trúc mã nguồn nâng cấp và cách giải thích việc đáp ứng **8 Chuẩn đầu ra (LO1 - LO8)** trong bài nộp Assignment của bạn dựa trên dữ liệu gọi từ API công khai **FakeStoreAPI**.

---

## 1. Hướng dẫn cài đặt và khởi chạy ứng dụng

Để chạy được ứng dụng này, bạn cần cài đặt **Node.js** trên máy tính.

### Bước 1: Cài đặt các thư viện cần thiết
Mở terminal tại thư mục dự án và chạy lệnh sau để tải các package:
```bash
npm install
```

### Bước 2: Chạy ứng dụng
Do dự án kết nối trực tiếp với API trực tuyến công khai FakeStoreAPI, bạn **không cần chạy json-server (cơ sở dữ liệu ở local) nữa**. Chỉ cần chạy lệnh sau để khởi chạy React:
```bash
npm start
```
Truy cập trình duyệt tại: **http://localhost:3000** để trải nghiệm.

---

## 2. Cấu trúc thư mục mã nguồn nâng cấp

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

## 3. Cách trình bày các tính năng thương mại điện tử nổi bật

Khi được giảng viên vấn đáp, hãy nhấn mạnh các nâng cấp nâng cao của dự án:

1.  **Phân quyền truy cập tài khoản:**
    *   Hệ thống tự động bảo vệ tất cả các trang. Nếu chưa đăng nhập, người dùng cố tình vào bất kỳ trang nào đều bị chuyển hướng về `/login`.
    *   Tài khoản `customer` không được phép vào quản lý kho `/feature`. Khi cố tình truy cập, trang báo lỗi `403 Unauthorized` sẽ hiển thị để ngăn cản. Chỉ tài khoản `admin` mới có quyền xem trang này.
2.  **Giỏ hàng theo tài khoản (LocalStorage isolation):**
    *   Dữ liệu giỏ hàng được đồng bộ riêng với từng tài khoản trong local storage (`cart_admin` và `cart_customer`). Khi admin đăng xuất và customer đăng nhập, giỏ hàng sẽ thay đổi tương ứng mà không bị đè hay trùng lắp sản phẩm của nhau.
3.  **Tích hợp mã thanh toán VietQR động:**
    *   Đơn hàng thanh toán bằng chuyển khoản ngân hàng sẽ sinh mã VietQR chuẩn MB Bank chứa đầy đủ số tiền chuyển đổi sang VNĐ (tỷ giá 1 USD = 25,000đ), tên chủ tài khoản và nội dung chuyển khoản chứa mã đơn hàng `ORD-XXXXXX`. Giúp người mua quét nhanh không cần nhập tay.
4.  **Hộp thoại Custom Modals & Toasts:**
    *   Hệ thống không sử dụng hộp thoại mặc định của trình duyệt (`alert` hay `confirm` thông thường). Tất cả các thông báo thêm hàng thành công được hiển thị bằng toast nhỏ tự tắt sau 3 giây ở góc dưới. Các hành động nguy hiểm như Xóa sản phẩm khỏi kho, Xóa khỏi giỏ hàng, Đăng xuất đều hiển thị Custom Modal thiết kế chuyên biệt có nút Xác nhận / Hủy bỏ rõ ràng.
5.  **Bản đồ E-commerce đầy đủ:**
    *   Trang chủ hỗ trợ phân trang (8 sản phẩm một trang), lọc theo các danh mục API cung cấp, và sắp xếp theo giá cả hoặc tên A-Z.
    *   Trang yêu thích `/favorites` hiển thị riêng những sản phẩm người dùng đã thả tim từ trang chủ.

---

## 4. Giải thích cách ứng dụng đáp ứng LO1 - LO8

### LO1: Khởi tạo dự án & Sử dụng Git quản lý phiên bản
*   **Chi tiết:** Dự án được tạo bằng Create React App. Các commit được thực hiện tuần tự để ghi nhận lịch sử các giai đoạn phát triển (khởi tạo, router, components, api, redux).

### LO2: Xây dựng Component dưới cả dạng Class và Functional
*   **Vị trí:**
    *   Functional Component: [ProductCard.jsx](src/components/ProductCard.jsx)
    *   Class Component: [ProductCardClass.jsx](src/components/ProductCardClass.jsx)
*   **Chi tiết:** Để chứng minh tính tương thích, sản phẩm đầu tiên trên trang chủ luôn được hiển thị bằng Class Component (có nhãn màu vàng "Class UI"), các sản phẩm sau hiển thị bằng Functional Component. Class component có ghi console log vòng đời `componentDidMount` và `componentWillUnmount`.

### LO3: Sử dụng JSX và ES6 (Arrow functions, Template literals, Destructuring)
*   **Chi tiết:**
    *   *Arrow functions:* Khai báo components và các hàm xử lý.
    *   *Template literals:* Tạo các URL ảnh VietQR động và đường dẫn router chi tiết sản phẩm.
    *   *Destructuring:* Trích xuất payload trong Redux slices và trường dữ liệu từ API.

### LO4: Định dạng giao diện bằng Bootstrap & Tùy biến CSS riêng
*   **Chi tiết:** Nhúng Bootstrap 5.3 CDN định dạng lưới, bảng biểu, form và navbar. Tùy biến CSS trong `App.css` cho giao diện glassmorphic đăng nhập, scrollbar và hiệu ứng hover card sản phẩm nổi bật.

### LO5: Thiết lập React Router với tối thiểu 3 Routes chính
*   **Chi tiết:** Khai báo các tuyến đường trong `App.js`. Bao gồm Trang chủ, Kho hàng, Giới thiệu, Đăng nhập, Giỏ hàng, Thanh toán, Danh sách yêu thích.

### LO6: Sử dụng useState và useEffect cho các tính năng tương tác
*   **Chi tiết:** `useState` quản lý dữ liệu lọc danh mục, sắp xếp, trang hiện tại, form input và errors validation. `useEffect` tự động gọi API lấy sản phẩm hoặc đếm ngược ẩn Toast.

### LO7: Kết nối API công khai, hiển thị Loading/Error & Tải chậm (Lazy-load / Suspense)
*   **Chi tiết:** Gọi API FakeStoreAPI qua `axios`. Hiển thị spinner khi đang tải trang. Sử dụng `React.lazy` và `Suspense` tải chậm các module trang lớn để tối ưu hiệu năng.

### LO8: Sử dụng Redux quản lý trạng thái toàn cục & Hiển thị tóm tắt trên Navbar
*   **Chi tiết:** Sử dụng Redux Toolkit (`store.js`) quản lý 4 trạng thái toàn cục: Yêu thích (`favorites`), Giỏ hàng (`cart`), Xác thực tài khoản (`auth`), và Thông báo trôi (`toast`). Navbar lấy dữ liệu qua `useSelector` hiển thị số lượng giỏ hàng và yêu thích động ở góc phải.
