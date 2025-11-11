// script.js
const form = document.getElementById("searchForm");
const preview = document.getElementById("preview");
const advancedBtn = document.getElementById("advancedAi");

async function loadRooms(){
  const res = await fetch("data.json");
  const data = await res.json();
  return data;
}

// Hàm tính điểm cho mỗi phòng dựa yêu cầu user
function scoreRoom(room, params) {
  // điểm cơ bản
  let score = 0;

  // 1) Giá: càng thấp càng tốt (relative)
  const priceDiff = Math.max(0, params.budget - room.price);
  score += Math.min(30, (priceDiff / Math.max(1, params.budget)) * 30); // up to 30 điểm

  // 2) Khoảng cách: (dựa trên distance_to_school_km)
  if ('distance_to_school_km' in room) {
    const d = room.distance_to_school_km;
    score += Math.max(0, 20 - d*4); // gần hơn => cao điểm, tối đa ~20
  }

  // 3) Tiện nghi
  if (params.amenities.length > 0) {
    const matched = params.amenities.filter(a => room.amenities.join(",").toLowerCase().includes(a.toLowerCase()));
    score += Math.min(20, matched.length * 6); // mỗi tiện nghi trùng +6 điểm
  }

  // 4) Diện tích
  if (room.area_m2 >= params.minArea) score += 8;

  // 5) Giới tính ưu tiên (nếu khác 'both' và không khớp -> trừ)
  if (params.gender !== "both") {
    if (room.gender === "both" || room.gender === params.gender) score += 6;
    else score -= 6;
  }

  // 6) Rating
  if (room.rating) score += Math.min(16, room.rating * 3); // rating 5 -> +15

  // 7) Ưu tiên tổng thể (tweak theo params.priority)
  if (params.priority === "cheap") {
    // giá nặng hơn (already added) -> no extra
  } else if (params.priority === "near_school") {
    if ('distance_to_school_km' in room) score *= 1.08;
  } else if (params.priority === "comfort") {
    score *= 1.06;
  } else if (params.priority === "rating") {
    score *= 1.07;
  } // balanced giữ nguyên

  return score;
}

function normalizeText(s){ return (s||"").toString().toLowerCase().trim(); }

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  preview.innerHTML = "Đang tìm...";

  const params = {
    budget: parseInt(document.getElementById("budget").value) || 0,
    location: normalizeText(document.getElementById("location").value),
    minArea: parseInt(document.getElementById("minArea").value) || 0,
    gender: document.getElementById("gender").value,
    priority: document.getElementById("priority").value,
    amenities: document.getElementById("amenities").value
                .split(",").map(s => s.trim()).filter(Boolean)
  };

  const rooms = await loadRooms();

  // filter sơ bộ: giá <= budget + allowance (allow tolerance)
  const allowance = Math.floor(params.budget * 0.3); // cho phép cao hơn 30%
  let filtered = rooms.filter(r => {
    // location match nếu có nhập
    const locOk = !params.location || normalizeText(r.district).includes(params.location);
    const priceOk = r.price <= (params.budget + allowance);
    return locOk && priceOk;
  });

  // nếu không có kết quả, relax điều kiện: bỏ location / tăng allowance
  if (filtered.length === 0) {
    filtered = rooms.filter(r => r.price <= params.budget + Math.floor(params.budget * 0.6));
  }

  // tính điểm
  const scored = filtered.map(r => {
    return { room: r, score: scoreRoom(r, params) };
  });

  scored.sort((a,b)=> b.score - a.score);

  // lưu vào localStorage để trang suggest.html hiển thị
  const suggestions = scored.map(s => ({...s.room, score: Math.round(s.score*100)/100}));
  localStorage.setItem("troAI_suggestions", JSON.stringify(suggestions));
  localStorage.setItem("troAI_params", JSON.stringify(params));

  // show preview
  if (suggestions.length === 0) {
    preview.innerHTML = "<p>Không tìm thấy phòng phù hợp. Thử tăng ngân sách hoặc bỏ location.</p>";
  } else {
    preview.innerHTML = suggestions.slice(0,3).map(r => `
      <div class="room">
        <h3>${r.name} — ${r.price.toLocaleString()} VNĐ</h3>
        <p>${r.desc}</p>
        <p><small>Vị trí: ${r.district} • Diện tích: ${r.area_m2} m² • Rating: ${r.rating || 'N/A'}</small></p>
        <p><small>Score: ${r.score}</small></p>
      </div>
    `).join("<hr/>") + `<p><a href="suggest.html">Xem tất cả kết quả & chi tiết →</a></p>`;
  }
});

// nút AI nâng cao (OpenAI) — sẽ mở suggest.html với flag
advancedBtn.addEventListener("click", () => {
  localStorage.setItem("troAI_useOpenAI", "1");
  // redirect
  window.location.href = "suggest.html";
});
async function askAI() {
  const question = document.getElementById("userInput").value;
  if (!question) return alert("Nhập câu hỏi về phòng trọ!");

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();
  document.getElementById("aiAnswer").innerText = data.answer;
}
