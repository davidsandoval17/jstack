import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jstack.dev"),
  title: { default: "JSTACK | MVPs, aplicaciones web y automatización", template: "%s | JSTACK" },
  description: "Software Studio para startups y negocios en crecimiento que necesitan lanzar, mejorar o escalar productos digitales.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "JSTACK",
    title: "JSTACK · Software Studio",
    description: "Convertimos prototipos y procesos definidos en productos digitales funcionales y listos para crecer.",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSTACK · Software Studio",
    description: "MVPs, aplicaciones web y automatización con criterio de negocio.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}><body>{children}</body></html>;
}
