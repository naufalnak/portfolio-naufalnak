# Rebuilding an MSIB Project From Scratch: The Story Behind BengkelHub

> 📸 **[IMAGE 1: Screenshot/mockup of BengkelHub — operator dashboard or landing page]**

This isn't a tidy success story. It's about a project that fell apart, a team that scattered, and a decision to start over after everything was supposedly already done.

---

## The Beginning: The MORE Project During MSIB Semester 6

During MSIB semester 6, I joined the Infinite Learning program, placed at Kinema Systrans Multimedia. The project: build an Android-based workshop management app called MORE (Mobile Bengkel).

> 📸 **[IMAGE 2: Screenshot of the old MORE app, or GitHub commit history as visual proof]**

Our team split into two. The Android team, which I was part of, handled the mobile app in Kotlin and Jetpack Compose. The Web team handled the backend in ExpressJS. It sounded organized. It wasn't.

The Web team never really shared progress with us. No API documentation, no regular updates, no consistent communication. On the Android side, I had to guess at data structures or build my own workarounds. Eventually the Android side ended up running almost entirely independently, with Firebase as a temporary backend.

On top of that, I hadn't really mastered Kotlin and Jetpack Compose yet at the time. I was learning while building, with the deadline never stopping for me to catch up.

---

## Presentation Day

Partway through, some team members started disappearing. No word, no contributions. Whoever was left just carried on however they could.

By presentation day, the core features couldn't be demoed properly. We went ahead anyway. Explaining what worked, glossing over what didn't. The presentation ended, grades came out, the program was over.

But something stuck with me. Not the grade. The idea itself was good. The problem it tried to solve was real. Small workshops genuinely need a proper management app, especially the ones still relying on notebooks or WhatsApp to track service records.

It felt wrong to let it end there.

---

## The Decision to Rebuild

After graduating, in between job hunting, I decided to rebuild this project from scratch. Not because anyone asked me to. Not because of any deadline. Purely because the idea wasn't finished.

This time, I'd own everything. Frontend and backend. No unresponsive Web team, no dependency on people who might vanish without warning.

---

## Why Not Stick With the Old Stack?

The first question that came up: keep using Kotlin + Firebase, or start with a different stack entirely?

I chose a different stack, for reasons that were pretty clear to me:

**Firebase doesn't fit multi-tenancy well.** If the goal is one platform serving many workshops, I need full control over per-workshop data isolation. Firebase can technically do it, but the model doesn't feel natural for this use case.

**I wanted a platform, not a single-workshop app.** MORE was originally designed as a mobile app for one workshop only. BengkelHub was designed from day one as a multi-tenant platform: one system, many workshops, with an architecture that genuinely separates each tenant's data.

**I wanted to build skills relevant to my career direction.** Kotlin and Android development are valid skills, but I'm more drawn toward fullstack and backend work. This was a chance to build something real with the tech stack I actually wanted to go deeper on.

---

## Why Go for the Backend?

This is the question I get asked most. Why not just stick with Node.js, which I already knew better?

Honestly, I did consider Node.js with ExpressJS or Hono. I'd used both before. But a few reasons pushed me toward Go instead:

> 📸 **[IMAGE 3: Architecture diagram — Next.js → Go/Fiber API → PostgreSQL, with Asynq + Redis for background jobs]**

**Performance under concurrent load.** A busy workshop can have a lot of bookings coming in at once. Go handles concurrency with goroutines that are far lighter than Node.js threads.

**Clean background jobs.** I needed an automated WhatsApp notification system running in the background, separate from the main request cycle, things like scheduled booking reminders. In Go, I used Asynq with Redis as the message queue. The worker runs as a separate process, rather than sharing the same event loop as everything else.

**Learning something new.** This counts too, honestly. Building a real project is one of the best ways to actually learn a new language.

The backend ended up on Go with Fiber as the framework, GORM for the ORM, PostgreSQL, and Asynq + Redis for background jobs. The frontend is Next.js, purely consuming the REST API from the backend, with no direct database access at all.

---

## Multi-Tenant Architecture

This is one of the most consequential design decisions in BengkelHub.

> 📸 **[IMAGE 4: Multi-tenant diagram — one system, multiple workshops, data isolated per workshop_id]**

Multi-tenancy means a single application instance serves many workshops at once, but each workshop's data stays fully isolated. Workshop A's customers can't see Workshop B's data, even though they're on the same system.

The implementation in BengkelHub is fairly straightforward: every data entity (customers, vehicles, services, invoices) carries a `workshop_id`. Every operator request gets validated against ownership of that specific workshop, not just a check of "are you an operator." If the `workshop_id` on the requested data doesn't match the workshop the logged-in operator belongs to, the request gets rejected.

For auth, I built one shared JWT system for both operators and customers, distinguished only by a role field inside the token. So it's not two parallel login systems, but a single authentication flow, with role and workshop-ownership checks applied at every endpoint that needs them.

This is what sets BengkelHub apart from a typical workshop app. One deployment, many workshops, genuinely separated data.

---

## Claude Code as a Pair Programmer

One thing that really changed how fast I could build was Claude Code.

It's not about Claude writing code for me. It's more about always having someone to think through problems with. When I got stuck on JWT auth logic, I could talk through the flow before writing a single line. When there was a bug in matching vehicle data between online bookings and walk-ins, I could explain the problem and iterate on a solution together until we found the actual root cause.

My build speed went up significantly compared to bouncing between Stack Overflow and documentation on my own.

---

## Where Things Stand Now

BengkelHub is still under active development, as a multi-tenant workshop management platform with two sides:

> 📸 **[IMAGE 5: Screenshot of BengkelHub — operator dashboard and customer-facing pages]**

**Workshop operators** get a dashboard to manage customers and vehicles, process services from intake to completion, auto-generate invoices with tax and discount calculations, log payments (cash, transfer, or QRIS), and receive bookings from customers.

**Customers** can book online or walk in directly, find the nearest workshop via geolocation, pay online through Midtrans, and get automatic WhatsApp notifications at every key stage: booking confirmed, service completed, invoice issued.

There's still plenty that's not perfect, and I haven't deployed it for an actual workshop to use yet. But it's already a lot further along than the half-finished demo from two years ago.

---

In Part 2, I get into the more specific technical challenges: why matching vehicles by license plate alone is dangerous and nearly caused one customer's service history to bleed into another's, why a seemingly minor phone number validation change nearly locked everyone out of signup, and how background jobs with Asynq work behind the scenes of the WhatsApp notifications.

_(Part 2 is linked in the "Related Posts" section below.)_
