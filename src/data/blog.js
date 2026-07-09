export const blogCategories = {
  "keluh-kesah": { id: "Keluh Kesah", en: "Dev Diary" },
  edukasi: { id: "Edukasi", en: "Education" },
};

export const blogCategoryEmoji = {
  "keluh-kesah": "💭",
  edukasi: "📚",
};

export const blogPosts = [
  {
    id: 3,
    slug: "kenapa-judi-online-selalu-bikin-rugi",
    date: "2026-07-09",
    category: "edukasi",
    tags: ["Judi Online", "Edukasi Publik", "RNG", "Psikologi"],
    readTime: 8,
    title: {
      id: "Kenapa Kamu (Hampir) Selalu Kalah: Membongkar Cara Kerja Judi Online",
      en: "Why You (Almost) Always Lose: Unpacking How Online Gambling Really Works",
    },
    excerpt: {
      id: "House edge, RNG yang gak diaudit siapa pun, dan near-miss engineering yang bikin kamu ngerasa 'dikit lagi'. Coba langsung simulasinya biar kelihatan bedanya secara matematis.",
      en: "House edge, an RNG nobody audits, and near-miss engineering designed to make you feel like you 'almost won'. Try the simulator yourself to see the math play out.",
    },
  },
  {
    id: 2,
    slug: "rebuild-project-msib-bengkelhub-part1",
    date: "2026-07-09",
    category: "keluh-kesah",
    tags: ["Go", "Fiber", "Multi-tenant", "Arsitektur", "MSIB"],
    readTime: 9,
    title: {
      id: "Rebuild Project MSIB dari Nol: Cerita di Balik BengkelHub",
      en: "Rebuilding an MSIB Project From Scratch: The Story Behind BengkelHub",
    },
    excerpt: {
      id: "Tim yang buyar, presentasi setengah jadi, dan keputusan buat mulai ulang setelah semuanya selesai. Cerita kenapa BengkelHub lahir dan kenapa saya pilih Go, Fiber, serta arsitektur multi-tenant.",
      en: "A team that fell apart, an unfinished demo, and a decision to start over after it was all supposed to be done. Why BengkelHub exists, and why I chose Go, Fiber, and a multi-tenant architecture.",
    },
  },
  {
    id: 1,
    slug: "blog-part2-bengkelhub",
    date: "2026-07-09",
    category: "keluh-kesah",
    tags: ["Go", "Debugging", "Fonnte", "Validasi", "Multi-tenant"],
    readTime: 9,
    title: {
      id: "Tiga Bug yang Hampir Lolos ke Production: Cerita Teknis di Balik BengkelHub",
      en: "Three Bugs That Almost Shipped to Production: Technical Stories From BengkelHub",
    },
    excerpt: {
      id: "Pencocokan plat nomor yang bisa nyasarin riwayat servis ke customer lain, validasi nomor HP yang nyaris bikin semua orang gagal daftar, dan salah baca response Fonnte yang bikin error kelihatan kosong.",
      en: "A license-plate lookup that could leak service history to the wrong customer, a phone validation change that nearly locked everyone out of signup, and a Fonnte response field misread that made errors look empty.",
    },
  },
];
