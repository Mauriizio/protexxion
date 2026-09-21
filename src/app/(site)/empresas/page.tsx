import {
  Building2,
  Users,
  ChartNoAxesCombined,
  Settings2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ButtonLink, Photo, Eyebrow, Checks } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { photos } from "@/data/site";
export const metadata = {
  title: "Capacitación para empresas",
  description:
    "Programas de capacitación para empresas y equipos de seguridad. Conoce nuestra propuesta de formación corporativa.",
};
export default function Page() {
  return (
    <>
      <Hero
        large
        image={photos.field}
        eyebrow="EMPRESAS · PERSONAS MÁS SEGURAS, ORGANIZACIONES MÁS FUERTES"
        title={
          <>
            Capacitación para
            <br />
            <strong>
              empresas y equipos
              <br />
              de seguridad
            </strong>
          </>
        }
        description="Formación pensada para las necesidades de tu organización. Fortalece los conocimientos de tus colaboradores y la preparación de tu equipo."
      >
        <div className="actions">
          <ButtonLink href="#propuesta">Solicitar propuesta</ButtonLink>
          <ButtonLink href="#programas" secondary>
            Conocer programas
          </ButtonLink>
        </div>
        <div className="features">
          {[
            [Settings2, "Programas a medida"],
            [Users, "Formación de equipos"],
            [ChartNoAxesCombined, "Seguimiento del aprendizaje"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Users;
            return (
              <div key={String(t)}>
                <I size={28} />
                <span>{String(t)}</span>
              </div>
            );
          })}
        </div>
      </Hero>
      <section className="container enterprise-layout">
        <div>
          <div className="enterprise-cards" id="programas">
            {[
              {
                title: "Formación inicial",
                img: photos.team,
                text: "Conocimientos fundamentales para integrar a nuevos colaboradores.",
              },
              {
                title: "Actualización",
                img: photos.classroom,
                text: "Refuerza conceptos, procedimientos y buenas prácticas de tu equipo.",
              },
              {
                title: "Programas para empresas",
                img: photos.monitor,
                text: "Una propuesta adaptada a tus objetivos de capacitación.",
              },
            ].map((c) => (
              <Link href="#propuesta" className="card" key={c.title}>
                <div className="enterprise-photo">
                  <Photo src={c.img} alt={c.title} />
                </div>
                <div className="enterprise-copy">
                  <Building2 size={25} />
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
          <div className="enterprise-method">
            <Eyebrow>UN PLAN QUE PARTE DE TU REALIDAD</Eyebrow>
            <h2>
              Tu equipo tiene desafíos.
              <br />
              <strong>Construyamos su formación.</strong>
            </h2>
            <p>
              El primer paso es comprender el contexto de tu organización: las
              funciones de tus colaboradores, las capacidades que necesitas
              reforzar y tus objetivos de aprendizaje.
            </p>
            <Checks
              items={[
                "Levantamiento de necesidades de capacitación",
                "Definición de contenidos y modalidad",
                "Recorrido de aprendizaje organizado",
                "Seguimiento como parte de la propuesta formativa",
              ]}
            />
            <div className="info-note">
              Explora en el aula demo cómo se visualiza el avance individual de
              un curso.
            </div>
            <ButtonLink href="/aula-virtual">
              Conocer el aula virtual
            </ButtonLink>
          </div>
        </div>
        <InquiryForm business />
      </section>
      <div className="corporate-cta">
        <div className="container cta-inner">
          <h2>
            Invertir en formación
            <br />
            es preparar a tu equipo.
          </h2>
          <p>Disciplina, conocimiento y oportunidades para tu organización.</p>
          <ButtonLink href="#propuesta">Conversemos</ButtonLink>
        </div>
      </div>
    </>
  );
}
