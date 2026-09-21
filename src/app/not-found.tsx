import { ButtonLink, Brand } from "@/components/ui";
export default function NotFound() {
  return (
    <main className="not-found">
      <Brand />
      <span className="eyebrow">404 · PÁGINA NO ENCONTRADA</span>
      <h1>Retomemos el camino.</h1>
      <p>
        Esta página no está disponible. Sigue explorando nuestra plataforma.
      </p>
      <ButtonLink href="/">Volver al inicio</ButtonLink>
    </main>
  );
}
