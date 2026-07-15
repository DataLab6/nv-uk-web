import { redirect } from "next/navigation";

/** Preserves coverage links by targeting the home-page coverage section. */
export default function Page() {
  redirect("/#cobertura");
}
