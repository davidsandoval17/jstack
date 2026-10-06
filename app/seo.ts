import type { Metadata } from "next";
import { contactEmail, contactWhatsapp, socialLinks } from "./landing-content";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jstack-six.vercel.app").origin;
export const isPreview = process.env.VERCEL_ENV === "preview";
export const socialImage = `${siteUrl}/social/jstack-presencia-digital-v1.png`;
const title = "JSTACK | Presencia digital para tu negocio";
const description = "Páginas web y catálogos digitales para negocios. David Sandoval te ayuda a conectar tus redes y recibir consultas por WhatsApp en Perú.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | JSTACK" },
  description,
  applicationName: "JSTACK",
  authors: [{ name: "David Sandoval", url: socialLinks[1].href }],
  creator: "David Sandoval",
  publisher: "JSTACK",
  alternates: { canonical: `${siteUrl}/` },
  robots: isPreview ? { index: false, follow: false } : {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }], apple: { url: "/apple-touch-icon.png", sizes: "180x180" } },
  openGraph: {
    title: "JSTACK | Tu negocio en internet. Sin complicarte.",
    description, siteName: "JSTACK", url: `${siteUrl}/`, type: "website", locale: "es_PE",
    images: [{ url: socialImage, width: 1200, height: 630, type: "image/png", alt: "JSTACK: páginas web, catálogos digitales y contacto por WhatsApp. David Sandoval." }],
  },
  twitter: { card: "summary_large_image", title, description, images: [{ url: socialImage, alt: "JSTACK: tu negocio en internet, sin complicarte." }] },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: "JSTACK", alternateName: "JSTACK Software Studio", inLanguage: "es-PE", publisher: { "@id": `${siteUrl}/#organization` } },
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "JSTACK", url: `${siteUrl}/`, logo: `${siteUrl}/brand/jstack-logo.png`, description, email: contactEmail, telephone: contactWhatsapp,
      founder: { "@id": `${siteUrl}/#david` }, sameAs: socialLinks.filter(link => link.icon !== "linkedin").map(link => link.href),
      contactPoint: { "@type": "ContactPoint", telephone: contactWhatsapp, email: contactEmail, contactType: "customer service", availableLanguage: "Spanish" },
    },
    { "@type": "Person", "@id": `${siteUrl}/#david`, name: "David Sandoval", jobTitle: "Desarrollador full stack", url: `${siteUrl}/#nosotros`, sameAs: [socialLinks[1].href], worksFor: { "@id": `${siteUrl}/#organization` } },
  ],
};
