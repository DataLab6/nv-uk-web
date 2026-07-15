import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/animations/ThemeProvider";
import { LenisProvider } from "@/components/animations/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Nieve | Distribución Nacional de Consumo Masivo",
  description:
    "Distribución nacional de productos de consumo masivo en Colombia. Más de 20 años de experiencia, cobertura en 18 departamentos y las marcas más importantes del país.",
  keywords: [
    "distribución",
    "consumo masivo",
    "Colombia",
    "logística",
    "productos",
    "marcas",
  ],
  openGraph: {
    title: "La Nieve | Distribución Nacional de Consumo Masivo",
    description:
      "Conectamos marcas con hogares colombianos. Cobertura nacional, logística avanzada y más de 20 años de experiencia.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
