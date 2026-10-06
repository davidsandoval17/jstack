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
  assert.match(html, /JSTACK \| Presencia digital para tu negocio/);
  assert.match(html, /Tu negocio en internet\. Sin complicarte\./);
  assert.match(html, /Una web para tu negocio/);
  assert.match(html, /Tu catálogo en un enlace/);
  assert.match(html, /David Sandoval/);
  assert.match(html, /recibos por honorarios/i);
  assert.match(html, /\+51 903 081 410/);
  assert.match(html, /https:\/\/wa\.me\/51903081410/);
  assert.match(html, /mailto:jsstack1993@gmail\.com/);
  assert.match(html, /https:\/\/www\.facebook\.com\/profile\.php\?id=61594907201063/);
  assert.match(html, /https:\/\/www\.tiktok\.com\/@js_stack/);
  assert.match(html, /https:\/\/www\.youtube\.com\/channel\/UClDNhSpIB0QooOdFjaxcZUQ/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/david-sandoval-645652441\//);
  assert.match(html, /data-analytics-event="cta_whatsapp_click"/);
  assert.match(html, /data-analytics-event="cta_facebook_click"/);
  assert.doesNotMatch(html, /MVP Build Sprint|Agenda una llamada|hola@jstack\.dev|4-6 semanas/);
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
  assert.match(content, /NEXT_PUBLIC_WHATSAPP_URL/);
  assert.match(content, /NEXT_PUBLIC_WHATSAPP_NUMBER/);
  assert.match(layout, /metadataBase/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|Lorem ipsum|caso de éxito/i);
});
