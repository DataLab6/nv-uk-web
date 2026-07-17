/**
 * Shared, brand-neutral configuration for the formal PQRS filing form.
 * Brand-specific data (legal name, contact email, data-policy route) stays in
 * each `site.config.ts` and is read directly from `SiteConfig` by the page.
 */

export const PQRS_DOCUMENT_TYPES = [
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Pasaporte",
  "Permiso especial de permanencia",
  "Otro",
] as const;

/**
 * UI-only reference limits for the attachments picker. No backend exists yet
 * to confirm these values (see docs/progress.md); they only bound the
 * interface so it behaves reasonably, and must be revisited once a real
 * upload/storage integration is defined.
 */
export const PQRS_ATTACHMENT_RULES = {
  acceptedExtensions: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
  acceptAttribute:
    ".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png",
  maxFileSizeBytes: 10 * 1024 * 1024,
  maxTotalSizeBytes: 25 * 1024 * 1024,
  maxFiles: 5,
} as const;

/**
 * General, non-binding legal reference terms. Explicitly framed as pending
 * legal review before publication, per docs/progress.md.
 */
export const PQRS_RESPONSE_TERMS_NOTE =
  "Como referencia general y no vinculante: peticiones generales, 15 días hábiles; solicitudes de información o de documentos, 10 días hábiles; consultas, 30 días hábiles. Pueden existir términos especiales según la naturaleza de la solicitud. Estos plazos no constituyen un compromiso contractual; se aplicarán los términos legalmente correspondientes una vez validados por la empresa y su asesoría jurídica.";
