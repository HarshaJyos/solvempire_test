# SolveMpire Engineering Journal & Content Playbook for Antigravity Agents

> **Instructions for AI Agents**: Whenever starting a new session/chat to author new engineering journals, update team information, or modify catalog pagination on the SolveMpire codebase, follow this playbook strictly to maintain architectural consistency, schedule cadence, formatting standards, and verification procedures.

---

## 1. Codebase Architecture & Key File Locations

| File / Directory | Purpose & Responsibility |
|---|---|
| `src/data/blogs/` | Individual blog article data files (TypeScript, typed with `BlogArticleData` from `@/types/blog-article`). |
| `src/data/blogs/index.ts` | Central registry (`allBlogs` array). Every blog MUST be imported and registered here in chronological order (oldest to newest). |
| `src/data/manifest.json` | Stores `totalPages`, `totalPosts`, `postsPerPage: 4`, category lists, and type lists. |
| `src/data/page-1.json` ... `page-N.json` | Pre-bundled JSON page chunks for client pagination. Each file contains `{ page, totalPages, totalPosts, posts: [...] }` with max 4 posts in **reverse-chronological order**. |
| `src/lib/journal-data.ts` | Server/Client data loading functions (`pageChunks`, `filterAndSortPosts`, `getAllJournalPosts`, etc.). Must import all `page1Data`..`pageNData`. |
| `src/components/journal/JournalDirectoryClient.tsx` | Main interactive journal directory UI (uses `const POSTS_PER_PAGE = 4`). |
| `src/content/team.ts` & `src/lib/team-data.ts` | Single source of truth for leadership and engineering team profiles, bios, focus areas, and socials. |
| `public/llms.txt` | LLM discovery dossier detailing company facts, leadership, disciplines, and deployed case studies. |

---

## 2. Team Directory & Author Attribution Rules

Always attribute articles to team members matching their authentic domain specialties:

| Author Name | Role & Avatar | Domain Specialties | Socials / Contact |
|---|---|---|---|
| **Gayathri Boyapati** | Electronics Engineer, PCB & VLSI Specialist (`/avatars/gayatri.jpeg`, slug: `gayathri-boyapati`) | Custom multilayer KiCad PCBs, high-speed differential routing, power electronics, buck converters, real-time embedded firmware, FreeRTOS, VLSI circuit architecture. | **LinkedIn**: `https://www.linkedin.com/in/gayathri-boyapati-384b72402`<br>**Email**: `boyapatigayathri77@gmail.com` |
| **Hanish Jyosyabhatla** | Founder & CEO (`/avatars/hanish.webp`, slug: `hanish-jyosyabhatla`) | End-to-end product engineering, systems architecture, embedded controllers, dynamic UPI payments, cloud telemetry, commercial execution. | **LinkedIn**: `https://www.linkedin.com/in/hanish-jyosyabhatla/`<br>**Email**: `hanish@solvempire.com` |
| **Lohith Medisetti** | Co-Founder & COO (`/lohith.webp`, slug: `lohith-medisetti`) | Industrial automation machinery, factory supply chain, DFM validation, CNC manufacturing, kinematics, machine commissioning, assembly lines. | **LinkedIn**: `https://www.linkedin.com/in/lohith-medisetti-0a9979268/`<br>**Email**: `lohith@solvempire.com` |
| **Teja Mandapalli** | Co-Founder & Product Lead (`/teja.webp`, slug: `teja-mandapalli`) | Mechanical 3D CAD (Autodesk Fusion 360), DFM sheet metal bending & injection tooling, IP65/IP67 enclosure sealing, industrial ergonomics, HMI UI/UX. | **Email**: `teja@solvempire.com` |
| **Pavan Kumar Duggirala** | Product Strategist & Marketing (`/avatars/pavan.jpg`, slug: `pavan-kumar-duggirala`) | Product strategy, technical marketing, client roadmaps, engineering narratives. | **LinkedIn**: `https://www.linkedin.com/in/duggirala-venkata-pavan-kumar-8754912b1/`<br>**Email**: `7pavankumar9@gmail.com` |
| **Prasad Duggirala** | AI/ML Engineer (`/avatars/prasad.png`, slug: `prasad-duggirala`) | Edge AI, computer vision, sensor fusion, predictive maintenance algorithms. | **LinkedIn**: `https://www.linkedin.com/in/prasad-duggirala/`<br>**Email**: `djnanasatyaprasad@gmail.com` |

> **Co-Authoring Guidelines**: When an article bridges mechanics, electronics, or firmware (e.g. Electromechanical Co-Design, IP65 Enclosures, Payment Kiosks), always list the primary specialist as `author` and relevant leads as `coAuthors`.

---

## 3. Mandatory Editorial & Technical Standards

1. **Strict 2-Day Publication Cadence**:
   - The first blog (`what-is-end-to-end-product-engineering`) is dated **`Jul 01, 2026`**.
   - Every subsequent blog MUST have an exact **2-day gap**:
     - Post 1: `Jul 01, 2026`
     - Post 2: `Jul 03, 2026`
     - Post 3: `Jul 05, 2026`
     - ...
     - Post 16: `Jul 31, 2026`
     - Post 17: `Aug 02, 2026`
     - Post 18: `Aug 04, 2026`
     - Post 19: `Aug 06, 2026` (calculate accordingly for future posts)
   - Ensure `isoDate` matches the format: `YYYY-MM-DDT00:00:00Z`.

2. **Only ONE Featured Article (Flagship Spotlight)**:
   - ONLY the newest published flagship post must be set to `featured: true`.
   - All previous articles MUST be set to `featured: false`.

3. **Indian Currency Formatting**:
   - ALL pricing, component costs, and BOM estimates MUST be in Indian Rupees (`₹`) using Indian numbering (e.g., `₹45 – ₹180`, `₹15,000`, `₹2.5 Lakh – ₹6.5 Lakh`, `₹15 Lakh`). Never use `$`.

4. **No Raw Unrendered LaTeX**:
   - Never output raw LaTeX syntax like `$J_{load}$` or `\frac{a}{b}`.
   - Use clean Unicode strings and clear math notation (e.g. `J_load / J_motor ≤ 5:1`, `ΔT ≤ 10°C`, `V_spike = -L · dI/dt`, `T = J · α`).

5. **Rich Article Schema & Section Depth**:
   Every blog file in `src/data/blogs/<slug>.ts` MUST contain:
   - `meta`: `id`, `slug`, `title`, `subtitle`, `excerpt`, `category`, `type`, `author`, `coAuthors` (optional array), `publishedAt`, `isoDate`, `readTime`, `tags`, `featured`.
   - `takeaways`: 5–6 high-density, authoritative engineering takeaway bullet points.
   - `tableOfContents`: 7–10 structured chapter headers (`{ id, title }`).
   - `sections`: Rich array of elements containing:
     - `lead`
     - `paragraph`
     - `heading` (levels 2 and 3)
     - `bullets`
     - `numbered`
     - `table` (with `caption`, `headers`, `rows`, and `highlightColumnIndex`)
     - `callout` (variants: `insight`, `warning`, `tip`, `science`)
     - `quote` (with `author` and `source`)
     - `divider`
     - `cta` (linking to `/contact`)
   - `faqs`: 4–5 deep technical questions and comprehensive engineering answers.

---

## 4. Step-by-Step Workflow for Adding New Journals

When the user asks for new journal articles (e.g., "next 2 journals X and Y"):

### Step 1: Create the TypeScript Blog Files
Create `src/data/blogs/<slug-1>.ts` and `src/data/blogs/<slug-2>.ts` with complete content, correct authors, 2-day date progression, and full technical rigor.

### Step 2: Register in Blog Index
Edit `src/data/blogs/index.ts`:
- Import the new blog constants.
- Append them to the `allBlogs` array in chronological order.

### Step 3: Update Manifest & Paginated JSON Chunks
- Calculate total posts `N` (e.g., 18 + 2 = 20) and total pages `P = Math.ceil(N / 4)`.
- Update `src/data/manifest.json`:
  ```json
  {
    "totalPages": 5,
    "totalPosts": 20,
    "postsPerPage": 4,
    ...
  }
  ```
- Distribute all posts into `page-1.json` through `page-P.json` (4 posts per page in reverse-chronological order):
  - `page-1.json`: Posts `[N, N-1, N-2, N-3]`
  - `page-2.json`: Posts `[N-4, N-5, N-6, N-7]`
  - ...
  - `page-P.json`: Oldest remaining posts down to `post-001`.
- If a new page (e.g. `page-5.json` or `page-6.json`) is created:
  - Create the file.
  - Import it in `src/lib/journal-data.ts` and add it to `pageChunks: Record<number, JournalPageChunk>`.

### Step 4: Verify with Production Build
Run `npm run build` in PowerShell:
```powershell
npm run build
```
Verify that all static/dynamic routes (`/journal/[slug]`, `/team/[slug]`, `/work/[slug]`, etc.) compile cleanly with 0 TypeScript/Turbopack errors.

### Step 5: Commit & Push to GitHub
Commit all modified and created files and push to remote:
```powershell
git add . ; git commit -m "feat(journal): add <Journal 1> and <Journal 2> articles with updated pagination"
git push origin master
```

---

## 5. Current 25-Journal Chronological Registry (Reference Baseline)

| # | ID | Slug | Published Date | Featured | Primary Author |
|---|---|------|----------------|----------|----------------|
| 1 | `post-001` | `what-is-end-to-end-product-engineering` | `Jul 01, 2026` | `false` | Hanish Jyosyabhatla |
| 2 | `post-002` | `how-to-develop-a-physical-product-from-idea-to-manufacturing` | `Jul 03, 2026` | `false` | Hanish Jyosyabhatla |
| 3 | `post-003` | `product-engineering-company-in-india` | `Jul 05, 2026` | `false` | Hanish Jyosyabhatla |
| 4 | `post-004` | `how-to-build-a-custom-automated-machine` | `Jul 07, 2026` | `false` | Hanish Jyosyabhatla |
| 5 | `post-005` | `mechanical-electronics-embedded-product-development` | `Jul 09, 2026` | `false` | Lohith Medisetti |
| 6 | `post-006` | `prototype-vs-production-what-changes` | `Jul 11, 2026` | `false` | Teja Mandapalli |
| 7 | `post-007` | `how-to-design-an-industrial-machine` | `Jul 13, 2026` | `false` | Lohith Medisetti |
| 8 | `post-008` | `how-to-develop-a-custom-pcb-for-an-industrial-machine` | `Jul 15, 2026` | `false` | Gayathri Boyapati |
| 9 | `post-009` | `how-embedded-firmware-controls-an-automated-machine` | `Jul 17, 2026` | `false` | Gayathri Boyapati |
| 10 | `post-010` | `how-to-design-an-industrial-hmi` | `Jul 19, 2026` | `false` | Teja Mandapalli |
| 11 | `post-011` | `how-to-integrate-payment-into-a-physical-machine` | `Jul 21, 2026` | `false` | Hanish Jyosyabhatla |
| 12 | `post-012` | `industrial-automation-product-development` | `Jul 23, 2026` | `false` | Lohith Medisetti |
| 13 | `post-013` | `from-cad-to-manufacturing-product-engineering-workflow` | `Jul 25, 2026` | `false` | Teja Mandapalli |
| 14 | `post-014` | `ip65-enclosure-design` | `Jul 27, 2026` | `false` | Teja Mandapalli |
| 15 | `post-015` | `pcb-and-enclosure-mechanical-design` | `Jul 29, 2026` | `false` | Gayathri Boyapati |
| 16 | `post-016` | `can-bus-vs-rs485-vs-uart` | `Jul 31, 2026` | `false` | Gayathri Boyapati |
| 17 | `post-017` | `ota-updates-for-industrial-machines` | `Aug 02, 2026` | `false` | Gayathri Boyapati |
| 18 | `post-018` | `remote-monitoring-for-industrial-machines` | `Aug 04, 2026` | `false` | Gayathri Boyapati |
| 19 | `post-019` | `engineering-a-commercial-helmet-sanitization-machine` | `Aug 06, 2026` | `false` | Hanish Jyosyabhatla |
| 20 | `post-020` | `ip65-automotive-sensor-design` | `Aug 08, 2026` | `false` | Gayathri Boyapati |
| 21 | `post-021` | `automotive-sensor-enclosure-design` | `Aug 10, 2026` | `false` | Teja Mandapalli |
| 22 | `post-022` | `ai-and-computer-vision-for-industrial-automation` | `Aug 12, 2026` | `false` | Prasad Duggirala |
| 23 | `post-023` | `how-to-choose-a-product-engineering-partner` | `Aug 14, 2026` | `false` | Hanish Jyosyabhatla |
| 24 | `post-024` | `cost-of-developing-an-industrial-machine-in-india` | `Aug 16, 2026` | `false` | Lohith Medisetti |
| 25 | `post-025` | `how-solvempire-takes-products-from-concept-to-deployment` | `Aug 18, 2026` | **`true`** | Hanish Jyosyabhatla |

*For Post 26 and onwards, continue with `Aug 20, 2026`, `Aug 22, 2026`, etc., maintaining the strict 2-day gap.*
