"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import type { SiteConfig, SiteNavigationItem } from "../config/types";
import { cn } from "../lib/cn";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

/** Returns whether a route or one of its descendants is currently active. */
function isNavigationItemActive(item: SiteNavigationItem, pathname: string) {
  if (pathname === item.href) return true;

  return Boolean(
    item.children?.some(
      (child) =>
        pathname === child.href || pathname.startsWith(`${child.href}/`)
    )
  );
}

/**
 * Route-aware primary navigation shared by both applications.
 *
 * The bar starts transparent, becomes brand-primary after scrolling and exposes
 * nested legal routes through hover and focus-within on desktop.
 */
export function Navigation({ site }: { site: SiteConfig }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Selecting a submenu item navigates without unmounting the nav, so the
  // cursor stays physically over the (still-hovered) trigger and the CSS
  // group-hover/focus-within dropdown would otherwise stay visually open.
  // Force it closed until the pointer actually leaves or focus re-enters.
  const [dismissedHref, setDismissedHref] = useState<string | null>(null);
  const isSolid = scrolled || mobileOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
        isSolid
          ? "border-white/15 bg-brand-primary/95 shadow-[0_14px_38px_-24px_rgb(0_0_0/0.65)]"
          : "border-white/20 bg-background/45 shadow-[0_8px_28px_-24px_rgb(0_0_0/0.45)]"
      )}
      aria-label="Navegación principal"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group -ml-1 inline-flex rounded-lg transition-[filter,transform] duration-300 hover:-translate-y-0.5 hover:drop-shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none"
          aria-label={`${site.name}, ir al inicio`}
          onClick={() => setMobileOpen(false)}
        >
          <span
            className="relative block h-14 w-40 shrink-0 sm:w-44"
            aria-hidden="true"
          >
            <span
              className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-300",
                isSolid ? "opacity-0" : "opacity-100"
              )}
            >
              <BrandLogo logo={site.logo} priority />
            </span>
            <span
              className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-300",
                isSolid ? "opacity-100" : "opacity-0"
              )}
            >
              <BrandLogo logo={site.chromeLogo} priority />
            </span>
          </span>
        </Link>

        <div className="hidden h-20 items-center gap-0.5 xl:flex">
          {site.navigation.map((item) => {
            const active = isNavigationItemActive(item, pathname);
            const hasChildren = Boolean(item.children?.length);

            return (
              <div
                key={item.href}
                className="group relative flex h-20 items-center"
                onMouseEnter={() =>
                  setDismissedHref((current) =>
                    current === item.href ? null : current
                  )
                }
                onFocus={() =>
                  setDismissedHref((current) =>
                    current === item.href ? null : current
                  )
                }
              >
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  className={cn(
                    "relative flex items-center gap-1 rounded-lg px-2.5 py-2 text-[0.8rem] font-semibold transition-[background-color,color,transform] duration-200 hover:-translate-y-px motion-reduce:transform-none",
                    isSolid
                      ? active
                        ? "bg-white/15 text-white"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                      : active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-background/70 hover:text-foreground"
                  )}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    />
                  )}
                  {active && (
                    <span
                      className={cn(
                        "absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full",
                        isSolid ? "bg-white" : "bg-primary"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {item.children && item.children.length > 0 && (
                  <div
                    className={cn(
                      "invisible pointer-events-none absolute right-0 top-full w-72 translate-y-2 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
                      dismissedHref === item.href &&
                        "invisible! pointer-events-none! opacity-0!"
                    )}
                    role="menu"
                    aria-label={`Opciones de ${item.label}`}
                  >
                    <div className="flex flex-col gap-1.5 overflow-hidden rounded-b-2xl border border-white/15 bg-brand-primary p-3 text-white shadow-xl">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            aria-current={childActive ? "page" : undefined}
                            onClick={() => setDismissedHref(item.href)}
                            className={cn(
                              "block min-h-11 rounded-xl px-4 py-3.5 text-sm font-medium leading-snug transition-colors hover:bg-primary-foreground/15 focus-visible:bg-primary-foreground/15",
                              childActive
                                ? "bg-white/15 text-white"
                                : "text-white/85"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors xl:hidden",
              isSolid
                ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                : "border-border bg-background text-foreground hover:bg-muted"
            )}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-t bg-brand-primary text-white transition-[max-height,opacity] duration-300 xl:hidden",
          mobileOpen
            ? "max-h-[calc(100dvh-5rem)] overflow-y-auto border-white/20 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {site.navigation.map((item) => {
            const active = isNavigationItemActive(item, pathname);

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  tabIndex={mobileOpen ? undefined : -1}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>

                {item.children && item.children.length > 0 && (
                  <div className="ml-5 mt-1 space-y-1 border-l border-white/25 pl-3">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={childActive ? "page" : undefined}
                          tabIndex={mobileOpen ? undefined : -1}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-lg px-4 py-2.5 text-sm transition-colors",
                            childActive
                              ? "bg-white/15 font-semibold text-white"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
