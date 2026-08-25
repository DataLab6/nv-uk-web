export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function sanitizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function sanitizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function sanitizePersonName(value: string) {
  return value.replace(/[^\p{L}\s.'-]/gu, "");
}
