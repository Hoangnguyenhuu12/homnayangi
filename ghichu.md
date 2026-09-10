# 🍜 TÀI LIỆU DỰ ÁN: HÔM NAY ĂN GÌ (CS-STYLE FOOD ROULETTE)

> **Mục đích tài liệu:** Ghi chép toàn bộ kiến trúc, cơ chế hoạt động, công nghệ và định hướng phát triển thực tế của dự án để làm ngữ cảnh (context) cho các phiên làm việc và phát triển tiếp theo.

---

## 1. TỔNG QUAN DỰ ÁN

* **Tên dự án:** Hôm Nay Ăn Gì (tiền thân: *Trưa Nay Ăn Gì* - `truanayangi`)
* **Nguồn gốc:** Fork từ repository cộng đồng `nagisanzenin/truanayangi` (website gốc: [truanayangi.com](https://truanayangi.com/)).
* **Bản chất:** Ứng dụng web độc lập dạng tĩnh (**100% Standalone Static Frontend**), không phụ thuộc backend, database, tài khoản đăng nhập hay API dịch vụ đám mây trả phí.
* **Ý tưởng cốt lõi:** Mô phỏng lại chính xác cơ chế **Mở hòm vũ khí (Case Opening)** kinh điển trong game Counter-Strike (CS:GO / CS2) để chọn món ăn ngẫu nhiên theo từng bữa trong ngày hoặc chọn thức uống giải khát dựa trên ngân sách và sở thích.
* **Định hướng nâng cấp lớn:**
  1. Mở rộng từ chỉ ăn trưa sang **toàn diện 5 bữa trong ngày** (Sáng – Trưa – Chiều – Tối – Khuya) với cơ chế tương tác trực tiếp trên tiêu đề cực kỳ tinh gọn, không làm rối giao diện.
  2. Bổ sung chế độ **Mở hòm Nước Uống** chi tiết hóa cao cấp với 48 loại đồ uống quen thuộc, giá tính kèm phí ship GrabFood thực tế.
  3. Bổ sung **12 món ăn chính no nê** còn thiếu cho các bữa (thay thế đồ ăn vặt bằng các món no ấm bụng: Bánh bèo, Bánh canh cá lóc, Phở xào bò, v.v.).
  4. Nâng cấp bảng **Món của tôi** (Preferences Panel) với 3 tab chuẩn phong cách tối giản của tác giả.

---

## 2. STACK CÔNG NGHỆ (TECH STACK)

| Thành phần | Công nghệ / Thư viện | Vai trò |
| :--- | :--- | :--- |
| **Ngôn ngữ** | **TypeScript 7** | Đảm bảo tính chặt chẽ về kiểu dữ liệu (static typing) cho toàn bộ logic. |
| **Giao diện (UI)** | **React 19** (`react`, `react-dom`) | Quản lý component, state, tối ưu render (`useMemo`, `flushSync`). |
| **Build Tool** | **Vite 8** | Dev server siêu tốc (`127.0.0.1:5173`), bundle code tối ưu khi build. |
| **Styling** | **Tailwind CSS v4** + `tw-animate-css` | Giao diện Dark Mode phong cách CS, hiệu ứng animation & ánh sáng lấp lánh. |
| **UI Primitives** | **Base UI** (`@base-ui/react`) | Cung cấp headless components chuẩn accessibility cho Dialog (kết quả), Select (ngân sách), Popover/Dropdown. |
| **Icon** | **Lucide React** | Bộ icon vector sắc nét (`Sparkles`, `Utensils`, `CupSoda`, `Leaf`, `Volume2`, v.v.). |
| **Âm thanh** | **Web Audio API** | Tự xây dựng engine âm thanh qua class `CaseAudio` (preload buffer, unlock Safari/iOS, đồng bộ nhịp cuộn). |
| **Lưu trữ** | **Host-only Cookies** | Tự động lưu cấu hình, món ăn tự tạo, số lượt quay mà không cần database. |
| **Deployment** | **Vercel** (`vercel.json`) | Triển khai nhanh dạng SPA tĩnh trên toàn cầu. |
| **Package Manager**| **pnpm** (phiên bản trong `package.json`) | Quản lý thư viện phụ thuộc với file lock `pnpm-lock.yaml`. |

---

## 3. CẤU TRÚC THƯ MỤC NGUỒN (PROJECT STRUCTURE)

```
truanayangi/
├── public/                     # Tài nguyên tĩnh (ảnh sprite atlas .webp, âm thanh .mp3)
│   ├── sounds/                 # Âm thanh mở hòm, cuộn thẻ, âm thanh trúng thưởng CS:GO
│   ├── brand/                  # Logo, favicon
│   └── atlas-tool.html         # Công cụ trực quan tạo file ảnh Sprite Atlas không cần Photoshop
├── src/
│   ├── app/
│   │   ├── globals.css         # Toàn bộ CSS phong cách game, tab, keyframe animation, responsive
│   │   └── page.tsx            # Trang chính điều khiển toàn bộ luồng quay, state và dialog
│   ├── components/
│   │   ├── category-selector.tsx # Dropdown chuyển đổi [món ăn / nước uống] inline trên tiêu đề
│   │   ├── meal-selector.tsx   # Dropdown chuyển đổi 5 bữa [sáng / trưa / chiều / tối / khuya] inline trên tiêu đề
│   │   ├── preferences-panel.tsx # Bảng cài đặt 3 tab chuẩn phong cách tác giả (Món ăn, Nước uống, Món tự thêm)
│   │   └── ui/                 # Wrapper các UI component (dialog, select, switch, popover)
│   ├── hooks/
│   │   ├── use-local-spin-count.ts # Hook đếm số lượt quay cục bộ lưu trên cookie
│   │   └── use-preferences.ts  # Hook quản lý cấu hình người dùng
│   ├── lib/
│   │   ├── case-audio.ts       # Web Audio API engine phát âm thanh không độ trễ
│   │   ├── case-mechanics.ts   # Thuật toán tính xác suất, ma sát vật lý cuộn hòm CS:GO
│   │   ├── cookies.ts          # Thư viện đọc/ghi cookie an toàn (giới hạn 3.5KB, chống tràn)
│   │   ├── foods.ts            # Cơ sở dữ liệu 144 món ăn mặc định kèm ảnh và độ hiếm (132 gốc + 12 món no nê)
│   │   ├── drinks.ts           # Cơ sở dữ liệu riêng biệt cho 48 món nước uống chi tiết kèm giá GrabFood
│   │   ├── personal-pool.ts    # Logic ghép món mặc định với danh sách món/nước tự tạo của người dùng
│   │   ├── i18n.ts             # Đa ngôn ngữ (Tiếng Việt & Tiếng Anh)
│   │   └── utils.ts            # Tiện ích gộp class CSS (clsx + tailwind-merge)
│   └── main.tsx                # Entry point gắn kết React vào DOM
├── tests/                      # Bộ kiểm thử tự động (Unit test cookie, personal pool)
├── HUONG_DAN_THEM_ANH.md       # Hướng dẫn chi tiết thêm ảnh chụp cho món ăn và nước uống mới
├── vercel.json                 # Cấu hình routing SPA cho nền tảng Vercel
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. CHI TIẾT CƠ CHẾ KỸ THUẬT & TRẢI NGHIỆM ĐÃ HOÀN THIỆN

### 4.1. Tương tác bữa ăn và danh mục trực tiếp trên Tiêu đề (Inline Title Dropdowns)
* **Ý tưởng & Trải nghiệm:** Giữ trọn vẹn 100% tinh thần tối giản, mộc mạc của tác giả gốc. Không thêm các nút bấm/tab rời rạc vào thanh điều khiển (`control-bar`).
* **Tiêu đề linh hoạt:** `Mở hòm [món ăn / nước uống] [sáng / trưa / chiều / tối / khuya]`.
  * Từ `[món ăn]` và từ `[trưa]` đều có **đường gạch chân nét mảnh màu hổ phách/amber** đặc trưng của CS:GO.
  * Hover phóng to nhẹ (`scale: 1.05`), con trỏ chuyển thành `pointer`.
  * Click vào từng từ sẽ mở một dropdown dạng cột dọc thuần text mộc mạc, không dùng icon hay ghi chú giờ rườm rà.
  * Khi chọn chế độ `[nước uống]`, bộ chọn bữa ăn tự động ẩn đi vì nước uống áp dụng linh hoạt cho mọi thời điểm trong ngày.
* **Quy tắc thiết kế bất di bất dịch:**
  * **KHÔNG DÙNG ICON / EMOJI TRÊN TIÊU ĐỀ:** Giữ trọn "vibe" CS:GO ban đầu.
  * **KHÔNG THÊM CHÚ THÍCH GIỜ RƯỜM RÀ:** Tránh các thông tin hiển nhiên gây rối mắt.

### 4.2. Phân loại 5 bữa ăn chính (Thuần text, mộc mạc)
* **Sáng:** Các món ăn sáng no bụng, quen thuộc (Phở, Bánh mì, Xôi mặn, Bánh cuốn, Bánh mì chảo, Cháo sườn, Hủ tiếu, Bánh bao, Xôi ngọt, Bánh giò...).
* **Trưa:** Các món cơm no, bún quen thuộc (Cơm tấm, Cơm văn phòng, Bún chả, Bún đậu, Cơm gà xối mỡ, Mì xào bò, Phở xào bò...).
* **Chiều:** Bữa xế lót dạ chắc bụng (Bánh giò nóng, Bột chiên, Súp cua, Bánh tráng nướng, Há cảo, Bánh bèo...).
* **Tối:** Bữa ăn tối no, ấm cúng (Cơm gia đình, Bò bít tết, Mì cay, Đồ nướng, Lẩu, Ramen, Bánh canh cá lóc...).
* **Khuya:** Các món ăn đêm cho người tăng ca, cú đêm (Hủ tiếu gõ, Cháo lòng, Mì xào khuya, Phở đêm, Ốc, Chân gà...).

### 4.3. Bổ sung 12 món ăn chính no nê (foods.ts)
* Thay thế hoàn toàn các món ăn vặt lặt vặt (như cơm cháy, chè bưởi) bằng các món ăn no ấm bụng, quen thuộc của người Việt:
  1. `200`: **Xôi ngọt** (30k) - Sáng
  2. `201`: **Bánh bao** (30k) - Sáng, Chiều, Khuya
  3. `202`: **Bánh giò** (30k) - Sáng, Chiều
  4. `203`: **Bột chiên** (45k) - Chiều, Tối, Khuya
  5. `204`: **Bánh canh cá lóc** (55k) - Sáng, Trưa, Tối
  6. `205`: **Súp cua** (40k) - Sáng, Chiều
  7. `206`: **Bánh tráng nướng** (30k) - Chiều, Tối, Khuya
  8. `207`: **Há cảo** (45k) - Sáng, Chiều, Tối
  9. `208`: **Phở xào bò** (65k) - Trưa, Tối, Khuya
  10. `209`: **Ốc** (75k) - Tối, Khuya
  11. `210`: **Chân gà** (65k) - Tối, Khuya
  12. `211`: **Bánh bèo** (35k) - Sáng, Chiều
* Tên món ngắn gọn, đối soát không trùng lặp với 132 món gốc, nâng tổng số món ăn lên **144 món**.

### 4.4. Tích hợp danh mục Nước Uống Chi Tiết Hóa & Giá GrabFood Thực Tế (drinks.ts)
* **Tổng cộng 48 món nước uống chi tiết** (độ chi tiết cao phù hợp thói quen gọi đồ uống của người dùng):
  * **Trà sữa chi tiết:** Trà sữa Đài Loan, Trà sữa Ô Long, Trà sữa Lài, Trà sữa Bí đao, Trà sữa Vải thiều, Trà sữa Trân châu đường đen, Trà sữa Nướng, Trà sữa Socola, Sữa tươi trân châu đường đen, Trà sữa matcha, Trà sữa khoai môn.
  * **Thuần trà & Trà chanh:** Hồng trà Đài Loan, Nước mía, Rau má đậu xanh, Trà tắc khổng lồ, Trà Ô Long Mộc Hương, Trà xanh hoa nhài, Trà bí đao, Hồng trà kem tươi, Hồng trà chanh, Trà chanh giã tay, Sữa chua đánh đá, Nước sâm bí đao.
  * **Trà trái cây & Trà Latte:** Hồng trà Latte, Trà Ô Long Đào, Trà Ô Long Vải, Trà dâu tằm, Nước ép cam tươi, Trà Ô Long Xoài, Trà ổi hồng, Ô Long Latte, Trà mãng cầu, Trà xanh Matcha Latte, Dương Chi Cam Lộ, Trà đào cam sả.
  * **Cà phê:** Cà phê đen đá, Cà phê sữa đá, Bạc xỉu, Cà phê muối, Cà phê cốt dừa, Cold Brew cam sả.
  * **Sinh tố & Đá xay:** Sinh tố bơ, Sinh tố mãng cầu, Matcha đá xay.
  * **Thương hiệu & Cao cấp:** Ô Long Nhài Sữa Phê La, Freeze Trà Xanh Highlands, Trà sữa chôm chôm Katinat, Caramel Macchiato Starbucks, Frappuccino Starbucks.
* **Định giá thực tế (Đã gồm phí ship & phụ phí hộp GrabFood/ShopeeFood):**
  * `Rarity 0` (Xanh Mil-spec / 32k - 40k): Nước mía (32k), Cà phê đen (35k), Trà tắc (35k), Rau má (35k), Trà Ô Long (35k), Trà sữa Đài Loan (38k), Cà phê sữa đá (38k), Nước sâm (32k)...
  * `Rarity 1` (Tím Restricted / 42k - 60k): Trà sữa Ô Long / Lài / Bí đao (42k), Cà phê muối (42k), Bạc xỉu (42k), Trà đào cam sả (55k), Sinh tố bơ (55k), Matcha đá xay (60k)...
  * `Rarity 2` (Hồng Classified / 65k - 80k): Sữa tươi trân châu đường đen (65k), Phê La (75k), Highlands (75k), Katinat (80k)...
  * `Rarity 3` (Đỏ Covert / 105k - 110k): Caramel Macchiato Starbucks (105k), Frappuccino Starbucks (110k)...

### 4.5. Nâng cấp bảng "Món của tôi" (Preferences Panel) chuẩn phong cách tác giả
* Bố cục 3 Tab thanh lịch kế thừa 100% CSS nguyên bản (`.preferences-tab`, `.tab-list-root`, `.tab-content-root`):
  * **Tab 1:** `Món ăn có sẵn (144)`
  * **Tab 2:** `Nước uống có sẵn (48)`
  * **Tab 3:** `Món tự thêm (0/50)`
* Tự động chuyển tab tương ứng theo ngữ cảnh hòm đang xem (xem hòm Nước thì tự động mở tab Nước uống).
* Nút "Bật lại tất cả" hoạt động độc lập theo từng tab đang chọn.
* Hỗ trợ tạo món tự thêm với phân loại `category: 'food' | 'drink'`.

### 4.6. Công cụ tạo ảnh Sprite Atlas & Tài liệu hướng dẫn
* **Visual Atlas Generator (`public/atlas-tool.html`):**
  * Mở trực tiếp tại `http://127.0.0.1:5173/atlas-tool.html`.
  * Hỗ trợ kéo thả ảnh vào lưới 4x3 (12 ô), tự động crop fit vuông và xuất file `.webp` chuẩn tỉ lệ 1448 × 1086 px.
* **Tài liệu hướng dẫn (`HUONG_DAN_THEM_ANH.md`):**
  * Bảng phân chia cụ thể file ảnh cho 12 món ăn mới (`food-new-0.webp`) và 48 thức uống (`drinks-0.webp` đến `drinks-3.webp`).
  * Cơ chế Fallback an toàn hiển thị icon vector thanh lịch (`CupSoda` hoặc `Utensils`) khi chưa có ảnh, không bao giờ vỡ layout.

---

## 5. HƯỚNG DẪN DEPLOY LÊN VERCEL APP

1. **Khởi tạo và đẩy mã nguồn lên GitHub:**
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "feat: hoàn thiện ứng dụng Hôm Nay Ăn Gì"
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```
2. **Triển khai lên Vercel:**
   * Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
   * Bấm **Add New...** -> **Project**.
   * Chọn kho lưu trữ GitHub vừa đẩy lên (`Import`).
   * Cấu hình dự án:
     * **Framework Preset:** `Vite`
     * **Build Command:** `pnpm build`
     * **Output Directory:** `dist`
     * **Install Command:** `pnpm install`
   * Bấm **Deploy**. Sau ~1 phút, website sẽ hoạt động trực tiếp tại địa chỉ `https://<ten-du-an>.vercel.app`.
3. **Cấu hình định tuyến SPA:**
   * Dự án đã tích hợp sẵn file `vercel.json` để tự động định tuyến lại tất cả các đường dẫn về `index.html`.

---

## 6. LỊCH SỬ CÁC BƯỚC THỰC HIỆN TRONG PHIÊN

* **Bước 1:** `feat(meal): phân loại 5 bữa ăn và tương tác đổi bữa trên tiêu đề (MealSelector)`
* **Bước 2:** `feat(food): bổ sung 12 món ăn chính no nê không trùng lặp (foods.ts)`
* **Bước 3:** `feat(drinks): tích hợp danh mục nước uống chi tiết và chuyển đổi món/nước (drinks.ts, CategorySelector)`
* **Bước 4:** `fix(drinks): chuẩn hóa giá nước uống bao gồm phí ship GrabFood và cân bằng độ hiếm CS:GO`
* **Bước 5:** `feat(preferences): nâng cấp bảng Món của tôi với 3 tab chuẩn phong cách tác giả và hỗ trợ thức uống tự tạo`
* **Bước 6:** `feat(assets): công cụ tạo ảnh Sprite Atlas (atlas-tool.html) và tài liệu hướng dẫn (HUONG_DAN_THEM_ANH.md)`
* **Bước 7:** `docs: cập nhật tài liệu kỹ thuật ghichu.md và cấu hình Vercel (vercel.json)`
