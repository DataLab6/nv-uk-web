import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";
import { StatusPanel } from "../components/StatusPanel";

interface ContactChannel {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}

/**
 * Independent contact route that exposes only configured corporate channels.
 */
export function ContactPage({ site }: { site: SiteConfig }) {
  const channels = [
    site.contact.location
      ? {
          icon: MapPin,
          label: "Ubicación",
          value: site.contact.location,
        }
      : null,
    site.contact.email
      ? {
          icon: Mail,
          label: "Correo",
          value: site.contact.email,
          href: `mailto:${site.contact.email}`,
        }
      : null,
    site.contact.phone
      ? {
          icon: Phone,
          label: "Teléfono",
          value: site.contact.phone,
          href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
        }
      : null,
  ].filter((channel): channel is ContactChannel => Boolean(channel));

  return (
    <>
      <PageIntro copy={site.contact} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <RevealGroup>
            <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-card">
              <div
                className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary-foreground/10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-secondary/35"
                aria-hidden="true"
              />
              <div className="relative max-w-sm">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15">
                  <MessageCircle className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-3xl font-bold text-primary-foreground">
                  Hablemos
                </h2>
                <p className="mt-4 leading-relaxed text-primary-foreground/80">
                  Los datos publicados aquí provienen de la configuración
                  corporativa de cada empresa.
                </p>
              </div>
            </div>
          </RevealGroup>

          <div>
            {channels.length > 0 && (
              <RevealGroup
                className="mb-8 grid gap-5 sm:grid-cols-2"
                stagger={0.08}
              >
                {channels.map((channel) => {
                  const content = (
                    <>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <channel.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h2 className="mt-5 text-sm font-semibold uppercase tracking-wider text-primary">
                        {channel.label}
                      </h2>
                      <p className="mt-2 break-words text-lg font-semibold text-foreground">
                        {channel.value}
                      </p>
                    </>
                  );

                  return channel.href ? (
                    <a
                      key={channel.label}
                      href={channel.href}
                      className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-card"
                    >
                      {content}
                    </a>
                  ) : (
                    <article
                      key={channel.label}
                      className="rounded-2xl border border-border bg-card p-7 shadow-sm"
                    >
                      {content}
                    </article>
                  );
                })}
              </RevealGroup>
            )}

            <RevealGroup>
              <StatusPanel
                title="Canales corporativos en validación"
                description={site.contact.pendingMessage}
              />
            </RevealGroup>
          </div>
        </div>
      </section>
    </>
  );
}
