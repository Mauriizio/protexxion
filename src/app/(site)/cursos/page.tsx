import { Hero } from "@/components/hero";
import { Catalog } from "@/components/catalog";
import { photos } from "@/data/site";
export const metadata = {
  title: "Catálogo de cursos",
  description:
    "Explora el curso OS10 Guardia de Seguridad y consulta programas de capacitación para personas y empresas.",
};
export default function Page() {
  return (
    <>
      <Hero
        image={photos.monitor}
        eyebrow="DISCIPLINA · CONOCIMIENTO · OPORTUNIDADES"
        title="Catálogo de cursos"
        description="Formación que protege un Chile más seguro. Encuentra tu próximo paso en seguridad privada."
      />
      <Catalog />
    </>
  );
}
