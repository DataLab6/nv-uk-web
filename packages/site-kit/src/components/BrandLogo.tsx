import Image from "next/image";
import { cn } from "../lib/cn";
import type { SiteLogoConfig } from "../config/types";

/**
 * Displays an app-owned brand logo while compensating for supplied PNG padding.
 */
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
        "relative block shrink-0 overflow-hidden",
        size === "navigation" ? "h-14 w-36 sm:w-40" : "h-20 w-44"
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        priority={priority}
        sizes={size === "navigation" ? "160px" : "176px"}
        className={cn(
          logo.display === "cropped-square"
            ? "object-cover object-center"
            : "object-contain object-left"
        )}
      />
    </span>
  );
}
