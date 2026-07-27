import { permanentRedirect } from "next/navigation";

/** Preserves the former brands URL. */
export default function Page() {
  permanentRedirect("/aliados-comerciales");
}
