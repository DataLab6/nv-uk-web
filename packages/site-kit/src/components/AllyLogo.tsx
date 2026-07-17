import Image from "next/image";
import type { SiteImageConfig } from "../config/types";

interface AllyLogoProps {
  readonly name: string;
  readonly image: SiteImageConfig;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly sizes?: string;
  readonly displayWidth?: number;
  /** See `SiteAlly.visualScale`. Applied to the artwork only, centered, never to the layout box. */
  readonly visualScale?: number;
}

/** Shared, proportion-safe renderer for approved commercial ally logos. */
export function AllyLogo({
  name,
  image,
  className = "",
  imageClassName = "",
  sizes = "16rem",
  displayWidth,
  visualScale,
}: AllyLogoProps) {
  return (
    <span
      className={`relative block min-h-0 min-w-0 max-w-full ${className}`}
      style={displayWidth ? { width: displayWidth } : undefined}
    >
      <Image
        src={image.src}
        alt={`Logotipo de ${name}`}
        fill
        sizes={sizes}
        className={`object-contain ${imageClassName}`}
        style={
          visualScale && visualScale !== 1
            ? { transform: `scale(${visualScale})`, transformOrigin: "center" }
            : undefined
        }
      />
    </span>
  );
}
