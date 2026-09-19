/**
 * SolveMpire Canonical Company & Brand Constants
 * ===============================================
 * Single source of truth for entity facts and contact details.
 */

export const COMPANY = {
  brandName: "SolveMpire",
  legalName: "SolveMpire Private Limited",
  cin: "U62013AP2025PTC122808",
  email: "hello@solvempire.com",
  supportEmail: "support@solvempire.com",
  city: "Kakinada, Andhra Pradesh, India",
  fullAddress:
    "SFNO 244/3 D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, East Godavari, Andhra Pradesh, 533005, India",
  mapsUrl: "https://maps.app.goo.gl/Fksd6MhzFhw9WyT36",
  getCopyright: (year: number = new Date().getFullYear()) =>
    `© ${year} SolveMpire Private Limited. All rights reserved.`,
  positioning: {
    eyebrow: "PRODUCT ENGINEERING COMPANY",
    h1: "We Engineer Ideas Into Working Products.",
    subhead:
      "Mechanical design, custom PCBs, embedded firmware, and the cloud platforms that run them. One team, from CAD to field support.",
  },
} as const;

export type Company = typeof COMPANY;
