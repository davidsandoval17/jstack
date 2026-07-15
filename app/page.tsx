import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  CalendarDays,
  CheckCircle2,
  Compass,
  Code2,
  Layers3,
  ListChecks,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UploadCloud,
  Workflow,
} from "lucide-react";
import {
  contactWhatsapp,
  footer,
  hero,
  navigation,
  pillars,
  primaryCta,
  problems,
  processSteps,
  projectDemos,
  services,
  sprint,
  technologies,
  whatsappCta,
} from "./landing-content";
import { Brand, ButtonLink, Container, SectionHeading } from "./ui";

export const metadata: Metadata = {
  title: "JSTACK | MVPs, aplicaciones web y automatización",
  description:
    "JSTACK es un Software Studio para startups y negocios en crecimiento. Construimos MVPs, aplicaciones web y automatizaciones claras, sólidas y escalables.",
  openGraph: {
    title: "JSTACK · Software Studio",
    description:
      "Convertimos prototipos y procesos definidos en productos digitales funcionales y listos para crecer.",
    type: "website",
    locale: "es_PE",
  },
};

const showProjects = process.env.NEXT_PUBLIC_SHOW_PROJECTS === "true";

function ArrowIcon() {
  return <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />;
}

function WhatsAppIcon() {
  return <MessageCircle size={18} strokeWidth={2.4} aria-hidden="true" />;
}

const serviceIcons = [Rocket, PanelsTopLeft, Workflow, Compass];
const processIcons = [Search, ListChecks, Palette, Code2, Bug, UploadCloud, RefreshCw];

function Header() {
  return (
    <header className="site-header">
      <Container className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ButtonLink
          href={primaryCta.href}
          size="sm"
          event={primaryCta.analyticsEvent}
          location="header"
        >
          {primaryCta.label}
          <ArrowIcon />
        </ButtonLink>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú">
            <Menu size={20} strokeWidth={2.4} aria-hidden="true" />
          </summary>
          <div className="mobile-menu-panel">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <ButtonLink
              href={primaryCta.href}
              event={primaryCta.analyticsEvent}
              location="mobile-menu"
            >
              {primaryCta.label}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href={whatsappCta.href}
              variant="whatsapp"
              event={whatsappCta.analyticsEvent}
              location="mobile-menu"
            >
              <WhatsAppIcon />
              WhatsApp
            </ButtonLink>
          </div>
        </details>
      </Container>
    </header>
  );
}

function HeroVisual() {
  return (
    <div className="product-visual" aria-label="Visual conceptual de flujo de producto y arquitectura">
      <div className="visual-toolbar">
        <span />
        <span />
        <span />
        <strong>FLOW ARCHITECTURE</strong>
      </div>
      <div className="visual-stage">
        <span className="energy-ring ring-one" />
        <span className="energy-ring ring-two" />
        <div className="visual-module module-input">
          <Layers3 size={18} strokeWidth={2.2} aria-hidden="true" />
          <small>INPUT</small>
          <strong>Prototipo</strong>
          <span>Flujo definido</span>
        </div>
        <div className="visual-module module-scope">
          <Workflow size={18} strokeWidth={2.2} aria-hidden="true" />
          <small>01</small>
          <strong>Alcance</strong>
          <span>1 flujo principal</span>
        </div>
        <div className="visual-module module-build">
          <Rocket size={18} strokeWidth={2.2} aria-hidden="true" />
          <small>02</small>
          <strong>Producto</strong>
          <span>Web app desplegada</span>
        </div>
        <div className="visual-module module-output">
          <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />
          <small>OUTPUT</small>
          <strong>Validación</strong>
          <span>Usuarios reales</span>
        </div>
        <span className="flow-path path-one" />
        <span className="flow-path path-two" />
        <span className="flow-path path-three" />
        <span className="moving-dot dot-one" />
        <span className="moving-dot dot-two" />
        <span className="moving-dot dot-three" />
      </div>
      <div className="visual-metrics">
        <div>
          <TimerReset size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>4-6</span>
          <small>semanas</small>
        </div>
        <div>
          <PanelsTopLeft size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>8</span>
          <small>pantallas base</small>
        </div>
        <div>
          <ShieldCheck size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>15</span>
          <small>días garantía</small>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <Container className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title">{hero.title}</h1>
          <p className="hero-lead">{hero.description}</p>
          <div className="hero-actions">
            <ButtonLink
              href={primaryCta.href}
              event={primaryCta.analyticsEvent}
              location="hero"
            >
              {primaryCta.label}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href="#servicios"
              variant="secondary"
              event="cta_services_click"
              location="hero"
            >
              Ver servicios
            </ButtonLink>
          </div>
          <div className="hero-support" aria-label="Capacidades principales">
            {hero.support.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="hero-coverage">{hero.coverage}</p>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problema" className="section-pad problem-section">
      <Container>
        <div className="split-heading">
          <p className="section-index">[ De idea o proceso a producto ]</p>
          <div>
            <h2>El software no empieza con código. Empieza con claridad.</h2>
            <p>
              Una idea, un prototipo o un proceso manual necesitan prioridades claras,
              una experiencia funcional, decisiones técnicas proporcionadas y un alcance
              que pueda validarse sin construir de más.
            </p>
          </div>
        </div>
        <div className="problem-grid">
          {problems.map((problem) => (
            <article key={problem.order}>
              <span>{problem.order}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <small>{problem.symptom}</small>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="section-pad solution-section">
      <Container className="solution-layout">
        <div className="solution-sticky">
          <p className="eyebrow light">
            <span />
            Un solo equipo
          </p>
          <h2>Del problema al producto, sin separar negocio, diseño y tecnología.</h2>
          <p>
            Analizamos el objetivo, definimos el flujo que importa, diseñamos una
            experiencia funcional y construimos una base técnica proporcional al momento
            del negocio.
          </p>
        </div>
        <div className="pillar-list">
          {pillars.map(([title, description, result], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <strong>{result}</strong>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="section-pad services-section">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Construimos lo que tu negocio necesita para avanzar."
          description="Desde una primera versión validable hasta una plataforma a medida o la automatización de una operación, JSTACK adapta el alcance al problema y al momento del negocio."
        />
        <div className="services-grid">
          {services.map((service, index) => {
            const ServiceIcon = serviceIcons[index] ?? Sparkles;
            return (
            <article className={`service-card ${service.featured ? "service-featured" : ""}`} key={service.order}>
              <div className="service-head">
                <span>{service.order}</span>
                <i className="service-icon" aria-hidden="true"><ServiceIcon size={20} strokeWidth={2.1} /></i>
                <small>{service.kicker}</small>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>{service.meta}</strong>
              <div className="service-detail">
                <div>
                  <b>Encaje</b>
                  <p>{service.fit}</p>
                </div>
                <div>
                  <b>Resultado</b>
                  <p>{service.outcome}</p>
                </div>
                <div>
                  <b>Límite</b>
                  <p>{service.limit}</p>
                </div>
              </div>
              <ButtonLink
                href={service.cta.href}
                variant={service.featured ? "primary" : "ghost"}
                event={service.cta.analyticsEvent}
                location={service.cta.analyticsLocation}
              >
                {service.cta.label}
                <ArrowIcon />
              </ButtonLink>
            </article>
          )})}
        </div>
      </Container>
    </section>
  );
}

function SprintSection() {
  return (
    <section id="mvp-sprint" className="section-pad sprint-section">
      <Container>
        <div className="sprint-shell">
          <div className="sprint-copy">
            <p className="eyebrow light">
              <span />
              Oferta principal
            </p>
            <h2>{sprint.title}</h2>
            <p>{sprint.description}</p>
            <ButtonLink
              href={sprint.cta.href}
              variant="light"
              event={sprint.cta.analyticsEvent}
              location="mvp"
            >
              <CalendarDays size={18} strokeWidth={2.3} aria-hidden="true" />
              {sprint.cta.label}
              <ArrowIcon />
            </ButtonLink>
          </div>
          <div className="sprint-panel">
            <div className="scope-grid" aria-label="Alcance del sprint">
              {sprint.scope.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="payment-grid">
              {sprint.payment.map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="qualification-grid">
            {sprint.qualification.map(([label, value]) => (
              <article className={label.startsWith("Sí") ? "fit-yes" : "fit-no"} key={value}>
                <span>{label}</span>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="proceso" className="section-pad process-section">
      <Container>
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso claro para reducir incertidumbre y avanzar con criterio."
          description="Cada etapa convierte decisiones abiertas en entregables concretos. El objetivo no es acumular documentación, sino mantener alineados negocio, experiencia y tecnología hasta el lanzamiento."
        />
        <div className="process-line">
          {processSteps.map((step, index) => {
            const ProcessIcon = processIcons[index] ?? Workflow;
            return (
            <article key={step.order}>
              <div className="process-meta">
                <span>{step.order}</span>
                <i className="process-icon" aria-hidden="true">
                  <ProcessIcon size={21} strokeWidth={2.1} />
                </i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          )})}
        </div>
        <p className="process-note">
          Los cambios que modifican el flujo, los roles, las pantallas o las integraciones
          se evalúan como cambio de alcance antes de incorporarse.
        </p>
      </Container>
    </section>
  );
}

function ProjectsSection() {
  if (!showProjects) {
    return null;
  }

  return (
    <section id="proyectos" className="section-pad projects-section">
      <Container>
        <SectionHeading
          eyebrow="Productos demostrativos"
          title="Producto, no solo código."
          description="Explora cómo JSTACK convierte flujos de negocio en interfaces claras, operaciones medibles y bases técnicas preparadas para crecer."
        />
        <div className="projects-grid">
          {projectDemos.map((demo) => (
            <article key={demo.title}>
              <div className="demo-visual" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <small>{demo.status}</small>
              <h3>{demo.title}</h3>
              <p>{demo.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechnologySection() {
  return (
    <section id="tecnologia" className="technology-section">
      <Container className="technology-layout">
        <div>
          <p className="section-index">[ Tecnología con propósito ]</p>
          <h2>Una base moderna, elegida por el problema.</h2>
          <p>
            Trabajamos con tecnologías web actuales para construir productos rápidos,
            mantenibles y desplegables. El stack se selecciona según el flujo, la
            integración y la etapa del negocio.
          </p>
        </div>
        <div className="tech-cloud" aria-label="Tecnologías y capacidades">
          {technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="nosotros" className="section-pad about-section">
      <Container className="about-layout">
        <div className="about-mark" aria-hidden="true">
          <span>J</span>
          <small>SOFTWARE STUDIO</small>
        </div>
        <div>
          <p className="eyebrow">
            <span />
            Sobre JSTACK
          </p>
          <h2>Un software studio cercano, con criterio de producto.</h2>
          <p>
            JSTACK combina análisis de negocio, diseño funcional y desarrollo full stack
            para construir soluciones claras y mantenibles. Trabajas directamente con
            quien analiza, diseña y construye la solución: menos capas, decisiones más
            rápidas y comunicación transparente.
          </p>
          <div className="about-values">
            <span>Claridad</span>
            <span>Propiedad</span>
            <span>Criterio</span>
            <span>Evolución</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contacto" className="cta-section">
      <Container className="cta-layout">
        <div>
          <p className="eyebrow light">
            <span />
            Hablemos de tu proyecto
          </p>
          <h2>Convirtamos tu próximo avance en un producto digital.</h2>
        </div>
        <div className="cta-copy">
          <p>
            Cuéntanos qué prototipo, proceso o problema necesitas convertir en una
            solución funcional. En una llamada breve revisaremos el encaje, el alcance
            inicial y el siguiente paso más útil.
          </p>
          <ButtonLink
            href={primaryCta.href}
            variant="light"
            event={primaryCta.analyticsEvent}
            location="final"
            >
            <CalendarDays size={18} strokeWidth={2.3} aria-hidden="true" />
            {primaryCta.label}
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink
            href={whatsappCta.href}
            variant="whatsapp"
            event={whatsappCta.analyticsEvent}
            location="final"
          >
            <WhatsAppIcon />
            {whatsappCta.label}
          </ButtonLink>
          <small>Llamada de diagnóstico de 20-30 minutos · Sin compromiso · Perú y Latinoamérica</small>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Container className="footer-layout">
        <Brand light />
        <p>{footer.statement}</p>
        <nav aria-label="Navegación de pie de página">
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Cómo trabajamos</a>
          <a href="#nosotros">Sobre JSTACK</a>
          <Link href="/design-system">Design system</Link>
        </nav>
        <div>
          <a href={primaryCta.href}>{primaryCta.label}</a>
          <a href={whatsappCta.href}>WhatsApp {contactWhatsapp}</a>
          <span>{footer.coverage}</span>
          <small>{footer.legal}</small>
        </div>
      </Container>
    </footer>
  );
}

function MobileContactBar() {
  return (
    <nav className="mobile-contact-bar" aria-label="Acciones rápidas de contacto">
      <a
        href={whatsappCta.href}
        data-analytics-event={whatsappCta.analyticsEvent}
        data-analytics-location="mobile-sticky"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={primaryCta.href}
        data-analytics-event={primaryCta.analyticsEvent}
        data-analytics-location="mobile-sticky"
      >
        <CalendarDays size={17} strokeWidth={2.3} aria-hidden="true" />
        Agenda
        <ArrowIcon />
      </a>
    </nav>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <SprintSection />
      <ProcessSection />
      <ProjectsSection />
      <TechnologySection />
      <AboutSection />
      <FinalCta />
      <Footer />
      <MobileContactBar />
    </main>
  );
}
