import Link from "next/link";
import {
  ArrowUpRight,
  Users,
  FileText,
  Monitor,
  Award,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  ButtonLink,
  CorporateCTA,
  Eyebrow,
  Features,
  Photo,
} from "@/components/ui";
import { photos } from "@/data/site";
const shortcuts = [
  {
    title: "Cursos destacados",
    text: "Formación OS10 para tu desarrollo profesional.",
    image: photos.field,
    href: "/cursos",
    icon: ShieldCheck,
  },
  {
    title: "Capacitación para empresas",
    text: "Formación pensada para las necesidades de tu equipo.",
    image: photos.monitor,
    href: "/empresas",
    icon: Users,
  },
  {
    title: "Tu aula virtual",
    text: "Tus módulos, materiales y avance en un solo lugar.",
    image: photos.access,
    href: "/aula-virtual",
    icon: Monitor,
  },
  {
    title: "Formación con propósito",
    text: "Conoce nuestra visión de la capacitación en seguridad.",
    image: photos.team,
    href: "/nosotros",
    icon: BookOpen,
  },
];
export function Home() {
  return (
    <>
      <section className="hero home-hero">
        <Photo
          src={photos.classroom}
          alt="Capacitación de guardias de seguridad en aula"
          priority
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <Eyebrow>DISCIPLINA · CONOCIMIENTO · OPORTUNIDADES</Eyebrow>
          <h1>
            Capacitación OS10
            <br />
            <strong>
              para un Chile
              <br className="mobile-break" /> más seguro
            </strong>
          </h1>
          <p>
            Cursos online y programas para empresas. Aprende con material PDF,
            evaluaciones y acompañamiento profesional.
          </p>
          <div className="actions">
            <ButtonLink href="/cursos">Ver cursos</ButtonLink>
            <ButtonLink href="/empresas" secondary>
              Cotizar para empresas
            </ButtonLink>
          </div>
          <Features />
          <div className="hero-motto">
            Personas capacitadas,
            <br />
            sociedades más seguras.
          </div>
        </div>
        <div className="hero-signature">
          Tu futuro profesional
          <br />
          comienza aquí
          <span />
        </div>
      </section>
      <div className="container shortcut-grid">
        {shortcuts.map((c) => (
          <Link className="shortcut card" href={c.href} key={c.title}>
            <div className="shortcut-image">
              <Photo src={c.image} alt={c.title} />
            </div>
            <div className="shortcut-copy">
              <span className="floating-icon">
                <c.icon size={22} />
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ArrowUpRight className="round-arrow" size={30} />
            </div>
          </Link>
        ))}
      </div>
      <section className="section pale">
        <div className="container why-grid">
          <div>
            <Eyebrow>TU FUTURO MÁS SEGURO</Eyebrow>
            <h2>
              ¿Por qué elegir
              <br />
              <strong>PROTEXXION ACADEMY?</strong>
            </h2>
            <p>
              Formación con enfoque práctico, para construir conocimiento que
              puedas aplicar.
            </p>
          </div>
          {[
            {
              icon: Users,
              title: "Experiencia de aprendizaje",
              text: "Conecta conceptos de seguridad con situaciones del trabajo diario.",
            },
            {
              icon: FileText,
              title: "Material PDF",
              text: "Apuntes y recursos organizados para acompañar cada etapa.",
            },
            {
              icon: Monitor,
              title: "Flexibilidad online",
              text: "Estudia a tu ritmo y retoma donde te quedaste.",
            },
            {
              icon: Award,
              title: "Un camino claro",
              text: "Visualiza tus logros y completa tu recorrido de capacitación.",
            },
          ].map((c, i) => (
            <article className={`benefit card accent-${i}`} key={c.title}>
              <c.icon size={34} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span />
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container audience-grid">
          <div>
            <Eyebrow>FORMACIÓN CON PROPÓSITO</Eyebrow>
            <h2>
              Capacitamos a<br />
              <strong>personas y empresas</strong>
            </h2>
            <p>
              Distintas necesidades. El mismo compromiso con una formación
              responsable.
            </p>
          </div>
          {[
            {
              title: "Personas",
              text: "Desarrolla tus conocimientos y da el siguiente paso en tu formación.",
              image: photos.classroom,
              href: "/cursos",
              cta: "Ver cursos para personas",
              icon: GraduationCap,
            },
            {
              title: "Empresas",
              text: "Fortalece las capacidades de tu equipo con programas adaptados.",
              image: photos.field,
              href: "/empresas",
              cta: "Cotizar para empresas",
              icon: Building2,
            },
          ].map((c) => (
            <article className="audience-photo" key={c.title}>
              <Photo
                src={c.image}
                alt={
                  c.title === "Personas"
                    ? "Clase de seguridad privada"
                    : "Capacitación práctica en terreno"
                }
              />
              <div>
                <c.icon size={30} />
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <Link href={c.href}>
                  {c.cta}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section pale">
        <div className="container steps-grid">
          <div>
            <Eyebrow>UN PROCESO SIMPLE</Eyebrow>
            <h2>Cómo funciona</h2>
            <p>Tu capacitación, paso a paso.</p>
          </div>
          {[
            "Inscríbete",
            "Accede al aula virtual",
            "Estudia tus módulos",
            "Finaliza tu capacitación",
          ].map((t, i) => (
            <div className="step" key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>
                {
                  [
                    "Consulta el programa y conoce el proceso de inscripción.",
                    "En esta demo puedes ingresar sin cuenta ni contraseña.",
                    "Revisa el material y avanza de manera ordenada.",
                    "Completa tu recorrido y visualiza tus logros.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>CONOCIMIENTO QUE SE APLICA</Eyebrow>
            <h2>
              La seguridad se aprende
              <br />
              <strong>también en la práctica.</strong>
            </h2>
          </div>
          <p>
            Observación, prevención y criterio profesional. Una formación
            conectada con los desafíos de las personas y sus entornos.
          </p>
        </div>
        <div className="training-grid">
          {[
            {
              img: photos.monitor,
              title: "Observar para prevenir",
              text: "Sistemas de vigilancia y monitoreo",
            },
            {
              img: photos.access,
              title: "Actuar con criterio",
              text: "Control de acceso y atención de personas",
            },
            {
              img: photos.field,
              title: "Prepararse para responder",
              text: "Procedimientos y trabajo en equipo",
            },
          ].map((c) => (
            <article className="training-card" key={c.title}>
              <div>
                <Photo src={c.img} alt={c.text} />
              </div>
              <small>{c.text}</small>
              <h3>{c.title}</h3>
            </article>
          ))}
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
