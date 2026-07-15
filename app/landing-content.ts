export type CtaConfig = {
  label: string;
  href: string;
  analyticsEvent: string;
  analyticsLocation: string;
  context?: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type Service = {
  order: string;
  kicker: string;
  title: string;
  description: string;
  meta: string;
  fit: string;
  outcome: string;
  limit: string;
  cta: CtaConfig;
  featured?: boolean;
};

export type ProblemCard = {
  order: string;
  title: string;
  description: string;
  symptom: string;
};

export type ProcessStep = {
  order: string;
  title: string;
  description: string;
};

export type ProjectDemo = {
  title: string;
  description: string;
  status: string;
};

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hola@jstack.dev";

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || `mailto:${contactEmail}?subject=Agenda%20una%20llamada%20con%20JSTACK`;
const whatsappMessage = encodeURIComponent(
  "Hola JSTACK, quiero conversar sobre un proyecto digital."
);
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const whatsappUrl =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  (whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : `https://wa.me/?text=${whatsappMessage}`);

export function withCtaContext(baseHref: string, context?: string) {
  if (!context || baseHref.startsWith("mailto:") || baseHref.startsWith("#")) {
    return baseHref;
  }

  try {
    const url = new URL(baseHref);
    url.searchParams.set("context", context);
    return url.toString();
  } catch {
    return baseHref;
  }
}

export const primaryCta: CtaConfig = {
  label: "Agenda una llamada",
  href: bookingUrl,
  analyticsEvent: "cta_booking_click",
  analyticsLocation: "global",
};

export const whatsappCta: CtaConfig = {
  label: "Escríbenos por WhatsApp",
  href: whatsappUrl,
  analyticsEvent: "cta_whatsapp_click",
  analyticsLocation: "global",
};

export const navigation: NavigationItem[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Sobre JSTACK", href: "#nosotros" },
];

export const hero = {
  eyebrow: "JSTACK / SOFTWARE STUDIO",
  title: "Construimos productos digitales que cambian negocios.",
  description:
    "JSTACK ayuda a startups y negocios en crecimiento a convertir prototipos y procesos definidos en MVPs, aplicaciones web y automatizaciones claras, sólidas y listas para validar y crecer.",
  support: ["MVPs", "Aplicaciones web", "Automatización", "Arquitectura"],
  coverage: "Perú y Latinoamérica",
};

export const problems: ProblemCard[] = [
  {
    order: "01",
    title: "Falta de definición",
    description:
      "Cuando el problema, el usuario o el flujo no están claros, el proyecto acumula cambios antes de demostrar valor.",
    symptom: "Alcance que nunca se cierra.",
  },
  {
    order: "02",
    title: "Tecnología sin contexto",
    description:
      "Elegir herramientas antes de entender el negocio puede aumentar costo, complejidad y deuda técnica.",
    symptom: "Arquitectura sobredimensionada.",
  },
  {
    order: "03",
    title: "Construir demasiado pronto",
    description:
      "Una primera versión debe probar la hipótesis principal, no intentar resolver todo el negocio desde el inicio.",
    symptom: "Meses sin validar.",
  },
  {
    order: "04",
    title: "Entregas difíciles de evolucionar",
    description:
      "Código sin estructura, documentación ni criterio de producto convierte cada cambio en riesgo.",
    symptom: "Dependencia y retrabajo.",
  },
];

export const pillars = [
  ["Negocio primero", "Antes de construir, aclaramos qué resultado debe producir la solución y qué no necesita entrar todavía.", "Reduce alcance innecesario."],
  ["Arquitectura con intención", "Diseñamos una estructura suficiente para lanzar y mantenible para la siguiente etapa.", "Evita complejidad prematura."],
  ["Producto de extremo a extremo", "Definición, experiencia, desarrollo, validación y despliegue trabajan como un solo proceso.", "Menos pérdida entre disciplinas."],
  ["Claridad y cercanía", "Explicamos avances, riesgos y trade-offs sin esconderlos detrás de jerga técnica.", "Comunicación directa."],
] as const;

export const services: Service[] = [
  {
    order: "01",
    kicker: "Oferta principal",
    title: "MVP Build Sprint",
    description:
      "Convierte un prototipo o proceso definido en una aplicación web funcional, desplegada y lista para validarse en 4 a 6 semanas.",
    meta: "4-6 semanas · Alcance compacto",
    fit: "Para founders y negocios con un prototipo o proceso definido que necesitan una versión funcional para validar.",
    outcome: "Aplicación web desplegada con un flujo principal, hasta dos roles, hasta ocho pantallas base y una integración sencilla.",
    limit: "No es una fase de ideación ni un proyecto abierto sin límites.",
    cta: {
      label: "Validar si mi proyecto encaja",
      href: withCtaContext(bookingUrl, "MVP Build Sprint"),
      analyticsEvent: "cta_qualification_click",
      analyticsLocation: "mvp",
    },
    featured: true,
  },
  {
    order: "02",
    kicker: "Desarrollo a medida",
    title: "Aplicaciones web",
    description:
      "Plataformas, portales, dashboards y sistemas construidos alrededor de tu operación, tus usuarios y tus objetivos de crecimiento.",
    meta: "Alcance personalizado",
    fit: "Para productos y operaciones que requieren más módulos, reglas o evolución que el alcance de un sprint base.",
    outcome: "Solución web diseñada alrededor del negocio: portales, sistemas internos, dashboards, marketplaces o plataformas especializadas.",
    limit: "No se cotiza sin diagnóstico y alcance progresivo.",
    cta: {
      label: "Hablar sobre mi aplicación",
      href: withCtaContext(bookingUrl, "Aplicación web"),
      analyticsEvent: "cta_service_click",
      analyticsLocation: "web-app",
    },
  },
  {
    order: "03",
    kicker: "Eficiencia operativa",
    title: "Automatización de procesos",
    description:
      "Digitalizamos tareas manuales, conectamos herramientas y creamos flujos que reducen errores, seguimiento repetitivo y trabajo operativo.",
    meta: "Diagnóstico del proceso",
    fit: "Para equipos que dependen de hojas de cálculo, mensajes, copiado manual o seguimiento fragmentado.",
    outcome: "Flujo digital con captura, estados, alertas, integraciones, panel de gestión y métricas cuando corresponda.",
    limit: "No prometemos automatización total sin mapear excepciones, responsables y calidad de datos.",
    cta: {
      label: "Revisar mi proceso",
      href: withCtaContext(bookingUrl, "Automatización"),
      analyticsEvent: "cta_service_click",
      analyticsLocation: "automation",
    },
  },
  {
    order: "04",
    kicker: "Decisiones técnicas",
    title: "Consultoría y arquitectura",
    description:
      "Analizamos tu producto, identificamos riesgos y definimos una ruta priorizada para estabilizar, integrar o escalar la solución.",
    meta: "Diagnóstico y plan de acción",
    fit: "Para productos existentes con deuda técnica, lentitud, problemas de integración o dudas sobre su siguiente etapa.",
    outcome: "Diagnóstico, mapa de riesgos, decisiones recomendadas y plan de acción priorizado.",
    limit: "La consultoría no implica automáticamente ejecución; la implementación se cotiza por separado.",
    cta: {
      label: "Solicitar diagnóstico",
      href: withCtaContext(bookingUrl, "Consultoría"),
      analyticsEvent: "cta_service_click",
      analyticsLocation: "consulting",
    },
  },
];

export const sprint = {
  title: "Una primera versión funcional, con alcance controlado.",
  description:
    "El JSTACK MVP Build Sprint está diseñado para founders y negocios que ya tienen un prototipo o proceso definido y necesitan convertirlo en una aplicación web lista para validarse con usuarios reales.",
  cta: services[0].cta,
  scope: [
    "1 flujo principal",
    "Hasta 2 roles",
    "Hasta 8 pantallas base",
    "1 integración sencilla",
    "Despliegue",
    "15 días de garantía",
  ],
  payment: [
    ["Duración objetivo", "4 a 6 semanas"],
    ["Inversión", "Ajustada al alcance"],
    ["Plan", "Trabajo por hitos"],
    ["Inicio", "Alcance aprobado y primer pago confirmado"],
  ],
  qualification: [
    ["Sí encaja", "Tienes prototipo, requerimientos priorizados o un proceso manual concreto."],
    ["Sí encaja", "Puedes concentrar la primera versión en un flujo principal."],
    ["Sí encaja", "Existe una persona disponible para decidir y validar."],
    ["No encaja todavía", "Solo tienes una idea sin usuario, flujo ni resultado definido."],
    ["No encaja todavía", "Necesitas múltiples productos, apps nativas y módulos críticos en el mismo sprint."],
    ["No encaja todavía", "No hay responsable de decisión ni disponibilidad para revisar avances."],
  ],
};

export const processSteps: ProcessStep[] = [
  ["01", "Diagnóstico", "Entendemos el problema, la operación actual, los usuarios, el resultado esperado y las restricciones."],
  ["02", "Definición", "Priorizamos el flujo principal, cerramos límites, criterios de aceptación y responsabilidades."],
  ["03", "Diseño funcional", "Ordenamos pantallas, estados e interacciones; aplicamos diseño visual básico cuando no existe un prototipo final."],
  ["04", "Desarrollo", "Construimos frontend, backend, datos e integración con entregas demostrables."],
  ["05", "Validación", "Probamos el flujo principal, corregimos defectos y validamos el resultado contra el alcance."],
  ["06", "Lanzamiento", "Desplegamos, configuramos el entorno y realizamos la entrega operativa."],
  ["07", "Evolución", "Revisamos aprendizajes, nuevas prioridades y el siguiente alcance sin mezclarlo con el sprint cerrado."],
].map(([order, title, description]) => ({ order, title, description }));

export const projectDemos: ProjectDemo[] = [
  {
    title: "SaaS Admin Dashboard",
    description: "Dashboard con autenticación, métricas, gestión de datos y un flujo de negocio completo para una operación SaaS.",
    status: "Demo comercial",
  },
  {
    title: "Operations Automation Panel",
    description: "Panel para registrar solicitudes, gestionar estados, filtrar operaciones y visualizar mejoras frente al proceso manual.",
    status: "Demo comercial",
  },
];

export const technologies = ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Docker", "APIs e integraciones"];

export const footer = {
  brand: "JSTACK · Software Studio",
  statement: "Construimos productos digitales que cambian negocios.",
  legal: "© 2026 JSTACK. Todos los derechos reservados.",
  coverage: "Perú y Latinoamérica",
};
