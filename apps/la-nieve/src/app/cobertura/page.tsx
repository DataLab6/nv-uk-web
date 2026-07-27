import { permanentRedirect } from "next/navigation";

/** Preserves coverage links by targeting the home-page coverage section. */
export default function Page() {
  permanentRedirect("/#cobertura");
}
