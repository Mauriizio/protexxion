import { Photo, Eyebrow } from "./ui";
import type { ReactNode } from "react";
export function Hero({
  image,
  title,
  description,
  eyebrow,
  children,
  large = false,
}: {
  image: string;
  title: ReactNode;
  description: string;
  eyebrow: string;
  children?: ReactNode;
  large?: boolean;
}) {
  return (
    <section className={`hero ${large ? "large-hero" : "compact-hero"}`}>
      <Photo
        src={image}
        alt="Formación profesional en seguridad privada"
        priority
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
