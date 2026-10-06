"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ShowcaseScreen } from "./screens";
import "./showcase.css";

type Mode = "static" | "mobile" | "desktop";

function DeviceFrame({ screen }: { screen: ShowcaseScreen }) {
  return <div className="showcase-device"><div className="showcase-device-top" aria-hidden="true"><i /></div>
    {/* A native image preserves the server-rendered fallback without JavaScript. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={screen.image} alt={screen.alt} width={390} height={800} loading="lazy" decoding="async" />
    <div className="showcase-device-bottom" aria-hidden="true"><i /></div>
  </div>;
}

export function ProductPhoneShowcase({ screens, contactHref }: { screens: ShowcaseScreen[]; contactHref: string }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sceneHost = useRef<HTMLDivElement>(null);
  const stories = useRef<HTMLOListElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);
  const screenLayers = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("static");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current || !screens.length) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 821px)");
    let disposed = false;
    let revision = 0;
    let ready = false;
    let cleanupRuntime = () => {};

    async function initialize() {
      const currentRevision = ++revision;
      cleanupRuntime();
      cleanupRuntime = () => {};
      setMode("static");
      if (motion.matches || !ready) return;
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (disposed || currentRevision !== revision) return;
        gsap.registerPlugin(ScrollTrigger);
        let phone: Awaited<ReturnType<typeof import("./phone-scene")["createPhoneScene"]>> | undefined;
        const runtimeMode: Mode = desktop.matches ? "desktop" : "mobile";
        if (runtimeMode === "desktop") {
          const { createPhoneScene } = await import("./phone-scene");
          if (disposed || currentRevision !== revision || !sceneHost.current) return;
          phone = await createPhoneScene(sceneHost.current, screens.map(screen => screen.image), () => {
            ++revision;
            cleanupRuntime();
            cleanupRuntime = () => {};
            setMode("static");
          });
          if (disposed || currentRevision !== revision) { phone?.dispose(); return; }
          // No WebGL: retain the full 2D gallery, including every caption.
          if (!phone) return;
        }
        if (!root.current || !stories.current || !stage.current) { phone?.dispose(); return; }
        cleanupRuntime = () => { phone?.dispose(); };
        setMode(runtimeMode);
        const pose = { progress: 0 };
        const layers = Array.from(screenLayers.current?.children ?? []) as HTMLElement[];
        let selected = -1;
        function paint() {
          const position = Math.max(0, Math.min(screens.length - 1, pose.progress));
          const index = Math.min(screens.length - 1, Math.floor(position + .5));
          if (index !== selected) { selected = index; setActive(index); }
          phone?.update(position);
          const base = Math.floor(position);
          const blend = Math.max(0, Math.min(1, (position - base - .22) / .56));
          const dissolve = blend * blend * (3 - 2 * blend);
          layers.forEach((layer, i) => { layer.style.opacity = i === base ? "1" : i === base + 1 ? String(dissolve) : "0"; });
          if (progressBar.current) progressBar.current.style.transform = `scaleX(${(position + 1) / screens.length})`;
        }
        const timeline = gsap.to(pose, {
          progress: screens.length - 1, ease: "none", onUpdate: paint,
          scrollTrigger: {
            id: "jstack-phone-showcase", trigger: stories.current,
            start: () => runtimeMode === "desktop"
              ? `top+=${(stories.current?.firstElementChild as HTMLElement)?.offsetHeight / 2} center`
              : `top ${Number.parseFloat(getComputedStyle(stage.current!).top) + stage.current!.offsetHeight + 24}px`,
            end: () => runtimeMode === "desktop"
              ? `bottom-=${(stories.current?.lastElementChild as HTMLElement)?.offsetHeight / 2} center`
              : `bottom-=${(stories.current?.lastElementChild as HTMLElement)?.offsetHeight} ${Number.parseFloat(getComputedStyle(stage.current!).top) + stage.current!.offsetHeight + 24}px`,
            scrub: .45, invalidateOnRefresh: true,
          },
        });
        const visibility = new IntersectionObserver(([entry]) => { phone?.setVisible(entry.isIntersecting); }, { threshold: 0 });
        visibility.observe(root.current);
        const sectionBounds = root.current.getBoundingClientRect();
        phone?.setVisible(sectionBounds.top < innerHeight && sectionBounds.bottom > 0);
        const resized = new ResizeObserver(() => ScrollTrigger.refresh());
        resized.observe(root.current);
        paint();
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        cleanupRuntime = () => {
          cancelAnimationFrame(frame);
          visibility.disconnect(); resized.disconnect();
          timeline.scrollTrigger?.kill(); timeline.kill(); phone?.dispose();
          layers.forEach(layer => { layer.style.opacity = ""; });
        };
      } catch {
        if (!disposed && currentRevision === revision) { cleanupRuntime(); setMode("static"); }
      }
    }
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || ready) return;
      ready = true; near.disconnect(); void initialize();
    }, { rootMargin: "600px 0px" });
    near.observe(root.current);
    const changed = () => { void initialize(); };
    motion.addEventListener("change", changed); desktop.addEventListener("change", changed);
    return () => {
      disposed = true; ++revision; near.disconnect(); cleanupRuntime();
      motion.removeEventListener("change", changed); desktop.removeEventListener("change", changed);
    };
  }, [screens]);

  function goTo(index: number) {
    const item = stories.current?.children[index] as HTMLElement | undefined;
    if (!item) return;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (mode === "mobile" && stage.current) {
      const anchor = Number.parseFloat(getComputedStyle(stage.current).top) + stage.current.offsetHeight + 24;
      window.scrollTo({ top: window.scrollY + item.getBoundingClientRect().top - anchor, behavior });
    } else item.scrollIntoView({ behavior, block: "center" });
  }

  if (!screens.length) return null;
  return <section ref={root} id="demos" className="product-showcase" data-mode={mode} aria-labelledby="showcase-title">
    <div className="container">
      <div className="showcase-heading"><div><p className="eyebrow light"><span />IDEAS QUE TOMAN FORMA</p>
        <h2 id="showcase-title">Lo que imaginas.<br /><span>Lo que podemos crear.</span></h2></div>
        <div><p>Una muestra de cómo puede sentirse tu próximo producto digital. Cuatro conceptos, pensados desde el celular.</p>
          <span className="showcase-demo-label">MOCKUPS DE CONCEPTO · JSTACK</span></div>
      </div>
      <div className="showcase-layout">
        <div ref={stage} className="showcase-stage" aria-hidden={mode === "static" ? "true" : undefined}>
          <div className="showcase-device-slot">
            <div ref={sceneHost} className="showcase-canvas" aria-hidden="true" />
            <div ref={screenLayers} className="showcase-mobile-screens" aria-hidden="true">{screens.map(screen => <div key={screen.id}><DeviceFrame screen={screen} /></div>)}</div>
          </div>
          <div className="showcase-stage-caption" aria-hidden="true"><span>{String(active + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span><span>{screens[active].label}</span></div>
          <nav className="showcase-controls" aria-label="Explorar demos">{screens.map((screen, index) => <button type="button" key={screen.id} onClick={() => goTo(index)} aria-label={`Ver demo ${index + 1}: ${screen.label}`} aria-current={active === index ? "step" : undefined}>{String(index + 1).padStart(2, "0")}</button>)}</nav>
          <div className="showcase-progress" aria-hidden="true"><span ref={progressBar} /></div>
          <p className="showcase-scroll-cue"><ArrowDown size={14} aria-hidden="true" /> Desliza para explorar</p>
        </div>
        <ol ref={stories} className="showcase-stories">{screens.map((screen, index) => <li className="showcase-step" id={`demo-${screen.id}`} key={screen.id} data-active={index === active}>
          <div className="showcase-step-copy"><p className="showcase-step-label"><span>{String(index + 1).padStart(2, "0")}</span>{screen.label}</p>
            <h3>{screen.title}</h3><p className="showcase-description">{screen.description}</p>
            <ul className="showcase-technologies" aria-label="Tecnologías y capacidades">{screen.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
            <a href={contactHref} className="showcase-contact" data-analytics-event="cta_whatsapp_click" data-analytics-location={`showcase-${screen.id}`}>Hablemos de tu idea <ArrowUpRight size={17} aria-hidden="true" /></a>
            <small className="showcase-concept-note">Interfaz de ejemplo. Datos ficticios.</small>
          </div>
          <div className="showcase-static-device"><DeviceFrame screen={screen} /></div>
        </li>)}</ol>
      </div>
    </div>
  </section>;
}
