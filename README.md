# Aaron Fleshner — Personal Portfolio & Resume

> **Lead Software Engineer (Android Focus)** based in Durham, NC.  
> Personal website, career timeline, and project showcase built with modern Vue 3 and TypeScript.

---

## ⚡ Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)
- **Design System:** Custom CSS design system with Dark / Light theme switching (persisted via `localStorage` and OS preference)

---

## 🚀 Key Features

- **Single Page Application:** Fast client-side routing across Home, Projects, About & Resume, and Contact.
- **Dynamic Project Filtering:** Real-time search across titles, descriptions, and technology tags, with category pill filters.
- **About & Career Timeline:** Complete career history, education, and skill breakdown.
- **One-Click PDF Resume Export:** Print-optimized stylesheet (`@media print`) that formats the About page into a clean resume.
- **Honeypot Anti-Spam Contact Form:** Form protection featuring invisible honeypot trap inputs, velocity check, and mail dispatch.
- **Data-Driven Architecture:** All profile information, work history, projects, and skills are centralized in [`src/data/portfolio.ts`](src/data/portfolio.ts).

---

## 🛠️ Local Development

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npm run type-check

# Compile production build
npm run build
```

---

## 📁 Project Structure

```
├── public/                 # Static assets & favicons
├── src/
│   ├── assets/             # Global CSS and design tokens
│   ├── components/         # Reusable Vue components (NavBar, FooterBar, ProjectCard)
│   ├── composables/        # Theme toggle & state helpers
│   ├── data/               # Central portfolio data (portfolio.ts)
│   ├── router/             # Vue Router configuration
│   ├── views/              # Page views (Home, Projects, About, Contact)
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite build config
└── package.json
```

---

## 👤 Author

- **Aaron Fleshner**
- **GitHub:** [@adfleshner](https://github.com/adfleshner)
- **LinkedIn:** [aaron-fleshner-60233750](https://www.linkedin.com/in/aaron-fleshner-60233750/)

