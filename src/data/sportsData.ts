import { SportDetail, HabitItem, QuizQuestion } from '../types';
import footballImg from '../assets/images/football_action_1787400804767.jpg';
import basketballImg from '../assets/images/basketball_action_1787400826384.jpg';
import swimmingImg from '../assets/images/swimming_action_1787400844139.jpg';
import taekwondoImg from '../assets/images/taekwondo_action_1787400863988.jpg';

export const SPORTS_DATA: SportDetail[] = [
  {
    id: 'football',
    name: 'Futbol',
    uzbekName: 'Futbol (Football)',
    iconName: 'Activity',
    emoji: '⚽',
    tagline: 'Chaqqonlik, Jamoaviy Ruh & Kuchli Yurak',
    heroBadge: 'Eng Ommabop Sport',
    accentColor: '#10b981', // Emerald
    secondaryColor: '#064e3b',
    image: footballImg,
    caloriesBurnedPerHour: 750,
    difficulty: 'O‘rtacha',
    primaryMuscles: ['Oyoq mushaklari (Kvadritseps, Boldir)', 'Yadro (Press)', 'Yurak-qon tomir tizimi'],
    keyBenefits: [
      {
        title: 'Yurak va Qon Aylanishi',
        description: 'Doimiy yugurish va sprintlar kardio chidamlilikni 45% ga oshiradi va qon bosimini me’yorlashtiradi.',
        stat: '+45% Kardio'
      },
      {
        title: 'Tezkor Fikrlash va Reflekslar',
        description: 'Maydondagi harakatlar qaror qabul qilish tezligini va miyaning fazoviy idrokini rivojlantiradi.',
        stat: '0.2s Refleks'
      },
      {
        title: 'Jamoaviy Hamjihatlik',
        description: 'Boshqalar bilan muloqot qilish, liderlik va birgalikda g‘alaba qozonish hissini mustahkamlaydi.',
        stat: '11 O‘yinchi'
      }
    ],
    exercises: [
      {
        id: 'fb-1',
        name: 'Zinapoya va konuslar orqali chaqqonlik (Agility Drills)',
        duration: '45 soniya',
        reps: '4 to‘plam',
        description: 'Tez qadamlar bilan konuslar orasidan o‘tish va qisqa masofaga portlovchi sprint.',
        benefit: 'Oyoq tezligi va muvozanatni kuchaytiradi'
      },
      {
        id: 'fb-2',
        name: 'To‘p bilan dribling va slalom',
        duration: '60 soniya',
        reps: '5 to‘plam',
        description: 'To‘pni ikkala oyoqning ichki va tashqi tomoni bilan boshqarib burilishlar qilish.',
        benefit: 'To‘p nazorati va chaqqon harakat'
      },
      {
        id: 'fb-3',
        name: 'Planka va portlovchi sakrashlar (Burpee + Jump)',
        duration: '30 soniya',
        reps: '3 to‘plam',
        description: 'Yadro mushaklarini baquvvat qilish va havodagi to‘p uchun sakrash balandligini oshirish.',
        benefit: 'Umumiy tana kuchi va koordinatsiya'
      }
    ],
    equipment: ['Sifatli futbol to‘pi', 'Butsilar (yoki krossovka)', 'Boldir himoyachisi (shitki)', 'Sport formasi'],
    recommendedAge: '6 yoshdan 65+ yoshgacha',
    heartRateZone: '140 - 175 urish/daq',
    expertQuote: 'Futbol — bu nafaqat oyoqlar bilan, balki aql va yurak bilan o‘ynaladigan san’atdir.',
    quoteAuthor: 'Sport Falsafasi',
    funFact: 'Bir 90 daqiqalik professional futbol o‘yinida futbolchi o‘rtacha 10-12 kilometr masofani bosib o‘tadi!',
    specs: [
      { label: 'Energiya Sarfi', value: '750', sub: 'kkal / soat' },
      { label: 'Mushak Tonusi', value: '94%', sub: 'oyoq & yadro' },
      { label: 'Chaqqonlik Indeksi', value: 'A+', sub: 'maksimal' }
    ]
  },
  {
    id: 'basketball',
    name: 'Basketbol',
    uzbekName: 'Basketbol (Basketball)',
    iconName: 'Zap',
    emoji: '🏀',
    tagline: 'Sakrash Kuchi, Bo‘y O‘sishi & Yuqori Aniqlik',
    heroBadge: 'Dinamik & Chaqqon',
    accentColor: '#f97316', // Orange
    secondaryColor: '#7c2d12',
    image: basketballImg,
    caloriesBurnedPerHour: 720,
    difficulty: 'O‘rtacha',
    primaryMuscles: ['Boldir va son mushaklari', 'Yelka va qo‘l mushaklari', 'Orqa va qorin mushaklari'],
    keyBenefits: [
      {
        title: 'Bo‘y O‘sishi va Umurtqa Cho‘zilishi',
        description: 'Doimiy sakrashlar va qo‘llarni yuqoriga cho‘zish umurtqa pog‘onasini to‘g‘rilab, bo‘y o‘sishiga ijobiy ta’sir qiladi.',
        stat: '+3-5 sm Rag‘bat'
      },
      {
        title: 'Ko‘z va Qo‘l Koordinatsiyasi',
        description: 'Harakatdagi to‘pni savatga aniq yo‘naltirish diqqatni jamlash qobiliyatini keskin kuchaytiradi.',
        stat: '100% Fokus'
      },
      {
        title: 'Portlovchi Kuch (Explosive Power)',
        description: 'Vertikal sakrash va tezkor to‘xtashlar butun tana muskullarining chaqqonligini oshiradi.',
        stat: '+30% Vertikal'
      }
    ],
    exercises: [
      {
        id: 'bb-1',
        name: 'Past va baland dribling (Ikkala qo‘lda)',
        duration: '60 soniya',
        reps: '4 to‘plam',
        description: 'Ko‘zni to‘pdan uzgan holda ritmik va tezkor to‘p urishlar.',
        benefit: 'To‘pni sezish va periferik ko‘rish'
      },
      {
        id: 'bb-2',
        name: 'Pliometrik sakrashlar (Box Jumps)',
        duration: '45 soniya',
        reps: '4 to‘plam',
        description: 'Balandlikka portlovchi kuch bilan sakrash va yumshoq qo‘nish.',
        benefit: 'Sakrash balandligi va bo‘g‘imlar mustahkamligi'
      },
      {
        id: 'bb-3',
        name: 'Savat ostidan burilib otishlar (Lay-up drills)',
        duration: '40 soniya',
        reps: '5 to‘plam',
        description: 'Tezlikda yugurib kelib savatga to‘p tashlash mashqi.',
        benefit: 'Muvozanat va aniqlik'
      }
    ],
    equipment: ['Basketbol to‘pi (Size 7 / 6)', 'Qalin taglikli basketbol krossovkasi', 'Qulay mayka va shortik'],
    recommendedAge: '7 yoshdan 60 yoshgacha',
    heartRateZone: '135 - 170 urish/daq',
    expertQuote: 'Muvaffaqiyat — bu tinimsiz mehnat, intizom va har bir mashg‘ulotda o‘zingdan ustun bo‘lishdir.',
    quoteAuthor: 'Chempionlar Shiori',
    funFact: 'Basketbolchi bir o‘yin davomida taxminan 40-50 marta maksimal balandlikka sakraydi!',
    specs: [
      { label: 'Energiya Sarfi', value: '720', sub: 'kkal / soat' },
      { label: 'Sakrash Balandligi', value: '+35%', sub: 'dinamika' },
      { label: 'Reaksiya Tezligi', value: '0.18s', sub: 'ultra tez' }
    ]
  },
  {
    id: 'swimming',
    name: 'Suzish',
    uzbekName: 'Suzish (Swimming)',
    iconName: 'Waves',
    emoji: '🏊',
    tagline: 'Ideal Qaddi-Qomat, O‘pka Kuchi & Bo‘g‘imlar Oromi',
    heroBadge: 'Umumtana Rivojlanishi',
    accentColor: '#06b6d4', // Cyan
    secondaryColor: '#164e63',
    image: swimmingImg,
    caloriesBurnedPerHour: 680,
    difficulty: 'Boshlang‘ich',
    primaryMuscles: ['Keng orqa mushaklari (Latissimus)', 'Ko‘krak qafasi', 'Oyoq va yelka kamari'],
    keyBenefits: [
      {
        title: 'Nol Zarbali Sport (Zero Joint Impact)',
        description: 'Suv tananing 90% og‘irligini ko‘targani sababli umurtqa va tizzalarga ortiqcha bosim tushmaydi.',
        stat: '0% Travma xavfi'
      },
      {
        title: 'O‘pka Sig‘imi va Nafas Olish',
        description: 'Ritmik nafas olish o‘pka hajmini 30% ga kengaytiradi va kislorod bilan to‘yinishni kuchaytiradi.',
        stat: '+30% O‘pka hajmi'
      },
      {
        title: 'Mukammal V-shaklidagi Qomat',
        description: 'Krol, brass va batterflyay usullari orqa va yelkalarni chiroyli va qaddi-qomatni tik qiladi.',
        stat: '100% Simmetriya'
      }
    ],
    exercises: [
      {
        id: 'sw-1',
        name: 'Erkin suzish (Krol uslubi - Interval)',
        duration: '50 metr',
        reps: '6 marta',
        description: 'To‘g‘ri nafas chiqarish va oyoqlarning tinimsiz ritmik qaychi harakati.',
        benefit: 'Kardio chidamlilik va umumiy tezlik'
      },
      {
        id: 'sw-2',
        name: 'Doska bilan oyoq mashqlari (Kickboard)',
        duration: '25 metr',
        reps: '8 marta',
        description: 'Qo‘llarda suzish doskasini ushlab, faqat oyoq kuchi bilan oldinga siljish.',
        benefit: 'Boldir, son va dumba mushaklarini baquvvat qiladi'
      },
      {
        id: 'sw-3',
        name: 'Brass usulida tinchlantiruvchi suzish',
        duration: '100 metr',
        reps: '3 marta',
        description: 'Keng qo‘l va oyoq doiralari bilan bir maromda suzish.',
        benefit: 'Umurtqa pog‘onasini yozish va nafasni rostlash'
      }
    ],
    equipment: ['Suzish ko‘zoynagi (Goggles)', 'Suzish shapkachasi', 'Suzish kiyimi (plavki/kupalnik)', 'Sochiq'],
    recommendedAge: 'Chaqaloqlikdan 85+ yoshgacha',
    heartRateZone: '120 - 160 urish/daq',
    expertQuote: 'Suv — bu sizning eng yaxshi murabbiyingiz. U sizni yengillik, moslashuvchanlik va kuchga o‘rgatadi.',
    quoteAuthor: 'Salomatlik Saboqlari',
    funFact: 'Suzish inson tanasidagi deyarli barcha — 600 dan ortiq mushaklarni bir vaqtning o‘zida ishlatadigan yagona sportdir!',
    specs: [
      { label: 'Energiya Sarfi', value: '680', sub: 'kkal / soat' },
      { label: 'Bo‘g‘im Himoyasi', value: '100%', sub: 'zararsiz' },
      { label: 'O‘pka Faolligi', value: '+30%', sub: 'kislorod' }
    ]
  },
  {
    id: 'taekwondo',
    name: 'Taekvondo',
    uzbekName: 'Taekvondo (Taekwondo - 🥋)',
    iconName: 'Shield',
    emoji: '🥋',
    tagline: 'Temir Intizom, Yuqori Zarbalar & O‘zini Himoya',
    heroBadge: 'Sharq Yakkakurashi',
    accentColor: '#a855f7', // Purple / Violet
    secondaryColor: '#581c87',
    image: taekwondoImg,
    caloriesBurnedPerHour: 800,
    difficulty: 'Yuqori',
    primaryMuscles: ['Sonning ichki va orqa mushaklari (Shpagat)', 'Yadro va qorin', 'Boldir va sonlar'],
    keyBenefits: [
      {
        title: 'Maksimal Moslashuvchanlik (Flexibility)',
        description: 'Har kungi cho‘zilish mashqlari bo‘g‘imlarning harakatchanligini va shpagatga o‘tirishni ta’minlaydi.',
        stat: '180° Shpagat'
      },
      {
        title: 'Temir Ruhiy Intizom va Iroda',
        description: 'Hurmat, sabr, o‘zini tuta bilish va yengilmas ruh taekvondoning asosiy 5 tamoyilidir.',
        stat: '5 Tamoyil'
      },
      {
        title: 'Samarali O‘zini Himoya Qilish',
        description: 'Tezkor oyoq zarbalari va bloklar kutilmagan vaziyatlarda o‘zini himoya qilish instinktini shakllantiradi.',
        stat: '100% Tayyorgarlik'
      }
    ],
    exercises: [
      {
        id: 'tk-1',
        name: 'Dinamik cho‘zilish va mahoviy tepishlar (Leg Swings)',
        duration: '45 soniya',
        reps: '4 to‘plam',
        description: 'To‘g‘ri oyoqni oldinga, yonga va orqaga maksimal balandlikka ko‘tarish.',
        benefit: 'Bo‘g‘imlar erkinligi va oyoq yengilligi'
      },
      {
        id: 'tk-2',
        name: 'Dolyo Chagi va Ap Chagi zarbalari (Kicking drills)',
        duration: '60 soniya',
        reps: '5 to‘plam',
        description: 'Nishonga tezkor aylanma va to‘g‘ri oyoq zarbalari ketma-ketligi.',
        benefit: 'Zarba kuchi, tezlik va muvozanat'
      },
      {
        id: 'tk-3',
        name: 'Poomsae (Pumse) shakllari va nafas nazorati',
        duration: '90 soniya',
        reps: '3 to‘plam',
        description: 'Bloklar va zarbalarning qat’iy ketma-ketligini mukammal bajarish.',
        benefit: 'Konsentratsiya, xotira va tana barqarorligi'
      }
    ],
    equipment: ['Dobok (Taekvondo kiyimi)', 'Kamar', 'Himoya shlemi va nakladkalar', 'Dapa (zarba yostig‘i)'],
    recommendedAge: '5 yoshdan 65 yoshgacha',
    heartRateZone: '145 - 180 urish/daq',
    expertQuote: 'Taekvondo — bu raqibni yengishdan oldin o‘z qo‘rquvlari va dangasaligini yengish san’atidir.',
    quoteAuthor: 'Sharq Donishmandligi',
    funFact: 'Taekvondochi zarbasi tezligi soatiga 130 km dan oshishi va og‘ir jismni havoga uchirib yuborishi mumkin!',
    specs: [
      { label: 'Energiya Sarfi', value: '800', sub: 'kkal / soat' },
      { label: 'Moslashuvchanlik', value: '99%', sub: 'shpagat' },
      { label: 'Iroda & Intizom', value: 'MAX', sub: 'chempionlik' }
    ]
  }
];

export const DAILY_HABITS_DATA: HabitItem[] = [
  {
    id: 'habit-1',
    title: 'Ertalabki 15 daqiqalik badantarbiya',
    category: 'sport',
    completed: false,
    target: '15 daqiqa',
    icon: 'Sun'
  },
  {
    id: 'habit-2',
    title: 'Kun davomida 2 litr toza suv ichish',
    category: 'water',
    completed: false,
    target: '8 stakan (2L)',
    icon: 'Droplet'
  },
  {
    id: 'habit-3',
    title: 'Kamida 8,000 - 10,000 qadam piyoda yurish',
    category: 'sport',
    completed: false,
    target: '10,000 qadam',
    icon: 'Footprints'
  },
  {
    id: 'habit-4',
    title: 'Tanlangan sport bo‘yicha mashg‘ulot',
    category: 'sport',
    completed: false,
    target: '45 daqiqa',
    icon: 'Dumbbell'
  },
  {
    id: 'habit-5',
    title: 'Sog‘lom va oqsilga boy taomlanish',
    category: 'food',
    completed: false,
    target: 'Meva, sabzavot, tuxum',
    icon: 'Apple'
  },
  {
    id: 'habit-6',
    title: 'Kamida 7-8 soat sifatli uyqu',
    category: 'rest',
    completed: false,
    target: '23:00 gacha uxlash',
    icon: 'Moon'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Mashg‘ulot davomida sizga eng ko‘p nima zavq beradi?',
    subtitle: 'O‘z qiziqishingizga eng yaqin variantni tanlang',
    options: [
      { text: 'Do‘stlar bilan raqobatlashish va birgalikda g‘alaba qozonish', emoji: '👥', trait: 'team', sportMatch: 'football' },
      { text: 'Tezlik, balandlikka sakrash va har daqiqadagi dinamika', emoji: '⚡', trait: 'speed', sportMatch: 'basketball' },
      { text: 'Suvning sokinligi, butun vujud bilan yengillik his qilish', emoji: '🌊', trait: 'endurance', sportMatch: 'swimming' },
      { text: 'Iroda, o‘zini himoya qilish, shpagat va yuqori zarbalar', emoji: '🥋', trait: 'discipline', sportMatch: 'taekwondo' }
    ]
  },
  {
    id: 2,
    question: 'Sportdan asosiy maqsad qilib nimani belgilagansiz?',
    subtitle: 'Natija siz uchun qanday bo‘lishi muhim?',
    options: [
      { text: 'Yurakni baquvvat qilish, chidamlilik va chaqqon bo‘lish', emoji: '❤️', trait: 'team', sportMatch: 'football' },
      { text: 'Bo‘y o‘sishi, sakrash kuchi va qo‘l chaqqonligi', emoji: '📏', trait: 'speed', sportMatch: 'basketball' },
      { text: 'Qaddi-qomatni tiklash, orqa og‘riqlaridan xalos bo‘lish', emoji: '🧘‍♂️', trait: 'endurance', sportMatch: 'swimming' },
      { text: 'O‘ziga ishonchni oshirish, moslashuvchanlik va qat’iyat', emoji: '🔥', trait: 'discipline', sportMatch: 'taekwondo' }
    ]
  },
  {
    id: 3,
    question: 'Qanday muhitda shug‘ullanishni ko‘proq yoqtirasiz?',
    subtitle: 'Siz uchun qulay sharoit',
    options: [
      { text: 'Katta ochiq stadion, yashil maydon va toza havo', emoji: '🏟️', trait: 'team', sportMatch: 'football' },
      { text: 'Yopiq qulay zallar, maxsus parket maydoni', emoji: '🏢', trait: 'speed', sportMatch: 'basketball' },
      { text: 'Moviy hovuz suvi, toza va salqin muhit', emoji: '💧', trait: 'endurance', sportMatch: 'swimming' },
      { text: 'Tatami (Dojang), intizomli jang san’ati zali', emoji: '🏯', trait: 'discipline', sportMatch: 'taekwondo' }
    ]
  },
  {
    id: 4,
    question: 'Haftasiga necha kun sportga vaqt ajrata olasiz?',
    subtitle: 'Haqiqiy imkoniyatingizni belgilang',
    options: [
      { text: 'Haftasiga 2-3 marta do‘stlar bilan futbol', emoji: '⚽', trait: 'team', sportMatch: 'football' },
      { text: 'Haftasiga 3-4 marta dinamik o‘yinlar', emoji: '🏀', trait: 'speed', sportMatch: 'basketball' },
      { text: 'Haftasiga 2-3 marta 45 daqiqadan basseyn', emoji: '🏊', trait: 'endurance', sportMatch: 'swimming' },
      { text: 'Haftasiga 3 marta murabbiy nazoratida qat’iy reja', emoji: '🥋', trait: 'discipline', sportMatch: 'taekwondo' }
    ]
  }
];

export const NUTRITION_TIPS = [
  {
    title: 'Mashg‘ulotdan 1.5 - 2 soat oldin',
    tag: 'Energiya Zaxirasi',
    description: 'Sekin hazm bo‘luvchi murakkab uglevodlar (suli bo‘tqasi, banan, jigarrang guruch) iste’mol qiling.',
    icon: 'Zap'
  },
  {
    title: 'Mashg‘ulotdan keyin 30 daqiqa ichida',
    tag: 'Mushaklar Tiklanishi',
    description: 'Oqsil va yengil uglevodlar: tuxum, tvorog, tovuq go‘shti yoki tabiiy oqsilli smuzi tavsiya etiladi.',
    icon: 'Sparkles'
  },
  {
    title: 'Suv Balansi Qoidasi',
    tag: 'Gidratatsiya',
    description: 'Mashq davomida har 15-20 daqiqada 2-3 qultum xona haroratidagi toza suv iching. Chanqashni kutmang!',
    icon: 'Droplet'
  },
  {
    title: 'Shirinlik va Gazlangan Ichimliklar',
    tag: 'Taqiqlangan',
    description: 'Ortiqcha shakar va fastfud kuchni kamaytiradi, yurakka og‘irlik soladi va yog‘ to‘planishiga olib keladi.',
    icon: 'ShieldAlert'
  }
];
