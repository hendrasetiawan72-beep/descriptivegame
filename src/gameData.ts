import { MajorStory, NPC, VocabularyItem, VocabMysteryCard, BatangTourStop, Chapter2QuizItem } from './types';

// Initial Vocabulary Mystery Cards to solve & match
export const VOCAB_MYSTERY_CARDS: VocabMysteryCard[] = [
  { id: 'v1', enWord: 'refreshing', idWord: 'menyegarkan', category: 'Quality', hint: 'Kualitas air terjun atau udara segar' },
  { id: 'v2', enWord: 'delicious', idWord: 'lezat / nikmat', category: 'Quality', hint: 'Cita rasa kopi Surjo hangat' },
  { id: 'v3', enWord: 'modern', idWord: 'modern / canggih', category: 'Quality', hint: 'Karakteristik kawasan industri KITB' },
  { id: 'v4', enWord: 'thick', idWord: 'tebal', category: 'Size', hint: 'Buku kas koperasi yang berisi banyak lembaran' },
  { id: 'v5', enWord: 'powerful', idWord: 'bertenaga / kuat', category: 'Quality', hint: 'Kekuatan mesin sepeda motor bengkel' },
  { id: 'v6', enWord: 'fast', idWord: 'cepat', category: 'Quality', hint: 'Kecepatan jaringan Wi-Fi router' },
  { id: 'v7', enWord: 'sturdy', idWord: 'kokoh / kuat', category: 'Quality', hint: 'Karakteristik bahan logam atau gerbang' },
  { id: 'v8', enWord: 'tall', idWord: 'tinggi', category: 'Size', hint: 'Ukuran air terjun atau tiang bendera' }
];

// 3 Batang Landmark Tour Dialogues & Simple Choices
export const BATANG_TOUR_STOPS: BatangTourStop[] = [
  {
    id: 'waterfall',
    npcId: 'bumaya',
    npcName: 'Bu Maya',
    npcRole: 'Nature Club Teacher (Pecinta Alam)',
    npcZone: 'Taman Sekolah (Dekat Pohon)',
    locationName: 'Genting Waterfall (Curug Genting Batang)',
    gender: 'female',
    title: 'Destinasi 1: Curug Genting Batang',
    storyEn: 'Hello! Have you visited Genting Waterfall in Blado, Batang? It is famous for its natural beauty and cool fresh air surrounded by pine trees.',
    storyId: 'Halo! Pernahkah kamu berkunjung ke Curug Genting di Blado, Batang? Tempat itu terkenal dengan keindahan alam dan udara sejuknya yang dikelilingi pohon pinus.',
    questionEn: 'How should we describe Genting Waterfall in Batang with proper descriptive adjectives?',
    questionId: 'Bagaimana cara mendeskripsikan Curug Genting Batang dengan kata sifat yang tepat?',
    options: [
      {
        id: 'opt_a',
        textEn: 'It is a tall, refreshing, and beautiful waterfall in a lush green pine forest.',
        textId: 'Air terjun yang tinggi, menyegarkan, dan indah di tengah hutan pinus yang asri.',
        isCorrect: true
      },
      {
        id: 'opt_b',
        textEn: 'It is a dry, hot, and dusty desert road with no water.',
        textId: 'Jalanan padang pasir yang kering, panas, dan berdebu tanpa air.',
        isCorrect: false
      },
      {
        id: 'opt_c',
        textEn: 'It is a tiny, noisy, and smoky traffic junction.',
        textId: 'Persimpangan jalan raya yang sempit, bising, dan berasap.',
        isCorrect: false
      }
    ],
    explanation: 'Curug Genting tepat dideskripsikan dengan kata sifat "tall" (tinggi), "refreshing" (menyegarkan), dan "beautiful" (indah)!'
  },
  {
    id: 'kopi',
    npcId: 'pakjoko',
    npcName: 'Pak Joko',
    npcRole: 'Gazebo & Canteen Mentor (Pencinta Kopi Batang)',
    npcZone: 'Kantin & Gazebo Santai',
    locationName: 'Kopi Surjo Bawang (Surjo Traditional Coffee)',
    gender: 'male',
    title: 'Destinasi 2: Minum Kopi Surjo Bawang',
    storyEn: 'Smell that aroma? That is Kopi Surjo from Surjo Village, Bawang! Our local Batang coffee beans are cultivated on the cool highland slopes.',
    storyId: 'Cium aromanya? Itu Kopi Surjo dari Desa Surjo, Bawang! Biji kopi lokal Batang ini ditanam di lereng pegunungan yang sejuk.',
    questionEn: 'What does a cup of hot Surjo Coffee taste and smell like?',
    questionId: 'Bagaimana rasa dan aroma secangkir Kopi Surjo hangat khas Bawang?',
    options: [
      {
        id: 'opt_a',
        textEn: 'It is an icy cold and salty noodle soup with chili sauce.',
        textId: 'Semangkuk sup mi dingin dan asin dengan sambal.',
        isCorrect: false
      },
      {
        id: 'opt_b',
        textEn: 'It is a warm, aromatic, and rich black coffee with a delightful bold taste.',
        textId: 'Kopi hitam hangat, beraroma harum, dan mantap dengan cita rasa khas yang nikmat.',
        isCorrect: true
      },
      {
        id: 'opt_c',
        textEn: 'It is a sour green vegetable juice served in a plastic bowl.',
        textId: 'Jus sayuran hijau yang asam disajikan di mangkuk plastik.',
        isCorrect: false
      }
    ],
    explanation: 'Kopi Surjo Bawang dideskripsikan dengan kata sifat "warm" (hangat), "aromatic" (harum), dan "rich / delightful" (nikmat & mantap)!'
  },
  {
    id: 'kitb',
    npcId: 'kakfajar',
    npcName: 'Kak Fajar',
    npcRole: 'Industrial Coordinator (Alumni Muhiba)',
    npcZone: 'Halaman Depan & Lapangan Upacara',
    locationName: 'KITB Batang (Kawasan Industri Terpadu Batang)',
    gender: 'male',
    title: 'Destinasi 3: Berkunjung ke KITB Batang',
    storyEn: 'Look toward the north coast of Batang! KITB (Kawasan Industri Terpadu Batang / Grand Batang City) is our national economic pride attracting world-class smart industries.',
    storyId: 'Lihat ke arah pesisir utara Batang! KITB (Kawasan Industri Terpadu Batang) adalah kebanggaan daerah kita yang menjadi pusat industri canggih ramah lingkungan.',
    questionEn: 'Which sentence accurately describes KITB Batang as an industrial city?',
    questionId: 'Kalimat manakah yang mendeskripsikan KITB Batang dengan akurat?',
    options: [
      {
        id: 'opt_a',
        textEn: 'It is a vast, modern, and green integrated industrial estate with advanced smart facilities.',
        textId: 'Kawasan industri terpadu yang sangat luas, modern, dan hijau dengan fasilitas canggih.',
        isCorrect: true
      },
      {
        id: 'opt_b',
        textEn: 'It is a tiny wooden fishing boat floating on a muddy puddle.',
        textId: 'Perahu kayu kecil yang mengapung di genangan lumpur.',
        isCorrect: false
      },
      {
        id: 'opt_c',
        textEn: 'It is an ancient, ruined castle made of medieval stone bricks.',
        textId: 'Kastil batu kuno yang runtuh dari abad pertengahan.',
        isCorrect: false
      }
    ],
    explanation: 'KITB Batang dideskripsikan dengan kata sifat "vast" (sangat luas), "modern" (canggih/modern), dan "green" (ramah lingkungan)!'
  }
];

export const ALL_NPCS: NPC[] = [
  // General School NPCs (Accessible to all students)
  {
    id: 'satpam',
    name: 'Pak Satpam',
    role: 'School Security Guard',
    gender: 'male',
    x: 420,
    y: 520,
    spriteType: 'security',
    zone: 'Gerbang Utama',
    defaultGreetingEn: 'Halt, young learner! Our school gate is tall, strong, and always safe.',
    defaultGreetingId: 'Berhenti sejenak, siswa hebat! Gerbang sekolah kita tinggi, kokoh, dan selalu aman.'
  },
  {
    id: 'aisyah',
    name: 'Aisyah',
    role: 'Student (X DKV)',
    gender: 'female',
    x: 750,
    y: 720,
    spriteType: 'student_female',
    zone: 'Halaman Upacara',
    defaultGreetingEn: 'Look at the school flag! The red and white flag is bright and proud.',
    defaultGreetingId: 'Lihat bendera sekolah! Bendera merah putih tampak cerah dan berkibar gagah.'
  },
  {
    id: 'dimas',
    name: 'Dimas',
    role: 'Student (X TKRO)',
    gender: 'male',
    x: 1080,
    y: 650,
    spriteType: 'student_male',
    zone: 'Taman Sekolah',
    defaultGreetingEn: 'The wooden benches here are wide, brown, and very comfortable.',
    defaultGreetingId: 'Bangku kayu di sini lebar, berwarna cokelat, dan sangat nyaman diduduki.'
  },

  // 3 Batang Landmark NPCs
  {
    id: 'bumaya',
    name: 'Bu Maya',
    role: 'Nature Club Teacher (Pecinta Alam)',
    gender: 'female',
    x: 1260,
    y: 600,
    spriteType: 'teacher_female',
    zone: 'Taman Sekolah',
    isBatangTourNpc: true,
    batangTourStopId: 'waterfall',
    defaultGreetingEn: 'Genting Waterfall in Blado is tall, refreshing, and surrounded by green pine trees!',
    defaultGreetingId: 'Curug Genting di Blado itu tinggi, menyegarkan, dan dikelilingi pohon pinus hijau!'
  },
  {
    id: 'pakjoko',
    name: 'Pak Joko',
    role: 'Gazebo & Canteen Mentor',
    gender: 'male',
    x: 1360,
    y: 1240,
    spriteType: 'student_male',
    zone: 'Kantin Sekolah',
    isBatangTourNpc: true,
    batangTourStopId: 'kopi',
    defaultGreetingEn: 'A cup of hot Surjo Coffee from Bawang is warm, aromatic, and rich in flavor!',
    defaultGreetingId: 'Secangkir Kopi Surjo hangat dari Bawang beraroma harum dan mantap rasanya!'
  },
  {
    id: 'kakfajar',
    name: 'Kak Fajar',
    role: 'Industrial Coordinator (Alumni)',
    gender: 'male',
    x: 600,
    y: 560,
    spriteType: 'student_male',
    zone: 'Halaman Depan',
    isBatangTourNpc: true,
    batangTourStopId: 'kitb',
    defaultGreetingEn: 'KITB Batang is a vast, modern, and green integrated industrial estate on the north coast!',
    defaultGreetingId: 'KITB Batang adalah kawasan industri terpadu yang sangat luas, modern, dan hijau di pesisir utara!'
  },

  // Zone 2: Koperasi & AKL Wing (Strictly for AKL students)
  {
    id: 'bukopi',
    name: 'Bu Kopi',
    role: 'Head of Koperasi Sekolah',
    gender: 'female',
    x: 1480,
    y: 420,
    spriteType: 'teacher_female',
    zone: 'Ruang Koperasi & AKL',
    majorSpecific: 'akl',
    defaultGreetingEn: 'Welcome to the school cooperative! Everything here is neat and orderly.',
    defaultGreetingId: 'Selamat datang di koperasi sekolah! Semua barang di sini rapi dan tertata.'
  },
  {
    id: 'dina',
    name: 'Dina',
    role: 'AKL Student Representative',
    gender: 'female',
    x: 1650,
    y: 500,
    spriteType: 'student_female',
    zone: 'Ruang Koperasi & AKL',
    majorSpecific: 'akl',
    defaultGreetingEn: 'I need to check the ledger! It has a hard blue cover and numbered pages.',
    defaultGreetingId: 'Saya harus memeriksa buku kas! Sampulnya biru keras dan halamannya bernomor.'
  },
  {
    id: 'kakrani',
    name: 'Kak Rani',
    role: 'AKL Outstanding Alumna',
    gender: 'female',
    x: 1820,
    y: 440,
    spriteType: 'teacher_female',
    zone: 'Ruang Koperasi & AKL',
    majorSpecific: 'akl',
    defaultGreetingEn: 'Accurate descriptions protect everyone and keep financial records transparent.',
    defaultGreetingId: 'Deskripsi yang akurat melindungi semua orang dan menjaga catatan keuangan transparan.'
  },

  // Zone 3: Bengkel Otomotif (Strictly for Otomotif students)
  {
    id: 'pakbimo',
    name: 'Pak Bimo',
    role: 'Head of Automotive Workshop',
    gender: 'male',
    x: 480,
    y: 1280,
    spriteType: 'mechanic',
    zone: 'Bengkel Otomotif',
    majorSpecific: 'otomotif',
    defaultGreetingEn: 'Safety first in our workshop! Every tool has a specific size, shape, and function.',
    defaultGreetingId: 'Utamakan keselamatan di bengkel kita! Setiap perkakas punya ukuran, bentuk, dan fungsi khusus.'
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'Mechanic Student',
    gender: 'male',
    x: 720,
    y: 1360,
    spriteType: 'student_male',
    zone: 'Bengkel Otomotif',
    majorSpecific: 'otomotif',
    defaultGreetingEn: 'The prototype engine is silent today, but its shiny steel exhaust is unmistakable!',
    defaultGreetingId: 'Mesin prototipe sedang hening hari ini, tapi knalpot bajanya yang berkilau sangat khas!'
  },

  // Zone 4: Lab Komputer & Jaringan TJKT (Strictly for TJKT students)
  {
    id: 'bunisa',
    name: 'Bu Nisa',
    role: 'Head of TJKT Network Lab',
    gender: 'female',
    x: 1520,
    y: 1250,
    spriteType: 'teacher_female',
    zone: 'Lab Jaringan TJKT',
    majorSpecific: 'tjkt',
    defaultGreetingEn: 'Welcome to our beginner network lab! Everything here is clean, safe, and connected.',
    defaultGreetingId: 'Selamat datang di lab jaringan kami! Semua perangkat di sini bersih, aman, dan terhubung.'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'Lab AI Assistant Robot',
    gender: 'male',
    x: 1750,
    y: 1320,
    spriteType: 'robot',
    zone: 'Lab Jaringan TJKT',
    majorSpecific: 'tjkt',
    defaultGreetingEn: 'Beep boop! I am Pixel, a cute small robot with a friendly blue screen!',
    defaultGreetingId: 'Bip bup! Aku Pixel, robot kecil yang ramah dengan layar biru yang lucu!'
  }
];

// 10 Soal Detail Benda (Chapter 2) for AKL
const AKL_CHAPTER2_QUIZ: Chapter2QuizItem[] = [
  {
    id: 1,
    question: 'Urutan kata sifat yang benar untuk buku kas koperasi (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Which is the correct adjective order (Size -> Color -> Material)?',
    contextItem: 'Ledger Book',
    options: ['thick blue paper ledger', 'blue thick paper ledger', 'paper thick blue ledger', 'thick paper blue ledger'],
    correctAnswer: 'thick blue paper ledger',
    explanation: 'Aturan Adjective Order: Ukuran (thick) ➔ Warna (blue) ➔ Bahan (paper) ➔ Kata Benda (ledger).',
    category: 'Adjective Order'
  },
  {
    id: 2,
    question: 'Urutan kata sifat untuk kotak uang kas kecil (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Which is the correct phrase for a cash box?',
    contextItem: 'Cash Box',
    options: ['small black metal cash box', 'metal black small cash box', 'black small metal cash box', 'small metal black cash box'],
    correctAnswer: 'small black metal cash box',
    explanation: 'Ukuran (small) ➔ Warna (black) ➔ Bahan (metal) ➔ Noun (cash box).',
    category: 'Adjective Order'
  },
  {
    id: 3,
    question: 'Kata sifat manakah di bawah ini yang tergolong ukuran (Size)?',
    questionId: 'Which adjective belongs to SIZE?',
    contextItem: 'Calculator',
    options: ['large', 'grey', 'plastic', 'electronic'],
    correctAnswer: 'large',
    explanation: '"Large" (besar) adalah kata sifat ukuran (Size). "Grey" adalah warna, "plastic" adalah bahan.',
    category: 'Size Adjective'
  },
  {
    id: 4,
    question: 'Kata sifat manakah di bawah ini yang tergolong bahan (Material)?',
    questionId: 'Which adjective represents MATERIAL?',
    contextItem: 'Receipt Folder',
    options: ['leather', 'thin', 'brown', 'useful'],
    correctAnswer: 'leather',
    explanation: '"Leather" (kulit) adalah bahan material. "Thin" adalah ukuran, "brown" adalah warna.',
    category: 'Material Adjective'
  },
  {
    id: 5,
    question: 'Pilihlah kalimat yang benar untuk mendeskripsikan kalkulator akuntansi:',
    questionId: 'Choose the correct sentence to describe a calculator:',
    contextItem: 'Calculator',
    options: ['It is a compact grey plastic calculator.', 'It is a plastic grey compact calculator.', 'It is a grey compact plastic calculator.', 'It is a plastic compact grey calculator.'],
    correctAnswer: 'It is a compact grey plastic calculator.',
    explanation: 'Compact (ukuran/dimensi) ➔ grey (warna) ➔ plastic (bahan).',
    category: 'Adjective Order'
  },
  {
    id: 6,
    question: 'Dalam deskripsi tunggal benda, kita menggunakan pola:',
    questionId: 'To describe a single object feature, we use:',
    contextItem: 'Single Ledger',
    options: ['It has a hard cover.', 'They has a hard cover.', 'It have a hard cover.', 'They are a hard cover.'],
    correctAnswer: 'It has a hard cover.',
    explanation: 'Untuk subjek tunggal "It", gunakan kata kerja "has" (It has a hard cover).',
    category: 'Grammar Pattern'
  },
  {
    id: 7,
    question: 'Urutan kata sifat untuk meja tulis akuntansi kayu:',
    questionId: 'Correct adjective order for the wooden desk:',
    contextItem: 'Accounting Desk',
    options: ['wide brown wooden desk', 'brown wide wooden desk', 'wooden wide brown desk', 'wide wooden brown desk'],
    correctAnswer: 'wide brown wooden desk',
    explanation: 'Wide (ukuran lebar) ➔ brown (warna cokelat) ➔ wooden (bahan kayu).',
    category: 'Adjective Order'
  },
  {
    id: 8,
    question: 'Manakah kata sifat kualitas (Quality) yang paling tepat untuk laporan keuangan?',
    questionId: 'Which quality adjective describes financial records?',
    contextItem: 'Financial Report',
    options: ['accurate', 'green', 'circular', 'wooden'],
    correctAnswer: 'accurate',
    explanation: '"Accurate" (akurat) menjelaskan kualitas dan keakuratan laporan keuangan.',
    category: 'Quality Adjective'
  },
  {
    id: 9,
    question: 'Urutan kata sifat untuk lemari arsip logam tinggi:',
    questionId: 'Adjective order for filing cabinet:',
    contextItem: 'Filing Cabinet',
    options: ['tall grey steel cabinet', 'steel grey tall cabinet', 'grey tall steel cabinet', 'tall steel grey cabinet'],
    correctAnswer: 'tall grey steel cabinet',
    explanation: 'Tall (ukuran tinggi) ➔ grey (warna abu-abu) ➔ steel (bahan baja).',
    category: 'Adjective Order'
  },
  {
    id: 10,
    question: 'Susunlah frasa benda: [sturdy] [blue] [plastic] [folder]:',
    questionId: 'Confirm the complete phrase order:',
    contextItem: 'Document Folder',
    options: ['a sturdy blue plastic folder', 'a blue sturdy plastic folder', 'a plastic blue sturdy folder', 'a sturdy plastic blue folder'],
    correctAnswer: 'a sturdy blue plastic folder',
    explanation: 'Sturdy (kualitas/sifat) ➔ blue (warna) ➔ plastic (bahan) ➔ folder (noun).',
    category: 'Adjective Order'
  }
];

// 10 Soal Detail Benda (Chapter 2) for Otomotif
const OTOMOTIF_CHAPTER2_QUIZ: Chapter2QuizItem[] = [
  {
    id: 1,
    question: 'Urutan kata sifat untuk kunci pas mekanik (Ukuran/Berat ➔ Warna ➔ Bahan):',
    questionId: 'Correct adjective order for a wrench:',
    contextItem: 'Mechanic Wrench',
    options: ['heavy silver steel wrench', 'silver heavy steel wrench', 'steel silver heavy wrench', 'heavy steel silver wrench'],
    correctAnswer: 'heavy silver steel wrench',
    explanation: 'Heavy (berat/ukuran) ➔ silver (warna perak) ➔ steel (bahan baja) ➔ wrench (kata benda).',
    category: 'Adjective Order'
  },
  {
    id: 2,
    question: 'Urutan kata sifat untuk ban motor balap (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Correct adjective order for a motorcycle tire:',
    contextItem: 'Racing Tire',
    options: ['wide black rubber tire', 'black wide rubber tire', 'rubber black wide tire', 'wide rubber black tire'],
    correctAnswer: 'wide black rubber tire',
    explanation: 'Wide (ukuran lebar) ➔ black (warna hitam) ➔ rubber (bahan karet) ➔ tire.',
    category: 'Adjective Order'
  },
  {
    id: 3,
    question: 'Kata sifat manakah yang menunjukkan bahan (Material)?',
    questionId: 'Which word represents MATERIAL?',
    contextItem: 'Exhaust Pipe',
    options: ['titanium', 'light', 'shiny', 'fast'],
    correctAnswer: 'titanium',
    explanation: '"Titanium" adalah bahan logam pembuat knalpot balap.',
    category: 'Material Adjective'
  },
  {
    id: 4,
    question: 'Kata sifat manakah yang menunjukkan ukuran (Size)?',
    questionId: 'Which word represents SIZE?',
    contextItem: 'Motorcycle Mirror',
    options: ['compact', 'chrome', 'glass', 'useful'],
    correctAnswer: 'compact',
    explanation: '"Compact" (ringkas) menjelaskan dimensi ukuran spion.',
    category: 'Size Adjective'
  },
  {
    id: 5,
    question: 'Urutan kata sifat untuk tangki bensin motor prototipe:',
    questionId: 'Adjective order for fuel tank:',
    contextItem: 'Fuel Tank',
    options: ['large orange metal tank', 'metal orange large tank', 'orange large metal tank', 'large metal orange tank'],
    correctAnswer: 'large orange metal tank',
    explanation: 'Large (ukuran besar) ➔ orange (warna oranye) ➔ metal (bahan logam).',
    category: 'Adjective Order'
  },
  {
    id: 6,
    question: 'Untuk mendeskripsikan dua buah spion motor (jamak), kalimat yang benar adalah:',
    questionId: 'To describe plural mirrors, the correct sentence is:',
    contextItem: 'Dual Mirrors',
    options: ['They are aerodynamic mirrors.', 'It are aerodynamic mirrors.', 'It is aerodynamic mirrors.', 'They has aerodynamic mirrors.'],
    correctAnswer: 'They are aerodynamic mirrors.',
    explanation: 'Karena spion ada dua (jamak), gunakan "They are...".',
    category: 'Grammar Pattern'
  },
  {
    id: 7,
    question: 'Urutan kata sifat untuk helm keselamatan bengkel:',
    questionId: 'Adjective order for safety helmet:',
    contextItem: 'Safety Helmet',
    options: ['sturdy white plastic helmet', 'white sturdy plastic helmet', 'plastic sturdy white helmet', 'sturdy plastic white helmet'],
    correctAnswer: 'sturdy white plastic helmet',
    explanation: 'Sturdy (sifat kuat) ➔ white (warna putih) ➔ plastic (bahan plastik).',
    category: 'Adjective Order'
  },
  {
    id: 8,
    question: 'Kata sifat kualitas (Quality) yang tepat untuk mendeskripsikan mesin 150cc:',
    questionId: 'Quality adjective for the 150cc engine:',
    contextItem: 'Engine',
    options: ['powerful', 'round', 'yellow', 'wooden'],
    correctAnswer: 'powerful',
    explanation: '"Powerful" (bertenaga) menggambarkan performa mesin motor.',
    category: 'Quality Adjective'
  },
  {
    id: 9,
    question: 'Urutan kata sifat untuk dongkrak hidrolik bengkel:',
    questionId: 'Adjective order for hydraulic jack:',
    contextItem: 'Hydraulic Jack',
    options: ['heavy red iron jack', 'red heavy iron jack', 'iron red heavy jack', 'heavy iron red jack'],
    correctAnswer: 'heavy red iron jack',
    explanation: 'Heavy (berat) ➔ red (warna merah) ➔ iron (bahan besi).',
    category: 'Adjective Order'
  },
  {
    id: 10,
    question: 'Lengkapi deskripsi rantai motor: "It is a [long] [silver] [steel] chain."',
    questionId: 'Identify the rule applied in this phrase:',
    contextItem: 'Drive Chain',
    options: ['Size ➔ Color ➔ Material', 'Material ➔ Color ➔ Size', 'Color ➔ Size ➔ Material', 'Noun ➔ Size ➔ Color'],
    correctAnswer: 'Size ➔ Color ➔ Material',
    explanation: 'Urutan baku bahasa Inggris selalu Size (long) ➔ Color (silver) ➔ Material (steel).',
    category: 'Adjective Order'
  }
];

// 10 Soal Detail Benda (Chapter 2) for TJKT (Simplified for Beginners)
const TJKT_CHAPTER2_QUIZ: Chapter2QuizItem[] = [
  {
    id: 1,
    question: 'Urutan kata sifat yang benar untuk kabel LAN (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Simple adjective order for a network cable (Size -> Color -> Material):',
    contextItem: 'LAN Cable',
    options: ['long blue copper cable', 'blue long copper cable', 'copper blue long cable', 'long copper blue cable'],
    correctAnswer: 'long blue copper cable',
    explanation: 'Ukuran (long = panjang) ➔ Warna (blue = biru) ➔ Bahan (copper = tembaga).',
    category: 'Adjective Order'
  },
  {
    id: 2,
    question: 'Urutan kata sifat untuk kotak router Wi-Fi (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Simple adjective order for a Wi-Fi router box:',
    contextItem: 'Wi-Fi Router',
    options: ['small black plastic router', 'black small plastic router', 'plastic black small router', 'small plastic black router'],
    correctAnswer: 'small black plastic router',
    explanation: 'Small (kecil) ➔ black (hitam) ➔ plastic (plastik). Sangat mudah diingat!',
    category: 'Adjective Order'
  },
  {
    id: 3,
    question: 'Kata bahasa Inggris manakah yang berarti "kecil" (Ukuran)?',
    questionId: 'Which English word means "kecil" (Size)?',
    contextItem: 'Computer Mouse',
    options: ['small', 'green', 'plastic', 'fast'],
    correctAnswer: 'small',
    explanation: '"Small" berarti kecil (kata sifat ukuran).',
    category: 'Size Adjective'
  },
  {
    id: 4,
    question: 'Kata bahasa Inggris manakah yang menunjukkan bahan (Material)?',
    questionId: 'Which word is a MATERIAL?',
    contextItem: 'Fiber Cable',
    options: ['glass', 'short', 'white', 'new'],
    correctAnswer: 'glass',
    explanation: '"Glass" (kaca) adalah bahan pembuat kabel fiber optik.',
    category: 'Material Adjective'
  },
  {
    id: 5,
    question: 'Urutan kata sifat untuk layar monitor komputer:',
    questionId: 'Adjective order for a computer monitor:',
    contextItem: 'Monitor Screen',
    options: ['wide black glass screen', 'black wide glass screen', 'glass black wide screen', 'wide glass black screen'],
    correctAnswer: 'wide black glass screen',
    explanation: 'Wide (lebar) ➔ black (hitam) ➔ glass (kaca).',
    category: 'Adjective Order'
  },
  {
    id: 6,
    question: 'Bagaimana cara mendeskripsikan satu router Wi-Fi yang menyala?',
    questionId: 'How to describe one working router?',
    contextItem: 'Active Router',
    options: ['It is a fast router.', 'They are a fast router.', 'It are a fast router.', 'They is a fast router.'],
    correctAnswer: 'It is a fast router.',
    explanation: 'Karena bendanya satu (tunggal), gunakan "It is a fast router."',
    category: 'Grammar Pattern'
  },
  {
    id: 7,
    question: 'Urutan kata sifat untuk kartu jaringan kecil:',
    questionId: 'Adjective order for network card:',
    contextItem: 'Network Card',
    options: ['tiny green metal card', 'green tiny metal card', 'metal tiny green card', 'tiny metal green card'],
    correctAnswer: 'tiny green metal card',
    explanation: 'Tiny (sangat kecil) ➔ green (warna hijau) ➔ metal (logam).',
    category: 'Adjective Order'
  },
  {
    id: 8,
    question: 'Kata sifat manakah yang paling cocok untuk koneksi internet cepat?',
    questionId: 'Which adjective means "cepat" for internet speed?',
    contextItem: 'Internet Speed',
    options: ['fast', 'heavy', 'thick', 'yellow'],
    correctAnswer: 'fast',
    explanation: '"Fast" berarti cepat (internet cepat / fast internet).',
    category: 'Quality Adjective'
  },
  {
    id: 9,
    question: 'Urutan kata sifat untuk rak server komputer:',
    questionId: 'Adjective order for server rack:',
    contextItem: 'Server Rack',
    options: ['tall grey steel rack', 'grey tall steel rack', 'steel tall grey rack', 'tall steel grey rack'],
    correctAnswer: 'tall grey steel rack',
    explanation: 'Tall (tinggi) ➔ grey (abu-abu) ➔ steel (baja).',
    category: 'Adjective Order'
  },
  {
    id: 10,
    question: 'Lengkapi frasa keyboard komputer: "a [clean] [white] [plastic] keyboard":',
    questionId: 'Choose the meaning of the order:',
    contextItem: 'Computer Keyboard',
    options: ['Kualitas ➔ Warna ➔ Bahan', 'Bahan ➔ Warna ➔ Kualitas', 'Warna ➔ Bahan ➔ Kualitas', 'Kata Benda ➔ Kualitas ➔ Bahan'],
    correctAnswer: 'Kualitas ➔ Warna ➔ Bahan',
    explanation: 'Clean (bersih/kualitas) ➔ white (warna putih) ➔ plastic (bahan plastik).',
    category: 'Adjective Order'
  }
];

export const MAJOR_STORIES: Record<string, MajorStory> = {
  akl: {
    id: 'akl',
    title: 'AKUNTANSI & KEUANGAN (AKL)',
    subtitle: 'The Missing Ledger (Buku Kas yang Hilang)',
    description: 'Buku kas utama Koperasi Sekolah raib sebelum audit semester! Bantu Bu Kopi dan Dina menelusuri petunjuk deskriptif saksi.',
    icon: '📊',
    themeColor: '#2A9D8F',
    initialNpcId: 'bukopi',
    vocabList: [
      { word: 'ledger', partOfSpeech: 'Noun', meaning: 'buku kas / buku besar', example: 'The blue ledger is on the wooden desk.', category: 'Object' },
      { word: 'thick', partOfSpeech: 'Adjective', meaning: 'tebal', example: 'It is a thick financial book with 300 pages.', category: 'Quality' },
      { word: 'leather', partOfSpeech: 'Noun', meaning: 'kulit (bahan)', example: 'The bag is made of smooth brown leather.', category: 'Material' },
      { word: 'neat', partOfSpeech: 'Adjective', meaning: 'rapi', example: 'Her handwriting is neat and clear.', category: 'Quality' },
      { word: 'rectangular', partOfSpeech: 'Adjective', meaning: 'berbentuk persegi panjang', example: 'The receipts are in a rectangular wooden box.', category: 'Size' },
      { word: 'hardcover', partOfSpeech: 'Adjective', meaning: 'bersampul keras', example: 'It has a sturdy hardcover binding.', category: 'Material' }
    ],
    chapter1: {
      title: 'Bab 1: Warm-up Chat (Obrolan Pemanasan)',
      npcId: 'bukopi',
      instruction: 'Susun kata-kata acak berikut menjadi kalimat deskripsi dasar: "This is a [benda]. It is [sifat]."',
      contextId: 'Bu Kopi ingin kamu mengenali buku kas sekolah sebelum mencari yang hilang.',
      targetSentence: 'This is a ledger. It is thick.',
      jumbledWords: ['a', 'thick.', 'is', 'This', 'It', 'ledger.', 'is'],
      explanation: 'Dalam Descriptive Text, kalimat pengenalan sederhana menggunakan rumus: Identification ("This is a [noun]") + Quality ("It is [adjective]").',
      explanationId: 'Kalimat pertama mengenalkan bendanya (Identification), kalimat kedua menjelaskan karakteristiknya (Description).',
      proactivePrompt: 'What kind of book are we looking for? Is it thin or thick? Try arranging the word cards!',
      proactiveHintWords: ['This', 'is', 'a', 'ledger.', 'It', 'is', 'thick.']
    },
    chapter2: {
      title: 'Bab 2: Detail Benda (10 Latihan Adjective Order)',
      npcId: 'dina',
      instruction: 'Jawab 10 soal mengenai urutan kata sifat (Ukuran ➔ Warna ➔ Bahan) dan fitur benda akuntansi.',
      quizItems: AKL_CHAPTER2_QUIZ,
      explanation: 'Urutan kata sifat bahasa Inggris (Adjective Order): Ukuran (Size/Dimension) ➔ Warna (Color) ➔ Bahan (Material) ➔ Kata Benda (Noun)!',
      proactivePrompt: 'Remember the English adjective rule: Size comes first, then Color, then Material! What is the correct order?'
    },
    chapter3: {
      title: 'Bab 3: Kasus Petunjuk (Problem-Based Mystery)',
      npcId: 'satpam',
      caseDescriptionEn: 'The security camera and Pak Satpam saw three visitors near the koperasi corridor at 11:30 AM.',
      caseDescriptionId: 'Kamera pengawas dan Pak Satpam melihat tiga orang di lorong koperasi pukul 11.30 WIB.',
      witnessStatementEn: '"The person who took the file was tall, wearing a dark navy blazer, and holding a large emerald green pouch."',
      witnessStatementId: '"Orang yang membawa berkas itu berpostur tinggi, memakai blazer biru dongker tua, dan memegang pouch hijau zamrud besar."',
      question: 'Which person exactly matches the witness descriptive details?',
      suspects: [
        {
          id: 'person_a',
          title: 'Sosok A: Siswa Berjaket Merah',
          description: 'Short student with a bright red jacket and small black backpack.',
          visualTag: 'Short • Red Jacket • Black Backpack',
          isCorrect: false,
          feedback: 'Salah: Saksi menyebutkan "tall" (tinggi) dan "dark navy blazer", bukan jaket merah pendek!'
        },
        {
          id: 'person_b',
          title: 'Sosok B: Sosok Berblazer Dongker',
          description: 'Tall figure in a neat dark navy blazer carrying a large emerald green pouch.',
          visualTag: 'Tall • Dark Navy Blazer • Large Emerald Green Pouch',
          isCorrect: true,
          feedback: 'Tepat sekali! Semua ciri deskriptif (tall, navy blazer, large emerald green pouch) cocok 100% dengan keterangan saksi!'
        },
        {
          id: 'person_c',
          title: 'Sosok C: Petugas Topi Kuning',
          description: 'Medium height person with a yellow hat and a brown cardboard carton.',
          visualTag: 'Medium Height • Yellow Hat • Brown Carton',
          isCorrect: false,
          feedback: 'Salah: Warna dan barang bawaan tidak sesuai dengan deskripsi saksi.'
        }
      ],
      proactivePrompt: 'Carefully compare the adjectives: tall, navy blazer, and emerald green pouch. Who matches?'
    },
    chapter4: {
      title: 'Bab 4: Susun Paragraf Deskriptif',
      npcId: 'kakrani',
      topic: 'The School Cooperative Ledger',
      sentences: [
        { id: 's1', section: 'Identification', order: 1, text: 'The school cooperative ledger is an essential financial book at SMK Muhammadiyah Bawang.' },
        { id: 's2', section: 'Description', order: 2, text: 'It has a sturdy blue hardcover with clean gold lettering on the front.' },
        { id: 's3', section: 'Description', order: 3, text: 'Inside, each page contains neat columns for daily student transactions and balance records.' },
        { id: 's4', section: 'Description', order: 4, text: 'This book keeps all cooperative funds transparent, organized, and reliable.' }
      ],
      hint: 'Mulai dengan kalimat pengenalan umum (Identification), lalu lanjutkan dengan detail fisik luar, bagian dalam, dan kegunaannya (Description).',
      explanation: 'Struktur teks deskriptif terdiri dari: 1. Identification (mengenalkan topik spesifik), lalu 2. Description (rincian fisik, bagian-bagian, dan kualitas).'
    },
    chapter5: {
      title: 'Bab 5: Proyek Akhir Mandiri (Project-Based Writing)',
      npcId: 'kakrani',
      promptTopic: 'Tuliskan 5 kalimat deskriptif dalam bahasa Inggris mengenai salah satu alat atau ruangan di jurusan Akuntansi (contoh: kalkulator kasir, meja akuntansi, brankas koperasi, atau nota transaksi).',
      guidingQuestions: [
        'What is the name of the object or place? (Identification)',
        'What is its size and shape? (e.g. compact, rectangular, wide)',
        'What color and material is it made of? (e.g. grey, metallic, smooth plastic)',
        'What special features does it have? (e.g. it has large buttons, digital screen)',
        'Why is it useful for accounting students? (e.g. helpful, accurate, reliable)'
      ],
      exampleVocab: ['digital', 'compact', 'metallic', 'rectangular', 'accurate', 'reliable', 'sturdy', 'clean'],
      plotTwistTitle: 'Plot Twist Terungkap: The Honest Digitalization!',
      plotTwistTextEn: 'The ledger was never stolen! Kak Rani, an outstanding AKL alumna, had received permission from the school principal to borrow the ledger for only two hours to digitize all manual accounts into the new Muhiba Cooperative Mobile App! The "mysterious thief" accused by rumors was actually Kak Rani. Thanks to accurate descriptive details, false accusations were prevented.',
      plotTwistTextId: 'Buku kas ternyata tidak pernah dicuri! Kak Rani, alumni teladan AKL, telah mengantongi izin kepala sekolah untuk meminjam buku kas selama dua jam demi mendigitalkan seluruh pembukuan manual ke dalam aplikasi Koperasi Mobile Muhiba. Sosok "pencuri" yang digosipkan hanyalah salah paham. Berkat deskripsi yang teliti dan objektif, tuduhan keliru berhasil dicegah!',
      plotTwistMoral: 'Lesson Learned: Accurate and objective description prevents misunderstandings and unfair judgments.'
    }
  },

  otomotif: {
    id: 'otomotif',
    title: 'TEKNIK OTOMOTIF',
    subtitle: 'The Silent Engine (Mesin yang Hening)',
    description: 'Sepeda motor balap prototipe karya siswa bengkel hilang dari tempat uji emisi! Telusuri jejak teknis melalui kosakata deskriptif otomotif.',
    icon: '🏍️',
    themeColor: '#E76F51',
    initialNpcId: 'pakbimo',
    vocabList: [
      { word: 'engine', partOfSpeech: 'Noun', meaning: 'mesin motor', example: 'The four-stroke engine is very powerful.', category: 'Object' },
      { word: 'powerful', partOfSpeech: 'Adjective', meaning: 'bertenaga / kuat', example: 'It has a powerful 150cc engine.', category: 'Quality' },
      { word: 'metallic', partOfSpeech: 'Adjective', meaning: 'berkilau logam', example: 'The fuel tank has a metallic orange finish.', category: 'Material' },
      { word: 'exhaust', partOfSpeech: 'Noun', meaning: 'knalpot pembuangan', example: 'The stainless steel exhaust is custom-built.', category: 'Object' },
      { word: 'aerodynamic', partOfSpeech: 'Adjective', meaning: 'aerodinamis / ramping', example: 'The front fairing has an aerodynamic curve.', category: 'Quality' },
      { word: 'wrench', partOfSpeech: 'Noun', meaning: 'kunci pas / perkakas', example: 'He grabs a heavy steel wrench.', category: 'Object' }
    ],
    chapter1: {
      title: 'Bab 1: Warm-up Chat (Obrolan Pemanasan)',
      npcId: 'pakbimo',
      instruction: 'Susun kata-kata acak berikut menjadi kalimat deskripsi dasar: "This is an [benda]. It is [sifat]."',
      contextId: 'Pak Bimo menguji pemahaman awalmu tentang komponen bengkel sebelum memulai pencarian.',
      targetSentence: 'This is an engine. It is powerful.',
      jumbledWords: ['an', 'powerful.', 'is', 'This', 'It', 'engine.', 'is'],
      explanation: 'Dalam Descriptive Text, kalimat pengenalan sederhana menggunakan pola: Identification ("This is an engine") + Quality ("It is powerful").',
      explanationId: 'Pola dasar deskripsi: kenalkan bendanya terlebih dahulu, lalu sebutkan sifat utamanya.',
      proactivePrompt: 'Look at the mechanical unit! Is it weak or powerful? Arrange the cards to describe it!',
      proactiveHintWords: ['This', 'is', 'an', 'engine.', 'It', 'is', 'powerful.']
    },
    chapter2: {
      title: 'Bab 2: Detail Benda (10 Latihan Adjective Order)',
      npcId: 'rio',
      instruction: 'Jawab 10 soal mengenai urutan kata sifat perkakas otomotif (Ukuran/Berat ➔ Warna ➔ Bahan).',
      quizItems: OTOMOTIF_CHAPTER2_QUIZ,
      explanation: 'Urutan kata sifat: Ukuran/Karakteristik Fisik (Size/Weight) ➔ Warna (Color) ➔ Bahan (Material) ➔ Kata Benda (Noun)!',
      proactivePrompt: 'Which one comes first: Weight/Size, Color, or Material? Try selecting the correct word for each slot!'
    },
    chapter3: {
      title: 'Bab 3: Kasus Petunjuk (Problem-Based Mystery)',
      npcId: 'pakbimo',
      caseDescriptionEn: 'The prototype motorcycle left tire tracks and a technical note near Bay 4 of the workshop.',
      caseDescriptionId: 'Motor prototipe meninggalkan jejak ban dan catatan teknis di dekat Bay 4 bengkel.',
      witnessStatementEn: '"The target motorcycle has dual aerodynamic rear mirrors, wide grooved racing tires, and a matte black fuel tank."',
      witnessStatementId: '"Motor target memiliki spion ganda aerodinamis, ban balap beralur lebar, dan tangki bensin hitam doff."',
      question: 'Which vehicle parked in the back alley matches the description?',
      suspects: [
        {
          id: 'bike_a',
          title: 'Motor Klasik Bebek',
          description: 'Old commuter bike with single round mirror and narrow street tires.',
          visualTag: 'Single Round Mirror • Narrow Tires • Chrome Tank',
          isCorrect: false,
          feedback: 'Salah: Motor ini memiliki satu spion bulat dan ban sempit, tidak cocok dengan deskripsi.'
        },
        {
          id: 'bike_b',
          title: 'Prototipe Muhiba Racing',
          description: 'Sport prototype with dual aerodynamic mirrors, wide racing tires, and a matte black tank.',
          visualTag: 'Dual Aero Mirrors • Wide Racing Tires • Matte Black Tank',
          isCorrect: true,
          feedback: 'Benar sekali! Ciri fisik motor ini cocok persis dengan catatan teknis yang dicari!'
        },
        {
          id: 'bike_c',
          title: 'Skuter Listrik Hijau',
          description: 'Electric moped with bright lime green paint and smooth treadless wheels.',
          visualTag: 'Lime Green • Smooth Wheels • Plastic Basket',
          isCorrect: false,
          feedback: 'Salah: Warna dan jenis roda sangat berbeda dari deskripsi saksi.'
        }
      ],
      proactivePrompt: 'Look for aerodynamic mirrors, wide racing tires, and matte black paint. Which bike is it?'
    },
    chapter4: {
      title: 'Bab 4: Susun Paragraf Deskriptif',
      npcId: 'rio',
      topic: 'The Muhiba Prototype Motorcycle',
      sentences: [
        { id: 's1', section: 'Identification', order: 1, text: 'The Muhiba Prototype 150 is a custom racing motorcycle engineered by vocational automotive students.' },
        { id: 's2', section: 'Description', order: 2, text: 'It features a streamlined matte black body with bold orange racing decals.' },
        { id: 's3', section: 'Description', order: 3, text: 'Under the chassis, it carries a modified 150cc four-stroke engine paired with a lightweight titanium exhaust.' },
        { id: 's4', section: 'Description', order: 4, text: 'This high-performance machine demonstrates outstanding fuel efficiency and superb cornering balance.' }
      ],
      hint: 'Awali dengan mengenalkan motor tersebut (Identification), lalu gambarkan bodi luarnya, mesin dan knalpotnya, serta performanya (Description).',
      explanation: 'Paragraf deskriptif dimulai dari pengenalan umum (Identification), kemudian diikuti oleh detail visual, komponen mesin, dan performa (Description).'
    },
    chapter5: {
      title: 'Bab 5: Proyek Akhir Mandiri (Project-Based Writing)',
      npcId: 'pakbimo',
      promptTopic: 'Tuliskan 5 kalimat deskriptif dalam bahasa Inggris mengenai salah satu perkakas atau bagian kendaraan di bengkel otomotif (contoh: impact wrench, dongkrak hidrolik, helm keselamatan bengkel, atau cakram rem motor).',
      guidingQuestions: [
        'What is the name of the tool or vehicle part? (Identification)',
        'What are its dimensions or weight? (e.g. compact, heavy, long)',
        'What color and material is it made of? (e.g. black, cast iron, tempered steel)',
        'How does it operate or what special parts does it have? (e.g. sharp teeth, hydraulic valve)',
        'Why is it vital for workshop safety or maintenance? (e.g. durable, essential, safe)'
      ],
      exampleVocab: ['heavy', 'durable', 'metallic', 'hydraulic', 'powerful', 'precision', 'pneumatic', 'sturdy'],
      plotTwistTitle: 'Plot Twist Terungkap: The Surprise Final Examination!',
      plotTwistTextEn: 'The prototype motorcycle was never stolen! Pak Bimo hid the bike behind the dynamometer test chamber on purpose as the ultimate practical exam for the semester! The clues and technical descriptions player read all along were carefully crafted by the senior automotive students. Pak Bimo smiles proudly: "When a technician writes clear descriptions, any teammate can follow and solve the mystery!"',
      plotTwistTextId: 'Sepeda motor prototipe ternyata tidak pernah dicuri! Pak Bimo sengaja menyembunyikan motor tersebut di ruang uji emisi dinamometer sebagai ujian praktik akhir semester! Semua petunjuk dan deskripsi teknis yang kamu ikuti sebenarnya ditulis oleh siswa-siswa senior sendiri. Pak Bimo tersenyum bangga: "Saat teknisi menulis deskripsi yang jelas dan tepat, orang lain dapat memahaminya tanpa salah!"',
      plotTwistMoral: 'Lesson Learned: Precise technical descriptions empower collaboration and clear instructions in the workplace.'
    }
  },

  // Simplified and Beginner-Friendly TJKT for 10th-grade beginners!
  tjkt: {
    id: 'tjkt',
    title: 'TEKNIK JARINGAN & KOMPUTER (TJKT)',
    subtitle: 'The Blinking Router (Router yang Berkedip)',
    description: 'Wi-Fi sekolah sedang mati! Ikuti petunjuk mudah di Lab Jaringan bersama robot Pixel untuk menyalakan kembali internet.',
    icon: '🌐',
    themeColor: '#7209B7',
    initialNpcId: 'bunisa',
    vocabList: [
      { word: 'router', partOfSpeech: 'Noun', meaning: 'alat pemancar Wi-Fi internet', example: 'The router is on the clean desk.', category: 'Object' },
      { word: 'cable', partOfSpeech: 'Noun', meaning: 'kabel jaringan', example: 'The blue cable is very long.', category: 'Object' },
      { word: 'fast', partOfSpeech: 'Adjective', meaning: 'cepat', example: 'Our school Wi-Fi is very fast.', category: 'Quality' },
      { word: 'small', partOfSpeech: 'Adjective', meaning: 'kecil / mungil', example: 'Pixel is a small friendly robot.', category: 'Size' },
      { word: 'black', partOfSpeech: 'Adjective', meaning: 'hitam', example: 'The router has a black plastic case.', category: 'Color' },
      { word: 'screen', partOfSpeech: 'Noun', meaning: 'layar monitor / tampilan', example: 'The computer screen is bright and clear.', category: 'Object' }
    ],
    chapter1: {
      title: 'Bab 1: Warm-up Chat (Obrolan Pemanasan Pemula)',
      npcId: 'bunisa',
      instruction: 'Susun kata-kata mudah berikut menjadi kalimat deskripsi dasar: "This is a router. It is fast."',
      contextId: 'Bu Nisa ingin kamu mengenali router Wi-Fi sekolah dengan kalimat yang sangat sederhana.',
      targetSentence: 'This is a router. It is fast.',
      jumbledWords: ['a', 'fast.', 'is', 'This', 'It', 'router.', 'is'],
      explanation: 'Dalam Descriptive Text pemula, rumusnya sangat mudah: Kenalkan alat ("This is a router") + Sebutkan sifatnya ("It is fast").',
      explanationId: 'Pola mudah: This is a [benda]. It is [kata sifat].',
      proactivePrompt: 'What device gives us Wi-Fi? Is it slow or fast? Put the cards in order!',
      proactiveHintWords: ['This', 'is', 'a', 'router.', 'It', 'is', 'fast.']
    },
    chapter2: {
      title: 'Bab 2: Detail Benda (10 Latihan Mudah TJKT)',
      npcId: 'pixel',
      instruction: 'Jawab 10 soal pilihan mudah mengenai kabel, komputer, dan router (Ukuran ➔ Warna ➔ Bahan).',
      quizItems: TJKT_CHAPTER2_QUIZ,
      explanation: 'Urutan kata sifat mudah: Ukuran (long/small) ➔ Warna (blue/black) ➔ Bahan (copper/plastic) ➔ Kata Benda (cable/router)!',
      proactivePrompt: 'Beep! Which comes first for this cable: length (long), color (blue), or material (copper)?'
    },
    chapter3: {
      title: 'Bab 3: Kasus Petunjuk (Teka-Teki Mudah Pemula)',
      npcId: 'bunisa',
      caseDescriptionEn: 'Bu Nisa and Pixel found a clue about the disconnected Wi-Fi box on the laboratory table.',
      caseDescriptionId: 'Bu Nisa dan Pixel menemukan catatan petunjuk tentang kotak Wi-Fi yang mati di meja lab.',
      witnessStatementEn: '"The missing Wi-Fi box is a small black plastic box with 2 antennas and glowing green lights."',
      witnessStatementId: '"Kotak Wi-Fi yang dicari adalah kotak plastik hitam kecil dengan 2 antena dan lampu hijau menyala."',
      question: 'Which device on the lab desk matches this easy description?',
      suspects: [
        {
          id: 'device_a',
          title: 'Perangkat A: Mesin Printer Putih Besar',
          description: 'A large white printer with paper tray and no antennas.',
          visualTag: 'Large • White • Printer • No Antennas',
          isCorrect: false,
          feedback: 'Salah: Ini adalah printer putih besar, bukan router plastik hitam dengan 2 antena!'
        },
        {
          id: 'device_b',
          title: 'Perangkat B: Wi-Fi Router Hitam (Target)',
          description: 'A small black plastic box equipped with 2 antennas and bright green lights.',
          visualTag: 'Small • Black • 2 Antennas • Green Lights',
          isCorrect: true,
          feedback: 'Benar sekali! Ciri fisiknya (small, black plastic, 2 antennas, green lights) cocok sempurna dengan petunjuk!'
        },
        {
          id: 'device_c',
          title: 'Perangkat C: Kursi Lab Merah',
          description: 'A red plastic chair with four metal legs.',
          visualTag: 'Red Chair • 4 Legs',
          isCorrect: false,
          feedback: 'Salah: Ini adalah kursi duduk, bukan perangkat Wi-Fi!'
        }
      ],
      proactivePrompt: 'Look for a small black plastic box with two antennas and green lights!'
    },
    chapter4: {
      title: 'Bab 4: Susun Paragraf Deskriptif Mudah',
      npcId: 'bunisa',
      topic: 'The School Wi-Fi Router',
      sentences: [
        { id: 's1', section: 'Identification', order: 1, text: 'This is our school Wi-Fi router in the TJKT laboratory.' },
        { id: 's2', section: 'Description', order: 2, text: 'It is a small black plastic box with two antennas on top.' },
        { id: 's3', section: 'Description', order: 3, text: 'It has small green LED lights that blink when connected.' },
        { id: 's4', section: 'Description', order: 4, text: 'It provides fast and reliable internet connection for all students.' }
      ],
      hint: 'Mulai dari kalimat pengenal nama alat (Identification: "This is our school Wi-Fi router"), lalu bodi hitamnya, lampu hijaunya, dan fungsinya.',
      explanation: 'Paragraf deskriptif mudah: Identification (kalimat 1) ➔ Description bentuk fisik (kalimat 2-3) ➔ Fungsi manfaat (kalimat 4).'
    },
    chapter5: {
      title: 'Bab 5: Proyek Akhir Mandiri (5 Kalimat Mudah)',
      npcId: 'pixel',
      promptTopic: 'Tuliskan 5 kalimat deskriptif bahasa Inggris yang mudah mengenai komputer atau robot Pixel di Lab TJKT (contoh: komputer, layar monitor, kabel LAN, atau robot Pixel).',
      guidingQuestions: [
        '1. What is the object? (e.g. "This is our lab computer.")',
        '2. What is its size or shape? (e.g. "It is compact and rectangular.")',
        '3. What color is it? (e.g. "It is black and grey.")',
        '4. What special parts does it have? (e.g. "It has a bright screen and keyboard.")',
        '5. Why is it useful for students? (e.g. "It helps students study internet.")'
      ],
      exampleVocab: ['small', 'black', 'fast', 'clean', 'bright', 'modern', 'digital', 'helpful'],
      plotTwistTitle: 'Plot Twist Terungkap: The Friendly Robot Pixel!',
      plotTwistTextEn: 'The mystery Wi-Fi broadcaster was Pixel itself! Pixel is a friendly assistant robot built by senior TJKT students. When a sudden power surge wiped its internal description file, Pixel panicked because it forgot its own physical identity! Now that you accurately described its small silver body and blue eyes, Pixel happily reconnects the school Wi-Fi at blazing speed!',
      plotTwistTextId: 'Penyiar Wi-Fi misterius ternyata adalah robot Pixel itu sendiri! Pixel adalah robot asisten ramah yang dirakit oleh kakak kelas TJKT. Saat lonjakan listrik sempat menghapus file profilnya, Pixel panik karena lupa ciri fisik dirinya sendiri! Berkat deskripsimu yang tepat dan mudah dipahami, Pixel kini mengingat jati dirinya dan menyalakan kembali Wi-Fi sekolah!',
      plotTwistMoral: 'Lesson Learned: Descriptive language gives identity, clarity, and life to the world around us.'
    }
  }
};
