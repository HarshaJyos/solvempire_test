/**
 * SolveMpire Team Data
 * ====================
 * Single source of truth for leadership and engineering team.
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  slug: string;
  bio?: string;
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "01",
    name: "Hanish Jyosyabhatla",
    role: "Founder & CEO",
    image: "/hanish.webp",
    slug: "hanish-jyosyabhatla",
    bio: "Founder & CEO directing multidisciplinary engineering architecture across mechanical design, custom electronics, embedded firmware, and connected software platforms.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "02",
    name: "Lohith Medisetti",
    role: "Co-Founder & COO",
    image: "/lohith.webp",
    slug: "lohith-medisetti",
    bio: "Co-Founder & COO managing manufacturing partnerships, supply chain execution, deployment logistics, and operational reliability.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "03",
    name: "Teja Mandapalli",
    role: "Co-Founder & Product Lead",
    image: "/teja.webp",
    slug: "teja-mandapalli",
    bio: "Co-Founder & Product Lead driving product conceptualization, ergonomic mechanical packaging, industrial validation, and user experience.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "04",
    name: "Pavan Kumar Duggirala",
    role: "Product Strategist & Marketing",
    image: "/avatars/pavan.jpg",
    slug: "pavan-kumar-duggirala",
    bio: "Product strategist driving market positioning, product roadmaps, technical marketing, and engineering narratives.",
    linkedin: "https://linkedin.com",
  },
  {
    id: "05",
    name: "Gayathri Boyapati",
    role: "Electronics Engineer, PCB & VLSI Specialist",
    image: "/avatars/gayatri.jpeg",
    slug: "gayathri-boyapati",
    bio: "Electronics Engineer & PCB/VLSI Design Specialist architecting custom multilayer PCB layouts, power distribution, and real-time embedded hardware.",
    linkedin: "https://www.linkedin.com/in/gayathri-boyapati-384b72402",
  },
  {
    id: "06",
    name: "Prasad Duggirala",
    role: "AI/ML Engineer",
    image: "/avatars/pavan.jpg",
    slug: "prasad-duggirala",
    bio: "AI/ML Engineer developing edge computer vision models, telemetry analytics, and predictive maintenance algorithms for hardware systems.",
    linkedin: "https://linkedin.com",
  },
];
