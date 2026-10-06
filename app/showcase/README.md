# ProductPhoneShowcase

Experimento para revisar antes de integrarlo a `master`.

La sección se ubica entre servicios y proceso. `ProductPhoneShowcase` recibe
`screens: ShowcaseScreen[]` y `contactHref`. El contenido se configura en
`screens.ts`; el dispositivo WebGL independiente está en `phone-scene.ts`.

## Imágenes

Las cuatro imágenes en `public/showcase` son mockups originales de concepto,
con datos ficticios. No representan trabajos entregados ni resultados de clientes.
Sustituirlas por capturas reales conservando sus nombres o actualizar `screens.ts`.
Usar WebP/AVIF de 390 × 800, sin barra de estado del sistema ni marco del teléfono.
Actualizar el texto alternativo, tecnologías y descripción con cada captura.

## Comportamiento

- Escritorio: frame sticky, GSAP ScrollTrigger con scrub, teléfono Three.js
  y crossfade de texturas. Rotaciones de aproximadamente 7–10 grados.
- Hasta 820 px: dispositivo 2D sticky con crossfade; no se carga el módulo Three.js.
- Movimiento reducido, error de carga o ausencia de WebGL: galería 2D completa.
- Sin JavaScript: se conservan imágenes, títulos, textos y enlaces de contacto
  mediante HTML renderizado en servidor.
- Los botones 01–04 permiten saltar entre demos con teclado o pointer.

GSAP y el módulo 3D se cargan al acercarse a la sección. DPR limitado a 1.5,
loop de aproximadamente 30 fps sólo mientras la sección está visible; se pausa
al ocultar la pestaña. Al desmontar se liberan texturas, materiales, geometrías,
entorno, renderer, contexto, observers y listeners.

## Revisión

`npm run lint`, `npm test` y `npm run build:vercel`.
Revisar scroll y botones en escritorio/móvil, fallback de movimiento reducido,
ausencia de overflow horizontal y pausa del canvas fuera de la sección.
La publicación en producción requiere aprobar este experimento.
