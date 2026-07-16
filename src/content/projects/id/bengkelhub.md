# Overview

BengkelHub adalah platform manajemen bengkel kendaraan multi-tenant, evolusi dari project mobile **MORE (MoBo Repair)** yang saya rebuild secara penuh sebagai web platform setelah lulus kuliah.

Platform ini dirancang sebagai tiga-sisi: **marketplace publik** untuk pelanggan mencari bengkel, **portal pelanggan** untuk booking dan tracking servis, dan **dashboard operator** untuk pengelolaan bengkel secara menyeluruh.

# The Problem

Setelah MSIB selesai, saya ingin membuktikan bahwa project Android yang dibangun bersama tim bisa di-rebuild solo sebagai platform web yang production-ready, dengan arsitektur yang lebih proper, fitur lebih lengkap, dan siap di-deploy.

Tantangannya: membangun sistem multi-tenant dari nol, di mana setiap data harus ter-isolasi per workshop, tanpa ada data bocor antar tenant, sekaligus memisahkan concern antara backend dan frontend secara bersih.

# Tech Stack

**Backend**

- **Framework**: Go + Fiber
- **ORM**: GORM + PostgreSQL
- **Auth**: JWT custom (role-based: customer / operator / admin)
- **Job Queue**: Asynq + Redis (notifikasi async, reminder H-1)
- **Payment**: Midtrans (sandbox/production)
- **Email**: Resend (verifikasi email)
- **WhatsApp**: Fonnte API

**Frontend**

- **Framework**: Next.js 16 (App Router) + TypeScript, React 19
- **State/Data**: TanStack Query + Zustand
- **Form**: React Hook Form + Zod
- **UI**: Radix UI / shadcn, Tailwind CSS v4, Framer Motion
- **PDF**: @react-pdf/renderer (invoice)

**Deployment**: Vercel (frontend), backend masih dijalankan secara lokal via ngrok untuk sementara, rencana deploy ke VPS/Render sebagai langkah berikutnya

# Architecture Highlights

Multi-tenancy diimplementasikan via `workshopId` yang di-inject ke setiap query, setiap operator hanya bisa mengakses data workshop mereka sendiri. Backend dan frontend dipisah total: Go/Fiber sebagai REST API service, Next.js sebagai consumer murni via Axios + TanStack Query.

Role-based routing dijalankan di layer middleware Fiber (backend) dan route groups `(auth)`, `operator`, `(customer)` di Next.js (frontend), memisahkan alur registrasi operator (`/register`) dan customer (`/daftar`) sejak awal. Operator dapat mengelola karyawan, layanan, slot, booking, invoice digital, hingga melihat laporan bulanan per workshop, semua dari satu dashboard.

# Key Features

- Multi-tenant isolation via `workshopId` pada setiap database query
- Operator dashboard: manajemen pelanggan, kendaraan, order servis, invoice PDF, laporan bulanan
- Customer portal: cari bengkel (geolocation search), booking appointment, tracking order real-time
- Pembayaran online terintegrasi via Midtrans, termasuk halaman `payment/finish`
- Notifikasi WhatsApp otomatis via Fonnte API saat status order berubah, plus reminder H-1 (async job via Asynq + Redis)
- Verifikasi email via Resend
- Rate limiting per-IP (Redis) di level backend, tier berbeda untuk endpoint auth vs global
- Responsive design untuk operator di lapangan (mobile-first)

# What I Learned

Membangun platform multi-tenant solo mengajarkan saya banyak tentang **data isolation**, **session management** yang kompleks, dan pentingnya **middleware architecture** yang bersih, baik di sisi Fiber (backend) maupun Next.js (frontend). Menambahkan integrasi pihak ketiga (Midtrans, Resend, Fonnte) juga mengajarkan saya cara mendesain background job yang resilient, karena kegagalan satu integrasi tidak boleh menghentikan alur utama aplikasi. Juga belajar bahwa fitur yang terlihat sederhana (misalnya: "lihat status order") butuh koordinasi banyak layer di belakangnya.
