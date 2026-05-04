// ============================================================
// EDIT DATA INI SESUAI PROFIL ANDA
// ============================================================

export const personal = {
  name: "Naufal Andresya Kholish",
  firstName: "Naufal",
  lastName: "Andresya Kholish",
  role: "Full Stack & Mobile Developer",
  location: "Jabodetabek, Indonesia",
  email: "naufal.ndak17@gmail.com",
  github: "naufalnak", // username GitHub (tanpa @)
  linkedin: "naufalnak",
  twitter: "...", // opsional
  bio: "I build scalable systems and elegant interfaces. 4+ years crafting backend infrastructure, full-stack products, and cross-platform mobile apps that serve millions.",
  bioExtended:
    "Specializing in distributed systems, RESTful API design, and high-performance backend architecture. I care deeply about clean code, developer experience, and building products that last.",
  availability: true,
  resumeUrl:
    "https://drive.google.com/file/d/1-FO-in0keMau3afb8fMK9VV2r23PFR0J/view?usp=sharing",
  yearStarted: 2020,
};

export const stats = [
  { value: "4+", label: "Years" },
  { value: "30+", label: "Projects" },
  { value: "10M+", label: "Users" },
  { value: "3", label: "OSS Libs" },
];

export const skills = [
  {
    category: "Backend",
    items: [
      "Node.js",
      "Go",
      "Python",
      "Laravel",
      "GraphQL",
      "REST API",
      "gRPC",
      "WebSockets",
    ],
  },
  {
    category: "Mobile",
    items: [
      "Flutter",
      "React Native",
      "Kotlin",
      "Firebase",
      "App Store",
      "Play Store",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    category: "Infrastructure",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "CI/CD",
    ],
  },
];

export const projects = [
  {
    id: 1,
    year: "2024",
    title: "NexaCore Gateway",
    desc: "High-performance API gateway handling 10k+ req/sec with rate limiting, distributed auth, and real-time monitoring.",
    tags: ["Go", "Redis", "PostgreSQL", "Docker"],
    type: "Backend",
    link: "#",
    repo: "#",
    featured: true,
  },
  {
    id: 2,
    year: "2024",
    title: "PulseTrack Mobile",
    desc: "Cross-platform fitness tracker with real-time GPS, workout analytics, and social feed. 5k+ downloads.",
    tags: ["Flutter", "Firebase", "Node.js"],
    type: "Mobile",
    link: "#",
    repo: "#",
    featured: true,
  },
  {
    id: 3,
    year: "2023",
    title: "CloudSync Platform",
    desc: "SaaS file collaboration with real-time sync, versioning, and granular team permissions.",
    tags: ["Next.js", "Laravel", "AWS S3", "WebSockets"],
    type: "Full Stack",
    link: "#",
    repo: "#",
    featured: true,
  },
  {
    id: 4,
    year: "2023",
    title: "EventStream MSA",
    desc: "Event-driven microservices with Kafka, service mesh, and distributed tracing via Jaeger.",
    tags: ["Node.js", "Kafka", "Kubernetes"],
    type: "Backend",
    link: null,
    repo: "#",
    featured: false,
  },
  {
    id: 5,
    year: "2022",
    title: "DevFlow CLI",
    desc: "Go-based developer productivity tool — scaffolding, git hooks, automated code reviews.",
    tags: ["Go", "Shell", "GitHub API"],
    type: "Tooling",
    link: null,
    repo: "#",
    featured: false,
  },
  {
    id: 6,
    year: "2022",
    title: "ShopRocket",
    desc: "Multi-vendor marketplace with payment gateway, live inventory, and Flutter mobile app.",
    tags: ["Laravel", "Flutter", "Stripe", "MySQL"],
    type: "Full Stack",
    link: "#",
    repo: "#",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    period: "2023 — Now",
    role: "Senior Backend Engineer",
    company: "TechNova Corp",
    desc: "Lead microservices architecture for platform serving 2M+ users. 60% query optimization, 35% infra cost reduction.",
    stack: ["Go", "PostgreSQL", "Kafka", "Kubernetes", "AWS"],
    type: "work",
  },
  {
    id: 2,
    period: "2021 — 2023",
    role: "Full Stack Developer",
    company: "Startup Ventures",
    desc: "Built end-to-end SaaS features and Flutter mobile app from scratch. 4.8★ App Store rating.",
    stack: ["Node.js", "React", "Flutter", "MongoDB"],
    type: "work",
  },
  {
    id: 3,
    period: "2020 — 2021",
    role: "Backend Developer",
    company: "Digital Agency X",
    desc: "REST APIs and third-party integrations for 10+ client projects across e-commerce and fintech.",
    stack: ["Laravel", "MySQL", "Redis"],
    type: "work",
  },
  {
    id: 4,
    period: "2016 — 2020",
    role: "B.Sc. Computer Science",
    company: "University of Indonesia",
    desc: "Thesis on microservices scalability patterns. Dean's List 3× consecutive semesters.",
    stack: [],
    type: "edu",
  },
];
