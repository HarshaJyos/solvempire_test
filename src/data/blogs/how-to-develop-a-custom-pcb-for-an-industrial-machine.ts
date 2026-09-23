import { BlogArticleData } from "@/types/blog-article";

export const howToDevelopCustomPcbBlog: BlogArticleData = {
  meta: {
    id: "post-008",
    slug: "how-to-develop-a-custom-pcb-for-an-industrial-machine",
    title: "How to Develop a Custom PCB for an Industrial Machine",
    excerpt:
      "From electrical requirements, silicon selection, hierarchical schematics, and ERC simulations to impedance stackups, thermal floorplanning, DFM, and automated Bed-of-Nails testing. The complete engineering guide to industrial PCB development.",
    category: "Hardware & Manufacturing",
    type: "Engineering Guide",
    author: {
      name: "Gayathri Boyapati",
      role: "Electronics Engineer, PCB & VLSI Specialist",
      avatar: "/avatars/gayatri.jpeg",
      bio: "Electronics Engineer & PCB/VLSI Design Specialist at SolveMpire. Architecting custom multilayer PCB layouts, real-time embedded hardware, power distribution, and VLSI circuit designs.",
      slug: "gayathri-boyapati",
    },
    publishedAt: "Jul 15, 2026",
    isoDate: "2026-07-15T00:00:00Z",
    readTime: "12 min read",
    tags: [
      "Custom PCB",
      "KiCad",
      "Industrial Electronics",
      "STM32",
      "Linux SoM",
      "CAN Bus",
      "DFM",
      "Embedded Hardware",
    ],
    featured: false,
  },
  takeaways: [
    "Industrial PCB reliability starts with the power architecture: strict physical separation of high-voltage AC mains, 24V inductive actuator power, 5V switching rails, and 3.3V digital logic with star grounding and optical isolation.",
    "Flyback kickback voltage (V_spike = -L · dI/dt) from de-energizing inductive solenoids and relays can instantly destroy MOSFETs; dedicated fast-recovery Schottky diodes (SS14) and TVS clamping are non-negotiable.",
    "Heterogeneous controller architecture (pairing an STM32 real-time MCU for deterministic safety and a Toradex Verdin i.MX 8M Plus Linux SoM for touchscreen UI and cloud telemetry) delivers scalable commercial machine intelligence.",
    "Modular daisy-chainable bus topology: offloading high-channel actuator loads (e.g., 20-channel solenoid door banks) to dedicated CAN-node secondary PCBs enables unlimited machine scaling without rewiring the central controller.",
    "Design for Manufacturing (DFM) and automated testability: embedding dedicated Bed-of-Nails test pads, fiducials, and teardrops accelerates factory assembly and guarantees 100% defect-free boards before final assembly.",
  ],
  tableOfContents: [
    { id: "the-industrial-pcb-imperative", title: "The Industrial PCB Imperative" },
    { id: "step-1-requirements-and-noise-envelope", title: "Step 1: Electrical Requirements & Operational Noise Envelope" },
    { id: "step-2-silicon-and-component-selection", title: "Step 2: Silicon Sourcing & Critical Component Selection" },
    { id: "step-3-hierarchical-schematics-kicad", title: "Step 3: Hierarchical Schematic Design in KiCad" },
    { id: "step-4-erc-and-transient-simulations", title: "Step 4: Electrical Rules Check (ERC) & SPICE Transient Simulations" },
    { id: "step-5-bom-and-netlist-generation", title: "Step 5: BOM Generation, Component Lifecycle & Netlist Sync" },
    { id: "step-6-layer-stackup-and-impedance", title: "Step 6: Layer Stackup & Impedance Planning (2-Layer vs. 4-Layer)" },
    { id: "step-7-floorplanning-and-thermal", title: "Step 7: Component Floorplanning & Thermal Management" },
    { id: "step-8-high-current-and-differential-routing", title: "Step 8: High-Current Traces & High-Speed Differential Routing" },
    { id: "step-9-dfm-dfa-and-drc-verification", title: "Step 9: Design for Manufacturing (DFM), DFA & Strict DRC" },
    { id: "real-world-case-studies", title: "Real-World Case Studies: Freshpod vs. AEEGZ Hardware" },
    { id: "step-10-fat-and-bed-of-nails-testing", title: "Step 10: Factory Acceptance Testing (FAT) & Bed-of-Nails Jigs" },
    { id: "comparison-table", title: "Controller Architecture Comparison: 2-Layer vs. 4-Layer vs. PLC" },
    { id: "how-to-start", title: "Developing Your Custom Industrial Hardware" },
    { id: "faq", title: "Frequently Asked Questions" },
  ],
  sections: [
    {
      type: "lead",
      text: "In consumer electronics, a printed circuit board (PCB) operates in benign conditions: powered by a clean lithium battery, protected inside a sealed plastic enclosure, and operating in temperature-controlled rooms. In industrial machinery, electronics live in a warzone: surrounded by high-voltage contactors switching inductive loads, experiencing massive back-EMF spikes, enduring 24/7 mechanical vibration, and handling wide thermal swings from -10°C to +60°C. If your custom PCB isn't engineered for this environment, it won't just glitch—it will lock up, burn gate drivers, corrupt flash memory, and cause catastrophic downtime.",
    },
    {
      type: "paragraph",
      text: "While off-the-shelf industrial PLCs (Programmable Logic Controllers) provide a basic modular solution for one-off factory assembly cells, they are prohibitively expensive (₹1,20,000 to ₹3,50,000 per machine), physically bulky, and lack native cloud/telemetry integration. For scalable commercial hardware, retail kiosks, automated sanitizers, and smart vending machines, a custom multi-layer industrial PCB reduces BOM costs by up to 70%, shrinks footprint, and gives you complete IP ownership.",
    },
    {
      type: "paragraph",
      text: "At SolveMpire, we develop turnkey industrial hardware from initial schematic capture in KiCad through multi-layer PCB routing, DFM fabrication, and automated test fixture engineering. In this comprehensive technical guide, we break down the exact ten-step engineering pipeline required to build robust, production-grade PCBs for custom industrial machines.",
    },
    {
      type: "callout",
      variant: "insight",
      title: "The Golden Rule of Industrial Electronics",
      text: "Never design a circuit board assuming ideal DC power. In an industrial machine, assume your 24V supply rail will experience 60V inductive ringing, ground potentials will bounce by several volts during relay switching, and operators will accidentally reverse power polarity. Your hardware must absorb and survive these transients automatically.",
    },
    {
      type: "heading",
      level: 2,
      id: "the-industrial-pcb-imperative",
      text: "The Industrial PCB Imperative",
    },
    {
      type: "paragraph",
      text: "An industrial machine PCB is fundamentally an electromechanical bridge. It translates low-voltage digital decisions (3.3V logic signals from microcontrollers or Linux processors) into high-power physical actions (12V/24V solenoid valve pulses, 230V AC lamp switching, stepper indexing, and PWM fan speed modulation) while continuously monitoring physical sensors.",
    },
    {
      type: "bullets",
      items: [
        "Galvanic Isolation: Optocouplers and digital isolators break ground loops and prevent dangerous high-voltage transients from reaching microcontrollers.",
        "Deterministic Noise Immunity: Solid ground planes, bypass decoupling networks, and star grounding eliminate electrical reset glitches.",
        "Thermal Reliability: Direct copper pours, thermal vias, and low-RDS(on) power MOSFETs keep junction temperatures well within safe thresholds without noisy fans.",
        "Modular Scalability: Industrial bus protocols (CAN bus, RS-485) allow machines to scale from 20 to 100+ actuator channels by simply daisy-chaining secondary modules.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-1-requirements-and-noise-envelope",
      text: "Step 1: Electrical Requirements & Operational Noise Envelope",
    },
    {
      type: "paragraph",
      text: "Before launching KiCad, our hardware engineering team establishes the Electrical Requirements Specification (ERS). This document maps every voltage rail, current budget, and communication interface:",
    },
    {
      type: "numbered",
      items: [
        "Power Architecture & Voltage Rails: Input power (e.g., 24V DC DIN-rail supply or 12V DC input), intermediate step-down rails (5V system bus for USB/sensors, 9V/12V actuator pulse rails), digital logic rails (3.3V VDD for MCUs), and filtered analog rails (VDDA for ADCs).",
        "Peak Dynamic Current Budgets: Sizing for worst-case instantaneous loads (e.g., firing multiple 9V solenoid locks simultaneously draws a 5A peak pulse for 150ms).",
        "Environmental Ingress & Thermal Range: Operating ambient temperatures (-10°C to +55°C), conformal coating requirements for moisture/corrosion resistance, and vibration tolerances (automotive/industrial standards).",
        "Electromagnetic Compatibility (EMC) Targets: Designing for radiated/conducted emissions standards (IEC/EN 61000-6-2 immunity and IEC/EN 61000-6-4 emissions).",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-2-silicon-and-component-selection",
      text: "Step 2: Silicon Sourcing & Critical Component Selection",
    },
    {
      type: "paragraph",
      text: "Component selection dictates both technical performance and 10-year manufacturing scalability. We select silicon exclusively from Tier-1 manufacturers with active 10+ year longevity commitments:",
    },
    {
      type: "bullets",
      items: [
        "Real-Time Microcontrollers: STM32F407VET6 (ARM Cortex-M4F @ 168 MHz with 512KB Flash in LQFP-100) or ESP32-S3. STM32 provides deterministic sub-microsecond timer control, hardware CRC, dual CAN controllers, and hardware fault handlers.",
        "High-Level Linux SoM Carriers: For connected machines requiring rich touchscreens, camera vision, and dynamic payment sessions, we design carrier boards around Toradex Verdin i.MX 8M Plus System-on-Modules (SoMs) mated via standard 260-pin DDR4 SODIMM sockets.",
        "Synchronous Buck Regulators: High-voltage wide-input switching converters like Texas Instruments LM76003 (3.5A, 3.5V–60V input), TI LMR33630 (3A, 36V), and Diodes Inc AP63203 (2A, 32V) provide >92% efficiency and reduce thermal heat dissipation compared to wasteful linear regulators.",
        "Industrial Bus Transceivers: Texas Instruments SN65HVD230 (3.3V CAN bus transceiver with 1 Mbps throughput) and differential TVS arrays (NUP2105L) for high-reliability multidrop networking.",
        "Power Switching & Transient Suppression: P-channel MOSFETs (SI2301CDS) for zero-drop reverse polarity protection, N-channel power MOSFETs with ultra-low RDS(on) (<15 mΩ) for solenoid driving, fast-recovery SS14 Schottky flyback diodes (DO-214AC) to clamp inductive kickback, and SMBJ33A 600W TVS diodes for overvoltage surge suppression.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-3-hierarchical-schematics-kicad",
      text: "Step 3: Hierarchical Schematic Design in KiCad",
    },
    {
      type: "paragraph",
      text: "Flat, monolithic schematics are unreadable and error-prone. In modern industrial PCB engineering, we organize schematics into modular hierarchical sheets inside KiCad:",
    },
    {
      type: "bullets",
      items: [
        "Sheet 01_Power: 24V DC input protection, TVS surge clamping, PTC resettable fuses (1812L500 5A), LM76003 synchronous buck converter (24V → 5V), AP63203 buck (5V → 3.3V), and low-noise AMS1117-3.3 analog LDO.",
        "Sheet 02_STM32: STM32F407 microcontroller core, HSE 8.000 MHz crystal oscillator with load capacitors, 32.768 kHz RTC crystal, SWD debug header (FTSH-105), VCAP regulator filter capacitors (2.2µF X7R), and 100nF high-frequency decoupling capacitors placed on every single VDD pin.",
        "Sheet 03_Linux_SoM_or_CAN: 260-pin Verdin SODIMM carrier interface, USB2512B 2-port Hi-Speed USB hub, AP2192 dual power distribution switches, TPD4EUSB30 ESD arrays, and SN65HVD230 CAN physical transceiver with 120-Ohm line termination.",
        "Sheet 04_MOSFET_Drivers: Multi-channel power switching stages with optoisolators, gate pull-down resistors (10 kΩ) to prevent floating gate conduction during bootup, and SS14 flyback diodes.",
        "Sheet 06_Door_Feedback: Multi-channel optocoupled sensor inputs with hardware RC low-pass debouncing filters (10 kΩ + 100nF) and dedicated 0603 SMD indicator LEDs for instant visual field diagnostics.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-4-erc-and-transient-simulations",
      text: "Step 4: Electrical Rules Check (ERC) & SPICE Transient Simulations",
    },
    {
      type: "paragraph",
      text: "Before placing components on a PCB layout, the schematic must undergo rigorous algorithmic and numerical verification:",
    },
    {
      type: "numbered",
      items: [
        "KiCad Electrical Rules Check (ERC): Verifying that power outputs (PWR_FLAG) correctly drive input pins, no digital pins are left floating, bidirectional bus pins are properly matched, and all hierarchical sub-sheet pin mappings match parent sheet labels with zero errors.",
        "Inductive Flyback Kickback Simulation: When an inductive solenoid coil is suddenly de-energized, the collapsing magnetic field creates a severe voltage spike (V_spike = -L · dI/dt). Using SPICE simulation, we verify that the SS14 Schottky diode clamps the peak voltage safely below the MOSFET's drain-source breakdown rating (V_DS = 30V/40V) in under 15 nanoseconds.",
        "Crystal Oscillator Load Capacitance Matching: Sizing external load capacitors (C1, C2) to match crystal specs (C_L = 18pF for 8MHz; C_L = 12.5pF for 32.768kHz) using the formula C_1 = C_2 = 2 · (C_L - C_stray), where C_stray is typically 3–5pF of PCB trace capacitance.",
        "Power Rail Transient Step Response: Simulating LC filter damping on buck regulators to verify that instantaneous 5A load steps do not cause output voltages to sag below the STM32's 2.7V brownout reset threshold.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-5-bom-and-netlist-generation",
      text: "Step 5: BOM Generation, Component Lifecycle & Netlist Sync",
    },
    {
      type: "paragraph",
      text: "A schematic is only as good as its procurement reality. Before routing, the Bill of Materials (BOM) must be validated for supply chain resilience:",
    },
    {
      type: "bullets",
      items: [
        "Exact Manufacturer Part Numbers (MPNs): Every single resistor, capacitor, and IC is assigned an exact orderable MPN (e.g., Samsung CL21B104KBCNNNC for 0805 100nF 50V X7R), package footprint, and authorized supplier code.",
        "Silicon Lifecycle Status: Verifying that all active ICs are classified as 'Active' with minimum 10-year availability roadmaps—avoiding NRND (Not Recommended for New Designs) parts.",
        "Second-Sourcing Dual Footprints: Designing PCB land patterns to accommodate alternative package pinouts (e.g., dual SOT-23 / SOT-223 footprints or multi-pitch electrolytic capacitors) so factory assembly lines are never stalled by component shortages.",
        "Netlist Export & PCB Synchronization: Synchronizing KiCad schematic netlists directly into the PCB layout environment, preserving all netclasses, differential pair markers, and clearance design rules.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-6-layer-stackup-and-impedance",
      text: "Step 6: Layer Stackup & Impedance Planning (2-Layer vs. 4-Layer)",
    },
    {
      type: "paragraph",
      text: "Selecting the correct PCB layer stackup is the foundation of electrical signal integrity and EMC compliance:",
    },
    {
      type: "bullets",
      items: [
        "2-Layer Architecture (e.g., Freshpod Machine Controller): Top layer carries mixed signal and high-current power routing; bottom layer serves as a dedicated, low-impedance copper ground pour. Ideal for cost-sensitive, medium-complexity machines operating in 12V/24V environments with robust relay isolation.",
        "4-Layer High-Density Architecture (e.g., AEEGZ Master & Door Controllers): Layer 1 (Top: High-speed differential signals, RF, and primary SMD components) → Layer 2 (Inner 1: Continuous unbroken Solid GND Ground Plane) → Layer 3 (Inner 2: Split Power Planes: +24V, +5V, +3.3V, VDDA) → Layer 4 (Bottom: Low-speed I/O, secondary routing, and thermal ground pours).",
        "Controlled Impedance Modeling: Calculating trace geometries in KiCad's integrated field solver: 120 Ω differential impedance for industrial CAN bus (CAN_H / CAN_L) and 90 Ω differential impedance for USB 2.0 (D+ / D-) over an FR4 dielectric (ε_r ≈ 4.5).",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-7-floorplanning-and-thermal",
      text: "Step 7: Component Floorplanning & Thermal Management",
    },
    {
      type: "paragraph",
      text: "Great PCB layout is 80% floorplanning and 20% routing. High-power switching circuits and sensitive digital logic must be segregated into distinct physical zones:",
    },
    {
      type: "bullets",
      items: [
        "Zone 1: Industrial Power Entry & Protection: Grouping 24V input terminal blocks, PTC fuses, TVS diodes, and reverse-polarity MOSFETs along the board edge so high-voltage surges are clamped before entering the board.",
        "Zone 2: DC-DC Switching Regulators: Placing buck converter ICs (LM76003 / LMR33630), inductors, bootstrap capacitors, and input ceramic bypass caps in an ultra-tight loop (<5mm) to minimize high-frequency dI/dt switching noise loops.",
        "Zone 3: Central Processing & Microcontrollers: Positioning the STM32 MCU and Toradex Verdin SoM in the quiet center of the board, directly over the continuous ground plane.",
        "Zone 4: Isolated Actuator Drivers & Terminals: Placing MOSFET driver banks, flyback diodes, and Phoenix screw terminal blocks along the opposite board edge, completely isolated from analog crystal traces.",
        "Thermal Vias & Copper Dissipation: Stitching thermal via arrays (0.3mm drill, 0.6mm pad, 1.0mm pitch) under exposed thermal pads (QFN/SOIC-8 packages) down to internal ground planes to dissipate heat efficiently without heatsinks.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-8-high-current-and-differential-routing",
      text: "Step 8: High-Current Traces & High-Speed Differential Routing",
    },
    {
      type: "paragraph",
      text: "Industrial routing requires rigorous adherence to current carrying limits and high-speed signal integrity guidelines:",
    },
    {
      type: "numbered",
      items: [
        "IPC-2152 Trace Width Calculation: Sizing high-current power traces for minimal temperature rise (ΔT ≤ 10°C). A 5A solenoid pulse on standard 1 oz/ft² (35µm) copper requires a minimum trace width of 3.5mm on outer layers or a solid polygon copper pour.",
        "Differential Pair Routing: Routing CAN bus (CAN_H, CAN_L) and USB 2.0 (D+, D-) traces with strictly matched trace lengths (within 0.5mm), parallel spacing, and continuous reference planes underneath—never crossing split plane boundaries.",
        "Unbroken Ground Return Paths: High-frequency digital currents return directly underneath their signal trace via the path of least inductance. Any slot or split in the ground plane forces return currents to loop around, creating massive EMI radiation.",
        "Decoupling Capacitor Proximity: Placing 100nF 0805 X7R ceramic bypass capacitors directly adjacent to every VDD pin of the STM32, with vias dropping straight into the ground plane to eliminate parasitic trace inductance.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "step-9-dfm-dfa-and-drc-verification",
      text: "Step 9: Design for Manufacturing (DFM), DFA & Strict DRC",
    },
    {
      type: "paragraph",
      text: "A design that cannot be assembled automatically at a production yield of >99% is an engineering failure. We enforce rigorous Design for Manufacturing (DFM) and Design for Assembly (DFA) rules:",
    },
    {
      type: "bullets",
      items: [
        "KiCad Design Rule Check (DRC): Enforcing minimum trace clearance (6 mil / 0.15mm), minimum annular ring (5 mil / 0.125mm), and copper-to-edge clearances (>0.5mm) with zero DRC warnings.",
        "Solder Mask Webbing & Bridges: Ensuring minimum 4 mil (0.1mm) solder mask dams between fine-pitch IC pins (such as LQFP-100 STM32 pins) to prevent solder bridging during automated reflow.",
        "Fiducial Markers: Placing three optical fiducial marks (1.0mm copper dot with 2.0mm solder mask clearance) on diagonal board corners for automated pick-and-place camera alignment.",
        "Teardrops on Vias: Applying teardrop fillets at trace-to-via junctions to prevent mechanical track-drilling breakout during PCB fabrication.",
        "Bed-of-Nails Test Points: Placing 1.0mm circular SMD test pads on all primary power rails, SWD debug pins, reset lines, and sensor feedback channels on the bottom layer for automated pogo-pin factory testing.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "real-world-case-studies",
      text: "Real-World Case Studies: Freshpod vs. AEEGZ Hardware",
    },
    {
      type: "paragraph",
      text: "At SolveMpire, our PCB development methodology powers deployed commercial fleets across diverse operating envelopes:",
    },
    {
      type: "bullets",
      items: [
        "Freshpod Automated Helmet Sanitizer (2-Layer 12V Controller): Developed a cost-optimized 2-layer custom board around the ESP32 microcontroller, featuring relay-driven UV lamp and fogging control, fan current sensing, optocoupler isolation, dynamic Razorpay UPI integration, and UART synchronization with an 8-inch DWIN DGUS industrial touchscreen across 200+ machines operating in 3 countries.",
        "AEEGZ Automated Egg Vending Machine (Dual 4-Layer Architecture): Engineered a heterogeneous computing master board (Toradex Verdin i.MX 8M Plus Linux SoM in a 260-pin SODIMM carrier + STM32F407 MCU + TI LM76003 3.5A buck + USB2512B hub + CAN bus driver) paired with modular 20-channel CAN Door Controller boards (STM32 CAN-node, 20× MOSFET solenoid drivers with SS14 flyback diodes, 20× debounced sensor inputs, and daisy-chainable CAN In/Out terminal blocks).",
      ],
    },
    {
      type: "quote",
      text: "By isolating high-channel door actuation into a modular 4-layer CAN secondary board, expanding the AEEGZ machine from 42 doors to 100+ doors requires zero changes to the main controller or firmware architecture—you simply daisy-chain another 20-channel board over three wires.",
      author: "Gayathri Boyapati",
      source: "Electronics Engineer, PCB & VLSI Specialist, SolveMpire",
    },
    {
      type: "heading",
      level: 2,
      id: "step-10-fat-and-bed-of-nails-testing",
      text: "Step 10: Factory Acceptance Testing (FAT) & Bed-of-Nails Jigs",
    },
    {
      type: "paragraph",
      text: "Before shipping assembled PCBA boards for field installation, every board passes through automated quality validation:",
    },
    {
      type: "numbered",
      items: [
        "Automated Optical Inspection (AOI): High-resolution cameras inspect every solder joint, component orientation, and solder paste volume against IPC-A-610 Class 2/3 industrial standards.",
        "Custom Bed-of-Nails Pogo-Pin Fixture: Assembled boards clamp onto spring-loaded test pins. In under 30 seconds, the fixture verifies all voltage rails (+24V, +5V, +3.3V), checks for power-to-ground shorts, flashes STM32 bootloader and firmware via SWD, and validates CAN communication loopbacks.",
        "Hi-Pot High-Potential Insulation Testing: Applying 1,500V AC test potentials across isolated mains and low-voltage barrier boundaries to guarantee operator dielectric safety.",
        "Burn-In Thermal Stress Testing: Operating boards under full continuous load (switching solenoids and relays at maximum duty cycle) in thermal chambers at +55°C for 48 hours to weed out infant component mortality.",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "comparison-table",
      text: "Controller Architecture Comparison: 2-Layer vs. 4-Layer vs. PLC",
    },
    {
      type: "paragraph",
      text: "Here is how custom PCB architectures compare against traditional modular PLCs across key engineering criteria:",
    },
    {
      type: "table",
      data: {
        caption: "Industrial Machine Electronics Architecture Comparison",
        headers: [
          "Parameter",
          "Traditional Modular PLC",
          "Custom 2-Layer PCB (Freshpod)",
          "Custom 4-Layer Dual-PCB (AEEGZ)",
        ],
        highlightColumnIndex: 3,
        rows: [
          [
            "Unit Hardware BOM",
            "₹1,20,000 – ₹3,50,000",
            "₹3,500 – ₹6,500",
            "₹12,000 – ₹28,000 (Full Master + Modules)",
          ],
          [
            "Physical Footprint",
            "Bulky DIN-rail metal cabinet",
            "Single compact 2-layer PCB (150×100mm)",
            "Modular DIN/chassis PCB sub-plates",
          ],
          [
            "Computing Architecture",
            "Proprietary ladder-logic MCU",
            "ESP32 with FreeRTOS",
            "Toradex i.MX 8M Plus Linux + STM32F407",
          ],
          [
            "Channel Scalability",
            "Expensive expansion slices (₹15,000/slice)",
            "Fixed onboard I/O",
            "Infinite daisy-chaining over 3-wire CAN",
          ],
          [
            "HMI & Payment Display",
            "Proprietary industrial HMIs (₹45,000+)",
            "UART to DWIN DGUS / Razorpay QR",
            "Native HDMI / LVDS / DGUS / Cloud UPI",
          ],
          [
            "Fleet Telemetry / OTA",
            "External IoT gateway required",
            "Native Wi-Fi / MQTT / OTA updates",
            "Native LTE / Wi-Fi / Linux OTA suite",
          ],
          [
            "Best Application",
            "One-off factory assembly jigs",
            "Cost-sensitive commercial fleets",
            "High-density modular retail & smart machines",
          ],
        ],
      },
    },
    {
      type: "heading",
      level: 2,
      id: "how-to-start",
      text: "Developing Your Custom Industrial Hardware",
    },
    {
      type: "paragraph",
      text: "Developing a custom industrial PCB requires a multi-disciplinary hardware team that masters high-voltage power electronics, real-time ARM firmware, controlled-impedance layout, and factory DFM under one roof.",
    },
    {
      type: "paragraph",
      text: "Whether you need to replace an expensive PLC rack, build a high-density vending controller, or design a rugged medical device PCB, SolveMpire's senior hardware architects are ready to engineer, prototype, and manufacture your production electronics.",
    },
    {
      type: "cta",
      title: "Need Custom Industrial Electronics or PCB Design?",
      text: "Consult directly with our hardware architects and KiCad PCB designers to scope your electrical architecture, schematics, and production test fixtures.",
      buttonText: "Scope Your PCB Hardware With Engineers",
      buttonHref: "/contact",
    },
  ],
  faqs: [
    {
      question: "When should a company choose a custom PCB over an industrial PLC?",
      answer:
        "For one-off factory assembly fixtures, PLCs make sense due to off-the-shelf availability. For commercial machines, retail kiosks, medical equipment, and scalable fleets (10+ units), custom multi-layer PCBs reduce hardware costs by 70%, eliminate bulky DIN cabinets, provide native cloud/IoT connectivity, and protect proprietary intellectual property.",
    },
    {
      question: "Why is a 4-layer PCB stackup preferred over 2 layers for complex machines?",
      answer:
        "A 4-layer stackup provides a continuous solid ground plane directly adjacent to signal layers (Layer 2 GND), which significantly reduces parasitic inductance, prevents crosstalk, shields high-speed differential pairs (CAN, USB), and ensures compliance with strict EMC radiated emissions regulations.",
    },
    {
      question: "How do you protect microcontrollers from inductive relay and solenoid noise?",
      answer:
        "We implement complete galvanic optocoupler isolation between logic and power stages, place fast-recovery Schottky flyback diodes (SS14) across all inductive coils, install TVS surge diodes (SMBJ33A / NUP2105L), use dedicated star grounding, and add RC debouncing on all digital sensor inputs.",
    },
    {
      question: "How does the AEEGZ daisy-chainable CAN architecture work?",
      answer:
        "The master board runs a Toradex Verdin i.MX 8M Plus Linux SoM and STM32 MCU communicating over an isolated CAN bus. Each 20-door cabinet contains a dedicated 4-layer Door Controller board with local STM32 and MOSFET drivers. Expanding the machine capacity from 42 doors to 100+ doors requires simply connecting additional door boards over a 3-wire CAN bus without changing main controller hardware.",
    },
    {
      question: "What production deliverables does SolveMpire provide for PCBA manufacturing?",
      answer:
        "We deliver complete fabrication packages: native KiCad schematics and layouts, Gerber RS-274X files, Excellon NC drill files, IPC-2581 / ODB++ data, centroid pick-and-place files (.pos), DFM-verified Bill of Materials with exact MPNs, 3D STEP models, and automated Bed-of-Nails test fixture specifications.",
    },
  ],
};
