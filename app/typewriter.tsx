"use client";

import { useEffect, useRef, useState } from "react";

const phrases = ["Una web que te presente.", "Un catálogo que se comparta.", "Un WhatsApp que conecte."];

export function TypewriterText() {
  const root = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState(phrases[0]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let phrase = 0, length = 0, deleting = false;
    function tick() {
      if (!visible || document.hidden || motion.matches) return;
      const target = phrases[phrase];
      length += deleting ? -1 : 1;
      setText(target.slice(0, length));
      let delay = deleting ? 35 : 65;
      if (length === target.length) { deleting = true; delay = 2300; }
      else if (length === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 350; }
      timer = setTimeout(tick, delay);
    }
    function sync() {
      clearTimeout(timer);
      const enabled = visible && !document.hidden && !motion.matches;
      setAnimating(enabled);
      if (enabled) timer = setTimeout(tick, 150);
      else if (motion.matches) setText(phrases[0]);
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (root.current) observer.observe(root.current);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { clearTimeout(timer); observer.disconnect(); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return <p ref={root} className="typewriter-text" data-animating={animating}>
    <span className="sr-only">Páginas web, catálogos digitales y contacto por WhatsApp.</span>
    <span aria-hidden="true">{text}<i className="typewriter-cursor" /></span>
  </p>;
}
