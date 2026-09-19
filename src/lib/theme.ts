/**
 * Solvempire Design System & Theme Configuration
 * ==============================================
 * Centralized, easily configurable color tokens and theme values.
 * Edit any color here or in `src/app/globals.css` to update across the entire website.
 */

export const THEME_COLORS = {
  // Brand Blues
  primary: "#2563eb",         // Main brand royal blue (buttons, links, active highlights)
  primaryHover: "#1d4ed8",    // Darker blue for hover states
  primaryLight: "#3b82f6",    // Lighter vibrant blue for accents, glows, orbital node
  periwinkle: "#6c85c4",      // Process/Team primary accent blue-slate
  iceBlue: "#c8d7f6",         // Soft ice blue for alternating process steps
  iceBlueLight: "#eff4fe",    // Very light blue tint for badge containers and icon backgrounds

  // Background Surfaces (Premium Off-White Theme)
  canvas: "#f3f6fc",           // Main page background: Studio Ice Pearl
  canvasCard: "#ffffff",       // Pure crisp white for elevated cards and modals
  canvasSubtle: "#f1f5f9",     // Soft slate tint for internal card sections
  canvasDark: "#07080b",       // Pitch black background for Hero Contact & Dark sections
  
  // Text Colors
  textHeading: "#0a0f1d",      // Deep high-contrast charcoal for bold headings
  textBody: "#475569",         // Balanced slate for body copy and descriptions
  textMuted: "#64748b",        // Muted slate for sub-captions and metadata
  textSubtle: "#94a3b8",       // Subtle placeholder and inactive text

  // Contact Information
  contact: {
    email: "support@solvempire.com",
    city: "Kakinada, Andhra Pradesh, India",
    fullAddress:
      "SFNO 244/3D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, East Godavari, Andhra Pradesh, 533005, India",
    mapsUrl: "https://maps.app.goo.gl/Fksd6MhzFhw9WyT36",
  },
} as const;

export type ThemeColors = typeof THEME_COLORS;
