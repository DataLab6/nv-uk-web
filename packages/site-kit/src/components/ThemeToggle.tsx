"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../lib/cn";

export interface ThemeToggleProps {
  className?: string;
  darkLabel?: string;
  lightLabel?: string;
  loadingLabel?: string;
}

const subscribeToMount = () => () => undefined;

/**
 * Toggles between the resolved light and dark themes after hydration.
 */
export function ThemeToggle({
  className,
  darkLabel = "Cambiar a modo oscuro",
  lightLabel = "Cambiar a modo claro",
  loadingLabel = "Cargando tema",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false
  );
  const baseClassName = cn(
    "relative flex h-9 w-9 items-center justify-center rounded-lg",
    "border border-border bg-background transition-colors",
    "hover:bg-muted focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    className
  );

  if (!mounted) {
    return (
      <button
        type="button"
        className={baseClassName}
        aria-label={loadingLabel}
        disabled
      >
        <span
          className="h-4 w-4 animate-pulse rounded-full bg-muted motion-reduce:animate-none"
          aria-hidden="true"
        />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={baseClassName}
      aria-label={isDark ? lightLabel : darkLabel}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-foreground" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}
