import { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    slug: "hanish-jyosyabhatla",
    name: "Hanish Jyosyabhatla",
    role: "Founder & CEO",
    avatar: "/avatars/hanish.webp",
    shortBio:
      "Founder & CEO at SolveMpire. Driving end-to-end hardware, embedded systems, custom automation, and product engineering from concept to scaled production.",
    location: "Kakinada, Andhra Pradesh, India",
    story: [
      "Hanish founded SolveMpire to bridge the gap between abstract product concepts and robust, manufacturable hardware and software systems.",
      "With expertise spanning mechanical CAD, custom electronics, embedded firmware architecture, and cloud platforms, Hanish leads multidisciplinary engineering teams to build physical devices and digital platforms that scale reliably.",
      "He writes extensively on end-to-end product engineering, custom automation machinery, Design for Manufacturability (DFM), factory vetting, and eliminating unnecessary technical complexity.",
    ],
    focusAreas: [
      "End-to-End Product Architecture",
      "Hardware & Embedded Systems",
      "Custom Automation & Robotics",
      "DFM & Scaled Manufacturing",
    ],
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "support@solvempire.com",
    },
  },
  {
    slug: "pavan-duggirala",
    name: "Pavan Duggirala",
    role: "Product & Community Lead",
    avatar: "/avatars/pavan.jpg",
    shortBio:
      "Product strategist and community architect focusing on zero-friction workflows and engineering build logs.",
    location: "Global / Remote",
    story: [
      "At SolveMpire, Pavan contributes to product strategy, user experience research, and engineering documentation, focusing on low-friction systems and high-throughput workflows.",
      "His background spans product design systems, user feedback loops, and engineering operational clarity.",
    ],
    focusAreas: [
      "Zero-Activation Workflows",
      "Engineering Documentation",
      "Product Feedback Loops",
    ],
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
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
