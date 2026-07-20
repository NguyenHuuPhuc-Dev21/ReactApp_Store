# HƯỚNG DẪN HOÀN THÀNH ASSIGNMENT: PRODUCT CATALOG APP
## Môn học: FER202 - ReactJS | FPT University

Tài liệu này hướng dẫn chi tiết cách chạy ứng dụng, cấu trúc mã nguồn và cách giải thích việc đáp ứng **8 Chuẩn đầu ra (LO1 - LO8)** trong bài nộp Assignment của bạn dựa trên dữ liệu gọi từ API công khai **FakeStoreAPI**.

---

## 1. Hướng dẫn cài đặt và khởi chạy ứng dụng

Để chạy được ứng dụng này, bạn cần cài đặt **Node.js** trên máy tính.

### Bước 1: Cài đặt các thư viện cần thiết
Mở terminal tại thư mục dự án (`laptop-store`) và chạy lệnh sau để tải các package:
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

## 2. Cấu trúc thư mục mã nguồn

```text
laptop-store/
├── package.json             # Khai báo các thư viện (Redux, Router, Axios...)
├── public/
│   └── index.html           # File HTML gốc (đã nhúng Bootstrap 5.3 CDN)
└── src/
    ├── api.js               # Cấu hình Axios instance gọi trực tiếp đến fakestoreapi.com
    ├── App.js               # Cấu hình Routing, Navbar điều hướng và Redux badge
    ├── App.css              # Custom CSS (chứa lớp hover hiệu ứng di chuột của Card sản phẩm)
    ├── index.js             # File entry point, bao bọc App bằng Redux Provider
    ├── store.js             # Cấu hình Redux Store quản lý trạng thái Yêu thích (Favorites)
    ├── components/
    │   ├── ProductCard.jsx      # Functional Component hiển thị sản phẩm dạng card
    │   ├── ProductCardClass.jsx # Class Component hiển thị sản phẩm nổi bật (đáp ứng LO2)
    │   └── AddProductForm.jsx   # Form thêm sản phẩm nằm ngang (Ảnh mẫu 3)
    └── pages/
        ├── Home.jsx             # Trang chủ (/) chứa danh sách grid card trắng và thanh tìm kiếm
        ├── ProductList.jsx      # Trang tính năng chính (/feature) gồm Form thêm và bảng danh sách Delete
        ├── ProductDetail.jsx    # Trang xem chi tiết sản phẩm (/feature/:id) gồm nút Back Home và Edit
        └── About.jsx            # Trang giới thiệu (/about) thông tin sinh viên và ma trận LO
```

---

## 3. Giải thích chi tiết cách ứng dụng đáp ứng LO1 - LO8

Dưới đây là phần hướng dẫn viết báo cáo hoặc điền vào file `README.md` của bạn để chứng minh với giảng viên rằng bài làm đáp ứng hoàn hảo các yêu cầu:

###  LO1: Khởi tạo dự án & Sử dụng Git quản lý phiên bản (Tối thiểu 5 Commits)
*   **Cách kiểm tra:** Dự án được tạo bằng bộ khung `create-react-app`. Bạn cần khởi tạo Git và thực hiện các commit trong quá trình làm bài.
*   **Hướng dẫn chạy lệnh Git để tạo lịch sử 5 commits:**
    1.  Khởi tạo Git: `git init`
    2.  Tạo commit 1 (Khởi tạo dự án):
        ```bash
        git add .
        git commit -m "LO1: Initialize React project skeleton"
        ```
    3.  Tạo commit 2 (Thêm các trang Home, About, ProductList):
        ```bash
        git add src/pages/
        git commit -m "LO5: Set up React Router and page layouts"
        ```
    4.  Tạo commit 3 (Xây dựng Class & Functional ProductCard):
        ```bash
        git add src/components/
        git commit -m "LO2: Create Class and Functional components for ProductCard"
        ```
    5.  Tạo commit 4 (Tích hợp public API FakeStoreAPI):
        ```bash
        git add src/api.js src/pages/Home.jsx
        git commit -m "LO7: Fetch products from public FakeStoreAPI via Axios"
        ```
    6.  Tạo commit 5 (Tích hợp Redux Toolkit quản lý yêu thích):
        ```bash
        git add src/store.js src/index.js
        git commit -m "LO8: Implement Redux Toolkit for global Favorites state"
        ```

### LO2: Xây dựng Component tái sử dụng dưới cả dạng Class và Functional
*   **Vị trí mã nguồn:**
    *   Functional Component: [ProductCard.jsx](src/components/ProductCard.jsx)
    *   Class Component: [ProductCardClass.jsx](src/components/ProductCardClass.jsx)
*   **Cách hoạt động:** Trên giao diện danh sách chính (Trang chủ `/`), sản phẩm đầu tiên được chỉ định hiển thị bằng Class Component (`ProductCardClass.jsx` có nhãn màu vàng "Class UI" nổi bật), các sản phẩm tiếp theo hiển thị bằng Functional Component (`ProductCard.jsx` có nhãn màu đỏ "Favorites" để chọn). Class Component cũng thực hiện ghi log vòng đời ra Console trình duyệt để chứng minh.

### LO3: Sử dụng JSX và ES6 (Arrow functions, Template literals, Destructuring)
*   **Chi tiết kỹ thuật:**
    *   *Arrow functions:* Khai báo Component và các hàm xử lý sự kiện bất đồng bộ.
    *   *Template literals:* Sử dụng để tạo đường dẫn động chi tiết sản phẩm: ``to={`/feature/${id}`}`` và giá sản phẩm hiển thị dạng USD: `` `${price.toFixed(2)}` ``.
    *   *Destructuring:* Trích xuất các thuộc tính từ API trả về: `const { id, title, description, price, image } = product;`

### LO4: Định dạng giao diện bằng Bootstrap & Tùy biến CSS riêng
*   **Chi tiết kỹ thuật:**
    *   Sử dụng lưới Bootstrap (`row row-cols-1 row-cols-md-4 g-4`), các component Form, Table, Badge, Button, Navbar của Bootstrap để tạo giao diện.
    *   Tùy biến một component cụ thể bằng CSS thuần: Lớp `.product-card:hover` trong `App.css` định nghĩa hiệu ứng bóng đổ viền xanh dương và nhô lên khi di chuột qua.

### LO5: Thiết lập React Router với tối thiểu 3 Routes chính
*   **Vị trí mã nguồn:** Cấu hình Routes trong [App.js](src/App.js).
*   **Chi tiết kỹ thuật:**
    1.  Trang chủ: `/` (Home) chứa danh sách sản phẩm và thanh tìm kiếm lọc sản phẩm.
    2.  Trang tính năng chính (Main Feature): `/feature` để thêm và xóa danh sách sản phẩm.
    3.  Trang giới thiệu: `/about` (About) ghi thông tin cá nhân và ma trận LO.
    Tuyến đường xem chi tiết `/feature/:id` và sửa `/products/:id/edit` cũng được khai báo đầy đủ.

### LO6: Sử dụng useState và useEffect cho các tính năng tương tác & Sự kiện
*   **Chi tiết kỹ thuật:**
    *   `useState` được dùng quản lý danh sách sản phẩm, thanh tìm kiếm lọc sản phẩm động, các ô nhập form thêm mới sản phẩm và thông báo lỗi.
    *   `useEffect` được dùng để tự động gọi API lấy danh sách sản phẩm khi trang vừa được mở hoặc khi tham số `id` thay đổi.
    *   Sự kiện: Bắt các sự kiện `onSubmit` của Form nhập liệu và `onClick` của nút Xóa (có xác nhận `window.confirm`).

### LO7: Kết nối API công khai, hiển thị Loading/Error & Tải chậm (Lazy-load / Suspense)
*   **Chi tiết kỹ thuật:**
    *   Sử dụng `axios` gọi trực tuyến tới `https://fakestoreapi.com/products` bất đồng bộ (Async/Await) để tải dữ liệu thực tế. Hiển thị spinner khi tải dữ liệu hoặc lỗi kết nối.
    *   Sử dụng `React.lazy()` và `<React.Suspense>` trong `App.js` để lazy-load các trang `/feature` và `/about` giúp tối ưu tài nguyên tải ban đầu.

### LO8: Sử dụng Redux quản lý trạng thái toàn cục & Hiển thị tóm tắt trên Navbar
*   **Chi tiết kỹ thuật:**
    *   Redux store lưu danh sách ID các sản phẩm yêu thích (Favorites). Khi bấm nút Trái tim trên card sản phẩm, ứng dụng dispatches action `toggleFavorite` để lưu/xóa khỏi giỏ yêu thích.
    *   Navbar lấy số lượng yêu thích bằng `useSelector` và hiển thị tóm tắt ở góc phải Navbar dạng: `Favorites: [số lượng]`.

---
