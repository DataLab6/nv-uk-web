import { permanentRedirect } from "next/navigation";

/** Preserves the former company-profile URL. */
export default function Page() {
  permanentRedirect("/somos");
}
