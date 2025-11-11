<h1 align="center">ỨNG DỤNG AI GỢI Ý PHÒNG TRỌ CHO SINH VIÊN</h1> <div align="center"> <p align="center"> <img src="https://raw.githubusercontent.com/anhminhvdvn/CanhBaoDotNhap/main/images/logoDaiNam.png" width="150"> </p> <br>




</br> </div>

## 🌟 Giới thiệu

Đây là một hệ thống web/ứng dụng đơn giản nhằm mục đích sử dụng logic gợi ý (AI/thuật toán) để đề xuất phòng trọ phù hợp nhất cho sinh viên dựa trên các tiêu chí cá nhân (ngân sách, vị trí, tiện ích, v.v.).

Dự án được triển khai với kiến trúc cơ bản gồm Node.js cho Backend và giao diện người dùng thuần HTML/CSS/JS.

## ⚙️ Mục tiêu

  - Áp dụng các thuật toán đơn giản trong tệp **`suggest.js`** để thực hiện chức năng gợi ý.
  - Xây dựng giao diện tìm kiếm và hiển thị kết quả phòng trọ dễ sử dụng.
  - Phân tích dữ liệu phòng trọ trong **`data.json`** để tối ưu hóa gợi ý.

-----

## 📂 Cấu trúc Dự án

Dự án được tổ chức theo cấu trúc tệp sau:

```
AI_GoiY_PhongTro/
├── node_modules/       # Thư mục chứa các thư viện Node.js (cài đặt khi chạy npm install).
├── README.md           # Tài liệu này.
├── data.json           # Dữ liệu đầu vào: Danh sách các phòng trọ.
├── index.html          # Giao diện người dùng (Frontend).
├── package-lock.json   # Khóa gói để đảm bảo phiên bản phụ thuộc thống nhất.
├── package.json        # Định nghĩa dự án và liệt kê các gói phụ thuộc (Express, v.v.).
├── scrips.js           # JavaScript xử lý tương tác giao diện và gọi API.
├── server.js           # Máy chủ Node.js/Express (Backend API).
├── style.css           # CSS định dạng giao diện.
└── suggest.js          # **Logic AI/Thuật toán Gợi ý.**
```

### 🧠 Vai trò chính của các Tệp

| Tệp | Mô tả |
| :--- | :--- |
| **`server.js`** | Khởi chạy máy chủ API, xử lý các yêu cầu như `/api/get-rooms` và `/api/suggest-room`. |
| **`suggest.js`** | **Tệp cốt lõi của đề tài.** Chứa các hàm nhận dữ liệu phòng trọ và tiêu chí sinh viên, sau đó trả về danh sách phòng trọ được sắp xếp theo độ phù hợp. |
| **`data.json`** | Chứa danh sách các đối tượng phòng trọ (ví dụ: `id`, `price`, `area`, `distance_to_university`, `utilities`). |
| **`index.html`** | Hiển thị form để sinh viên nhập ngân sách, trường học, và các yêu cầu khác. |
| **`scrips.js`** | Gửi dữ liệu sinh viên từ form đến `server.js` và xử lý việc hiển thị kết quả gợi ý trả về. |

-----

## 🛠️ CÔNG NGHỆ SỬ DỤNG

| Thành phần | Công nghệ |
| :--- | :--- |
| **Backend** | NodeJS, Express.js |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla JS) |
| **Database** | JSON File (`data.json`) (Đơn giản hóa cho mục đích demo) |
| **Logic AI** | Thuật toán dựa trên thuộc tính (Content-Based) trong `suggest.js` |

-----

## 🚀 Hướng Dẫn Cài Đặt và Chạy

Thực hiện theo các bước sau để khởi chạy ứng dụng:

### 1️⃣ Chuẩn bị môi trường

Đảm bảo bạn đã cài đặt **Node.js** và **npm** trên máy tính.

### 2️⃣ Cài đặt phụ thuộc (Dependencies)

Mở Terminal hoặc Command Prompt, di chuyển đến thư mục gốc của dự án và chạy lệnh sau để cài đặt các gói cần thiết (dựa trên `package.json`):

```bash
npm install
```

### 3️⃣ Khởi chạy Server Backend

Khởi động máy chủ Node.js/Express:

```bash
node server.js
```

Sau khi chạy thành công, máy chủ thường sẽ hoạt động tại địa chỉ: `http://localhost:3000` (hoặc cổng được định nghĩa trong `server.js`).

### 4️⃣ Truy cập Giao diện

Mở trình duyệt web của bạn và truy cập vào tệp `index.html` trực tiếp, hoặc nếu server của bạn phục vụ các tệp tĩnh, hãy truy cập:

```
http://localhost:3000/index.html
```

-----

## 📖 Hướng Dẫn Sử Dụng

1.  **Nhập Thông tin:** Trên giao diện `index.html`, sinh viên nhập các tiêu chí tìm kiếm (Ngân sách, yêu cầu về Diện tích, Tên trường Đại học, v.v.).
2.  **Gửi Yêu cầu:** Nhấn nút "Tìm phòng trọ" (hoặc tương tự), tệp `scrips.js` sẽ gửi dữ liệu này đến `server.js`.
3.  **Xử lý Gợi ý:** `server.js` sẽ gọi hàm trong **`suggest.js`** để tính toán điểm phù hợp của từng phòng trọ trong `data.json`.
4.  **Kết quả:** Danh sách phòng trọ được gợi ý (đã sắp xếp theo độ phù hợp) sẽ được trả về và hiển thị trên `index.html`.
