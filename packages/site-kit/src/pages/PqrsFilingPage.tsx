"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileUp,
  Info,
  Paperclip,
  Send,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  PQRS_ATTACHMENT_RULES,
  PQRS_DOCUMENT_TYPES,
  PQRS_RESPONSE_TERMS_NOTE,
} from "../config/pqrsFilingContent";
import type { SiteConfig } from "../config/types";
import { cn } from "../lib/cn";

type TipoSolicitante = "natural" | "juridica" | "apoderado";
type PersonaRepresentadaTipo = "natural" | "juridica";

interface FilingFormState {
  tipoSolicitud: string;
  tipoSolicitante: TipoSolicitante;
  // Solicitante persona natural (también usado como "persona representada" cuando el
  // solicitante es un apoderado y la persona representada es natural).
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  // Solicitante persona jurídica (también reutilizado si la persona representada es jurídica).
  razonSocial: string;
  nit: string;
  repNombres: string;
  repApellidos: string;
  repTipoDocumento: string;
  repNumeroDocumento: string;
  // Identidad propia del apoderado/representante (distinta de la persona representada).
  representadoTipo: PersonaRepresentadaTipo;
  apoderadoNombres: string;
  apoderadoApellidos: string;
  apoderadoTipoDocumento: string;
  apoderadoNumeroDocumento: string;
  // Contacto y contenido.
  email: string;
  emailConfirm: string;
  telefono: string;
  asunto: string;
  objeto: string;
  hechos: string;
  aceptaTratamiento: boolean;
  aceptaRespuestaCorreo: boolean;
  aceptaVeracidad: boolean;
}

function createInitialState(tipoSolicitud: string): FilingFormState {
  return {
    tipoSolicitud,
    tipoSolicitante: "natural",
    nombres: "",
    apellidos: "",
    tipoDocumento: PQRS_DOCUMENT_TYPES[0],
    numeroDocumento: "",
    razonSocial: "",
    nit: "",
    repNombres: "",
    repApellidos: "",
    repTipoDocumento: PQRS_DOCUMENT_TYPES[0],
    repNumeroDocumento: "",
    representadoTipo: "natural",
    apoderadoNombres: "",
    apoderadoApellidos: "",
    apoderadoTipoDocumento: PQRS_DOCUMENT_TYPES[0],
    apoderadoNumeroDocumento: "",
    email: "",
    emailConfirm: "",
    telefono: "",
    asunto: "",
    objeto: "",
    hechos: "",
    aceptaTratamiento: false,
    aceptaRespuestaCorreo: false,
    aceptaVeracidad: false,
  };
}

function maskDocument(value: string) {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "";
  if (trimmed.length <= 4) {
    return `${"•".repeat(Math.max(trimmed.length - 1, 0))}${trimmed.slice(-1)}`;
  }
  return `${trimmed.slice(0, 2)}${"•".repeat(trimmed.length - 4)}${trimmed.slice(-2)}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const fieldClassName =
  "mt-2 min-h-12 min-w-0 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground/75 hover:border-primary/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const errorFieldClassName = "border-destructive focus:border-destructive";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-destructive"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

/**
 * Formal, independent PQRS filing form. Not linked from any navigation
 * surface — reachable only via the button on the informational PQRS page or
 * by its direct URL. No backend exists yet, so the final submission stays
 * disabled while every other interaction (validation, review, attachments
 * UI) is fully implemented.
 */
export function PqrsFilingPage({ site }: { site: SiteConfig }) {
  const requestTypes = useMemo(
    () => site.pqrs.categories.map((category) => category.title),
    [site.pqrs.categories]
  );
  const [preselected, setPreselected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo && requestTypes.includes(tipo)) setPreselected(tipo);
  }, [requestTypes]);

  const [form, setForm] = useState<FilingFormState>(() =>
    createInitialState(requestTypes[0] ?? "")
  );
  useEffect(() => {
    if (preselected) {
      setForm((current) => ({ ...current, tipoSolicitud: preselected }));
    }
  }, [preselected]);

  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [representationProof, setRepresentationProof] = useState<File | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showReview, setShowReview] = useState(false);
  const isDevelopment = process.env.NODE_ENV === "development";

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const reviewRef = useRef<HTMLDivElement | null>(null);

  function update<K extends keyof FilingFormState>(
    key: K,
    value: FilingFormState[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const combined = [...attachments];
    let error: string | null = null;

    for (const file of incoming) {
      const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
      if (
        !PQRS_ATTACHMENT_RULES.acceptedExtensions.includes(
          extension as (typeof PQRS_ATTACHMENT_RULES.acceptedExtensions)[number]
        )
      ) {
        error = `Formato no permitido: ${file.name}. Usa ${PQRS_ATTACHMENT_RULES.acceptedExtensions.join(", ")}.`;
        continue;
      }
      if (file.size > PQRS_ATTACHMENT_RULES.maxFileSizeBytes) {
        error = `${file.name} supera el tamaño máximo por archivo (${formatBytes(PQRS_ATTACHMENT_RULES.maxFileSizeBytes)}).`;
        continue;
      }
      if (combined.length >= PQRS_ATTACHMENT_RULES.maxFiles) {
        error = `Solo puedes adjuntar hasta ${PQRS_ATTACHMENT_RULES.maxFiles} archivos.`;
        break;
      }
      const totalSize =
        combined.reduce((sum, f) => sum + f.size, 0) + file.size;
      if (totalSize > PQRS_ATTACHMENT_RULES.maxTotalSizeBytes) {
        error = `El total de anexos supera ${formatBytes(PQRS_ATTACHMENT_RULES.maxTotalSizeBytes)}.`;
        continue;
      }
      combined.push(file);
    }

    setAttachments(combined);
    setAttachmentError(error);
  }

  function removeAttachment(index: number) {
    setAttachments((current) => current.filter((_, i) => i !== index));
    setAttachmentError(null);
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};

    if (!form.tipoSolicitud) next.tipoSolicitud = "Selecciona un tipo de solicitud.";

    if (form.tipoSolicitante === "natural" || form.tipoSolicitante === "apoderado") {
      if (form.tipoSolicitante === "natural") {
        if (!form.nombres.trim()) next.nombres = "Ingresa tus nombres.";
        if (!form.apellidos.trim()) next.apellidos = "Ingresa tus apellidos.";
        if (!form.numeroDocumento.trim())
          next.numeroDocumento = "Ingresa tu número de documento.";
      }
    }

    if (form.tipoSolicitante === "juridica") {
      if (!form.razonSocial.trim()) next.razonSocial = "Ingresa la razón social.";
      if (!form.nit.trim()) next.nit = "Ingresa el NIT.";
      if (!form.repNombres.trim())
        next.repNombres = "Ingresa los nombres del representante.";
      if (!form.repApellidos.trim())
        next.repApellidos = "Ingresa los apellidos del representante.";
      if (!form.repNumeroDocumento.trim())
        next.repNumeroDocumento = "Ingresa el documento del representante.";
    }

    if (form.tipoSolicitante === "apoderado") {
      if (form.representadoTipo === "natural") {
        if (!form.nombres.trim())
          next.nombres = "Ingresa los nombres de la persona representada.";
        if (!form.apellidos.trim())
          next.apellidos = "Ingresa los apellidos de la persona representada.";
        if (!form.numeroDocumento.trim())
          next.numeroDocumento = "Ingresa el documento de la persona representada.";
      } else {
        if (!form.razonSocial.trim())
          next.razonSocial = "Ingresa la razón social representada.";
        if (!form.nit.trim()) next.nit = "Ingresa el NIT representado.";
      }
      if (!form.apoderadoNombres.trim())
        next.apoderadoNombres = "Ingresa tus nombres como apoderado.";
      if (!form.apoderadoApellidos.trim())
        next.apoderadoApellidos = "Ingresa tus apellidos como apoderado.";
      if (!form.apoderadoNumeroDocumento.trim())
        next.apoderadoNumeroDocumento = "Ingresa tu número de documento.";
    }

    if (!form.email.trim()) {
      next.email = "Ingresa un correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "El correo electrónico no es válido.";
    }
    if (!form.emailConfirm.trim()) {
      next.emailConfirm = "Confirma tu correo electrónico.";
    } else if (form.emailConfirm.trim() !== form.email.trim()) {
      next.emailConfirm = "Los correos electrónicos no coinciden.";
    }

    if (!form.asunto.trim()) next.asunto = "Escribe un asunto.";
    if (!form.objeto.trim())
      next.objeto = "Describe el objeto de tu solicitud.";
    if (!form.hechos.trim())
      next.hechos = "Describe los hechos y razones de tu solicitud.";

    if (!form.aceptaTratamiento)
      next.aceptaTratamiento = "Debes autorizar el tratamiento de datos personales.";
    if (!form.aceptaRespuestaCorreo)
      next.aceptaRespuestaCorreo =
        "Debes aceptar recibir la respuesta por correo electrónico.";
    if (!form.aceptaVeracidad)
      next.aceptaVeracidad = "Debes declarar que la información es veraz.";

    return next;
  }

  function focusFirstError(nextErrors: Record<string, string>) {
    const firstKey = Object.keys(nextErrors)[0];
    if (!firstKey) return;
    const node = fieldRefs.current[firstKey];
    node?.focus();
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleReview(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setShowReview(false);
      focusFirstError(nextErrors);
      return;
    }

    setShowReview(true);
    requestAnimationFrame(() => {
      reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const solicitanteResumen = useMemo(() => {
    if (form.tipoSolicitante === "juridica") {
      return `${form.razonSocial || "—"} (NIT ${maskDocument(form.nit)}) · Representante: ${form.repNombres} ${form.repApellidos}`.trim();
    }
    if (form.tipoSolicitante === "apoderado") {
      const representado =
        form.representadoTipo === "natural"
          ? `${form.nombres} ${form.apellidos}`.trim()
          : `${form.razonSocial} (NIT ${maskDocument(form.nit)})`;
      return `${representado} · Apoderado: ${form.apoderadoNombres} ${form.apoderadoApellidos}`;
    }
    return `${form.nombres} ${form.apellidos}`.trim();
  }, [form]);

  const documentoResumen =
    form.tipoSolicitante === "apoderado"
      ? maskDocument(form.apoderadoNumeroDocumento)
      : form.tipoSolicitante === "juridica"
        ? maskDocument(form.repNumeroDocumento)
        : maskDocument(form.numeroDocumento);

  const asuntoCounterId = useId();
  const objetoCounterId = useId();
  const hechosCounterId = useId();

  return (
    <>
      <header className="relative overflow-hidden border-b border-border bg-muted/30 pb-14 pt-32 sm:pb-16 sm:pt-36">
        <div
          className="mesh-gradient absolute inset-0 opacity-80"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/legal/pqrs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a la página informativa de PQRS
          </Link>

          <span className="mt-6 block text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            PQRS
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Radicación de PQRS
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Registra tu petición, queja, reclamo o sugerencia
          </p>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Dirigido a</p>
              <p className="text-lg font-bold text-card-foreground">
                {site.legalName}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary">
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
              La respuesta se enviará exclusivamente por correo electrónico.
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <form onSubmit={handleReview} noValidate className="space-y-8">
          {/* A. Tipo de solicitud */}
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <legend className="px-1 text-lg font-bold text-card-foreground">
              Tipo de solicitud
            </legend>
            <label className="mt-4 block text-sm font-semibold text-card-foreground">
              Selecciona una opción
              <select
                ref={(el) => {
                  fieldRefs.current.tipoSolicitud = el;
                }}
                className={cn(
                  fieldClassName,
                  errors.tipoSolicitud && errorFieldClassName
                )}
                value={form.tipoSolicitud}
                onChange={(event) => update("tipoSolicitud", event.target.value)}
                aria-invalid={Boolean(errors.tipoSolicitud)}
                aria-describedby={
                  errors.tipoSolicitud ? "tipoSolicitud-error" : undefined
                }
              >
                {requestTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <FieldError id="tipoSolicitud-error" message={errors.tipoSolicitud} />
          </fieldset>

          {/* B. Tipo de solicitante y datos condicionales */}
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <legend className="px-1 text-lg font-bold text-card-foreground">
              Tipo de solicitante
            </legend>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(
                [
                  { value: "natural", label: "Persona natural" },
                  { value: "juridica", label: "Persona jurídica" },
                  { value: "apoderado", label: "Apoderado o representante" },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors",
                    form.tipoSolicitante === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40"
                  )}
                >
                  <input
                    type="radio"
                    name="tipoSolicitante"
                    value={option.value}
                    checked={form.tipoSolicitante === option.value}
                    onChange={() => update("tipoSolicitante", option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {form.tipoSolicitante === "natural" && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Nombres
                  <input
                    ref={(el) => {
                      fieldRefs.current.nombres = el;
                    }}
                    className={cn(fieldClassName, errors.nombres && errorFieldClassName)}
                    type="text"
                    value={form.nombres}
                    onChange={(e) => update("nombres", e.target.value)}
                    aria-invalid={Boolean(errors.nombres)}
                  />
                  <FieldError id="nombres-error" message={errors.nombres} />
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Apellidos
                  <input
                    ref={(el) => {
                      fieldRefs.current.apellidos = el;
                    }}
                    className={cn(fieldClassName, errors.apellidos && errorFieldClassName)}
                    type="text"
                    value={form.apellidos}
                    onChange={(e) => update("apellidos", e.target.value)}
                    aria-invalid={Boolean(errors.apellidos)}
                  />
                  <FieldError id="apellidos-error" message={errors.apellidos} />
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Tipo de documento
                  <select
                    className={fieldClassName}
                    value={form.tipoDocumento}
                    onChange={(e) => update("tipoDocumento", e.target.value)}
                  >
                    {PQRS_DOCUMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Número de documento
                  <input
                    ref={(el) => {
                      fieldRefs.current.numeroDocumento = el;
                    }}
                    className={cn(
                      fieldClassName,
                      errors.numeroDocumento && errorFieldClassName
                    )}
                    type="text"
                    inputMode="numeric"
                    value={form.numeroDocumento}
                    onChange={(e) => update("numeroDocumento", e.target.value)}
                    aria-invalid={Boolean(errors.numeroDocumento)}
                  />
                  <FieldError
                    id="numeroDocumento-error"
                    message={errors.numeroDocumento}
                  />
                </label>
              </div>
            )}

            {form.tipoSolicitante === "juridica" && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Razón social
                  <input
                    ref={(el) => {
                      fieldRefs.current.razonSocial = el;
                    }}
                    className={cn(
                      fieldClassName,
                      errors.razonSocial && errorFieldClassName
                    )}
                    type="text"
                    value={form.razonSocial}
                    onChange={(e) => update("razonSocial", e.target.value)}
                    aria-invalid={Boolean(errors.razonSocial)}
                  />
                  <FieldError id="razonSocial-error" message={errors.razonSocial} />
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  NIT
                  <input
                    ref={(el) => {
                      fieldRefs.current.nit = el;
                    }}
                    className={cn(fieldClassName, errors.nit && errorFieldClassName)}
                    type="text"
                    inputMode="numeric"
                    value={form.nit}
                    onChange={(e) => update("nit", e.target.value)}
                    aria-invalid={Boolean(errors.nit)}
                  />
                  <FieldError id="nit-error" message={errors.nit} />
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Nombres del representante
                  <input
                    ref={(el) => {
                      fieldRefs.current.repNombres = el;
                    }}
                    className={cn(
                      fieldClassName,
                      errors.repNombres && errorFieldClassName
                    )}
                    type="text"
                    value={form.repNombres}
                    onChange={(e) => update("repNombres", e.target.value)}
                    aria-invalid={Boolean(errors.repNombres)}
                  />
                  <FieldError id="repNombres-error" message={errors.repNombres} />
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Apellidos del representante
                  <input
                    ref={(el) => {
                      fieldRefs.current.repApellidos = el;
                    }}
                    className={cn(
                      fieldClassName,
                      errors.repApellidos && errorFieldClassName
                    )}
                    type="text"
                    value={form.repApellidos}
                    onChange={(e) => update("repApellidos", e.target.value)}
                    aria-invalid={Boolean(errors.repApellidos)}
                  />
                  <FieldError
                    id="repApellidos-error"
                    message={errors.repApellidos}
                  />
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Tipo de documento del representante
                  <select
                    className={fieldClassName}
                    value={form.repTipoDocumento}
                    onChange={(e) => update("repTipoDocumento", e.target.value)}
                  >
                    {PQRS_DOCUMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-card-foreground">
                  Número de documento del representante
                  <input
                    ref={(el) => {
                      fieldRefs.current.repNumeroDocumento = el;
                    }}
                    className={cn(
                      fieldClassName,
                      errors.repNumeroDocumento && errorFieldClassName
                    )}
                    type="text"
                    inputMode="numeric"
                    value={form.repNumeroDocumento}
                    onChange={(e) => update("repNumeroDocumento", e.target.value)}
                    aria-invalid={Boolean(errors.repNumeroDocumento)}
                  />
                  <FieldError
                    id="repNumeroDocumento-error"
                    message={errors.repNumeroDocumento}
                  />
                </label>
              </div>
            )}

            {form.tipoSolicitante === "apoderado" && (
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    Datos de la persona representada
                  </p>
                  <div className="mt-3 flex gap-3">
                    {(
                      [
                        { value: "natural", label: "Persona natural" },
                        { value: "juridica", label: "Persona jurídica" },
                      ] as const
                    ).map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors",
                          form.representadoTipo === option.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-foreground hover:border-primary/40"
                        )}
                      >
                        <input
                          type="radio"
                          name="representadoTipo"
                          value={option.value}
                          checked={form.representadoTipo === option.value}
                          onChange={() =>
                            update("representadoTipo", option.value)
                          }
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>

                  {form.representadoTipo === "natural" ? (
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <label className="text-sm font-semibold text-card-foreground">
                        Nombres
                        <input
                          ref={(el) => {
                            fieldRefs.current.nombres = el;
                          }}
                          className={cn(
                            fieldClassName,
                            errors.nombres && errorFieldClassName
                          )}
                          type="text"
                          value={form.nombres}
                          onChange={(e) => update("nombres", e.target.value)}
                          aria-invalid={Boolean(errors.nombres)}
                        />
                        <FieldError id="nombres-error" message={errors.nombres} />
                      </label>
                      <label className="text-sm font-semibold text-card-foreground">
                        Apellidos
                        <input
                          ref={(el) => {
                            fieldRefs.current.apellidos = el;
                          }}
                          className={cn(
                            fieldClassName,
                            errors.apellidos && errorFieldClassName
                          )}
                          type="text"
                          value={form.apellidos}
                          onChange={(e) => update("apellidos", e.target.value)}
                          aria-invalid={Boolean(errors.apellidos)}
                        />
                        <FieldError
                          id="apellidos-error"
                          message={errors.apellidos}
                        />
                      </label>
                      <label className="text-sm font-semibold text-card-foreground sm:col-span-2">
                        Número de documento
                        <input
                          ref={(el) => {
                            fieldRefs.current.numeroDocumento = el;
                          }}
                          className={cn(
                            fieldClassName,
                            errors.numeroDocumento && errorFieldClassName
                          )}
                          type="text"
                          inputMode="numeric"
                          value={form.numeroDocumento}
                          onChange={(e) =>
                            update("numeroDocumento", e.target.value)
                          }
                          aria-invalid={Boolean(errors.numeroDocumento)}
                        />
                        <FieldError
                          id="numeroDocumento-error"
                          message={errors.numeroDocumento}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <label className="text-sm font-semibold text-card-foreground">
                        Razón social
                        <input
                          ref={(el) => {
                            fieldRefs.current.razonSocial = el;
                          }}
                          className={cn(
                            fieldClassName,
                            errors.razonSocial && errorFieldClassName
                          )}
                          type="text"
                          value={form.razonSocial}
                          onChange={(e) => update("razonSocial", e.target.value)}
                          aria-invalid={Boolean(errors.razonSocial)}
                        />
                        <FieldError
                          id="razonSocial-error"
                          message={errors.razonSocial}
                        />
                      </label>
                      <label className="text-sm font-semibold text-card-foreground">
                        NIT
                        <input
                          ref={(el) => {
                            fieldRefs.current.nit = el;
                          }}
                          className={cn(
                            fieldClassName,
                            errors.nit && errorFieldClassName
                          )}
                          type="text"
                          inputMode="numeric"
                          value={form.nit}
                          onChange={(e) => update("nit", e.target.value)}
                          aria-invalid={Boolean(errors.nit)}
                        />
                        <FieldError id="nit-error" message={errors.nit} />
                      </label>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm font-semibold text-card-foreground">
                    Datos del apoderado o representante
                  </p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-card-foreground">
                      Nombres
                      <input
                        ref={(el) => {
                          fieldRefs.current.apoderadoNombres = el;
                        }}
                        className={cn(
                          fieldClassName,
                          errors.apoderadoNombres && errorFieldClassName
                        )}
                        type="text"
                        value={form.apoderadoNombres}
                        onChange={(e) =>
                          update("apoderadoNombres", e.target.value)
                        }
                        aria-invalid={Boolean(errors.apoderadoNombres)}
                      />
                      <FieldError
                        id="apoderadoNombres-error"
                        message={errors.apoderadoNombres}
                      />
                    </label>
                    <label className="text-sm font-semibold text-card-foreground">
                      Apellidos
                      <input
                        ref={(el) => {
                          fieldRefs.current.apoderadoApellidos = el;
                        }}
                        className={cn(
                          fieldClassName,
                          errors.apoderadoApellidos && errorFieldClassName
                        )}
                        type="text"
                        value={form.apoderadoApellidos}
                        onChange={(e) =>
                          update("apoderadoApellidos", e.target.value)
                        }
                        aria-invalid={Boolean(errors.apoderadoApellidos)}
                      />
                      <FieldError
                        id="apoderadoApellidos-error"
                        message={errors.apoderadoApellidos}
                      />
                    </label>
                    <label className="text-sm font-semibold text-card-foreground">
                      Tipo de documento
                      <select
                        className={fieldClassName}
                        value={form.apoderadoTipoDocumento}
                        onChange={(e) =>
                          update("apoderadoTipoDocumento", e.target.value)
                        }
                      >
                        {PQRS_DOCUMENT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm font-semibold text-card-foreground">
                      Número de documento
                      <input
                        ref={(el) => {
                          fieldRefs.current.apoderadoNumeroDocumento = el;
                        }}
                        className={cn(
                          fieldClassName,
                          errors.apoderadoNumeroDocumento && errorFieldClassName
                        )}
                        type="text"
                        inputMode="numeric"
                        value={form.apoderadoNumeroDocumento}
                        onChange={(e) =>
                          update("apoderadoNumeroDocumento", e.target.value)
                        }
                        aria-invalid={Boolean(errors.apoderadoNumeroDocumento)}
                      />
                      <FieldError
                        id="apoderadoNumeroDocumento-error"
                        message={errors.apoderadoNumeroDocumento}
                      />
                    </label>
                  </div>

                  <label className="mt-5 block text-sm font-semibold text-card-foreground">
                    Documento que acredita la representación (opcional)
                    <input
                      className={cn(fieldClassName, "min-h-14 cursor-pointer p-2")}
                      type="file"
                      accept={PQRS_ATTACHMENT_RULES.acceptAttribute}
                      onChange={(e) =>
                        setRepresentationProof(e.target.files?.[0] ?? null)
                      }
                    />
                  </label>
                  {representationProof && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Paperclip className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {representationProof.name} (
                      {formatBytes(representationProof.size)})
                    </p>
                  )}
                </div>
              </div>
            )}
          </fieldset>

          {/* C. Datos de contacto */}
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <legend className="px-1 text-lg font-bold text-card-foreground">
              Datos de contacto
            </legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-card-foreground">
                Correo electrónico
                <input
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  className={cn(fieldClassName, errors.email && errorFieldClassName)}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                <FieldError id="email-error" message={errors.email} />
              </label>
              <label className="text-sm font-semibold text-card-foreground">
                Confirmar correo electrónico
                <input
                  ref={(el) => {
                    fieldRefs.current.emailConfirm = el;
                  }}
                  className={cn(
                    fieldClassName,
                    errors.emailConfirm && errorFieldClassName
                  )}
                  type="email"
                  inputMode="email"
                  value={form.emailConfirm}
                  onChange={(e) => update("emailConfirm", e.target.value)}
                  aria-invalid={Boolean(errors.emailConfirm)}
                />
                <FieldError id="emailConfirm-error" message={errors.emailConfirm} />
              </label>
              <label className="text-sm font-semibold text-card-foreground sm:col-span-2">
                Número telefónico (opcional, dato complementario)
                <input
                  className={fieldClassName}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.telefono}
                  onChange={(e) => update("telefono", e.target.value)}
                />
              </label>
            </div>
            <p className="mt-5 flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
              <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
              Medio de respuesta: correo electrónico
            </p>
          </fieldset>

          {/* E. Contenido de la solicitud */}
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <legend className="px-1 text-lg font-bold text-card-foreground">
              Contenido de la solicitud
            </legend>

            <label className="mt-4 block text-sm font-semibold text-card-foreground">
              Asunto
              <input
                ref={(el) => {
                  fieldRefs.current.asunto = el;
                }}
                className={cn(fieldClassName, errors.asunto && errorFieldClassName)}
                type="text"
                maxLength={150}
                value={form.asunto}
                onChange={(e) => update("asunto", e.target.value)}
                aria-invalid={Boolean(errors.asunto)}
                aria-describedby={asuntoCounterId}
              />
              <span
                id={asuntoCounterId}
                className="mt-1 block text-right text-xs text-muted-foreground"
              >
                {form.asunto.length}/150
              </span>
              <FieldError id="asunto-error" message={errors.asunto} />
            </label>

            <label className="mt-4 block text-sm font-semibold text-card-foreground">
              Objeto de la solicitud
              <textarea
                ref={(el) => {
                  fieldRefs.current.objeto = el;
                }}
                className={cn(
                  fieldClassName,
                  "min-h-28 resize-y",
                  errors.objeto && errorFieldClassName
                )}
                maxLength={2000}
                placeholder="Explica claramente lo que esperas de la empresa."
                value={form.objeto}
                onChange={(e) => update("objeto", e.target.value)}
                aria-invalid={Boolean(errors.objeto)}
                aria-describedby={objetoCounterId}
              />
              <span
                id={objetoCounterId}
                className="mt-1 block text-right text-xs text-muted-foreground"
              >
                {form.objeto.length}/2000
              </span>
              <FieldError id="objeto-error" message={errors.objeto} />
            </label>

            <label className="mt-4 block text-sm font-semibold text-card-foreground">
              Hechos y razones
              <textarea
                ref={(el) => {
                  fieldRefs.current.hechos = el;
                }}
                className={cn(
                  fieldClassName,
                  "min-h-40 resize-y",
                  errors.hechos && errorFieldClassName
                )}
                maxLength={4000}
                placeholder="Describe los hechos, antecedentes y motivos que sustentan tu solicitud."
                value={form.hechos}
                onChange={(e) => update("hechos", e.target.value)}
                aria-invalid={Boolean(errors.hechos)}
                aria-describedby={hechosCounterId}
              />
              <span
                id={hechosCounterId}
                className="mt-1 block text-right text-xs text-muted-foreground"
              >
                {form.hechos.length}/4000
              </span>
              <FieldError id="hechos-error" message={errors.hechos} />
            </label>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Describe los hechos de forma clara, cronológica y evita incluir
              información sensible que no sea necesaria para resolver la
              solicitud.
            </p>
          </fieldset>

          {/* F. Documentos anexos */}
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <legend className="px-1 text-lg font-bold text-card-foreground">
              Documentos anexos
            </legend>

            <label
              className="mt-4 flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface p-6 text-center transition-colors hover:border-primary/40"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesSelected(e.dataTransfer.files);
              }}
            >
              <FileUp className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-foreground">
                Arrastra tus archivos aquí o haz clic para seleccionarlos
              </span>
              <span className="text-xs text-muted-foreground">
                {PQRS_ATTACHMENT_RULES.acceptedExtensions.join(", ")} · máx.{" "}
                {formatBytes(PQRS_ATTACHMENT_RULES.maxFileSizeBytes)} por
                archivo · hasta {PQRS_ATTACHMENT_RULES.maxFiles} archivos
              </span>
              <input
                type="file"
                multiple
                accept={PQRS_ATTACHMENT_RULES.acceptAttribute}
                className="sr-only"
                onChange={(e) => handleFilesSelected(e.target.files)}
              />
            </label>

            {attachmentError && (
              <p
                role="alert"
                className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-destructive"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {attachmentError}
              </p>
            )}

            {attachments.length > 0 && (
              <ul className="mt-4 space-y-2">
                {attachments.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Paperclip
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate font-medium text-foreground">
                        {file.name}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatBytes(file.size)}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      aria-label={`Quitar ${file.name}`}
                      className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {isDevelopment && (
              <p className="mt-3 text-xs font-semibold text-muted-foreground">
                Entorno de desarrollo: los archivos permanecen únicamente en tu
                dispositivo; no existe almacenamiento conectado.
              </p>
            )}
          </fieldset>

          {/* Términos generales (referencia, pendiente de revisión jurídica) */}
          <aside className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p>{PQRS_RESPONSE_TERMS_NOTE}</p>
          </aside>

          {/* G. Autorizaciones y declaraciones */}
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <legend className="px-1 text-lg font-bold text-card-foreground">
              Autorizaciones y declaraciones
            </legend>

            <div className="mt-4 space-y-4">
              <label
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
                  errors.aceptaTratamiento
                    ? "border-destructive"
                    : "border-border"
                )}
              >
                <input
                  ref={(el) => {
                    fieldRefs.current.aceptaTratamiento = el;
                  }}
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={form.aceptaTratamiento}
                  onChange={(e) => update("aceptaTratamiento", e.target.checked)}
                  aria-invalid={Boolean(errors.aceptaTratamiento)}
                />
                <span>
                  Autorizo de manera previa, expresa e informada el tratamiento
                  de mis datos personales por parte de {site.legalName} para
                  la recepción, gestión, respuesta y seguimiento de esta
                  solicitud, de acuerdo con la{" "}
                  <Link
                    href="/legal/tratamiento-de-datos"
                    className="font-semibold text-primary underline decoration-primary/40 hover:text-primary/80"
                  >
                    Política de Tratamiento de Datos Personales
                  </Link>
                  , que declaro haber leído. Esta autorización no cubre
                  finalidades comerciales adicionales.
                  <FieldError
                    id="aceptaTratamiento-error"
                    message={errors.aceptaTratamiento}
                  />
                </span>
              </label>

              <label
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
                  errors.aceptaRespuestaCorreo
                    ? "border-destructive"
                    : "border-border"
                )}
              >
                <input
                  ref={(el) => {
                    fieldRefs.current.aceptaRespuestaCorreo = el;
                  }}
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={form.aceptaRespuestaCorreo}
                  onChange={(e) =>
                    update("aceptaRespuestaCorreo", e.target.checked)
                  }
                  aria-invalid={Boolean(errors.aceptaRespuestaCorreo)}
                />
                <span>
                  Acepto recibir requerimientos, comunicaciones y respuesta
                  exclusivamente en el correo electrónico registrado.
                  <FieldError
                    id="aceptaRespuestaCorreo-error"
                    message={errors.aceptaRespuestaCorreo}
                  />
                </span>
              </label>

              <label
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
                  errors.aceptaVeracidad ? "border-destructive" : "border-border"
                )}
              >
                <input
                  ref={(el) => {
                    fieldRefs.current.aceptaVeracidad = el;
                  }}
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={form.aceptaVeracidad}
                  onChange={(e) => update("aceptaVeracidad", e.target.checked)}
                  aria-invalid={Boolean(errors.aceptaVeracidad)}
                />
                <span>
                  Declaro que la información suministrada es clara y veraz, y
                  que los documentos anexados corresponden a la solicitud
                  presentada.
                  <FieldError
                    id="aceptaVeracidad-error"
                    message={errors.aceptaVeracidad}
                  />
                </span>
              </label>
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-6 py-3 font-semibold text-primary-foreground transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none"
            >
              Revisar antes de enviar
            </button>
          </div>
        </form>

        {/* Revisión final */}
        {showReview && (
          <div
            ref={reviewRef}
            className="mt-10 scroll-mt-28 rounded-3xl border border-primary/30 bg-primary/5 p-6 shadow-card sm:p-8"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-bold text-foreground">
                Revisa tu solicitud antes de radicarla
              </h2>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Tipo de solicitud
                </dt>
                <dd className="mt-1 text-foreground">{form.tipoSolicitud}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Solicitante
                </dt>
                <dd className="mt-1 text-foreground">{solicitanteResumen}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Documento
                </dt>
                <dd className="mt-1 text-foreground">{documentoResumen}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Correo de respuesta
                </dt>
                <dd className="mt-1 text-foreground">{form.email}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Asunto
                </dt>
                <dd className="mt-1 text-foreground">{form.asunto}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Objeto de la solicitud
                </dt>
                <dd className="mt-1 whitespace-pre-line text-foreground">
                  {form.objeto}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Hechos y razones
                </dt>
                <dd className="mt-1 whitespace-pre-line text-foreground">
                  {form.hechos}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Documentos anexos
                </dt>
                <dd className="mt-1 text-foreground">
                  {attachments.length > 0
                    ? attachments.map((f) => f.name).join(", ")
                    : "Ninguno"}
                  {representationProof
                    ? ` · Acreditación de representación: ${representationProof.name}`
                    : ""}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Autorizaciones aceptadas
                </dt>
                <dd className="mt-1 text-foreground">
                  Tratamiento de datos, respuesta por correo electrónico y
                  declaración de veracidad.
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Corregir información
              </button>
              <button
                type="button"
                disabled={!site.pqrs.filing.backendAvailable}
                className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Radicar solicitud
              </button>
            </div>

            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <ShieldAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              Canal de envío en preparación: el formulario está listo, pero
              todavía no existe una integración real (correo, base de datos o
              sistema documental) para radicar solicitudes. Ninguna
              información se transmite ni se almacena al continuar.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
