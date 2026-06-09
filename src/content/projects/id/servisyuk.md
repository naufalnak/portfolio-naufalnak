# Overview

ServisYuk adalah platform manajemen bengkel kendaraan multi-tenant  evolusi dari project mobile **MORE (MoBo Repair)** yang saya rebuild secara penuh sebagai web platform setelah lulus kuliah.

Platform ini dirancang sebagai tiga-sisi: **marketplace publik** untuk pelanggan mencari bengkel, **portal pelanggan** untuk booking dan tracking servis, dan **dashboard operator** untuk pengelolaan bengkel secara menyeluruh.

# The Problem

Setelah MSIB selesai, saya ingin membuktikan bahwa project Android yang dibangun bersama tim bisa di-rebuild solo sebagai platform web yang production-ready  dengan arsitektur yang lebih proper, fitur lebih lengkap, dan siap di-deploy.

Tantangannya: membangun sistem multi-tenant dari nol, where every piece of data harus ter-isolasi per workshop, tanpa ada data bocor antar tenant.

# Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Auth**: NextAuth v5  dual system (operator vs customer)
- **Rate Limiting**: Upstash Redis
- **Notifications**: Fonnte API (WhatsApp)
- **Deployment**: Vercel

# Architecture Highlights

Multi-tenancy diimplementasikan via `workshopId` yang di-inject ke setiap query  setiap operator hanya bisa mengakses data workshop mereka sendiri. Middleware auth berjalan di Edge Runtime untuk performa optimal.

Dual auth system memisahkan session antara operator dan customer, dengan role-based routing yang ketat. Operator dapat mengelola karyawan, mengatur layanan, menerima booking, dan mengeluarkan invoice digital  semua dari satu dashboard.

# Key Features

- Multi-tenant isolation via `workshopId` pada setiap database query
- Operator dashboard: manajemen pelanggan, kendaraan, order servis, invoice
- Customer portal: cari bengkel, booking appointment, tracking order real-time
- WhatsApp notification otomatis via Fonnte API saat status order berubah
- Rate limiting per-IP menggunakan Upstash Redis
- Responsive design untuk operator di lapangan (mobile-first)

# What I Learned

Membangun platform multi-tenant solo mengajarkan saya banyak tentang **data isolation**, **session management** yang kompleks, dan pentingnya **middleware architecture** yang bersih. Juga belajar bahwa fitur yang terlihat sederhana (misalnya: "lihat status order") butuh koordinasi banyak layer di belakangnya.
