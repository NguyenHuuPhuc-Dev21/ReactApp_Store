# BẢNG 1: Nhật ký sử dụng AI (AI_AUDIT_LOG)
*Ghi mỗi lần dùng AI vào 1 dòng. Mức hỗ trợ: Low = AI gợi ý nhỏ | Medium = AI gợi ý thiết kế, sửa lỗi | High = AI gợi ý khung cấu trúc lớn*

| Ngày (*) | TV (*) | Công cụ AI (*) | Mục đích sử dụng (*) | File ảnh hưởng | Mức hỗ trợ (*) | Đã chỉnh sửa gì? | Kiểm chứng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 14/07/2026 | Nguyễn Hữu Phúc | Antigravity (Gemini) | Tư vấn thiết kế cấu trúc dự án đáp ứng LO1-LO8 | `src/App.js`, `src/index.js`, `src/store.js`, `src/App.css` | **High** | Nhận gợi ý từ AI về cấu trúc thư mục chuẩn CRA, mô hình phân chia Redux Slice và cách cấu hình định tuyến kết hợp Lazy Loading. | Dự án khởi động ổn định, các route chính phụ hoạt động bình thường. |
| 15/07/2026 | Nguyễn Hữu Phúc | Antigravity (Gemini) | Tham khảo cách tối giản hóa Redux Store | `src/store.js`, `src/App.js` | **Medium** | Nhận hướng dẫn tinh giản Redux Store từ giỏ hàng sang danh sách Favorites IDs đơn giản, hiển thị đếm số lượng trên Navbar. | State yêu thích cập nhật ngay lập tức khi bấm chọn sản phẩm. |
| 17/07/2026 | Nguyễn Hữu Phúc | Antigravity (Gemini) | Hỗ trợ cấu trúc CSS và định dạng layout Bootstrap | `src/pages/Home.jsx`, `src/pages/ProductList.jsx`, `src/components/AddProductForm.jsx`, `src/components/ProductCard.jsx`, `src/App.css` | **Medium** | Tham khảo gợi ý về cách chia cột grid Bootstrap, các thuộc tính CSS cho hiệu ứng hover card sản phẩm và form nằm ngang. | Giao diện hiển thị cân đối trên cả điện thoại và máy tính, giống bản vẽ mẫu. |
| 20/07/2026 | Nguyễn Hữu Phúc | Antigravity (Gemini) | Tư vấn chuyển đổi nguồn dữ liệu sang FakeStoreAPI | `src/api.js`, `src/components/ProductCard.jsx`, `src/pages/Home.jsx`, `src/pages/ProductList.jsx` | **High** | Nhận giải pháp ánh xạ dữ liệu trực tuyến (USD, URL ảnh) và phương án đồng bộ danh sách sản phẩm trong State khi gọi POST/DELETE. | Dữ liệu sản phẩm hiển thị đầy đủ trực tuyến, các chức năng thêm/xóa đồng bộ lập tức trên UI. |

---

# BẢNG 2: Nhật ký thay đổi project (CHANGELOG)
*Added = thêm mới | Changed = cải tiến | Fixed = sửa lỗi | Removed = xóa bỏ*

### Added — Thêm mới
| TV (*) | Mô tả thay đổi (*) | File liên quan | Ghi chú |
| :--- | :--- | :--- | :--- |
| Nguyễn Hữu Phúc | Khởi tạo cấu trúc dự án React App bằng Create React App skeleton | `package.json`, `public/index.html`, `src/index.js` | LO1 |
| Nguyễn Hữu Phúc | Tạo cấu trúc Redux Store quản lý trạng thái Yêu thích (Favorites) toàn cục | `src/store.js` | LO8 |
| Nguyễn Hữu Phúc | Xây dựng Class Component `ProductCardClass` để hiển thị card sản phẩm nổi bật | `src/components/ProductCardClass.jsx` | LO2 |
| Nguyễn Hữu Phúc | Thiết kế Form thêm sản phẩm nằm ngang theo thiết kế mẫu | `src/components/AddProductForm.jsx` | LO6 |
| Nguyễn Hữu Phúc | Viết tài liệu hướng dẫn sinh viên nộp bài và lộ trình phân nhánh Git | `ASSIGNMENT_GUIDE.md`, `GIT_WORKFLOW.md` | LO1 |

### Changed — Cải tiến
| TV (*) | Mô tả thay đổi (*) | File liên quan | Ghi chú |
| :--- | :--- | :--- | :--- |
| Nguyễn Hữu Phúc | Chuyển baseURL của Axios kết nối đến FakeStoreAPI công khai trực tuyến | `src/api.js` | LO7 |
| Nguyễn Hữu Phúc | Cập nhật App.js hỗ trợ định tuyến, lazy-loading với Suspense và Badge đếm Favorites | `src/App.js` | LO5, LO7, LO8 |
| Nguyễn Hữu Phúc | Tái cấu trúc trang Home chứa thanh tìm kiếm động và lưới sản phẩm card trắng trên nền tối | `src/pages/Home.jsx`, `src/components/ProductCard.jsx` | LO4, LO6 |
| Nguyễn Hữu Phúc | Điều chỉnh trang ProductList chứa đồng thời form thêm sản phẩm ngang và bảng danh sách Delete | `src/pages/ProductList.jsx` | LO6 |
| Nguyễn Hữu Phúc | Hoàn thiện file README.md ghi nhận ma trận đáp ứng 8 chuẩn đầu ra LO | `README.md` | Minh bạch tài nguyên |

### Fixed — Sửa lỗi
| TV (*) | Mô tả thay đổi (*) | File liên quan | Ghi chú |
| :--- | :--- | :--- | :--- |
| Nguyễn Hữu Phúc | Sửa đổi nhãn điều hướng từ "Add Product" thành "Main Feature" trên thanh Navbar | `src/App.js` | Đáp ứng LO5 |
| Nguyễn Hữu Phúc | Khắc phục vấn đề không lưu dữ liệu của FakeStoreAPI bằng cách đồng bộ hóa thủ công với React State | `src/pages/ProductList.jsx` | LO6 |

### Removed — Xóa bỏ
| TV (*) | Mô tả thay đổi (*) | File liên quan | Ghi chú |
| :--- | :--- | :--- | :--- |
| Nguyễn Hữu Phúc | Xóa bỏ liên kết điều hướng "Feature" cũ và gỡ các tính năng thống kê giá trung bình phức tạp | `src/App.js`, `src/pages/Home.jsx` | Tối giản hóa code |

---

# BẢNG 3: Nhật ký Prompt AI (PROMPTS)
*Mỗi prompt quan trọng ghi 1 block gồm 4 dòng. Ghi rõ prompt đã dùng, kết quả, cách nhóm sử dụng, và kiểm chứng.*

### Prompt #1
*   **Prompt #1** | **TV:** Nguyễn Hữu Phúc | **Công cụ AI:** Antigravity (Gemini)
*   **Prompt đã dùng (nguyên văn) (*):**
    > "Tôi đang làm Assignment môn FER202 xây dựng một E-Store. Hãy tư vấn giúp tôi cấu trúc thư mục React và các giải pháp kỹ thuật phù hợp để đáp ứng đầy đủ 8 chuẩn đầu ra LO1-LO8 (cụ thể là cách cấu hình Redux Store, React Router lazy loading và thiết kế Class/Functional Component)."
*   **Kết quả AI trả về và vấn đề gặp phải:** AI đưa ra sơ đồ thư mục khuyến nghị, định hình các tệp tin lưu trữ Redux store, cấu trúc route động và gợi ý các bước triển khai tuần tự từ nền tảng.
*   **Nhóm đã chỉnh sửa / sử dụng như thế nào:** Tiếp thu cấu trúc gợi ý, tạo các thư mục components, pages, store.js và tiến hành cài đặt các package bổ sung.
*   **Kiểm chứng (test pass/fail, kết quả đúng không):** Pass. Khung sườn ứng dụng React hoạt động ổn định, cấu hình import thư viện không xảy ra xung đột.

### Prompt #2
*   **Prompt #2** | **TV:** Nguyễn Hữu Phúc | **Công cụ AI:** Antigravity (Gemini)
*   **Prompt đã dùng (nguyên văn) (*):**
    > "Ứng dụng hiện tại đang tích hợp hệ thống giỏ hàng và thống kê dữ liệu khá phức tạp, vượt quá yêu cầu cơ bản của môn học. Hãy hướng dẫn tôi cách đơn giản hóa Redux Store chỉ tập trung quản lý danh sách yêu thích (Favorites) và hiển thị đếm số lượng trên Navbar để bám sát barem điểm."
*   **Kết quả AI trả về và vấn đề gặp phải:** AI gợi ý code cấu hình slice Redux rút gọn (chỉ quản lý mảng ID) và cách sử dụng useSelector lấy dữ liệu độ dài mảng hiển thị lên Navbar.
*   **Nhóm đã chỉnh sửa / sử dụng như thế nào:** Viết lại tệp store.js dựa trên gợi ý, kết nối các sự kiện kích hoạt toggleFavorite từ card sản phẩm.
*   **Kiểm chứng (test pass/fail, kết quả đúng không):** Pass. Số lượng yêu thích hiển thị chính xác và thay đổi ngay lập tức khi click trái tim yêu thích.

### Prompt #3
*   **Prompt #3** | **TV:** Nguyễn Hữu Phúc | **Công cụ AI:** Antigravity (Gemini)
*   **Prompt đã dùng (nguyên văn) (*):**
    > "Tôi muốn thiết kế lại giao diện theo bản vẽ mẫu: Trang chủ nền tối chứa thanh tìm kiếm lọc sản phẩm động và lưới card trắng; Trang Main Feature chứa form nhập nằm ngang nền tối và bảng hiển thị có nút Delete. Hãy gợi ý class Bootstrap và cấu trúc CSS tùy biến phù hợp."
*   **Kết quả AI trả về và vấn đề gặp phải:** AI cung cấp các class Bootstrap phù hợp (như row-cols, input-group, table-responsive) và viết đoạn mã CSS mẫu cho hiệu ứng hover shadow của thẻ Card.
*   **Nhóm đã chỉnh sửa / sử dụng như thế nào:** Áp dụng lưới Bootstrap, căn lề form nhập ngang theo tỉ lệ nhãn 15% - ô nhập 85%, bổ sung hiệu ứng hover nhô card trong tệp App.css.
*   **Kiểm chứng (test pass/fail, kết quả đúng không):** Pass. Giao diện trang chủ và trang thêm/xóa sản phẩm hiển thị chuẩn xác, cân đối theo đúng tỉ lệ ảnh vẽ mẫu.

### Prompt #4
*   **Prompt #4** | **TV:** Nguyễn Hữu Phúc | **Công cụ AI:** Antigravity (Gemini)
*   **Prompt đã dùng (nguyên văn) (*):**
    > "Tôi muốn thay đổi nguồn dữ liệu của ứng dụng từ local json-server sang public trực tuyến của FakeStoreAPI. Hãy hướng dẫn Tôi cách ánh xạ các trường dữ liệu mẫu (title, price USD, image) và giải pháp xử lý đồng bộ giao diện khi gửi POST/DELETE lên API công khai này."
*   **Kết quả AI trả về và vấn đề gặp phải:** AI hướng dẫn cấu hình api.js trỏ sang fakestoreapi.com, cách tính toán giá gốc chênh lệch (+25%) trực tuyến để giữ bố cục cũ, và cách cập nhật local state song song khi gọi API để giao diện phản hồi thay đổi lập tức.
*   **Nhóm đã chỉnh sửa / sử dụng như thế nào:** Cập nhật tệp card và bảng, định dạng tiền tệ USD, viết hàm xử lý thêm/xóa cập nhật trực tiếp vào State mảng sản phẩm.
*   **Kiểm chứng (test pass/fail, kết quả đúng không):** Pass. Tải thành công danh sách thời trang, trang sức từ API trực tuyến. Các thao tác thêm mới và xóa cập nhật trực quan tức thì trên màn hình.

