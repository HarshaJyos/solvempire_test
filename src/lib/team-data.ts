import { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    slug: "pavan-duggirala",
    name: "Pavan Duggirala",
    role: "Product & Community Lead",
    avatar: "/avatars/pavan.jpg",
    shortBio: "Product strategist living with ADHD, exploring calm, zero-friction externalization systems.",
    location: "Global / Remote",
    story: [
      "After years of wrestling with fragmented notes and disjointed design systems, Pavan realized that traditional productivity and engineering tools force practitioners to organize at the exact moment of capture—causing cognitive overflow and friction.",
      "At SolveMpire, Pavan contributes to product strategy, user experience research, and engineering build logs, focusing on zero-activation systems and high-throughput workflows.",
      "His writing focuses on breaking the cycle of friction and engineering hardware and software that respects human cognitive limits.",
    ],
    focusAreas: [
      "Zero-Activation Workflows",
      "Cognitive Engineering Support",
      "Calm Software Architecture",
      "Engineering Build Logs",
    ],
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      github: "https://github.com",
      email: "support@solvempire.com",
    },
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}
