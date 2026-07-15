import Image from "next/image";
import type { SiteConfig } from "../config/types";
import { FeatureCard } from "../components/FeatureCard";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

/**
 * Editorial route prepared for commercial tips and educational resources.
 */
export function CulturePage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.culture} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <figure className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-card">
            <Image
              src={site.culture.image.src}
              alt={site.culture.image.alt}
              width={site.culture.image.width}
              height={site.culture.image.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent"
              aria-hidden="true"
            />
          </figure>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Contenido para crecer
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Herramientas prácticas para cada negocio
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Este espacio queda preparado para publicar recursos útiles en una
              siguiente fase, con categorías claras y una experiencia fácil de
              recorrer.
            </p>
          </div>
        </RevealGroup>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Próximas categorías
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Una biblioteca de valor para nuestros clientes
            </h2>
          </div>
          <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.1}>
            {site.culture.topics.map((topic) => (
              <FeatureCard key={topic.title} feature={topic} />
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
