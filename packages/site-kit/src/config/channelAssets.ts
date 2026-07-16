import type { StaticImageData } from "next/image";
import baresLicoreras from "../assets/channels/bares-licoreras.webp";
import institucional from "../assets/channels/institucional.webp";
import mayoristas from "../assets/channels/mayoristas.webp";
import minimercadosSupermercados from "../assets/channels/minimercados-supermercados.webp";
import otros from "../assets/channels/otros.webp";
import tiendas from "../assets/channels/tiendas.webp";
import type { SiteIconName } from "./types";

/** Shared visual vocabulary for the mirrored customer-channel section. */
export const CUSTOMER_CHANNEL_IMAGES: Partial<
  Record<SiteIconName, StaticImageData>
> = {
  store: tiendas,
  building: minimercadosSupermercados,
  "package-check": mayoristas,
  briefcase: institucional,
  wine: baresLicoreras,
  users: otros,
};
