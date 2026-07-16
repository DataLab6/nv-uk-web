import Image from "next/image";
import { cn } from "../lib/cn";
import type { SiteLogoConfig } from "../config/types";

/** Displays the original brand mark directly, without decorative containers. */
export function BrandLogo({
  logo,
  priority = false,
  size = "navigation",
}: {
  logo: SiteLogoConfig;
  priority?: boolean;
  size?: "navigation" | "footer";
}) {
  return (
    <span
      className={cn(
        "relative block shrink-0",
        size === "navigation" ? "h-14 w-40 sm:w-44" : "h-20 w-48"
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        priority={priority}
        sizes={size === "navigation" ? "176px" : "192px"}
        className={cn(
          "transition-[filter,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:brightness-110 motion-reduce:transform-none motion-reduce:transition-none",
          logo.display === "cropped-square"
            ? "object-cover object-top"
            : "object-contain object-left"
        )}
      />
    </span>
  );
}
