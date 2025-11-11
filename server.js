import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

// ✅ Cấu hình CORS chuẩn
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Load data.json
let rooms = [];
try {
  const data = fs.readFileSync("data.json", "utf-8");
  rooms = JSON.parse(data);
  console.log(`✅ Loaded ${rooms.length} phòng từ data.json`);
} catch (err) {
  console.error("❌ Lỗi đọc data.json:", err);
}

const PORT = 3000;

// API nhận câu hỏi từ frontend
app.post("/api/ask", (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Thiếu câu hỏi!" });

    console.log("📩 Nhận câu hỏi:", question);

    const q = question.toLowerCase();
    let results = [];

    // Lọc theo khu vực (quận/huyện/thành phố)
    const districts = rooms.map(r => r.district.toLowerCase());
    const matchedDistrict = districts.find(d => q.includes(d));

    if (matchedDistrict) {
      results = rooms.filter(r => r.district.toLowerCase() === matchedDistrict);
    } else {
      // Nếu không nhập đúng quận/huyện/thành phố, show tất cả phòng
      results = rooms;
    }

    // Lọc theo giá nếu có "triệu"
    const priceMatch = q.match(/(\d+)\s*triệu/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]) * 1000000;
      results = results.filter(r => r.price <= maxPrice);
    }

    // Lọc theo tiện nghi nếu có
    if (q.includes("wifi")) {
      results = results.filter(r => r.amenities.some(a => a.toLowerCase().includes("wifi")));
    }
    if (q.includes("máy lạnh") || q.includes("air")) {
      results = results.filter(r => r.amenities.some(a => a.toLowerCase().includes("máy lạnh")));
    }
    if (q.includes("bếp")) {
      results = results.filter(r => r.amenities.some(a => a.toLowerCase().includes("bếp")));
    }

    // Lấy tối đa 3 kết quả
    const top3 = results.slice(0, 3);

    // Trả về thông tin kèm ảnh
    const answer = top3.map(r => ({
      name: r.name,
      price: r.price,
      district: r.district,
      amenities: r.amenities,
      desc: r.desc,
      image: r.image || ""
    }));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ answer });
  } catch (err) {
    console.error("❌ Lỗi server:", err);
    res.status(500).json({ error: "Lỗi server." });
  }
});

// Phục vụ frontend tĩnh
app.use(express.static("."));

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
