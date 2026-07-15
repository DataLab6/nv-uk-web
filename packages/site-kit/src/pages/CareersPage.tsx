import Image from "next/image";
import type { SiteConfig } from "../config/types";
import { FeatureCard } from "../components/FeatureCard";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";
import { StatusPanel } from "../components/StatusPanel";

/**
 * Careers route prepared for future vacancies and official application channels.
 */
export function CareersPage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.careers} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <figure className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-card">
            <Image
              src={site.careers.image.src}
              alt={site.careers.image.alt}
              width={site.careers.image.width}
              height={site.careers.image.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"
              aria-hidden="true"
            />
          </figure>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Talento y cultura
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Construimos juntos el futuro de la distribución
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Esta página separa la experiencia de candidatos de los canales de
              contacto comercial y queda lista para publicar oportunidades
              verificadas.
            </p>
          </div>
        </RevealGroup>

        <RevealGroup
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {site.careers.benefits.map((benefit) => (
            <FeatureCard key={benefit.title} feature={benefit} />
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10">
          <StatusPanel
            title="Convocatorias y postulaciones"
            description={site.careers.pendingMessage}
          />
        </RevealGroup>
      </section>
    </>
  );
}
