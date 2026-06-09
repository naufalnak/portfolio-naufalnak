# Overview

RESTful API backend untuk sistem pemesanan tiket pesawat berbasis web. Dibangun selama magang di **PT. Lentera Bangsa Benderang** sebagai Back End Developer, project ini menjadi fondasi utama platform flight booking yang digunakan pengguna end-to-end.

# Context

Ini adalah project nyata di lingkungan production  bukan side project atau tugas kuliah. Saya bertanggung jawab membangun dan maintaining API yang dipakai oleh frontend team, dengan standar kode yang harus konsisten dan teruji.

# Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Testing**: Vitest
- **Auth**: JWT-based authentication
- **Email**: Nodemailer untuk notification

# Architecture

API dibangun mengikuti pola **MVC (Model-View-Controller)** dengan separation of concerns yang jelas:

- **Controllers** menangani request/response logic
- **Services** berisi business logic
- **Models** via Prisma schema untuk database access

Setiap endpoint memiliki input validation layer sebelum menyentuh business logic, dan error handling yang konsisten di seluruh routes.

# Key Features

- JWT authentication dengan refresh token mechanism
- Input validation menggunakan middleware custom
- Media management untuk upload dokumen pengguna
- Email notification untuk konfirmasi booking dan e-ticket
- Unit testing dengan Vitest untuk coverage endpoint kritis
- Modular MVC architecture yang scalable

# What I Learned

Pengalaman pertama saya di lingkungan kerja profesional mengajarkan banyak hal di luar kode  **code review culture**, koordinasi dengan tim frontend, dan pentingnya dokumentasi API yang baik. Juga di sini saya pertama kali bekerja serius dengan Prisma ORM dan mulai memahami pentingnya testing.
