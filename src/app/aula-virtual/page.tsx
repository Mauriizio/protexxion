import { Classroom } from "@/lms/classroom";
export const metadata = {
  title: "Aula Virtual",
  description:
    "Estudia el curso OS10 en el aula virtual de demostración. Material PDF, progreso por página y 12 módulos de aprendizaje.",
};
export default function Page() {
  return <Classroom />;
}
