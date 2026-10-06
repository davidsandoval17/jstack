import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Code2, MessageSquare, Globe, Mail, MessageCircle, PanelsTopLeft, Search, UploadCloud } from "lucide-react";
import { contactEmail, contactWhatsappDisplay, emailHref, faqs, footer, hero, navigation, primaryCta, processSteps, services, socialLinks, technologies, whatsappCta, whatsappLink } from "./landing-content";
import { Brand, ButtonLink, Container, SectionHeading } from "./ui";
import { MobileMenu } from "./mobile-menu";

export const metadata: Metadata = {
  title: { absolute: "JSTACK | Presencia digital para tu negocio" },
  description: "David Sandoval te ayuda a darle presencia digital a tu negocio con páginas web, catálogos y contacto por WhatsApp. Atención directa en Perú y Latinoamérica.",
  openGraph: {
    title: "JSTACK | Tu negocio en internet. Sin complicarte.",
    description: "Páginas web, catálogos digitales y tus redes conectadas. Hablemos por WhatsApp.",
    type: "website",
    locale: "es_PE",
  },
};

function ArrowIcon() { return <ArrowUpRight size={16} aria-hidden="true" />; }
function WhatsAppIcon() { return <MessageCircle size={18} aria-hidden="true" />; }

function Header() {
  return <header className="site-header"><Container className="nav-shell">
    <Brand />
    <nav className="desktop-nav" aria-label="Navegación principal">
      {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
    </nav>
    <ButtonLink href={primaryCta.href} variant="whatsapp" size="sm" event={primaryCta.analyticsEvent} location="header"><WhatsAppIcon /> Hablemos por WhatsApp</ButtonLink>
    <MobileMenu />
  </Container></header>;
}

function HeroSection() {
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="hero-grid" aria-hidden="true" />
    <Container className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow"><span />{hero.eyebrow}</p>
        <h1 id="hero-title">{hero.title}</h1>
        <p className="hero-lead">{hero.description}</p>
        <div className="hero-actions">
          <ButtonLink href={primaryCta.href} variant="whatsapp" event={primaryCta.analyticsEvent} location="hero"><WhatsAppIcon />{primaryCta.label}</ButtonLink>
          <ButtonLink href="#servicios" variant="secondary">Ver cómo puedo ayudarte <ArrowIcon /></ButtonLink>
        </div>
        <div className="hero-support" aria-label="Servicios principales">{hero.support.map(item => <span key={item}>{item}</span>)}</div>
        <p className="hero-coverage">{hero.coverage}</p>
      </div>
      <aside className="presence-card" aria-labelledby="presence-title">
        <p className="eyebrow light"><span />UN PRIMER PASO SIMPLE</p>
        <h2 id="presence-title">Que te encuentren.<br />Que te conozcan.<br />Que te escriban.</h2>
        <ul className="presence-benefits">
          <li><Globe size={22} aria-hidden="true" /><div><strong>Un enlace para tu negocio</strong><p>Tu información, servicios y contactos.</p></div></li>
          <li><PanelsTopLeft size={22} aria-hidden="true" /><div><strong>Listo para compartir</strong><p>Desde el celular, en tus redes y por WhatsApp.</p></div></li>
          <li><MessageCircle size={22} aria-hidden="true" /><div><strong>Una conversación para empezar</strong><p>Lo vemos directamente contigo, paso a paso.</p></div></li>
        </ul>
        <a className="presence-contact" href={whatsappCta.href} data-analytics-event="cta_whatsapp_click" data-analytics-location="hero-card"><WhatsAppIcon /><span>Escríbeme al<strong>{contactWhatsappDisplay}</strong></span><ArrowIcon /></a>
      </aside>
    </Container>
  </section>;
}

function ServicesSection() {
  const icons = [Globe, PanelsTopLeft, MessageCircle];
  return <section id="servicios" className="section-pad services-section"><Container>
    <SectionHeading eyebrow="Qué puedo hacer por ti" title="Empecemos con lo que tu negocio necesita hoy." description="No necesitas tener todo resuelto. Elegimos una primera versión útil para mostrar tu negocio y facilitar el contacto con tus clientes." />
    <div className="services-grid presence-services">
      {services.map((service, index) => {
        const Icon = icons[index];
        return <article className={`service-card ${service.featured ? "service-featured" : ""}`} key={service.title}>
          <div className="service-head"><span>0{index + 1}</span><i className="service-icon" aria-hidden="true"><Icon size={20} /></i><small>{service.kicker}</small></div>
          <h3>{service.title}</h3><p>{service.description}</p>
          <ul className="service-includes">{service.includes.map(item => <li key={item}><CheckCircle2 size={17} aria-hidden="true" />{item}</li>)}</ul>
          <ButtonLink href={whatsappLink(service.message)} variant={service.featured ? "whatsapp" : "ghost"} event="cta_whatsapp_click" location={`service-${index + 1}`}>{service.cta}<ArrowIcon /></ButtonLink>
        </article>;
      })}
    </div>
    <p className="process-note">Precio y fecha de entrega acordados antes de comenzar. Las funciones adicionales y los costos recurrentes se detallan en tu propuesta.</p>
  </Container></section>;
}

function ProcessSection() {
  const icons = [MessageCircle, Search, Code2, UploadCloud];
  return <section id="proceso" className="section-pad process-section"><Container>
    <SectionHeading eyebrow="Cómo empezamos" title="Del primer mensaje a tu negocio en línea." description="Para avanzar rápido, nos concentramos en lo esencial. Tú conoces tu negocio; yo me encargo de convertir esa información en una presencia digital clara." />
    <div className="process-line presence-process">{processSteps.map((step, index) => {
      const Icon = icons[index];
      return <article key={step.order}><div className="process-meta"><span>{step.order}</span><i className="process-icon" aria-hidden="true"><Icon size={21} /></i></div><h3>{step.title}</h3><p>{step.description}</p></article>;
    })}</div>
  </Container></section>;
}

function AboutSection() {
  return <section id="nosotros" className="section-pad about-section"><Container className="about-layout">
    <div className="about-mark" aria-hidden="true"><span>J</span><small>SOFTWARE STUDIO</small></div>
    <div><p className="eyebrow"><span />LA PERSONA DETRÁS DE JSTACK</p><h2>Soy David Sandoval.<br />Hablemos de tu negocio.</h2>
      <p>Soy desarrollador full stack y estoy detrás de JSTACK. Te ayudo a convertir lo que tu negocio necesita en una web o herramienta fácil de usar. Hablas directamente conmigo para definir, revisar y entregar tu proyecto.</p>
      <p>Trabajo con Next.js, TypeScript, NestJS y PostgreSQL. Si más adelante necesitas una aplicación o automatizar un proceso, también podemos evaluar ese siguiente paso.</p>
      <div className="about-values"><span>Atención directa</span><span>Alcance claro</span><span>Recibos por honorarios</span></div>
      <a className="profile-link" href={socialLinks[1].href}>Conoce mi perfil en LinkedIn <ArrowIcon /></a>
    </div>
  </Container></section>;
}

function TechnologySection() {
  return <section id="tecnologia" className="technology-section"><Container className="technology-layout">
    <div><p className="section-index">[ EXPERIENCIA TÉCNICA ]</p><h2>Una base para empezar y seguir creciendo.</h2><p>Uso herramientas web modernas y adapto la solución a tu negocio. Empezamos sencillo y evaluamos nuevas funciones cuando las necesites.</p></div>
    <div className="tech-cloud" aria-label="Tecnologías y capacidades">{technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
  </Container></section>;
}

function FaqSection() {
  return <section id="preguntas" className="section-pad"><Container>
    <SectionHeading eyebrow="Antes de empezar" title="Tus dudas, con respuestas claras." description="Estos son los puntos que coordinamos para trabajar con tranquilidad." />
    <div className="faq-list">{faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
  </Container></section>;
}

function FinalCta() {
  return <section id="contacto" className="cta-section"><Container className="cta-layout">
    <div><p className="eyebrow light"><span />DAMOS EL PRIMER PASO</p><h2>Cuéntame qué hace tu negocio. Lo demás lo vemos juntos.</h2></div>
    <div className="cta-copy"><p>Escríbeme por WhatsApp con el nombre de tu negocio y lo que quieres mostrar. Revisamos una opción sencilla para comenzar.</p>
      <div className="contact-actions">
        <ButtonLink href={whatsappCta.href} variant="whatsapp" event="cta_whatsapp_click" location="final"><WhatsAppIcon />{contactWhatsappDisplay}</ButtonLink>
        <ButtonLink href={socialLinks[0].href} variant="light" event="cta_facebook_click" location="final"><MessageSquare size={18} aria-hidden="true" />Hablemos por Facebook</ButtonLink>
      </div>
      <a className="contact-email" href={emailHref}><Mail size={18} aria-hidden="true" />{contactEmail}</a>
      <small>Atención directa · Cuento con RUC y emito recibos por honorarios · {footer.coverage}</small>
    </div>
  </Container>
  <Container><nav className="social-links" aria-label="Redes sociales de JSTACK">{socialLinks.map(item => <a key={item.label} href={item.href}><strong>{item.label}<ArrowIcon /></strong><span>{item.description}</span></a>)}</nav></Container>
  </section>;
}

function Footer() {
  return <footer><Container className="footer-layout">
    <Brand light /><p>{footer.statement}</p>
    <nav aria-label="Navegación de pie de página">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <div><a href={whatsappCta.href}>WhatsApp {contactWhatsappDisplay}</a><a href={emailHref}>{contactEmail}</a><span>{footer.coverage}</span><small>{footer.legal}</small></div>
  </Container></footer>;
}

function MobileContactBar() {
  return <nav className="mobile-contact-bar" aria-label="Acciones rápidas de contacto">
    <a href={whatsappCta.href} data-analytics-event="cta_whatsapp_click" data-analytics-location="mobile-sticky"><WhatsAppIcon />WhatsApp</a>
    <a href={socialLinks[0].href} data-analytics-event="cta_facebook_click" data-analytics-location="mobile-sticky"><MessageSquare size={17} aria-hidden="true" />Facebook<ArrowIcon /></a>
  </nav>;
}

export default function Home() {
  return <main><Header /><HeroSection /><ServicesSection /><ProcessSection /><AboutSection /><TechnologySection /><FaqSection /><FinalCta /><Footer /><MobileContactBar /></main>;
}
