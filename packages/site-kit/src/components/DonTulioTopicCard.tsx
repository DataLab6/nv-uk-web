"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { SiteCultureTopic } from "../config/types";
import { useTiltCard } from "../hooks/useTiltCard";
import { SiteIcon } from "./SiteIcon";
import styles from "./CultureTopicCard.module.css";

const advice = {
  "trending-up": {
    message:
      "¡Escucha a tu cliente! Una buena recomendación empieza por saber qué necesita.",
    action: "Hoy en tu negocio",
    detail:
      "Pregunta qué está buscando y recomiéndale una opción que se ajuste a su necesidad. Una atención cercana invita a volver.",
  },
  store: {
    message:
      "¡Organiza tus estantes! Agrupa los productos y deja sus precios a la vista.",
    action: "Un cambio que se nota",
    detail:
      "Agrupa los productos por categoría, mantén los precios visibles y revisa las fechas de vencimiento al reponer tu exhibición.",
  },
  lightbulb: {
    message:
      "¡Planea tu próximo paso! Revisa lo que más se vende antes de hacer tu pedido.",
    action: "Ponlo en práctica",
    detail:
      "Anota los productos que más te piden y revisa tus existencias. Usa esa información para preparar tu próxima compra.",
  },
};

type PresenterMedia = { name: string; video: string; poster: string };

function TulioScene({
  variant,
  media,
}: {
  variant: "greeting" | "shelf" | "advice";
  media?: PresenterMedia;
}) {
  const character = media?.name ?? "Don Tulio";
  const transparent = !!media || variant !== "greeting";
  const name = variant === "shelf" ? "estante" : "consejo";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motion.matches) void video?.play().catch(() => {});
    const onMotionChange = () => {
      if (motion.matches) video?.pause();
    };
    motion.addEventListener("change", onMotionChange);
    return () => motion.removeEventListener("change", onMotionChange);
  }, []);
  return (
    <div
      className={`${styles.presenter} ${transparent ? styles.transparentPresenter : ""}`}
    >
      {failed ? (
        <Image
          src={media?.poster ?? "/images/whatsapp-personaje.webp"}
          alt={character}
          fill
          sizes="180px"
          className="object-contain"
        />
      ) : (
        <video
          ref={videoRef}
          className={transparent ? styles.transparentVideo : styles.video}
          src={
            media?.video ??
            (transparent
              ? `/videos/don-tulio-${name}-v2.webm`
              : "/videos/don-tulio.mp4")
          }
          poster={
            media?.poster ??
            (transparent
              ? `/images/culture/don-tulio-${name}-v2.png`
              : "/images/whatsapp-personaje.webp")
          }
          aria-label={`Animación de ${character} acompañando el consejo escrito`}
          muted
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
      )}
      {!failed && (
        <button
          type="button"
          className={styles.playback}
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (video.paused) void video.play().catch(() => {});
            else video.pause();
          }}
          aria-label={
            playing
              ? `Pausar animación de ${character}`
              : `Reproducir animación de ${character}`
          }
        >
          {playing ? "Ⅱ Pausar" : "▷ Animar"}
        </button>
      )}
    </div>
  );
}

export function DonTulioTopicCard({
  topic,
  selected,
  onSelect,
  animation = "greeting",
  media,
}: {
  topic: SiteCultureTopic;
  selected: boolean;
  onSelect: () => void;
  animation?: "greeting" | "shelf" | "advice";
  media?: PresenterMedia;
}) {
  const character = media?.name ?? "Don Tulio";
  const id = useId();
  const cardRef = useTiltCard<HTMLElement>({ maxTilt: 3, scale: 1.01 });
  const tip = advice[topic.icon as keyof typeof advice] ?? advice.lightbulb;
  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${selected ? styles.selected : ""}`}
    >
      <div className={styles.scene}>
        <Image
          src={topic.image.src}
          alt={topic.image.alt}
          fill
          quality={92}
          sizes="(min-width: 1280px) 384px, (min-width: 768px) 31vw, calc(100vw - 2rem)"
          className={styles.photo}
          style={{ objectPosition: topic.image.objectPosition }}
        />
        <button
          type="button"
          className={styles.sceneButton}
          onClick={onSelect}
          aria-label={`${selected ? "Cerrar" : "Ver"} consejo de ${character}: ${topic.title}`}
          aria-expanded={selected}
          aria-controls={id}
        />
        {selected ? (
          <>
            <div className={styles.shade} />
            <div className={styles.bubble} aria-hidden="true">
              <span>{character} te recomienda</span>
              <p>{tip.message}</p>
            </div>
            <TulioScene variant={animation} media={media} />
          </>
        ) : (
          <span className={styles.badge}>
            Un tip con {character} <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <SiteIcon name={topic.icon} className="h-5 w-5" />
        </span>
        <h2 className="mt-5 text-xl font-bold tracking-tight text-card-foreground">
          {topic.title}
        </h2>
        <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
          {topic.description}
        </p>
        <button
          type="button"
          className={styles.toggle}
          onClick={onSelect}
          aria-expanded={selected}
          aria-controls={id}
        >
          {selected ? "Cerrar consejo" : `Ver consejo de ${character}`}
          <span aria-hidden="true">{selected ? "−" : "+"}</span>
        </button>
        <div id={id} hidden={!selected} className={styles.detail}>
          <p className="sr-only">
            {character} te recomienda: {tip.message}
          </p>
          <h3 className="font-bold text-card-foreground">{tip.action}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {tip.detail}
          </p>
        </div>
      </div>
    </article>
  );
}
