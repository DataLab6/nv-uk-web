import Image from "next/image";
import type { SiteCultureHeroImage, SitePageCopy } from "../config/types";
import styles from "./CulturePhotoHero.module.css";

const panelClasses = [styles.panelOne, styles.panelTwo, styles.panelThree];
const imageSizes = [
  "(max-width: 767px) 34vw, (max-width: 1023px) 37vw, 38vw",
  "(max-width: 767px) 42vw, (max-width: 1023px) 45vw, 46vw",
  "(max-width: 767px) 32vw, (max-width: 1023px) 33vw, 32vw",
] as const;

/** Editorial photographic opening with CSS-built diagonal panels. */
export function CulturePhotoHero({
  images,
  siteName,
  copy,
}: {
  images: readonly [
    SiteCultureHeroImage,
    SiteCultureHeroImage,
    SiteCultureHeroImage,
  ];
  siteName: string;
  copy: SitePageCopy;
}) {
  return (
    <section
      className={styles.hero}
      aria-label={`Historias de clientes de ${siteName}`}
    >
      {images.map((image, index) => (
        <div
          key={typeof image.src === "string" ? image.src : image.alt}
          className={`${styles.panel} ${panelClasses[index]}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={90}
            sizes={imageSizes[index]}
            className={styles.image}
            style={{
              objectPosition: image.objectPosition ?? "50% 50%",
              transform: image.visualScale
                ? `scale(${image.visualScale})`
                : undefined,
              transformOrigin: image.transformOrigin,
            }}
          />
        </div>
      ))}

      <div className={styles.overlay} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-7xl px-4 pb-10 text-white sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
          {copy.eyebrow}
        </span>
        <h1 className="mt-3 max-w-4xl text-balance text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-white/90 drop-shadow-sm sm:text-lg lg:text-xl">
          {copy.description}
        </p>
      </div>
      <div
        className={`${styles.separator} ${styles.separatorOne}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.separator} ${styles.separatorTwo}`}
        aria-hidden="true"
      />
    </section>
  );
}
