import type { SiteConfig, SiteIconName } from "./types";

/** Brand-specific customer-channel photography supplied with each site. */
export const CUSTOMER_CHANNEL_IMAGES: Record<
  SiteConfig["id"],
  Partial<Record<SiteIconName, string>>
> = {
  "la-nieve": {
    store: "/images/channels/tiendas.png",
    building: "/images/channels/minimercados.png",
    "package-check": "/images/channels/mayoristas.png",
    briefcase: "/images/channels/institucional.png",
    wine: "/images/channels/bares.png",
    users: "/images/channels/otros.png",
  },
  unimarka: {
    store: "/images/channels/tiendas.png",
    building: "/images/channels/minimercados.png",
    "package-check": "/images/channels/mayoristas.png",
    briefcase: "/images/channels/institucional.png",
    wine: "/images/channels/bares.png",
    users: "/images/channels/otros.png",
  },
};
