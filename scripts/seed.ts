import { db } from '../src/lib/db'

async function main() {
  console.log('Seeding database...')

  // ===== Seed Menu Items =====
  const menuItems = [
    {
      name: 'Butter Chicken',
      description:
        'Tender tandoori chicken simmered in a velvety tomato-butter gravy with a whisper of cream and aromatic spices. Our most-loved signature dish.',
      price: 'QAR 28',
      category: 'Main',
      tag: 'Bestseller',
      badge: "Chef's Pick",
      image: 'https://sfile.chatglm.cn/images-ppt/612bfacab214.jpg',
      alt: 'Bowl of creamy butter chicken curry garnished with coriander',
      isFeatured: true,
      isAvailable: true,
      sortOrder: 1,
    },
    {
      name: 'Paneer 65',
      description:
        'Crispy golden paneer cubes tossed in a fiery South-Indian style batter with curry leaves, green chillies and a tangy twist. A perfect starter.',
      price: 'QAR 22',
      category: 'Starter',
      tag: 'Veg · Spicy',
      badge: 'Popular',
      image: 'https://sfile.chatglm.cn/images-ppt/8b8769ca7921.png',
      alt: 'Spicy paneer 65 appetizer garnished with curry leaves',
      isFeatured: true,
      isAvailable: true,
      sortOrder: 2,
    },
    {
      name: 'Fresh Beef Pallicurry Ghee Rice Combo',
      description:
        'Slow-cooked beef pallicurry in roasted coconut masala, served with fragrant ghee rice. A hearty traditional Kerala-style combo plate.',
      price: 'QAR 35',
      category: 'Combo',
      tag: 'Combo',
      badge: 'Hearty',
      image: 'https://sfile.chatglm.cn/images-ppt/a509b87e9e06.jpg',
      alt: 'Beef pallicurry served with ghee rice on a plate',
      isFeatured: true,
      isAvailable: true,
      sortOrder: 3,
    },
    {
      name: 'Kanji with Chicken',
      description:
        'Comforting rice porridge (kanji) paired with spiced chicken curry. Soul food from the Kerala coast — light, flavourful and deeply satisfying.',
      price: 'QAR 18',
      category: 'Comfort',
      tag: 'Comfort',
      badge: 'Soul Food',
      image: 'https://sfile.chatglm.cn/images-ppt/daeaa004c770.jpg',
      alt: 'Traditional rice kanji served with chicken curry',
      isFeatured: true,
      isAvailable: true,
      sortOrder: 4,
    },
    {
      name: 'Poori (1 pc)',
      description:
        'Puffed golden deep-fried whole-wheat bread, served piping hot. Pair it with our potato masala or any curry for a classic breakfast treat.',
      price: 'QAR 5',
      category: 'Bread',
      tag: 'Bread',
      badge: 'Fresh',
      image: 'https://sfile.chatglm.cn/images-ppt/6a5cd3e0b94d.jpg',
      alt: 'Puffy golden poori bread on a plate',
      isFeatured: true,
      isAvailable: true,
      sortOrder: 5,
    },
  ]

  for (const item of menuItems) {
    await db.menuItem.upsert({
      where: { id: item.name.replace(/\s+/g, '-').toLowerCase() + '-seed' },
      update: {},
      create: { ...item, id: item.name.replace(/\s+/g, '-').toLowerCase() + '-seed' },
    })
  }
  console.log(`Seeded ${menuItems.length} menu items`)

  // ===== Seed Reviews =====
  const reviews = [
    {
      name: 'm k',
      meta: '1 review · 5 photos',
      initials: 'MK',
      rating: 5,
      title: 'Birthday celebration to remember!',
      text: "5/5 stars! We celebrated our birthday at Salt & Pepper, Al Mashaf, and it was AMAZING! The food was on point, staff was super polite and helpful, and the arrangements were top-notch. We felt so special and taken care of. Highly recommend for any celebration.",
      ownerResponse:
        "Thank you for sharing your experience with us. We are honored to have been part of your birthday celebration and are pleased to hear that you enjoyed our food, service, and arrangements. Your recommendation is greatly appreciated, and we look forward to serving you again soon.",
      isPublished: true,
    },
    {
      name: 'Rasiya Rafi',
      meta: '4 reviews · 9 photos',
      initials: 'RR',
      rating: 5,
      title: 'Good quality, quantity & authentic flavours',
      text: 'Service along with good quality and quantity — authentic traditional Indian and Chinese dishes. A reliable spot in Al Wukair when you want a proper home-style meal without compromising on taste or portion size.',
      ownerResponse: '',
      isPublished: true,
    },
    {
      name: 'Sebin Joseph',
      meta: 'Local Guide · 8 reviews · 1 photo',
      initials: 'SJ',
      rating: 5,
      title: 'Yummy food, friendly staff, budget friendly',
      text: 'Yummy food, friendly staff, budget-friendly food space. Exactly the kind of neighbourhood restaurant you keep coming back to. Will definitely visit again.',
      ownerResponse: '',
      isPublished: true,
    },
  ]

  for (const review of reviews) {
    await db.review.create({ data: review })
  }
  console.log(`Seeded ${reviews.length} reviews`)

  // ===== Seed Restaurant Settings =====
  const settings = [
    { key: 'name', value: 'Wakra Salt and Pepper' },
    { key: 'branch', value: 'Al Mashaf Branch' },
    { key: 'tagline', value: 'Authentic Traditional Indian & Chinese Cuisine' },
    { key: 'phone', value: '7038 3388' },
    { key: 'phoneDisplay', value: '+974 7038 3388' },
    { key: 'website', value: 'wakrasaltandpepper.com' },
    { key: 'websiteUrl', value: 'https://wakrasaltandpepper.com' },
    { key: 'orderUrl', value: 'https://talabat.com' },
    { key: 'address1', value: 'Zone 91, Building 152, Grand Express Hypermarket' },
    { key: 'address2', value: 'Street 212, Near Al Mashaf Rd' },
    { key: 'city', value: 'Al Wukair' },
    { key: 'country', value: 'Qatar' },
    { key: 'plusCode', value: '5HG8+FW Al Wukair' },
    { key: 'hoursToday', value: 'Open · Closes 1 AM' },
    { key: 'hoursMon', value: '9:00 AM – 1:00 AM' },
    { key: 'hoursTue', value: '9:00 AM – 1:00 AM' },
    { key: 'hoursWed', value: '9:00 AM – 1:00 AM' },
    { key: 'hoursThu', value: '9:00 AM – 1:00 AM' },
    { key: 'hoursFri', value: '9:00 AM – 1:00 AM' },
    { key: 'hoursSat', value: '9:00 AM – 1:00 AM' },
    { key: 'hoursSun', value: '9:00 AM – 1:00 AM' },
    { key: 'adminPassword', value: 'admin123' },
  ]

  for (const s of settings) {
    await db.restaurantSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }
  console.log(`Seeded ${settings.length} settings`)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
