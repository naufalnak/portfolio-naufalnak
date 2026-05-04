# Portfolio — Minimal Tech / Futuristic Minimalism

A clean, minimal, and production-ready personal portfolio built with **React + Vite + Tailwind CSS**. Designed with a *Minimal Tech* aesthetic — light background, precise typography, single orange accent, and intentional whitespace.

---

## ✦ Preview

> Theme: `#fafafa` background · `#0a0a0a` ink · `#e8390e` accent  
> Fonts: [Syne](https://fonts.google.com/specimen/Syne) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) · [DM Mono](https://fonts.google.com/specimen/DM+Mono)

---

## ✦ Features

### Sections
| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Editorial large type, multi-role typing effect, stats grid, scrolling tech marquee, CTA buttons |
| 02 | **About** | Bio, avatar, contact info, decorative code block, links to GitHub / LinkedIn / Résumé |
| 03 | **Skills** | Grid per category (Backend, Mobile, Frontend, Infrastructure) + "also familiar with" tags |
| 04 | **Projects** | Featured projects in row layout, compact grid for others, filter by type |
| 05 | **Experience** | Work & education timeline with tech stack tags per entry |
| 06 | **GitHub Stats** | Live stats card, top languages, streak, activity graph — powered by `github-readme-stats` (no API key needed) |
| 07 | **Contact** | Minimal form (name, email, subject, message) + social links |

### UI / Design
- **Custom cursor** — small red dot + expanding ring on hover
- **Scroll reveal** — fade-up & slide-left animations via `IntersectionObserver`
- **Typing effect** — multi-role typewriter with delete animation in Hero
- **Scrolling marquee** — infinite tech stack ticker at bottom of Hero
- **Noise texture overlay** — subtle grain across the entire page
- **Animated underline** — sliding accent underline on all links
- **1px grid border layout** — consistent thin-line grid in Skills & Projects
- **2px custom scrollbar**

### Navbar
- Sticky top bar with backdrop blur
- Active section detection on scroll
- Mobile hamburger menu with collapse animation
- Accent highlight on active link

---

## ✦ Tech Stack

| Category | Library / Tool |
|----------|---------------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3 + PostCSS |
| Icons | Lucide React, React Icons |
| Routing | React Router DOM 7 |
| Animation | GSAP 3, Lenis (smooth scroll) |
| Markdown | React Markdown |
| GitHub Stats | [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) |

---

## ✦ Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Cursor.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── portfolio.js        ← Edit this file
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ✦ Getting Started

### Prerequisites
- Node.js `>=18.x`
- npm `>=9.x`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## ✦ Customization

All personal data is centralized in one file — **`src/data/portfolio.js`**.

```js
export const personal = {
  name: "Your Name",
  role: "Your Role",
  location: "Your City, Country",
  email: "you@example.com",
  github: "your-github-username",   // Used for GitHub Stats
  linkedin: "your-linkedin",
  twitter: "your-twitter",
  bio: "Your bio...",
  resumeUrl: "/resume.pdf",
}
```

Edit the following exports to personalize your portfolio:

| Export | Description |
|--------|-------------|
| `personal` | Name, role, bio, social links, location |
| `stats` | Hero stats (years, projects, users, etc.) |
| `skills` | Skill categories and items |
| `projects` | Project list with tags, links, featured flag |
| `experience` | Work and education timeline entries |

### GitHub Stats

GitHub Stats load automatically using your `personal.github` username. No API key or configuration required — it uses the public [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) service.

### Contact Form

The contact form in `Contact.jsx` is UI-only by default. To make it functional, integrate with one of these services:

- [EmailJS](https://www.emailjs.com/) — send emails directly from the browser
- [Resend](https://resend.com/) — email API (requires a simple backend endpoint)
- [Formspree](https://formspree.io/) — form backend, no code needed

---

## ✦ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on `0.0.0.0:5173` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Build + audit dependencies |

---

## ✦ License

MIT — feel free to use, modify, and deploy as your own portfolio.

---

<p align="center">
  Built with React + Vite · Designed with intentional minimalism
</p>
