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
  bio?: string;
  linkedin?: string; // {{TODO: needs content: add LinkedIn URLs}}
};

export const teamMembers: TeamMember[] = [
  {
    id: "01",
    name: "Mandapalli Teja",
    role: "Co-Founder & Product Lead",
    image: "/teja.webp",
    bio: "Leading product engineering, industrial validation, and mechanical architecture across physical hardware platforms.",
  },
  {
    id: "02",
    name: "Hanish Jyosyabhatla",
    role: "Founder & Lead Architect",
    image: "/hanish.webp",
    bio: "Directing multi-disciplinary engineering architecture spanning mechanical design, custom electronics, and connected software platforms.",
  },
  {
    id: "03",
    name: "Lohith Medisetti",
    role: "Co-Founder & Operations",
    image: "/lohith.webp",
    bio: "Managing manufacturing partnerships, supply chain execution, deployment logistics, and operational field reliability.",
  },
];
