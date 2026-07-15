import Image from "next/image";
import { Eye, Flag, ShieldCheck } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { FeatureCard } from "../components/FeatureCard";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

/**
 * Company profile route with editable mission, vision, values and pillars.
 */
export function AboutPage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.about} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <figure className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-card">
            <div
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20"
              aria-hidden="true"
            />
            <Image
              src={site.about.image.src}
              alt={site.about.image.alt}
              width={site.about.image.width}
              height={site.about.image.height}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="relative aspect-[4/3] w-full object-cover"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-xl bg-background/85 px-4 py-3 text-sm text-muted-foreground shadow-sm backdrop-blur-md">
              Imagen conceptual para esta fase del sitio corporativo.
            </figcaption>
          </figure>

          <div className="space-y-5">
            <article className="rounded-2xl border border-primary/20 bg-primary/5 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Flag className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">Misión</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {site.about.mission}
              </p>
            </article>

            <article className="rounded-2xl border border-secondary/30 bg-secondary/10 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">Visión</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {site.about.vision}
              </p>
            </article>

            <aside className="flex gap-3 rounded-2xl border border-dashed border-primary/40 bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p>{site.about.disclaimer}</p>
            </aside>
          </div>
        </RevealGroup>
      </section>

      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/75">
              Lo que nos orienta
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Valores corporativos
            </h2>
          </div>
          <RevealGroup
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {site.about.values.map((value) => (
              <div key={value.title} className="text-foreground">
                <FeatureCard feature={value} />
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Nuestra forma de avanzar
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pilares corporativos
          </h2>
        </div>
        <RevealGroup
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {site.about.pillars.map((pillar) => (
            <FeatureCard key={pillar.title} feature={pillar} />
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
