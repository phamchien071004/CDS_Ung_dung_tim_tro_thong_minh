<h1 align="center">ỨNG DỤNG AI GỢI Ý PHÒNG TRỌ CHO SINH VIÊN</h1> <div align="center"> <p align="center"> <img src="https://raw.githubusercontent.com/anhminhvdvn/CanhBaoDotNhap/main/images/logoDaiNam.png" width="150"> </p> <br>




</br> </div>
🌟 Giới thiệu

Ứng dụng AI Gợi Ý Phòng Trọ là hệ thống hỗ trợ sinh viên tìm phòng trọ phù hợp nhanh chóng và cá nhân hóa, dựa trên các tiêu chí như vị trí, giá cả, tiện ích, đánh giá của người dùng trước, giúp tối ưu thời gian tìm kiếm và nâng cao trải nghiệm thuê trọ.

Hệ thống gồm hai phần:

Ứng dụng di động (Mobile App): Sinh viên có thể tìm kiếm, xem gợi ý phòng trọ, và lưu phòng yêu thích.

Trang quản lý (Web Dashboard): Quản trị viên và chủ nhà quản lý phòng, theo dõi lượt đặt, đánh giá và phản hồi người dùng.

⚙️ Mục tiêu

Gợi ý phòng trọ cá nhân hóa theo nhu cầu sinh viên.

Giúp sinh viên tiết kiệm thời gian và công sức khi tìm phòng.

Tạo hệ sinh thái minh bạch, kết nối giữa sinh viên, chủ nhà và quản trị hệ thống.

Hệ thống thân thiện, chạy trên điện thoại Android/iOS và web.

🌟 Tính năng chính
📱 Ứng dụng di động (sinh viên)

Tìm và nhận gợi ý phòng trọ:

Xem danh sách phòng phù hợp dựa trên nhu cầu.

Nhập thông tin yêu cầu: ngân sách, khu vực, tiện ích mong muốn.

Nhận gợi ý từ AI dựa trên các tiêu chí và lịch sử lựa chọn.

Quản lý phòng yêu thích và đánh giá:

Lưu phòng trọ quan tâm để xem sau.

Gửi đánh giá và bình luận, giúp cải thiện chất lượng gợi ý AI.

Giao diện thân thiện:

Xây dựng bằng Flutter, bố cục rõ ràng, dễ thao tác.

Hỗ trợ đa ngôn ngữ.

🖥️ Trang quản lý (Web Dashboard)

Quản lý phòng trọ: thêm, sửa, xóa phòng; cập nhật thông tin tiện ích và giá.

Thống kê và báo cáo: lượt xem, lượt đặt, đánh giá của sinh viên, biểu đồ trực quan bằng Recharts.

Quản lý phản hồi: xem đánh giá, phản hồi từ sinh viên và xử lý khi cần.

Quản lý người dùng và quyền hạn: phân quyền quản trị viên, nhân viên và chủ nhà.

📂 Cấu trúc dự án
AI_GoiY_PhongTro
├── 📱 mobile_app/ # Ứng dụng Flutter cho sinh viên
│   ├── lib/
│   │   ├── models/       # Model dữ liệu phòng trọ
│   │   ├── screens/      # Giao diện các màn hình
│   │   ├── services/     # Kết nối API backend
│   │   └── main.dart  
│   ├── pubspec.yaml
│   └── README.md
│
├── 🌐 web_dashboard/ # Trang quản lý (React 18 + Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── store/
│   ├── package.json
│   └── README.md
│
├── 🧠 backend_api/ # API kết nối mobile và web
│   ├── server.js (Node.js / Express)
│   ├── seed.js
│   ├── package.json
│   ├── .env
│   ├── uploads/
│   └── src/
│       ├── models/
│       └── routes/
│
└── 📄 README.md # Tài liệu dự án

🛠️ Công nghệ sử dụng
📱 Ứng dụng di động
<div align="center"> [![Flutter](https://img.shields.io/badge/Flutter-3.x-blue?style=for-the-badge&logo=flutter)]() [![GetX](https://img.shields.io/badge/GetX-State%20Management-purple?style=for-the-badge)]() [![Dart](https://img.shields.io/badge/Dart-2.x-blue?style=for-the-badge&logo=dart)]() </div>
🌐 Trang quản lý
<div align="center"> [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)]() [![Vite](https://img.shields.io/badge/Vite-Build%20Tool-orange?style=for-the-badge)]() [![Tailwind](https://img.shields.io/badge/TailwindCSS-Design%20System-06B6D4?style=for-the-badge)]() </div>
🧠 Backend & Cơ sở dữ liệu
<div align="center"> [![NodeJS](https://img.shields.io/badge/NodeJS-Server-brightgreen?style=for-the-badge&logo=node.js)]() [![Express](https://img.shields.io/badge/Express-Framework-lightgrey?style=for-the-badge)]() [![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)]() [![Scikit-learn](https://img.shields.io/badge/Scikit--learn-AI%20Model-orange?style=for-the-badge&logo=python)]() </div>
