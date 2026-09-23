import { COMPANY } from "@/lib/company";

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What does SolveMpire do and what is your end-to-end engineering scope?",
    category: "CAPABILITIES",
    answer:
      "SolveMpire is a turnkey product engineering company based in Andhra Pradesh, India. We handle the complete lifecycle of physical products: 3D mechanical CAD (Autodesk Fusion 360), custom multi-layer PCB design (KiCad), embedded C++/RTOS firmware (STM32, ESP32, Linux SoMs), touchscreen HMIs (DWIN DGUS), cloud IoT telemetry with remote OTA updates, and volume manufacturing support (DFM, CNC, sheet metal, injection molding).",
  },
  {
    question: "Who owns the Intellectual Property (CAD, PCB files, firmware source code)?",
    category: "IP & LEGAL",
    answer:
      "100% Client Ownership. Upon settlement of project milestones, all bespoke 3D CAD files, STEP models, 2D production drawings, KiCad schematics and PCB layouts, Gerber packages, firmware source code repositories, and Bill of Materials (BOMs) transfer completely and irrevocably to you. We operate under strict mutual NDAs before reviewing any proprietary documentation.",
  },
  {
    question: "How does SolveMpire bridge early prototyping to mass manufacturing (DFM)?",
    category: "MANUFACTURING",
    answer:
      "We design for production from day one. Rather than stopping at 3D-printed alpha prototypes, our mechanical engineers integrate injection molding draft angles, sheet-metal CNC bend allowances, and GD&T tolerances. Our electronics team validates SMT pick-and-place component availability and designs automated test jigs to guarantee seamless volume production runs.",
  },
  {
    question: "Can you support deployed commercial hardware with OTA firmware and maintenance?",
    category: "SUPPORT & SLA",
    answer:
      "Yes. SolveMpire backs commercial fleets with multi-year engineering support agreements (spanning 4 to 10 years). We manage continuous firmware updates, over-the-air (OTA) deployments, real-time cloud fleet monitoring, and mechanical/PCB revisions — as proven with 200+ FreshPod commercial machines running with 99.8% uptime across India, Nepal, and Sri Lanka.",
  },
  {
    question: "What microcontroller platforms, CAD tools, and electronics stacks do you support?",
    category: "TECH STACK",
    answer:
      "Mechanical: Autodesk Fusion 360, SolidWorks, STEP, DXF, sheet-metal CNC & 3D rapid prototyping. Electronics: KiCad multi-layer PCB design, high-speed routing, power electronics, CAN bus, RS485, dynamic Razorpay UPI. Embedded & Cloud: STM32 C/C++, ESP32 FreeRTOS, Toradex Linux SoMs, DWIN DGUS HMI, Next.js, Node.js, and MQTT cloud telemetry.",
  },
  {
    question: "Where is SolveMpire located and what is your legal corporate entity?",
    category: "CORPORATE",
    answer: `SolveMpire Private Limited is a registered Indian corporation with Corporate Identity Number (CIN) ${COMPANY.cin}. Our engineering headquarters is located at SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, Andhra Pradesh - 533005, India.`,
  },
  {
    question: "How do we initiate a project and what is the typical turnaround timeline?",
    category: "GETTING STARTED",
    answer:
      "You can submit your requirements via our contact portal or email support@solvempire.com. We execute a mutual NDA within 24 hours, perform technical scoping, and provide an itemized Statement of Work (SOW). Concept CAD & preliminary PCB schematics typically complete in 2–4 weeks, with functional prototypes ready in 4–8 weeks.",
  },
];
