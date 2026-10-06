export type CtaConfig = {
  label: string;
  href: string;
  analyticsEvent: string;
  analyticsLocation: string;
};

export type NavigationItem = { label: string; href: string };

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jsstack1993@gmail.com";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "51903081410";
export const contactWhatsapp = `+${whatsappNumber}`;
export const contactWhatsappDisplay = whatsappNumber === "51903081410" ? "+51 903 081 410" : contactWhatsapp;

export function whatsappLink(message: string) {
  const url = new URL(process.env.NEXT_PUBLIC_WHATSAPP_URL || `https://wa.me/${whatsappNumber}`);
  url.searchParams.set("text", message);
  return url.toString();
}

export const whatsappCta: CtaConfig = {
  label: "Hablemos por WhatsApp",
  href: whatsappLink("Hola David, vi JSTACK y quiero darle presencia digital a mi negocio."),
  analyticsEvent: "cta_whatsapp_click",
  analyticsLocation: "global",
};

export const primaryCta = whatsappCta;
export const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Quiero una web para mi negocio")}`;

export const socialLinks = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/profile.php?id=61594907201063", description: "Conoce JSTACK y escríbeme por Facebook." },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/david-sandoval-645652441/", description: "Mi perfil profesional." },
  { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@js_stack", description: "Sígueme en @js_stack." },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UClDNhSpIB0QooOdFjaxcZUQ", description: "Visita mi canal." },
] as const;

export const navigation: NavigationItem[] = [
  { label: "Qué puedo hacer", href: "#servicios" },
  { label: "Demos", href: "#demos" },
  { label: "Cómo empezamos", href: "#proceso" },
  { label: "Sobre mí", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export const hero = {
  eyebrow: "JSTACK / PRESENCIA DIGITAL PARA NEGOCIOS",
  title: "Tu negocio en internet. Sin complicarte.",
  description: "Te ayudo a dar el primer paso con una web que muestre lo que ofreces, conecte tus redes y facilite que tus clientes te escriban por WhatsApp.",
  support: ["Páginas web", "Catálogos digitales", "Contacto por WhatsApp"],
  coverage: "Atención directa con David Sandoval · Perú y Latinoamérica",
};

export const services = [
  {
    title: "Una web para tu negocio",
    kicker: "PARA EMPEZAR",
    description: "Un lugar propio para presentar tus servicios, contar quién eres y dejar tus contactos siempre a mano.",
    includes: ["Diseño adaptable a celular", "Tus servicios, fotos e información", "Botón de WhatsApp y enlaces a tus redes"],
    message: "Hola David, quiero una página web para mi negocio.",
    cta: "Quiero mi página web",
    featured: true,
  },
  {
    title: "Tu catálogo en un enlace",
    kicker: "PARA MOSTRAR LO QUE VENDES",
    description: "Organiza tus productos o servicios para compartirlos por WhatsApp, Facebook o desde tu perfil.",
    includes: ["Productos, fotos y precios", "Categorías fáciles de explorar", "Consultas por WhatsApp"],
    message: "Hola David, quiero un catálogo digital para mi negocio.",
    cta: "Quiero mostrar mi catálogo",
    featured: false,
  },
  {
    title: "Conecta tu presencia digital",
    kicker: "PARA ORDENAR TUS CANALES",
    description: "Una página sencilla que reúna tus enlaces, explique lo que haces y lleve a tus clientes al canal correcto.",
    includes: ["Presentación de tu negocio", "Enlaces a tus perfiles sociales", "Correo y WhatsApp en un solo lugar"],
    message: "Hola David, quiero reunir los enlaces y contactos de mi negocio.",
    cta: "Quiero conectar mis canales",
    featured: false,
  },
];

export const processSteps = [
  { order: "01", title: "Me cuentas tu negocio", description: "Escríbeme por WhatsApp. Revisamos qué ofreces, a quién quieres llegar y qué necesitas mostrar." },
  { order: "02", title: "Definimos lo esencial", description: "Te propongo una versión sencilla, con entregables, precio y fecha de entrega antes de comenzar." },
  { order: "03", title: "La preparo y revisamos", description: "Con tus textos, fotos y datos construyo tu página. Revisamos juntos cómo se ve y cómo funciona." },
  { order: "04", title: "Lista para compartir", description: "Publicamos y te explico cómo usar tu enlace en redes, WhatsApp y la presentación de tu negocio." },
];

export const technologies = ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Docker", "APIs e integraciones"];

export const faqs = [
  { question: "¿Puedo empezar si todavía no tengo una web?", answer: "Sí. Empezamos por lo esencial: qué hace tu negocio, qué quieres mostrar y cómo te contactan. Si ya tienes redes, las conectamos con tu nueva página." },
  { question: "¿Cuánto cuesta y cuánto tarda?", answer: "Depende de las secciones, el contenido y las funciones. Te confirmo precio y fecha antes de empezar. Para avanzar rápido, priorizamos una primera versión sencilla y acordamos cuándo me entregas los materiales." },
  { question: "¿Qué tengo que enviarte?", answer: "El nombre de tu negocio, una descripción, tus servicios o productos, fotos que puedas utilizar y datos de contacto. Si te falta algo, te indico qué necesitamos para comenzar." },
  { question: "¿Incluye dominio, hosting o mantenimiento?", answer: "Lo detallamos en la propuesta: qué está incluido, qué se paga aparte y qué costos son recurrentes. También acordamos quién controla las cuentas y cómo se entrega la web." },
  { question: "¿También administras mis redes o haces publicidad?", answer: "Esta oferta se enfoca en tu web, catálogo y conexión con tus perfiles. La publicación de contenido, gestión de redes y campañas publicitarias no están incluidas." },
  { question: "¿Emites comprobante por el servicio?", answer: "Sí. Cuento con RUC y puedo emitir recibos por honorarios. Lo coordinamos al definir el servicio y las condiciones de pago." },
];

export const footer = {
  statement: "Presencia digital sencilla para que tu negocio dé el siguiente paso.",
  coverage: "Perú y Latinoamérica",
  legal: "© 2026 JSTACK · David Sandoval",
};

