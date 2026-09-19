# SolveMpire — Marketing & Portfolio Website

Official marketing website and engineering portfolio for **SolveMpire Private Limited** (`U62013AP2025PTC122808`), built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, and GSAP.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme` tokens & fluid typography
- **Motion & Scrubbing**: GSAP 3 & ScrollTrigger (Hardware-composited `quickSetter` architecture)
- **Validation**: [Zod](https://zod.dev/) for server-side form validation
- **Type Safety**: TypeScript 5+

---

## 📁 Information Architecture

```
/                          Homepage (Server component composing performance-tuned sections)
/work                      Portfolio Index (All 6 case studies)
/work/[slug]               Individual Case Study Deep-Dives (SSG with generateStaticParams)
/services                  Engineering Disciplines & Capabilities (#mechanical, #electronics, #hmi, #cloud)
/about                     About Us, Leadership Team & Operating Model
/contact                   Interactive Scoping Call Inquiry Form
/privacy                   Privacy Policy
/terms                     Terms of Service
/sitemap.xml               Dynamic XML Sitemap
/robots.txt                Robots Configuration
/opengraph-image           Edge-rendered OpenGraph Image
```

---

## 🛠 Content Management Guide

All content is strongly typed and centralized:

- **Case Studies**: [`src/content/case-studies.ts`](src/content/case-studies.ts)
  Add or edit case studies, metrics, engineering sections, and deliverables.
- **Team**: [`src/content/team.ts`](src/content/team.ts)
  Manage leadership profiles, roles, and headshots.
- **Disciplines & Pillars**: [`src/content/services.ts`](src/content/services.ts)
  Configure engineering capabilities, tools, and Why Partner pillars.
- **Entity Facts & Contacts**: [`src/lib/company.ts`](src/lib/company.ts)
  Single source of truth for company name, CIN, addresses, and emails.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and set required keys:
```bash
cp .env.example .env.local
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Code Linting
```bash
npm run lint
```

---

## 📄 License & Ownership

© SolveMpire Private Limited. All rights reserved.
