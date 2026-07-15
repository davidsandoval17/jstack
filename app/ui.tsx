import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`container ${className}`}>{children}</div>; }
export function Brand({ light = false }: { light?: boolean }) { return <Link className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="JSTACK Software Studio, inicio">JSTACK<span>.</span><small>SOFTWARE STUDIO</small></Link>; }
export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  event,
  location,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "light" | "ghost";
  size?: "sm" | "md";
  event?: string;
  location?: string;
}) { return <a className={`button button-${variant} button-${size}`} href={href} data-analytics-event={event} data-analytics-location={location}>{children}</a>; }
export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="section-heading"><p className="section-index">[ {eyebrow.toUpperCase()} ]</p><div><h2>{title}</h2><p>{description}</p></div></div>; }
