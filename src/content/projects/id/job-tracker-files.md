# Overview

Job Tracker Files adalah aplikasi web full-stack untuk melacak lamaran kerja, dibangun dengan Next.js 14 dan Supabase. Setiap pengguna punya akun sendiri yang datanya terisolasi penuh lewat Row Level Security di database, dengan board kanban untuk memantau status lamaran dari apply sampai offer.

# The Problem

Melacak lamaran kerja lewat spreadsheet cukup membantu, tapi gak scalable untuk reminder follow-up otomatis, riwayat perubahan status, atau visualisasi progress. App ini mengubah proses itu jadi board kanban interaktif lengkap dengan reminder otomatis dan dashboard metrics.

# Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security)
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Visualisasi**: Recharts
- **Validasi**: Zod

# How It Works

- Pengguna daftar dan otomatis dapat set status serta tahap interview default
- Lamaran ditambahkan dan ditampilkan sebagai kartu di kolom sesuai statusnya
- Kartu bisa digeser (drag-and-drop) antar kolom buat ganti status
- Setiap perubahan status otomatis tercatat lewat database trigger
- Sistem mengecek jadwal follow-up dan menampilkan lamaran yang perlu ditindaklanjuti
- Dashboard metrics menghitung interview callback rate, success rate, dan tren mingguan langsung dari database

# Key Features

- Autentikasi multi-user dengan Row Level Security penuh di setiap tabel
- Board kanban drag-and-drop dengan status dan tahap interview yang bisa dikustomisasi
- Reminder follow-up otomatis berdasarkan jadwal per status
- Bulk actions buat ubah status atau hapus banyak lamaran sekaligus
- Export CSV buat backup data
- Dashboard metrics dengan grafik interaktif dari Recharts
- Tampilan responsif, otomatis berubah jadi list buat layar kecil

# What I Learned

Project ini ngajarin saya cara kerja database trigger lebih dalam, termasuk bug yang sempat bikin insert gagal karena nyoba nulis ke tabel riwayat status di dalam trigger BEFORE INSERT, padahal barisnya sendiri belum tersimpan di titik itu. Solusinya adalah misahin jadi trigger BEFORE (buat nyiapin data) dan AFTER (buat nyatet riwayat). Juga belajar pentingnya naruh agregasi berat, kayak metrics dan followups, langsung di SQL, bukan ditarik mentah lalu diolah di JavaScript, biar tetap ringan walau data makin banyak.
