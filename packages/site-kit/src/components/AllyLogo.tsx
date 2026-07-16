import Image from "next/image";
import type { SiteImageConfig } from "../config/types";

interface AllyLogoProps {
  readonly name: string;
  readonly image: SiteImageConfig;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly sizes?: string;
  readonly displayWidth?: number;
}

/** Shared, proportion-safe renderer for approved commercial ally logos. */
export function AllyLogo({
  name,
  image,
  className = "",
  imageClassName = "",
  sizes = "16rem",
  displayWidth,
}: AllyLogoProps) {
  return (
    <span
      className={`relative block min-h-0 min-w-0 max-w-full overflow-hidden ${className}`}
      style={displayWidth ? { width: displayWidth } : undefined}
    >
      <Image
        src={image.src}
        alt={`Logotipo de ${name}`}
        fill
        sizes={sizes}
        className={`object-contain ${imageClassName}`}
      />
    </span>
  );
}
