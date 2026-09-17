import { Product, CategoryInfo, Order } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'gadgets',
    name: 'Gadgets & Tech',
    tagline: 'Smart Living & Audio Gear',
    description: 'High performance wireless audio, smart wearables, fast chargers, and lifestyle electronics built for the modern everyday.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
    featuredSubcategories: ['Wireless Audio', 'Smartwatches', 'Power & Chargers', 'Drone & Camera']
  },
  {
    slug: 'clothing',
    name: 'Apparel & Streetwear',
    tagline: 'Premium Comfort & Modern Silhouette',
    description: 'Heavyweight organic cotton tees, water-repellent tactical outerwear, hoodies, and athletic comfort wear.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
    featuredSubcategories: ['Oversized Tees', 'Hoodies & Fleece', 'Cargo Pants', 'Jackets']
  },
  {
    slug: 'accessories',
    name: 'Everyday Accessories',
    tagline: 'Utility, Aesthetics & Durability',
    description: 'Minimalist RFID-blocking wallets, ballistic nylon commuter backpacks, insulated flasks, and optical sunglasses.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
    featuredSubcategories: ['Backpacks', 'Wallets', 'Eyewear', 'Hydration']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-g1',
    name: 'TKR SoundPulse ANC Pro Wireless Headphones',
    slug: 'tkr-soundpulse-anc-pro-headphones',
    category: 'gadgets',
    categoryName: 'Gadgets & Tech',
    subcategory: 'Wireless Audio',
    price: 79.99,
    originalPrice: 129.99,
    discountPercentage: 38,
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
    stockCount: 28,
    isFeatured: true,
    isTrending: true,
    badge: 'Bestseller',
    shortDescription: 'Hybrid 42dB Active Noise Cancellation with 45-hour ultra endurance battery and studio Hi-Res audio.',
    description: 'The TKR SoundPulse ANC Pro combines audiophile-grade 40mm titanium drivers with dual-mic feedforward noise cancellation. Designed for deep focus at work, noisy flights, or daily commuting, it delivers punchy sub-bass, transparent mids, and crystal-clear treble.',
    features: [
      'Hybrid 42dB Active Noise Cancelling with Transparency Ambient mode',
      '40mm custom tuned bio-cellulose dynamic drivers with LDAC Hi-Res audio',
      'Up to 48 hours battery life (38 hours with ANC active) + USB-C fast charge',
      'Plush memory foam leather ear cushions with breathable ergonomic headband',
      'Dual device multipoint Bluetooth 5.3 connection'
    ],
    specs: {
      'Bluetooth Version': '5.3 Multipoint',
      'Driver Diameter': '40 mm Custom Titanium',
      'Frequency Response': '20Hz - 40kHz (Hi-Res certified)',
      'Battery Capacity': '650 mAh',
      'Charging Time': '1.5 hours (10 mins gives 5 hours)',
      'Weight': '248 grams',
      'Water Resistance': 'IPX4 sweat resistant'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1e293b' },
      { name: 'Silver Mist', hex: '#cbd5e1' },
      { name: 'Navy Cobalt', hex: '#1e3a8a' }
    ],
    warranty: '1-Year Official TKR Hub Replacement Warranty',
    shippingNote: 'Ships in 24 hours. Cash-on-Delivery with doorstep inspection allowed.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Farhan Rahman',
        rating: 5,
        date: '2026-03-02',
        title: 'Insane sound quality for the price!',
        comment: 'Received the parcel in 2 days via Cash on Delivery. Opened and verified with the courier. The noise cancelling blocks out subway rumbling effortlessly.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '2026-02-18',
        title: 'Comfortable for 8 hour work shifts',
        comment: 'Soft memory foam doesn’t squeeze my glasses at all. Microphone picks up my voice clearly in Zoom meetings.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-g2',
    name: 'TKR ChronoFit Ultra Smartwatch AMOLED',
    slug: 'tkr-chronofit-ultra-smartwatch',
    category: 'gadgets',
    categoryName: 'Gadgets & Tech',
    subcategory: 'Smartwatches',
    price: 54.50,
    originalPrice: 89.00,
    discountPercentage: 39,
    rating: 4.7,
    reviewsCount: 98,
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isTrending: true,
    badge: 'Popular',
    shortDescription: '1.96-inch HD AMOLED Always-On Display with 24/7 SpO2 health tracking, Bluetooth calling, and 12-day battery.',
    description: 'Engineered with an aerospace-grade zinc alloy unibody and high-definition vivid AMOLED display, the ChronoFit Ultra keeps you connected on the go. Answer calls directly from your wrist, monitor cardiovascular metrics, and track 120+ workout modes.',
    features: [
      '1.96" Ultra AMOLED curved display with 1000 nits peak outdoor brightness',
      'One-tap Bluetooth calling with high-clarity speaker and noise-reduced mic',
      'Comprehensive 24/7 biological sensor (Heart rate, SpO2, Sleep stages, Stress)',
      'IP68 5ATM water resistant for swimming and rainy weather workouts',
      'Magnetic fast charging with up to 14 days standby battery life'
    ],
    specs: {
      'Display': '1.96" AMOLED (410 x 502 px)',
      'Battery Life': '8-12 days typical use, 20 days standby',
      'Sensors': 'Optical PPG, Accelerometer, SpO2, Geomagnetic',
      'Connectivity': 'Bluetooth 5.2 BLE',
      'Compatibility': 'iOS 11.0+ / Android 6.0+',
      'Strap Material': 'Food-grade liquid silicone (22mm quick release)'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155' },
      { name: 'Starlight Gold', hex: '#d4af37' },
      { name: 'Midnight Black', hex: '#0f172a' }
    ],
    warranty: '12-Month Limited Hardware Guarantee',
    shippingNote: 'Free nationwide express delivery for all prepaid and COD orders.',
    reviews: [
      {
        id: 'rev-3',
        author: 'Tanvir Hossain',
        rating: 5,
        date: '2026-03-08',
        title: 'Screen is bright even under direct sunlight',
        comment: 'The AMOLED screen looks like a $300 watch. Step tracking is spot on and the battery lasts well over a week on a single charge.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-g3',
    name: 'TKR MagPower 20,000mAh 65W Fast Charge Bank',
    slug: 'tkr-magpower-20000mah-fast-charge-bank',
    category: 'gadgets',
    categoryName: 'Gadgets & Tech',
    subcategory: 'Power & Chargers',
    price: 38.00,
    originalPrice: 58.00,
    discountPercentage: 34,
    rating: 4.9,
    reviewsCount: 184,
    inStock: true,
    stockCount: 50,
    isFeatured: false,
    isTrending: true,
    badge: 'Hot Deal',
    shortDescription: '65W Power Delivery laptop and phone power bank with smart LCD status display and MagSafe wireless magnetic pad.',
    description: 'Never get stranded with low battery again. The TKR MagPower packs 20,000mAh into an airline-approved aluminum housing capable of charging MacBook Pro, iPad, iPhone, and Android devices at blazing speeds.',
    features: [
      '65W Dual USB-C Power Delivery — charges laptops from 0% to 50% in 35 mins',
      '15W Qi-certified magnetic wireless charging pad on top deck',
      'High contrast smart numeric LED screen displaying exact percentage and wattage',
      'Multi-protect 9-point safety circuit guarding against overcharging & overheating',
      'Simultaneous 3-device charging support'
    ],
    specs: {
      'Capacity': '20,000 mAh / 74Wh (FAA Airline Approved)',
      'USB-C1 Output': '5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/3.25A (65W Max)',
      'Wireless Output': '5W / 7.5W / 10W / 15W Max',
      'Dimensions': '145 x 68 x 28 mm',
      'Weight': '390 grams'
    },
    images: [
      'https://images.unsplash.com/photo-1609592424388-75607b22a613?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Gunmetal Titanium', hex: '#475569' },
      { name: 'Matte Carbon', hex: '#1e293b' }
    ],
    warranty: '6 Months Replacement Warranty',
    shippingNote: 'Shipped in protective tamper-proof packaging with battery transport compliance.',
    reviews: [
      {
        id: 'rev-4',
        author: 'Zubair Al-Mamun',
        rating: 5,
        date: '2026-02-28',
        title: 'Powers my laptop effortlessly on bus journeys',
        comment: 'Solid build quality. The digital display shows current input/output wattages accurately.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-g4',
    name: 'TKR StreamWave Pro Studio USB Condenser Mic',
    slug: 'tkr-streamwave-pro-studio-usb-mic',
    category: 'gadgets',
    categoryName: 'Gadgets & Tech',
    subcategory: 'Audio Gear',
    price: 49.99,
    originalPrice: 75.00,
    discountPercentage: 33,
    rating: 4.6,
    reviewsCount: 67,
    inStock: true,
    stockCount: 18,
    isFeatured: false,
    badge: 'Creator Choice',
    shortDescription: 'Broadcast cardioid USB microphone with built-in shockmount, tap-to-mute RGB sensor, and headphone monitor jack.',
    description: 'Designed for podcasters, gamers, vocalists, and remote professionals who want studio warmth without complicated audio interfaces. Simply plug in with the braided USB-C cable and start recording in 24-bit/192kHz master quality.',
    features: [
      'Cardioid condenser capsule tailored to reject background keyboard and ambient noise',
      'Zero-latency 3.5mm headphone monitoring port with independent gain wheel',
      'Instant tap-to-mute capacitive sensor with visible LED mute indicator',
      'Heavy cast-iron desktop stand with anti-vibration rubber isolation base',
      'Plug-and-play compatibility on Mac, Windows, PS5, and Android'
    ],
    specs: {
      'Sample Rate': '192kHz / 24-bit',
      'Polar Pattern': 'Cardioid Unidirectional',
      'Sensitivity': '-38dB ± 2dB',
      'Connector': 'USB Type-C to Type-A / Type-C (2m braided cable included)',
      'Stand Material': 'Die-cast zinc alloy'
    },
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590658006821-04f4008d5717?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Stealth Black', hex: '#09090b' },
      { name: 'Arctic White', hex: '#f8fafc' }
    ],
    warranty: '1 Year Manufacturer Warranty',
    shippingNote: 'COD available with safe protective styrofoam inner box.',
    reviews: []
  },
  {
    id: 'prod-c1',
    name: 'TKR Heavyweight Oversized Vintage Drop-Shoulder Tee',
    slug: 'tkr-heavyweight-oversized-vintage-tee',
    category: 'clothing',
    categoryName: 'Apparel & Streetwear',
    subcategory: 'Oversized Tees',
    price: 24.99,
    originalPrice: 38.00,
    discountPercentage: 34,
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stockCount: 85,
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    badge: 'Top Rated',
    shortDescription: '280 GSM 100% combed heavyweight cotton with pre-shrunk boxy cut and reinforced double-needle collar.',
    description: 'Crafted for timeless everyday wear, our signature Heavyweight Oversized Tee delivers the quintessential streetwear silhouette. Made from durable 280 GSM ring-spun cotton that holds its boxy structure wash after wash without warping.',
    features: [
      '280 GSM ultra-dense heavyweight combed organic cotton',
      'Relaxed boxy silhouette with dropped shoulder seam drape',
      'Reinforced 1.25" rib-knit collar that will never sag or bacon',
      'Pre-washed and enzyme treated for ultra-soft hand feel and zero shrink',
      'Subtle tonal TKR Hub silicone brand badge on lower left hem'
    ],
    specs: {
      'Fabric Composition': '100% Ring-Spun Combed Cotton',
      'Fabric Weight': '280 GSM (8.2 oz)',
      'Cut': 'Boxy relaxed oversized fit',
      'Care': 'Machine wash cold inside-out, tumble dry low or hang dry',
      'Origin': 'Ethically manufactured with OEKO-TEX certified dyes'
    },
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#334155' },
      { name: 'Bone Off-White', hex: '#f1f5f9' },
      { name: 'Forest Moss', hex: '#1e392a' },
      { name: 'Deep Midnight', hex: '#0f172a' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    warranty: '7-Day Easy Size & Color Exchange Guarantee',
    shippingNote: 'Check size chart. Doorstep trial allowed upon Cash on Delivery delivery.',
    reviews: [
      {
        id: 'rev-5',
        author: 'Arif Chowdhury',
        rating: 5,
        date: '2026-03-05',
        title: 'Heavy fabric, exactly what I was looking for',
        comment: 'Proper 280 GSM weight! Fits boxy and relaxed just like high-end streetwear brands that cost triple.',
        verified: true
      },
      {
        id: 'rev-6',
        author: 'Nabila Karim',
        rating: 5,
        date: '2026-02-22',
        title: 'Great collar that doesn’t stretch',
        comment: 'Washed it twice already and the neck ribbing is firm as new.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-c2',
    name: 'TKR TechFleece Tactical Pullover Hoodie 420 GSM',
    slug: 'tkr-techfleece-tactical-hoodie',
    category: 'clothing',
    categoryName: 'Apparel & Streetwear',
    subcategory: 'Hoodies & Fleece',
    price: 44.00,
    originalPrice: 68.00,
    discountPercentage: 35,
    rating: 4.8,
    reviewsCount: 165,
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    badge: 'Winter Ready',
    shortDescription: 'Heavy 420 GSM brushback cotton fleece hoodie with double-layer crossover hood and kangaroo hand-warmer pocket.',
    description: 'A fortress of warmth and clean aesthetics. Constructed with 420 GSM dense brushback cotton fleece, ribbed side gussets for freedom of movement, and deep concealed zippered phone pockets inside the front kangaroo pouch.',
    features: [
      '420 GSM premium heavyweight organic fleece with ultra-soft brushed interior',
      'Seamless double-layered deep hood with matching thick cotton drawstrings',
      'Hidden internal zip pocket for phone, keys, and cards',
      'Heavy-duty 2x2 ribbed cuffs and hem with spandex memory retention',
      'Bar-tack reinforced stress points for multi-year durability'
    ],
    specs: {
      'Material': '85% Organic Cotton, 15% Recycled Polyester (anti-pill)',
      'Weight': '420 GSM heavy fleece',
      'Fit': 'Contemporary relaxed street fit',
      'Pockets': 'Kangaroo pouch + 1 concealed YKK zipper pocket',
      'Care': 'Machine wash cold, air dry to preserve fleece softness'
    },
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Heather Smoke', hex: '#94a3b8' },
      { name: 'Sage Green', hex: '#4a5d4e' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    warranty: '7-Day Return & Size Exchange',
    shippingNote: 'Nationwide Cash-on-Delivery with 48h dispatch.',
    reviews: []
  },
  {
    id: 'prod-c3',
    name: 'TKR Urban Commuter Ripstop Cargo Joggers',
    slug: 'tkr-urban-commuter-ripstop-cargo-joggers',
    category: 'clothing',
    categoryName: 'Apparel & Streetwear',
    subcategory: 'Cargo Pants',
    price: 36.50,
    originalPrice: 55.00,
    discountPercentage: 33,
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    stockCount: 29,
    isFeatured: false,
    isTrending: true,
    badge: 'Utility',
    shortDescription: 'Water-resistant stretch ripstop fabric with 6 deep utility pockets, elasticated drawstring waistband and tapered cuffs.',
    description: 'Engineered for everyday urban mobility. Combines tear-resistant micro-ripstop with 4-way mechanical stretch, giving you total freedom of movement whether walking, cycling, or working.',
    features: [
      'Micro-ripstop nylon blend with DWR water-repellent coating',
      '6 strategic pockets: 2 slash hand pockets, 2 gusseted cargo pockets, 2 secure rear pockets',
      'Articulated knee darts for natural movement without binding',
      'Elastic waist with custom paracord cinch drawstring',
      'Ribbed ankle cuffs that keep your sneakers clearly on display'
    ],
    specs: {
      'Material': '92% Ripstop Nylon, 8% Spandex stretch',
      'Finish': 'Teflon DWR water & stain resistant',
      'Closure': 'Elastic drawstring waist + faux fly',
      'Fit': 'Relaxed thigh with ergonomic tapered ankle'
    },
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Military Khaki', hex: '#78716c' },
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Dark Olive', hex: '#3f4f34' }
    ],
    sizes: ['30', '32', '34', '36'],
    warranty: '7-Day Return Policy',
    shippingNote: 'Fast shipping with door-to-door COD courier tracking.',
    reviews: []
  },
  {
    id: 'prod-a1',
    name: 'TKR Nomad Shield 28L Waterproof Commuter Backpack',
    slug: 'tkr-nomad-shield-waterproof-commuter-backpack',
    category: 'accessories',
    categoryName: 'Everyday Accessories',
    subcategory: 'Backpacks',
    price: 49.99,
    originalPrice: 79.99,
    discountPercentage: 37,
    rating: 4.9,
    reviewsCount: 220,
    inStock: true,
    stockCount: 33,
    isFeatured: true,
    isTrending: true,
    badge: 'Staff Pick',
    shortDescription: 'Ballistic 900D weatherproof nylon with dedicated 16-inch suspended laptop vault and anti-theft hidden pocket.',
    description: 'The ultimate daily carry for modern digital nomads and students. Designed with structured 900D water-repellent nylon, waterproof sealed YKK Aquaguard zippers, and padded air-mesh shoulder straps that distribute heavy gear weight comfortably.',
    features: [
      'Suspended padded laptop compartment fits up to 16" MacBook Pro / gaming laptops',
      'High-density 900D ballistic matte nylon shell with water-tight seam protection',
      'Luggage pass-through strap for effortless airport rolling luggage travel',
      'Concealed RFID-blocking lumbar pocket for passport, cash, and smartphone',
      'Expandable magnetic quick-lock water bottle side pocket'
    ],
    specs: {
      'Capacity': '28 Liters',
      'Laptop Pocket': 'Up to 16.5" screen diagonal',
      'Dimensions': '48 x 32 x 18 cm',
      'Zippers': 'YKK Aquaguard weather-sealed',
      'Weight': '920 grams empty'
    },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Slate Black', hex: '#18181b' },
      { name: 'Charcoal Asphalt', hex: '#374151' }
    ],
    warranty: '2-Year TKR Hub Structural Guarantee',
    shippingNote: 'Delivered in heavy cardboard box to prevent creasing.',
    reviews: [
      {
        id: 'rev-7',
        author: 'Mahir Faisal',
        rating: 5,
        date: '2026-03-01',
        title: 'Survived heavy rain without a single drop inside',
        comment: 'Tested during monsoons. Laptop remained bone dry. The laptop cradle is suspended from the bottom so it never bumps when set down.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-a2',
    name: 'TKR Apex Minimalist Carbon RFID Bifold Wallet',
    slug: 'tkr-apex-minimalist-carbon-rfid-wallet',
    category: 'accessories',
    categoryName: 'Everyday Accessories',
    subcategory: 'Wallets',
    price: 19.99,
    originalPrice: 32.00,
    discountPercentage: 37,
    rating: 4.8,
    reviewsCount: 145,
    inStock: true,
    stockCount: 60,
    isFeatured: false,
    badge: 'EDC Essential',
    shortDescription: 'Aerospace forged carbon fiber face with full-grain leather core, holds 10 cards + cash with RFID shielding.',
    description: 'Ditch the bulky pocket bulge. The TKR Apex combines sleek forged carbon fiber aesthetic with genuine full-grain leather, providing RFID anti-theft scanner shielding while keeping your daily pocket setup slim and organized.',
    features: [
      'Certified 13.56 MHz RFID / NFC blocking protection layer',
      'Holds 8-12 cards + stainless steel spring-loaded cash clip',
      'Quick-access exterior thumb slide for your most used credit/metro card',
      'Forged carbon composite face plate with hand-burnished edges'
    ],
    specs: {
      'Thickness': 'Only 11 mm when loaded with 6 cards',
      'Material': 'Genuine Top-Grain Nappa Leather + Forged Carbon Fiber',
      'Weight': '58 grams',
      'Card Slots': '6 internal slots + 1 exterior quick-draw slot + cash clip'
    },
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Forged Carbon Black', hex: '#171717' },
      { name: 'Saddle Tan Leather', hex: '#78350f' }
    ],
    warranty: '1-Year Warranty',
    shippingNote: 'Ships in gift-ready matte black magnetic box.',
    reviews: []
  },
  {
    id: 'prod-g5',
    name: 'TKR Aeroflight 4K Mini GPS Obstacle Drone',
    slug: 'tkr-aeroflight-4k-mini-gps-drone',
    category: 'gadgets',
    categoryName: 'Gadgets & Tech',
    subcategory: 'Drone & Camera',
    price: 149.00,
    originalPrice: 220.00,
    discountPercentage: 32,
    rating: 4.7,
    reviewsCount: 76,
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    badge: 'New Tech',
    shortDescription: 'Under 249g registration-free foldable drone with 4K EIS 3-axis camera, 360° laser obstacle avoidance and 28 min flight.',
    description: 'Capture cinematic 4K footage without requiring FAA drone pilot certification. The Aeroflight weighs only 246 grams and features smart return-to-home GPS, active object tracking, and intuitive smartphone controller.',
    features: [
      'Ultra-light 246g airframe — exempt from drone registration regulations in most jurisdictions',
      'True 4K UHD 60fps camera with electronic image stabilization (EIS) and 90° motorized gimbal',
      'Dual GPS / GLONASS positioning with automated One-Key Return-to-Home failsafe',
      'Omnidirectional infrared laser sensors for collision prevention',
      'Includes ergonomic smartphone controller with 3km transmission distance'
    ],
    specs: {
      'Flight Time': '28 minutes per battery (2 batteries included in fly-more pack)',
      'Transmission Range': 'Up to 3,000 meters video downlink',
      'Video Resolution': '3840 x 2160 @ 30fps / 1080p @ 60fps',
      'Weight': '246 grams',
      'Wind Resistance': 'Level 5 (up to 38 km/h)'
    },
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Aero Lunar Gray', hex: '#64748b' }
    ],
    warranty: '1-Year Drone Care Warranty',
    shippingNote: 'Includes high-grade EVA hard travel case and spare propellers.',
    reviews: []
  },
  {
    id: 'prod-c4',
    name: 'TKR WeatherGuard Technical Windbreaker Jacket',
    slug: 'tkr-weatherguard-technical-windbreaker-jacket',
    category: 'clothing',
    categoryName: 'Apparel & Streetwear',
    subcategory: 'Jackets',
    price: 52.00,
    originalPrice: 85.00,
    discountPercentage: 38,
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    badge: 'All-Weather',
    shortDescription: 'Ultralight waterproof 3-layer laminated shell jacket with sealed taped seams and packable hood.',
    description: 'Built for transitional seasons, unexpected rain showers, and blustery winds. Breathable membrane keeps sweat vapor moving out while fully blocking wind chill and downpours.',
    features: [
      '10,000mm hydrostatic waterproof rating with micro-porous breathable backing',
      'Fully taped waterproof seam construction throughout jacket',
      'Adjustable 3-point storm hood with laminated peak bill',
      'Packable into its own interior pocket for compact travel',
      'Reflective 3M Scotchlite logos for night visibility'
    ],
    specs: {
      'Shell': '100% Recycled Ripstop Polyester with DWR',
      'Waterproof Rating': '10,000 mm H2O',
      'Breathability': '10,000 g/m²/24h',
      'Weight': '340 grams'
    },
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Dark Graphite', hex: '#1f2937' },
      { name: 'Safety Ochre', hex: '#ca8a04' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    warranty: '7-Day Return Policy',
    shippingNote: 'Fast door-to-door delivery with Cash on Delivery.',
    reviews: []
  },
  {
    id: 'prod-a3',
    name: 'TKR HydroLock 32oz Vacuum Insulated Thermal Flask',
    slug: 'tkr-hydrolock-32oz-vacuum-thermal-flask',
    category: 'accessories',
    categoryName: 'Everyday Accessories',
    subcategory: 'Hydration',
    price: 22.50,
    originalPrice: 34.00,
    discountPercentage: 33,
    rating: 4.9,
    reviewsCount: 260,
    inStock: true,
    stockCount: 75,
    isFeatured: false,
    isTrending: true,
    badge: 'Popular',
    shortDescription: 'Double-wall stainless steel keeps drinks ice cold for 24 hours or piping hot for 12 hours. 100% leakproof chug cap.',
    description: 'Say goodbye to lukewarm water and plastic bottles. Food-grade 18/8 pro-grade stainless steel ensures zero metallic taste transfer. Powder-coat exterior provides slip-free grip and resists condensation sweat.',
    features: [
      'Double-wall vacuum insulation (Cold 24 hrs, Hot 12 hrs)',
      '18/8 kitchen-grade stainless steel that will never rust or impart flavor',
      'BPA-free dual-lid system: wide mouth ice filling + ergonomic leakproof chug spout',
      'Durable powder coat finish that won’t peel or sweat in humidity'
    ],
    specs: {
      'Capacity': '32 oz (950 ml)',
      'Material': 'Pro-grade 18/8 Stainless Steel',
      'Diameter': '90 mm (fits standard backpack side sleeves)',
      'Height': '245 mm'
    },
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Forest Green', hex: '#14532d' },
      { name: 'Deep Midnight Navy', hex: '#1e3a8a' },
      { name: 'Brushed Steel', hex: '#94a3b8' }
    ],
    warranty: 'Lifetime Limited Craftsmanship Warranty',
    shippingNote: 'Packaged safely to protect the powder finish.',
    reviews: []
  }
];

export const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'TKR-88219',
    createdAt: '2026-03-11T09:42:00.000Z',
    customer: {
      fullName: 'Tahmid Hasan',
      phone: '+880 1712-345678',
      altPhone: '+880 1819-987654',
      email: 'tahmid.hasan@example.com',
      deliveryAddress: 'House 42, Road 11, Block D, Banani',
      city: 'Dhaka',
      postalCode: '1213',
      deliveryNotes: 'Please call before arriving, building has security intercom.',
      agreeTerms: true
    },
    items: [
      {
        productId: 'prod-g1',
        name: 'TKR SoundPulse ANC Pro Wireless Headphones',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
        selectedColor: 'Matte Obsidian'
      },
      {
        productId: 'prod-c1',
        name: 'TKR Heavyweight Oversized Vintage Drop-Shoulder Tee',
        price: 24.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
        selectedColor: 'Washed Charcoal',
        selectedSize: 'L'
      }
    ],
    subtotal: 104.98,
    shippingFee: 0,
    discount: 10.50,
    couponCode: 'TKR10',
    total: 94.48,
    paymentMethod: 'Cash on Delivery',
    status: 'Shipped',
    estimatedDeliveryDate: '2026-03-14',
    courierName: 'TKR Express Logistics',
    trackingCode: 'TKREX-88219-DH',
    trackingSteps: [
      {
        step: 1,
        title: 'Order Placed (Cash on Delivery)',
        description: 'Customer order submitted via online portal.',
        location: 'TKR Hub Web Gateway',
        timestamp: 'March 11, 2026 - 09:42 AM',
        completed: true,
        current: false
      },
      {
        step: 2,
        title: 'Order Verified & Confirmed',
        description: 'Customer phone confirmation completed by sales operations.',
        location: 'Central Processing Center',
        timestamp: 'March 11, 2026 - 11:15 AM',
        completed: true,
        current: false
      },
      {
        step: 3,
        title: 'Quality Inspected & Packed',
        description: 'Items sealed in tamper-proof security parcel.',
        location: 'TKR Hub Main Warehouse',
        timestamp: 'March 11, 2026 - 04:30 PM',
        completed: true,
        current: false
      },
      {
        step: 4,
        title: 'Out for Courier Transit',
        description: 'Package handed over to dispatch courier. On route to destination hub.',
        location: 'Dhaka North Hub #04',
        timestamp: 'March 12, 2026 - 08:30 AM',
        completed: true,
        current: true
      },
      {
        step: 5,
        title: 'Delivered & Cash Collected',
        description: 'Doorstep cash payment handover & inspection.',
        location: 'Destination Address',
        timestamp: 'Expected March 14, 2026',
        completed: false,
        current: false
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'TKR-94520',
    createdAt: '2026-03-12T14:18:00.000Z',
    customer: {
      fullName: 'Ayesha Siddiqua',
      phone: '+880 1911-223344',
      altPhone: '',
      email: 'ayesha.s@example.com',
      deliveryAddress: 'Flat 4B, Green Villa, Nasirabad Housing Society',
      city: 'Chittagong',
      postalCode: '4000',
      deliveryNotes: 'Delivery between 10am and 4pm preferable.',
      agreeTerms: true
    },
    items: [
      {
        productId: 'prod-a1',
        name: 'TKR Nomad Shield 28L Waterproof Commuter Backpack',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        selectedColor: 'Matte Slate Black'
      }
    ],
    subtotal: 49.99,
    shippingFee: 3.50,
    discount: 0,
    total: 53.49,
    paymentMethod: 'Cash on Delivery',
    status: 'Confirmed',
    estimatedDeliveryDate: '2026-03-16',
    courierName: 'TKR Express Logistics',
    trackingCode: 'TKREX-94520-CTG',
    trackingSteps: [
      {
        step: 1,
        title: 'Order Placed (Cash on Delivery)',
        description: 'Customer order submitted via online portal.',
        location: 'TKR Hub Web Gateway',
        timestamp: 'March 12, 2026 - 02:18 PM',
        completed: true,
        current: false
      },
      {
        step: 2,
        title: 'Order Verified & Confirmed',
        description: 'Customer phone confirmation completed. Scheduled for warehouse dispatch.',
        location: 'Central Processing Center',
        timestamp: 'March 12, 2026 - 03:45 PM',
        completed: true,
        current: true
      },
      {
        step: 3,
        title: 'Quality Inspected & Packed',
        description: 'Items will be packed in protective packaging.',
        location: 'TKR Hub Main Warehouse',
        timestamp: 'Pending dispatch',
        completed: false,
        current: false
      },
      {
        step: 4,
        title: 'Out for Courier Transit',
        description: 'Package in courier transit.',
        location: 'Regional Logistics Hub',
        timestamp: 'Pending',
        completed: false,
        current: false
      },
      {
        step: 5,
        title: 'Delivered & Cash Collected',
        description: 'Doorstep cash payment handover.',
        location: 'Destination Address',
        timestamp: 'Expected March 16, 2026',
        completed: false,
        current: false
      }
    ]
  }
];
