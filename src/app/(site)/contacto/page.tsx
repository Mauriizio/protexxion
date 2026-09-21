import { MessageSquare, BookOpen, Building2 } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { Eyebrow, ButtonLink } from "@/components/ui";
export const metadata = {
  title: "Contacto",
  description:
    "Consulta por cursos de seguridad privada y programas de capacitación para empresas.",
};
export default function Page() {
  return (
    <section className="container contact-layout section">
      <div>
        <Eyebrow>ESTAMOS PARA ORIENTARTE</Eyebrow>
        <h1>
          Tu formación
          <br />
          <strong>
            comienza con
            <br />
            una conversación.
          </strong>
        </h1>
        <p>
          ¿Buscas un curso para ti o capacitación para tu equipo? Cuéntanos tus
          objetivos y explora las posibilidades de PROTEXXION ACADEMY.
        </p>
        <div className="contact-option">
          <BookOpen />
          <div>
            <h3>Quiero capacitarme</h3>
            <p>Conoce el material y la experiencia del curso OS10.</p>
          </div>
        </div>
        <div className="contact-option">
          <Building2 />
          <div>
            <h3>Represento a una empresa</h3>
            <p>
              Consulta programas según las necesidades de tus colaboradores.
            </p>
          </div>
        </div>
        <div className="contact-option">
          <MessageSquare />
          <div>
            <h3>Conoce la experiencia</h3>
            <p>Accede al aula de demostración sin crear una cuenta.</p>
          </div>
        </div>
        <ButtonLink href="/aula-virtual" secondary>
          Explorar el aula demo
        </ButtonLink>
      </div>
      <InquiryForm />
    </section>
  );
}
