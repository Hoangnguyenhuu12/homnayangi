# 🎨 HƯỚNG DẪN TÍCH HỢP ẢNH MÓN ĂN & NƯỚC UỐNG MỚI (SPRITE ATLAS)

> Tài liệu này hướng dẫn chi tiết cách tạo và gắn ảnh chụp thực tế cho các món ăn mới (`image >= 200`) và nước uống (`image >= 300`) mà không làm gián đoạn hay vỡ giao diện ứng dụng.

---

## 1. Cơ Chế Sprite Atlas Trong Ứng Dụng

Trong dự án gốc của tác giả, thay vì tải hàng trăm file ảnh lẻ khiến roulette bị giật và chớp trắng khi quay, ứng dụng sử dụng kỹ thuật **Sprite Atlas**:
* Gom **12 món ăn/nước uống** vào **1 file ảnh duy nhất** định dạng `.webp`.
* Kích thước chuẩn: **1448 × 1086 px** (Lưới gồm **4 cột × 3 hàng**, mỗi ô vuông có kích thước **362 × 362 px**).
* Khi render, CSS sẽ dùng `background-position` để định vị chính xác ô ảnh tương ứng với ID của món.

---

## 2. Cách Tạo Ảnh Cực Nhanh Bằng Công Cụ Trực Quan (Atlas Maker)

Dự án đã tích hợp sẵn một công cụ đồ họa trực tiếp trên trình duyệt, không cần cài đặt phần mềm Photoshop hay lệnh phức tạp:

1. Đảm bảo dev server đang chạy, mở trình duyệt vào địa chỉ:
   👉 **`http://127.0.0.1:5173/atlas-tool.html`**
2. Tại mục **"Chọn bộ Atlas cần tạo"**, chọn bộ tương ứng:
   * `drinks-0.webp` (Nước uống từ 300 – 311)
   * `drinks-1.webp` (Nước uống từ 312 – 323)
   * `drinks-2.webp` (Nước uống từ 324 – 335)
   * `drinks-3.webp` (Nước uống từ 336 – 345)
   * `food-new-0.webp` (Món ăn mới từ 200 – 210)
3. Kéo thả hoặc click chọn hình ảnh vào 12 ô hiển thị trên màn hình (công cụ sẽ tự động crop tâm và căn chỉnh chuẩn 362×362).
4. Nhấn nút xanh **"Tải xuống file WebP"** để lưu file về máy.
5. Copy file vừa tải vào thư mục `public/` của dự án (ví dụ `F:\truanayangi-main\public\drinks-0.webp`).
6. Mở file `src/app/page.tsx`, thêm tên bộ ảnh vào `AVAILABLE_ATLASES`:
   ```typescript
   export const AVAILABLE_ATLASES = new Set([
     'food-common-0',
     'food-lunch-0', 'food-lunch-1', 'food-lunch-2', 'food-lunch-3',
     'food-expanded-0', 'food-expanded-1', 'food-expanded-2',
     'food-hd-0', 'food-hd-1', 'food-hd-2', 'food-hd-3', 'food-hd-4', 'food-hd-5', 'food-hd-6', 'food-hd-7', 'food-hd-8',
     'drinks-0' // <-- Thêm tên atlas bạn vừa bỏ vào thư mục public/
   ]);
   ```
7. Lưu file. Ứng dụng sẽ tự động chuyển từ icon vector sang hình ảnh chụp thực tế ngay lập tức!

---

## 3. Bảng Vị Trí Ô (Slot 0 – 11) Cho Từng Bộ Atlas

### 📁 Bộ 1: `drinks-0.webp` (Thuần trà & Cà phê cơ bản)

| Vị trí ô | Hàng / Cột | ID | Tên món |
| :---: | :---: | :---: | :--- |
| **Ô 0** | Hàng 1, Cột 1 | 300 | Hồng trà Đài Loan |
| **Ô 1** | Hàng 1, Cột 2 | 301 | Nước mía |
| **Ô 2** | Hàng 1, Cột 3 | 302 | Cà phê đen đá |
| **Ô 3** | Hàng 1, Cột 4 | 303 | Trà tắc khổng lồ |
| **Ô 4** | Hàng 2, Cột 1 | 304 | Rau má đậu xanh |
| **Ô 5** | Hàng 2, Cột 2 | 305 | Trà Ô Long Mộc Hương |
| **Ô 6** | Hàng 2, Cột 3 | 306 | Trà xanh hoa nhài |
| **Ô 7** | Hàng 2, Cột 4 | 307 | Trà bí đao |
| **Ô 8** | Hàng 3, Cột 1 | 308 | Hồng trà chanh |
| **Ô 9** | Hàng 3, Cột 2 | 309 | Trà sữa Đài Loan |
| **Ô 10** | Hàng 3, Cột 3 | 310 | Cà phê sữa đá |
| **Ô 11** | Hàng 3, Cột 4 | 311 | Hồng trà kem tươi |

---

### 📁 Bộ 2: `drinks-1.webp` (Dòng Trà Sữa & Cà Phê Muối)

| Vị trí ô | Hàng / Cột | ID | Tên món |
| :---: | :---: | :---: | :--- |
| **Ô 0** | Hàng 1, Cột 1 | 312 | Trà sữa Ô Long |
| **Ô 1** | Hàng 1, Cột 2 | 313 | Trà sữa Lài |
| **Ô 2** | Hàng 1, Cột 3 | 314 | Trà sữa Bí đao |
| **Ô 3** | Hàng 1, Cột 4 | 315 | Trà sữa Vải thiều |
| **Ô 4** | Hàng 2, Cột 1 | 316 | Bạc xỉu |
| **Ô 5** | Hàng 2, Cột 2 | 317 | Cà phê muối |
| **Ô 6** | Hàng 2, Cột 3 | 318 | Trà chanh giã tay |
| **Ô 7** | Hàng 2, Cột 4 | 319 | Sữa chua đánh đá |
| **Ô 8** | Hàng 3, Cột 1 | 320 | Trà sữa trân châu đường đen |
| **Ô 9** | Hàng 3, Cột 2 | 321 | Trà sữa nướng |
| **Ô 10** | Hàng 3, Cột 3 | 322 | Hồng trà Latte |
| **Ô 11** | Hàng 3, Cột 4 | 323 | Trà sữa Socola |

---

### 📁 Bộ 3: `drinks-2.webp` (Dòng Trà Trái Cây & Trà Latte)

| Vị trí ô | Hàng / Cột | ID | Tên món |
| :---: | :---: | :---: | :--- |
| **Ô 0** | Hàng 1, Cột 1 | 324 | Trà Ô Long Đào |
| **Ô 1** | Hàng 1, Cột 2 | 325 | Trà Ô Long Vải |
| **Ô 2** | Hàng 1, Cột 3 | 326 | Trà dâu tằm |
| **Ô 3** | Hàng 1, Cột 4 | 327 | Nước ép cam tươi |
| **Ô 4** | Hàng 2, Cột 1 | 328 | Trà Ô Long Xoài |
| **Ô 5** | Hàng 2, Cột 2 | 329 | Trà ổi hồng |
| **Ô 6** | Hàng 2, Cột 3 | 330 | Ô Long Latte |
| **Ô 7** | Hàng 2, Cột 4 | 331 | Trà mãng cầu |
| **Ô 8** | Hàng 3, Cột 1 | 332 | Trà xanh Matcha Latte |
| **Ô 9** | Hàng 3, Cột 2 | 333 | Dương Chi Cam Lộ |
| **Ô 10** | Hàng 3, Cột 3 | 334 | Trà đào cam sả |
| **Ô 11** | Hàng 3, Cột 4 | 335 | Cà phê cốt dừa |

---

### 📁 Bộ 4: `drinks-3.webp` (Sinh tố, Đá xay & Chuỗi Thương Hiệu Lớn)

| Vị trí ô | Hàng / Cột | ID | Tên món |
| :---: | :---: | :---: | :--- |
| **Ô 0** | Hàng 1, Cột 1 | 336 | Sinh tố bơ |
| **Ô 1** | Hàng 1, Cột 2 | 337 | Sinh tố mãng cầu |
| **Ô 2** | Hàng 1, Cột 3 | 338 | Cold Brew cam sả |
| **Ô 3** | Hàng 1, Cột 4 | 339 | Matcha đá xay |
| **Ô 4** | Hàng 2, Cột 1 | 340 | Sữa tươi trân châu đường đen |
| **Ô 5** | Hàng 2, Cột 2 | 341 | Ô Long Nhài Sữa (Phê La) |
| **Ô 6** | Hàng 2, Cột 3 | 342 | Freeze Trà Xanh (Highlands) |
| **Ô 7** | Hàng 2, Cột 4 | 343 | Trà sữa chôm chôm (Katinat) |
| **Ô 8** | Hàng 3, Cột 1 | 344 | Caramel Macchiato (Starbucks) |
| **Ô 9** | Hàng 3, Cột 2 | 345 | Frappuccino (Starbucks) |
| **Ô 10** | Hàng 3, Cột 3 | 346 | Trà Ô Long sữa (Phúc Long) |
| **Ô 11** | Hàng 3, Cột 4 | 347 | Trà sữa Alisan (Gong Cha) |

---

### 📁 Bộ 5: `food-new-0.webp` (12 Món Ăn Mới Bổ Sung)

| Vị trí ô | Hàng / Cột | ID | Tên món |
| :---: | :---: | :---: | :--- |
| **Ô 0** | Hàng 1, Cột 1 | 200 | Xôi ngọt |
| **Ô 1** | Hàng 1, Cột 2 | 201 | Bánh bao |
| **Ô 2** | Hàng 1, Cột 3 | 202 | Bánh giò |
| **Ô 3** | Hàng 1, Cột 4 | 203 | Bột chiên |
| **Ô 4** | Hàng 2, Cột 1 | 204 | Bánh canh cá lóc |
| **Ô 5** | Hàng 2, Cột 2 | 205 | Súp cua |
| **Ô 6** | Hàng 2, Cột 3 | 206 | Bánh tráng nướng |
| **Ô 7** | Hàng 2, Cột 4 | 207 | Há cảo |
| **Ô 8** | Hàng 3, Cột 1 | 208 | Phở xào bò |
| **Ô 9** | Hàng 3, Cột 2 | 209 | Ốc |
| **Ô 10** | Hàng 3, Cột 3 | 210 | Chân gà |
| **Ô 11** | Hàng 3, Cột 4 | 211 | Bánh bèo |

---

## 4. Cơ Chế Fallback Thông Minh

* Nếu bạn chưa thêm bất kỳ file ảnh nào, ứng dụng **vẫn hoạt động 100% trơn tru**:
  * Đồ uống tự động hiển thị biểu tượng ly nước `<CupSoda />` viền tinh tế.
  * Món ăn mới tự động hiển thị biểu tượng thìa nĩa `<Utensils />`.
* Không có hiện tượng vỡ khung, không có biểu tượng ảnh lỗi (broken image), không ảnh hưởng đến tốc độ quay và âm thanh mở hòm chuẩn CS:GO!
