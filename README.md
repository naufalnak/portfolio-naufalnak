# Portfolio Tokyo Neobrutalism

Personal portfolio built with **React + Vite + Tailwind CSS**. Designed with a _Tokyo Neobrutalist_ aesthetic bold yellow/black palette, hard borders, offset shadows, condensed type, and Japanese typographic accents.

## ✦ Preview

> Theme: `#fafaf8` background · `#0a0a0a` ink · `#f0ee42` accent  
> Fonts: [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed) · [DM Mono](https://fonts.google.com/specimen/DM+Mono) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) · [Noto Serif JP](https://fonts.google.com/specimen/Noto+Serif+JP)

Live: [naufalandr.my.id](https://www.naufalandr.my.id/)

## ✦ Features

### Sections

| #   | Section          | Description                                                                                                 |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| 01  | **Hero**         | Editorial large type, multi-role typing effect, stats grid, scrolling tech marquee, CTA buttons             |
| 02  | **About**        | Bio, avatar, contact info, decorative code block, links to GitHub / LinkedIn / Résumé                       |
| 03  | **Skills**       | Grid per category (Backend, Mobile, Frontend, Tools) + "also familiar with" tags                            |
| 04  | **Projects**     | Featured cards + compact grid, filter by type, View All page, individual project detail pages               |
| 05  | **Experience**   | Work & education timeline with tech stack tags per entry                                                    |
| 06  | **GitHub Stats** | Live stats card, top languages, streak, activity graph powered by `github-readme-stats` (no API key needed) |
| 07  | **Contact**      | Minimal form (name, email, subject, message) + social links                                                 |

### Pages

| Route             | Description                                 |
| ----------------- | ------------------------------------------- |
| `/`               | Main portfolio (single-page, section-based) |
| `/projects`       | View All Projects filterable grid           |
| `/projects/:slug` | Project detail page renders from Markdown   |

### UI / Design

- **Tokyo Neobrutalist** yellow/black hard borders, 3px offset shadows, raw grid layout
- **Japanese type accents** ghost kanji overlays, Noto Serif JP for decorative labels
- **Custom cursor** small yellow dot + expanding ring on hover
- **Scroll reveal** fade-up animations via `IntersectionObserver`
- **Typing effect** multi-role typewriter with delete animation in Hero
- **Scrolling marquee** infinite tech stack ticker at bottom of Hero
- **Noise texture overlay** subtle grain across the entire page
- **Mobile-first** responsive across all breakpoints, filter bar scrollable on mobile
- **2px custom scrollbar**

### Navbar

- Sticky top bar, dark background
- Active section detection on scroll
- Mobile hamburger menu with collapse animation
- Accent highlight on active link

## ✦ Tech Stack

| Category     | Library / Tool                                                            |
| ------------ | ------------------------------------------------------------------------- |
| Framework    | React 19 + Vite 8                                                         |
| Styling      | Tailwind CSS 3 + PostCSS                                                  |
| Icons        | Lucide React, React Icons                                                 |
| Routing      | React Router DOM 7                                                        |
| Animation    | GSAP 3, Lenis (smooth scroll)                                             |
| Markdown     | React Markdown                                                            |
| Email        | EmailJS Browser                                                           |
| GitHub Stats | [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) |

## ✦ Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── projects/           ← Project thumbnail images
│       ├── servisyuk.png
│       ├── flight.png
│       └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Cursor.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx    ← Homepage projects section
│   │   ├── Experience.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── ProjectsPage.jsx      ← /projects route
│   │   └── ProjectDetailPage.jsx ← /projects/:slug route
│   ├── content/
│   │   └── projects/       ← Markdown writeups per project
│   │       ├── en/         ← English version
│   │       │   ├── servisyuk.md
│   │       │   └── ...
│   │       └── id/         ← Indonesian version
│   │           ├── servisyuk.md
│   │           └── ...
│   ├── data/
│   │   ├── portfolio.js    ← Personal info, skills, experience
│   │   └── projects.json   ← Project list with slugs
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## ✦ Getting Started

### Prerequisites

- Node.js `>=18.x`
- npm `>=9.x`

### Installation

```bash
# Clone the repository
git clone https://github.com/naufalnak/portfolio-naufalnak.git
cd portfolio-naufalnak

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## ✦ Customization

### Personal Info `src/data/portfolio.js`

All personal data (bio, skills, experience) lives here:

```js
export const personal = {
  name: "Naufal Andresya Kholish",
  role: "Back End & Mobile Developer",
  location: "Bekasi, Indonesia",
  email: "you@example.com",
  github: "naufalnak", // Used for GitHub Stats
  linkedin: "naufalandr",
  bio: "Your bio...",
  resumeUrl: "https://...",
};
```

| Export       | Description                             |
| ------------ | --------------------------------------- |
| `personal`   | Name, role, bio, social links, location |
| `stats`      | Hero stats (years, projects, GPA, etc.) |
| `skills`     | Skill categories and items              |
| `experience` | Work and education timeline entries     |

> Each project entry in `portfolio.js` must include a `slug` field matching its entry in `projects.json` and its MD filename in `content/projects/{lang}/`. Without it, clicking a card auto-generates a slug from the title which may not match.

### Projects `src/data/projects.json`

Project list used across all pages. Each entry requires a `slug` field which links to its Markdown file:

```json
{
  "id": 1,
  "slug": "servisyuk",
  "year": "2026",
  "title": "ServisYuk",
  "shortDesc": "Short description for the card.",
  "desc": "Longer description shown on the detail page hero.",
  "tags": ["Next.js 15", "TypeScript", "Supabase"],
  "type": "Full Stack",
  "link": "https://your-demo.vercel.app",
  "repo": "https://github.com/naufalnak/your-repo",
  "featured": true,
  "image": "/projects/servisyuk.png"
}
```

**Valid `type` values:** `AI` · `Full Stack` · `Backend` · `Mobile` · `Design` · `Education`

### Project Detail Pages `src/content/projects/{lang}/*.md`

Each project has a bilingual Markdown writeup rendered on its detail page at `/projects/:slug`. The detail page includes an **EN / ID language toggle** so users can switch between English and Indonesian without reloading.

Create two files per project:

```
src/content/projects/en/servisyuk.md
src/content/projects/id/servisyuk.md
```

If no `.md` file exists for a given language, a placeholder is shown instead. Default language on page load is **ID**.

### GitHub Stats

GitHub Stats load automatically using your `personal.github` username. No API key or configuration required powered by the public [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) service.

### Contact Form

The contact form uses **EmailJS**. Add your credentials to `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## ✦ Available Scripts

| Script            | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start development server on `0.0.0.0:5173` |
| `npm run build`   | Build for production                       |
| `npm run preview` | Preview production build                   |
| `npm run check`   | Build + audit dependencies                 |

## ✦ License

MIT feel free to use, modify, and deploy as your own portfolio.

<p align="center">
  Built with React + Vite · Tokyo Neobrutalism
</p>
