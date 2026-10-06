export type ShowcaseScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  technologies: string[];
};

export const showcaseScreens: ShowcaseScreen[] = [
  {
    id: "admin", label: "Dashboard administrativo", title: "Centraliza tu operación.",
    description: "Pedidos, clientes y actividad en una sola vista. Un panel claro para entender qué está pasando y decidir tu siguiente paso.",
    image: "/showcase/admin-mobile.webp", alt: "Mockup de un panel con ventas de ejemplo, pedidos y actividad reciente.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "ecommerce", label: "E-commerce", title: "Convierte visitas en ventas.",
    description: "Una tienda que hace fácil explorar lo que ofreces. Productos bien presentados y un recorrido pensado para acercar al cliente a su compra.",
    image: "/showcase/ecommerce-mobile.webp", alt: "Mockup de una tienda móvil de recursos digitales con categorías y productos de ejemplo.",
    technologies: ["Next.js", "Catálogo", "Checkout"],
  },
  {
    id: "pwa", label: "Producto digital / PWA", title: "Tu producto, donde estés.",
    description: "Experiencias pensadas para cualquier dispositivo. Una interfaz simple, con lo esencial a mano, que puede acompañar a tus clientes incluso sin conexión.",
    image: "/showcase/pwa-mobile.webp", alt: "Mockup de una agenda móvil con tareas, calendario y progreso de ejemplo.",
    technologies: ["React", "PWA", "Mobile-first"],
  },
  {
    id: "automation", label: "Automatización", title: "Menos tareas. Más posibilidades.",
    description: "Menos tareas repetitivas. Más tiempo para crecer. Conecta consultas, registros y respuestas en un flujo que trabaje con las herramientas de tu negocio.",
    image: "/showcase/automation-mobile.webp", alt: "Mockup de un flujo de consulta por WhatsApp, registro de contacto y confirmación automática.",
    technologies: ["APIs", "Workflows", "Integraciones"],
  },
];
