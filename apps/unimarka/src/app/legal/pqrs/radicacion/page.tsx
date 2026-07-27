import {
  PqrsFilingPage,
  createNoIndexPageMetadata,
} from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

/**
 * Intentionally not linked from navigation, the footer, or the Legal menu.
 * Reachable only via the button on /legal/pqrs or by its direct URL.
 * `noindex`/`nofollow` keep it out of search results without pretending the
 * route is private — it remains publicly reachable by URL.
 */
export const metadata = createNoIndexPageMetadata(siteConfig, {
  title: "Radicación de PQRS",
  description:
    "Formulario formal de radicación de peticiones, quejas, reclamos y sugerencias.",
  href: "/legal/pqrs/radicacion",
});

export default function Page() {
  return <PqrsFilingPage site={siteConfig} />;
}
