import { priceRarity } from './case-mechanics';
import type { Food } from './foods';

// Giá tham khảo đã bao gồm phí ship và phụ phí nền tảng giao hàng GrabFood / ShopeeFood (~16k - 20k)
export const rawDrinks: Omit<Food, 'rarity'>[] = [
  // 1. Bình dân & Giải khát hàng ngày (32k - 40k) -> Rarity 0 (Mil-spec / Xanh)
  {
    name: "Nước mía",
    sub: "Mía tươi ép tắc • Ly vừa",
    price: 32,
    image: 301,
    quip: "Ngọt mát tự nhiên, giải khát tức thì.",
    category: "drink",
    veg: true
  },
  {
    name: "Hồng trà Đài Loan",
    sub: "Hồng trà truyền thống • Size M",
    price: 32,
    image: 300,
    quip: "Đậm vị trà đen nguyên bản, thanh lọc tâm trí.",
    category: "drink",
    veg: true
  },
  {
    name: "Cà phê đen đá",
    sub: "Rang xay truyền thống • Việt Nam",
    price: 35,
    image: 302,
    quip: "Đậm đà tỉnh táo, bật mood chạy deadline.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà tắc khổng lồ",
    sub: "Tắc tươi chua ngọt • Ly lớn",
    price: 35,
    image: 303,
    quip: "Chua chua ngọt ngọt, đập tan cơn khát.",
    category: "drink",
    veg: true
  },
  {
    name: "Rau má đậu xanh",
    sub: "Rau má tươi & đậu xanh bùi béo",
    price: 35,
    image: 304,
    quip: "Mát gan giải nhiệt, thanh mát từ thiên nhiên.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà Ô Long Mộc Hương",
    sub: "Ô long thanh mát hậu ngọt sâu • Size M",
    price: 35,
    image: 305,
    quip: "Hương trà mộc mạc lưu luyến vòm họng.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà xanh hoa nhài",
    sub: "Hương lài thoang thoảng dịu êm • Size M",
    price: 35,
    image: 306,
    quip: "Thanh tao nhẹ nhàng, giải tỏa căng thẳng.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà bí đao",
    sub: "Bí đao nấu truyền thống mát lành • Size M",
    price: 35,
    image: 307,
    quip: "Ngọt dịu mát gan, xua tan oi bức.",
    category: "drink",
    veg: true
  },
  {
    name: "Hồng trà chanh",
    sub: "Chanh tươi chua ngọt sảng khoái • Size M",
    price: 38,
    image: 308,
    quip: "Cân bằng hoàn hảo giữa vị chát và chua thanh.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa Đài Loan",
    sub: "Trà đen & sữa béo ngậy chuẩn vị • Size M",
    price: 38,
    image: 309,
    quip: "Hương vị kinh điển, uống hoài không ngán.",
    category: "drink",
    veg: true
  },
  {
    name: "Cà phê sữa đá",
    sub: "Pha phin đậm đà thơm béo • Việt Nam",
    price: 38,
    image: 310,
    quip: "Năng lượng bùng nổ cho ngày làm việc năng suất.",
    category: "drink",
    veg: true
  },
  {
    name: "Hồng trà kem tươi",
    sub: "Lớp macchiato kem béo mặn • Size M",
    price: 40,
    image: 311,
    quip: "Môi dính bọt kem, chuẩn combo sống ảo.",
    category: "drink",
    veg: true
  },

  // 2. Phổ thông / Trà sữa chi tiết & Trà trái cây (42k - 60k) -> Rarity 1 (Restricted / Tím)
  {
    name: "Trà sữa Ô Long",
    sub: "Ô long nướng thơm đậm đà • Size M",
    price: 42,
    image: 312,
    quip: "Đậm đà hậu vị trà, thơm béo ngất ngây.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa Lài",
    sub: "Trà xanh sữa hoa nhài thanh mát • Size M",
    price: 42,
    image: 313,
    quip: "Thơm hương hoa lài, ngọt dịu nhẹ nhàng.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa Bí đao",
    sub: "Vị bí đao thanh ngọt dịu mát • Size M",
    price: 42,
    image: 314,
    quip: "Ngọt bùi lạ miệng, thanh mát dễ chịu.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa Vải thiều",
    sub: "Thơm hương vải nhiệt đới • Size M",
    price: 42,
    image: 315,
    quip: "Hương vải ngọt lịm quyện cùng trà sữa thơm lừng.",
    category: "drink",
    veg: true
  },
  {
    name: "Bạc xỉu",
    sub: "Nhiều sữa ít cà phê ngọt ngào • Việt Nam",
    price: 42,
    image: 316,
    quip: "Ngọt ngào dễ uống, khởi đầu ngày mới nhẹ nhàng.",
    category: "drink",
    veg: true
  },
  {
    name: "Cà phê muối",
    sub: "Lớp kem béo vị mặn hài hòa • Huế",
    price: 42,
    image: 317,
    quip: "Béo mặn hài hòa, hương vị gây nghiện.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà chanh giã tay",
    sub: "Chanh Quảng Đông thơm nồng tinh dầu",
    price: 42,
    image: 318,
    quip: "Càng giã càng thơm, thanh mát bừng tỉnh giác quan.",
    category: "drink",
    veg: true
  },
  {
    name: "Sữa chua đánh đá",
    sub: "Sữa chua sánh mịn mát lạnh • Việt Nam",
    price: 42,
    image: 319,
    quip: "Chua ngọt mát lịm, giải nhiệt tức thì.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa trân châu đường đen",
    sub: "Trân châu dẻo dai đường đen • Size M",
    price: 45,
    image: 320,
    quip: "Trân châu dẻo thơm, ngọt ngào đậm đà.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa nướng",
    sub: "Hương caramel nướng thơm lừng • Size M",
    price: 45,
    image: 321,
    quip: "Vị cháy nhẹ caramel quyến rũ khó cưỡng.",
    category: "drink",
    veg: true
  },
  {
    name: "Hồng trà Latte",
    sub: "Hồng trà ủ kết hợp sữa tươi • Size M",
    price: 45,
    image: 322,
    quip: "Hòa quyện tinh tế giữa trà mộc và sữa tươi béo ngậy.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa Socola",
    sub: "Đậm vị cacao socola ngọt ngào • Size M",
    price: 45,
    image: 323,
    quip: "Cacao thơm nức mũi, ngọt ngào xua tan mệt mỏi.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà Ô Long Đào",
    sub: "Trà ô long kèm đào miếng giòn • Size M",
    price: 48,
    image: 324,
    quip: "Miếng đào giòn sần sật, nước trà thanh thơm.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà Ô Long Vải",
    sub: "Hương vải thơm mọng nước • Size M",
    price: 48,
    image: 325,
    quip: "Mọng nước ngọt thơm, giải nhiệt mùa hè.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà dâu tằm",
    sub: "Màu hồng lãng mạn dâu chua ngọt • Size M",
    price: 48,
    image: 326,
    quip: "Sắc hồng cuốn hút, vị chua ngọt đốn tim.",
    category: "drink",
    veg: true
  },
  {
    name: "Nước ép cam tươi",
    sub: "Cam sành vắt nguyên chất tươi ngon",
    price: 50,
    image: 327,
    quip: "Vitamin C ngập tràn, sảng khoái tức thì.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà Ô Long Xoài",
    sub: "Xoài tươi nhiệt đới chua ngọt • Size M",
    price: 50,
    image: 328,
    quip: "Hương xoài nhiệt đới bùng nổ vị giác.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà ổi hồng",
    sub: "Ổi hồng thơm ngát thanh mát • Size M",
    price: 50,
    image: 329,
    quip: "Hương ổi xá lị nồng nàn thơm phức.",
    category: "drink",
    veg: true
  },
  {
    name: "Ô Long Latte",
    sub: "Ô long thượng hạng pha sữa tươi • Size M",
    price: 50,
    image: 330,
    quip: "Thanh mát tao nhã, êm dịu từng ngụm trà.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà mãng cầu",
    sub: "Thịt mãng cầu xiêm chua ngọt đậm đà",
    price: 50,
    image: 331,
    quip: "Hot trend giải khát, chua chua ngọt ngọt cuốn hút.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà xanh Matcha Latte",
    sub: "Matcha Nhật Bản thơm dịu béo ngậy • Size M",
    price: 52,
    image: 332,
    quip: "Matcha thơm bùi, xanh mát thư thái tâm hồn.",
    category: "drink",
    veg: true
  },
  {
    name: "Dương Chi Cam Lộ",
    sub: "Xoài, bưởi hồng & sữa dừa béo • Hong Kong",
    price: 52,
    image: 333,
    quip: "Món tráng miệng kinh điển, ngon ngất ngây từng thìa.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà đào cam sả",
    sub: "Đào miếng, cam vàng & sả tươi • Size M",
    price: 55,
    image: 334,
    quip: "Thức uống quốc dân, thanh lọc tâm hồn.",
    category: "drink",
    veg: true
  },
  {
    name: "Cà phê cốt dừa",
    sub: "Nước cốt dừa đá xay béo thơm",
    price: 55,
    image: 335,
    quip: "Cốt dừa béo ngậy kết hợp cà phê thơm lừng.",
    category: "drink",
    veg: true
  },
  {
    name: "Sinh tố bơ",
    sub: "Bơ sáp béo ngậy sánh mịn",
    price: 55,
    image: 336,
    quip: "Đặc quánh sánh mịn, béo ngậy thơm ngon.",
    category: "drink",
    veg: true
  },
  {
    name: "Sinh tố mãng cầu",
    sub: "Mãng cầu tươi sánh mịn chua ngọt",
    price: 55,
    image: 337,
    quip: "Chua ngọt thanh mát, hồi sinh năng lượng.",
    category: "drink",
    veg: true
  },
  {
    name: "Cold Brew cam sả",
    sub: "Cà phê ủ lạnh kết hợp cam sả",
    price: 58,
    image: 338,
    quip: "Ủ lạnh mượt mà, vị chua thanh tinh tế.",
    category: "drink",
    veg: true
  },
  {
    name: "Matcha đá xay",
    sub: "Matcha Nhật kèm kem whipping béo",
    price: 60,
    image: 339,
    quip: "Mát lạnh sảng khoái, ngập tràn kem whipping.",
    category: "drink",
    veg: true
  },

  // 3. Chuỗi thương hiệu & Dòng cao cấp (65k - 80k) -> Rarity 2 (Classified / Hồng)
  {
    name: "Sữa tươi trân châu đường đen",
    sub: "Sữa tươi thanh trùng & trân châu dẻo",
    price: 65,
    image: 340,
    quip: "Đường đen vân hổ, trân châu dẻo thơm cực đã.",
    category: "drink",
    veg: true
  },
  {
    name: "Ô Long Nhài Sữa (Phê La)",
    sub: "Trà ô long nhài đặc sản Đà Lạt • Phê La",
    price: 75,
    image: 341,
    quip: "Đậm vị trà ô long, thơm nức hương nhài trứ danh.",
    category: "drink",
    veg: true
  },
  {
    name: "Freeze Trà Xanh (Highlands)",
    sub: "Freeze trà xanh thạch giòn dai • Highlands",
    price: 75,
    image: 342,
    quip: "Freeze mát rượi kèm thạch trà giòn sần sật.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa chôm chôm (Katinat)",
    sub: "Trà sữa lài kèm chôm chôm tươi • Katinat",
    price: 80,
    image: 343,
    quip: "Thịt chôm chôm giòn ngọt hòa quyện trà sữa lài béo thơm.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà Ô Long sữa (Phúc Long)",
    sub: "Đậm đà hương trà mộc trứ danh • Phúc Long",
    price: 80,
    image: 346,
    quip: "Vị trà đậm đà khó quên, thương hiệu trà quốc dân.",
    category: "drink",
    veg: true
  },
  {
    name: "Trà sữa Alisan (Gong Cha)",
    sub: "Trà Alisan thượng hạng Đài Loan • Gong Cha",
    price: 80,
    image: 347,
    quip: "Thanh tao hương trà núi cao Alisan danh tiếng.",
    category: "drink",
    veg: true
  },

  // 4. Cao cấp quốc tế (105k - 110k) -> Rarity 3 (Covert / Đỏ)
  {
    name: "Caramel Macchiato (Starbucks)",
    sub: "Espresso, sữa tươi & sốt caramel • Starbucks",
    price: 105,
    image: 344,
    quip: "Đẳng cấp cà phê chuẩn Ý, ngập tràn hương sốt caramel.",
    category: "drink",
    veg: true
  },
  {
    name: "Frappuccino (Starbucks)",
    sub: "Cà phê đá xay kem whipping • Starbucks",
    price: 110,
    image: 345,
    quip: "Legendary drop. Thức uống biểu tượng toàn cầu!",
    category: "drink",
    veg: true
  }
];

export const drinks: Food[] = rawDrinks.map(drink => ({
  ...drink,
  category: 'drink',
  meals: ['breakfast', 'lunch', 'afternoon', 'dinner', 'latenight'],
  rarity: priceRarity(drink.price)
}));
