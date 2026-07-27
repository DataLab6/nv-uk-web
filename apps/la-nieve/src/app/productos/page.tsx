import { permanentRedirect } from "next/navigation";

/** Redirects the retired products route to the corporate home page. */
export default function Page() {
  permanentRedirect("/");
}
