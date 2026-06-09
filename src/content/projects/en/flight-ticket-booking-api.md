# Overview

A RESTful API backend for a web-based flight ticket booking system. Built during my internship at **PT. Lentera Bangsa Benderang** as a Back End Developer, this project served as the core foundation of a flight booking platform used end-to-end by real users.

# Context

This was a real project in a production environment, not a side project or coursework. I was responsible for building and maintaining the API consumed by the frontend team, with consistent and well-tested code standards.

# Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Testing**: Vitest
- **Auth**: JWT-based authentication
- **Email**: Nodemailer for notifications

# Architecture

The API follows an **MVC (Model-View-Controller)** pattern with clear separation of concerns:

- **Controllers** handle request/response logic
- **Services** contain business logic
- **Models** via Prisma schema for database access

Every endpoint has an input validation layer before touching business logic, with consistent error handling across all routes.

# Key Features

- JWT authentication with refresh token mechanism
- Input validation using custom middleware
- Media management for user document uploads
- Email notifications for booking confirmation and e-tickets
- Unit testing with Vitest for critical endpoint coverage
- Scalable modular MVC architecture

# What I Learned

My first experience in a professional work environment taught me a lot beyond code: **code review culture**, coordinating with the frontend team, and the importance of good API documentation. This was also where I first worked seriously with Prisma ORM and began to truly understand why testing matters.
