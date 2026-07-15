import { redirect } from "next/navigation";

/** Preserves client links by targeting the home-page channels section. */
export default function Page() {
  redirect("/#canales");
}
