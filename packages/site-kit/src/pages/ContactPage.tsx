"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageSquareText, Phone, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";
import { TurnstileWidget } from "../components/TurnstileWidget";
import { isValidEmail, sanitizePhone } from "../lib/formValidation";

const fieldClassName =
  "mt-2 min-h-12 min-w-0 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground/75 hover:border-primary/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const SOCIAL_NETWORKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    surfaceClass: "border-[#0A66C2] bg-[#0A66C2] text-white",
  },
  {
    key: "instagram",
    label: "Instagram",
    surfaceClass:
      "border-transparent bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white",
  },
  {
    key: "facebook",
    label: "Facebook",
    surfaceClass: "border-[#1877F2] bg-[#1877F2] text-white",
  },
] as const satisfies readonly {
  key: keyof SiteConfig["socialLinks"];
  label: string;
  surfaceClass: string;
}[];

type SocialNetwork = (typeof SOCIAL_NETWORKS)[number]["key"];

function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (network === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M13.6 21v-8h2.75l.4-3.15H13.6V7.82c0-.91.26-1.53 1.59-1.53H17V3.48a24 24 0 0 0-2.62-.14c-2.6 0-4.38 1.58-4.38 4.49v2.02H7.1V13H10v8h3.6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10v7M8 7.25v.01M12 17v-7M12 13.25c0-1.8 1.2-3.25 2.8-3.25 1.55 0 2.2 1.05 2.2 2.8V17" />
    </svg>
  );
}

function DirectChannel({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {label}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[0.8125rem] font-semibold tracking-tight text-card-foreground sm:text-sm">
          {value}
        </span>
      </span>
    </>
  );

  return href ? (
    <a
      href={href}
      className="flex min-h-20 flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-card motion-reduce:transform-none sm:flex-row sm:items-center sm:gap-4"
    >
      {content}
    </a>
  ) : (
    <div
      className="flex min-h-20 flex-col items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:gap-4"
      aria-disabled="true"
    >
      {content}
    </div>
  );
}

/**
 * Independent contact route with an accessible, non-submitting form and only
 * the corporate channels that are present in each site's configuration.
 */
export function ContactPage({ site }: { site: SiteConfig }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const formElement = event.currentTarget;
      const form = new FormData(formElement);
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "No fue posible enviar el mensaje.");
      }

      formElement.reset();
      setSubmitStatus("success");
      setSubmitMessage("Recibimos tu mensaje. Te responderemos por correo.");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "No fue posible enviar el mensaje. Intenta de nuevo."
      );
    } finally {
      setTurnstileResetSignal((current) => current + 1);
      setIsSubmitting(false);
    }
  }

  const phoneHref = site.contact.phone
    ? "tel:" + site.contact.phone.replace(/\s/g, "")
    : undefined;
  const emailHref = site.contact.email
    ? "mailto:" + site.contact.email
    : undefined;

  return (
    <>
      <PageIntro copy={site.contact} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-12 xl:gap-16">
          <RevealGroup>
            <form
              onSubmit={handleSubmit}
              aria-labelledby="contact-form-title"
              aria-describedby="contact-form-status"
              className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:p-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <MessageSquareText className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2
                id="contact-form-title"
                className="mt-6 text-3xl font-bold tracking-tight text-card-foreground"
              >
                Escríbenos
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Nombre completo
                  <input
                    className={fieldClassName}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    required
                  />
                </label>

                <label className="text-sm font-semibold text-card-foreground">
                  Correo electrónico
                  <input
                    className={fieldClassName}
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="nombre@correo.com"
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    title="Ingresa un correo electrónico válido"
                    onChange={(event) =>
                      event.currentTarget.setCustomValidity(
                        isValidEmail(event.currentTarget.value)
                          ? ""
                          : "Ingresa un correo electrónico válido."
                      )
                    }
                  />
                </label>

                <label className="text-sm font-semibold text-card-foreground">
                  Número telefónico
                  <input
                    className={fieldClassName}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="Número de contacto"
                    pattern="[0-9]+"
                    onChange={(event) => {
                      event.currentTarget.value = sanitizePhone(
                        event.currentTarget.value
                      );
                    }}
                  />
                </label>

                <label className="text-sm font-semibold text-card-foreground">
                  Empresa o establecimiento
                  <input
                    className={fieldClassName}
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Nombre del negocio"
                  />
                </label>

                <label className="text-sm font-semibold text-card-foreground sm:col-span-2">
                  Asunto
                  <select
                    className={fieldClassName}
                    name="subject"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="commercial">Consulta comercial</option>
                    <option value="general">Información general</option>
                    <option value="other">Otro motivo</option>
                  </select>
                </label>

                <label className="text-sm font-semibold text-card-foreground sm:col-span-2">
                  Mensaje
                  <textarea
                    className={fieldClassName + " min-h-36 resize-y"}
                    name="message"
                    placeholder="Cuéntanos cómo podemos orientarte"
                    required
                  />
                </label>
              </div>

              <div
                id="contact-form-status"
                className={
                  "mt-5 leading-relaxed " +
                  (submitStatus === "error"
                    ? "text-sm text-destructive"
                    : submitStatus === "success"
                      ? "text-base font-semibold text-primary sm:text-lg"
                      : "text-xs text-muted-foreground")
                }
                aria-live="polite"
              >
                <p>{submitMessage || "Completa los campos para enviarnos tu mensaje."}</p>
              </div>

              <TurnstileWidget resetSignal={turnstileResetSignal} />

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-65 sm:w-auto"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Enviando…" : "Enviar mensaje"}
              </button>
            </form>
          </RevealGroup>

          <RevealGroup className="space-y-6">
            <section
              aria-labelledby="direct-channels-title"
              className="rounded-3xl border border-border bg-surface p-6 sm:p-7"
            >
              <h2
                id="direct-channels-title"
                className="text-xl font-bold text-foreground"
              >
                Canales directos
              </h2>
              <div className="mt-5 grid gap-3">
                <DirectChannel
                  icon={Phone}
                  label="Teléfono"
                  value={site.contact.phone ?? "Pendiente de configuración"}
                  href={phoneHref}
                />
                <DirectChannel
                  icon={Mail}
                  label="Correo"
                  value={site.contact.email ?? "Pendiente de configuración"}
                  href={emailHref}
                />
              </div>
            </section>

            <section
              aria-labelledby="contact-social-title"
              className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7"
            >
              <h2
                id="contact-social-title"
                className="text-xl font-bold text-card-foreground"
              >
                Redes sociales
              </h2>
              <div className="mt-5 grid gap-3">
                {SOCIAL_NETWORKS.filter(({ key }) =>
                  site.socialNetworks.includes(key)
                ).map(({ key, label, surfaceClass }) => {
                  const href = site.socialLinks[key];
                  const content = (
                    <>
                      <SocialIcon network={key} />
                      <span className="font-semibold">{label}</span>
                      <span className="ml-auto text-xs text-white/80">
                        {href ? "Visitar perfil" : "Pendiente"}
                      </span>
                    </>
                  );

                  return href ? (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={"Visitar " + label + " de " + site.name}
                      className={
                        "flex min-h-14 items-center gap-3 rounded-xl border px-4 text-sm shadow-sm transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-white motion-reduce:transform-none " +
                        surfaceClass
                      }
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={key}
                      aria-disabled="true"
                      className={
                        "flex min-h-14 items-center gap-3 rounded-xl border px-4 text-sm opacity-60 saturate-50 " +
                        surfaceClass
                      }
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </section>
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
