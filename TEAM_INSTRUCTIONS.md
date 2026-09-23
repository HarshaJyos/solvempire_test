# SolveMpire Team Management Playbook for Antigravity Agents

> **Instructions for AI Agents**: Whenever adding, modifying, or updating team members on the SolveMpire codebase, follow this playbook strictly to maintain consistency across the team directory, profile dossiers, JSON-LD schemas, sitemaps, and author attributions.

---

## 1. Single Source of Truth & Architecture

The team management system is centralized. When a team member is added or modified in the single source of truth, all relevant pages (`/team`, `/about`, `/team/[slug]`, and `/sitemap.xml`) automatically update dynamically.

| File / Location | Purpose |
|---|---|
| `public/avatars/` | Image directory storing member portraits (`.webp`, `.png`, `.jpg`, `.jpeg`). |
| `src/lib/team-data.ts` | **Primary Data Source**: Exports `teamMembers: TeamMember[]`, `getTeamMember(slug)`, and `getAllTeamMembers()`. |
| `src/types/team.ts` | TypeScript interface defining the `TeamMember` structure. |
| `src/lib/seo.ts` | Contains `buildOrganizationJsonLd` (lists all team members for Schema.org) and `buildPersonJsonLd`. |
| `src/app/team/page.tsx` | Main Team Directory page (renders all members dynamically via `getAllTeamMembers()`). |
| `src/app/about/page.tsx` | About page leadership grid (renders members dynamically via `getAllTeamMembers()`). |
| `src/app/team/[slug]/page.tsx` | Dynamic Individual Profile Dossier (uses `generateStaticParams` to statically pre-render all profile pages). |
| `src/app/sitemap.ts` | Automatically generates dynamic sitemap XML entries for all team profile URLs. |

---

## 2. Current Team Roster (Reference Baseline)

| Slug | Name | Role | Avatar | Socials | Focus Areas |
|---|---|---|---|---|---|
| `hanish-jyosyabhatla` | **Hanish Jyosyabhatla** | Founder & CEO | `/avatars/hanish.webp` | **LinkedIn**: [Profile](https://www.linkedin.com/in/hanish-jyosyabhatla/)<br>**Email**: `hanish@solvempire.com` | End-to-End Product Engineering, Mechanical CAD & DFM, Embedded Systems & Firmware, Hardware Architecture, Executive Leadership |
| `lohith-medisetti` | **Lohith Medisetti** | Co-Founder & COO | `/lohith.webp` | **LinkedIn**: [Profile](https://www.linkedin.com/in/lohith-medisetti-0a9979268/)<br>**Email**: `lohith@solvempire.com` | Operations & Supply Chain, Manufacturing Execution, Vendor Qualification, Logistics & Quality Assurance, Commercial Strategy |
| `teja-mandapalli` | **Teja Mandapalli** | Co-Founder & Product Lead | `/teja.webp` | **Email**: `teja@solvempire.com` | Product Conceptualization, Mechanical Packaging & CAD, Rapid Prototyping, User Experience (UX), Design Validation |
| `pavan-kumar-duggirala` | **Pavan Kumar Duggirala** | Product Strategist & Marketing | `/avatars/pavan.jpg` | **LinkedIn**: [Profile](https://www.linkedin.com/in/duggirala-venkata-pavan-kumar-8754912b1/)<br>**Email**: `7pavankumar9@gmail.com` | Product Strategy, Technical Marketing, Go-To-Market Execution, Client Roadmaps, Engineering Communications |
| `prasad-duggirala` | **Prasad Duggirala** | AI/ML Engineer | `/avatars/prasad.png` | **LinkedIn**: [Profile](https://www.linkedin.com/in/prasad-duggirala/)<br>**Email**: `djnanasatyaprasad@gmail.com` | Edge AI & Computer Vision, Machine Learning Telemetry, Embedded Anomaly Detection, Sensor Fusion, Predictive Maintenance |
| `gayathri-boyapati` | **Gayathri Boyapati** | Electronics Engineer, PCB & VLSI Specialist | `/avatars/gayatri.jpeg` | **LinkedIn**: [Profile](https://www.linkedin.com/in/gayathri-boyapati-384b72402)<br>**Email**: `boyapatigayathri77@gmail.com` | Custom Multilayer PCB Design, KiCad Schematics & High-Speed Routing, Power Electronics & Buck Regulators, VLSI & Silicon Architecture, Signal Integrity & EMC Compliance |
| `bhuvana-sarika-ch` | **Bhuvana Sarika Ch** | HR & Lead Management | `/avatars/sarika.webp` | **LinkedIn**: [Profile](https://www.linkedin.com/in/bhuvana-sarika-ch-225177258/)<br>**Email**: `chbsarika@gmail.com` | HR Management & Talent Acquisition, Lead Management & Client Intake, Organizational Operations, Team Enablement & Culture, Client Relationship Management |

---

## 3. Step-by-Step Workflow for Adding a New Team Member

When instructed to add a new team member:

### Step 1: Save the Portrait / Avatar Asset
- Save the image to `public/avatars/<slug-friendly-name>.<ext>` (prefer `.webp` or `.png`).
- Ensure high-resolution, centered headshot.

### Step 2: Add Entry to `src/lib/team-data.ts`
Append a new typed `TeamMember` object to the `teamMembers` array in `src/lib/team-data.ts`:

```ts
{
  slug: "first-last",
  name: "Full Name",
  role: "Official Professional Role",
  avatar: "/avatars/first-last.webp",
  shortBio: "1-2 sentence executive summary of their role and contribution at SolveMpire.",
  location: "Kakinada, Andhra Pradesh, India", // or appropriate city
  story: [
    "Paragraph 1: Background, core domain responsibilities, and technical leadership at SolveMpire.",
    "Paragraph 2: Specific tools, methodologies, and engineering/operational impact.",
    "Paragraph 3: How they collaborate across hardware, firmware, operations, or client initiatives.",
  ],
  focusAreas: [
    "Skill / Discipline 1",
    "Skill / Discipline 2",
    "Skill / Discipline 3",
    "Skill / Discipline 4",
    "Skill / Discipline 5",
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/username/", // if available
    email: "email@domain.com",
    github: "https://github.com/username", // optional
    twitter: "https://x.com/username", // optional
  },
}
```

### Step 3: Register in Schema.org (`src/lib/seo.ts`)
Add the new member to the `founder` / team array inside `buildOrganizationJsonLd()` in `src/lib/seo.ts`:

```ts
{
  "@type": "Person",
  name: "Full Name",
  jobTitle: "Official Professional Role",
  url: `${BASE_URL}/team/first-last`,
}
```

### Step 4: Verify with Build Test
Run the production build in PowerShell:
```powershell
npm run build
```
Verify that:
- `/team/first-last` route compiles statically.
- Total pages in build output increments by 1.
- No TypeScript or image path errors occur.

### Step 5: Commit & Push to GitHub
```powershell
git add . ; git commit -m "feat(team): add <Full Name> (<Role>) to team directory, schema, and sitemap"
git push origin master
```
