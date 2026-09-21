import { GraduationCap, Check } from "lucide-react";
import { Brand, ButtonLink, Photo } from "@/components/ui";
import { photos } from "@/data/site";
export const metadata = { title: "Acceso demostración" };
export default function Page() {
  return (
    <section className="access-layout">
      <div className="access-photo">
        <Photo
          src={photos.classroom}
          alt="Clase de formación en seguridad"
          priority
        />
        <div>
          <h2>
            Tu futuro profesional
            <br />
            comienza aquí.
          </h2>
          <p>Disciplina · Conocimiento · Oportunidades</p>
        </div>
      </div>
      <div className="access-content">
        <Brand />
        <span className="demo-pill">PLATAFORMA DEMOSTRACIÓN</span>
        <GraduationCap size={42} />
        <h1>Acceso demostración</h1>
        <p>
          Conoce tu aula virtual y recorre los 12 módulos del curso OS10 Guardia
          de Seguridad.
        </p>
        <ul className="checks">
          <li>
            <Check />
            Sin cuenta ni contraseña
          </li>
          <li>
            <Check />
            Material PDF real del curso
          </li>
          <li>
            <Check />
            Progreso guardado en este navegador
          </li>
        </ul>
        <ButtonLink href="/aula-virtual">Entrar al aula demo</ButtonLink>
        <p className="fine-print">
          Esta versión no incluye autenticación ni inscripción real.
        </p>
      </div>
    </section>
  );
}
