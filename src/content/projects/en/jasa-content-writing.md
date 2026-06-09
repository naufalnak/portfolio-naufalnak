# Overview

Jasa Content Writing is a content writing service management web app I built as the practical project for the **BNSP Junior Web Programmer** certification from the Professional Certification Agency of Gunadarma University.

The platform covers two sides: a **public-facing site** for customers to place orders and track them, and an **admin dashboard** for managing the service catalog, processing orders, and viewing reports.

Certificate No. 62019 2514 5 0019419 2025, issued on 24 June 2025, valid for 3 years.

# Context

This project was built as proof of competence for the BNSP certification exam under the **Junior Web Programmer** scheme. The competency units assessed include: use of data structures, UI implementation, writing code following best practices and guidelines, structured programming, use of libraries and pre-existing components, program code documentation, and debugging.

# Tech Stack

- **Framework**: CodeIgniter 3 (PHP)
- **Database**: MySQL
- **Notifications**: Fonnte API (WhatsApp) + Email (SMTP)
- **Frontend**: Bootstrap + vanilla JS
- **Server**: Apache via Laragon

# Key Features

**Public Pages (Customer)**
- Landing page displaying active services
- Order form with input validation
- Order tracking via unique 8-character code
- Contact page with redirect to admin WhatsApp

**Automated Notifications**
- Confirmation email containing the tracking code sent to the customer after ordering
- Automatic WhatsApp message via Fonnte API to the customer's phone number

**Admin Dashboard**
- Login and session-based authentication
- Service catalog management (CRUD)
- Order management: view details, update status, delete
- Order reports
- Business profile management

# Architecture

The project follows CodeIgniter 3's native **MVC pattern**:
- `Controllers/` separates public logic (`Home`, `Auth`) from admin logic (`Catalog`, `Orders`, `Dashboard`, `Reports`, `Profile`)
- `Models/` handles all database queries
- `Views/` are split per controller with reusable `header` and `footer` partials
- Custom `send_whatsapp_helper.php` for Fonnte API integration

# What I Learned

Building this project under a certification deadline taught me to **prioritize features realistically under pressure**. It was also my first time integrating two notification channels simultaneously (email and WhatsApp) in a single order flow, which turned out to be surprisingly tricky from an error handling standpoint.
