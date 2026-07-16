"use client";

import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, FileUp, Send, ShieldCheck } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

const fieldClassName =
  "mt-2 min-h-12 min-w-0 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground/75 hover:border-primary/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

/**
 * Careers route with a future-ready application form that never implies a
 * submission channel or storage backend before either one is configured.
 */
export function CareersPage({ site }: { site: SiteConfig }) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <>
      <PageIntro copy={site.careers} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <RevealGroup className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 xl:gap-20">
          <div className="space-y-6">
            <figure className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-card">
              <Image
                src={site.careers.image.src}
                alt={site.careers.image.alt}
                width={site.careers.image.width}
                height={site.careers.image.height}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </figure>

            <div className="rounded-3xl border border-dashed border-primary/35 bg-primary/5 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-foreground">
                Canal en preparación
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {site.careers.pendingMessage}
              </p>
              {isDevelopment && (
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Entorno de desarrollo: el formulario no transmite, almacena ni
                  adjunta postulaciones.
                </p>
              )}
            </div>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            aria-labelledby="careers-form-title"
            aria-describedby="careers-form-status"
            className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2
              id="careers-form-title"
              className="mt-6 text-3xl font-bold tracking-tight text-card-foreground"
            >
              Perfil laboral
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Vista previa de la información prevista para el futuro canal de
              postulación.
            </p>

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
                />
              </label>

              <label className="text-sm font-semibold text-card-foreground">
                Número telefónico
                <input
                  className={fieldClassName}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Número de contacto"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-card-foreground">
                Ciudad
                <input
                  className={fieldClassName}
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  placeholder="Ciudad de residencia"
                  required
                />
              </label>

              <label className="text-sm font-semibold text-card-foreground sm:col-span-2">
                Cargo o área de interés
                <select
                  className={fieldClassName}
                  name="area"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="commercial">Comercial</option>
                  <option value="logistics">Logística y distribución</option>
                  <option value="administrative">Administrativa</option>
                  <option value="other">Otra área</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-card-foreground sm:col-span-2">
                Perfil o experiencia
                <textarea
                  className={fieldClassName + " min-h-36 resize-y"}
                  name="profile"
                  placeholder="Describe brevemente tu experiencia e intereses"
                  required
                />
              </label>

              <div className="sm:col-span-2">
                <label
                  htmlFor="careers-cv"
                  className="text-sm font-semibold text-card-foreground"
                >
                  Hoja de vida
                </label>
                <input
                  id="careers-cv"
                  className={
                    fieldClassName +
                    " min-h-14 cursor-pointer p-2 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-primary-foreground"
                  }
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  aria-describedby="careers-file-help"
                  required
                />
                <p
                  id="careers-file-help"
                  className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                >
                  <FileUp
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    Formatos previstos: PDF, DOC o DOCX.
                    {isDevelopment &&
                      " La selección permanece únicamente en tu dispositivo; no existe un canal de carga conectado."}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
              <input
                id="careers-data-policy"
                className="mt-1 h-5 w-5 shrink-0 accent-primary"
                type="checkbox"
                name="data-policy-acceptance"
                required
              />
              <span>
                <label htmlFor="careers-data-policy">
                  He leído la información disponible sobre el tratamiento de
                  datos personales y acepto su aplicación a una futura
                  postulación.
                </label>{" "}
                <Link
                  href="/legal/tratamiento-de-datos"
                  className="font-semibold text-primary underline decoration-primary/40 transition-colors hover:text-primary/80"
                >
                  Consultar tratamiento de datos
                </Link>
                .
              </span>
            </div>

            <div
              id="careers-form-status"
              className={
                isDevelopment
                  ? "mt-6 rounded-2xl border border-dashed border-primary/35 bg-primary/5 p-4 text-sm font-semibold leading-relaxed text-foreground"
                  : "mt-5 text-xs leading-relaxed text-muted-foreground"
              }
            >
              {isDevelopment
                ? "Entorno de desarrollo: esta interfaz no envía información ni carga archivos."
                : "Canal digital de postulación en preparación."}
            </div>

            <button
              type="submit"
              disabled
              className="mt-6 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground opacity-65 sm:w-auto"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Canal de postulación no disponible
            </button>
          </form>
        </RevealGroup>
      </section>
    </>
  );
}
