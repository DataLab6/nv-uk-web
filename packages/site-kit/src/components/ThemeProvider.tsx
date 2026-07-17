"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from "next-themes";

export type ThemeProviderProps = NextThemesProviderProps;

/**
 * Provides persistent light/dark theme selection to an app. The site always
 * opens in light mode for visitors without a saved preference: it never
 * reads or syncs with the operating system's colour scheme. A theme the user
 * picks manually (via ThemeToggle) is still remembered across visits, since
 * next-themes persists it to localStorage regardless of `enableSystem`.
 */
export function ThemeProvider({
  attribute = "class",
  defaultTheme = "light",
  enableSystem = false,
  disableTransitionOnChange = false,
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
