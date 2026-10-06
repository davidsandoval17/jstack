import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jstack-six.vercel.app"),
  title: { default: "JSTACK | Presencia digital para tu negocio", template: "%s | JSTACK" },
  description: "Páginas web, catálogos digitales y contacto por WhatsApp para darle presencia digital a tu negocio.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "JSTACK",
    title: "JSTACK · Software Studio",
    description: "Tu negocio en internet. Sin complicarte. Atención directa con David Sandoval.",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSTACK · Software Studio",
    description: "Páginas web, catálogos digitales y tus redes conectadas. Hablemos por WhatsApp.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}><body>{children}</body></html>;
}
