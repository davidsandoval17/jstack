"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";
import { SocialIcon } from "./social-icons";
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
        <ButtonLink href={whatsappCta.href} variant="whatsapp" event={whatsappCta.analyticsEvent} location="mobile-menu"><SocialIcon name="whatsapp" /> WhatsApp</ButtonLink>
        <ButtonLink href={socialLinks[0].href} event="cta_facebook_click" location="mobile-menu"><SocialIcon name="facebook" /> Facebook</ButtonLink>
      </nav>
    </details>
  );
}
