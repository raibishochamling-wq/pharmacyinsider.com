// Central restaurant data — single source of truth for the site
export const restaurant = {
  name: "Wakra Salt and Pepper",
  branch: "Al Mashaf Branch",
  tagline: "Authentic Traditional Indian & Chinese Cuisine",
  rating: 4.5,
  reviewCount: 83,
  priceRange: "QAR 1–50",
  pricePerPerson: "QAR 1–50 per person",
  cuisine: ["Indian", "Chinese", "BBQ", "Biryani"],
  established: "Family Restaurant",
  phone: "7038 3388",
  phoneDisplay: "+974 7038 3388",
  website: "wakrasaltandpepper.com",
  websiteUrl: "https://wakrasaltandpepper.com",
  orderUrl: "https://talabat.com",
  email: "hello@wakrasaltandpepper.com",
  address: {
    line1: "Zone 91, Building 152, Grand Express Hypermarket",
    line2: "Street 212, Near Al Mashaf Rd",
    city: "Al Wukair",
    country: "Qatar",
    full: "Zone 91 Building 152, Grand Express Hypermarket, Street 212, Near Al Mashaf Rd, Al Wukair",
    plusCode: "5HG8+FW Al Wukair",
  },
  hours: {
    today: "Open · Closes 1 AM",
    weekly: [
      { day: "Monday", hours: "9:00 AM – 1:00 AM" },
      { day: "Tuesday", hours: "9:00 AM – 1:00 AM" },
      { day: "Wednesday", hours: "9:00 AM – 1:00 AM" },
      { day: "Thursday", hours: "9:00 AM – 1:00 AM" },
      { day: "Friday", hours: "9:00 AM – 1:00 AM" },
      { day: "Saturday", hours: "9:00 AM – 1:00 AM" },
      { day: "Sunday", hours: "9:00 AM – 1:00 AM" },
    ],
  },
  services: [
    {
      key: "dine-in",
      title: "Dine-in",
      description:
        "Relax in our warm, family-friendly dining space — perfect for everyday meals, family gatherings and birthday celebrations.",
      icon: "utensils",
    },
    {
      key: "takeaway",
      title: "Takeaway",
      description:
        "Order ahead and pick up hot, freshly prepared dishes at your convenience. Quick, easy and budget-friendly.",
      icon: "shopping-bag",
    },
    {
      key: "delivery",
      title: "Delivery",
      description:
        "Get your favourite Indian and Chinese dishes delivered hot to your doorstep across Al Wukair and nearby areas.",
      icon: "bike",
    },
  ],
} as const;

export const menuHighlights = [
  {
    name: "Butter Chicken",
    description:
      "Tender tandoori chicken simmered in a velvety tomato-butter gravy with a whisper of cream and aromatic spices. Our most-loved signature dish.",
    price: "QAR 28",
    tag: "Bestseller",
    image: "https://sfile.chatglm.cn/images-ppt/612bfacab214.jpg",
    alt: "Bowl of creamy butter chicken curry garnished with coriander",
    badge: "Chef's Pick",
  },
  {
    name: "Paneer 65",
    description:
      "Crispy golden paneer cubes tossed in a fiery South-Indian style batter with curry leaves, green chillies and a tangy twist. A perfect starter.",
    price: "QAR 22",
    tag: "Veg · Spicy",
    image: "https://sfile.chatglm.cn/images-ppt/8b8769ca7921.png",
    alt: "Spicy paneer 65 appetizer garnished with curry leaves",
    badge: "Popular",
  },
  {
    name: "Fresh Beef Pallicurry Ghee Rice Combo",
    description:
      "Slow-cooked beef pallicurry in roasted coconut masala, served with fragrant ghee rice. A hearty traditional Kerala-style combo plate.",
    price: "QAR 35",
    tag: "Combo",
    image: "https://sfile.chatglm.cn/images-ppt/a509b87e9e06.jpg",
    alt: "Beef pallicurry served with ghee rice on a plate",
    badge: "Hearty",
  },
  {
    name: "Kanji with Chicken",
    description:
      "Comforting rice porridge (kanji) paired with spiced chicken curry. Soul food from the Kerala coast — light, flavourful and deeply satisfying.",
    price: "QAR 18",
    tag: "Comfort",
    image: "https://sfile.chatglm.cn/images-ppt/daeaa004c770.jpg",
    alt: "Traditional rice kanji served with chicken curry",
    badge: "Soul Food",
  },
  {
    name: "Poori (1 pc)",
    description:
      "Puffed golden deep-fried whole-wheat bread, served piping hot. Pair it with our potato masala or any curry for a classic breakfast treat.",
    price: "QAR 5",
    tag: "Bread",
    image: "https://sfile.chatglm.cn/images-ppt/6a5cd3e0b94d.jpg",
    alt: "Puffy golden poori bread on a plate",
    badge: "Fresh",
  },
] as const;

export const reviews = [
  {
    name: "m k",
    meta: "1 review · 5 photos",
    rating: 5,
    time: "4 months ago",
    title: "Birthday celebration to remember!",
    text: "5/5 stars! We celebrated our birthday at Salt & Pepper, Al Mashaf, and it was AMAZING! The food was on point, staff was super polite and helpful, and the arrangements were top-notch. We felt so special and taken care of. Highly recommend for any celebration.",
    ownerResponse:
      "Thank you for sharing your experience with us. We are honored to have been part of your birthday celebration and are pleased to hear that you enjoyed our food, service, and arrangements. Your recommendation is greatly appreciated, and we look forward to serving you again soon.",
    initials: "MK",
  },
  {
    name: "Rasiya Rafi",
    meta: "4 reviews · 9 photos",
    rating: 5,
    time: "2 months ago",
    title: "Good quality, quantity & authentic flavours",
    text: "Service along with good quality and quantity — authentic traditional Indian and Chinese dishes. A reliable spot in Al Wukair when you want a proper home-style meal without compromising on taste or portion size.",
    ownerResponse: "",
    initials: "RR",
  },
  {
    name: "Sebin Joseph",
    meta: "Local Guide · 8 reviews · 1 photo",
    rating: 5,
    time: "a month ago",
    title: "Yummy food, friendly staff, budget friendly",
    text: "Yummy food, friendly staff, budget-friendly food space. Exactly the kind of neighbourhood restaurant you keep coming back to. Will definitely visit again.",
    ownerResponse: "",
    initials: "SJ",
  },
] as const;

export const reviewTags = [
  "biriyani",
  "family restaurant",
  "bbq",
  "kind staff",
  "authentic",
  "budget friendly",
  "friendly staff",
] as const;

export const heroImage =
  "https://sfile.chatglm.cn/images-ppt/6f8609248653.jpg";
export const interiorImage =
  "https://sfile.chatglm.cn/images-ppt/518352ed8ad2.png";

export const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=Wakra+Salt+and+Pepper+Al+Mashaf+Al+Wukair";
export const mapsDirectionsLink =
  "https://www.google.com/maps/dir/?api=1&destination=5HG8%2BFW+Al+Wukair+Qatar";
