import { BookOpenText, FileCheck2, ShieldAlert } from "lucide-react";
import { PageIntro } from "../components/PageIntro";
import {
  LA_NIEVE_DATA_POLICY_DOCUMENT,
  UNIMARKA_DATA_POLICY_DOCUMENT,
} from "../config/dataPolicyContent";
import type { SiteConfig, SiteDataPolicySection } from "../config/types";

function PolicySection({
  index,
  section,
}: {
  readonly index: number;
  readonly section: SiteDataPolicySection;
}) {
  const paragraphs = section.body.split(/\n{2,}/);

  return (
    <article
      id={section.id}
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {section.title}
          </h2>
          <div className="mt-5 space-y-5 leading-7 text-muted-foreground">
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={`${section.id}-${paragraphIndex}`}
                className="whitespace-pre-line break-words"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Readable policy route with a sticky table of contents. A document is only
 * rendered for the brand explicitly named by its local legal source.
 */
export function DataPolicyPage({ site }: { site: SiteConfig }) {
  const document =
    site.dataPolicy.documentId === "la-nieve"
      ? LA_NIEVE_DATA_POLICY_DOCUMENT
      : site.dataPolicy.documentId === "unimarka"
        ? UNIMARKA_DATA_POLICY_DOCUMENT
        : null;

  return (
    <>
      <PageIntro copy={site.dataPolicy} />

      {!document ? (
        <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="rounded-3xl border border-dashed border-primary/40 bg-card p-7 shadow-sm sm:p-10">
            <ShieldAlert className="h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Documento no disponible para {site.name}
            </h2>
            <p className="mt-4 leading-relaxed text-foreground">
              {site.dataPolicy.applicability}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {site.dataPolicy.disclaimer}
            </p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <aside className="mb-10 flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-6 text-sm leading-relaxed">
            <FileCheck2
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-foreground">
                {site.dataPolicy.applicability}
              </p>
              <p className="mt-1 text-muted-foreground">
                {site.dataPolicy.disclaimer}
              </p>
            </div>
          </aside>

          <div className="grid items-start gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
            <nav
              aria-label={`Tabla de contenido de ${document.title}`}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-28"
            >
              <div className="flex items-center gap-3">
                <BookOpenText
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                <h2 className="font-bold">Contenido</h2>
              </div>
              <ol className="mt-5 space-y-1">
                {document.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex gap-2 rounded-lg px-2 py-2 text-sm leading-snug text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span
                        className="font-semibold text-primary/75"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 space-y-6">
              <header className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/75">
                  {document.owner}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                  {document.title}
                </h2>
                <p className="mt-3 text-sm text-primary-foreground/80">
                  Fuente local: {document.sourceFile}
                </p>
              </header>

              {document.sections.map((section, index) => (
                <PolicySection
                  key={section.id}
                  index={index}
                  section={section}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
