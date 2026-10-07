import { MajorStory, NPC, VocabularyItem, VocabMysteryCard, BatangTourStop, Chapter2QuizItem, GrammarPracticeQuestion } from './types';

// Initial Vocabulary Mystery Cards to solve & match
export const VOCAB_MYSTERY_CARDS: VocabMysteryCard[] = [
  { id: 'v1', enWord: 'refreshing', idWord: 'menyegarkan', category: 'Quality', hint: 'Kualitas air terjun atau udara sejuk di pegunungan' },
  { id: 'v2', enWord: 'delicious', idWord: 'lezat / nikmat', category: 'Quality', hint: 'Cita rasa kopi Surjo hangat khas Bawang' },
  { id: 'v3', enWord: 'modern', idWord: 'modern / canggih', category: 'Quality', hint: 'Karakteristik kawasan industri KITB' },
  { id: 'v4', enWord: 'thick', idWord: 'tebal', category: 'Size', hint: 'Buku kas koperasi yang berisi ratusan lembar' },
  { id: 'v5', enWord: 'powerful', idWord: 'bertenaga / kuat', category: 'Quality', hint: 'Kekuatan mesin sepeda motor bengkel otomotif' },
  { id: 'v6', enWord: 'fast', idWord: 'cepat', category: 'Quality', hint: 'Kecepatan jaringan koneksi Wi-Fi router' },
  { id: 'v7', enWord: 'sturdy', idWord: 'kokoh / kuat', category: 'Quality', hint: 'Karakteristik bahan logam atau rangka gerbang' },
  { id: 'v8', enWord: 'tall', idWord: 'tinggi', category: 'Size', hint: 'Ukuran tiang bendera atau air terjun Curug Genting' }
];

// Interactive Grammar Practice Questions: It is / It has (have) / There is / There are
export const GRAMMAR_PRACTICE_QUESTIONS: GrammarPracticeQuestion[] = [
  {
    id: 1,
    promptSentence: '____ a modern computer lab in SMK Muhammadiyah Bawang.',
    sentenceId: 'Ada sebuah laboratorium komputer modern di SMK Muhammadiyah Bawang.',
    missingWordHint: 'Menunjukkan keberadaan SATU tempat atau benda tunggal',
    options: ['There is', 'There are', 'It is', 'It has'],
    correctAnswer: 'There is',
    explanation: 'Gunakan "There is" untuk menunjukkan keberadaan SATU tempat atau benda tunggal (a modern computer lab).',
    ruleCategory: 'There is'
  },
  {
    id: 2,
    promptSentence: 'Look at the red racing motorcycle! ____ very fast and powerful.',
    sentenceId: 'Lihatlah sepeda motor balap merah itu! Kendaraan itu sangat cepat dan bertenaga.',
    missingWordHint: 'Mendeskripsikan sifat/karakteristik suatu benda tunggal (adjective)',
    options: ['It is', 'It has', 'There is', 'There are'],
    correctAnswer: 'It is',
    explanation: 'Gunakan "It is" diikuti kata sifat (adjective: fast and powerful) untuk mendeskripsikan karakteristik benda tunggal.',
    ruleCategory: 'It is'
  },
  {
    id: 3,
    promptSentence: 'The cooperative ledger is very thick. ____ 300 white paper pages inside.',
    sentenceId: 'Buku kas koperasi sangat tebal. Buku itu memiliki 300 halaman kertas putih di dalamnya.',
    missingWordHint: 'Menyatakan kepemilikan/fitur yang dimiliki oleh sebuah benda tunggal',
    options: ['It has', 'They have', 'There are', 'It is'],
    correctAnswer: 'It has',
    explanation: 'Gunakan "It has" untuk menyatakan fitur atau bagian yang dimiliki oleh satu benda tunggal (The ledger has 300 pages).',
    ruleCategory: 'It has / They have'
  },
  {
    id: 4,
    promptSentence: 'In our automotive workshop, ____ many heavy steel wrenches on the tool wall.',
    sentenceId: 'Di bengkel otomotif kita, ada banyak kunci pas baja berat di dinding perkakas.',
    missingWordHint: 'Menunjukkan keberadaan BANYAK benda jamak (plural)',
    options: ['There are', 'There is', 'It is', 'It has'],
    correctAnswer: 'There are',
    explanation: 'Gunakan "There are" untuk menyatakan keberadaan benda jamak lebih dari satu (many heavy steel wrenches).',
    ruleCategory: 'There are'
  },
  {
    id: 5,
    promptSentence: 'The mechanics check the new racing tires. ____ four deep rubber grooves for safety.',
    sentenceId: 'Para mekanik memeriksa ban balap baru. Ban-ban tersebut memiliki empat alur karet dalam demi keselamatan.',
    missingWordHint: 'Menyatakan kepemilikan fitur oleh benda jamak (they)',
    options: ['They have', 'It has', 'There is', 'It is'],
    correctAnswer: 'They have',
    explanation: 'Gunakan "They have" karena subjeknya jamak (the tires = they) saat menyatakan fitur/bagian yang dimiliki.',
    ruleCategory: 'It has / They have'
  },
  {
    id: 6,
    promptSentence: '____ a tall Indonesian flag fluttering proudly in the central school field.',
    sentenceId: 'Ada sebuah bendera Indonesia tinggi yang berkibar gagah di lapangan tengah sekolah.',
    missingWordHint: 'Mengenalkan keberadaan SATU objek di tempat tertentu',
    options: ['There is', 'There are', 'It has', 'They have'],
    correctAnswer: 'There is',
    explanation: 'Gunakan "There is" untuk mengenalkan keberadaan satu objek (a tall Indonesian flag).',
    ruleCategory: 'There is'
  }
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
    npcZone: 'Kantin Sekolah & Gazebo Santai',
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
  // General School NPCs
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
    x: 1170,
    y: 1250, // Clearly positioned right in front of Kantin outdoor food area
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
    role: 'Student Staff (X AKL)',
    gender: 'female',
    x: 1680,
    y: 440,
    spriteType: 'student_female',
    zone: 'Ruang Koperasi & AKL',
    majorSpecific: 'akl',
    defaultGreetingEn: 'The accounting calculator is small, black, and very accurate.',
    defaultGreetingId: 'Kalkulator akuntansi berukuran kecil, berwarna hitam, dan sangat akurat.'
  },
  {
    id: 'kakrani',
    name: 'Kak Rani',
    role: 'AKL Alumna & App Developer',
    gender: 'female',
    x: 1780,
    y: 380,
    spriteType: 'student_female',
    zone: 'Ruang Koperasi & AKL',
    majorSpecific: 'akl',
    defaultGreetingEn: 'Financial data must be exact and clear. Descriptive details help us verify transactions!',
    defaultGreetingId: 'Data keuangan harus tepat dan jelas. Deskripsi detail membantu verifikasi transaksi!'
  },

  // Zone 3: Bengkel Otomotif (Strictly for Otomotif students)
  {
    id: 'pakbimo',
    name: 'Pak Bimo',
    role: 'Head of Automotive Workshop',
    gender: 'male',
    x: 480,
    y: 1240,
    spriteType: 'mechanic',
    zone: 'Bengkel Otomotif',
    majorSpecific: 'otomotif',
    defaultGreetingEn: 'Safety first in the workshop! Check every tool: its size, color, and material.',
    defaultGreetingId: 'Utamakan keselamatan di bengkel! Periksa setiap alat: ukuran, warna, dan bahannya.'
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'Mechanic Student (X TO)',
    gender: 'male',
    x: 640,
    y: 1260,
    spriteType: 'student_male',
    zone: 'Bengkel Otomotif',
    majorSpecific: 'otomotif',
    defaultGreetingEn: 'This torque wrench is heavy, silver, and made of hardened steel.',
    defaultGreetingId: 'Kunci torsi ini berat, berwarna perak, dan terbuat dari baja keras.'
  },

  // Zone 4: Lab TJKT (Strictly for TJKT students)
  {
    id: 'bunisa',
    name: 'Bu Nisa',
    role: 'Head of Computer & Network Lab',
    gender: 'female',
    x: 1540,
    y: 1240,
    spriteType: 'teacher_female',
    zone: 'Lab Jaringan TJKT',
    majorSpecific: 'tjkt',
    defaultGreetingEn: 'Welcome to the TJKT network lab! Look at the blinking server racks.',
    defaultGreetingId: 'Selamat datang di lab jaringan TJKT! Perhatikan rak server yang berkedip.'
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'AI Lab Robot Assistant',
    gender: 'female',
    x: 1720,
    y: 1230,
    spriteType: 'robot',
    zone: 'Lab Jaringan TJKT',
    majorSpecific: 'tjkt',
    defaultGreetingEn: 'BEEP BOOP! I am Pixel. My metal casing is shiny, silver, and clean!',
    defaultGreetingId: 'BEEP BOOP! Saya Pixel. Casing logam saya berkilau, perak, dan bersih!'
  }
];

// 10 Soal Detail Benda (Chapter 2) for AKL
const AKL_CHAPTER2_QUIZ: Chapter2QuizItem[] = [
  {
    id: 1,
    question: 'Urutan kata sifat untuk buku kas koperasi (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Correct adjective order for the ledger:',
    contextItem: 'Cooperative Ledger',
    options: ['thick blue leather book', 'blue thick leather book', 'leather blue thick book', 'thick leather blue book'],
    correctAnswer: 'thick blue leather book',
    explanation: 'Aturan: Size (thick = tebal) ➔ Color (blue = biru) ➔ Material (leather = kulit) ➔ Noun (book).',
    category: 'Adjective Order'
  },
  {
    id: 2,
    question: 'Urutan kata sifat untuk kalkulator kasir akuntansi (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Adjective order for accounting calculator:',
    contextItem: 'Cashier Calculator',
    options: ['small black plastic calculator', 'black small plastic calculator', 'plastic black small calculator', 'small plastic black calculator'],
    correctAnswer: 'small black plastic calculator',
    explanation: 'Size (small = kecil) ➔ Color (black = hitam) ➔ Material (plastic = plastik).',
    category: 'Adjective Order'
  },
  {
    id: 3,
    question: 'Manakah kata sifat yang menunjukkan UKURAN (Size)?',
    questionId: 'Which adjective denotes SIZE?',
    contextItem: 'General Concept',
    options: ['wide', 'metallic', 'wooden', 'yellow'],
    correctAnswer: 'wide',
    explanation: '"Wide" (lebar) adalah ukuran (Size), sedangkan yang lain adalah bahan dan warna.',
    category: 'Size Adjective'
  },
  {
    id: 4,
    question: 'Manakah kata yang menunjukkan BAHAN (Material)?',
    questionId: 'Which word is a MATERIAL?',
    contextItem: 'General Concept',
    options: ['steel', 'tiny', 'purple', 'new'],
    correctAnswer: 'steel',
    explanation: '"Steel" (baja) merupakan material/bahan pembuatan lemari atau brankas.',
    category: 'Material Adjective'
  },
  {
    id: 5,
    question: 'Urutan kata sifat untuk brankas uang koperasi:',
    questionId: 'Adjective order for money safe:',
    contextItem: 'Cooperative Safe',
    options: ['heavy grey iron safe', 'grey heavy iron safe', 'iron grey heavy safe', 'heavy iron grey safe'],
    correctAnswer: 'heavy grey iron safe',
    explanation: 'Heavy (ukuran/berat) ➔ grey (warna) ➔ iron (bahan besi) ➔ safe.',
    category: 'Adjective Order'
  },
  {
    id: 6,
    question: 'Kalimat manakah yang tepat untuk mendeskripsikan SATU meja akuntansi?',
    questionId: 'Describe ONE accounting desk:',
    contextItem: 'Accounting Desk',
    options: ['It is a brown wooden desk.', 'They are a brown wooden desk.', 'It are a brown wooden desk.', 'There has a brown wooden desk.'],
    correctAnswer: 'It is a brown wooden desk.',
    explanation: 'Untuk satu benda tunggal (a desk), gunakan pola "It is a brown wooden desk."',
    category: 'Grammar Pattern'
  },
  {
    id: 7,
    question: 'Kalimat manakah yang tepat untuk DUA nota kwitansi pembayaran?',
    questionId: 'Describe TWO payment receipts:',
    contextItem: 'Payment Receipts',
    options: ['They are yellow receipts.', 'It is yellow receipts.', 'They is yellow receipts.', 'It are yellow receipts.'],
    correctAnswer: 'They are yellow receipts.',
    explanation: 'Untuk benda jamak (lebih dari satu), gunakan subjek "They are".',
    category: 'Grammar Pattern'
  },
  {
    id: 8,
    question: 'Kata sifat manakah yang paling tepat untuk mendeskripsikan laporan keuangan yang bebas kesalahan?',
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
    question: 'Manakah kata sifat yang menunjukkan UKURAN (Size)?',
    questionId: 'Which adjective denotes SIZE?',
    contextItem: 'General Concept',
    options: ['compact', 'aluminum', 'matte', 'orange'],
    correctAnswer: 'compact',
    explanation: '"Compact" (ringkas/padat) adalah ukuran, sedangkan yang lain warna dan bahan.',
    category: 'Size Adjective'
  },
  {
    id: 4,
    question: 'Manakah kata yang menunjukkan BAHAN (Material) suku cadang motor?',
    questionId: 'Which word is a MATERIAL?',
    contextItem: 'Motorcycle Parts',
    options: ['aluminum', 'bright', 'long', 'fast'],
    correctAnswer: 'aluminum',
    explanation: '"Aluminum" (aluminium) adalah bahan logam ringan pembuat velg motor.',
    category: 'Material Adjective'
  },
  {
    id: 5,
    question: 'Urutan kata sifat untuk tangki bahan bakar motor balap:',
    questionId: 'Adjective order for a fuel tank:',
    contextItem: 'Fuel Tank',
    options: ['large orange metal tank', 'orange large metal tank', 'metal orange large tank', 'large metal orange tank'],
    correctAnswer: 'large orange metal tank',
    explanation: 'Large (ukuran besar) ➔ orange (warna oranye) ➔ metal (bahan logam).',
    category: 'Adjective Order'
  },
  {
    id: 6,
    question: 'Kalimat manakah yang tepat untuk mendeskripsikan SATU mesin motor 150cc?',
    questionId: 'Describe ONE 150cc motorcycle engine:',
    contextItem: 'Motorcycle Engine',
    options: ['It is a powerful engine.', 'They are a powerful engine.', 'It are a powerful engine.', 'They is a powerful engine.'],
    correctAnswer: 'It is a powerful engine.',
    explanation: 'Mesin motor tunggal (one engine) menggunakan subjek "It is".',
    category: 'Grammar Pattern'
  },
  {
    id: 7,
    question: 'Kalimat manakah yang tepat untuk mendeskripsikan DUA kaca spion aerodinamis?',
    questionId: 'Describe TWO aerodynamic rear mirrors:',
    contextItem: 'Rear Mirrors',
    options: ['They are aerodynamic mirrors.', 'It is aerodynamic mirrors.', 'They is aerodynamic mirrors.', 'It are aerodynamic mirrors.'],
    correctAnswer: 'They are aerodynamic mirrors.',
    explanation: 'Dua kaca spion (jamak) menggunakan pola "They are".',
    category: 'Grammar Pattern'
  },
  {
    id: 8,
    question: 'Kata sifat manakah yang paling tepat untuk mendeskripsikan knalpot yang tahan karat?',
    questionId: 'Which adjective describes a non-rusting exhaust?',
    contextItem: 'Stainless Exhaust',
    options: ['stainless', 'wooden', 'flimsy', 'soft'],
    correctAnswer: 'stainless',
    explanation: '"Stainless" (tahan karat) adalah sifat mutu tinggi logam knalpot.',
    category: 'Quality Adjective'
  },
  {
    id: 9,
    question: 'Urutan kata sifat untuk rantai transmisi motor:',
    questionId: 'Adjective order for drive chain:',
    contextItem: 'Drive Chain',
    options: ['long gold steel chain', 'gold long steel chain', 'steel gold long chain', 'long steel gold chain'],
    correctAnswer: 'long gold steel chain',
    explanation: 'Long (ukuran panjang) ➔ gold (warna emas) ➔ steel (bahan baja).',
    category: 'Adjective Order'
  },
  {
    id: 10,
    question: 'Susun frasa lengkap: [aerodynamic] [red] [plastic] [fairing]:',
    questionId: 'Adjective order phrase:',
    contextItem: 'Front Fairing',
    options: ['an aerodynamic red plastic fairing', 'a red aerodynamic plastic fairing', 'a plastic red aerodynamic fairing', 'an aerodynamic plastic red fairing'],
    correctAnswer: 'an aerodynamic red plastic fairing',
    explanation: 'Kualitas (aerodynamic) ➔ Warna (red) ➔ Bahan (plastic) ➔ Kata Benda (fairing).',
    category: 'Adjective Order'
  }
];

// 10 Soal Detail Benda (Chapter 2) for TJKT (Simplified for Beginners)
const TJKT_CHAPTER2_QUIZ: Chapter2QuizItem[] = [
  {
    id: 1,
    question: 'Urutan kata sifat untuk kabel jaringan LAN (Ukuran ➔ Warna ➔ Bahan):',
    questionId: 'Adjective order for LAN cable:',
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
      instruction: 'Jawab 10 soal acak mengenai urutan kata sifat (Ukuran ➔ Warna ➔ Bahan) dan fitur benda akuntansi.',
      quizItems: AKL_CHAPTER2_QUIZ,
      explanation: 'Urutan kata sifat bahasa Inggris (Adjective Order): Ukuran (Size/Dimension) ➔ Warna (Color) ➔ Bahan (Material) ➔ Kata Benda (Noun)!',
      proactivePrompt: 'Remember the English adjective rule: Size comes first, then Color, then Material! What is the correct order?'
    },
    chapter3: {
      title: 'Bab 3: Kasus Petunjuk (5 Problem-Based Detective Cases)',
      npcId: 'satpam',
      cases: [
        {
          id: 1,
          title: 'Kasus 1: Sosok yang Membawa Dokumen Koperasi',
          caseDescriptionEn: 'CCTV footage captured three people near the koperasi corridor at 11:30 AM.',
          caseDescriptionId: 'Rekaman CCTV memperlihatkan tiga orang di lorong koperasi pada pukul 11.30 WIB.',
          witnessStatementEn: '"The person holding the folder was tall, wearing a dark navy blazer, and carrying a large emerald green pouch."',
          witnessStatementId: '"Orang yang membawa map itu berpostur tinggi, mengenakan blazer biru dongker tua, dan membawa pouch hijau zamrud besar."',
          question: 'Which person exactly matches the witness descriptive details?',
          suspects: [
            {
              id: 'c1_a',
              title: 'Sosok A: Siswa Berjaket Merah',
              description: 'Short student with a bright red jacket and small black backpack.',
              visualTag: 'Short • Red Jacket • Black Backpack',
              isCorrect: false,
              feedback: 'Salah: Saksi menyebutkan "tall" (tinggi) dan "dark navy blazer", bukan jaket merah pendek!'
            },
            {
              id: 'c1_b',
              title: 'Sosok B: Sosok Berblazer Dongker',
              description: 'Tall figure in a neat dark navy blazer carrying a large emerald green pouch.',
              visualTag: 'Tall • Dark Navy Blazer • Large Emerald Green Pouch',
              isCorrect: true,
              feedback: 'Tepat sekali! Semua ciri deskriptif (tall, navy blazer, large emerald green pouch) cocok 100%!'
            },
            {
              id: 'c1_c',
              title: 'Sosok C: Petugas Topi Kuning',
              description: 'Medium height person with a yellow hat and a brown cardboard carton.',
              visualTag: 'Medium Height • Yellow Hat • Brown Carton',
              isCorrect: false,
              feedback: 'Salah: Pakaian dan barang bawaan tidak sesuai dengan deskripsi saksi.'
            }
          ]
        },
        {
          id: 2,
          title: 'Kasus 2: Kuitansi Transaksi Terakhir',
          caseDescriptionEn: 'A crucial transaction slip was misplaced on the reception counter.',
          caseDescriptionId: 'Kuitansi transaksi penting tertinggal di atas meja kasir koperasi.',
          witnessStatementEn: '"The missing slip is a small rectangular yellow paper with a red official stamp in the upper corner."',
          witnessStatementId: '"Nota yang dicari adalah kertas kuning kecil berbentuk persegi panjang dengan cap stempel merah resmi di sudut atas."',
          question: 'Which receipt slip matches the description?',
          suspects: [
            {
              id: 'c2_a',
              title: 'Slip A: Kertas Struk Belanja Putih',
              description: 'Long white printed thermal paper with faded grey barcode.',
              visualTag: 'Long • White Paper • Grey Barcode',
              isCorrect: false,
              feedback: 'Salah: Nota ini putih dan panjang, bukan kuning persegi panjang dengan cap merah.'
            },
            {
              id: 'c2_b',
              title: 'Slip B: Nota Kuitansi Kuning',
              description: 'Small rectangular yellow paper marked with a crisp red official stamp.',
              visualTag: 'Small Rectangular • Yellow Paper • Red Stamp',
              isCorrect: true,
              feedback: 'Benar sekali! Kertas kuning kecil persegi panjang dengan cap merah resmi sesuai dengan deskripsi.'
            },
            {
              id: 'c2_c',
              title: 'Slip C: Brosur Lipat Biru',
              description: 'Square blue folded flyer with black text and no stamps.',
              visualTag: 'Square • Blue Paper • No Stamp',
              isCorrect: false,
              feedback: 'Salah: Ini adalah brosur lipat biru, bukan kuitansi resmi.'
            }
          ]
        },
        {
          id: 3,
          title: 'Kasus 3: Kalkulator Kasir Utama',
          caseDescriptionEn: 'The chief cashier misplaced her high-precision accounting calculator.',
          caseDescriptionId: 'Kasir kepala mencari kalkulator akuntansi presisi tinggi miliknya.',
          witnessStatementEn: '"It is a compact black electronic calculator with large grey rubber buttons and a 14-digit LCD display."',
          witnessStatementId: '"Kalkulator tersebut berukuran ringkas, berwarna hitam, dengan tombol karet abu-abu besar dan layar LCD 14 digit."',
          question: 'Which calculator is the cashier looking for?',
          suspects: [
            {
              id: 'c3_a',
              title: 'Kalkulator A: Mini Solar Pink',
              description: 'Tiny pink solar toy calculator with 8 digits and tiny hard plastic keys.',
              visualTag: 'Tiny • Pink Plastic • 8 Digits',
              isCorrect: false,
              feedback: 'Salah: Kalkulator kasir berwarna hitam dan memiliki tombol karet abu-abu besar.'
            },
            {
              id: 'c3_b',
              title: 'Kalkulator B: Kalkulator Digital Hitam',
              description: 'Compact black electronic calculator featuring large grey rubber buttons and a 14-digit LCD display.',
              visualTag: 'Compact • Black Body • Grey Rubber Buttons • 14 Digits',
              isCorrect: true,
              feedback: 'Tepat sekali! Warna hitam, tombol karet abu-abu besar, dan layar 14 digit sangat sesuai.'
            },
            {
              id: 'c3_c',
              title: 'Kalkulator C: Mesin Tik Jadul',
              description: 'Heavy ancient mechanical adding machine with rusty metal levers.',
              visualTag: 'Heavy • Mechanical • Rusty Levers',
              isCorrect: false,
              feedback: 'Salah: Ini mesin mekanik kuno, bukan kalkulator elektronik ringkas.'
            }
          ]
        },
        {
          id: 4,
          title: 'Kasus 4: Kunci Brankas Penyimpan Berkas',
          caseDescriptionEn: 'The master key of the document safe must be retrieved from the key cabinet.',
          caseDescriptionId: 'Kunci utama brankas arsip harus diambil dari lemari kunci.',
          witnessStatementEn: '"The safe key is a small shiny brass key with an ornate circular ring and an engraved number 7."',
          witnessStatementId: '"Kunci brankas tersebut adalah kunci kuningan kecil mengilap dengan cincin gantungan bundar berukir angka 7."',
          question: 'Which key is the authentic safe key?',
          suspects: [
            {
              id: 'c4_a',
              title: 'Kunci A: Kunci Gembok Besi Besar',
              description: 'Huge rusted black iron padlock key with a square head.',
              visualTag: 'Huge • Black Iron • Square Head',
              isCorrect: false,
              feedback: 'Salah: Kunci ini besi hitam besar, bukan kuningan mengilap.'
            },
            {
              id: 'c4_b',
              title: 'Kunci B: Kunci Kuningan Berukir',
              description: 'Small shiny brass key with an ornate circular ring and engraved number 7.',
              visualTag: 'Small • Shiny Brass • Circular Ring • Number 7',
              isCorrect: true,
              feedback: 'Tepat! Bahan kuningan (brass), cincin bundar, dan ukiran angka 7 cocok sempurna.'
            },
            {
              id: 'c4_c',
              title: 'Kunci C: Kartu Magnetik Putih',
              description: 'Flat white plastic RFID card without any metal parts.',
              visualTag: 'Plastic Card • White • No Metal',
              isCorrect: false,
              feedback: 'Salah: Saksi mendeskripsikan kunci logam kuningan, bukan kartu plastik.'
            }
          ]
        },
        {
          id: 5,
          title: 'Kasus 5: Tas Penyimpan Buku Besar',
          caseDescriptionEn: 'A container used to transport the ledger safely during the audit transfer.',
          caseDescriptionId: 'Wadah yang digunakan untuk membawa buku besar saat proses audit.',
          witnessStatementEn: '"It is a sturdy brown leather briefcase with twin silver metal buckles and a reinforced padded handle."',
          witnessStatementId: '"Tas tersebut adalah koper jinjing kulit cokelat yang kokoh dengan dua gesper logam perak dan pegangan empuk."',
          question: 'Which bag is the correct document case?',
          suspects: [
            {
              id: 'c5_a',
              title: 'Tas A: Koper Jinjing Kulit Cokelat',
              description: 'Sturdy brown leather briefcase equipped with twin silver metal buckles and a reinforced padded handle.',
              visualTag: 'Sturdy • Brown Leather • Twin Silver Buckles • Padded Handle',
              isCorrect: true,
              feedback: 'Hebat! Semua rincian (sturdy, brown leather, twin silver buckles) berhasil dipecahkan!'
            },
            {
              id: 'c5_b',
              title: 'Tas B: Kantong Plastik Biru Tipis',
              description: 'Thin transparent blue plastic grocery bag with ripped handles.',
              visualTag: 'Thin • Blue Plastic • Ripped',
              isCorrect: false,
              feedback: 'Salah: Ini kantong kresek tipis, tidak cocok untuk dokumen berharga.'
            },
            {
              id: 'c5_c',
              title: 'Tas C: Ransel Olahraga Abu-abu',
              description: 'Worn grey canvas sports backpack with muddy straps.',
              visualTag: 'Grey Canvas • Sports Backpack',
              isCorrect: false,
              feedback: 'Salah: Tas ransel olahraga kanvas bukan koper kulit cokelat yang dicari.'
            }
          ]
        }
      ],
      proactivePrompt: 'Carefully compare the descriptive clues in the witness statement: size, color, material, and features!'
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
      instruction: 'Jawab 10 soal acak mengenai urutan kata sifat perkakas otomotif (Ukuran/Berat ➔ Warna ➔ Bahan).',
      quizItems: OTOMOTIF_CHAPTER2_QUIZ,
      explanation: 'Urutan kata sifat: Ukuran/Karakteristik Fisik (Size/Weight) ➔ Warna (Color) ➔ Bahan (Material) ➔ Kata Benda (Noun)!',
      proactivePrompt: 'Which one comes first: Weight/Size, Color, or Material? Try selecting the correct word for each slot!'
    },
    chapter3: {
      title: 'Bab 3: Kasus Petunjuk (5 Problem-Based Detective Cases)',
      npcId: 'pakbimo',
      cases: [
        {
          id: 1,
          title: 'Kasus 1: Motor Prototipe di Lorong Belakang',
          caseDescriptionEn: 'The prototype motorcycle left tire tracks and a technical note near Bay 4 of the workshop.',
          caseDescriptionId: 'Motor prototipe meninggalkan jejak ban dan catatan teknis di dekat Bay 4 bengkel.',
          witnessStatementEn: '"The target motorcycle has dual aerodynamic rear mirrors, wide grooved racing tires, and a matte black fuel tank."',
          witnessStatementId: '"Motor target memiliki spion ganda aerodinamis, ban balap beralur lebar, dan tangki bensin hitam doff."',
          question: 'Which vehicle parked in the back alley matches the description?',
          suspects: [
            {
              id: 'oc1_a',
              title: 'Motor A: Motor Klasik Bebek',
              description: 'Old commuter bike with single round mirror and narrow street tires.',
              visualTag: 'Single Round Mirror • Narrow Tires • Chrome Tank',
              isCorrect: false,
              feedback: 'Salah: Motor ini memiliki satu spion bulat dan ban sempit, tidak cocok dengan deskripsi.'
            },
            {
              id: 'oc1_b',
              title: 'Motor B: Prototipe Muhiba Racing',
              description: 'Sport prototype with dual aerodynamic mirrors, wide racing tires, and a matte black tank.',
              visualTag: 'Dual Aero Mirrors • Wide Racing Tires • Matte Black Tank',
              isCorrect: true,
              feedback: 'Tepat sekali! Dua spion aerodinamis, ban balap lebar, dan tangki hitam doff cocok 100%!'
            },
            {
              id: 'oc1_c',
              title: 'Motor C: Skuter Matic Hijau',
              description: 'Cute light green automatic scooter with chrome basket.',
              visualTag: 'Green Scooter • Front Basket • Small Wheels',
              isCorrect: false,
              feedback: 'Salah: Skuter matic berkeranjang bukan motor prototipe balap.'
            }
          ]
        },
        {
          id: 2,
          title: 'Kasus 2: Kunci Momen Spesial (Torque Wrench)',
          caseDescriptionEn: 'The mechanic needs the exact torque wrench to calibrate cylinder head bolts.',
          caseDescriptionId: 'Mekanik memerlukan kunci momen khusus untuk mengencangkan baut kepala silinder.',
          witnessStatementEn: '"Look for a long silver steel torque wrench equipped with a calibrated digital dial and knurled grip."',
          witnessStatementId: '"Cari kunci momen baja perak yang panjang dengan jarum dial digital terkalibrasi dan pegangan bergerigi."',
          question: 'Which tool on the workbench is the torque wrench?',
          suspects: [
            {
              id: 'oc2_a',
              title: 'Alat A: Kunci Pas Terbuka Berkarat',
              description: 'Short rusted open-ended iron spanner with cracked handle.',
              visualTag: 'Short • Rusted Iron • Open End',
              isCorrect: false,
              feedback: 'Salah: Alat ini berkarat dan pendek, bukan kunci momen baja perak digital.'
            },
            {
              id: 'oc2_b',
              title: 'Alat B: Kunci Momen Baja Digital',
              description: 'Long silver steel torque wrench equipped with a calibrated digital dial and knurled grip.',
              visualTag: 'Long • Silver Steel • Digital Dial • Knurled Grip',
              isCorrect: true,
              feedback: 'Benar sekali! Kunci momen baja perak panjang dengan dial digital terkalibrasi.'
            },
            {
              id: 'oc2_c',
              title: 'Alat C: Obeng Plastik Kuning',
              description: 'Medium yellow plastic screwdriver with flat tip.',
              visualTag: 'Yellow Plastic • Flat Tip Screwdriver',
              isCorrect: false,
              feedback: 'Salah: Ini adalah obeng plastik biasa.'
            }
          ]
        },
        {
          id: 3,
          title: 'Kasus 3: Ban Uji Emisi & Kecepatan',
          caseDescriptionEn: 'A specific tire compound was prepared for the emission dyno test.',
          caseDescriptionId: 'Satu set ban khusus disiapkan untuk pengujian dyno emisi.',
          witnessStatementEn: '"The designated tire is a wide black synthetic rubber tire with three yellow racing stripes along the rim."',
          witnessStatementId: '"Ban yang ditunjuk adalah ban karet sintetis hitam lebar dengan tiga garis balap kuning di sepanjang pelek."',
          question: 'Which tire on the rack is the designated test tire?',
          suspects: [
            {
              id: 'oc3_a',
              title: 'Ban A: Ban Balap Bergaris Kuning',
              description: 'Wide black synthetic rubber tire decorated with three yellow racing stripes along the rim.',
              visualTag: 'Wide • Black Rubber • Three Yellow Racing Stripes',
              isCorrect: true,
              feedback: 'Tepat! Lebar, hitam, dan memiliki tiga garis kuning sesuai dengan deskripsi saksi.'
            },
            {
              id: 'oc3_b',
              title: 'Ban B: Ban Trail Berlumpur',
              description: 'Chunky brown off-road knobby tire caked with dry mud.',
              visualTag: 'Chunky • Knobby Mud Tire',
              isCorrect: false,
              feedback: 'Salah: Ini ban trail tanah berlumpur, bukan ban dyno bergaris kuning.'
            },
            {
              id: 'oc3_c',
              title: 'Ban C: Ban Sepeda Tipis',
              description: 'Extremely narrow black bicycle tire with thin wire spokes.',
              visualTag: 'Narrow • Bicycle Tire',
              isCorrect: false,
              feedback: 'Salah: Ini adalah ban sepeda tipis.'
            }
          ]
        },
        {
          id: 4,
          title: 'Kasus 4: Busi Pengapian Balap (Spark Plug)',
          caseDescriptionEn: 'The high-performance ignition spark plug is needed to start the test bike.',
          caseDescriptionId: 'Busi pengapian performa tinggi diperlukan untuk menyalakan motor uji coba.',
          witnessStatementEn: '"The mechanic chose a brand-new white ceramic spark plug with an iridescent copper tip and gold threading."',
          witnessStatementId: '"Mekanik memilih busi keramik putih baru dengan ujung tembaga berkilau dan ulir berwarna emas."',
          question: 'Which spark plug is the high-performance ignition unit?',
          suspects: [
            {
              id: 'oc4_a',
              title: 'Busi A: Busi Bekas Berjelaga',
              description: 'Old black fouled spark plug covered with carbon residue.',
              visualTag: 'Old • Black Fouled • Carbon Residue',
              isCorrect: false,
              feedback: 'Salah: Busi ini kotor berjelaga karbon, bukan busi baru keramik putih.'
            },
            {
              id: 'oc4_b',
              title: 'Busi B: Busi Keramik Putih Baru',
              description: 'Brand-new white ceramic spark plug with an iridescent copper tip and gold threading.',
              visualTag: 'Brand-new • White Ceramic • Copper Tip • Gold Threading',
              isCorrect: true,
              feedback: 'Tepat sekali! Keramik putih, ujung tembaga, dan ulir emas cocok dengan deskripsi.'
            },
            {
              id: 'oc4_c',
              title: 'Busi C: Sekring Lampu Putus',
              description: 'Small glass electrical fuse with broken filament.',
              visualTag: 'Glass Fuse • Broken Filament',
              isCorrect: false,
              feedback: 'Salah: Ini adalah sekring kaca, bukan busi motor.'
            }
          ]
        },
        {
          id: 5,
          title: 'Kasus 5: Knalpot Khusus (Custom Exhaust System)',
          caseDescriptionEn: 'The custom exhaust system was mounted on the dyno testing stand.',
          caseDescriptionId: 'Sistem knalpot kustom dipasang pada dudukan dyno test bengkel.',
          witnessStatementEn: '"It is a curved silver stainless steel exhaust pipe with a blue anodized titanium heat guard."',
          witnessStatementId: '"Knalpot tersebut berupa pipa lengkung baja tahan karat perak dengan pelindung panas titanium biru teranodisasi."',
          question: 'Which exhaust pipe matches the engineering description?',
          suspects: [
            {
              id: 'oc5_a',
              title: 'Knalpot A: Pipa Knalpot Kustom Stainless',
              description: 'Curved silver stainless steel exhaust pipe with a blue anodized titanium heat guard.',
              visualTag: 'Curved • Silver Stainless • Blue Titanium Heat Guard',
              isCorrect: true,
              feedback: 'Luar biasa! Semua ciri teknis (curved, stainless steel, blue titanium guard) cocok sempurna!'
            },
            {
              id: 'oc5_b',
              title: 'Knalpot B: Pipa Besi Cor Hitam Berkarat',
              description: 'Straight heavy black cast iron pipe without any heat guard.',
              visualTag: 'Straight • Heavy Cast Iron • No Guard',
              isCorrect: false,
              feedback: 'Salah: Pipa besi cor hitam lurus tanpa pelindung panas.'
            },
            {
              id: 'oc5_c',
              title: 'Knalpot C: Selang Air Fleksibel',
              description: 'Flexible green plastic garden hose with brass nozzle.',
              visualTag: 'Green Plastic • Garden Hose',
              isCorrect: false,
              feedback: 'Salah: Ini selang air taman, bukan knalpot motor.'
            }
          ]
        }
      ],
      proactivePrompt: 'Observe the adjectives carefully: dual aerodynamic mirrors, racing tires, and matte finish!'
    },
    chapter4: {
      title: 'Bab 4: Susun Paragraf Deskriptif',
      npcId: 'rio',
      topic: 'The Muhiba Racing Prototype',
      sentences: [
        { id: 's1', section: 'Identification', order: 1, text: 'The Muhiba Racing Prototype is a customized lightweight motorcycle built by automotive students.' },
        { id: 's2', section: 'Description', order: 2, text: 'It features a metallic orange aerodynamic fairing with matte black accents.' },
        { id: 's3', section: 'Description', order: 3, text: 'Under the chassis, it is powered by an efficient 150cc four-stroke engine with high torque output.' },
        { id: 's4', section: 'Description', order: 4, text: 'This prototype motorcycle demonstrates exceptional fuel efficiency, stability, and speed.' }
      ],
      hint: 'Mulai dengan kalimat pengenalan nama dan status motor (Identification), diikuti tampilan bodi, mesin, dan performanya (Description).',
      explanation: 'Susunan paragraf deskriptif dimulai dari pengenalan subjek secara umum (Identification), kemudian memaparkan detail ciri fisik dan karakteristik (Description).'
    },
    chapter5: {
      title: 'Bab 5: Proyek Akhir Mandiri (Project-Based Writing)',
      npcId: 'pakbimo',
      promptTopic: 'Tuliskan 5 kalimat deskriptif dalam bahasa Inggris mengenai salah satu alat, mesin, atau kendaraan di bengkel otomotif (contoh: sepeda motor, kunci momen, dongkrak hidrolik, atau kompresor angin).',
      guidingQuestions: [
        'What is the name of the vehicle or machine? (Identification)',
        'What is its size and shape? (e.g. heavy, aerodynamic, compact, curved)',
        'What color and material is it made of? (e.g. metallic silver, steel, durable rubber)',
        'What special parts does it have? (e.g. it has two mirrors, sharp gears, strong wheels)',
        'Why is it useful for automotive mechanics? (e.g. powerful, efficient, indispensable)'
      ],
      exampleVocab: ['aerodynamic', 'powerful', 'metallic', 'durable', 'efficient', 'heavy', 'sturdy', 'stainless'],
      plotTwistTitle: 'Plot Twist Terungkap: The Surprise Final Exam!',
      plotTwistTextEn: 'The prototype motorcycle was never lost! Pak Bimo intentionally hidden it in Dyno Bay 4 as a surprise practical examination. The descriptive clues you deciphered were technical notes written by senior students. By analyzing every adjective and physical attribute, you passed the final test with flying colors! Pak Bimo smiled proudly at your sharp observation.',
      plotTwistTextId: 'Sepeda motor prototipe ternyata tidak pernah hilang! Pak Bimo sengaja memindahkannya ke Ruang Dyno Bay 4 sebagai ujian praktik observasi kejutan. Petunjuk deskriptif yang kamu baca selama ini adalah catatan teknis karya kakak kelasmu. Berkat ketelitianmu menganalisis kata sifat dan spesifikasi fisik, kamu lulus ujian akhir dengan gemilang!',
      plotTwistMoral: 'Lesson Learned: Precision in descriptive observation is the hallmark of a master mechanic.'
    }
  },

  tjkt: {
    id: 'tjkt',
    title: 'TEKNIK JARINGAN & KOMPUTER (TJKT)',
    subtitle: 'The Blinking Router (Router yang Berkedip)',
    description: 'Koneksi internet sekolah tiba-tiba putus sebelum ujian online! Bantu Bu Nisa dan Robot Pixel memecahkan misteri perangkat jaringan.',
    icon: '💻',
    themeColor: '#7209B7',
    initialNpcId: 'bunisa',
    vocabList: [
      { word: 'router', partOfSpeech: 'Noun', meaning: 'perangkat pembagi jaringan Wi-Fi', example: 'The black router has three antennas.', category: 'Object' },
      { word: 'blinking', partOfSpeech: 'Adjective', meaning: 'berkedip-kedip', example: 'The green LED indicator is blinking rapidly.', category: 'Quality' },
      { word: 'fiber', partOfSpeech: 'Noun', meaning: 'serat optik (kabel kaca)', example: 'The yellow fiber cable connects to the server.', category: 'Material' },
      { word: 'fast', partOfSpeech: 'Adjective', meaning: 'cepat', example: 'Our school enjoys a very fast internet connection.', category: 'Quality' },
      { word: 'metallic', partOfSpeech: 'Adjective', meaning: 'berbahan logam', example: 'The server rack has a sturdy metallic frame.', category: 'Material' },
      { word: 'compact', partOfSpeech: 'Adjective', meaning: 'ringkas / hemat tempat', example: 'This switch hub has a compact modern design.', category: 'Size' }
    ],
    chapter1: {
      title: 'Bab 1: Warm-up Chat (Obrolan Pemanasan Pemula)',
      npcId: 'bunisa',
      instruction: 'Susun kartu kata berikut menjadi kalimat deskripsi pemula: "This is a [benda]. It is [sifat]."',
      contextId: 'Bu Nisa ingin kamu mengenali router Wi-Fi lab sebelum memeriksa jaringan.',
      targetSentence: 'This is a router. It is fast.',
      jumbledWords: ['a', 'fast.', 'is', 'This', 'It', 'router.', 'is'],
      explanation: 'Rumus kalimat deskripsi dasar untuk pemula: Identification ("This is a router") + Description ("It is fast").',
      explanationId: 'Pola kalimat dasar: kenalkan bendanya (Identification), lalu sebutkan sifat utamanya (Description).',
      proactivePrompt: 'Look at the Wi-Fi unit on the table! Is it slow or fast? Arrange the word cards to describe it!',
      proactiveHintWords: ['This', 'is', 'a', 'router.', 'It', 'is', 'fast.']
    },
    chapter2: {
      title: 'Bab 2: Detail Benda (10 Latihan Adjective Order Pemula)',
      npcId: 'pixel',
      instruction: 'Jawab 10 soal acak yang mudah dan sederhana mengenai urutan kata sifat perangkat jaringan komputer.',
      quizItems: TJKT_CHAPTER2_QUIZ,
      explanation: 'Aturan sederhana urutan kata sifat: Ukuran (Size) ➔ Warna (Color) ➔ Bahan (Material) ➔ Nama Benda (Noun)!',
      proactivePrompt: 'Size comes first, then Color, then Material! What is the correct word order for network cables?'
    },
    chapter3: {
      title: 'Bab 3: Kasus Petunjuk (5 Problem-Based Detective Cases)',
      npcId: 'bunisa',
      cases: [
        {
          id: 1,
          title: 'Kasus 1: Router Wi-Fi Utama yang Berkedip',
          caseDescriptionEn: 'Bu Nisa noticed a strange Wi-Fi device placed on top of Rack 3.',
          caseDescriptionId: 'Bu Nisa melihat perangkat Wi-Fi tak dikenal diletakkan di atas Rak 3.',
          witnessStatementEn: '"The target router is a small black plastic router with three green antennas and a blinking blue LED indicator."',
          witnessStatementId: '"Router sasaran adalah router plastik hitam kecil dengan tiga antena hijau dan lampu indikator LED biru berkedip."',
          question: 'Which router matches the exact description?',
          suspects: [
            {
              id: 'tc1_a',
              title: 'Router A: Router Putih Tanpa Antena',
              description: 'Large white metal modem box with no antennas and a solid red light.',
              visualTag: 'Large • White Metal • No Antennas • Red Light',
              isCorrect: false,
              feedback: 'Salah: Router ini berwarna putih tanpa antena dan lampu merah menyala tetap.'
            },
            {
              id: 'tc1_b',
              title: 'Router B: Router Hitam Tiga Antena Hijau',
              description: 'Small black plastic router with three green antennas and a blinking blue LED indicator.',
              visualTag: 'Small Black Plastic • Three Green Antennas • Blinking Blue LED',
              isCorrect: true,
              feedback: 'Tepat sekali! Warna hitam, tiga antena hijau, dan lampu LED biru berkedip sesuai 100%!'
            },
            {
              id: 'tc1_c',
              title: 'Router C: Kotak Kayu Jadul',
              description: 'Old wooden radio with speaker holes.',
              visualTag: 'Old Wood • Antique Radio',
              isCorrect: false,
              feedback: 'Salah: Ini adalah radio kayu antik, bukan perangkat router Wi-Fi.'
            }
          ]
        },
        {
          id: 2,
          title: 'Kasus 2: Kabel Jaringan LAN Laboratorium',
          caseDescriptionEn: 'The lab technician needs the primary backbone network cable for the server.',
          caseDescriptionId: 'Teknisi lab memerlukan kabel jaringan utama untuk menghubungkan server.',
          witnessStatementEn: '"It is a long blue copper UTP cable with transparent plastic RJ-45 modular connectors on both ends."',
          witnessStatementId: '"Kabel tersebut adalah kabel UTP tembaga biru panjang dengan konektor plastik transparan RJ-45 di kedua ujungnya."',
          question: 'Which cable in the tool box is the primary LAN cable?',
          suspects: [
            {
              id: 'tc2_a',
              title: 'Kabel A: Kabel LAN Biru Tembaga',
              description: 'Long blue copper UTP cable with transparent plastic RJ-45 modular connectors on both ends.',
              visualTag: 'Long • Blue Copper • Transparent RJ-45 Connectors',
              isCorrect: true,
              feedback: 'Benar sekali! Kabel UTP tembaga biru panjang dengan konektor RJ-45 transparan cocok sempurna.'
            },
            {
              id: 'tc2_b',
              title: 'Kabel B: Kabel Listrik Kuning Pendek',
              description: 'Short thick yellow electrical cord with three-prong wall plug.',
              visualTag: 'Short • Yellow Electrical Cord',
              isCorrect: false,
              feedback: 'Salah: Ini adalah kabel listrik kabel colokan, bukan kabel LAN.'
            },
            {
              id: 'tc2_c',
              title: 'Kabel C: Kabel Headset Hitam Tipis',
              description: 'Thin black audio headphone wire with 3.5mm jack.',
              visualTag: 'Thin Black • Audio Jack',
              isCorrect: false,
              feedback: 'Salah: Ini kabel audio headset tipis, bukan kabel jaringan data.'
            }
          ]
        },
        {
          id: 3,
          title: 'Kasus 3: Switch Hub Server Lab Komputer',
          caseDescriptionEn: 'A high-speed distributor switch hub must be plugged into the main rack.',
          caseDescriptionId: 'Switch hub pembagi data berkecepatan tinggi harus dipasang ke rak utama.',
          witnessStatementEn: '"The technician is seeking a wide grey metallic switch hub with 24 glowing green gigabit ethernet ports."',
          witnessStatementId: '"Teknisi mencari switch hub logam abu-abu lebar dengan 24 port ethernet gigabit hijau menyala."',
          question: 'Which device is the 24-port switch hub?',
          suspects: [
            {
              id: 'tc3_a',
              title: 'Perangkat A: USB Hub Mini 4 Port',
              description: 'Tiny white plastic 4-port USB hub for laptops.',
              visualTag: 'Tiny White • 4-Port USB',
              isCorrect: false,
              feedback: 'Salah: Ini adalah USB hub mini plastik, bukan switch hub rackmount 24 port.'
            },
            {
              id: 'tc3_b',
              title: 'Perangkat B: Switch Hub Logam 24 Port',
              description: 'Wide grey metallic switch hub with 24 glowing green gigabit ethernet ports.',
              visualTag: 'Wide • Grey Metallic • 24 Glowing Green Ports',
              isCorrect: true,
              feedback: 'Tepat! Logam abu-abu lebar dengan 24 port ethernet hijau menyala sesuai 100%!'
            },
            {
              id: 'tc3_c',
              title: 'Perangkat C: Kotak Harddisk Eksternal',
              description: 'Small rectangular black portable hard drive with one cable.',
              visualTag: 'Black Portable HDD',
              isCorrect: false,
              feedback: 'Salah: Ini adalah harddisk eksternal portabel.'
            }
          ]
        },
        {
          id: 4,
          title: 'Kasus 4: Tang Crimping Tool Teknisi Jaringan',
          caseDescriptionEn: 'A student needs the crimping tool to terminate network cable ends.',
          caseDescriptionId: 'Siswa memerlukan tang crimping untuk memasang konektor ujung kabel jaringan.',
          witnessStatementEn: '"Find a sturdy blue-and-black steel crimping tool with a sharp cutting blade and rubberized non-slip handles."',
          witnessStatementId: '"Temukan tang crimping baja biru-hitam yang kokoh dengan bilah pemotong tajam dan pegangan karet antiselip."',
          question: 'Which tool on the shelf is the crimping tool?',
          suspects: [
            {
              id: 'tc4_a',
              title: 'Alat A: Tang Crimping Baja Biru-Hitam',
              description: 'Sturdy blue-and-black steel crimping tool with sharp cutting blade and rubberized non-slip handles.',
              visualTag: 'Sturdy • Blue-and-Black Steel • Sharp Blade • Non-slip Grip',
              isCorrect: true,
              feedback: 'Tepat sekali! Tang baja biru-hitam dengan pemotong tajam dan pegangan karet cocok sempurna.'
            },
            {
              id: 'tc4_b',
              title: 'Alat B: Gunting Jahit Berkarat',
              description: 'Old rusty fabric sewing scissors with silver loops.',
              visualTag: 'Rusty Sewing Scissors',
              isCorrect: false,
              feedback: 'Salah: Ini gunting kain tua, bukan alat crimping kabel jaringan.'
            },
            {
              id: 'tc4_c',
              title: 'Alat C: Tempat Lakban Plastik',
              description: 'Red plastic tape dispenser with serrated teeth.',
              visualTag: 'Plastic Tape Dispenser',
              isCorrect: false,
              feedback: 'Salah: Ini adalah alat pemotong isolasi/lakban.'
            }
          ]
        },
        {
          id: 5,
          title: 'Kasus 5: Flashdisk Berisi Konfigurasi Jaringan',
          caseDescriptionEn: 'The automated configuration backup is stored inside an emergency flash drive.',
          caseDescriptionId: 'Cadangan konfigurasi otomatis tersimpan dalam flashdisk darurat.',
          witnessStatementEn: '"The flash drive is a tiny silver metallic USB drive attached to a bright red woven Muhiba lanyard."',
          witnessStatementId: '"Flashdisk tersebut adalah USB logam perak mungil yang terpasang pada tali lanyard tenun Muhiba merah cerah."',
          question: 'Which flash drive is the configuration backup drive?',
          suspects: [
            {
              id: 'tc5_a',
              title: 'Drive A: Flashdisk Logam Perak Tali Merah',
              description: 'Tiny silver metallic USB drive attached to a bright red woven Muhiba lanyard.',
              visualTag: 'Tiny Silver Metallic • Red Woven Muhiba Lanyard',
              isCorrect: true,
              feedback: 'Luar biasa! Flashdisk logam perak mungil dengan lanyard merah Muhiba berhasil ditemukan!'
            },
            {
              id: 'tc5_b',
              title: 'Drive B: Disket Hitam Jadul',
              description: 'Square black magnetic 3.5-inch floppy disk from 1995.',
              visualTag: 'Black Floppy Disk',
              isCorrect: false,
              feedback: 'Salah: Ini disket magnetik kuno, bukan USB flash drive.'
            },
            {
              id: 'tc5_c',
              title: 'Drive C: Gantungan Kunci Kayu Bulat',
              description: 'Circular brown wooden souvenir keychain without any memory chip.',
              visualTag: 'Wooden Souvenir Keychain',
              isCorrect: false,
              feedback: 'Salah: Ini hanya gantungan kunci kayu suvenir.'
            }
          ]
        }
      ],
      proactivePrompt: 'Notice the simple adjectives: black plastic casing, green antennas, and blinking lights!'
    },
    chapter4: {
      title: 'Bab 4: Susun Paragraf Deskriptif Pemula',
      npcId: 'bunisa',
      topic: 'The School Core Network Router',
      sentences: [
        { id: 's1', section: 'Identification', order: 1, text: 'The core network router is a vital communication device in the TJKT computer laboratory.' },
        { id: 's2', section: 'Description', order: 2, text: 'It has a compact black plastic body with three flexible green antennas.' },
        { id: 's3', section: 'Description', order: 3, text: 'On the front panel, bright green and blue LED lights blink rapidly during data transfer.' },
        { id: 's4', section: 'Description', order: 4, text: 'This router provides fast and stable internet access for all teachers and students.' }
      ],
      hint: 'Mulai dengan kalimat nama alat (Identification), lalu fisik dan antena (Description 1), lampu LED (Description 2), dan fungsinya (Description 3).',
      explanation: 'Paragraf deskriptif dimulai dari pengenalan alat (Identification), kemudian diikuti kalimat-kalimat yang merinci fitur fisik dan fungsinya (Description).'
    },
    chapter5: {
      title: 'Bab 5: Proyek Akhir Mandiri (Project-Based Writing)',
      npcId: 'bunisa',
      promptTopic: 'Tuliskan 5 kalimat deskriptif dalam bahasa Inggris mengenai salah satu perangkat di lab komputer TJKT (contoh: router Wi-Fi, kabel LAN, komputer server, monitor, atau switch hub).',
      guidingQuestions: [
        'What is the name of the device? (Identification)',
        'What is its size and shape? (e.g. small, compact, rectangular, wide)',
        'What color and material is it made of? (e.g. black plastic, blue copper, metallic grey)',
        'What special features does it have? (e.g. it has blinking lights, three antennas)',
        'Why is it useful for network students? (e.g. fast, reliable, indispensable)'
      ],
      exampleVocab: ['compact', 'blinking', 'fast', 'reliable', 'metallic', 'digital', 'sturdy', 'clean'],
      plotTwistTitle: 'Plot Twist Terungkap: The Helpful AI Assistant!',
      plotTwistTextEn: 'The internet connection was never broken! Pixel, our school AI lab assistant robot, had briefly rerouted all network traffic into an isolated high-speed firewall channel to protect the school server from an external spam surge. Pixel was testing our new first-year students to see if they could identify network components through English descriptions. Pixel cheered: "BEEP! You passed the descriptive challenge brilliantly!"',
      plotTwistTextId: 'Koneksi internet sekolah ternyata tidak pernah rusak! Pixel, robot asisten AI lab sekolah, sengaja mengalihkan lalu lintas jaringan ke saluran firewall berkecepatan tinggi demi melindungi server sekolah dari banjir spam luar. Pixel ingin menguji apakah siswa baru kelas X mampu mengidentifikasi komponen jaringan dengan bahasa Inggris yang akurat. Pixel bersorak riang: "BEEP! Kamu berhasil menyelesaikan tantangan deskripsi dengan gemilang!"',
      plotTwistMoral: 'Lesson Learned: Clear technical descriptions turn complex digital mysteries into solvable puzzles.'
    }
  }
};
