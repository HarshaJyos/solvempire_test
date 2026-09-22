import { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    slug: "hanish-jyosyabhatla",
    name: "Hanish Jyosyabhatla",
    role: "Founder & CEO",
    avatar: "/hanish.webp",
    shortBio:
      "Founder & CEO at SolveMpire. Directing multidisciplinary product engineering, mechanical architecture, embedded hardware systems, and scalable connected platforms.",
    location: "Kakinada, Andhra Pradesh, India",
    story: [
      "Hanish founded SolveMpire to eliminate vendor fragmentation by uniting mechanical CAD, custom PCB electronics, embedded firmware, and cloud software under one disciplined roof.",
      "With hands-on experience across complex mechanical enclosures, KiCad PCB design, STM32/ESP32 firmware, and high-volume manufacturing (DFM), Hanish leads the company's technical vision and commercial execution.",
      "He architects turnkey systems from early concept feasibility to multi-year volume production deployments with field-proven reliability.",
    ],
    focusAreas: [
      "End-to-End Product Engineering",
      "Mechanical CAD & DFM",
      "Embedded Systems & Firmware",
      "Hardware Architecture",
      "Executive Leadership",
    ],
    socials: {
      linkedin: "https://linkedin.com",
      email: "support@solvempire.com",
    },
  },
  {
    slug: "lohith-medisetti",
    name: "Lohith Medisetti",
    role: "Co-Founder & COO",
    avatar: "/lohith.webp",
    shortBio:
      "Co-Founder & Chief Operating Officer at SolveMpire. Leading operations, supply chain execution, manufacturing partnerships, and deployment logistics.",
    location: "Kakinada, Andhra Pradesh, India",
    story: [
      "Lohith oversees SolveMpire's operational backbone, factory partnerships, vendor qualification, and end-to-end supply chain execution.",
      "He works directly with CNC sheet metal fabricators, PCB assembly houses, and component distributors across India and Asia to ensure seamless volume production transitions.",
      "Lohith ensures that engineering deliverables translate efficiently into cost-effective, repeatable factory manufacturing runs and SLA-backed customer deployments.",
    ],
    focusAreas: [
      "Operations & Supply Chain",
      "Manufacturing Execution",
      "Vendor Qualification",
      "Logistics & Quality Assurance",
      "Commercial Strategy",
    ],
    socials: {
      linkedin: "https://linkedin.com",
      email: "support@solvempire.com",
    },
  },
  {
    slug: "teja-mandapalli",
    name: "Teja Mandapalli",
    role: "Co-Founder & Product Lead",
    avatar: "/teja.webp",
    shortBio:
      "Co-Founder & Product Lead at SolveMpire. Driving product conceptualization, ergonomic mechanical packaging, industrial validation, and user experience.",
    location: "Kakinada, Andhra Pradesh, India",
    story: [
      "Teja leads product strategy and physical-to-digital validation at SolveMpire, translating complex engineering requirements into intuitive user workflows.",
      "He specializes in 3D CAD modeling, enclosure ergonomics, rapid physical prototyping, and customer-facing interface synchronizations.",
      "Teja collaborates closely with engineering leads to ensure every product solves authentic market needs with zero ergonomic or operational friction.",
    ],
    focusAreas: [
      "Product Conceptualization",
      "Mechanical Packaging & CAD",
      "Rapid Prototyping",
      "User Experience (UX)",
      "Design Validation",
    ],
    socials: {
      linkedin: "https://linkedin.com",
      email: "support@solvempire.com",
    },
  },
  {
    slug: "pavan-kumar-duggirala",
    name: "Pavan Kumar Duggirala",
    role: "Product Strategist & Marketing",
    avatar: "/avatars/pavan.jpg",
    shortBio:
      "Product Strategist & Marketing Lead at SolveMpire. Driving product go-to-market strategies, positioning, engineering documentation, and client engagement.",
    location: "Andhra Pradesh, India",
    story: [
      "Pavan bridges the gap between deep technical hardware engineering and commercial product market positioning.",
      "He crafts technical marketing strategies, product dossiers, client case studies, and engineering narratives that articulate SolveMpire's unique co-design methodology.",
      "Pavan works closely with founders and enterprise clients to define product roadmaps, commercial viability metrics, and zero-friction adoption workflows.",
    ],
    focusAreas: [
      "Product Strategy",
      "Technical Marketing",
      "Go-To-Market Execution",
      "Client Roadmaps",
      "Engineering Communications",
    ],
    socials: {
      linkedin: "https://linkedin.com",
      email: "support@solvempire.com",
    },
  },
  {
    slug: "prasad-duggirala",
    name: "Prasad Duggirala",
    role: "AI/ML Engineer",
    avatar: "/avatars/pavan.jpg",
    shortBio:
      "AI/ML Engineer at SolveMpire. Developing intelligent edge-AI models, computer vision pipelines, telemetry analytics, and predictive maintenance algorithms.",
    location: "Andhra Pradesh, India",
    story: [
      "Prasad focuses on integrating artificial intelligence, machine learning, and edge analytics into physical hardware devices and IoT platforms.",
      "His work encompasses edge vision algorithms for automated machines, sensor fusion, automated anomaly detection, and predictive maintenance pipelines.",
      "Prasad designs lightweight neural models optimized for low-power edge compute and embedded Linux microprocessors.",
    ],
    focusAreas: [
      "Edge AI & Computer Vision",
      "Machine Learning Telemetry",
      "Embedded Anomaly Detection",
      "Sensor Fusion",
      "Predictive Maintenance",
    ],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "support@solvempire.com",
    },
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  // Support canonical and legacy aliases
  if (slug === "pavan-duggirala") {
    return teamMembers.find((m) => m.slug === "pavan-kumar-duggirala");
  }
  return teamMembers.find((member) => member.slug === slug);
}

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}
