import { ImageIcon } from "lucide-react";
import type { SiteAlly, SiteConfig } from "../config/types";
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

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup>
          <aside className="mb-10 flex items-start gap-4 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground">
            <ImageIcon
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p>{site.allies.imageNotice}</p>
          </aside>
        </RevealGroup>

        <RevealGroup
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.05}
        >
          {site.allies.items.map((ally) => (
            <article
              key={ally.name}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-card"
            >
              <div
                className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/25 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
                aria-label={`Espacio reservado para el logotipo de ${ally.name}`}
              >
                <span className="text-3xl font-black tracking-tight text-primary transition-transform duration-300 group-hover:scale-110">
                  {getAllyInitials(ally)}
                </span>
                <ImageIcon
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-4 text-base font-bold leading-snug text-card-foreground">
                {ally.name}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Logotipo pendiente
              </p>
            </article>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
