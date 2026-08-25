import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import type { SiteConfig } from "../config/types";

// Next normally loads environment files from the individual app directory.
// This monorepo keeps the shared secret in the repository root, so resolve
// both layouts before the first request is handled. The value is never logged
// or exposed to the browser.
const environmentRoots = [
  process.cwd(),
  path.resolve(process.cwd(), ".."),
  path.resolve(process.cwd(), "../.."),
];
for (const root of environmentRoots) {
  const hasEnvironmentFile = [
    ".env",
    ".env.local",
    ".env.development",
    ".env.development.local",
  ].some((fileName) => existsSync(path.join(root, fileName)));
  if (hasEnvironmentFile) {
    loadEnvConfig(root);
  }
}

export type FormSiteId = SiteConfig["id"];

type FormKind = "contact" | "careers" | "pqrs";

type ResendAttachment = {
  filename: string;
  content: string;
  content_id?: string;
  content_type?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT_LENGTH = 5000;
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 25 * 1024 * 1024;
const MAX_PQRS_FILES = 6;
const ALLOWED_RESUME_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_PQRS_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
]);
const PQRS_REQUEST_TYPES = new Set([
  "Peticiones",
  "Quejas",
  "Reclamos",
  "Sugerencias",
]);
const PQRS_APPLICANT_TYPES = new Set(["natural", "juridica", "apoderado"]);
const PQRS_PERSON_TYPES = new Set(["natural", "juridica"]);
const PQRS_DOCUMENT_TYPES = new Set([
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Pasaporte",
  "Permiso especial de permanencia",
  "Otro",
]);
const PERSON_NAME_PATTERN = /^[\p{L}][\p{L}\s.'-]*$/u;
const DIGITS_PATTERN = /^\d+$/;

class FormRequestError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "FormRequestError";
    this.status = status;
  }
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function text(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function required(value: string, label: string, max = MAX_TEXT_LENGTH) {
  if (!value) throw new FormRequestError(`El campo ${label} es obligatorio.`);
  if (value.length > max)
    throw new FormRequestError(`El campo ${label} supera el límite permitido.`);
  return value;
}

function validEmail(value: string, label = "correo electrónico") {
  if (!EMAIL_PATTERN.test(value)) {
    throw new FormRequestError(`El ${label} no es válido.`);
  }
  return value;
}

function validChoice(value: string, values: ReadonlySet<string>, label: string) {
  if (!values.has(value)) {
    throw new FormRequestError(`El campo ${label} no tiene una opción válida.`);
  }
  return value;
}

function validDigits(value: string, label: string, max = 30) {
  const normalized = required(value, label, max);
  if (!DIGITS_PATTERN.test(normalized)) {
    throw new FormRequestError(`El campo ${label} solo puede contener números.`);
  }
  return normalized;
}

function validPersonName(value: string, label: string) {
  const normalized = required(value, label, 120);
  if (!PERSON_NAME_PATTERN.test(normalized)) {
    throw new FormRequestError(
      `El campo ${label} solo puede contener letras, espacios, apóstrofes, puntos o guiones.`
    );
  }
  return normalized;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  );
}

type EmailField = readonly [label: string, value: string];

type EmailSection = {
  title: string;
  fields?: readonly EmailField[];
  content?: string;
};

function getEmailBrand(site: FormSiteId) {
  return site === "la-nieve"
    ? {
        name: "Distribuciones La Nieve",
        color: "#27348a",
        logoFile: "logo-white-v2.png",
      }
    : { name: "Unimarka", color: "#bd202d", logoFile: "logo-white.png" };
}

function getLogoPath(site: FormSiteId) {
  const { logoFile } = getEmailBrand(site);
  const appDirectory = site === "la-nieve" ? "la-nieve" : "unimarka";
  const candidates = [
    path.resolve(process.cwd(), "public", "brand", logoFile),
    path.resolve(
      process.cwd(),
      "apps",
      appDirectory,
      "public",
      "brand",
      logoFile
    ),
    path.resolve(process.cwd(), "..", appDirectory, "public", "brand", logoFile),
    path.resolve(
      process.cwd(),
      "..",
      "..",
      "apps",
      appDirectory,
      "public",
      "brand",
      logoFile
    ),
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

function getLogoAttachment(site: FormSiteId): ResendAttachment | undefined {
  const logoPath = getLogoPath(site);
  if (!logoPath) return undefined;

  return {
    filename: getEmailBrand(site).logoFile,
    content: readFileSync(logoPath).toString("base64"),
    content_id: "company-logo",
    content_type: "image/png",
  };
}

function renderEmailFields(fields: readonly EmailField[]) {
  const visibleFields = fields.filter(([, value]) => value.trim());
  if (visibleFields.length === 0) return "";

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${visibleFields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 0;border-bottom:1px solid #e5e7eb;vertical-align:top;width:38%;color:#64748b;font-size:13px;line-height:20px">${escapeHtml(label)}</td><td style="padding:9px 0 9px 16px;border-bottom:1px solid #e5e7eb;vertical-align:top;color:#172033;font-size:14px;line-height:21px;white-space:pre-line;word-break:break-word">${escapeHtml(value)}</td></tr>`
    )
    .join("")}</table>`;
}

function renderEmailSection(section: EmailSection) {
  const content = section.content
    ? `<div style="margin-top:12px;padding:16px 18px;border-radius:10px;background:#f8fafc;color:#172033;font-size:15px;line-height:24px;white-space:pre-line;word-break:break-word">${escapeHtml(section.content)}</div>`
    : "";
  const fields = section.fields?.length
    ? `<div style="margin-top:10px">${renderEmailFields(section.fields)}</div>`
    : "";

  return `<tr><td style="padding:0 32px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;border-collapse:separate"><tr><td style="padding:18px 20px"><h2 style="margin:0;color:#172033;font-size:16px;line-height:22px;font-weight:700">${escapeHtml(section.title)}</h2>${fields}${content}</td></tr></table></td></tr>`;
}

function renderEmail(options: {
  site: FormSiteId;
  eyebrow: string;
  title: string;
  intro: string;
  summaryLabel: string;
  summary: string;
  sections: readonly EmailSection[];
  footerNote: string;
}) {
  const brand = getEmailBrand(options.site);
  const logo = getLogoPath(options.site)
    ? `<img src="cid:company-logo" alt="${escapeHtml(brand.name)}" width="190" style="display:block;width:190px;max-width:100%;height:auto;margin:0 0 17px">`
    : "";
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#172033"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f1f5f9"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;border-collapse:separate;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;background:#ffffff"><tr><td style="padding:26px 32px;background:${brand.color};color:#ffffff">${logo}<p style="margin:0;font-size:14px;line-height:20px;font-weight:700;letter-spacing:.04em">${escapeHtml(brand.name)}</p><p style="margin:5px 0 0;font-size:12px;line-height:18px;opacity:.88">Comunicación recibida desde el sitio web</p></td></tr><tr><td style="padding:30px 32px 18px"><p style="margin:0;color:${brand.color};font-size:12px;line-height:18px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(options.eyebrow)}</p><h1 style="margin:8px 0 0;color:#172033;font-size:25px;line-height:33px;font-weight:700">${escapeHtml(options.title)}</h1><p style="margin:12px 0 0;color:#475569;font-size:15px;line-height:23px">${escapeHtml(options.intro)}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;border-collapse:separate;border-left:4px solid ${brand.color};background:#f8fafc"><tr><td style="padding:13px 16px"><p style="margin:0;color:#64748b;font-size:11px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">${escapeHtml(options.summaryLabel)}</p><p style="margin:4px 0 0;color:#172033;font-size:16px;line-height:22px;font-weight:700">${escapeHtml(options.summary)}</p></td></tr></table></td></tr>${options.sections.map(renderEmailSection).join("")}<tr><td style="padding:4px 32px 28px"><p style="margin:0;padding-top:18px;border-top:1px solid #e5e7eb;color:#64748b;font-size:12px;line-height:19px">${escapeHtml(options.footerNote)}</p></td></tr></table></td></tr></table></body></html>`;
}

function getRecipient(kind: FormKind, site: FormSiteId) {
  const siteKey = site === "la-nieve" ? "LA_NIEVE" : "UNIMARKA";
  const kindKey = kind.toUpperCase();
  return (
    process.env[`RESEND_${kindKey}_TO_${siteKey}`]?.trim() ||
    process.env.RESEND_TEST_RECIPIENT?.trim() ||
    "datalab6@lanieve.co"
  );
}

function getSender(site: FormSiteId) {
  const email = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const name =
    process.env.RESEND_FROM_NAME?.trim() ||
    (site === "la-nieve" ? "Distribuciones La Nieve" : "Unimarka");
  return `${name} <${email}>`;
}

async function fileToAttachment(file: File, allowedExtensions: Set<string>) {
  if (!file.name || file.size === 0) {
    throw new FormRequestError("El archivo adjunto está vacío o no es válido.");
  }
  if (file.size > MAX_ATTACHMENT_BYTES) {
    throw new FormRequestError(
      `El archivo ${file.name} supera el tamaño máximo de 10 MB.`
    );
  }
  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  if (!allowedExtensions.has(extension)) {
    throw new FormRequestError(`El formato del archivo ${file.name} no está permitido.`);
  }
  const content = Buffer.from(await file.arrayBuffer()).toString("base64");
  return { filename: file.name, content } satisfies ResendAttachment;
}

async function sendWithResend(options: {
  site: FormSiteId;
  kind: FormKind;
  subject: string;
  replyTo?: string;
  html: string;
  attachments?: readonly ResendAttachment[];
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("Resend no está configurado: falta RESEND_API_KEY.");
    throw new FormRequestError("El servicio de envío no está configurado.", 503);
  }

  const payload: Record<string, unknown> = {
    from: getSender(options.site),
    to: [getRecipient(options.kind, options.site)],
    subject: options.subject,
    html: options.html,
  };
  if (options.replyTo) payload.reply_to = options.replyTo;
  const logoAttachment = getLogoAttachment(options.site);
  const attachments = [
    ...(logoAttachment ? [logoAttachment] : []),
    ...(options.attachments ?? []),
  ];
  if (attachments.length) payload.attachments = attachments;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend rechazó el envío", response.status, errorText.slice(0, 500));
    throw new FormRequestError("No fue posible enviar la solicitud. Intenta de nuevo.", 502);
  }
}

function getJsonPayload(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new FormRequestError("El cuerpo de la solicitud no es válido.");
  }
  return value as Record<string, unknown>;
}

function jsonText(payload: Record<string, unknown>, key: string) {
  return typeof payload[key] === "string" ? String(payload[key]).trim() : "";
}

/**
 * Verifies Turnstile on the server. In development, an absent secret keeps
 * local form work convenient; in production it is treated as a configuration
 * error so the public endpoints cannot silently run without anti-bot checks.
 */
async function verifyTurnstile(request: Request, token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new FormRequestError(
        "El servicio de verificación no está configurado.",
        503
      );
    }
    return;
  }

  if (!token) {
    throw new FormRequestError(
      "Completa la verificación de seguridad antes de enviar el formulario."
    );
  }

  const remoteIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
      }
    );
  } catch (error) {
    console.error("Turnstile no respondió", error);
    throw new FormRequestError(
      "No fue posible validar la seguridad del formulario. Intenta de nuevo.",
      503
    );
  }

  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
  } | null;
  if (!response.ok || !result?.success) {
    throw new FormRequestError(
      "La verificación de seguridad expiró o no es válida. Intenta de nuevo."
    );
  }
}

export async function handleContactRequest(request: Request, site: FormSiteId) {
  try {
    const payload = getJsonPayload(await request.json());
    if (jsonText(payload, "website")) return jsonResponse({ ok: true });
    await verifyTurnstile(request, jsonText(payload, "turnstileToken"));

    const name = required(jsonText(payload, "name"), "nombre");
    const email = validEmail(required(jsonText(payload, "email"), "correo electrónico"));
    const phone = jsonText(payload, "phone").replace(/\D/g, "");
    const company = jsonText(payload, "company");
    const subject = required(jsonText(payload, "subject"), "asunto", 100);
    const message = required(jsonText(payload, "message"), "mensaje");
    const subjectLabel =
      ({
        commercial: "Consulta comercial",
        general: "Información general",
        other: "Otro motivo",
      } as Record<string, string>)[subject] || subject;

    await sendWithResend({
      site,
      kind: "contact",
      subject: `[Contacto] ${subjectLabel} — ${name}`,
      replyTo: email,
      html: renderEmail({
        site,
        eyebrow: "Nuevo contacto",
        title: `${name} quiere ponerse en contacto`,
        intro: `Se recibió una consulta desde el sitio web de ${getEmailBrand(site).name}.`,
        summaryLabel: "Motivo de contacto",
        summary: subjectLabel,
        sections: [
          {
            title: "Información de contacto",
            fields: [
              ["Nombre", name],
              ["Correo electrónico", email],
              ["Teléfono", phone],
              ["Empresa o establecimiento", company],
            ],
          },
          { title: "Mensaje recibido", content: message },
        ],
        footerNote:
          "Puedes responder directamente a este correo para contactar a la persona que diligenció el formulario.",
      }),
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}

export async function handleCareersRequest(request: Request, site: FormSiteId) {
  try {
    const form = await request.formData();
    if (text(form.get("website"))) return jsonResponse({ ok: true });
    await verifyTurnstile(request, text(form.get("turnstileToken")));

    const name = required(text(form.get("name")), "nombre");
    const email = validEmail(required(text(form.get("email")), "correo electrónico"));
    const phone = required(text(form.get("phone")).replace(/\D/g, ""), "teléfono");
    const city = required(text(form.get("city")), "ciudad");
    const area = required(text(form.get("area")), "área de interés", 100);
    const profile = required(text(form.get("profile")), "perfil");
    const accepted = text(form.get("data-policy-acceptance"));
    if (accepted !== "on" && accepted !== "true") {
      throw new FormRequestError("Debes aceptar el tratamiento de datos personales.");
    }

    const resume = form.get("resume");
    if (!(resume instanceof File)) {
      throw new FormRequestError("Adjunta tu hoja de vida.");
    }
    const attachment = await fileToAttachment(resume, ALLOWED_RESUME_EXTENSIONS);

    await sendWithResend({
      site,
      kind: "careers",
      subject: `[Trabaja con nosotros] ${name} — ${area}`,
      replyTo: email,
      attachments: [attachment],
      html: renderEmail({
        site,
        eyebrow: "Trabaja con nosotros",
        title: `${name} envió su perfil laboral`,
        intro: `Se recibió una nueva postulación para el equipo de ${getEmailBrand(site).name}.`,
        summaryLabel: "Área de interés",
        summary: area,
        sections: [
          {
            title: "Datos de la persona postulante",
            fields: [
              ["Nombre", name],
              ["Correo electrónico", email],
              ["Teléfono", phone],
              ["Ciudad", city],
            ],
          },
          { title: "Perfil o experiencia", content: profile },
        ],
        footerNote:
          `La hoja de vida de ${name} se encuentra adjunta a este correo para su revisión.`,
      }),
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}

function formValue(form: FormData, key: string) {
  return text(form.get(key));
}

export async function handlePqrsRequest(request: Request, site: FormSiteId) {
  try {
    const form = await request.formData();
    if (formValue(form, "website")) return jsonResponse({ ok: true });
    await verifyTurnstile(request, formValue(form, "turnstileToken"));

    const email = validEmail(required(formValue(form, "email"), "correo electrónico"));
    const emailConfirm = validEmail(
      required(formValue(form, "emailConfirm"), "confirmación del correo electrónico")
    );
    if (email !== emailConfirm) {
      throw new FormRequestError("Los correos electrónicos no coinciden.");
    }

    const tipoSolicitante = validChoice(
      required(formValue(form, "tipoSolicitante"), "tipo de solicitante", 40),
      PQRS_APPLICANT_TYPES,
      "tipo de solicitante"
    );
    const tipoSolicitud = validChoice(
      required(formValue(form, "tipoSolicitud"), "tipo de solicitud", 100),
      PQRS_REQUEST_TYPES,
      "tipo de solicitud"
    );
    const asunto = required(formValue(form, "asunto"), "asunto", 150);
    const objeto = required(formValue(form, "objeto"), "objeto de la solicitud", 2000);
    const hechos = required(formValue(form, "hechos"), "hechos y razones", 4000);

    if (tipoSolicitante === "natural") {
      validPersonName(formValue(form, "nombres"), "nombres");
      validPersonName(formValue(form, "apellidos"), "apellidos");
      validChoice(
        formValue(form, "tipoDocumento"),
        PQRS_DOCUMENT_TYPES,
        "tipo de documento"
      );
      validDigits(
        formValue(form, "numeroDocumento"),
        "número de documento"
      );
    } else if (tipoSolicitante === "juridica") {
      required(formValue(form, "razonSocial"), "razón social");
      validDigits(formValue(form, "nit"), "NIT");
      validPersonName(
        formValue(form, "repNombres"),
        "nombres del representante"
      );
      validPersonName(
        formValue(form, "repApellidos"),
        "apellidos del representante"
      );
      validChoice(
        formValue(form, "repTipoDocumento"),
        PQRS_DOCUMENT_TYPES,
        "tipo de documento del representante"
      );
      validDigits(
        formValue(form, "repNumeroDocumento"),
        "documento del representante"
      );
    } else if (tipoSolicitante === "apoderado") {
      const representadoTipo = validChoice(
        required(
          formValue(form, "representadoTipo"),
          "tipo de persona representada",
          40
        ),
        PQRS_PERSON_TYPES,
        "tipo de persona representada"
      );
      if (representadoTipo === "natural") {
        validPersonName(
          formValue(form, "nombres"),
          "nombres de la persona representada"
        );
        validPersonName(
          formValue(form, "apellidos"),
          "apellidos de la persona representada"
        );
        validChoice(
          formValue(form, "tipoDocumento"),
          PQRS_DOCUMENT_TYPES,
          "tipo de documento de la persona representada"
        );
        validDigits(
          formValue(form, "numeroDocumento"),
          "documento de la persona representada"
        );
      } else if (representadoTipo === "juridica") {
        required(formValue(form, "razonSocial"), "razón social representada");
        validDigits(formValue(form, "nit"), "NIT representado");
      }
      validPersonName(
        formValue(form, "apoderadoNombres"),
        "nombres del apoderado"
      );
      validPersonName(
        formValue(form, "apoderadoApellidos"),
        "apellidos del apoderado"
      );
      validChoice(
        formValue(form, "apoderadoTipoDocumento"),
        PQRS_DOCUMENT_TYPES,
        "tipo de documento del apoderado"
      );
      validDigits(
        formValue(form, "apoderadoNumeroDocumento"),
        "documento del apoderado"
      );
    }

    const telefono = formValue(form, "telefono");
    if (telefono) validDigits(telefono, "teléfono");

    for (const [key, label] of [
      ["aceptaTratamiento", "tratamiento de datos personales"],
      ["aceptaRespuestaCorreo", "respuesta por correo electrónico"],
      ["aceptaVeracidad", "declaración de veracidad"],
    ] as const) {
      if (formValue(form, key) !== "true") {
        throw new FormRequestError(`Debes aceptar la ${label}.`);
      }
    }

    const files = form
      .getAll("attachments")
      .filter((value): value is File => value instanceof File);
    const proof = form.get("representationProof");
    if (proof instanceof File && proof.size > 0) files.push(proof);
    if (files.length > MAX_PQRS_FILES) {
      throw new FormRequestError(`Solo puedes adjuntar hasta ${MAX_PQRS_FILES} archivos.`);
    }
    const totalBytes = files.reduce((total, file) => total + file.size, 0);
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      throw new FormRequestError("El tamaño total de los anexos supera 25 MB.");
    }
    const attachments = await Promise.all(
      files.map((file) => fileToAttachment(file, ALLOWED_PQRS_EXTENSIONS))
    );
    const attachmentNames = files.length
      ? files.map((file) => file.name).join(", ")
      : "No se adjuntaron documentos";
    const representedPerson =
      formValue(form, "representadoTipo") === "juridica"
        ? formValue(form, "razonSocial")
        : `${formValue(form, "nombres")} ${formValue(form, "apellidos")}`.trim();

    await sendWithResend({
      site,
      kind: "pqrs",
      subject: `[PQRS] ${tipoSolicitud} — ${asunto}`,
      replyTo: email,
      attachments,
      html: renderEmail({
        site,
        eyebrow: "Nueva solicitud PQRS",
        title: `${tipoSolicitud} recibida`,
        intro: `Se recibió una solicitud formal dirigida a ${getEmailBrand(site).name}.`,
        summaryLabel: "Asunto de la solicitud",
        summary: asunto,
        sections: [
          {
            title: "Resumen de la solicitud",
            fields: [
              ["Tipo de solicitud", tipoSolicitud],
              ["Tipo de solicitante", tipoSolicitante],
            ],
          },
          {
            title: "Datos del solicitante",
            fields: [
              ["Persona representada", representedPerson],
              ["Tipo de documento", formValue(form, "tipoDocumento")],
              ["Número de documento", formValue(form, "numeroDocumento")],
              ["Razón social", formValue(form, "razonSocial")],
              ["NIT", formValue(form, "nit")],
              [
                "Representante",
                `${formValue(form, "repNombres")} ${formValue(form, "repApellidos")}`.trim(),
              ],
              ["Documento del representante", formValue(form, "repNumeroDocumento")],
              [
                "Apoderado",
                `${formValue(form, "apoderadoNombres")} ${formValue(form, "apoderadoApellidos")}`.trim(),
              ],
              ["Documento del apoderado", formValue(form, "apoderadoNumeroDocumento")],
            ],
          },
          { title: "Objeto de la solicitud", content: objeto },
          { title: "Hechos y razones", content: hechos },
          {
            title: "Datos para la respuesta",
            fields: [
              ["Correo electrónico", email],
              ["Teléfono", formValue(form, "telefono")],
            ],
          },
          { title: "Documentos anexos", content: attachmentNames },
        ],
        footerNote:
          "La persona solicitante aceptó el tratamiento de datos personales, la respuesta por correo electrónico y la declaración de veracidad.",
      }),
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof FormRequestError) {
    return jsonResponse({ ok: false, error: error.message }, error.status);
  }
  console.error("Error inesperado procesando un formulario", error);
  return jsonResponse(
    { ok: false, error: "No fue posible procesar la solicitud. Intenta de nuevo." },
    500
  );
}
