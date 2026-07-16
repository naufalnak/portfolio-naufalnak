# Overview

BengkelHub is a multi-tenant vehicle workshop management platform, evolved from **MORE (MoBo Repair)**, the original mobile project that I fully rebuilt as a web platform after graduating.

The platform is designed as a three-sided system: a **public marketplace** for customers to find workshops, a **customer portal** for booking and tracking service, and an **operator dashboard** for end-to-end workshop management.

# The Problem

After MSIB ended, I wanted to prove that an Android project built with a team could be rebuilt solo as a production-ready web platform, with a cleaner architecture, more complete features, and something actually deployable.

The challenge: building a multi-tenant system from scratch, where every piece of data has to stay isolated per workshop, with no data leaking across tenants, while keeping a clean separation of concerns between backend and frontend.

# Tech Stack

**Backend**

- **Framework**: Go + Fiber
- **ORM**: GORM + PostgreSQL
- **Auth**: Custom JWT (role-based: customer / operator / admin)
- **Job Queue**: Asynq + Redis (async notifications, H-1 reminders)
- **Payment**: Midtrans (sandbox/production)
- **Email**: Resend (email verification)
- **WhatsApp**: Fonnte API

**Frontend**

- **Framework**: Next.js 16 (App Router) + TypeScript, React 19
- **State/Data**: TanStack Query + Zustand
- **Form**: React Hook Form + Zod
- **UI**: Radix UI / shadcn, Tailwind CSS v4, Framer Motion
- **PDF**: @react-pdf/renderer (invoice generation)

**Deployment**: Vercel (frontend), backend currently running locally via ngrok as a temporary setup, with deployment to a VPS/Render planned as the next step

# Architecture Highlights

Multi-tenancy is implemented via a `workshopId` injected into every query, so each operator can only access their own workshop's data. Backend and frontend are fully decoupled: Go/Fiber serves as a pure REST API service, while Next.js consumes it purely through Axios + TanStack Query.

Role-based routing is enforced at the Fiber middleware layer (backend) and through route groups `(auth)`, `operator`, `(customer)` in Next.js (frontend), separating operator registration (`/register`) from customer registration (`/daftar`) from the start. Operators can manage staff, services, time slots, bookings, digital invoices, and monthly reports per workshop, all from a single dashboard.

# Key Features

- Multi-tenant isolation via `workshopId` on every database query
- Operator dashboard: customer management, vehicle records, service orders, PDF invoices, monthly reports
- Customer portal: workshop search (geolocation-based), appointment booking, real-time order tracking
- Online payment integration via Midtrans, including a `payment/finish` page
- Automated WhatsApp notifications via the Fonnte API on order status changes, plus H-1 reminders (async job via Asynq + Redis)
- Email verification via Resend
- Per-IP rate limiting (Redis) at the backend level, with different tiers for auth endpoints vs global endpoints
- Responsive design built for operators working in the field (mobile-first)

# What I Learned

Building a multi-tenant platform solo taught me a lot about **data isolation**, complex **session management**, and the importance of clean **middleware architecture**, both on the Fiber side (backend) and the Next.js side (frontend). Adding third-party integrations (Midtrans, Resend, Fonnte) also taught me how to design resilient background jobs, since a failure in one integration should never bring down the main application flow. I also learned that a feature that looks simple on the surface (like "view order status") actually requires coordination across many layers underneath.
