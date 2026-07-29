"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteAdvertisingCampaign } from "../config/types";
import { cn } from "../lib/cn";

const SLIDE_DURATION_MS = 10_000;

export function AdvertisingShowcase({
  campaigns,
}: {
  campaigns: readonly SiteAdvertisingCampaign[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (campaigns.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % campaigns.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [campaigns.length]);

  if (campaigns.length === 0) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + campaigns.length) % campaigns.length
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % campaigns.length);
  };

  return (
    <section
      aria-label="Campañas y piezas publicitarias"
      className="relative isolate max-w-full overflow-hidden bg-neutral-950 pt-20 sm:h-[min(100svh,70rem)] sm:min-h-[48rem]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {campaigns.map((campaign, index) => (
          <div
            key={`background-${campaign.id}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={campaign.main.src}
              alt=""
              fill
              sizes="100vw"
              className="scale-125 object-cover blur-[64px] brightness-[0.8] saturate-[0.75]"
              style={{ objectPosition: campaign.main.objectPosition }}
            />
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-black/5"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col px-4 py-6 sm:h-full sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <div className="relative h-72 shrink-0 sm:h-auto sm:min-h-0 sm:flex-1">
          {campaigns.map((campaign, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={campaign.id}
                aria-hidden={!isActive}
                className={cn(
                  "absolute inset-0 flex items-center justify-center px-11 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none sm:px-14",
                  isActive ? "z-10 opacity-100" : "z-0 opacity-0"
                )}
              >
                <div className="relative inline-flex max-h-full max-w-full min-w-0 items-center justify-center">
                  <Image
                    src={campaign.main.src}
                    alt={isActive ? campaign.main.alt : ""}
                    width={campaign.main.width}
                    height={campaign.main.height}
                    sizes="(min-width: 1600px) 1536px, calc(100vw - 7rem)"
                    priority={campaign.main.priority}
                    className="block h-auto max-h-full w-auto max-w-full rounded-2xl object-contain shadow-[0_20px_55px_-36px_rgba(0,0,0,0.65)]"
                    style={{ objectPosition: campaign.main.objectPosition }}
                  />
                </div>
              </div>
            );
          })}

          {campaigns.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white drop-shadow-lg transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:h-11 sm:w-11"
                aria-label="Mostrar publicidad anterior"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white drop-shadow-lg transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:h-11 sm:w-11"
                aria-label="Mostrar publicidad siguiente"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {campaigns.length > 1 && (
          <div className="flex shrink-0 items-center justify-center pt-2 sm:pt-3">
            <div
              className="flex items-center gap-2"
              aria-label="Seleccionar pieza publicitaria"
            >
              {campaigns.map((campaign, index) => (
                <button
                  key={`control-${campaign.id}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300",
                    index === activeIndex
                      ? "w-8 bg-white"
                      : "w-3 bg-white/45 hover:bg-white/70"
                  )}
                  aria-label={`Mostrar pieza ${index + 1} de ${campaigns.length}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
