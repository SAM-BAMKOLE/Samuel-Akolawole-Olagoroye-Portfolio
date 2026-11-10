/**
 * All site copy lives here. Items marked DUMMY are placeholders —
 * replace with real content later. Everything else comes from the CV.
 * Images are Unsplash placeholders — swap for real screenshots.
 */
const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const personalImg = (id: string, w = 1400) => `/${id}?w=${w}&q=80`;

export const profile = {
  name: "Samuel Olagoroye",
  shortName: "Samuel",
  role: "Fullstack Developer",
  location: "Nigeria / UK",
  email: "olagoroyesamuelakolawole@gmail.com",
  github: "https://github.com/SAM-BAMKOLE",
  linkedin: "https://linkedin.com/in/samuel-olagoroye-bamicole",
  cv: "/Samuel_Olagoroye_Fullstack_Developer_CV.pdf", // file lives in public/ — replace it to update the CV
  year: new Date().getFullYear(),
};

export const hero = {
  eyebrow: "Fullstack developer · Nigeria / UK",
  title: "Fullstack products that are fast, reliable and built to scale.",
  sub: "I'm Samuel. Over 3 years I've shipped client websites, SaaS platforms and APIs that real users depend on, from first Figma frame to production on AWS.",
  images: [
    {
      src: personalImg("my-portrait-2.jpg", 900),
      alt: "Olagoroye Samuel's Portrait Picture",
    },
    {
      src: personalImg("my-portrait-1.jpg", 900),
      alt: "Olagoroye Samuel's Portrait Picture",
    },
  ],
};

export const statement =
  "Good software isn't only shipped. It loads fast on a weak connection, stays correct under load, and is easy for the next developer to extend.";

export const stats = [
  { value: 130, suffix: "%+", label: "Lift in registration conversion" },
  { value: 71, suffix: "%", label: "Faster page-load time" },
  { value: 58, suffix: "%", label: "Better median API response" },
  { value: 15, suffix: "k+", label: "Users on a platform I improved" },
];

export const projects = [
  {
    title: "Capital Consult HQ",
    kind: "Corporate website",
    description:
      "Conversion-focused website for a consulting firm, built from Figma with a CMS so the team can publish without a developer.",
    tags: ["Next.js", "Contentful", "Vercel"],
    image: img("photo-1454165804606-c3d57bc86b40"),
    href: "https://capitalconsulthq.com",
  },
  {
    title: "EvridayMoni",
    kind: "Fintech · UX + performance",
    description:
      "Redesigned the registration flow, lifting registration conversion from 32% to 55% and first-time completion from 30% to 68%.",
    tags: ["React", "NestJS", "PostgreSQL"],
    image: img("photo-1563013544-824ae1b704d3"),
    href: "#", // DUMMY: add link or case study
  },
  {
    title: "Routiq Logistics",
    kind: "Multi-tenant SaaS",
    description:
      "Logistics and delivery management with tenant isolation via PostgreSQL Row-Level Security, Redis caching and an event-driven backend.",
    tags: ["NestJS", "PostgreSQL RLS", "Redis"],
    image: img("photo-1586528116311-ad8dd3c8310d"),
    href: "https://github.com/SAMBAMKOLE/routiq-logistics-and-delivery",
  },
  {
    title: "Atlas Team Management",
    kind: "Project management SaaS",
    description:
      "Team and task management platform with role-based access control, transactional outbox and automated email workflows.",
    tags: ["NestJS", "React", "RBAC"],
    image: img("photo-1531403009284-440f080d1e12"),
    href: "https://github.com/SAM-BAMKOLE/atlas-team-management-web",
  },
  {
    title: "Quicklink",
    kind: "URL shortener + analytics",
    description:
      "Fast link shortener with click analytics, rate limiting and a clean dashboard.",
    tags: ["Next.js", "PostgreSQL", "Redis"],
    image: img("photo-1558494949-ef010cbdcc31"),
    href: "#", // DUMMY
  },
  {
    title: "Secure Secret Share",
    kind: "Developer tool",
    description:
      "Share environment variables and secrets with your team through one-time, expiring links.",
    tags: ["TypeScript", "Encryption", "Node.js"],
    image: img("photo-1563986768609-322da13575f3"),
    href: "#", // DUMMY
  },
];

export const services = [
  {
    title: "Frontend Engineering",
    text: "Responsive, accessible interfaces in React and Next.js that turn Figma designs into polished product. Loading, empty and error states are handled, not forgotten.",
    points: [
      "React · Next.js · Vue",
      "Performance & Lighthouse tuning",
      "Design systems with shadcn/ui",
    ],
    image: img("photo-1547658719-da2b51169166", 1100),
  },
  {
    title: "Backend & APIs",
    text: "Typed REST and GraphQL APIs with validation, auth, rate limiting and documentation that other developers actually enjoy using.",
    points: [
      "NestJS · Express · Node.js",
      "JWT, OAuth 2.0, RBAC",
      "Webhooks, queues, BullMQ",
    ],
    image: img("photo-1518770660439-4636190af475", 1100),
  },
  {
    title: "Data & Architecture",
    text: "Relational schemas, migrations, indexes and transaction-safe workflows for orders, invoices and audit trails, designed to scale past launch day.",
    points: [
      "PostgreSQL · MySQL · MongoDB",
      "Redis caching",
      "Multi-tenancy & Row-Level Security",
    ],
    image: img("photo-1544383835-bda2bc66a55d", 1100),
  },
  {
    title: "Delivery & DevOps",
    text: "Containerised services, CI/CD that runs lint, tests and deploys, and zero-downtime releases so shipping stops being scary.",
    points: [
      "Docker · GitHub Actions",
      "AWS EC2, S3, RDS · Nginx",
      "Monitoring & production support",
    ],
    image: img("photo-1667372393119-3d4c48d07fc9", 1100),
  },
];

export const experience = [
  {
    period: "2023 — Present",
    role: "Fullstack Developer",
    company: "PHOS Consults Ltd · Nigeria & UK",
    points: [
      "Delivered 10+ client websites and platforms across consulting, e-commerce and professional services within four months.",
      "Lifted Lighthouse performance from 54 to 91 and cut load time from 4.2s to 1.6s.",
      "Cut deployment time from 40 to 7 minutes with Docker, GitHub Actions and zero-downtime releases on AWS EC2.",
      "Integrated Paystack and Flutterwave with signed webhooks and idempotency keys, keeping failed or duplicate transactions under 0.4% on ₦35M+ processed.",
      "Reduced p95 API latency from 1.9s to 480ms with Redis and BullMQ background jobs.",
      "Raised test coverage from 22% to 78%, cutting post-release defects by 45%.",
    ],
  },
  {
    period: "2026",
    role: "B.Sc. Computer Science",
    company: "Federal University Oye-Ekiti, Nigeria",
    points: [
      "FreeCodeCamp: JavaScript Algorithms & Data Structures",
      "IBM: Cloud Native, DevOps, Agile & NoSQL",
    ],
  },
];

export const stack = [
  [
    "TypeScript",
    "React",
    "Next.js",
    "Astro",
    "Vue.js",
    "Tailwind CSS",
    "GSAP",
    "shadcn/ui",
    "Zustand",
    "React Query",
  ],
  [
    "Node.js",
    "NestJS",
    "Express",
    "GraphQL",
    "PostgreSQL",
    "Redis",
    "Prisma",
    "Docker",
    "AWS",
    "GitHub Actions",
  ],
];

export const faqs = [
  {
    q: "What do you need to get started?",
    a: "A short call to understand the goals, users and constraints. Then I send a scoped proposal with timeline and milestones. Once we agree, we start right away.", // DUMMY
  },
  {
    q: "How do we communicate during a project?",
    a: "Email, WhatsApp or Slack plus short video calls at key decisions. You get regular written updates and a staging link early, so there are no surprises.", // DUMMY
  },
  {
    q: "Can you join an existing codebase?",
    a: "Yes. I regularly pick up existing projects, audit them, add tests and CI, then ship features safely on top.", // DUMMY
  },
  {
    q: "What does a typical project cost?",
    a: "It depends entirely on scope. A landing page and a multi-tenant SaaS are very different. Book a call for a quick estimate.", // DUMMY
  },
  {
    q: "Which stack do you prefer?",
    a: "TypeScript end to end: React or Next.js on the front, NestJS and PostgreSQL on the back, deployed with Docker on AWS. I choose the simplest tool that fits the problem.",
  },
];

/**
 * Full-width showcase section. Put your own photo at public/images/samuel.jpg
 * (landscape, ~2400px wide) and point `image` at "/images/samuel.jpg".
 * Optional: add a short muted loop at public/videos/intro.mp4 and set `video`.
 */
export const showcase = {
  image: img("photo-1519085360753-af0119f7cbe7", 2400), // DUMMY: replace with your own photo
  video: "/portrait-video.webm", // e.g. "/videos/intro.mp4" — leave empty for image only
  alt: "Portrait of Samuel Olagoroye",
  eyebrow: "About me",
  title: "Hi, I'm Samuel.",
  text: "A fullstack developer who cares about the details users feel: fast pages, clear flows and APIs that don't fall over. I like turning messy requirements into software people trust.", // DUMMY wording
  facts: [
    { label: "Based in", value: "Nigeria" },
    { label: "Works with", value: "Teams in Nigeria & the UK" },
    { label: "Experience", value: "3+ years shipping to production" },
  ],
};
