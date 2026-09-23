/**
 * Canonical Case Studies Data
 * ===========================
 * Strictly derived from canonical Project Description specification.
 * High-precision engineering metrics, authentic technical highlights,
 * and high-resolution visual assets.
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
  title: string;          // homepage & listing card title
  category: string;       // eyebrow, uppercase
  client: string;
  status: string;
  summary: string;        // 1–2 sentences, homepage & portfolio card
  metrics?: CaseStudyMetric[];
  highlights: string[];
  disciplines: string[];  // tags
  hero: { src: string; alt: string };
  sections: CaseStudySection[];  // full engineering dossier chapters
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
      { label: "Helmets processed", value: "200,000+ (reported)" },
      { label: "Countries deployed", value: "3" },
      { label: "Mechanical components", value: "80+ unique parts" },
    ],
    summary:
      "Modernized and redesigned FreshPod's automated helmet sanitization machine from the ground up — reverse-engineering the complete physical assembly in Autodesk Fusion 360 (80+ parts), recreating the master control PCB to eliminate legacy freeze states, rewriting firmware for dynamic Razorpay UPI QR codes, redesigning DGUS HMI tools, and deploying OTA updates with real-time heartbeat telemetry across 200+ machines in 3 countries.",
    highlights: [
      "Complete 3D CAD redesign in Autodesk Fusion 360 (80+ unique mechanical components, stainless-steel CNC enclosure)",
      "Re-engineered custom ESP32 master control PCB from scratch across 5+ revisions, resolving legacy hardware lock-ups",
      "Redesigned DWIN DGUS display tooling and binary UART protocol to render dynamic Razorpay UPI QR codes natively",
      "Over-The-Air (OTA) firmware pipeline with dual-partition flash recovery and live machine heartbeat diagnostics",
      "Field-tested aerodynamic ventilation loop and micro-perforated mesh exhaust for deep interior helmet treatment",
      "Long-term engineering partnership with up to 10-year support agreement covering mechanical, PCB, and firmware revisions",
    ],
    disciplines: [
      "Mechanical CAD (Fusion 360)",
      "Custom PCB Re-Engineering",
      "ESP32 C++ Firmware",
      "DWIN DGUS HMI",
      "Razorpay Dynamic UPI",
      "Thermal Aerodynamics",
      "OTA Updates & Telemetry",
      "Volume Production Support",
    ],
    hero: {
      src: "/case_Studies/freshpod.png",
      alt: "Freshpod automated helmet sanitization machine production enclosure",
    },
    sections: [
      {
        heading: "Overview & Modernization Genesis",
        body: "FreshPod India had developed an early-generation physical machine for automated helmet sanitization, but was facing severe scaling and field reliability bottlenecks: their legacy control PCB frequently locked up under relay switching loads, the mechanical structure lacked standardized production CAD documentation, the display could not process dynamic payment QR codes, and operators had zero remote observability or OTA update capabilities.\n\nFreshpod partnered with SolveMpire to execute a complete end-to-end modernization. Our team reverse-engineered and redesigned the entire physical machine in Autodesk Fusion 360, recreated the master electronics PCB from scratch, rebuilt the embedded firmware and DGUS HMI tools for dynamic Razorpay UPI integration, and established a cloud-connected fleet management platform with real-time heartbeats and OTA updates.\n\nThe modernized machine scaled from prototype remediation to a robust commercial fleet of 200+ deployed units across India, Nepal, and Sri Lanka.",
      },
      {
        heading: "From Payment to Sanitized Helmet Workflow",
        body: "The machine was designed around a frictionless 5-minute operational workflow:\n\n1. Customer initiates the service via the touchscreen interface.\n2. Customer completes payment through the integrated Razorpay UPI/QR workflow.\n3. The machine authorizes the transaction and automatically releases the magnetic door.\n4. The operator places the helmet inside the sanitization chamber and secures the door.\n5. The automated sanitization sequence executes (UV treatment → fogging treatment → final UV treatment).\n6. Upon cycle completion, the door releases, and the operator removes and dries the helmet.\n\nThe chamber was engineered to accommodate a broad spectrum of commercial helmet geometries rather than requiring a helmet-specific fixture.",
      },
      {
        heading: "Complete Mechanical Product Development (80+ Components)",
        body: "Our mechanical engineering team was responsible for the machine's complete structural architecture. The production design contains 80+ unique mechanical components, including:\n\n• Main stainless-steel enclosure (roughly 5 ft high × 2 ft wide × 2 ft deep, 50–75 kg)\n• Internal sanitization chamber & equipment isolation chambers\n• Precision door assemblies & magnetic locking arrangement\n• Helmet positioning structure & UV/fogging module mounts\n• Internal ventilation routing, fan mounts, and airflow management\n• Cable routing channels, access/service panels, viewing windows, and casters\n\nThe production enclosure is manufactured from stainless steel using CNC bending and sheet-metal fabrication processes.",
      },
      {
        heading: "Sanitization Chamber & Thermal Engineering",
        body: "One of the major engineering hurdles was ensuring that the sanitization medium reached the deep interior of different helmet shapes, rather than merely washing over exterior surfaces.\n\nThe helmet is positioned with its head opening oriented directly toward the treatment airflow. We designed a dedicated fan-assisted ventilation loop, incorporating a precision mesh-based airflow outlet at the end of the flow path to improve distribution and achieve a uniform treatment vortex around the helmet.\n\nBecause the UV lamps and fogging generators produce concentrated heat inside the cabinet, our team conducted extensive thermal testing, ventilation optimization, and mechanical revisions to keep temperatures strictly within safe operating bounds without active refrigeration shortcuts.",
      },
      {
        heading: "Custom Electronics & ESP32 Machine Control PCB",
        body: "Rather than using disconnected third-party controller boards, our team developed a unified custom control PCB built around an ESP32 microcontroller with a 12 V power architecture. The PCB handles:\n\n• Magnetic door locking & state monitoring\n• UV lamp & fogging system relay control\n• Fan speed control & current sensing\n• Touchscreen communication over UART\n• Machine-state management & fail-safe interlocks\n• Wireless connectivity & OTA firmware updates\n\nThe PCB underwent 5+ hardware revisions before reaching its final production-grade reliability.",
      },
      {
        heading: "Embedded Firmware & State Control Architecture",
        body: "The machine firmware was developed in C++/Arduino for the ESP32. The firmware manages deterministic state transitions across the entire physical workflow:\n\nPayment confirmation → authorization → door release → timer management → sanitization sequencing → fault detection → completion notification.\n\nDefined fault states were implemented for payment timeouts, UV/fogging/fan malfunctions, and connectivity loss, ensuring the machine enters a safe state and reports diagnostics back to the central server.",
      },
      {
        heading: "Razorpay Payment & DWIN Touchscreen HMI Integration",
        body: "The machine features an 8-inch 800 × 480 touchscreen running a custom HMI developed on DWIN's DGUS platform. Because DGUS does not provide a web browser environment with HTML/JavaScript, our team built a custom UART communication protocol between the ESP32 and display.\n\nDynamic UPI payment sessions generated by the backend are transmitted over UART to the DGUS display, allowing customers to scan a live dynamic QR code. Once payment is verified, the ESP32 automatically drives the screen transitions and physical door locks in perfect synchronization.",
      },
      {
        heading: "Remote Monitoring & OTA Infrastructure",
        body: "We built a centralized cloud platform that allows operators to monitor deployed machines remotely. The system provides real-time machine heartbeats, online/offline status, revenue telemetry, error logging, and over-the-air (OTA) firmware deployments.\n\nThis infrastructure allows the engineering team to deploy software enhancements and firmware patches remotely across the entire fleet without requiring on-site service visits.",
      },
      {
        heading: "Prototype to Commercial Production in Andhra Pradesh",
        body: "Development spanned 2 major physical prototypes, 10+ mechanical revisions, and 5+ PCB revisions. Prototype testing identified and solved critical airflow, fan performance, heat dissipation, and mechanical packaging constraints.\n\nThe finalized machine moved into commercial volume manufacturing in Andhra Pradesh, India, with our team supplying complete production CAD packages, 2D drawings, BOMs, and manufacturing support.",
      },
      {
        heading: "Continuous Field Engineering & 10-Year Support Agreement",
        body: "With 200+ machines operating across India, Nepal, and Sri Lanka processing over 200,000 helmets, field data informed continuous hardware and software refinements.\n\nOur partnership with Freshpod is backed by an engineering support agreement extending up to 10 years, covering ongoing mechanical improvements, firmware updates, PCB revisions, and technical support.",
      },
    ],
    outcomes: [
      "200+ machines commercially deployed across India, Nepal, and Sri Lanka",
      "200,000+ helmets reportedly processed (~30–40 helmets daily capacity per machine)",
      "80+ unique mechanical components, 10+ mechanical revisions, and 5+ PCB hardware iterations",
      "End-to-end integration: Mechanical CAD + Custom PCB + ESP32 Firmware + DGUS HMI + Cloud OTA",
      "Long-term partnership with up to 10-year engineering support agreement",
    ],
  },
  {
    slug: "secure-comms-enclosure",
    order: 2,
    title: "Portable Secure Communications Device — Mechanical Product Design",
    category: "MECHANICAL PRODUCT ENGINEERING",
    client: "International security-technology client",
    status: "In commercial production",
    metrics: [
      { label: "Total thickness", value: "25 mm" },
      { label: "Enclosure footprint", value: "90 × 60 × 25 mm" },
      { label: "Custom components", value: "12–15 parts" },
      { label: "Support agreement", value: "4 years" },
    ],
    summary:
      "Successfully packaged a 16650 battery, RF modules, PCB, structural features, sealing elements, and passive thermal management within a 25 mm enclosure while maintaining production-ready manufacturability.",
    highlights: [
      "Achieved strict 25 mm total thickness constraint matching a conventional power bank form factor",
      "Packaged 16650 rechargeable battery, multiple RF transducer modules, and custom control PCB",
      "Passive-only thermal management engineered through ventilation geometry without active fans",
      "Waterproof sealing via precision mating lips, joints, and vibration-free component retention",
      "Complete DFM package: Fusion 360 native CAD, STEP, 2D drawings, BOM, and assembly guides",
      "Four-year engineering support agreement and follow-on projects from the international client",
    ],
    disciplines: [
      "Mechanical Design",
      "Thermal Engineering",
      "Waterproof Sealing",
      "DFM",
      "Fusion 360",
      "Electronics Packaging",
    ],
    hero: {
      src: "/case_Studies/communication-device.png",
      alt: "Portable secure communications device enclosure mechanical design",
    },
    sections: [
      {
        heading: "Overview & Design Brief",
        body: "Designed a compact, production-ready mechanical enclosure for a portable handheld communications device intended for professional security applications.\n\nThe brief was to maintain the pocketable form factor of a conventional power bank (90 × 60 × 25 mm) while packaging high-density electronic assemblies, an internal rechargeable battery, and multiple RF modules without compromising structural integrity or manufacturability.",
      },
      {
        heading: "Scope of Work & Mechanical Architecture",
        body: "Our engineering team was responsible for the complete mechanical product development, including:\n\n• Industrial enclosure styling & internal structural framework\n• PCB mounting architecture & battery compartment integration\n• Display mounting system, button placement, and ergonomic layout\n• Heat dissipation vent design & waterproof enclosure sealing\n• Snap-fit and precision mechanical joint development\n• Structural reinforcement for vibration-free component retention\n• Manufacturing-ready assembly documentation & BOM",
      },
      {
        heading: "The Engineering Challenge: Packaging Within 25 mm Profile",
        body: "The defining constraint was thickness: 25 mm or less total profile. Inside that tight envelope we packaged:\n\n• 16650 rechargeable battery cell\n• Multiple RF transducer modules\n• Control PCB & interconnects\n• Mechanical fastening bosses & snap-fits\n• Structural wall thickness & manufacturing tolerances\n• Passive heat dissipation channels\n\nBecause the client explicitly prohibited active cooling solutions such as fans, thermal performance had to come from ventilation geometry alone without compromising the sealed, rigid assembly.",
      },
      {
        heading: "Design & Development in Autodesk Fusion",
        body: "Developed in Autodesk Fusion, the mechanical package includes approximately 12–15 custom mechanical components. Deliverables provided to manufacturing partners included:\n\n• Native CAD files & STEP models\n• Production drawings & detailed assembly drawings\n• Exploded assembly views & DXF profiles\n• Complete Bill of Materials (BOM) & rendering assets\n• Step-by-step assembly documentation",
      },
      {
        heading: "Prototype Validation & Commercial Production",
        body: "A functional prototype was manufactured using precision 3D printing to validate component clearances, snap-fit engagement, and assembly ergonomics. Following prototype evaluation, two mechanical design revisions were completed before final client approval.\n\nThe finalized design entered commercial production, with an initial manufacturing batch completed and larger follow-on production orders subsequently placed.",
      },
      {
        heading: "Multidisciplinary Collaboration & Outcomes",
        body: "The project was executed in close collaboration with RF engineers, electronics teams, industrial designers, and manufacturing partners. Successful delivery resulted in a 4-year engineering support agreement and led to additional follow-on engineering engagements from the same international client.",
      },
    ],
    outcomes: [
      "Achieved 25 mm enclosure thickness while accommodating battery, RF modules, and PCB",
      "Delivered complete manufacturing documentation for seamless production tooling",
      "Initial commercial manufacturing run completed, followed by a larger repeat production order",
      "Secured a four-year engineering support agreement with repeat international projects",
    ],
  },
  {
    slug: "uss2-switcher",
    order: 3,
    title: "USS2 Switcher — Compact IP65 Automotive Sensor Housing",
    category: "AUTOMOTIVE MECHANICAL ENGINEERING",
    client: "Automotive client, Yixing, China",
    status: "Design approved | Production tooling completed",
    metrics: [
      { label: "Packaging envelope", value: "18 mm ⌀ × 75 mm" },
      { label: "Planned volume", value: "10,000+ units" },
      { label: "Prototypes tested", value: "5 iterations" },
      { label: "Support agreement", value: "4 years" },
    ],
    summary:
      "Engineered an 18 mm × 75 mm cylindrical automotive sensor enclosure integrating a 66 mm PCB, sensor assembly, wiring, threaded vehicle mounting, and O-ring sealing within an extremely constrained package.",
    highlights: [
      "18 mm diameter × 75 mm length threaded cylindrical body for direct automotive installation",
      "Packaged an 11 × 66 mm PCB with ~1.2 mm component clearance, sensor assembly, and wiring harness",
      "Silicone O-ring sealing groove (0.8 × 1.4 mm, 15–30% compression) engineered for IP65 protection",
      "Internal rib structure engineered to constrain PCB movement under severe automotive vibration",
      "Five physical prototype iterations from first fit-check to client approval and production tooling",
      "Planned production volume exceeding 10,000+ units with four-year support agreement and Model 2",
    ],
    disciplines: [
      "Mechanical Engineering",
      "IP65 Sealing",
      "Vibration Engineering",
      "Injection Moulding DFM",
      "Automotive Packaging",
    ],
    hero: {
      src: "/case_Studies/uss2-switcher.png",
      alt: "USS2 Switcher compact automotive sensor enclosure 3D model",
    },
    sections: [
      {
        heading: "Overview & Architectural Transformation",
        body: "USS2 Switcher Model 1 is a compact automotive sensing device designed to detect objects within approximately 1 m at a 5° detection angle, with a 1 cm blind area, installed directly into a vehicle via a threaded cylindrical housing.\n\nThe client originally provided a box-type concept and requested a fundamentally different mechanical architecture: a compact cylindrical, threaded sensor enclosure integrating the sensor, PCB, wiring, and mounting within an 18 mm maximum diameter with environmental protection.",
      },
      {
        heading: "The Engineering Challenge: 18 mm × 75 mm Cylindrical Packaging",
        body: "The core challenge was fitting the complete electronic assembly into an extremely constrained cylindrical envelope (18 mm diameter × 75 mm length). Inside this volume, the design accommodates:\n\n• 11 × 66 mm PCB with ~1.2 mm component clearances\n• Ultrasonic sensor assembly & internal wiring harness\n• Threaded automotive mounting interface & internal supports\n• O-ring environmental sealing system & assembly access\n• Vibration-resistant internal ribs & production tolerances",
      },
      {
        heading: "IP65 Sealing Design & O-Ring Compression Geometry",
        body: "Environmental sealing was one of the most demanding aspects of the design. A silicone O-ring was incorporated into the sensor interface:\n\n• ~1.2 mm O-ring cross-section\n• 0.8 × 1.4 mm precision sealing groove\n• 15–30% target compression across manufacturing tolerances\n\nThe enclosure was engineered for IP65-level protection, with internal pressure testing performed by our engineering team and formal laboratory validation ongoing.",
      },
      {
        heading: "Vibration Resistance & PCB Retention Strategy",
        body: "Because the device is installed directly into an automobile, surviving mechanical vibration was a critical design driver. The PCB was mechanically supported using screw-mounted internal structures with additional elastomeric support and internal ribs.\n\nDuring internal vibration testing, the rib structure kept the PCB assembly rigidly constrained even under severe conditions where fastener loosening was observed — creating an architecture designed not merely to hold electronics, but to control component movement under continuous automotive vibration.",
      },
      {
        heading: "Prototype Iterations & Production Tooling",
        body: "A total of five 3D-printed prototype iterations were manufactured for mechanical validation. The initial prototype achieved the intended fit, allowing the project to proceed rapidly into production tooling without a major redesign.\n\nComplete production documentation was delivered, including native CAD, STEP models, 2D manufacturing drawings, exploded views, and BOM. Production tooling has been completed with planned volume of 10,000+ units.",
      },
    ],
    outcomes: [
      "18 mm diameter constraint achieved within a 75 mm compact form factor",
      "O-ring sealing architecture and vibration-resistant structural design validated internally",
      "Five prototypes manufactured; production-ready documentation and tooling completed",
      "Client approval obtained; planned commercial production volume of 10,000+ units",
      "Four-year engineering support agreement, plus development of follow-on USS2 Model 2",
    ],
  },
  {
    slug: "freshpod-platform",
    order: 4,
    title: "FreshPod Connected Helmet Sanitization Platform",
    category: "CLOUD, IOT & PAYMENTS",
    client: "Freshpod India",
    status: "Live in production (190+ machines)",
    metrics: [
      { label: "Machines on platform", value: "190+" },
      { label: "Gen 1 deployments", value: "150+" },
      { label: "Gen 2 deployments", value: "40+" },
      { label: "Software framework", value: "3-year update framework" },
    ],
    summary:
      "We engineered the complete connected software and firmware modernization for FreshPod India — upgrading legacy firmware to handle dynamic Razorpay UPI QR codes, building custom DGUS display tooling, deploying dual-partition OTA updates, and building centralized cloud fleet telemetry across 190+ deployed machines.",
    highlights: [
      "Full firmware overhaul: ESP32 FreeRTOS control → Dynamic Razorpay payments → Cloud backend → Fleet telemetry",
      "Dynamic payment session generation with QR pre-fetching to cut customer waiting time to zero",
      "Custom DWIN DGUS protocol tools allowing non-browser hardware to render real-time payment QR codes",
      "Centralized fleet management: real-time machine heartbeat, error tracking, revenue metrics, and operator RBAC",
      "Over-the-air (OTA) firmware pipeline enabling remote machine updates without manual field servicing",
      "Two architecture generations deployed across 190+ machines with 3-year software update framework",
    ],
    disciplines: [
      "ESP32 Firmware",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Firebase",
      "Razorpay Dynamic UPI",
      "MQTT Telemetry",
      "OTA Updates",
      "IoT Fleet Management",
    ],
    hero: {
      src: "/case_Studies/freshpod_dashboard.png",
      alt: "FreshPod cloud and fleet management platform architecture dashboard",
    },
    sections: [
      {
        heading: "Overview: Modernizing Machine Control & Fleet Observability",
        body: "FreshPod India had early-stage machines deployed in the field, but the original software stack suffered from reliability bottlenecks: the machine controller lacked dynamic payment capabilities, operators had no visibility into machine health or revenue, and firmware updates required manual on-site visits.\n\nSolveMpire was engaged to engineer the complete software, firmware, and cloud modernization. We rebuilt the ESP32 firmware with deterministic state control, redesigned the DGUS display tools to handle dynamic Razorpay QR codes, and built a centralized cloud management platform with live heartbeats, transaction analytics, and remote OTA deployment.\n\nToday, the platform connects over 190 machines across India, processing thousands of daily sanitization sessions seamlessly.",
      },
      {
        heading: "Embedded Firmware & Deterministic Machine Control",
        body: "Our team developed the ESP32 machine control architecture managing the multi-stage sanitization sequence (UV sterilization, fogging, thermal drying, and exhaust), door safety interlocks, DWIN touchscreen communication over UART, audio guidance via DFPlayer Mini, buzzer status feedback, Wi-Fi connectivity, time sync, and heartbeat telemetry.",
      },
      {
        heading: "Dynamic Payment Infrastructure & QR Pre-fetching",
        body: "We evolved the original static-QR workflow into a dynamic payment session architecture. Each transaction is dynamically generated by the cloud backend, rendered on the machine's display, and continuously verified.\n\nOnce payment is confirmed, the system immediately authorizes access and triggers the sanitization sequence. We also implemented payment-session prefetching, preparing the next transaction's QR code while the current cycle finishes, cutting customer wait time between uses.",
      },
      {
        heading: "Cloud Backend & Fleet Management Dashboard",
        body: "We developed a centralized management dashboard built on Next.js, Node.js, TypeScript, MongoDB, and Firebase. The platform provides:\n\n• Machine online/offline heartbeat monitoring & error logging\n• Transaction tracking, tap volume, and dynamic pricing management\n• Dealership, buyer, and operator role-based access control (RBAC)\n• Centralized OTA firmware versioning and deployment tracking\n• Machine-level activity analytics and operational telemetry",
      },
      {
        heading: "Two Generations of Fleet Evolution",
        body: "The platform evolved through two major architectural generations:\n\n• Generation 1 (Static Payment Architecture): Deployed across 150+ machines with static QR/payment workflow, MQTT transaction confirmation, and Firebase telemetry.\n• Generation 2 (Dynamic Payment & Cloud Architecture): Deployed across 40+ machines with dynamic payment sessions, backend verification, enhanced fleet monitoring, and OTA firmware management.",
      },
      {
        heading: "Built for Long-Term Operation: 3-Year Framework",
        body: "The platform includes a 3-year software and firmware update framework covering firmware updates, module upgrades, OTA deployments, payment improvements, and dashboard enhancements — enabling FreshPod to continuously upgrade its fleet remotely without on-site servicing.",
      },
    ],
    outcomes: [
      "190+ deployed machines running the connected platform across two architecture generations",
      "Unified customer interface → payment → embedded controller → hardware → cloud backend → admin dashboard",
      "Dynamic QR payment architecture with prefetching to minimize customer wait times",
      "3-year software and firmware update framework in active operation",
    ],
  },
  {
    slug: "freshpod-hmi",
    order: 5,
    title: "FreshPod Embedded Touchscreen HMI",
    category: "EMBEDDED UI / HMI",
    client: "Freshpod India",
    status: "Deployed across the Freshpod fleet",
    metrics: [
      { label: "Dedicated screens", value: "14" },
      { label: "Display hardware", value: "8-inch 800 × 480 DWIN DGUS" },
      { label: "Protocol", value: "UART / DGUS" },
      { label: "Payment type", value: "Dynamic UPI/QR" },
    ],
    summary:
      "We redesigned and engineered FreshPod India's complete embedded HMI experience — building custom DGUS tooling and a binary UART protocol to render dynamic Razorpay UPI QR codes on non-browser hardware across 14 synchronized machine workflow screens.",
    highlights: [
      "Redesigned DWIN DGUS display tools to accept dynamic Razorpay UPI QR codes natively over binary UART",
      "14 dedicated HMI screens covering the entire payment-to-sanitization customer journey",
      "Tight synchronization between physical machine state (UV/fog/fans/locks) and on-screen graphics",
      "Public-facing UX designed for intuitive step-by-step guidance with zero prior technical knowledge",
      "Integrated payment lifecycle: QR generation → display → webhook verification → automated door release",
    ],
    disciplines: [
      "DWIN DGUS",
      "UART Protocol",
      "ESP32 Firmware",
      "UI/UX Design",
      "Embedded Systems",
      "Dynamic QR",
    ],
    hero: {
      src: "/case_Studies/freshpod_hmi.png",
      alt: "FreshPod 8-inch touchscreen HMI interface design",
    },
    sections: [
      {
        heading: "Overview & The Constrained HMI Challenge",
        body: "For Freshpod India's automated helmet sanitization machine, we designed and implemented the complete customer-facing HMI/UI experience using the selected DWIN DGUS touchscreen platform.\n\nBecause the DGUS platform lacks the flexibility of a browser engine (no HTML/JavaScript), we engineered the interface around DGUS's native capabilities and developed a custom UART communication layer between the display and the ESP32 machine controller.",
      },
      {
        heading: "UI/UX Designed for a Physical Machine",
        body: "Unlike a web application, every screen corresponds to a real-world machine action. We designed the experience around the full customer journey:\n\nWelcome → Payment → Door Access → Helmet Placement → Cleaning → Sterilization → Drying → Sanitization Complete → Helmet Retrieval → Completion.\n\nThe UI provides clear visual cues at every stage so users understand machine status, wait times, and when door access is permitted.",
      },
      {
        heading: "14 Custom Machine Screens",
        body: "We designed and implemented 14 dedicated HMI screens covering customer interaction, payment states, operation progress, timers, error messages, and maintenance service screens. All layouts and graphical elements were configured directly within the DWIN DGUS environment.",
      },
      {
        heading: "Solving the Dynamic QR Challenge Over UART",
        body: "The hardest technical piece was rendering dynamic payment QR codes on a display with no browser engine. We built a communication pipeline where the cloud backend generates dynamic UPI payment data, transfers it through the ESP32 firmware, and transmits it over UART using the DGUS protocol to render directly on the display for customer scanning.",
      },
      {
        heading: "Firmware ↔ HMI State Synchronization",
        body: "The ESP32 controller commands screen transitions in real time as sensor feedback changes — synchronizing UV sterilization, fogging, thermal drying, door-state monitoring, and customer completion screens with absolute physical precision.",
      },
    ],
    outcomes: [
      "Dedicated embedded HMI combining UI/UX, DWIN DGUS, UART, ESP32 firmware, and dynamic QR payments",
      "Delivered within the constraints of a display platform with no native web support",
      "Running reliably across 190+ commercial machines in public service",
    ],
  },
  {
    slug: "aeegz",
    order: 6,
    title: "Egg Vending Machine (AEEGZ) — Modular Architecture & Custom PCB",
    category: "SMART AUTOMATION / VENDING & PCB",
    client: "Dadspire Solutions",
    status: "Phase 1 prototype in fabrication",
    metrics: [
      { label: "Phase 1 capacity", value: "~700 eggs (702 exact)" },
      { label: "Compartments", value: "42 doors" },
      { label: "Expansion target", value: "~1,500 eggs" },
      { label: "Tray brands analyzed", value: "20+ brands" },
      { label: "CAD revisions", value: "6 major iterations" },
    ],
    summary:
      "Designed a modular, tray-agnostic egg vending architecture for high-density egg storage (~702 eggs across 42 variable-pitch compartments), paired with a custom hierarchical KiCad PCB architecture (STM32 real-time control + Linux SoM + CAN bus + door controller).",
    highlights: [
      "Variable-pitch compartment architecture: 12 six-egg, 15 twelve-egg, and 15 thirty-egg doors (~702 egg capacity)",
      "Tray-agnostic design derived from market research across 20+ locally available commercial tray brands",
      "Eliminated motorized egg-by-egg dispensing, preventing egg collision, double drops, and drop jams",
      "Modular cabinet expansion via CAN bus — additional 20-door banks connect without requiring a new MCU",
      "Custom KiCad PCB: STM32 real-time control, Linux SoM high-level computing, MOSFET drivers, and safety interlocks",
      "Phased roadmap: Phase 1 (passive ventilation & thermal mapping) → Phase 2 (active AC) → Phase 3 (modular boiler)",
    ],
    disciplines: [
      "Mechanical Engineering",
      "Industrial KiCad PCB",
      "STM32",
      "Linux SoM",
      "CAN Bus",
      "Sheet Metal DFM",
      "Fusion 360",
      "Vending Architecture",
    ],
    hero: {
      src: "/case_Studies/communication-device.png",
      alt: "AEEGZ smart modular egg vending machine CAD render",
    },
    sections: [
      {
        heading: "Overview: Re-Thinking Automated Egg Vending",
        body: "Dadspire Solutions approached us with reference designs based on existing Chinese egg vending machines. The objective was not merely to copy those machines, but to maximize usable storage in a compact footprint while supporting multiple commercial egg-tray formats.\n\nThe business model added a critical constraint: 6-egg trays attract new customers, while 12- and 30-egg trays carry higher commercial margins. The cabinet layout needed to accommodate all three formats strategically rather than wasting premium volume on a uniform grid.",
      },
      {
        heading: "Local Market Tray Research Drove Mechanical Architecture",
        body: "Instead of assuming arbitrary compartment dimensions, our team surveyed approximately 20 egg-tray brands available locally around the client's site and hatchery. We evaluated tray length, width, height (common height ~133.5 mm), geometry, and practical usability.\n\nThe core design decision was to build the machine around commercially available trays rather than a proprietary dispensing mechanism — so the machine is not sensitive to slight variations in egg size or shape, and the operator is not locked into a single tray supplier.",
      },
      {
        heading: "Variable-Pitch Compartment Architecture (~702 Eggs)",
        body: "Instead of 42 identical boxes, compartment dimensions vary by tray format:\n\n• 12 compartments for 6-egg trays\n• 15 compartments for 12-egg trays\n• 15 compartments for 30-egg trays\n\nTotal Phase 1 capacity: (12 × 6) + (15 × 12) + (15 × 30) = 702 eggs within an overall envelope of 1,828 mm high × 1,060 mm wide × 406 mm deep (75–125 kg, CNC-bent stainless steel).",
      },
      {
        heading: "Eliminating Dispensing Mechanisms by Design",
        body: "There is no motorized egg-by-egg dispensing mechanism. The workflow is:\n\nCustomer selects tray → payment confirmed → corresponding compartment unlocks → customer opens door and removes tray → door closes.\n\nThis decision eliminated an entire category of failure modes (individual egg handling, egg-by-egg actuation, double dispensing, egg collisions, and motorized mechanism jams), shifting the engineering focus to high-density, secure storage.",
      },
      {
        heading: "Mechanical Security & Rear-Accessible Compartments",
        body: "Each storage compartment features its own stainless-steel door with a transparent viewing window and a 9–12 V solenoid lock. Control electronics live in a dedicated rear compartment, physically isolated from the egg-storage area, allowing servicing without disturbing customer compartments.",
      },
      {
        heading: "Environmental Monitoring & 3-Point Thermal Mapping",
        body: "Phase 1 incorporates passive ventilation via three fans and three temperature sensors positioned at the top, middle, and bottom of the cabinet. Rather than a single temperature reading, this builds a thermal map of the cabinet to generate empirical data for Phase 2 active AC cooling integration.",
      },
      {
        heading: "Custom KiCad Modular PCB Architecture (STM32 + Linux SoM + CAN)",
        body: "We designed a custom industrial control PCB architecture in KiCad as the electrical backbone. The architecture splits real-time control from high-level computing:\n\n• STM32 Control Layer: Real-time sensor monitoring, safety interlocks, door/actuator control, and machine I/O.\n• Linux SoM Interface: Application layer, network connectivity, vending logic, and future software expansion.\n• Dedicated MOSFET/Actuator Driver Section: Isolated load switching for solenoids and locks.\n• Regulated Power Section: Isolated 3.3 V and 5 V rails for noise immunity.",
      },
      {
        heading: "Dedicated Modular Door Controller Subsystem",
        body: "Alongside the main PCB, we designed a dedicated door-controller subsystem connected via CAN bus. Additional 20-door expansion cabinets plug in over a three-wire CAN interface without requiring a new central MCU.",
      },
      {
        heading: "Phased Thermal & Cooking Expansion Roadmap",
        body: "The machine architecture is explicitly phased:\n\n• Phase 1: Passive ventilation + 3-point thermal monitoring (current)\n• Phase 2: Active AC cooling (cabinet engineered to extend in height)\n• Phase 3: Separate adjacent boiler/cooking module (isolated for steam, water, and electrical safety)",
      },
      {
        heading: "Manufacturing Engineering: Stainless Steel CNC Bending",
        body: "Complete production documentation was delivered in Autodesk Fusion 360, including 3D CAD, 2D manufacturing drawings, DXF files, bend drawings, BOM, assembly exploded views, and welding specifications across 6 major CAD revisions. Phase 1 prototype fabrication is currently in progress.",
      },
    ],
    outcomes: [
      "Tray-agnostic storage architecture accommodating 6-, 12-, and 30-egg commercial formats",
      "~702-egg Phase 1 capacity designed to scale to ~1,500 eggs via plug-and-play CAN modules",
      "Custom hierarchical KiCad PCB separating real-time safety/control from Linux application logic",
      "Eliminated motorized dispensing drop failures through secure compartment unlocking",
      "Phase 1 prototype currently in fabrication following 6 major CAD revisions",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
