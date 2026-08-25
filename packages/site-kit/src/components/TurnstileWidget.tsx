"use client";

import { useEffect, useRef, useState } from "react";

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  /** Increment this value after a submission to obtain a fresh token. */
  resetSignal?: number;
};

/**
 * Explicit Cloudflare Turnstile widget shared by the three public forms.
 * The site key is public by design; the secret is checked server-side.
 */
export function TurnstileWidget({ resetSignal = 0 }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  // Keep the first server and browser render identical. Turnstile is loaded
  // after hydration because its script mutates the DOM by design.
  const [isMounted, setIsMounted] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [token, setToken] = useState("");
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (window.turnstile) setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!siteKey || !isMounted || typeof document === "undefined") return;
    if (window.turnstile) {
      setScriptReady(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`
    );
    const script = existingScript ?? document.createElement("script");
    const onLoad = () => setScriptReady(true);
    const onError = () => setWidgetError(true);

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existingScript) {
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, [isMounted, siteKey]);

  useEffect(() => {
    if (!siteKey || !scriptReady || !window.turnstile || !containerRef.current) {
      return;
    }

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (nextToken) => {
        setToken(nextToken);
        setWidgetError(false);
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setWidgetError(true);
      },
    });
    widgetIdRef.current = widgetId;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [scriptReady, siteKey]);

  useEffect(() => {
    if (!resetSignal || !widgetIdRef.current || !window.turnstile) return;
    setToken("");
    setWidgetError(false);
    window.turnstile.reset(widgetIdRef.current);
  }, [resetSignal]);

  if (!siteKey || !isMounted) return null;

  return (
    <div className="mt-6" aria-label="Verificación de seguridad">
      <div ref={containerRef} />
      <input type="hidden" name="turnstileToken" value={token} readOnly />
      {widgetError ? (
        <p className="mt-2 text-xs font-semibold text-destructive" role="alert">
          No fue posible cargar la verificación. Recarga la página e inténtalo de nuevo.
        </p>
      ) : null}
    </div>
  );
}
