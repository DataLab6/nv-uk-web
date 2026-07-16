import { ImageIcon } from "lucide-react";
import type { SiteAlly, SiteConfig } from "../config/types";
import { AllyLogo } from "../components/AllyLogo";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

/** Builds a compact, readable placeholder mark from an ally name. */
function getAllyInitials(ally: SiteAlly) {
  return ally.name
    .split(/[\s–—-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Commercial allies route with future-proof image slots for approved logos.
 */
export function AlliesPage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.allies} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <RevealGroup>
          <aside className="mb-8 flex max-w-4xl items-start gap-3 border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
            <ImageIcon
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p>{site.allies.imageNotice}</p>
          </aside>
        </RevealGroup>

        <RevealGroup
          className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.05}
        >
          {site.allies.items.map((ally) => (
            <article
              key={ally.name}
              className="group flex min-h-56 min-w-0 flex-col items-center justify-center border-b border-border px-2 py-8 text-center"
            >
              {ally.image ? (
                <div className="flex h-24 w-full items-center justify-center dark:rounded-2xl dark:bg-white/90 dark:px-4 dark:py-3">
                  <AllyLogo
                    name={ally.name}
                    image={ally.image}
                    className="h-20 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
                    displayWidth={ally.displayWidth}
                    sizes={`${ally.displayWidth ?? 160}px`}
                  />
                </div>
              ) : (
                <div
                  className="relative flex h-24 w-full max-w-48 items-center justify-center rounded-xl border border-dashed border-primary/35 bg-primary/5"
                  aria-label={`Espacio reservado para el logotipo de ${ally.name}`}
                >
                  <span className="text-2xl font-black tracking-tight text-primary transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none">
                    {getAllyInitials(ally)}
                  </span>
                  <ImageIcon
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/60"
                    aria-hidden="true"
                  />
                </div>
              )}
              <h2 className="mt-3 text-sm font-bold leading-snug text-foreground sm:text-base">
                {ally.name}
              </h2>
              {!ally.image && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Logotipo pendiente
                </p>
              )}
            </article>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
