import Link from "next/link";
import {
  BookOpen,
  Monitor,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { ButtonLink, Checks, CorporateCTA, Eyebrow } from "@/components/ui";
import { photos } from "@/data/site";
import { course } from "@/data/course";
export const metadata = {
  title: "Curso OS10 Guardia de Seguridad",
  description:
    "Conoce los 12 módulos PDF del curso OS10 y explora el aula virtual de demostración.",
};
export default function Page() {
  return (
    <>
      <Hero
        large
        image={photos.monitor}
        eyebrow="INICIO / CURSOS / SEGURIDAD PRIVADA"
        title={
          <>
            Curso OS10
            <br />
            <strong>Guardia de Seguridad</strong>
          </>
        }
        description="Conocimiento, criterio y preparación para tu desarrollo en seguridad privada. Explora una experiencia de aprendizaje organizada, a tu ritmo."
      >
        <div className="actions">
          <ButtonLink href="/aula-virtual">
            Acceder a la demo del curso
          </ButtonLink>
          <ButtonLink href="/contacto" secondary>
            Solicita información
          </ButtonLink>
        </div>
        <aside className="admission-card card">
          <span className="demo-pill">CONOCE EL PROGRAMA</span>
          <h2>
            Tu próximo paso
            <br />
            comienza aquí.
          </h2>
          <Checks
            items={[
              "12 módulos de aprendizaje",
              "Material PDF del curso",
              "Avance a tu propio ritmo",
              "Recorrido guiado en el aula",
            ]}
          />
          <ButtonLink href="/contacto">Solicita información</ButtonLink>
          <Link href="/aula-virtual" className="text-link">
            Acceder a la demo del curso <ArrowRight size={16} />
          </Link>
          <p className="fine-print">
            Explora el material sin registro.
            <br />
            Demostración sin inscripción real.
          </p>
        </aside>
      </Hero>
      <div className="container detail-stats">
        {[
          [BookOpen, "Contenido", "12 módulos"],
          [Monitor, "Modalidad demo", "Online, a tu ritmo"],
          [FileText, "Material", "PDF incluido"],
          [CheckCircle2, "Seguimiento", "Progreso por página"],
        ].map(([Icon, l, v]) => {
          const I = Icon as typeof BookOpen;
          return (
            <div className="card" key={String(l)}>
              <I size={27} />
              <span>
                <small>{String(l)}</small>
                <strong>{String(v)}</strong>
              </span>
            </div>
          );
        })}
      </div>
      <section className="section container">
        <nav className="detail-tabs" aria-label="Información del curso">
          {[
            ["descripcion", "Descripción"],
            ["modulos", "Módulos"],
            ["incluye", "Incluye"],
            ["dirigido", "Dirigido a"],
            ["muestra", "Vista previa"],
          ].map(([id, t]) => (
            <a href={"#" + id} key={id}>
              {t}
            </a>
          ))}
        </nav>
        <div className="detail-grid">
          <div>
            <section id="descripcion">
              <Eyebrow>FORMACIÓN CON SENTIDO</Eyebrow>
              <h2>
                Prepárate para actuar
                <br />
                <strong>con conocimiento.</strong>
              </h2>
              <p>
                El curso reúne material educativo sobre el marco legal OS10, las
                funciones del guardia, los derechos humanos y los procedimientos
                de seguridad. Un recorrido desde los fundamentos hasta la
                prevención y la respuesta ante emergencias.
              </p>
              <p>
                La demo permite estudiar los documentos originales página por
                página. Cada módulo se habilita al completar el anterior, para
                acompañar un aprendizaje progresivo.
              </p>
              <div className="info-note">
                Material educativo independiente. Esta demostración no acredita
                una habilitación oficial ni reemplaza los requisitos de
                formación que correspondan.
              </div>
            </section>
            <section id="incluye" className="detail-box green-tint">
              <h3>¿Qué incluye esta experiencia?</h3>
              <Checks
                items={[
                  "12 documentos PDF del curso",
                  "Visor de lectura con zoom y navegación",
                  "Seguimiento de páginas revisadas",
                  "Progreso guardado en este navegador",
                  "Repaso y evaluación dentro del material",
                ]}
              />
            </section>
            <section id="dirigido" className="detail-box">
              <h3>Dirigido a</h3>
              <p>
                Personas interesadas en formarse en seguridad privada y equipos
                que buscan reforzar sus conocimientos sobre prevención,
                procedimientos y atención de personas.
              </p>
            </section>
          </div>
          <section id="modulos">
            <h2 className="small-heading">Tu ruta de aprendizaje</h2>
            <p className="muted">12 módulos · Un recorrido progresivo</p>
            <div className="module-accordion">
              {course.modules.map((m) => (
                <details key={m.id}>
                  <summary>
                    <span>{String(m.id).padStart(2, "0")}</span>
                    {m.title}
                  </summary>
                  <p>
                    Estudia el material de {m.title.toLocaleLowerCase()}.
                    Incluye{" "}
                    {m.content[0].type === "pdf" ? m.content[0].pages : 0}{" "}
                    páginas de lectura y actividades del documento.
                  </p>
                  <Link href="/aula-virtual">
                    Explorar en el aula <ArrowRight size={15} />
                  </Link>
                </details>
              ))}
            </div>
          </section>
          <aside id="muestra" className="preview-card card">
            <FileText size={38} />
            <span className="demo-pill">VISTA PREVIA</span>
            <h2>
              Conoce tu
              <br />
              aula virtual
            </h2>
            <p>
              Abre el primer módulo y descubre cómo será tu experiencia de
              estudio.
            </p>
            <div className="preview-paper">
              <BookOpen size={35} />
              <small>PROTEXXION ACADEMY</small>
              <strong>MÓDULO 01</strong>
              <span>Marco legal OS10</span>
              <div className="brand-line" />
            </div>
            <ButtonLink href="/aula-virtual">Empezar la demo</ButtonLink>
            <p className="fine-print">
              Sin registro. Sin contraseña.
              <br />
              Tu avance permanece en este dispositivo.
            </p>
          </aside>
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
