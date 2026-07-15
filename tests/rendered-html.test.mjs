import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the JSTACK landing contract", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /JSTACK \| MVPs, aplicaciones web y automatización/);
  assert.match(html, /Construimos productos digitales que cambian negocios\./);
  assert.match(html, /MVP Build Sprint/);
  assert.match(html, /4-6 semanas|4 a 6 semanas/);
  assert.match(html, /Alcance compacto/);
  assert.match(html, /Ajustada al alcance/);
  assert.doesNotMatch(html, /4,800|4800|S\/\s*4/i);
  assert.match(html, /Aplicaciones web/);
  assert.match(html, /Automatización de procesos/);
  assert.match(html, /Consultoría y arquitectura/);
  assert.match(html, /Agenda una llamada/);
  assert.match(html, /WhatsApp|Escríbenos por WhatsApp/);
  assert.match(html, /data-analytics-event="cta_booking_click"/);
  assert.match(html, /data-analytics-event="cta_whatsapp_click"/);
  assert.doesNotMatch(html, /Codex is working|Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("keeps landing copy centralized and starter preview disconnected", async () => {
  const [content, page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/landing-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"lucide-react"/);
  assert.match(content, /export type NavigationItem/);
  assert.match(content, /export type Service/);
  assert.match(content, /NEXT_PUBLIC_BOOKING_URL/);
  assert.match(content, /NEXT_PUBLIC_WHATSAPP_URL/);
  assert.match(content, /NEXT_PUBLIC_WHATSAPP_NUMBER/);
  assert.match(page, /const showProjects = process\.env\.NEXT_PUBLIC_SHOW_PROJECTS === "true"/);
  assert.match(layout, /metadataBase/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|Lorem ipsum|caso de éxito/i);
});
