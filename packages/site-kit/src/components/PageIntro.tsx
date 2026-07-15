import type { SitePageCopy } from "../config/types";

/**
 * Shared heading block for every independent corporate route.
 */
export function PageIntro({ copy }: { copy: SitePageCopy }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-muted/30 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div
        className="mesh-gradient absolute inset-0 opacity-80"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {copy.eyebrow}
        </span>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {copy.description}
        </p>
      </div>
    </header>
  );
}
