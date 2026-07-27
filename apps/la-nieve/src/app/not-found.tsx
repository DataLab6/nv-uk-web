import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Error 404
      </p>
      <h1
        id="not-found-title"
        className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
      >
        Página no encontrada
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        La dirección que buscas no existe o fue trasladada.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
