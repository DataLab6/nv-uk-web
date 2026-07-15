import { FileCheck2, ShieldAlert } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

/**
 * Draft data-treatment route whose provisional status remains explicit.
 */
export function DataPolicyPage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.dataPolicy} />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup>
          <aside className="mb-10 flex items-start gap-4 rounded-2xl border border-dashed border-destructive/50 bg-destructive/5 p-6 text-sm leading-relaxed text-muted-foreground">
            <ShieldAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <p>{site.dataPolicy.disclaimer}</p>
          </aside>
        </RevealGroup>

        <RevealGroup className="space-y-5" stagger={0.06}>
          {site.dataPolicy.sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10">
          <div className="flex items-center gap-4 rounded-2xl bg-primary p-6 text-primary-foreground">
            <FileCheck2 className="h-7 w-7 shrink-0" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-primary-foreground/85">
              La versión definitiva deberá incluir fecha de vigencia,
              responsable, canales oficiales y mecanismos de actualización.
            </p>
          </div>
        </RevealGroup>
      </section>
    </>
  );
}
