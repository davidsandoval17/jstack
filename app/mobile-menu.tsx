"use client";

import { useRef } from "react";
import { Menu, MessageCircle, MessageSquare } from "lucide-react";
import { navigation, socialLinks, whatsappCta } from "./landing-content";
import { ButtonLink } from "./ui";

export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <details className="mobile-menu" ref={menu}>
      <summary aria-label="Abrir menú"><Menu size={20} aria-hidden="true" /></summary>
      <nav className="mobile-menu-panel" aria-label="Navegación móvil" onClick={event => {
        if (event.target instanceof Element && event.target.closest("a") && menu.current) {
          menu.current.open = false;
        }
      }}>
        {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        <ButtonLink href={whatsappCta.href} variant="whatsapp" event={whatsappCta.analyticsEvent} location="mobile-menu"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</ButtonLink>
        <ButtonLink href={socialLinks[0].href} event="cta_facebook_click" location="mobile-menu"><MessageSquare size={18} aria-hidden="true" /> Facebook</ButtonLink>
      </nav>
    </details>
  );
}
