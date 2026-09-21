import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Monitor,
  FileText,
  ClipboardCheck,
  Award,
  Headphones,
} from "lucide-react";
import type { ReactNode } from "react";
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${compact ? "compact" : ""}`}
      aria-label="PROTEXXION ACADEMY — Inicio"
    >
      <Image
        src="/images/logo.webp"
        width={70}
        height={70}
        alt="Logo oficial de PROTEXXION ACADEMY"
        priority
      />
      <span>
        <small>CENTRO DE CAPACITACIÓN</small>
        <strong>
          PROTE<span>XX</span>ION
        </strong>
        <em>ACADEMY</em>
      </span>
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button ${secondary ? "secondary" : ""}`}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      {children}
      <span className="brand-line" />
    </div>
  );
}
export function Photo({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={
        priority
          ? "100vw"
          : "(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
      }
      className={`photo ${className}`}
    />
  );
}
export function Features() {
  return (
    <div className="features">
      {[
        [Monitor, "Modalidad online"],
        [FileText, "Material PDF"],
        [ClipboardCheck, "Evaluaciones en material"],
        [Award, "Certificado demo"],
        [Headphones, "Soporte"],
      ].map(([Icon, label]) => {
        const I = Icon as typeof Monitor;
        return (
          <div key={String(label)}>
            <I size={25} />
            <span>{String(label)}</span>
          </div>
        );
      })}
    </div>
  );
}
export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((t) => (
        <li key={t}>
          <Check size={18} />
          {t}
        </li>
      ))}
    </ul>
  );
}
export function CorporateCTA() {
  return (
    <section className="corporate-cta">
      <div className="container cta-inner">
        <div>
          <Eyebrow>CRECEMOS CON TU EQUIPO</Eyebrow>
          <h2>
            Personas preparadas.
            <br />
            Organizaciones más seguras.
          </h2>
        </div>
        <p>Conversemos sobre las necesidades de capacitación de tu empresa.</p>
        <ButtonLink href="/empresas#propuesta">Solicitar propuesta</ButtonLink>
      </div>
    </section>
  );
}
