import { Hero } from "@/components/hero";
import { Eyebrow, Photo, CorporateCTA } from "@/components/ui";
import { photos } from "@/data/site";
import { ShieldCheck, BookOpen, Users } from "lucide-react";
export const metadata = {
  title: "Nosotros",
  description:
    "Conoce el enfoque de PROTEXXION ACADEMY: disciplina, conocimiento y desarrollo profesional en seguridad privada.",
};
export default function Page() {
  return (
    <>
      <Hero
        image={photos.team}
        large
        eyebrow="SOMOS PROTEXXION ACADEMY"
        title={
          <>
            Formación con propósito.
            <br />
            <strong>Seguridad con criterio.</strong>
          </>
        }
        description="Creemos en el conocimiento como base de una actuación responsable. Nuestra propuesta une disciplina, aprendizaje y desarrollo profesional."
      />
      <section className="section container about-grid">
        <div>
          <Eyebrow>PERSONAS CAPACITADAS, SOCIEDADES MÁS SEGURAS</Eyebrow>
          <h2>
            Aprender para
            <br />
            <strong>hacer la diferencia.</strong>
          </h2>
          <p>
            La seguridad requiere observación, comunicación y decisiones
            responsables. Por eso, nuestra propuesta formativa conecta los
            fundamentos con situaciones de la práctica profesional.
          </p>
          <p>
            PROTEXXION ACADEMY está orientada a la capacitación en seguridad
            privada, con espacios de aprendizaje para personas y organizaciones.
          </p>
          <div className="values">
            {[
              [
                ShieldCheck,
                "Disciplina",
                "Preparación y responsabilidad en cada etapa.",
              ],
              [BookOpen, "Conocimiento", "Comprender antes de actuar."],
              [
                Users,
                "Desarrollo profesional",
                "Aprender para afrontar nuevos desafíos.",
              ],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Users;
              return (
                <div key={String(t)}>
                  <I />
                  <h3>{String(t)}</h3>
                  <p>{String(d)}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="about-photo">
          <Photo
            src={photos.field}
            alt="Formación práctica de un equipo de seguridad"
          />
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
