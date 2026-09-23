import type { NextConfig } from "next";

const securityHeaders = [
  // HTTP Strict Transport Security (HSTS): Enforce HTTPS for 2 years, include subdomains & preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent Clickjacking attacks by forbidding iframe embedding
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Strict Referrer Policy: Send full URL for same-origin, only origin for cross-origin HTTPS
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Permissions Policy: Restrict access to sensitive browser hardware APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(self), interest-cohort=()",
  },
  // Legacy XSS Protection for older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Disable Flash/PDF cross-domain policy files
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  // Cross-Origin Opener Policy: Isolate browsing context
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  // Cross-Origin Resource Policy
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  // DNS Prefetch Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Content Security Policy (CSP)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://apis.google.com https://accounts.google.com https://*.firebaseapp.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://vitals.vercel-insights.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://accounts.google.com",
      "frame-src 'self' https://accounts.google.com https://*.firebaseapp.com https://apis.google.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ") + ";",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
