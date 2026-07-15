import { redirect } from "next/navigation";

/** Preserves the former company-profile URL. */
export default function Page() {
  redirect("/somos");
}
