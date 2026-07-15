import { ShieldCheck } from "lucide-react";

/**
 * Honest placeholder used when publication depends on official validation.
 */
export function StatusPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
        aria-hidden="true"
      />
      <div className="relative max-w-2xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
