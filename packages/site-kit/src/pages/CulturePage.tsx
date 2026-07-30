import Image from "next/image";
import type { SiteConfig } from "../config/types";
import { CultureTopicCard } from "../components/CultureTopicCard";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

/**
 * Editorial route prepared for commercial tips and educational resources.
 */
export function CulturePage({ site }: { site: SiteConfig }) {
  const hasFeaturedImage =
    site.culture.imagePresentation === "featured-before-intro";

  return (
    <>
      {hasFeaturedImage && (
        <section
          aria-label={`Collage de ${site.name}`}
          className="bg-muted/25 px-3 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
        >
          <RevealGroup className="mx-auto max-w-[100rem]">
            <figure className="overflow-hidden rounded-3xl shadow-card">
              <Image
                src={site.culture.image.src}
                alt={site.culture.image.alt}
                width={site.culture.image.width}
                height={site.culture.image.height}
                sizes="(min-width: 1600px) 1536px, calc(100vw - 1.5rem)"
                className="h-auto w-full object-contain"
                priority
              />
            </figure>
          </RevealGroup>
        </section>
      )}

      <PageIntro copy={site.culture} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup
          className={
            hasFeaturedImage
              ? "mx-auto max-w-3xl text-center"
              : "grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          }
        >
          {!hasFeaturedImage && (
            <figure className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-card">
              <Image
                src={site.culture.image.src}
                alt={site.culture.image.alt}
                width={site.culture.image.width}
                height={site.culture.image.height}
                quality={92}
                sizes="(min-width: 1280px) 592px, (min-width: 1024px) 48vw, calc(100vw - 2rem)"
                className="aspect-video w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent"
                aria-hidden="true"
              />
            </figure>
          )}

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Contenido para crecer
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Herramientas prácticas para cada negocio
            </h2>
          </div>
        </RevealGroup>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Categorías
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Una biblioteca de valor para nuestros clientes
            </h2>
          </div>
          <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.1}>
            {site.culture.topics.map((topic) => (
              <CultureTopicCard key={topic.title} topic={topic} />
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
