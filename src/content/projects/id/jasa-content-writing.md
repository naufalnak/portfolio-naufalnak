# Overview

Jasa Content Writing adalah web app manajemen layanan content writing yang saya bangun sebagai project praktik untuk sertifikasi **BNSP Junior Web Programmer** dari Lembaga Sertifikasi Profesi Universitas Gunadarma.

Platform ini mencakup dua sisi: **halaman publik** untuk pelanggan melakukan pemesanan dan tracking order, dan **dashboard admin** untuk mengelola katalog layanan, memproses pesanan, dan melihat laporan.

Sertifikat No. 62019 2514 5 0019419 2025 diterbitkan pada 24 Juni 2025, berlaku selama 3 tahun.

# Context

Project ini dibuat sebagai bukti kompetensi untuk ujian sertifikasi BNSP dengan skema **Junior Web Programmer**. Unit kompetensi yang diuji mencakup penggunaan struktur data, implementasi UI, penulisan kode sesuai best practice, pemrograman terstruktur, penggunaan library, dokumentasi kode, dan debugging.

# Tech Stack

- **Framework**: CodeIgniter 3 (PHP)
- **Database**: MySQL
- **Notifikasi**: Fonnte API (WhatsApp) + Email (SMTP)
- **Frontend**: Bootstrap + vanilla JS
- **Server**: Apache via Laragon

# Fitur Utama

**Halaman Publik (Customer)**
- Landing page dengan daftar layanan aktif
- Form pemesanan dengan validasi input
- Tracking order via kode unik (8 karakter)
- Halaman kontak dengan redirect ke WhatsApp admin

**Notifikasi Otomatis**
- Email konfirmasi berisi kode tracking dikirim ke customer setelah order
- WhatsApp otomatis via Fonnte API ke nomor customer

**Dashboard Admin**
- Login dan autentikasi session
- Manajemen katalog layanan (CRUD)
- Manajemen order: lihat detail, update status, hapus
- Laporan order
- Manajemen profil bisnis

# Architecture

Project mengikuti pola **MVC bawaan CodeIgniter 3**:
- `Controllers/` memisahkan logika publik (`Home`, `Auth`) dan admin (`Catalog`, `Orders`, `Dashboard`, `Reports`, `Profile`)
- `Models/` menangani semua query database
- `Views/` dibagi per controller dengan partial `header` dan `footer` yang reusable
- Custom helper `send_whatsapp_helper.php` untuk integrasi Fonnte API

# What I Learned

Membangun project ini dengan deadline sertifikasi mengajarkan saya untuk **prioritas fitur secara realistis** di bawah tekanan waktu. Juga pertama kalinya saya mengintegrasikan dua channel notifikasi sekaligus (email + WhatsApp) dalam satu flow pemesanan, yang ternyata cukup tricky dari sisi error handling.
