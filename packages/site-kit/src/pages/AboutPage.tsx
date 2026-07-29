import Image from "next/image";
import { Eye, Flag } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { CompanyTimeline } from "../components/CompanyTimeline";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";
import { ValuesSection } from "../components/ValuesSection";

/**
 * Company profile route with editable mission, vision and corporate values.
 */
export function AboutPage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.about} />

      <CompanyTimeline siteName={site.name} milestones={site.about.timeline} />

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
              loading="eager"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="relative aspect-[4/3] w-full object-cover"
            />
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
          </div>
        </RevealGroup>
      </section>

      <ValuesSection values={site.about.values} />
    </>
  );
}
