import { z } from "zod";

export const projectTypes = [
  "Mechanical Product Design",
  "Electronics & Custom PCB",
  "Embedded Systems & Firmware",
  "Software, Cloud & IoT Platform",
  "Full End-to-End Product (Not sure yet)",
] as const;

export const projectStages = [
  "Idea / Early Thinking",
  "Concept & Technical Spec Exists",
  "Functional Prototype Exists",
  "In Commercial Production",
  "Existing Product Needs Engineering Support",
] as const;

export const budgetRanges = [
  "Under ₹5L",
  "₹5L – ₹15L",
  "₹15L – ₹40L",
  "₹40L+",
  "Not sure yet / Need scoping",
] as const;

export const projectTimelines = [
  "ASAP (Within 2 weeks)",
  "1 – 3 months",
  "3 – 6 months",
  "Exploring / Future Roadmap",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid work email address."),
  company: z.string().trim().optional(),
  projectType: z.enum(projectTypes, {
    message: "Please select a project type.",
  }),
  stage: z.enum(projectStages, {
    message: "Please select your current project stage.",
  }),
  budget: z.enum(budgetRanges).optional(),
  timeline: z.enum(projectTimelines, {
    message: "Please select an estimated timeline.",
  }),
  description: z
    .string()
    .trim()
    .min(15, "Please tell us what you're building (at least 15 characters)."),
  // Honeypot field (must remain empty)
  fax_number: z.string().max(0, "Bot submission detected.").optional(),
  // Time-to-submit timestamp
  formRenderTime: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
