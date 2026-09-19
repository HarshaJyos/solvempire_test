/**
 * Canonical Case Studies Data
 * ===========================
 * Strictly derived from canonical specification.
 * Zero invented facts. All hedging preserved verbatim.
 */

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudySection = {
  heading: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  order: number;
  title: string;          // homepage card title
  category: string;       // eyebrow, uppercase
  client: string;
  status: string;
  summary: string;        // 1–2 sentences, homepage card
  metrics?: CaseStudyMetric[];
  highlights: string[];
  disciplines: string[];  // tags
  hero: { src: string; alt: string };
  sections: CaseStudySection[];  // full case study
  outcomes: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "freshpod-machine",
    order: 1,
    title: "Freshpod Helmet Sanitization Machine",
    category: "END-TO-END PRODUCT ENGINEERING",
    client: "Freshpod India",
    status: "Commercially deployed",
    metrics: [
      { label: "Machines deployed", value: "200+" },
      { label: "Countries", value: "3" },
      { label: "Helmets processed", value: "200,000+ (reported)" },
      { label: "Mechanical components", value: "80+" },
    ],
    summary:
      "Designed and engineered a commercially deployable automated helmet sanitization machine from the ground up — mechanical enclosure, custom control PCB, embedded firmware, UV/fogging treatment system, and safety interlocks.",
    highlights: [
      "80+ unique mechanical components; stainless-steel CNC-fabricated enclosure",
      "Dual-stage UV + fogging treatment cycle with magnetic door interlock",
      "Custom ESP32-based control PCB, 5+ hardware revisions",
      "Field-tested thermal and airflow engineering across multiple prototype iterations",
      "Up to 10-year engineering support agreement with the client",
    ],
    disciplines: [
      "Mechanical",
      "PCB Design",
      "Embedded Firmware",
      "Thermal",
      "Safety Systems",
      "Manufacturing Support",
    ],
    hero: {
      src: "/freshpod.jpg",
      alt: "Freshpod automated helmet sanitization machine enclosure",
    },
    sections: [
      {
        heading: "Overview",
        body: "Freshpod approached us to develop a commercially deployable automated helmet sanitization machine for compact, operator-assisted public-service environments. Scope went well beyond enclosure design: complete mechanical system, custom control PCB, embedded firmware, touchscreen HMI, payment workflow, and remote monitoring infrastructure, working closely with Freshpod's manufacturing operation. The system has progressed from prototype to 200+ deployed machines across multiple countries.",
      },
      {
        heading: "Customer Workflow",
        body: "Customer initiates and pays via an integrated Razorpay workflow; the machine authorizes access and releases a magnetic door; the operator places the helmet in the sanitization chamber and closes it; an automated UV-and-fogging sequence runs; the cycle completes and the door releases; the operator removes and dries the helmet. A complete cycle takes approximately 5 minutes, and the chamber accommodates a broad range of helmet types rather than a single fixture.",
      },
      {
        heading: "Mechanical Product Development",
        body: "80+ unique mechanical components — main stainless-steel enclosure, helmet chamber, internal equipment chambers, door assemblies, magnetic locking arrangement, helmet positioning structure, UV and fogging module mounts, internal ventilation and airflow management, cable routing, service panels, viewing windows, safety shielding, casters. Roughly 5 ft × 2 ft × 2 ft, approximately 50–75 kg, CNC-bent stainless steel.",
      },
      {
        heading: "Sanitization Chamber & Thermal Engineering",
        body: "One of the harder mechanical problems was ensuring the sanitization process reached the interior of different helmet shapes, not just their exterior. The chamber positions the helmet's head opening toward the treatment airflow, with a mesh-based outlet refined across multiple iterations to improve distribution — an iterative loop of airflow, chamber geometry, fan behavior, heat generation and helmet positioning. Because the UV and fogging systems generate heat inside the machine, we ran dedicated heat testing, ventilation optimization and mechanical revisions to keep thermal behavior within bounds without active cooling shortcuts.",
      },
      {
        heading: "Safety & Custom Electronics",
        body: "Magnetic door locking, door-state monitoring, current and fan monitoring, operational interlocks, fault detection, fail-safe behavior, remote error notification — with defined fault states for payment failure, UV/fogging/fan failure, and OTA/update failure. Rather than multiple disconnected boards, a single custom control PCB built around an ESP32 and a 12 V power architecture handles door control, UV/fogging/fan control, machine-state monitoring, display communication, payment integration, fault handling, and OTA updates. The PCB went through 5+ revisions before reaching production.",
      },
      {
        heading: "Prototype to Production",
        body: "2 major physical prototypes, 10+ mechanical revisions, 5+ PCB revisions, with prototype testing driving refinements in ventilation, airflow, fan performance, heat management and mechanical packaging. The final product moved into commercial manufacturing in Andhra Pradesh, India, with our team supplying production engineering documentation and supporting the manufacturing process.",
      },
      {
        heading: "Field Deployment & Long-Term Support",
        body: "The fleet has grown to 200+ machines across India, Nepal and Sri Lanka, reportedly processing 200,000+ helmets, with individual machines handling roughly 30–40 helmets per day depending on location. Field deployment surfaced real-world issues — including ESP32 controller and fogging equipment failures — which we investigated and resolved through hardware and software improvements. Our ongoing relationship covers mechanical, firmware, software, HMI, PCB, and both remote and on-site engineering support, under an arrangement extending up to 10 years.",
      },
    ],
    outcomes: [
      "200+ machines deployed across 3 countries; 200,000+ helmets reportedly processed",
      "80+ unique mechanical components; 10+ mechanical and 5+ PCB revisions",
      "Continuous field-driven engineering improvements post-deployment",
      "Up to 10-year engineering support agreement",
    ],
  },
  {
    slug: "secure-comms-enclosure",
    order: 2,
    title: "Secure Communications Device — Mechanical Product Design",
    category: "MECHANICAL PRODUCT ENGINEERING",
    client: "International security-technology client",
    status: "In commercial production",
    summary:
      "Engineered a production-ready enclosure for a portable secure communications device — matching the footprint of a conventional power bank (90 × 60 × 25 mm) while housing a rechargeable battery, multiple RF modules, and a control PCB with no active cooling permitted.",
    highlights: [
      "25 mm total thickness with full internal component packaging",
      "Passive-only thermal management under a strict no-active-cooling requirement",
      "Waterproof sealing via precision-mated lips and joints",
      "Full production documentation: CAD, STEP, drawings, BOM, exploded assemblies",
      "4-year engineering support agreement; repeat projects from the same client",
    ],
    disciplines: [
      "Mechanical Design",
      "Thermal Engineering",
      "Sealing",
      "DFM",
      "Fusion 360",
    ],
    hero: {
      src: "/process-discover.jpg",
      alt: "Secure communications device enclosure mechanical design",
    },
    sections: [
      {
        heading: "Overview",
        body: "Compact, production-ready mechanical enclosure for a portable handheld communications device for professional security applications. The brief was to hold the form factor of a conventional power bank while housing high-density electronics, an internal rechargeable battery, and multiple RF modules — all within a shell measuring 90 × 60 × 25 mm.",
      },
      {
        heading: "Scope of Work",
        body: "Complete mechanical product design — industrial enclosure design, internal structural framework, PCB mounting architecture, battery compartment integration, display mounting, button placement and ergonomic layout, heat-dissipation vent design, waterproof sealing via lips and precision mating features, snap-fit and mechanical joint development, and structural reinforcement for vibration-free component retention.",
      },
      {
        heading: "The Engineering Challenge",
        body: "The defining constraint was thickness — 25 mm or less total profile. Inside that envelope we packaged a 16650 rechargeable battery, multiple RF transducer modules, a control PCB, mechanical fastening features, and passive heat dissipation, while holding manufacturing tolerances and adequate wall thickness. Active cooling was explicitly prohibited, so thermal performance had to come from ventilation geometry alone without compromising the sealed, rigid assembly.",
      },
      {
        heading: "Design & Development",
        body: "Developed in Autodesk Fusion; approximately 12–15 custom mechanical components. Deliverables: native CAD, STEP models, production and assembly drawings, exploded assembly views, DXF files, full BOM, rendering assets, assembly documentation.",
      },
      {
        heading: "Prototype & Manufacturing",
        body: "Functional prototype 3D printed to validate fit, assembly and component integration, followed by two mechanical design revisions before final approval. Finalized design entered commercial production, with an initial manufacturing batch completed and additional units subsequently ordered.",
      },
      {
        heading: "Collaboration",
        body: "Executed alongside RF engineering, electronics and industrial design teams, the manufacturing partner, and the client's own engineering team.",
      },
    ],
    outcomes: [
      "Achieved 25 mm enclosure thickness while accommodating all internal components",
      "Delivered complete manufacturing documentation for production",
      "Commercial production initiated, followed by a larger production order",
      "Secured a four-year engineering support agreement",
      "Led to additional engineering projects from the same international client",
    ],
  },
  {
    slug: "uss2-switcher",
    order: 3,
    title: "USS2 Switcher — Compact Automotive Sensor Housing",
    category: "AUTOMOTIVE MECHANICAL ENGINEERING",
    client: "Automotive client, Yixing, China",
    status: "Design approved, prototype validated, production tooling complete",
    metrics: [
      { label: "Target volume", value: "10,000+ units" },
      { label: "Support", value: "4-year agreement" },
      { label: "Prototypes", value: "5" },
    ],
    summary:
      "Re-architected a client's box-type sensor concept into a fully sealed cylindrical housing — 18 mm diameter, 75 mm length — integrating a PCB, sensor assembly, wiring, and threaded automotive mounting inside one of the tightest packaging envelopes we've engineered.",
    highlights: [
      "18 mm × 75 mm envelope housing an 11 × 66 mm PCB, sensor, and wiring harness",
      "O-ring sealing system engineered for IP65-level protection under extreme size constraints",
      "Vibration-resistant internal rib structure, validated through internal testing",
      "Five prototype iterations from first fit-check to production-ready tooling",
    ],
    disciplines: [
      "Mechanical Design",
      "Sealing",
      "Vibration",
      "Injection Moulding DFM",
      "Automotive Packaging",
    ],
    hero: {
      src: "/process-discover.jpg",
      alt: "USS2 Switcher automotive sensor enclosure 3D model",
    },
    sections: [
      {
        heading: "Overview",
        body: "USS2 Switcher Model 1 is a compact automotive sensing device designed to detect objects within roughly 1 m at a 5° detection angle, with a 1 cm blind area, installed directly into a vehicle via a threaded cylindrical housing. The client originally provided a box-type concept and requested a fundamentally different mechanical architecture: a compact, threaded cylindrical enclosure integrating sensor, PCB, wiring and mounting within an 18 mm maximum diameter, protected against environmental exposure.",
      },
      {
        heading: "The Engineering Challenge",
        body: "Packaging a complete electronic assembly into an 18 mm × 75 mm cylindrical envelope — an 11 × 66 mm PCB, sensor assembly, internal wiring, mounting structure, sealing system, fasteners and manufacturing tolerances — while surviving automotive vibration and providing a sealed interface suitable for IP65-level protection.",
      },
      {
        heading: "Mechanical Design",
        body: "Developed around the client-provided PCB: cylindrical outer enclosure, internal structural framework, PCB and sensor mounting, cable routing, threaded automotive mounting interface, brackets and internal supports, O-ring sealing system, service/assembly access, and injection-molding-oriented ribs and snap-fit features. Approximately 2 mm wall thickness with internal ribs for rigidity within the limited volume.",
      },
      {
        heading: "Sealing & Vibration Engineering",
        body: "A silicone O-ring at the sensor interface — approximately 1.2 mm cross-section in a 0.8 × 1.4 mm sealing groove, engineered for roughly 15–30% compression while accounting for manufacturing tolerances and the limited diameter available. The enclosure was designed for IP65-level protection, with internal testing performed by our engineering team; formal laboratory validation is ongoing. For vibration resistance the PCB was mechanically supported using screw-mounted internal structures with additional elastomeric support, reinforced by internal ribs. During internal vibration testing the rib structure kept the PCB assembly constrained even under conditions where fastener loosening was observed — the architecture was built to control component movement under vibration, not merely to hold the electronics in place.",
      },
      {
        heading: "Prototype Development & Manufacturing Engineering",
        body: "Five prototypes produced via 3D printing for mechanical validation; the initial prototype achieved the intended fit, allowing the project to proceed without a major redesign. Design has reached client approval, with production tooling completed and final validation ongoing. Documentation includes native CAD, STEP files, 2D manufacturing and assembly drawings, exploded views, BOM.",
      },
      {
        heading: "Collaboration",
        body: "Coordination between our mechanical engineering team, the client's mechanical and electronics engineers, an external PCB development company, and the manufacturing team — with our team independently engineering the mechanical architecture around a PCB developed by a separate company.",
      },
    ],
    outcomes: [
      "18 mm diameter constraint achieved within a 75 mm compact form factor",
      "O-ring sealing architecture and vibration-resistant structural design validated internally",
      "Five prototypes manufactured; production-ready documentation and tooling complete",
      "Client approval obtained; planned production volume of 10,000+ units",
      "Four-year engineering support agreement, plus a follow-on Model 2",
    ],
  },
  {
    slug: "freshpod-platform",
    order: 4,
    title: "FreshPod Connected Platform",
    category: "CLOUD, IOT & PAYMENTS",
    client: "Freshpod India",
    status: "Live in production, two architecture generations",
    metrics: [
      { label: "Machines on platform", value: "190+" },
      { label: "Gen 1", value: "150+" },
      { label: "Gen 2", value: "40+" },
    ],
    summary:
      "Built the software backbone that turned Freshpod's sanitization hardware into a remotely managed commercial platform: dynamic UPI/QR payment sessions, ESP32 firmware, OTA update infrastructure, and a centralized fleet-management dashboard.",
    highlights: [
      "Dynamic payment-session architecture with QR pre-fetching to cut customer wait time",
      "OTA firmware pipeline — no manual servicing required for software updates",
      "Fleet dashboard: machine heartbeat, transaction tracking, dealership and operator management",
    ],
    disciplines: [
      "ESP32",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Firebase",
      "Razorpay",
      "MQTT",
      "OTA",
    ],
    hero: {
      src: "/freshpod-kiosks.png",
      alt: "FreshPod cloud and fleet management platform architecture",
    },
    sections: [
      {
        heading: "Overview",
        body: "Freshpod India brought us in to build the complete software and firmware ecosystem for its automated helmet sanitization machines. The challenge wasn't just controlling UV, fogging, thermal drying and exhaust systems — it was building a reliable connected platform capable of operating hundreds of machines in the field, handling payments, guiding customers through the cleaning cycle, and giving operators centralized control. We engineered the full stack, from embedded machine firmware to cloud backend and admin dashboard.",
      },
      {
        heading: "Embedded Firmware & Machine Control",
        body: "ESP32-based control architecture running the multi-stage sanitization sequence (UV sterilization, fogging, thermal drying, exhaust), door locking/unlocking safety logic, DWIN DGUS touchscreen integration, audio guidance via DFPlayer Mini, buzzer and status feedback, Wi-Fi connectivity, machine-level state management and recovery, time sync and operational logging, OTA update infrastructure, and machine heartbeat/online-offline monitoring.",
      },
      {
        heading: "Dynamic Payment Infrastructure",
        body: "We evolved the original static-QR system into a dynamic architecture: each transaction is tied to a dynamically generated payment session, with the machine requesting payment data from the backend, displaying the QR/UPI interface, and continuously verifying payment status. Once confirmed, the flow moves automatically — payment → verification → machine authorization → door access → sanitization cycle. We also implemented payment-session prefetching, preparing the next transaction's QR while the current cycle finishes, cutting customer wait time.",
      },
      {
        heading: "Cloud & Fleet Management",
        body: "Built on Next.js, Node.js, TypeScript, MongoDB and Firebase: machine monitoring and online/offline status, heartbeat monitoring, transaction and tap tracking, revenue and pricing management, dynamic payment configuration, OTA firmware management and version tracking, operator accounts, dealership and buyer/user management, and machine-level activity data.",
      },
      {
        heading: "Two Generations",
        body: "Generation 1 (static payment architecture) deployed across 150+ machines with static QR/payment workflow, MQTT-based transaction confirmation and Firebase-based monitoring. Generation 2 (dynamic payment and cloud architecture) deployed across 40+ machines with dynamic payment-session generation, backend payment verification, machine-specific transaction handling, enhanced fleet monitoring, OTA firmware management and centralized operational management. Lessons from Generation 1 directly informed Generation 2.",
      },
      {
        heading: "Built for Long-Term Operation",
        body: "A 3-year software and firmware update framework covering firmware/software updates, module upgrades, OTA deployments, payment-system improvements, dashboard enhancements and operational feature updates.",
      },
    ],
    outcomes: [
      "190+ deployed machines running the platform across two architecture generations",
      "Customer interface → payment → embedded controller → hardware → cloud → fleet dashboard, end to end",
      "3-year software and firmware update framework in place",
    ],
  },
  {
    slug: "freshpod-hmi",
    order: 5,
    title: "FreshPod Embedded HMI",
    category: "EMBEDDED UI / HMI",
    client: "Freshpod India",
    status: "Deployed across the Freshpod fleet",
    metrics: [
      { label: "Custom screens", value: "14" },
      { label: "Display", value: "8-inch 800 × 480 DWIN DGUS" },
    ],
    summary:
      "Designed and built the complete customer-facing touchscreen interface on DWIN's DGUS platform — a display environment with no HTML/JavaScript support — engineering a UART-based communication layer to deliver dynamic QR payments and real-time machine-state feedback.",
    highlights: [
      "14 custom screens covering the full payment-to-retrieval customer journey",
      "Dynamic QR rendering over UART/DGUS protocol — no browser engine available",
      "Tight synchronization between physical machine state and on-screen state",
    ],
    disciplines: [
      "DWIN DGUS",
      "UART",
      "ESP32 Firmware",
      "UI/UX",
      "Embedded Systems",
    ],
    hero: {
      src: "/freshpod-kiosks.png",
      alt: "FreshPod 8-inch touchscreen HMI interface design",
    },
    sections: [
      {
        heading: "Overview",
        body: "For Freshpod India's automated helmet sanitization machine we designed and implemented the complete customer-facing HMI/UI experience on the selected DWIN DGUS touchscreen platform. DGUS doesn't offer the flexibility of a conventional web-based interface — no HTML/JavaScript support — so instead of changing the hardware, we engineered the interface around DGUS's actual capabilities and built a reliable communication layer between the touchscreen and the ESP32 machine controller.",
      },
      {
        heading: "UI/UX for a Physical Machine",
        body: "Unlike a mobile or web interface, every screen corresponds to a real-world machine action. We designed the experience around the full customer journey — welcome, payment, door access, helmet placement, cleaning, sterilization, drying, completion, retrieval — with clear visual feedback at each stage so the customer always knows what the machine is doing, what they need to do next, and when the door will open.",
      },
      {
        heading: "14 Custom Machine Screens",
        body: "14 dedicated HMI screens covering customer interaction, payment, machine-operation states and completion states, built directly in the DWIN DGUS development environment — layouts, graphical elements, interaction areas and QR-code placement.",
      },
      {
        heading: "Solving the Dynamic QR Challenge",
        body: "The hardest technical piece was implementing dynamic payment QR codes on a display with no browser-based rendering. We built a communication architecture where the backend payment system generates dynamic UPI/QR data, which passes through ESP32 firmware over UART using the DGUS protocol to the display, where the customer scans it. This delivered a fully dynamic payment interaction while keeping the originally selected DWIN hardware.",
      },
      {
        heading: "Integrated Payment Experience & Firmware Sync",
        body: "The QR interface is wired into the full machine workflow (QR generated → displayed → payment detected → confirmed → cleaning initiated), and the ESP32 drives every screen transition so the visual state of the machine and its physical state stay synchronized.",
      },
    ],
    outcomes: [
      "A dedicated embedded HMI system combining UI/UX, DWIN DGUS, UART, ESP32 firmware, dynamic QR payments and machine-state visualization",
      "Delivered within the constraints of a display platform with no native web support",
      "Running as an integral part of the Freshpod customer experience",
    ],
  },
  {
    slug: "eggora",
    order: 6,
    title: "EGGORA — Modular, Tray-Agnostic Vending Architecture",
    category: "SMART AUTOMATION / VENDING",
    client: "Dadspire Solutions",
    status: "Phase 1 prototype in fabrication",
    metrics: [
      { label: "Phase 1 capacity", value: "~700 eggs" },
      { label: "Compartments", value: "42" },
      { label: "Expansion target", value: "~1,500 eggs" },
      { label: "CAD revisions", value: "~6" },
    ],
    summary:
      "Designed a high-density egg vending platform around commercially available 6-, 12- and 30-egg trays rather than a proprietary dispensing mechanism, backed by a custom modular control PCB (STM32 + Linux SoM + CAN backbone) built for expansion from day one.",
    highlights: [
      "Variable-pitch compartment architecture sized to real tray geometry, not a uniform grid",
      "~700-egg Phase 1 capacity across 42 compartments; expandable to ~1,500 eggs",
      "Modular cabinet expansion via CAN — additional door banks plug in without a new controller",
      "Custom KiCad PCB architecture: STM32 real-time control, Linux SoM, CAN comms, door-controller subsystem",
      "Tray research across 20+ locally available brands informed the entire mechanical layout",
    ],
    disciplines: [
      "Mechanical",
      "KiCad PCB",
      "STM32",
      "Linux SoM",
      "CAN Bus",
      "Fusion 360",
      "Sheet Metal DFM",
    ],
    hero: {
      src: "/freshpod.jpg",
      alt: "EGGORA smart modular egg vending machine CAD render",
    },
    sections: [
      {
        heading: "Overview",
        body: "Dadspire Solutions came to us with reference designs based on existing Chinese egg vending machines, but the brief wasn't to reproduce that machine — it was to maximize usable storage in a compact footprint while supporting multiple commercial egg-tray formats. The business model added a real constraint: 6-egg trays matter for attracting customers, while 12- and 30-egg trays carry better margins, so the cabinet needed to accommodate all three formats while positioning the smaller product deliberately rather than wasting premium volume on a uniform grid.",
      },
      {
        heading: "Tray Research Drove the Architecture",
        body: "We surveyed roughly 20 egg-tray brands available locally around the client's site and hatchery, evaluating length, width, height, geometry and practical usability inside the cabinet. Common tray height across brands runs about 133.5 mm, with a 6-egg tray at roughly 178 × 178 mm and a 30-egg tray at roughly 381 mm. The core design decision: build the machine around commercially available trays rather than a custom, proprietary egg-storage mechanism — so the machine isn't sensitive to minor variation in egg size or shape, and the customer isn't locked into one tray supplier.",
      },
      {
        heading: "Variable-Pitch Compartment Architecture",
        body: "Instead of 42 identical boxes, compartment size varies by tray format. In Phase 1 that's 12 six-egg compartments, 15 twelve-egg compartments and 15 thirty-egg compartments: 42 compartments totaling roughly 702 eggs, with an expansion target of ~1,500. The machine stands 1,828 mm high × 1,060 mm wide × 406 mm deep, weighs approximately 75–125 kg, is built from stainless steel via CNC bending, and is modeled in Fusion 360.",
      },
      {
        heading: "No Dispensing Mechanism, By Design",
        body: "There's no motorized egg-by-egg dispensing. The workflow is: customer selects a tray format → payment confirmed → the corresponding compartment unlocks → the customer opens the door and removes the tray → the door closes. That single decision eliminates an entire category of mechanical failure modes — individual egg handling, egg-by-egg actuation, double dispensing, egg collision, motorized dispensing, and the maintenance burden that comes with them — shifting the engineering challenge from \"dispense one egg reliably\" to \"store and secure trays at high density.\"",
      },
      {
        heading: "Doors & Security",
        body: "Each compartment has its own door — stainless steel with a transparent viewing window, hinged, secured with a 9–12 V solenoid lock. Control electronics live in a dedicated rear compartment, physically separated from the egg-storage area. Cable management runs just three wires across all cabinets, with CAN bus handling inter-module control.",
      },
      {
        heading: "Environmental Monitoring",
        body: "Phase 1 uses passive ventilation rather than active refrigeration: three fans positioned around the cabinet, and three temperature sensors at top, middle and bottom, building a temperature map rather than a single reading. Phase 1 is engineered to generate the data Phase 2 will need.",
      },
      {
        heading: "Modular & Future-Phased Architecture",
        body: "The base cabinet can be expanded by adding another cabinet with roughly 20 additional doors — no new MCU required; the added cabinet's internal PCB connects via a plug-and-play wiring interface over CAN. The roadmap is explicitly phased: Phase 1 (passive ventilation + temperature monitoring) → Phase 2 (active AC cooling, cabinet designed to extend in height) → Phase 3 (a separate boiler/cooking module, deliberately kept as its own adjacent cabinet).",
      },
      {
        heading: "Custom PCB & Door Controller",
        body: "A custom modular control PCB designed in KiCad as the electrical backbone — organized into distinct functional blocks (power management, STM32 controller, Linux SoM interface, CAN communication, door controller, MOSFET/actuator drivers, safety circuitry, external interfaces, connectors, 3.3 V and 5 V regulation). The architecture splits real-time control (STM32 — sensors, safety, door/actuator control, machine I/O) from higher-level computing (Linux SoM — application layer, connectivity, vending logic), so the real-time layer isn't dependent on the higher-level OS. A dedicated door-controller board isolates the physical access mechanism from the main controller. Safety is handled as an architectural requirement — door-state monitoring, fault detection, fail-safe behavior — rather than an afterthought.",
      },
      {
        heading: "Manufacturing Engineering",
        body: "Production documentation includes 3D CAD, 2D manufacturing drawings, DXF files, BOM, bend drawings, assembly drawings, exploded views, fastener specifications, tolerances and welding specifications. Approximately 6 CAD revisions, driven primarily by cabinet layout and space constraints around the selected egg trays.",
      },
      {
        heading: "The Hardest Problem",
        body: "Developing the machine around universal egg trays — so any widely available, high-usability tray format could fit without needing a custom tray design — because a proprietary tray would have locked the client into a single supplier and added an entire mechanical subsystem to maintain.",
      },
    ],
    outcomes: [
      "Tray-agnostic architecture accommodating 6-, 12- and 30-egg formats",
      "~700-egg Phase 1 capacity, engineered to expand to ~1,500 eggs",
      "Modular cabinet expansion and a phased roadmap without redesigning the core cabinet",
      "Custom modular PCB architecture (STM32 + Linux SoM + CAN)",
      "One prototype currently in fabrication, following ~6 mechanical CAD revisions",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
