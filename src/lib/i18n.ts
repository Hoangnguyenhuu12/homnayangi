import type { Food } from './foods';

export type Language = 'vi' | 'en';
export type MealType = 'breakfast' | 'lunch' | 'afternoon' | 'dinner' | 'latenight';
export type FoodCategory = 'food' | 'drink';

export const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'afternoon', 'dinner', 'latenight'];

export const copy = {
  vi: {
    tiers: ['QUỐC DÂN', 'HIẾM', 'CỰC PHẨM', 'TỐI MẬT', '★ ĐẶC BIỆT'],
    title: 'Mở hòm món ăn trưa', titlePrefix: 'Mở hòm', titleMiddle: '', titleSuffix: '',
    categories: {
      food: 'món ăn',
      drink: 'nước uống',
    } as Record<FoodCategory, string>,
    meals: {
      breakfast: 'sáng',
      lunch: 'trưa',
      afternoon: 'chiều',
      dinner: 'tối',
      latenight: 'khuya',
    } as Record<MealType, string>,
    pageTitles: {
      food: {
        breakfast: 'Sáng nay ăn gì?',
        lunch: 'Trưa nay ăn gì?',
        afternoon: 'Chiều nay ăn gì?',
        dinner: 'Tối nay ăn gì?',
        latenight: 'Đêm nay ăn gì?',
      },
      drink: {
        breakfast: 'Sáng nay uống gì?',
        lunch: 'Trưa nay uống gì?',
        afternoon: 'Chiều nay uống gì?',
        dinner: 'Tối nay uống gì?',
        latenight: 'Đêm nay uống gì?',
      },
    } as Record<FoodCategory, Record<MealType, string>>,
    counterPrefix: 'Đã ghi nhận', counterSuffix: 'hòm',
    counterTitle: 'Lượt quay hoàn tất được ghi nhận trên website này', caseLabel: 'Mở hòm món ăn',
    soundOn: 'Âm thanh bật', soundOff: 'Âm thanh tắt', turnSoundOff: 'Tắt âm thanh', turnSoundOn: 'Bật âm thanh',
    github: 'Mở mã nguồn trên GitHub', starsPending: 'chưa tải', language: 'Switch to English',
    spend: 'Mức chi thường ngày', custom: 'Tuỳ chỉnh', customSpend: 'Mức chi tuỳ chỉnh (nghìn đồng)',
    thousandPerMeal: 'nghìn / bữa', spendError: 'Nhập từ 30 đến 180 nghìn.', vegetarianPool: 'Pool hiện tại: trung bình',
    vegetarianOnly: 'Chỉ ăn chay', vegetarian: 'Ăn chay', opening: 'ĐANG MỞ HÒM…', openAgain: 'MỞ LẠI', open: 'MỞ HÒM',
    newItem: 'VẬT PHẨM MỚI', referencePrice: 'Giá tham khảo', perPerson: '/ người', find: 'TÌM QUÁN', continue: 'TIẾP TỤC', nearby: 'gần đây',
    whatsInside: 'TRONG HÒM CÓ GÌ?', items: 'Vật phẩm trong hòm', mystery: '★ MÓN BÍ ẨN', mysteryAlt: 'Món bí ẩn hạng vàng',
    footer: 'Fan-made · SFX: Valve /', lunchDish: 'Món ăn trưa', vegetarianDish: 'Chay',
  },
  en: {
    tiers: ['MIL-SPEC', 'RESTRICTED', 'CLASSIFIED', 'COVERT', '★ SPECIAL ITEM'],
    title: 'Open a food case for lunch', titlePrefix: 'Open a', titleMiddle: 'case for', titleSuffix: '',
    categories: {
      food: 'food',
      drink: 'drink',
    } as Record<FoodCategory, string>,
    meals: {
      breakfast: 'breakfast',
      lunch: 'lunch',
      afternoon: 'afternoon',
      dinner: 'dinner',
      latenight: 'late night',
    } as Record<MealType, string>,
    pageTitles: {
      food: {
        breakfast: 'What should I eat for breakfast?',
        lunch: 'What should I eat for lunch?',
        afternoon: 'What should I eat for afternoon snack?',
        dinner: 'What should I eat for dinner?',
        latenight: 'What should I eat for late night?',
      },
      drink: {
        breakfast: 'What should I drink for breakfast?',
        lunch: 'What should I drink for lunch?',
        afternoon: 'What should I drink this afternoon?',
        dinner: 'What should I drink for dinner?',
        latenight: 'What should I drink late at night?',
      },
    } as Record<FoodCategory, Record<MealType, string>>,
    counterPrefix: 'Recorded', counterSuffix: 'cases',
    counterTitle: 'Completed spins recorded on this website', caseLabel: 'Open a lunch case',
    soundOn: 'Sound on', soundOff: 'Sound off', turnSoundOff: 'Mute sound', turnSoundOn: 'Enable sound',
    github: 'Open source on GitHub', starsPending: 'not loaded', language: 'Chuyển sang tiếng Việt',
    spend: 'Usual lunch spend', custom: 'Custom', customSpend: 'Custom spend (thousand VND)',
    thousandPerMeal: 'thousand VND / meal', spendError: 'Enter 30–180 thousand VND.', vegetarianPool: 'Current pool average',
    vegetarianOnly: 'Vegetarian only', vegetarian: 'Vegetarian', opening: 'OPENING CASE…', openAgain: 'OPEN AGAIN', open: 'OPEN CASE',
    newItem: 'NEW ITEM', referencePrice: 'Typical price', perPerson: '/ person', find: 'FIND NEARBY', continue: 'CONTINUE', nearby: 'near me',
    whatsInside: "WHAT'S IN THE CASE?", items: 'Items in this case', mystery: '★ MYSTERY DISH', mysteryAlt: 'Gold-tier mystery dish',
    footer: 'Fan-made · SFX: Valve /', lunchDish: 'Lunch dish', vegetarianDish: 'Vegetarian',
  },
} as const;

const englishNames: Record<number, string> = {
  0:'Broken rice with pork',1:'Beef pho',2:'Banh mi',3:'Grilled pork noodles',4:'Salmon sushi',5:'Pizza',6:'Fried chicken',7:'Vegetarian rice plate',8:'Bibimbap',
  9:'Hoi An chicken rice',10:'Hue beef noodle soup',11:'Hu tieu noodle soup',12:'Quang noodles',13:'Grilled pork vermicelli',14:'Steamed rice rolls',15:'Tofu noodles with shrimp paste',16:'Beef & pickle fried rice',17:'Shaking beef',18:'Vietnamese crispy pancake',19:'Crab red noodle soup',20:'Beef stir-fried noodles',21:'Fish noodle soup',22:'Fresh spring rolls',23:'Pork rib congee',
  24:'Ramen',25:'Udon',26:'Japanese curry rice',27:'Tteokbokki',28:'Beef burger',29:'Spaghetti bolognese',30:'Pad Thai',31:'Tom yum noodles',32:'Vegetarian mushroom hotpot',33:'Vegetarian mushroom noodles',34:'Vegetarian banh mi',35:'Vegetarian spring rolls',36:'Vietnamese rice plate',
  39:'Crispy chicken rice',42:'Crab tomato noodle soup',43:'Crab thick noodle soup',44:'Vietnamese steak & eggs',45:'Teriyaki chicken rice',46:'Tonkatsu rice',47:'Seafood fried rice',48:'Braised duck noodles',49:'Kimbap',50:'Korean mixed noodles',51:'Chicken breast salad',52:'Creamy bacon pasta',53:'Beef lasagna',54:'Cheeseburger & fries',55:'Pepperoni pizza',56:'Gyudon beef bowl',57:'Grilled mackerel rice',58:'Japanese soba',59:'Thai curry rice',60:'Tuna salad',61:'Quinoa chickpea salad',62:'Beef steak',63:'Pan-seared salmon',64:'Japanese eel rice',65:'Korean grilled beef rice',66:'Salmon teriyaki rice',67:'Salmon poke',68:'BBQ ribs',69:'Seafood pizza',70:'Seafood pasta',71:'Personal beef hotpot',
  72:'Chicken pho',73:'Pho rolls',74:'Pork meatball noodle soup',75:'Duck & bamboo noodle soup',76:'Southern beef noodle salad',77:'Fermented fish noodle soup',78:'Vegetarian noodle bowl',79:'Pork knuckle thick noodle soup',80:'Chicken glass noodle soup',81:'Eel glass noodle soup',82:'Duck congee',83:'Pork offal congee',84:'Roast pork rice vermicelli sheets',85:'Grilled pork sausage rolls',86:'Dim sum',87:'Wonton noodles',88:'Taiwanese beef noodles',89:'Crispy stir-fried noodles',90:'Singapore claypot rice',91:'Hainanese chicken rice',92:'Oyakodon chicken & egg rice',93:'Tempura rice bowl',94:'Spicy Korean noodles',95:'Jajangmyeon black bean noodles',96:'Naengmyeon cold noodles',97:'Kimchi stew with rice',98:'Soft tofu stew with rice',99:'Korean cheese chicken',100:'Kimchi fried rice',101:'Personal Thai hotpot',102:'Personal sukiyaki hotpot',103:'Indian curry & naan',104:'Chicken biryani',105:'Okonomiyaki',106:'Sandwich',107:'Doner kebab',108:'Chicken wrap',109:'Burrito',110:'Tacos',111:'Quesadilla',112:'Fish & chips',113:'Roast chicken & potatoes',114:'Mac & cheese',115:'Pesto pasta',116:'Salmon pasta',117:'Risotto',118:'Gnocchi',119:'Falafel & pita',
  120:'Beef macaroni stir-fry',121:'Chicken congee',122:'Vietnamese beef stew & banh mi',123:'Savory sticky rice',124:'Vietnamese skillet banh mi',125:'Char siu rice',126:'Roast duck rice',127:'Char siu noodles',128:'Stir-fried udon',129:'Chicken burger & fries',130:'Tomato mascarpone pasta',131:'Stir-fried glass noodles',
  200:'Sweet sticky rice',201:'Steamed bun',202:'Pyramid rice dumpling',203:'Fried rice flour cake',204:'Snakehead fish noodle soup',205:'Crab soup',206:'Vietnamese pizza',207:'Dim sum dumplings',208:'Stir-fried beef pho',209:'Snails & shellfish',210:'Chicken feet',211:'Water fern cake (Banh beo)',
  300:'Taiwanese black tea',301:'Sugarcane juice',302:'Iced black coffee',303:'Giant kumquat tea',304:'Pennywort mung bean juice',
  305:'Oolong Moc Huong tea',306:'Jasmine green tea',307:'Winter melon tea',308:'Lemon black tea',309:'Taiwanese milk tea',
  310:'Iced milk coffee',311:'Black tea with fresh cream',312:'Oolong milk tea',313:'Jasmine milk tea',314:'Winter melon milk tea',
  315:'Lychee milk tea',316:'Bac xiu milk coffee',317:'Salted coffee',318:'Hand-crushed lemon tea',319:'Iced yogurt drink',
  320:'Brown sugar boba milk tea',321:'Roasted milk tea',322:'Black tea latte',323:'Chocolate milk tea',324:'Peach oolong tea',
  325:'Lychee oolong tea',326:'Mulberry tea',327:'Fresh orange juice',328:'Mango oolong tea',329:'Pink guava tea',
  330:'Oolong latte',331:'Soursop fruit tea',332:'Matcha latte',333:'Mango pomelo sago',334:'Peach lemongrass tea',
  335:'Coconut coffee',336:'Avocado smoothie',337:'Soursop smoothie',338:'Cold brew orange lemongrass',339:'Matcha ice blended',
  340:'Brown sugar boba fresh milk',341:'Phe La jasmine oolong milk tea',342:'Highlands freeze green tea',343:'Katinat rambutan milk tea',344:'Starbucks caramel macchiato',345:'Starbucks frappuccino',346:'Phuc Long oolong milk tea',347:'Gong Cha Alisan milk tea',
};

export function foodName(food: Food, language: Language) {
  return language === 'en' ? englishNames[food.image] ?? food.name : food.name;
}

export function foodSubtitle(food: Food, language: Language) {
  if (language === 'vi') return food.sub;
  if (food.category === 'drink') return 'Beverage';
  return food.veg ? copy.en.vegetarianDish : copy.en.lunchDish;
}

export function priceLabel(thousands: number | string, language: Language, approximate = false) {
  const value = Number(thousands) * 1000;
  const formatted = language === 'en' ? `₫${new Intl.NumberFormat('en-US').format(value)}` : `${new Intl.NumberFormat('vi-VN').format(value)}đ`;
  return `${approximate ? '~' : ''}${formatted}`;
}
