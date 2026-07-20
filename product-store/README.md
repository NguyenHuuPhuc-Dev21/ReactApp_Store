# Custom React Web Application - Product Directory App
## Course: FER202 ReactJS | Student Submission

Ứng dụng ReactJS hoàn chỉnh đáp ứng đầy đủ và bám sát các chuẩn đầu ra **LO1 - LO8** của môn học FER202, kết nối trực tiếp với API công khai **FakeStoreAPI**.

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

---

## 2. Ý Tưởng Dự Án (App Concept)
Ứng dụng quản lý danh mục sản phẩm (Product Catalog Directory) kết nối trực tiếp tới public API `https://fakestoreapi.com/products` để tải danh sách các sản phẩm (quần áo, đồ điện tử, trang sức...).
*   **Trang chủ (`/`):** Hiển thị bộ lưới card màu trắng trên nền tối (Screenshot 1) kèm thanh tìm kiếm động. Khi tìm kiếm không khớp sẽ xuất hiện thông báo *"No products found."* (Screenshot 2).
*   **Trang tính năng chính (`/feature`):** Chứa form thêm sản phẩm nằm ngang nền tối (Screenshot 3) và bảng danh sách bên dưới hỗ trợ thao tác Xóa (Screenshot 4).
*   **Trang chi tiết (`/feature/:id`):** Xem thông số sản phẩm kèm nút quay lại trang chủ và nút sửa thông tin (chuyển sang trang Edit).

---

## 3. Ma Trận Đáp Ứng Chuẩn Đầu Ra (LO1 - LO8 Compliance Matrix)

| Outcome | Requirement Description | How It Is Implemented In This App / File Location |
|---|---|---|
| **LO1** | CRA & Git Setup | Khởi tạo qua Create React App (`react-scripts`). Tệp tin `ASSIGNMENT_GUIDE.md` hướng dẫn chi tiết cách chạy 5 lệnh Git commits để lưu vết lịch sử. |
| **LO2** | Class & Functional Components | Xây dựng [ProductCard.jsx](src/components/ProductCard.jsx) (Functional Component) và [ProductCardClass.jsx](src/components/ProductCardClass.jsx) (Class Component) để cùng hiển thị dữ liệu động của sản phẩm. |
| **LO3** | JSX & ES6 rendering | Sử dụng các kỹ thuật JSX, arrow functions, destructuring và template literals xuyên suốt mã nguồn dự án. |
| **LO4** | Bootstrap & Custom CSS | Nhúng Bootstrap 5.3 CDN định dạng lưới, bảng biểu và navbar. Tùy biến hiệu ứng hover card sản phẩm bằng CSS thuần trong [App.css](src/App.css). |
| **LO5** | React Router (3 routes) | Thiết lập trong [App.js](src/App.js) với 3 tuyến đường: Trang chủ (`/`), Thêm sản phẩm (`/feature` - được đặt tên nhãn Add Product trên navbar), và Giới thiệu (`/about`). |
| **LO6** | Hooks & Event handling | Dùng `useState` để bắt giá trị thanh tìm kiếm, dữ liệu form nhập liệu và lỗi. Dùng `useEffect` gọi API bất đồng bộ. Bắt sự kiện `onSubmit` và `onClick`. |
| **LO7** | API Fetching & Lazy loading | Gọi API công khai `https://fakestoreapi.com/products` bằng `axios` xử lý tốt trạng thái tải trang/lỗi. Đồng thời lazy-load các tuyến đường trang qua `React.lazy` và `Suspense`. |
| **LO8** | Redux Global State | Sử dụng Redux Toolkit trong [store.js](src/store.js) quản lý danh sách yêu thích (Favorites). Khi người dùng nhấn nút Trái tim yêu thích, số lượng sẽ cập nhật lên Navbar. |

---

## 4. Cấu Trúc Thư Mục Dự Án (Project Structure)

```text
laptop-store/
├── package.json             # Khai báo thư viện (Redux, Router, Axios...)
├── public/
│   └── index.html           # HTML gốc nhúng Bootstrap CDN
└── src/
    ├── api.js               # Cấu hình Axios instance gọi tới fakestoreapi.com
    ├── App.js               # Cấu hình Router và Navbar hiển thị Redux Badge
    ├── App.css              # Tùy biến hover card sản phẩm
    ├── index.js             # Nhúng Redux Provider
    ├── store.js             # Redux store và favoritesSlice
    ├── components/
    │   ├── ProductCard.jsx      # Functional card component
    │   ├── ProductCardClass.jsx # Class card component (LO2)
    │   └── AddProductForm.jsx   # Form thêm sản phẩm nằm ngang (Ảnh 3)
    └── pages/
        ├── Home.jsx             # Grid sản phẩm kèm ô tìm kiếm (Ảnh 1 & 2)
        ├── ProductList.jsx      # Trang Add Product dạng bảng (Ảnh 4)
        ├── ProductDetail.jsx    # Trang chi tiết sản phẩm
        └── About.jsx            # Thông tin sinh viên & ma trận LO
```

---

## 5. Minh Bạch Tài Nguyên (Resource Transparency)
*   **API:** Sử dụng Public REST API phi thương mại miễn phí từ [FakeStoreAPI](https://fakestoreapi.com).
*   **Giao diện:** Thiết kế tùy biến dựa trên Bootstrap 5.3 và biểu tượng Bootstrap Icons.
*   **Giấy phép:** Mã nguồn tự viết bởi sinh viên phục vụ mục đích học tập môn FER202.
