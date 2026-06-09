# Overview

ServisYuk is a multi-tenant vehicle repair shop management platform, rebuilt as a full web platform from the original mobile project **MORE (MoBo Repair)** after graduation.

The platform is designed as a three-sided system: a **public marketplace** for customers to find workshops, a **customer portal** for booking and tracking services, and an **operator dashboard** for comprehensive workshop management.

# The Problem

After finishing the MSIB program, I wanted to prove that an Android project built with a team could be rebuilt solo as a production-ready web platform with a proper architecture, more complete features, and ready to deploy.

The challenge: building a multi-tenant system from scratch where every piece of data must be isolated per workshop, with no data leaking between tenants.

# Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Auth**: NextAuth v5, dual system (operator vs customer)
- **Rate Limiting**: Upstash Redis
- **Notifications**: Fonnte API (WhatsApp)
- **Deployment**: Vercel

# Architecture Highlights

Multi-tenancy is implemented via `workshopId` injected into every query, ensuring each operator can only access their own workshop data. Auth middleware runs on Edge Runtime for optimal performance.

The dual auth system separates sessions between operators and customers, with strict role-based routing. Operators can manage staff, configure services, accept bookings, and issue digital invoices, all from a single dashboard.

# Key Features

- Multi-tenant isolation via `workshopId` on every database query
- Operator dashboard: manage customers, vehicles, service orders, and invoices
- Customer portal: find workshops, book appointments, and track order status in real time
- Automatic WhatsApp notifications via Fonnte API on order status changes
- Per-IP rate limiting using Upstash Redis
- Responsive design for operators in the field (mobile-first)

# What I Learned

Building a multi-tenant platform solo taught me a great deal about **data isolation**, complex **session management**, and the importance of a clean **middleware architecture**. I also learned that features that seem simple on the surface, like "view order status", require coordination across many layers underneath.
