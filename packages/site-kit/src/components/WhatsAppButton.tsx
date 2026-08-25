import Image from "next/image";
import type { SiteConfig } from "../config/types";

function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("57")) return digits;
  return digits.length === 10 ? `57${digits}` : digits;
}

/** Direct, accessible WhatsApp shortcut for the active corporate brand. */
export function WhatsAppButton({ site }: { site: SiteConfig }) {
  if (!site.contact.phone) return null;

  const phone = toWhatsAppNumber(site.contact.phone);
  const message = encodeURIComponent(
    `Hola, quiero comunicarme con ${site.name}.`
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escribir a ${site.name} por WhatsApp`}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(15,23,42,0.22)] transition-[transform,filter,box-shadow] duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_14px_34px_rgba(15,23,42,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/35 motion-reduce:transform-none sm:bottom-6 sm:right-6 sm:w-auto sm:px-4"
    >
      <Image
        src="/images/whatsapp.webp"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        aria-hidden="true"
      />
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  );
}
