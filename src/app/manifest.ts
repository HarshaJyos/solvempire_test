import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.legalName} — Product Engineering Studio`,
    short_name: COMPANY.brandName,
    description: COMPANY.positioning.subhead,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFCFF",
    theme_color: "#1F56C6",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
