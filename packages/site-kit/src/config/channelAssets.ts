import type { SiteConfig, SiteIconName } from "./types";

/** Brand-specific customer-channel photography supplied with each site. */
export const CUSTOMER_CHANNEL_IMAGES: Record<
  SiteConfig["id"],
  Partial<Record<SiteIconName, string>>
> = {
  "la-nieve": {
    store: "/images/channels/tienda-nieve-ejemplo-v2-20260824.png",
    building: "/images/channels/minimercados.png",
    "package-check": "/images/channels/mayoristas-v2.png",
    briefcase: "/images/channels/institucional.png",
    wine: "/images/channels/bares-20260825.png",
    users: "/images/channels/otros-20260730-v2.png",
  },
  unimarka: {
    store: "/images/channels/tienda-unimarka-ejemplo-v2-20260824.png",
    building: "/images/channels/minimercados.png",
    "package-check": "/images/channels/mayoristas-v2.png",
    briefcase: "/images/channels/institucional.png",
    wine: "/images/channels/bares-20260825.png",
    users: "/images/channels/otros-20260730-v2.png",
  },
};
