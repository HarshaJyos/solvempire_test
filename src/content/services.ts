/**
 * SolveMpire Services & Why Partner Pillars
 * =========================================
 * Single source of truth for engineering disciplines and partnership pillars.
 * Strictly backed by shipped work and real tooling.
 */

export type ServiceDiscipline = {
  id: string;
  slug: string;
  order: string;
  title: string;
  eyebrow: string;
  summary: string;
  capabilities: string[];
  tools: string[];
  caseStudySlugs: string[];
};

export const serviceDisciplines: ServiceDiscipline[] = [
  {
    id: "mechanical",
    slug: "mechanical",
    order: "01",
    eyebrow: "PHYSICAL ARCHITECTURE",
    title: "Mechanical Product Engineering",
    summary:
      "Industrial and product CAD, enclosure design, sealing and ingress protection, thermal and airflow engineering, vibration-resistant structures, sheet metal and injection-moulding DFM, and complete production documentation.",
    capabilities: [
      "Industrial enclosure design & internal structural frameworks",
      "Precision O-ring sealing & ingress protection engineering",
      "Passive thermal management & airflow optimization",
      "Vibration-resistant PCB mounting & structural ribbing",
      "Sheet metal (CNC bending) & injection moulding DFM",
      "Manufacturing packages: CAD, STEP, DXF, BOM, and assembly drawings",
    ],
    tools: ["Autodesk Fusion 360", "Sheet Metal DFM", "Injection Moulding DFM"],
    caseStudySlugs: ["secure-comms-enclosure", "uss2-switcher", "freshpod-machine", "eggora"],
  },
  {
    id: "electronics",
    slug: "electronics",
    order: "02",
    eyebrow: "HARDWARE & REAL-TIME CONTROL",
    title: "Electronics & Embedded Systems",
    summary:
      "Custom PCB design, real-time control architecture, actuator drive, safety and interlock circuitry, embedded firmware, OTA update pipelines, and machine-state management.",
    capabilities: [
      "Custom multilayer schematic & PCB layout in KiCad",
      "Real-time microcontroller firmware (STM32, ESP32)",
      "Linux System-on-Module (SoM) application integration",
      "Industrial bus communication (CAN bus, UART, RS-485)",
      "Motor, solenoid, and actuator driver circuitry",
      "Fail-safe safety interlocks & remote error alerting",
    ],
    tools: ["KiCad", "ESP32", "STM32", "Linux SoM", "CAN bus"],
    caseStudySlugs: ["freshpod-machine", "eggora", "freshpod-platform"],
  },
  {
    id: "hmi",
    slug: "hmi",
    order: "03",
    eyebrow: "PHYSICAL INTERFACES",
    title: "Machine Software & HMI",
    summary:
      "Touchscreen HMI development on constrained embedded platforms, UART/DGUS protocol layers, customer-journey UX for physical machines, and dynamic payment display flows.",
    capabilities: [
      "Custom touchscreen UI/UX design for physical machinery",
      "DWIN DGUS embedded display development & layout engineering",
      "UART-to-microcontroller synchronization protocols",
      "Dynamic UPI/QR payment code rendering without browser engines",
      "Step-by-step operator workflows & machine-state feedback",
      "Integrated audio cues & visual status indicators",
    ],
    tools: ["DWIN DGUS", "UART Protocols", "Razorpay", "Dynamic UPI/QR"],
    caseStudySlugs: ["freshpod-hmi", "freshpod-machine"],
  },
  {
    id: "cloud",
    slug: "cloud",
    order: "04",
    eyebrow: "CONNECTED FLEETS",
    title: "Cloud, IoT & Digital Platforms",
    summary:
      "Centralized fleet management dashboards, device heartbeat and telemetry, transaction and revenue tracking, OTA firmware versioning, and secure web applications.",
    capabilities: [
      "Real-time machine monitoring & online/offline heartbeat detection",
      "Dynamic payment-session backend with prefetching architecture",
      "Remote OTA firmware distribution & version management",
      "Telemetry, error logging, and diagnostic dashboards",
      "Multi-tenant dealership, operator, and buyer role management",
      "Scalable cloud backends built on Next.js, Node.js, and TypeScript",
    ],
    tools: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Firebase", "MQTT"],
    caseStudySlugs: ["freshpod-platform"],
  },
];

export type PartnerPillar = {
  id: string;
  tag: string;
  title: string;
  description: string;
  tools: { name: string; category: string }[];
  projectSlug: string;
};

export const partnerPillars: PartnerPillar[] = [
  {
    id: "01",
    tag: "END-TO-END ENGINEERING",
    title: "Turning Bold Concepts Into Production-Ready Products",
    description:
      "We engineered the complete Freshpod machine — stainless-steel enclosure, custom ESP32 PCB, embedded firmware, DGUS touchscreen HMI, and cloud fleet dashboard under one roof. Our unified engineering model eliminates coordination friction between separate mechanical, hardware, and software vendors.",
    tools: [
      { name: "Fusion 360", category: "Mechanical CAD" },
      { name: "KiCad", category: "Custom PCB" },
      { name: "Next.js", category: "Cloud & IoT" },
    ],
    projectSlug: "freshpod-machine",
  },
  {
    id: "02",
    tag: "CONSTRAINED PACKAGING",
    title: "Extreme Packaging Density Under Strict Constraints",
    description:
      "We packaged complete electronic sensing systems into an 18 mm × 75 mm cylindrical envelope for the USS2 Switcher, and delivered a 25 mm slim secure communications enclosure with passive-only cooling. We excel where space, thermal limits, and environmental sealing converge.",
    tools: [
      { name: "Fusion 360", category: "Enclosure CAD" },
      { name: "DFM", category: "Tolerance & Tooling" },
      { name: "Thermal Analysis", category: "Passive Cooling" },
    ],
    projectSlug: "uss2-switcher",
  },
  {
    id: "03",
    tag: "SMART CONNECTED SYSTEMS",
    title: "Connected Hardware Platforms Built for Real-World Fleets",
    description:
      "Our connected platform powers 190+ Freshpod machines in commercial operation with dynamic UPI/QR payment sessions, automated machine synchronization, and centralized fleet telemetry. We bridge physical machine states with real-time cloud management.",
    tools: [
      { name: "ESP32", category: "Embedded Firmware" },
      { name: "Next.js", category: "Fleet Dashboard" },
      { name: "MQTT", category: "Telemetry" },
    ],
    projectSlug: "freshpod-platform",
  },
  {
    id: "04",
    tag: "RELIABILITY IN THE FIELD",
    title: "Engineering Products for Harsh Real-World Performance",
    description:
      "When commercial deployments of 200+ machines surfaced controller and fogging equipment issues, we investigated and resolved them through iterative hardware revisions and firmware updates. We engineer for long-term operational resilience, not just laboratory demos.",
    tools: [
      { name: "KiCad", category: "PCB Revisions" },
      { name: "ESP32", category: "Fault Handling" },
      { name: "STM32", category: "Real-time Safety" },
    ],
    projectSlug: "freshpod-machine",
  },
  {
    id: "05",
    tag: "PRODUCTION READY",
    title: "From Engineering Designs to Tooling and Manufacturing",
    description:
      "We provided comprehensive production documentation and tooling support for the 10,000+ unit USS2 automotive sensor, and delivered complete DFM drawings for the 42-compartment EGGORA vending system. We build practical designs ready for CNC bending, sheet metal, and injection molding.",
    tools: [
      { name: "Fusion 360", category: "Production CAD" },
      { name: "Sheet Metal DFM", category: "CNC Bending" },
      { name: "STEP & DXF", category: "Tooling Packages" },
    ],
    projectSlug: "eggora",
  },
  {
    id: "06",
    tag: "LONG-TERM SUPPORT",
    title: "Supporting Hardware and Software Throughout the Lifecycle",
    description:
      "We back our engineering deliverables with long-term support agreements ranging from 4 years for specialized enclosures to up to 10 years for complete commercial machine fleets. Our team provides ongoing mechanical refinement, firmware upgrades, and on-site support.",
    tools: [
      { name: "OTA Firmware", category: "Remote Updates" },
      { name: "Next.js", category: "Cloud Platform" },
      { name: "KiCad", category: "Hardware Support" },
    ],
    projectSlug: "freshpod-machine",
  },
];
