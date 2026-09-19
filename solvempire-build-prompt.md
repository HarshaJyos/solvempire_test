# SolveMpire Website — Full Rebuild Specification

You are working on the SolveMpire marketing website. This document is the complete
specification. Read all of it before writing code. Execute in the order given in
Section 14.

Repository: Next.js 16.3.5, React 19.2.8, Tailwind CSS v4, TypeScript, GSAP,
Lenis. Current state: a single `src/app/page.tsx` client component containing the
entire homepage, plus `src/app/layout.tsx`, `src/app/globals.css`,
`src/lib/theme.ts`.

---

## 0. GROUND RULES — read before every task

1. **Never invent a fact.** Every number, client name, date, capability, tool and
   outcome on this site must come from Section 3 of this document. If a section
   you are building needs a fact that is not in Section 3, leave a clearly marked
   `{{TODO: needs content}}` placeholder and list it in your final report. Do not
   fill the gap with plausible-sounding copy.
2. **Never upgrade a hedged claim.** Section 3 contains deliberately hedged
   phrasing ("engineered for IP65-level protection", "reportedly processed").
   Reproduce that phrasing exactly. Do not write "IP65 certified", "IP65 rated",
   "tested to IP65", "200,000 helmets processed" without "reportedly", or any
   variant that removes the hedge.
3. **Never name a restricted client or function.** Case study 01 must be referred
   to only as a "secure communications device" for an "international
   security-technology client". Do not use the words jammer, RF jamming, signal
   blocking, Yixing, or any client company name for that project anywhere in the
   codebase — including comments, alt text, file names, slugs, commit messages,
   and metadata.
4. **This is not a redesign.** The existing visual language (blue/off-white,
   Bricolage Grotesque headings, dot-matrix grid, blueprint SVGs, the arc dial,
   the folded process ribbon) is kept. You are fixing architecture, correctness,
   performance and content — not restyling.
5. **Every link must resolve.** By the end of this work there must be zero
   anchors pointing at IDs or routes that do not exist. This is an acceptance
   criterion, not a nice-to-have.
6. **Work in vertical slices and verify each.** After each numbered task in
   Section 14, run `npm run build` and `npm run lint` and fix everything before
   moving on. Do not batch all changes and build once at the end.

---

## 1. BRAND AND ENTITY FACTS

These are canonical. Replace every conflicting value currently in the codebase.

| Field | Value |
|---|---|
| Brand name (display, everywhere) | `SolveMpire` — capital S, capital M. Never "Solvempire", never "SOLVEMPIRE" except in `text-transform: uppercase` headings where the CSS does the work. |
| Legal name | SolveMpire Private Limited |
| CIN | U62013AP2025PTC122808 |
| Copyright line | `© {year} SolveMpire Private Limited. All rights reserved.` — **remove "Inc."**, it is factually wrong for an Indian private limited company |
| Primary contact email | `hello@solvempire.com` (replace `support@solvempire.com` in the header/CTA/contact positions; you may keep `support@` as a separate "Existing client support" line in the footer) |
| City | Kakinada, Andhra Pradesh, India |
| Full address | SFNO 244/3 D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, East Godavari, Andhra Pradesh, 533005, India |
| Maps URL | https://maps.app.goo.gl/Fksd6MhzFhw9WyT36 |

**Positioning — replace current copy.** The site currently says "Custom
software. Scalable platforms. Real-world impact.", which contradicts the
"Product Engineering Studio" eyebrow and undersells the portfolio. Use:

- Eyebrow: `PRODUCT ENGINEERING COMPANY`
- H1: `We Engineer Ideas Into Working Products.` (keep — it is accurate)
- Subhead: `Mechanical design, custom PCBs, embedded firmware, and the cloud
  platforms that run them. One team, from CAD to field support.`

**Footer CIN line.** Indian private limited companies are expected to display the
CIN. Add it as small muted text in the footer bottom bar next to the copyright.

---

## 2. INFORMATION ARCHITECTURE — required routes

The site is currently a single page with eleven dead anchors. Build this route
structure. Every nav and footer link must point to one of these, or be deleted.

```
/                          Homepage
/work                      Portfolio index — all 6 case studies as cards
/work/secure-comms-enclosure
/work/uss2-switcher
/work/freshpod-machine
/work/freshpod-platform
/work/freshpod-hmi
/work/eggora
/services                  Capabilities, grouped into 4 disciplines
/about                     Company + team + how we work
/contact                   Contact form page
/privacy                   Privacy policy
/terms                     Terms of service
```

Rules:
- All case-study pages are **server components**. Content lives in
  `src/content/case-studies.ts` as typed data; pages render it. No `"use client"`
  on any case study page.
- `/work/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`.
- Homepage nav: `Work` → `/work`, `Services` → `/services`, `About` → `/about`,
  `Process` → `/#process` (anchor on homepage, and this ID must exist),
  `Contact` → `/contact`.
- Delete the `#careers`, `#blog`, `#docs`, `#security` footer links entirely.
  You have no such pages and no content for them. Do not create stub pages.
- The homepage showcase "View Case Study" button links to the real
  `/work/<slug>` for the currently active project.

---

## 3. CONTENT — canonical data

Create `src/content/case-studies.ts` exporting a typed array. This is the single
source of truth for both the homepage showcase and the `/work` pages.

Suggested type:

```ts
export type CaseStudy = {
  slug: string;
  order: number;
  title: string;          // homepage card title
  category: string;       // eyebrow, uppercase
  client: string;
  status: string;
  summary: string;        // 1–2 sentences, homepage card
  metrics?: { label: string; value: string }[];
  highlights: string[];
  disciplines: string[];  // tags
  hero: { src: string; alt: string };
  sections: { heading: string; body: string }[];  // full case study
  outcomes: string[];
};
```

### 3.1 — Secure Communications Enclosure
- slug: `secure-comms-enclosure`
- title: `Secure Communications Device — Mechanical Product Design`
- category: `MECHANICAL PRODUCT ENGINEERING`
- client: `International security-technology client` **(never more specific)**
- status: `In commercial production`
- summary: Engineered a production-ready enclosure for a portable secure
  communications device — matching the footprint of a conventional power bank
  (90 × 60 × 25 mm) while housing a rechargeable battery, multiple RF modules,
  and a control PCB with no active cooling permitted.
- highlights:
  - 25 mm total thickness with full internal component packaging
  - Passive-only thermal management under a strict no-active-cooling requirement
  - Waterproof sealing via precision-mated lips and joints
  - Full production documentation: CAD, STEP, drawings, BOM, exploded assemblies
  - 4-year engineering support agreement; repeat projects from the same client
- disciplines: Mechanical Design, Thermal Engineering, Sealing, DFM, Fusion 360
- Full body sections — use this content verbatim, reformatted into the section
  structure:
  - **Overview:** Compact, production-ready mechanical enclosure for a portable
    handheld communications device for professional security applications. The
    brief was to hold the form factor of a conventional power bank while housing
    high-density electronics, an internal rechargeable battery, and multiple RF
    modules — all within a shell measuring 90 × 60 × 25 mm.
  - **Scope of Work:** Complete mechanical product design — industrial enclosure
    design, internal structural framework, PCB mounting architecture, battery
    compartment integration, display mounting, button placement and ergonomic
    layout, heat-dissipation vent design, waterproof sealing via lips and
    precision mating features, snap-fit and mechanical joint development, and
    structural reinforcement for vibration-free component retention.
  - **The Engineering Challenge:** The defining constraint was thickness — 25 mm
    or less total profile. Inside that envelope we packaged a 16650 rechargeable
    battery, multiple RF transducer modules, a control PCB, mechanical fastening
    features, and passive heat dissipation, while holding manufacturing
    tolerances and adequate wall thickness. Active cooling was explicitly
    prohibited, so thermal performance had to come from ventilation geometry
    alone without compromising the sealed, rigid assembly.
  - **Design & Development:** Developed in Autodesk Fusion; approximately 12–15
    custom mechanical components. Deliverables: native CAD, STEP models,
    production and assembly drawings, exploded assembly views, DXF files, full
    BOM, rendering assets, assembly documentation.
  - **Prototype & Manufacturing:** Functional prototype 3D printed to validate
    fit, assembly and component integration, followed by two mechanical design
    revisions before final approval. Finalized design entered commercial
    production, with an initial manufacturing batch completed and additional
    units subsequently ordered.
  - **Collaboration:** Executed alongside RF engineering, electronics and
    industrial design teams, the manufacturing partner, and the client's own
    engineering team.
- outcomes:
  - Achieved 25 mm enclosure thickness while accommodating all internal components
  - Delivered complete manufacturing documentation for production
  - Commercial production initiated, followed by a larger production order
  - Secured a four-year engineering support agreement
  - Led to additional engineering projects from the same international client

### 3.2 — USS2 Switcher
- slug: `uss2-switcher`
- title: `USS2 Switcher — Compact Automotive Sensor Housing`
- category: `AUTOMOTIVE MECHANICAL ENGINEERING`
- client: `Automotive client, Yixing, China`
- status: `Design approved, prototype validated, production tooling complete`
- metrics: Target volume `10,000+ units` · Support `4-year agreement` ·
  Prototypes `5`
- summary: Re-architected a client's box-type sensor concept into a fully sealed
  cylindrical housing — 18 mm diameter, 75 mm length — integrating a PCB, sensor
  assembly, wiring, and threaded automotive mounting inside one of the tightest
  packaging envelopes we've engineered.
- highlights:
  - 18 mm × 75 mm envelope housing an 11 × 66 mm PCB, sensor, and wiring harness
  - O-ring sealing system engineered for IP65-level protection under extreme size constraints
  - Vibration-resistant internal rib structure, validated through internal testing
  - Five prototype iterations from first fit-check to production-ready tooling
- disciplines: Mechanical Design, Sealing, Vibration, Injection Moulding DFM, Automotive Packaging
- Full body sections:
  - **Overview:** USS2 Switcher Model 1 is a compact automotive sensing device
    designed to detect objects within roughly 1 m at a 5° detection angle, with
    a 1 cm blind area, installed directly into a vehicle via a threaded
    cylindrical housing. The client originally provided a box-type concept and
    requested a fundamentally different mechanical architecture: a compact,
    threaded cylindrical enclosure integrating sensor, PCB, wiring and mounting
    within an 18 mm maximum diameter, protected against environmental exposure.
  - **The Engineering Challenge:** Packaging a complete electronic assembly into
    an 18 mm × 75 mm cylindrical envelope — an 11 × 66 mm PCB, sensor assembly,
    internal wiring, mounting structure, sealing system, fasteners and
    manufacturing tolerances — while surviving automotive vibration and
    providing a sealed interface suitable for IP65-level protection.
  - **Mechanical Design:** Developed around the client-provided PCB: cylindrical
    outer enclosure, internal structural framework, PCB and sensor mounting,
    cable routing, threaded automotive mounting interface, brackets and internal
    supports, O-ring sealing system, service/assembly access, and
    injection-molding-oriented ribs and snap-fit features. Approximately 2 mm
    wall thickness with internal ribs for rigidity within the limited volume.
  - **Sealing & Vibration Engineering:** A silicone O-ring at the sensor
    interface — approximately 1.2 mm cross-section in a 0.8 × 1.4 mm sealing
    groove, engineered for roughly 15–30% compression while accounting for
    manufacturing tolerances and the limited diameter available. The enclosure
    was designed for IP65-level protection, with internal testing performed by
    our engineering team; **formal laboratory validation is ongoing.** For
    vibration resistance the PCB was mechanically supported using screw-mounted
    internal structures with additional elastomeric support, reinforced by
    internal ribs. During internal vibration testing the rib structure kept the
    PCB assembly constrained even under conditions where fastener loosening was
    observed — the architecture was built to control component movement under
    vibration, not merely to hold the electronics in place.
  - **Prototype Development & Manufacturing Engineering:** Five prototypes
    produced via 3D printing for mechanical validation; the initial prototype
    achieved the intended fit, allowing the project to proceed without a major
    redesign. Design has reached client approval, with production tooling
    completed and final validation ongoing. Documentation includes native CAD,
    STEP files, 2D manufacturing and assembly drawings, exploded views, BOM.
  - **Collaboration:** Coordination between our mechanical engineering team, the
    client's mechanical and electronics engineers, an external PCB development
    company, and the manufacturing team — with our team independently
    engineering the mechanical architecture around a PCB developed by a
    separate company.
- outcomes:
  - 18 mm diameter constraint achieved within a 75 mm compact form factor
  - O-ring sealing architecture and vibration-resistant structural design validated internally
  - Five prototypes manufactured; production-ready documentation and tooling complete
  - Client approval obtained; planned production volume of 10,000+ units
  - Four-year engineering support agreement, plus a follow-on Model 2

### 3.3 — Freshpod Helmet Sanitization Machine  **(flagship — feature first)**
- slug: `freshpod-machine`
- title: `Freshpod Helmet Sanitization Machine`
- category: `END-TO-END PRODUCT ENGINEERING`
- client: `Freshpod India`
- status: `Commercially deployed`
- metrics: Machines deployed `200+` · Countries `3` · Helmets processed
  `200,000+ (reported)` · Mechanical components `80+`
- summary: Designed and engineered a commercially deployable automated helmet
  sanitization machine from the ground up — mechanical enclosure, custom control
  PCB, embedded firmware, UV/fogging treatment system, and safety interlocks.
- highlights:
  - 80+ unique mechanical components; stainless-steel CNC-fabricated enclosure
  - Dual-stage UV + fogging treatment cycle with magnetic door interlock
  - Custom ESP32-based control PCB, 5+ hardware revisions
  - Field-tested thermal and airflow engineering across multiple prototype iterations
  - Up to 10-year engineering support agreement with the client
- disciplines: Mechanical, PCB Design, Embedded Firmware, Thermal, Safety Systems, Manufacturing Support
- Full body sections:
  - **Overview:** Freshpod approached us to develop a commercially deployable
    automated helmet sanitization machine for compact, operator-assisted
    public-service environments. Scope went well beyond enclosure design:
    complete mechanical system, custom control PCB, embedded firmware,
    touchscreen HMI, payment workflow, and remote monitoring infrastructure,
    working closely with Freshpod's manufacturing operation. The system has
    progressed from prototype to 200+ deployed machines across multiple
    countries.
  - **Customer Workflow:** Customer initiates and pays via an integrated
    Razorpay workflow; the machine authorizes access and releases a magnetic
    door; the operator places the helmet in the sanitization chamber and closes
    it; an automated UV-and-fogging sequence runs; the cycle completes and the
    door releases; the operator removes and dries the helmet. A complete cycle
    takes approximately 5 minutes, and the chamber accommodates a broad range of
    helmet types rather than a single fixture.
  - **Mechanical Product Development:** 80+ unique mechanical components — main
    stainless-steel enclosure, helmet chamber, internal equipment chambers, door
    assemblies, magnetic locking arrangement, helmet positioning structure, UV
    and fogging module mounts, internal ventilation and airflow management,
    cable routing, service panels, viewing windows, safety shielding, casters.
    Roughly 5 ft × 2 ft × 2 ft, approximately 50–75 kg, CNC-bent stainless steel.
  - **Sanitization Chamber & Thermal Engineering:** One of the harder mechanical
    problems was ensuring the sanitization process reached the interior of
    different helmet shapes, not just their exterior. The chamber positions the
    helmet's head opening toward the treatment airflow, with a mesh-based outlet
    refined across multiple iterations to improve distribution — an iterative
    loop of airflow, chamber geometry, fan behavior, heat generation and helmet
    positioning. Because the UV and fogging systems generate heat inside the
    machine, we ran dedicated heat testing, ventilation optimization and
    mechanical revisions to keep thermal behavior within bounds without active
    cooling shortcuts.
  - **Safety & Custom Electronics:** Magnetic door locking, door-state
    monitoring, current and fan monitoring, operational interlocks, fault
    detection, fail-safe behavior, remote error notification — with defined
    fault states for payment failure, UV/fogging/fan failure, and OTA/update
    failure. Rather than multiple disconnected boards, a single custom control
    PCB built around an ESP32 and a 12 V power architecture handles door
    control, UV/fogging/fan control, machine-state monitoring, display
    communication, payment integration, fault handling, and OTA updates. The PCB
    went through 5+ revisions before reaching production.
  - **Prototype to Production:** 2 major physical prototypes, 10+ mechanical
    revisions, 5+ PCB revisions, with prototype testing driving refinements in
    ventilation, airflow, fan performance, heat management and mechanical
    packaging. The final product moved into commercial manufacturing in Andhra
    Pradesh, India, with our team supplying production engineering documentation
    and supporting the manufacturing process.
  - **Field Deployment & Long-Term Support:** The fleet has grown to 200+
    machines across India, Nepal and Sri Lanka, **reportedly processing
    200,000+ helmets**, with individual machines handling roughly 30–40 helmets
    per day depending on location. Field deployment surfaced real-world issues —
    including ESP32 controller and fogging equipment failures — which we
    investigated and resolved through hardware and software improvements. Our
    ongoing relationship covers mechanical, firmware, software, HMI, PCB, and
    both remote and on-site engineering support, under an arrangement extending
    up to 10 years.
- outcomes:
  - 200+ machines deployed across 3 countries; 200,000+ helmets reportedly processed
  - 80+ unique mechanical components; 10+ mechanical and 5+ PCB revisions
  - Continuous field-driven engineering improvements post-deployment
  - Up to 10-year engineering support agreement

### 3.4 — FreshPod Connected Platform
- slug: `freshpod-platform`
- title: `FreshPod Connected Platform`
- category: `CLOUD, IOT & PAYMENTS`
- client: `Freshpod India`
- status: `Live in production, two architecture generations`
- metrics: Machines on platform `190+` · Gen 1 `150+` · Gen 2 `40+`
- summary: Built the software backbone that turned Freshpod's sanitization
  hardware into a remotely managed commercial platform: dynamic UPI/QR payment
  sessions, ESP32 firmware, OTA update infrastructure, and a centralized
  fleet-management dashboard.
- highlights:
  - Dynamic payment-session architecture with QR pre-fetching to cut customer wait time
  - OTA firmware pipeline — no manual servicing required for software updates
  - Fleet dashboard: machine heartbeat, transaction tracking, dealership and operator management
- disciplines: ESP32, Next.js, Node.js, TypeScript, MongoDB, Firebase, Razorpay, MQTT, OTA
- Full body sections:
  - **Overview:** Freshpod India brought us in to build the complete software and
    firmware ecosystem for its automated helmet sanitization machines. The
    challenge wasn't just controlling UV, fogging, thermal drying and exhaust
    systems — it was building a reliable connected platform capable of operating
    hundreds of machines in the field, handling payments, guiding customers
    through the cleaning cycle, and giving operators centralized control. We
    engineered the full stack, from embedded machine firmware to cloud backend
    and admin dashboard.
  - **Embedded Firmware & Machine Control:** ESP32-based control architecture
    running the multi-stage sanitization sequence (UV sterilization, fogging,
    thermal drying, exhaust), door locking/unlocking safety logic, DWIN DGUS
    touchscreen integration, audio guidance via DFPlayer Mini, buzzer and status
    feedback, Wi-Fi connectivity, machine-level state management and recovery,
    time sync and operational logging, OTA update infrastructure, and machine
    heartbeat/online-offline monitoring.
  - **Dynamic Payment Infrastructure:** We evolved the original static-QR system
    into a dynamic architecture: each transaction is tied to a dynamically
    generated payment session, with the machine requesting payment data from the
    backend, displaying the QR/UPI interface, and continuously verifying payment
    status. Once confirmed, the flow moves automatically — payment →
    verification → machine authorization → door access → sanitization cycle. We
    also implemented payment-session prefetching, preparing the next
    transaction's QR while the current cycle finishes, cutting customer wait time.
  - **Cloud & Fleet Management:** Built on Next.js, Node.js, TypeScript, MongoDB
    and Firebase: machine monitoring and online/offline status, heartbeat
    monitoring, transaction and tap tracking, revenue and pricing management,
    dynamic payment configuration, OTA firmware management and version tracking,
    operator accounts, dealership and buyer/user management, and machine-level
    activity data.
  - **Two Generations:** Generation 1 (static payment architecture) deployed
    across 150+ machines with static QR/payment workflow, MQTT-based transaction
    confirmation and Firebase-based monitoring. Generation 2 (dynamic payment and
    cloud architecture) deployed across 40+ machines with dynamic payment-session
    generation, backend payment verification, machine-specific transaction
    handling, enhanced fleet monitoring, OTA firmware management and centralized
    operational management. Lessons from Generation 1 directly informed
    Generation 2.
  - **Built for Long-Term Operation:** A 3-year software and firmware update
    framework covering firmware/software updates, module upgrades, OTA
    deployments, payment-system improvements, dashboard enhancements and
    operational feature updates.
- outcomes:
  - 190+ deployed machines running the platform across two architecture generations
  - Customer interface → payment → embedded controller → hardware → cloud → fleet dashboard, end to end
  - 3-year software and firmware update framework in place

### 3.5 — FreshPod Embedded HMI
- slug: `freshpod-hmi`
- title: `FreshPod Embedded HMI`
- category: `EMBEDDED UI / HMI`
- client: `Freshpod India`
- status: `Deployed across the Freshpod fleet`
- metrics: Custom screens `14` · Display `8-inch 800 × 480 DWIN DGUS`
- summary: Designed and built the complete customer-facing touchscreen interface
  on DWIN's DGUS platform — a display environment with no HTML/JavaScript
  support — engineering a UART-based communication layer to deliver dynamic QR
  payments and real-time machine-state feedback.
- highlights:
  - 14 custom screens covering the full payment-to-retrieval customer journey
  - Dynamic QR rendering over UART/DGUS protocol — no browser engine available
  - Tight synchronization between physical machine state and on-screen state
- disciplines: DWIN DGUS, UART, ESP32 Firmware, UI/UX, Embedded Systems
- Full body sections:
  - **Overview:** For Freshpod India's automated helmet sanitization machine we
    designed and implemented the complete customer-facing HMI/UI experience on
    the selected DWIN DGUS touchscreen platform. DGUS doesn't offer the
    flexibility of a conventional web-based interface — no HTML/JavaScript
    support — so instead of changing the hardware, we engineered the interface
    around DGUS's actual capabilities and built a reliable communication layer
    between the touchscreen and the ESP32 machine controller.
  - **UI/UX for a Physical Machine:** Unlike a mobile or web interface, every
    screen corresponds to a real-world machine action. We designed the
    experience around the full customer journey — welcome, payment, door access,
    helmet placement, cleaning, sterilization, drying, completion, retrieval —
    with clear visual feedback at each stage so the customer always knows what
    the machine is doing, what they need to do next, and when the door will open.
  - **14 Custom Machine Screens:** 14 dedicated HMI screens covering customer
    interaction, payment, machine-operation states and completion states, built
    directly in the DWIN DGUS development environment — layouts, graphical
    elements, interaction areas and QR-code placement.
  - **Solving the Dynamic QR Challenge:** The hardest technical piece was
    implementing dynamic payment QR codes on a display with no browser-based
    rendering. We built a communication architecture where the backend payment
    system generates dynamic UPI/QR data, which passes through ESP32 firmware
    over UART using the DGUS protocol to the display, where the customer scans
    it. This delivered a fully dynamic payment interaction while keeping the
    originally selected DWIN hardware.
  - **Integrated Payment Experience & Firmware Sync:** The QR interface is wired
    into the full machine workflow (QR generated → displayed → payment detected →
    confirmed → cleaning initiated), and the ESP32 drives every screen transition
    so the visual state of the machine and its physical state stay synchronized.
- outcomes:
  - A dedicated embedded HMI system combining UI/UX, DWIN DGUS, UART, ESP32 firmware, dynamic QR payments and machine-state visualization
  - Delivered within the constraints of a display platform with no native web support
  - Running as an integral part of the Freshpod customer experience

### 3.6 — EGGORA Egg Vending Machine
- slug: `eggora`
- title: `EGGORA — Modular, Tray-Agnostic Vending Architecture`
- category: `SMART AUTOMATION / VENDING`
- client: `Dadspire Solutions`
- status: `Phase 1 prototype in fabrication`
- metrics: Phase 1 capacity `~700 eggs` · Compartments `42` · Expansion target
  `~1,500 eggs` · CAD revisions `~6`
- summary: Designed a high-density egg vending platform around commercially
  available 6-, 12- and 30-egg trays rather than a proprietary dispensing
  mechanism, backed by a custom modular control PCB (STM32 + Linux SoM + CAN
  backbone) built for expansion from day one.
- highlights:
  - Variable-pitch compartment architecture sized to real tray geometry, not a uniform grid
  - ~700-egg Phase 1 capacity across 42 compartments; expandable to ~1,500 eggs
  - Modular cabinet expansion via CAN — additional door banks plug in without a new controller
  - Custom KiCad PCB architecture: STM32 real-time control, Linux SoM, CAN comms, door-controller subsystem
  - Tray research across 20+ locally available brands informed the entire mechanical layout
- disciplines: Mechanical, KiCad PCB, STM32, Linux SoM, CAN Bus, Fusion 360, Sheet Metal DFM
- Full body sections — use all of these, they are the strongest engineering
  narrative you have:
  - **Overview:** Dadspire Solutions came to us with reference designs based on
    existing Chinese egg vending machines, but the brief wasn't to reproduce
    that machine — it was to maximize usable storage in a compact footprint
    while supporting multiple commercial egg-tray formats. The business model
    added a real constraint: 6-egg trays matter for attracting customers, while
    12- and 30-egg trays carry better margins, so the cabinet needed to
    accommodate all three formats while positioning the smaller product
    deliberately rather than wasting premium volume on a uniform grid.
  - **Tray Research Drove the Architecture:** We surveyed roughly 20 egg-tray
    brands available locally around the client's site and hatchery, evaluating
    length, width, height, geometry and practical usability inside the cabinet.
    Common tray height across brands runs about 133.5 mm, with a 6-egg tray at
    roughly 178 × 178 mm and a 30-egg tray at roughly 381 mm. The core design
    decision: build the machine around commercially available trays rather than a
    custom, proprietary egg-storage mechanism — so the machine isn't sensitive to
    minor variation in egg size or shape, and the customer isn't locked into one
    tray supplier.
  - **Variable-Pitch Compartment Architecture:** Instead of 42 identical boxes,
    compartment size varies by tray format. In Phase 1 that's 12 six-egg
    compartments, 15 twelve-egg compartments and 15 thirty-egg compartments: 42
    compartments totaling roughly 702 eggs, with an expansion target of ~1,500.
    The machine stands 1,828 mm high × 1,060 mm wide × 406 mm deep, weighs
    approximately 75–125 kg, is built from stainless steel via CNC bending, and
    is modeled in Fusion 360.
  - **No Dispensing Mechanism, By Design:** There's no motorized egg-by-egg
    dispensing. The workflow is: customer selects a tray format → payment
    confirmed → the corresponding compartment unlocks → the customer opens the
    door and removes the tray → the door closes. That single decision eliminates
    an entire category of mechanical failure modes — individual egg handling,
    egg-by-egg actuation, double dispensing, egg collision, motorized
    dispensing, and the maintenance burden that comes with them — shifting the
    engineering challenge from "dispense one egg reliably" to "store and secure
    trays at high density."
  - **Doors & Security:** Each compartment has its own door — stainless steel
    with a transparent viewing window, hinged, secured with a 9–12 V solenoid
    lock. Control electronics live in a dedicated rear compartment, physically
    separated from the egg-storage area. Cable management runs just three wires
    across all cabinets, with CAN bus handling inter-module control.
  - **Environmental Monitoring:** Phase 1 uses passive ventilation rather than
    active refrigeration: three fans positioned around the cabinet, and three
    temperature sensors at top, middle and bottom, building a temperature map
    rather than a single reading. Phase 1 is engineered to generate the data
    Phase 2 will need.
  - **Modular & Future-Phased Architecture:** The base cabinet can be expanded by
    adding another cabinet with roughly 20 additional doors — no new MCU
    required; the added cabinet's internal PCB connects via a plug-and-play
    wiring interface over CAN. The roadmap is explicitly phased: Phase 1
    (passive ventilation + temperature monitoring) → Phase 2 (active AC cooling,
    cabinet designed to extend in height) → Phase 3 (a separate boiler/cooking
    module, deliberately kept as its own adjacent cabinet).
  - **Custom PCB & Door Controller:** A custom modular control PCB designed in
    KiCad as the electrical backbone — organized into distinct functional blocks
    (power management, STM32 controller, Linux SoM interface, CAN communication,
    door controller, MOSFET/actuator drivers, safety circuitry, external
    interfaces, connectors, 3.3 V and 5 V regulation). The architecture splits
    real-time control (STM32 — sensors, safety, door/actuator control, machine
    I/O) from higher-level computing (Linux SoM — application layer,
    connectivity, vending logic), so the real-time layer isn't dependent on the
    higher-level OS. A dedicated door-controller board isolates the physical
    access mechanism from the main controller. Safety is handled as an
    architectural requirement — door-state monitoring, fault detection,
    fail-safe behavior — rather than an afterthought.
  - **Manufacturing Engineering:** Production documentation includes 3D CAD, 2D
    manufacturing drawings, DXF files, BOM, bend drawings, assembly drawings,
    exploded views, fastener specifications, tolerances and welding
    specifications. Approximately 6 CAD revisions, driven primarily by cabinet
    layout and space constraints around the selected egg trays.
  - **The Hardest Problem:** Developing the machine around universal egg trays —
    so any widely available, high-usability tray format could fit without needing
    a custom tray design — because a proprietary tray would have locked the
    client into a single supplier and added an entire mechanical subsystem to
    maintain.
- outcomes:
  - Tray-agnostic architecture accommodating 6-, 12- and 30-egg formats
  - ~700-egg Phase 1 capacity, engineered to expand to ~1,500 eggs
  - Modular cabinet expansion and a phased roadmap without redesigning the core cabinet
  - Custom modular PCB architecture (STM32 + Linux SoM + CAN)
  - One prototype currently in fabrication, following ~6 mechanical CAD revisions

### 3.7 — Team (replace the current array)

```
Hanish Jyosyabhatla — Founder & Lead Architect
Mandapalli Teja    — Co-Founder & Product Lead
Lohith Medisetti   — Co-Founder & Operations
```

Note: the current code has different titles (CEO / COO / Product Lead) and a
different name spelling. Use the values above. Add an optional `linkedin?:
string` field to the team type and render an icon link when present; leave it
undefined for now and list it in your TODO report.

**Ordering fix:** the GSAP team timeline animates the *middle* card first. Place
the Founder in the middle slot so the animation emphasis matches the hierarchy,
or change the timeline to animate left→right. Do not leave the current mismatch.

### 3.8 — Services content (for `/services`)

Group into four disciplines. Use only these — they are backed by shipped work.

1. **Mechanical Product Engineering** — Industrial and product CAD, enclosure
   design, sealing and ingress protection, thermal and airflow engineering,
   vibration-resistant structures, sheet metal and injection-moulding DFM,
   production documentation (CAD, STEP, DXF, BOM, bend and assembly drawings).
   *Tools: Autodesk Fusion 360.*
2. **Electronics & Embedded Systems** — Custom PCB design, real-time control
   architecture, motor/solenoid/actuator drive, safety and interlock circuitry,
   firmware, OTA update infrastructure, machine-state management.
   *Tools: KiCad, ESP32, STM32, Linux SoM, CAN bus.*
3. **Machine Software & HMI** — Touchscreen HMI on constrained embedded
   platforms, UART/DGUS communication layers, customer-journey UX for physical
   machines, payment integration.
   *Tools: DWIN DGUS, Razorpay, UPI/QR.*
4. **Cloud, IoT & Digital Platforms** — Fleet management dashboards, device
   heartbeat and telemetry, transaction and revenue tracking, OTA management,
   web platforms.
   *Tools: Next.js, Node.js, TypeScript, MongoDB, Firebase, MQTT.*

**Delete from the site entirely:** SolidWorks, Altium Designer, MATLAB,
Simulink, LabVIEW, AutoCAD, Arduino, Figma, VS Code, GitHub, Jira, Grafana. The
current `partnerPillars` tool list claims software you do not run and tools that
are not differentiators. Replace with the real tool list above.

### 3.9 — Why Partner pillars (rewrite)

Keep the six-pillar structure and the six blueprint SVGs. Rewrite the copy so
each pillar cites a real project instead of generic engineering prose. Each
pillar gets: tag, title, a 2–3 sentence description **naming a real project**,
and a real tool list from 3.8.

| # | Tag | Anchor evidence |
|---|---|---|
| 01 | END-TO-END ENGINEERING | Freshpod: mechanical + PCB + firmware + HMI + cloud, one team |
| 02 | CONSTRAINED PACKAGING | USS2 18 mm envelope; secure-comms 25 mm enclosure |
| 03 | SMART CONNECTED SYSTEMS | Freshpod platform: 190+ machines, OTA, dynamic payments |
| 04 | RELIABILITY IN THE FIELD | Freshpod: field failures investigated and resolved post-deployment |
| 05 | PRODUCTION READY | USS2 tooling complete, 10,000+ unit target; EGGORA full manufacturing documentation |
| 06 | LONG-TERM SUPPORT | 4-year and up-to-10-year engineering support agreements |

The current pillar copy is filler — 45-word sentences that say nothing. Cut each
description to two sentences maximum and make the project the subject.

---

## 4. DESIGN SYSTEM — Tailwind v4 refactor

The current token system is decorative: `:root` custom properties exist but were
never registered with Tailwind, so `bg-primary` does not compile and the codebase
hardcodes `bg-[#f3f6fc]` in eleven places.

**Do this:**

1. In `globals.css`, replace the `:root` block with a Tailwind v4 `@theme` block
   so the tokens generate real utilities:

```css
@import "tailwindcss";

@theme {
  --color-canvas: #f3f6fc;
  --color-surface: #ffffff;
  --color-surface-subtle: #f1f5f9;
  --color-ink: #07080b;

  --color-brand: #2563eb;
  --color-brand-hover: #1d4ed8;
  --color-brand-light: #3b82f6;
  --color-periwinkle: #6c85c4;
  --color-ice: #c8d7f6;
  --color-ice-light: #eff4fe;

  --color-heading: #0a0f1d;
  --color-body: #475569;
  --color-muted: #64748b;
  --color-hairline: #e2e8f0;

  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-jakarta), ui-sans-serif, system-ui, sans-serif;
}
```

2. Replace every hardcoded hex in JSX with the generated utility:
   `bg-[#f3f6fc]` → `bg-canvas`, `bg-[#6c85c4]` → `bg-periwinkle`,
   `bg-[#c8d7f6]` → `bg-ice`, `text-slate-950` for headings → `text-heading`.
   After this task there must be **zero** arbitrary hex values in `src/**/*.tsx`.
   Verify with a grep for `\[#` and report the count.

3. Replace `font-[family-name:var(--font-bricolage)]` (used 14+ times) with
   `font-display`.

4. **Fluid type.** The current h1 is `lg:text-[5rem]` fixed. Add fluid clamps in
   `@theme` for display sizes, e.g.
   `--text-display: clamp(2.25rem, 1.2rem + 4.5vw, 5rem);` and apply as
   `text-display`. Do the same for h2 (`clamp(1.75rem, 1.1rem + 2.6vw, 2.85rem)`).

5. **`src/lib/theme.ts`:** strip all colour values. Keep only company/contact
   constants and rename to `src/lib/company.ts` exporting `COMPANY` with the
   Section 1 fields. Update all imports. The colour duplication between
   `theme.ts` and `globals.css` is a guaranteed drift source — it must go.

6. **Remove the font override.** In `globals.css` delete `'Google Sans'` from the
   `body` font stack, and in `layout.tsx` delete the
   `fonts.cdnfonts.com` `<link>` element and the entire `<head>` block. Google
   Sans is Google's proprietary brand typeface, is not licensed for third-party
   use, and that CDN is redistributing it without permission. It is also a
   render-blocking third-party request that is currently overriding the Plus
   Jakarta Sans you already load correctly via `next/font`. Body copy uses
   `--font-sans` (Plus Jakarta Sans); headings use `--font-display`
   (Bricolage Grotesque). Rename the Plus Jakarta CSS variable to
   `--font-jakarta` so `--font-sans` in `@theme` can reference it cleanly.

---

## 5. PERFORMANCE — the core architectural fix

### 5.1 Split the client boundary

`page.tsx` is currently a ~1,500-line `"use client"` component. Every scroll
frame re-renders the entire tree.

Restructure:

```
src/app/page.tsx                       server component — composes sections
src/components/site/Header.tsx         client (mobile menu state only)
src/components/site/Footer.tsx         server
src/components/home/HeroShowcase.tsx   client (pinned arc + showcase)
src/components/home/WhyPartner.tsx     client (pinned pillars)
src/components/home/ProcessRibbon.tsx  client (scroll reveals only)
src/components/home/TeamSection.tsx    client (scroll reveals only)
src/components/home/ContactCta.tsx     server (the GSAP reveal can live in a
                                        small client wrapper)
src/components/providers/SmoothScroll.tsx  client — Lenis + ScrollTrigger setup
```

Static text content must render from server components wherever possible.

### 5.2 Get scrub values out of React state

This is the single highest-impact change. The hero `onUpdate` currently calls up
to eight `setState`s per scroll frame (`heroOpacity`, `heroY`, `arcShift`,
`cardOpacity`, `cardY`, `cardScale`, `rotationProgress`, `activeProjectIndex`),
each re-rendering the whole page component.

Replace with:
- `gsap.quickSetter` / `gsap.set` writing directly to refs, **or**
- CSS custom properties set on a container element
  (`el.style.setProperty('--hero-opacity', v)`) with CSS consuming them.

Keep React state **only** for genuinely discrete values (`activeProjectIndex`,
`activePillarIndex`), and guard them so they only fire on actual change:

```ts
setActiveProjectIndex(prev => (prev === next ? prev : next));
```

For the arc numbers: precompute the four number elements once as refs and update
their `left`/`top`/`opacity` via `quickSetter` rather than re-rendering a
`.map()` every frame.

### 5.3 Remove the competing easing layers

You currently have Lenis (`duration: 1.2`) → ScrollTrigger (`scrub: 0.7`) → CSS
`transition: 0.25s cubic-bezier(...)` on the same properties. Three smoothing
layers on one value produces visible input lag.

- Delete every inline `transition:` on a property that is scrub-driven
  (hero overlay, arc container, showcase card).
- Reduce Lenis `duration` to `0.9` or remove Lenis entirely (see 5.6).
- Keep `scrub: 0.5–0.7` as the only source of inertia.

### 5.4 Stop animating `filter: blur()`

`blur()` forces re-rasterisation every frame and is currently animated on process
cards, process photos, team cards, process/team/contact headings, pillar titles
and pillar graphics.

- Keep blur on **at most one** signature moment (suggest: the hero-to-showcase
  transition, or nothing at all).
- Everywhere else: `opacity` + `transform` only. Both are compositor-only.
- Also remove `rotateX` from heading reveals — it forces layout on a text node.

### 5.5 Image pipeline

- Remove `unoptimized` from **every** `<Image>`. It is currently on all of them,
  which disables Next's entire image pipeline — no AVIF/WebP, no responsive
  srcset, full-size originals over the wire.
- `priority` belongs on the logo and the LCP element only. Remove it from the
  first project image, which is not visible at load (`cardOpacity` starts at 0).
- Add explicit `sizes` matching the real rendered width at each breakpoint.
- Add `placeholder="blur"` with `blurDataURL` for the large hero/case-study images.

### 5.6 Lenis — decide deliberately

Lenis intercepts native scroll physics, adds input lag on trackpads, breaks
native anchor jumps (your `<Link href="#process">` will jump instantly while
everything else eases — an inconsistency users feel), and is a known nausea
trigger.

**Default recommendation: remove it.** ScrollTrigger scrub alone gives you the
pinned scrubbing you want.

If you keep it: wire anchor links through `lenis.scrollTo()` so behaviour is
consistent, and hard-disable it under `prefers-reduced-motion` (see Section 6).

### 5.7 Scroll budget

Current: 380vh hero + 380vh desktop pillars + 360vh mobile pillars. A desktop
visitor scrolls roughly eight viewport heights before reaching the Process
section.

Reduce to: hero/showcase `220vh`, pillars `260vh`. Retune the phase thresholds in
`onUpdate` proportionally. Verify the four showcase projects still each get a
readable dwell.

### 5.8 Performance budget (acceptance criteria)

On a Moto G Power / 4× CPU throttle profile in Lighthouse mobile:
- LCP < 2.5s
- CLS < 0.1
- TBT < 300ms
- Total JS transferred < 250 KB gzipped for `/`
- Sustained 50fps+ while scrubbing the hero on a mid-tier device

Report the actual numbers you achieve.

---

## 6. ACCESSIBILITY — all required

1. **`prefers-reduced-motion`.** Create `useReducedMotion()` and honour it
   globally: skip Lenis init, set all GSAP `from/to` to their end state
   immediately, remove the ScrollTrigger pins so sections flow normally, and add
   a CSS block killing `animate-ping`/`animate-pulse`/`animate-spin`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

2. **Invisible focusable content.** The hero overlay and showcase card go to
   `opacity: 0` but stay in the tab order. Apply `visibility: hidden` or the
   `inert` attribute when faded out so keyboard users cannot tab into invisible
   controls.

3. **Mobile menu.** Convert to a proper dialog: focus trap, `Escape` to close,
   close on outside click, `aria-expanded` and `aria-controls` on the hamburger,
   return focus to the trigger on close, and lock body scroll while open.

4. **The mobile accordion is currently dishonest.** It has `aria-expanded` and a
   +/− toggle icon, but clicking it scroll-jacks the page and the open state is
   driven by scroll position, not by the click. A screen-reader user gets a
   control that does not do what it announces. **Fix: on mobile, drop the pinned
   scroll track entirely and make it a real accordion** — click toggles open
   state, nothing scrolls. This also deletes 360vh of scroll and an entire
   duplicate DOM tree.

5. **Heading hierarchy.** Currently `h1` → showcase `h3`, skipping `h2`. Fix to a
   strict h1 → h2 → h3 order on every page. One `h1` per page.

6. **Landmarks.** Add `<main>`, `<nav aria-label="Primary">`,
   `<footer>`. Convert section `<div>`s to `<section>` with `aria-labelledby`
   pointing at their heading.

7. **Focus visibility.** Several interactive elements use `focus:outline-none`
   with no replacement (pillar stepper buttons, accordion triggers). Add a
   visible `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`
   to every one.

8. **Colour contrast.** Verify `text-muted` (#64748b) on `bg-canvas` (#f3f6fc)
   meets 4.5:1 and the `text-white/85` on `bg-periwinkle` (#6c85c4) body copy in
   the process cards meets 4.5:1. Darken where they fail — do not ship failing
   body text.

9. **Alt text.** Every `<Image>` gets meaningful alt text; decorative SVGs get
   `aria-hidden="true"` and `focusable="false"`.

---

## 7. BUGS TO FIX

1. **`sticky` and `relative` on the same element.** Both the hero stage
   (`sticky top-0 h-screen ... relative`) and the mobile pillar stage have two
   `position` utilities. Which wins depends on Tailwind's generated stylesheet
   order, not class order. Remove the trailing `relative` from both.

2. **Duplicate pillar DOM.** `hidden lg:block` + `block lg:hidden` renders all
   six pillars' text and all six blueprint SVGs twice, and creates a
   ScrollTrigger on a `display:none` element (which measures as zero and yields
   garbage). Resolved by item 6.4 above — one implementation, `gsap.matchMedia()`
   for the desktop pin.

3. **Cleanup kills foreign triggers.** The main effect's teardown calls
   `ScrollTrigger.getAll().forEach(t => t.kill())`, destroying triggers created
   by the process/team/contact contexts. `ctx.revert()` already handles its own.
   Delete the `getAll` line.

4. **Four redundant `ScrollTrigger.refresh()` calls** on 150 ms timers across
   four `useEffect`s. `refresh()` is global and expensive. Call it once, after
   smooth-scroll setup, and once on a debounced `resize`.

5. **`toggleActions: "play reverse play reverse"`** on every reveal means content
   vanishes on scroll-up. Change entrance animations to
   `toggleActions: "play none none none"` with `once: true`.

6. **`whitespace-nowrap`** on process step titles will overflow with
   "Deploy & Support" in a half-width card at `sm`. Remove it.

7. **Dead code:** the `processSteps` array is declared and never used (the
   section inlines its own literal instead); `stageRef` is assigned and never
   read; the four `pillar*` keyframes and `.animate-pillar-*` classes in
   `globals.css` are unused since GSAP took over. Delete all of them.

8. **Global scrollbar suppression.** `*::-webkit-scrollbar { display: none }`
   plus `scrollbar-width: none` on `*` removes the primary affordance telling
   users content is scrollable and kills drag-to-scroll. Delete the global rules.
   Keep `.no-scrollbar` as an opt-in class.

9. **`.bg-noise-grain` uses `width: 100vw`.** On browsers reserving scrollbar
   width this overflows the viewport horizontally. It already has `inset: 0` —
   delete the `width` and `height` declarations.

10. **`suppressHydrationWarning` on both `<html>` and `<body>`** pre-silences the
    hardest class of bug to debug. Remove both unless you add a theme script that
    genuinely requires it. Keep the one on the `{new Date().getFullYear()}`
    copyright paragraph.

11. **`className="light"` hardcoded on `<html>`** with no theme system. Either
    delete it or implement real theme switching. Do not leave a dead hook.

12. **Content invisible without JS.** `cardOpacity` initialises to `0`, so a
    hydration error makes the entire showcase invisible. Initialise visible and
    let GSAP set the hidden start state in a `useLayoutEffect`.

13. **Favicon 404.** `metadata.icons` points at `/logo.png`, which does not exist
    — `public/` contains only `.gitkeep`. Add a real `icon.png`/`favicon.ico` or
    remove the reference. Also add `apple-icon.png`.

14. **`filter="blur(70px)"` as an SVG presentation attribute** on the contact-arc
    glow circle. Support is inconsistent — verify it renders in Firefox and
    Safari; if not, replace with a proper `<filter><feGaussianBlur/></filter>`
    definition or a CSS-blurred div.

---

## 8. NEW: CONTACT FORM (highest business priority)

The site's entire conversion path is currently a `mailto:` link. Build a real
form at `/contact` and replace the "Start Your Project" CTA target.

**Fields:**
- Name (required)
- Work email (required, validated)
- Company (optional)
- What are you building? (required, textarea)
- Project type (select): Mechanical / Electronics & PCB / Embedded &
  Firmware / Software & Cloud / Full product — not sure yet
- Stage (select): Idea · Concept/spec exists · Prototype exists · In
  production · Existing product needs support
- Budget range (select, optional): Under ₹5L · ₹5L–15L · ₹15L–40L · ₹40L+ ·
  Not sure yet
- Timeline (select): ASAP · 1–3 months · 3–6 months · Exploring

**Implementation:**
- React Server Action or a route handler at `/api/contact`.
- Server-side validation with Zod. Never trust client validation.
- Honeypot field + a simple time-to-submit check for spam. No CAPTCHA.
- Send via Resend or Nodemailer to `hello@solvempire.com`. Put the API key in
  `.env.local`; add `.env.example` documenting required vars.
- Rate limit by IP.
- Accessible: real `<label>` for every field, `aria-invalid` and
  `aria-describedby` on errors, an `aria-live="polite"` region announcing
  success/failure, focus moves to the first invalid field on submit.
- Loading, success and error states — never leave the user guessing.
- **Set expectations on the page:** "We reply within one business day with a
  30-minute call to scope the problem. No sales deck."

---

## 9. NEW: SEO AND METADATA

1. `metadataBase: new URL('https://solvempire.com')` in root layout.
2. Per-route `generateMetadata` — unique title and description for every page.
   Case study titles: `<Project> — Case Study | SolveMpire`.
3. Open Graph + Twitter card on every route. Generate OG images with
   `next/og` `ImageResponse` at `app/<route>/opengraph-image.tsx` — project
   title on the brand canvas, no external assets.
4. `src/app/robots.ts` and `src/app/sitemap.ts` covering all routes.
5. JSON-LD via a `<script type="application/ld+json">` in the root layout:
   `Organization` with legal name, logo, address (`PostalAddress` with the
   Kakinada address), email, and `foundingDate`. Add
   `CreativeWork`/`Article` JSON-LD on each case study page.
6. Canonical URLs on every page.
7. `lang="en"` is present — keep it.

---

## 10. NEW: LEGAL PAGES

Build `/privacy` and `/terms` as real pages (the footer already links to dead
anchors). Cover, at minimum:

**Privacy:** what the contact form collects, why, where it's stored, how long,
third-party processors (email provider, analytics, hosting), user rights, and a
contact address for requests. If you serve EU visitors, note the lawful basis.

**Terms:** scope of services, IP ownership of deliverables, confidentiality,
limitation of liability, governing law (Andhra Pradesh, India), and the
company's legal name and CIN.

Mark both with `{{TODO: legal review}}` at the top. **Add a comment in the code
stating these are drafts and must be reviewed by a lawyer before launch.** Do not
represent generated legal text as reviewed.

---

## 11. NEW: ANALYTICS

Add privacy-respecting analytics (Plausible, Umami, or Vercel Analytics). Track
at minimum: page views, contact-form submissions, case-study opens, and
outbound email clicks. Put the domain/key in env vars, not hardcoded.

---

## 12. REMOVALS — complete list

Delete all of the following:

1. The `projects` array's three fabricated entries (ApexFlow, OmniTrack,
   MedVantage) — replaced by the six real case studies in Section 3.
2. All tool names listed in 3.8's delete list.
3. The `fonts.cdnfonts.com` `<link>` and `'Google Sans'` from the body stack.
4. Global scrollbar suppression rules.
5. The four `pillar*` `@keyframes` and `.animate-pillar-*` classes.
6. `processSteps` array, `stageRef`.
7. Colour values from `theme.ts`.
8. The duplicate mobile pillar scroll track (360vh).
9. `unoptimized` on every `<Image>`.
10. Trailing `relative` next to `sticky`.
11. `ScrollTrigger.getAll().forEach(kill)`.
12. `width: 100vw; height: 100vh` from `.bg-noise-grain`.
13. `suppressHydrationWarning` on `<html>` and `<body>`.
14. `blur()` from all but at most one animation.
15. `#careers`, `#blog`, `#docs`, `#security` footer links.
16. "Inc." from the copyright line.
17. The default `create-next-app` README — replace with a real project README
    (setup, env vars, scripts, deploy, content-editing guide).
18. `rotateX` from heading reveals.

---

## 13. COPY REWRITES

1. **Every "View Case Study" button** → real `/work/<slug>` route.
2. **"View Our Team" button** in the team section currently links to `#contact`.
   Either relabel it to "Start a Project" (keeping the contact target) or point
   it at `/about`. It is currently mislabelled.
3. **Footer "Services" column** currently links `#services` five times. Point
   each at the relevant `/services#<discipline>` anchor.
4. **"Journal & Process"** in the footer Company column links to `#process` but
   you have no journal. Rename to "Our Process".
5. **"Case Studies"** in the Resources column → `/work`.
6. **Pillar descriptions** — rewrite per 3.9. Two sentences maximum each; every
   one names a real project.
7. **Contact CTA heading** "Have an idea? Let's build it together." is fine —
   keep it. Change the button target from `mailto:` to `/contact`.

---

## 14. EXECUTION ORDER

Work through these in order. Build and lint after each. Do not skip ahead.

1. **Content layer.** Create `src/content/case-studies.ts`,
   `src/content/team.ts`, `src/content/services.ts`, `src/lib/company.ts`.
   Delete the fabricated projects and the colour block in `theme.ts`.
2. **Design tokens.** `@theme` block; purge every arbitrary hex from JSX; fluid
   type; remove the Google Sans override. Verify with a grep and report the
   count.
3. **Routing skeleton.** Create all routes from Section 2 with real content from
   Section 3. Fix every dead link. Verify: zero unresolved anchors.
4. **Component split.** Break `page.tsx` into the Section 5.1 structure. Server
   components wherever possible.
5. **Scroll/animation refactor.** State out of `onUpdate`; kill competing
   easing; remove blur; reduce scroll budget; `matchMedia` for the pillar
   section; mobile accordion becomes a real accordion.
6. **Accessibility pass.** All of Section 6.
7. **Bug sweep.** All of Section 7.
8. **Contact form.** Section 8.
9. **SEO, legal, analytics.** Sections 9–11.
10. **Performance verification.** Run Lighthouse mobile; report against the
    Section 5.8 budget; fix regressions.

---

## 15. FINAL REPORT — required output

When done, produce a report containing:

1. Every `{{TODO}}` placeholder you left, with its file, line, and what content
   is needed.
2. Lighthouse mobile scores and the four Section 5.8 budget numbers.
3. Count of arbitrary hex values remaining in `src/**/*.tsx` (target: 0).
4. Count of unresolved anchors/routes (target: 0).
5. Any place where the spec conflicted with itself or with the existing code,
   and how you resolved it.
6. Any claim in Section 3 you could not render without softening or rewording,
   and what you changed.
7. A list of assets still needed (real project photography, team headshots,
   logo file, OG image sources) — do not generate or substitute placeholders
   beyond a clearly marked neutral grey block.

---

## 16. WHAT NOT TO DO

- Do not invent case studies, clients, metrics, certifications or testimonials.
- Do not write "IP65 certified" or drop "reportedly" from the helmet figure.
- Do not name the client or RF function of case study 01.
- Do not add a blog, careers page, pricing page, or testimonials section — there
  is no content for them. Dead sections are worse than missing ones.
- Do not restyle the brand. Same palette, same fonts, same visual language.
- Do not add new animation. The task is to make existing animation cheap and
  accessible, not to add more.
- Do not add a chatbot, a cookie banner beyond what the analytics choice
  requires, or an AI-features section.
- Do not leave `console.log` in shipped code.
- Do not commit `.env.local` or any API key.
