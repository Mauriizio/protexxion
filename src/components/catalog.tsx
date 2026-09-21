"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Monitor,
  FileText,
  ArrowRight,
  Building2,
  SlidersHorizontal,
} from "lucide-react";
import { Photo, Checks, ButtonLink } from "./ui";
import { photos } from "@/data/site";
const programs = [
  {
    title: "Curso OS10 Guardia de Seguridad",
    category: "Seguridad privada",
    image: photos.field,
    text: "Un recorrido por los fundamentos, procedimientos y responsabilidades del guardia de seguridad.",
    demo: true,
  },
  {
    title: "Capacitación para vigilantes",
    category: "Seguridad privada",
    image: photos.classroom,
    text: "Conversemos sobre las necesidades de formación de tu equipo.",
  },
  {
    title: "Control de acceso",
    category: "Procedimientos",
    image: photos.access,
    text: "Identificación de personas y procedimientos de ingreso a instalaciones.",
  },
  {
    title: "Monitoreo CCTV",
    category: "Tecnología",
    image: photos.monitor,
    text: "Formación en observación, vigilancia y comunicación de incidentes.",
  },
  {
    title: "Defensa personal",
    category: "Prevención",
    image: photos.field,
    text: "Consulta alternativas de formación y prevención para tu organización.",
  },
  {
    title: "Capacitación empresarial",
    category: "Empresas",
    image: photos.team,
    text: "Programas de formación adaptados al contexto de tu equipo.",
  },
];
export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const filtered = programs.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      p.title
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          query
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        ),
  );
  return (
    <section className="container catalog-section">
      <div className="filter-bar">
        <label className="search">
          <Search size={20} />
          <input
            aria-label="Buscar cursos"
            placeholder="Buscar cursos o temas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="filter-chips">
          <SlidersHorizontal size={18} />
          {[
            "Todos",
            "Seguridad privada",
            "Procedimientos",
            "Tecnología",
            "Prevención",
            "Empresas",
          ].map((c) => (
            <button
              aria-pressed={category === c}
              className={category === c ? "active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="catalog-layout">
        <div>
          <div className="results-label" aria-live="polite">
            {filtered.length} programas · Explora tu próximo paso
          </div>
          <div className="course-grid">
            {filtered.map((p) => (
              <article className="course-card card" key={p.title}>
                <div className="course-photo">
                  <Photo src={p.image} alt={p.title} />
                  {p.demo && (
                    <span className="image-badge">DEMO DISPONIBLE</span>
                  )}
                </div>
                <div className="course-copy">
                  <small>{p.category}</small>
                  <h2>{p.title}</h2>
                  <p>{p.text}</p>
                  <div className="course-meta">
                    {p.demo ? (
                      <>
                        <span>
                          <Monitor size={15} />
                          Online
                        </span>
                        <span>
                          <FileText size={15} />
                          12 módulos PDF
                        </span>
                      </>
                    ) : (
                      <span>Programa a consultar</span>
                    )}
                  </div>
                  <Link
                    className={p.demo ? "button" : "text-link"}
                    href={
                      p.demo
                        ? "/cursos/os10-guardia-seguridad"
                        : "/contacto?programa=" + encodeURIComponent(p.title)
                    }
                  >
                    {p.demo ? "Conocer el curso" : "Consultar programa"}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Search size={36} />
              <h2>No encontramos ese programa</h2>
              <p>Prueba otro término o consulta las opciones disponibles.</p>
              <button
                className="button"
                onClick={() => {
                  setQuery("");
                  setCategory("Todos");
                }}
              >
                Ver todos los programas
              </button>
            </div>
          )}
        </div>
        <aside className="business-banner">
          <Building2 size={40} />
          <small>FORMACIÓN CORPORATIVA</small>
          <h2>
            El próximo nivel
            <br />
            de tu equipo.
          </h2>
          <p>
            Conversemos sobre un programa de capacitación pensado para tu
            organización.
          </p>
          <Checks
            items={[
              "Necesidades de tu operación",
              "Objetivos de aprendizaje claros",
              "Formación de colaboradores",
              "Propuesta a medida",
            ]}
          />
          <ButtonLink href="/empresas" secondary>
            Planes para empresas
          </ButtonLink>
          <span className="banner-motto">
            Personas capacitadas,
            <br />
            sociedades más seguras.
          </span>
        </aside>
      </div>
    </section>
  );
}
