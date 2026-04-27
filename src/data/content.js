// ===========================
// CENTRALIZED CONTENT DATA
// ===========================

export const siteConfig = {
  name: 'TanyaAdvokat',
  tagline: 'Konsultasi Hukum Online',
  company: 'PT Swara Naraya Indonesia',
  whatsappLink: 'https://wa.me/6281368936945',
  email: 'info@tanyaadvokat.id',
  phone: '+62 813 6893 6945',
  address: 'Bogor - Indonesia',
  socials: {
    instagram: 'https://instagram.com/tanyaadvokat.id',
    tiktok: 'https://tiktok.com/@tanyaadvokat',
    facebook: 'https://facebook.com/tanyaadvokat',
  },
};

export const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Biaya Layanan', path: '/biaya-layanan' },
  { label: 'Profile Advokat', path: '/profile-advokat' },
  { label: 'Tips Advokat', path: '/blog' },
  { label: 'Dokumentasi', path: '/dokumentasi' },
  { label: 'Bantuan Hukum', path: '/umkm-go' },
  { label: 'Peraturan Hukum', path: '/peraturan-hukum' },
];


export const heroStats = [
  { value: '1000+', label: 'Klien Terlayani' },
  { value: '50+', label: 'Advokat Mitra' },
  { value: '15+', label: 'Tahun Pengalaman' },
];

import team1 from '../assets/team_1_agung.jpg';
import team2 from '../assets/team_2_nico_thomas.jpg';
import team3 from '../assets/team_3_rizky_dwi_utami.png';
import team4 from '../assets/iswahyudi.png';

import article1 from '../assets/article_1_perceraian.png';
import article2 from '../assets/article_2_waris.png';
import article3 from '../assets/article_3_bisnis.png';
import article4 from '../assets/article_4_pertanahan.png';
import article5 from '../assets/article_5_phk.png';
import article6 from '../assets/article_6_umkm.png';


export const teamMembers = [
  {
    name: 'Agung Pratama, S.H.',
    role: 'Advokat & Konsultan Hukum',
    image: team1,
    objectPosition: 'center top',
    socials: {
      linkedin: 'https://www.linkedin.com/in/agungpratama403/',
      whatsapp: 'https://wa.me/6281368936945',
    },
    location: 'Jakarta',
    organization: 'Peradi',
    experience: '> 7 Tahun',
    expertise: [
      'Hutang Piutang & Penipuan',
      'Ketenagakerjaan & Perceraian',
      'Hukum ITE & Laporan Polisi',
      'Sengketa Pertanahan',
      'Pembuatan Draft Perjanjian'
    ],
    about: 'Agung Pratama telah membantu ratusan klien dengan pendekatan yang solutif, tegas, dan mengedepankan kepentingan terbaik dari klien.'
  },
  {
    name: 'Nico Thomas, S.H., M.H.',
    role: 'Advokat & Konsultan Hukum',
    image: team2,
    objectPosition: 'center 100%',
    socials: {
      linkedin: 'https://www.linkedin.com/in/nico-thomas-253095114/',
      whatsapp: 'https://wa.me/6281368936945',
    },
    location: 'Palembang & Lampung',
    organization: 'Peradi',
    experience: '> 8 Tahun',
    expertise: [
      'Praktisi Litigasi & Non-Litigasi',
      'Hukum Perdata & Pidana',
      'Ketenagakerjaan (PHI) & Waris',
      'Perceraian & Pertanahan',
      'Pendirian Badan Hukum (PT/CV)'
    ],
    about: 'Nico Thomas, S.H., M.H. menghadirkan analisis tajam secara transparan. Setiap langkah hukum dibimbing agar klien membuat keputusan tepat.'
  },
  {
    name: 'Rizky Dwi Utami, S.H., M.H., C.Med.',
    role: 'Dosen & Konsultan Hukum',
    image: team3,
    objectPosition: 'center 0%',
    socials: {
      linkedin: 'https://www.linkedin.com/in/rizky-dwi-utami-s-h-m-h-728445117/',
      whatsapp: 'https://wa.me/6281368936945',
    },
    location: 'Bogor',
    organization: 'Peradi',
    experience: '> 3 Tahun',
    expertise: [
      'Pembuatan Naskah Akademik',
      'Legal Opinion & Drafting',
      'Jurnal & Publikasi Hukum',
      'Pembuatan Kontrak Kerja',
      'Peraturan Perusahaan'
    ],
    about: 'Rizky Dwi Utami, S.H., M.H., C.Med. berfokus menyederhanakan masalah hukum yang kompleks menjadi solusi preventif demi perlindungan arah bisnis Anda.'
  },
  {
    name: 'ISWAHYUDI RZ, S.Sy., M.H.',
    role: 'Advokat & Konsultan Hukum',
    image: team4,
    objectPosition: 'center top',
    socials: {
      linkedin: '#',
      whatsapp: 'https://wa.me/6281368936945',
    },
    location: 'Bekasi & Jakarta',
    organization: 'Peradi',
    experience: '> 8 Tahun',
    expertise: [
      'Hukum Pertanahan (Agraria)',
      'Waris (Islam/Faraid/Perdata)',
      'Ekonomi Syariah & Keluarga',
      'Korporasi & Pendirian PT',
      'Sengketa Pidana & Perdata'
    ],
    about: 'Iswahyudi memiliki pemahaman luas untuk menyelesaikan perkara baik di pengadilan (litigasi) maupun sebagai penasihat ahli bagi korporasi.'
  }
];


export const services = [
  {
    icon: 'heart-crack',
    title: 'Perceraian',
    description: 'Pendampingan hukum untuk proses perceraian, hak asuh anak, dan pembagian harta gono-gini.',
  },
  {
    icon: 'scroll',
    title: 'Waris',
    description: 'Penyelesaian sengketa waris, pembagian warisan, dan pembuatan surat wasiat.',
  },
  {
    icon: 'briefcase',
    title: 'Hukum Bisnis',
    description: 'Konsultasi pendirian PT/CV, perizinan usaha, dan kontrak bisnis.',
  },
  {
    icon: 'shield',
    title: 'Pidana',
    description: 'Pendampingan hukum untuk kasus pidana umum dan khusus.',
  },
  {
    icon: 'map',
    title: 'Pertanahan',
    description: 'Sengketa tanah, sertifikat, dan perizinan pertanahan.',
  },
  {
    icon: 'users',
    title: 'Ketenagakerjaan',
    description: 'Perselisihan hubungan industrial, PHK, dan hak pekerja.',
  },
  {
    icon: 'file-text',
    title: 'Kontrak',
    description: 'Pembuatan, review, dan penyelesaian sengketa kontrak.',
  },
  {
    icon: 'building',
    title: 'UMKM',
    description: 'Bantuan hukum khusus untuk usaha mikro, kecil, dan menengah.',
  },
];

export const whyUsItems = [
  {
    icon: 'award',
    title: 'Profesional',
    description: 'Tim advokat berpengalaman dan tersertifikasi dengan rekam jejak yang terbukti di berbagai bidang hukum.',
  },
  {
    icon: 'zap',
    title: 'Cepat & Responsif',
    description: 'Respons cepat dalam 24 jam dan proses konsultasi yang efisien untuk menyelesaikan masalah Anda.',
  },
  {
    icon: 'check-circle',
    title: 'Terpercaya',
    description: 'Dipercaya oleh lebih dari 1000+ klien dengan tingkat kepuasan yang tinggi.',
  },
];

export const testimonials = [
  {
    name: 'Rina Susanti',
    role: 'Pengusaha',
    text: 'TanyaAdvokat sangat membantu saya dalam menyelesaikan masalah hukum bisnis saya. Tim mereka profesional dan responsif.',
  },
  {
    name: 'Hendra Wijaya',
    role: 'Karyawan Swasta',
    text: 'Proses konsultasi sangat mudah dan cepat. Advokat yang ditugaskan sangat mengerti kebutuhan saya.',
  },
  {
    name: 'Maya Putri',
    role: 'Ibu Rumah Tangga',
    text: 'Terima kasih TanyaAdvokat sudah mendampingi saya selama proses perceraian. Sangat sabar dan profesional.',
  },
  {
    name: 'Agus Setiawan',
    role: 'Petani',
    text: 'Masalah sengketa tanah saya akhirnya terselesaikan berkat bantuan tim TanyaAdvokat. Sangat direkomendasikan!',
  },
  {
    name: 'Budi Santoso',
    role: 'PNS',
    text: 'Sangat terbantu dalam pengurusan dokumen warisan yang rumit. Penjelasannya mudah dipahami bagi orang awam.',
  },
  {
    name: 'Dewi Lestari',
    role: 'Pemilik UMKM',
    text: 'Layanan legalitas PT UMKM yang sangat transparan dan cepat. Kini bisnis saya memiliki payung hukum resmi.',
  },
];

export const partners = [
  'Mitra Hukum Indonesia',
  'Asosiasi Advokat Indonesia',
  'Legal Aid Foundation',
  'Perhimpunan Advokat',
  'Ikatan Notaris Indonesia',
  'Pusat Bantuan Hukum',
];

export const pricingPlans = [
  {
    title: 'Konsultasi Chat',
    price: 'Rp 150.000',
    period: 'per sesi',
    features: [
      'Konsultasi via WhatsApp',
      'Durasi 60 menit',
      'Advice tertulis',
      'Follow-up 1x',
    ],
    popular: false,
  },
  {
    title: 'Konsultasi Video Call',
    price: 'Rp 350.000',
    period: 'per sesi',
    features: [
      'Video call dengan advokat',
      'Durasi 60 menit',
      'Advice tertulis',
      'Follow-up 3x',
      'Ringkasan hukum',
    ],
    popular: true,
  },
  {
    title: 'Pendampingan Hukum',
    price: 'Rp 2.500.000',
    period: 'per kasus',
    features: [
      'Pendampingan penuh',
      'Konsultasi unlimited',
      'Pembuatan dokumen',
      'Representasi di pengadilan',
      'Update berkala',
      'Priority support',
    ],
    popular: false,
  },
  {
    title: 'Retainer Bulanan',
    price: 'Rp 5.000.000',
    period: 'per bulan',
    features: [
      'Konsultasi unlimited',
      'Review dokumen & kontrak',
      'Legal opinion tertulis',
      'Pendampingan hukum',
      'Dedicated lawyer',
      'Priority response',
    ],
    popular: false,
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Langkah-Langkah Mengajukan Gugatan Perceraian',
    excerpt: 'Panduan lengkap tentang proses dan persyaratan mengajukan gugatan perceraian di pengadilan agama.',
    date: '15 April 2026',
    category: 'Perceraian',
    image: article1,
  },
  {
    id: 2,
    title: 'Hak Waris Anak Menurut Hukum Indonesia',
    excerpt: 'Memahami pembagian waris untuk anak dalam hukum perdata dan hukum Islam di Indonesia.',
    date: '10 April 2026',
    category: 'Waris',
    image: article2,
  },
  {
    id: 3,
    title: 'Tips Membuat Kontrak Bisnis yang Aman',
    excerpt: 'Poin-poin penting yang harus ada dalam kontrak bisnis untuk melindungi kepentingan Anda.',
    date: '5 April 2026',
    category: 'Bisnis',
    image: article3,
  },
  {
    id: 4,
    title: 'Cara Mengurus Sertifikat Tanah',
    excerpt: 'Prosedur lengkap pengurusan sertifikat tanah dari awal hingga terbit.',
    date: '1 April 2026',
    category: 'Pertanahan',
    image: article4,
  },
  {
    id: 5,
    title: 'Hak Pekerja Saat di-PHK',
    excerpt: 'Ketahui hak-hak Anda sebagai pekerja ketika mengalami PHK oleh perusahaan.',
    date: '28 Maret 2026',
    category: 'Ketenagakerjaan',
    image: article5,
  },
  {
    id: 6,
    title: 'Panduan Mendirikan PT untuk UMKM',
    excerpt: 'Langkah-langkah dan persyaratan mendirikan Perseroan Terbatas untuk pelaku UMKM.',
    date: '20 Maret 2026',
    category: 'UMKM',
    image: article6,
  },
];


export const dokumentasiItems = [
  { title: 'Seminar Hukum Bisnis 2026', category: 'Seminar' },
  { title: 'Workshop Kontrak Dagang', category: 'Workshop' },
  { title: 'Konsultasi Hukum Gratis', category: 'Kegiatan Sosial' },
  { title: 'Pendampingan UMKM Bogor', category: 'UMKM' },
  { title: 'Webinar Hukum Keluarga', category: 'Webinar' },
  { title: 'Legal Clinic 2026', category: 'Kegiatan Sosial' },
  { title: 'Pelatihan Hukum Pertanahan', category: 'Workshop' },
  { title: 'Talkshow Hukum Indonesia', category: 'Seminar' },
  { title: 'Bantuan Hukum Masyarakat', category: 'Kegiatan Sosial' },
];

export const peraturanHukum = [
  {
    id: 'uud-1945',
    title: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
    category: 'Konstitusi',
    year: '1945',
    description: 'Konstitusi dan sumber hukum tertinggi yang berlaku di Republik Indonesia.',
    file: '/documents/UUD_1945.pdf'
  },
  {
    id: 'kuhp-2023',
    title: 'Kitab Undang-Undang Hukum Pidana (KUHP)',
    category: 'Pidana',
    year: '2023',
    description: 'Undang-Undang Nomor 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana.',
    file: '/documents/KUHP_UU_1_2023.pdf'
  },
  {
    id: 'uu-ketenagakerjaan-2003',
    title: 'Undang-Undang Ketenagakerjaan',
    category: 'Ketenagakerjaan',
    year: '2003',
    description: 'Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan.',
    file: '/documents/UU_Ketenagakerjaan_13_2003.pdf'
  },
  {
    id: 'uu-ite-2008',
    title: 'Undang-Undang ITE',
    category: 'Teknologi & Informasi',
    year: '2008',
    description: 'Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik.',
    file: '/documents/UU_ITE_11_2008.pdf'
  }
];
