"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  GraduationCap,
  BookOpen,
  FileText,
  ChartNoAxesCombined,
  Award,
  Headphones,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Play,
  ChevronRight,
  Menu,
  X,
  UserRound,
  Check,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Brand, ButtonLink } from "@/components/ui";
import { Modal } from "@/components/modal";
import { course } from "@/data/course";
import { photos } from "@/data/site";
import {
  localProgressRepository,
  freshProgress,
  visitPage,
  completeModule,
  pageCount,
  type Progress,
} from "@/lib/progress";
const PDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="pdf-loading">
      <span className="spinner" />
      Cargando visor PDF…
    </div>
  ),
});
type View = "course" | "materials" | "progress" | "certificate" | "support";
export function Classroom() {
  const [progress, setProgress] = useState<Progress>(freshProgress);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [view, setView] = useState<View>("course");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const [reset, setReset] = useState(false);
  const [readerSession, setReaderSession] = useState(0);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localProgressRepository.load();
        setProgress(saved);
        setPage(saved.lastPage[saved.current] ?? 1);
      } catch {
        setStorageError(true);
      }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localProgressRepository.save(progress);
    } catch {
      queueMicrotask(() => setStorageError(true));
    }
  }, [progress, ready]);
  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(""), 5500);
    return () => clearTimeout(timeout);
  }, [feedback]);
  const current = course.modules[progress.current - 1];
  const content = current.content[0];
  const visited = progress.visited[current.id] ?? [];
  const total = pageCount(current.id);
  const completed = progress.completed.includes(current.id);
  const all = progress.completed.length === 12;
  const onViewed = useCallback(
    (p: number) =>
      setProgress((old) =>
        old.current === current.id ? visitPage(old, current.id, p) : old,
      ),
    [current.id],
  );
  function openModule(id: number) {
    if (id > progress.unlocked) {
      setFeedback(
        "Completa el módulo anterior para desbloquear este contenido.",
      );
      return;
    }
    setProgress((old) => ({ ...old, current: id }));
    setPage(progress.lastPage[id] ?? 1);
    setView("course");
    setDrawer(false);
  }
  function finish() {
    setProgress((old) => completeModule(old, current.id));
    setFeedback(
      current.id === 12
        ? "Curso completado. Has finalizado tus 12 módulos."
        : `¡Módulo ${current.id} completado! El módulo ${current.id + 1} ya está disponible.`,
    );
  }
  const items: [View, string, typeof BookOpen][] = [
    ["course", "Mi curso", GraduationCap],
    ["course", "Clases / Módulos", BookOpen],
    ["materials", "Material PDF", FileText],
    ["progress", "Progreso", ChartNoAxesCombined],
    ["certificate", "Certificado", Award],
    ["support", "Soporte", Headphones],
  ];
  return (
    <div className="lms-shell">
      <a className="skip-link" href="#aula">
        Saltar al aula
      </a>
      {drawer && (
        <button
          className="drawer-backdrop"
          onClick={() => setDrawer(false)}
          aria-label="Cerrar navegación"
        />
      )}
      <aside className={`lms-sidebar ${drawer ? "open" : ""}`}>
        <div className="lms-brand">
          <Brand compact />
          <button
            className="icon-button mobile-only"
            aria-label="Cerrar navegación"
            onClick={() => setDrawer(false)}
          >
            <X />
          </button>
        </div>
        <div className="sidebar-label">ESPACIO DE APRENDIZAJE</div>
        <nav aria-label="Navegación del aula">
          {items.map(([v, t, I], i) => (
            <button
              key={t}
              className={view === v && i !== 1 ? "active" : ""}
              onClick={() => {
                setView(v);
                setDrawer(false);
                if (i === 1)
                  requestAnimationFrame(() =>
                    document
                      .getElementById("modules")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" }),
                  );
              }}
            >
              <I size={21} />
              {t}
              {view === v && i !== 1 && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-motto">
            Tu futuro profesional
            <br />
            <strong>comienza aquí.</strong>
            <span className="brand-line" />
          </div>
          <button onClick={() => setReset(true)}>
            <RotateCcw size={17} />
            Reiniciar demo
          </button>
          <Link href="/">
            <ArrowLeft size={17} />
            Volver al sitio web
          </Link>
          <span className="sidebar-demo">DEMOSTRACIÓN · SIN CUENTA REAL</span>
        </div>
      </aside>
      <div className="lms-main">
        <header className="lms-topbar">
          <button
            className="icon-button mobile-only"
            aria-label="Abrir navegación del aula"
            onClick={() => setDrawer(true)}
          >
            <Menu />
          </button>
          <div className="student-avatar">
            <UserRound size={23} />
          </div>
          <div>
            <strong>¡Hola, Estudiante Demo!</strong>
            <span>Tu espacio para aprender y avanzar</span>
          </div>
          <span className="demo-pill">MODO DEMOSTRACIÓN</span>
          <Link
            href="/contacto"
            className="icon-button"
            aria-label="Contactar soporte"
          >
            <Headphones size={20} />
          </Link>
        </header>
        <main id="aula" className="lms-content">
          <div className="lms-heading">
            <div>
              <div className="breadcrumbs">
                <Link href="/cursos">Mis cursos</Link>
                <ChevronRight size={13} />
                <span>OS10 Guardia de Seguridad</span>
              </div>
              <h1>Mi aula virtual</h1>
              <p>
                Avanza a tu ritmo. Cada módulo te acerca a tu próximo objetivo.
              </p>
            </div>
            <div className="lms-brand-words">
              DISCIPLINA · CONOCIMIENTO · OPORTUNIDADES
              <span className="brand-line" />
            </div>
          </div>
          {storageError && (
            <div className="info-note" role="alert">
              El navegador no permite guardar el progreso. Puedes estudiar, pero
              tu avance se perderá al cerrar esta página.
            </div>
          )}
          <section className="course-overview card">
            <div className="overview-photo">
              <Image
                src={photos.classroom}
                fill
                sizes="220px"
                alt="Clase del curso OS10"
              />
            </div>
            <div className="overview-info">
              <span className="mini-label">TU CURSO · MATERIAL PDF</span>
              <h2>OS10 Guardia de Seguridad</h2>
              <div className="progress-line">
                <progress
                  value={progress.percent}
                  max={100}
                  aria-label="Progreso general"
                />
                <strong>{progress.percent}%</strong>
              </div>
              <p>
                <span>{progress.completed.length} de 12</span> módulos
                completados
              </p>
            </div>
            <div className="continue-box">
              <BookOpen size={25} />
              <div>
                <small>
                  {all ? "RECORRIDO FINALIZADO" : "ESTÁS ESTUDIANDO"}
                </small>
                <strong>
                  {all ? "¡Curso completado!" : `Módulo ${current.id} de 12`}
                </strong>
                <span>
                  {all ? "Revisa tu logro en Certificado" : current.title}
                </span>
              </div>
            </div>
          </section>
          {!ready ? (
            <div className="pdf-loading">Recuperando tu progreso…</div>
          ) : view === "course" ? (
            <>
              <div className="learning-grid">
                <section className="lesson">
                  <div className="lesson-header">
                    <div>
                      <span className="mini-label">
                        MÓDULO {String(current.id).padStart(2, "0")} / 12
                      </span>
                      <h2>{current.title}</h2>
                    </div>
                    <span className={completed ? "status success" : "status"}>
                      {completed ? "COMPLETADO" : "EN CURSO"}
                    </span>
                  </div>
                  <div className="lesson-tabs">
                    <span>
                      <FileText size={18} />
                      Material de estudio
                    </span>
                    <span>{total} páginas · PDF</span>
                  </div>
                  {content.type === "pdf" && (
                    <PDFViewer
                      key={`${current.id}-${readerSession}`}
                      src={content.src}
                      page={page}
                      total={total}
                      visited={visited}
                      onPage={setPage}
                      onViewed={onViewed}
                    />
                  )}
                  <div className="completion-panel">
                    <div>
                      <strong>
                        {completed
                          ? "Módulo completado"
                          : visited.length === total
                            ? "¡Material revisado!"
                            : "Tu siguiente paso"}
                      </strong>
                      <p>
                        {completed
                          ? "Puedes volver a consultar este material cuando quieras."
                          : visited.length === total
                            ? "Ya puedes completar este módulo y continuar."
                            : `Revisa las ${total} páginas para completar el módulo.`}
                      </p>
                    </div>
                    <button
                      className={`button ${completed ? "completed-button" : ""}`}
                      disabled={completed || visited.length !== total}
                      onClick={finish}
                    >
                      <CheckCircle2 size={18} />
                      {completed
                        ? "Completado"
                        : "Marcar módulo como completado"}
                    </button>
                  </div>
                  <div className="lesson-navigation">
                    <button
                      className="text-link"
                      disabled={current.id === 1}
                      onClick={() => openModule(current.id - 1)}
                    >
                      <ArrowLeft size={17} />
                      Módulo anterior
                    </button>
                    {current.id < 12 ? (
                      <button
                        className="button navy"
                        disabled={current.id >= progress.unlocked}
                        onClick={() => openModule(current.id + 1)}
                      >
                        Siguiente módulo
                        <ArrowRight size={17} />
                      </button>
                    ) : (
                      all && (
                        <button
                          className="button navy"
                          onClick={() => setView("certificate")}
                        >
                          Ver mi logro
                          <Award size={18} />
                        </button>
                      )
                    )}
                  </div>
                </section>
                <aside className="learning-aside">
                  <section className="module-list card" id="modules">
                    <div className="module-list-title">
                      <h2>Módulos del curso</h2>
                      <span>{progress.completed.length}/12</span>
                    </div>
                    <p>Tu ruta de aprendizaje</p>
                    {course.modules.map((m) => {
                      const done = progress.completed.includes(m.id),
                        locked = m.id > progress.unlocked,
                        active = m.id === current.id;
                      return (
                        <button
                          key={m.id}
                          className={`module-item ${active ? "active" : ""} ${locked ? "locked" : ""}`}
                          aria-disabled={locked}
                          aria-current={active ? "step" : undefined}
                          onClick={() => openModule(m.id)}
                        >
                          {done ? (
                            <CheckCircle2 className="green" size={21} />
                          ) : locked ? (
                            <LockKeyhole size={18} />
                          ) : (
                            <Play size={19} />
                          )}
                          <span>
                            <small>
                              MÓDULO {String(m.id).padStart(2, "0")}
                            </small>
                            <strong>{m.title}</strong>
                            <em>
                              {done
                                ? "COMPLETADO"
                                : locked
                                  ? "BLOQUEADO"
                                  : active
                                    ? "EN CURSO"
                                    : "DISPONIBLE"}
                            </em>
                          </span>
                        </button>
                      );
                    })}
                  </section>
                  <button
                    className="certificate-teaser card"
                    onClick={() => setView("certificate")}
                  >
                    <Award size={31} />
                    <div>
                      <h3>Mi certificado</h3>
                      <p>Previsualización demo</p>
                    </div>
                    <ChevronRight size={19} />
                  </button>
                  <div className="support-card card">
                    <Headphones size={25} />
                    <h3>¿Necesitas ayuda?</h3>
                    <p>
                      Encuentra orientación para continuar con tu aprendizaje.
                    </p>
                    <button
                      className="text-link"
                      onClick={() => setView("support")}
                    >
                      Ver opciones de soporte
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </aside>
              </div>
              {all && (
                <div className="course-finished">
                  <Award size={38} />
                  <div>
                    <h2>Curso completado</h2>
                    <p>
                      Has finalizado los 12 módulos. Felicitaciones por tu
                      dedicación y constancia.
                    </p>
                  </div>
                  <button
                    className="button"
                    onClick={() => setView("certificate")}
                  >
                    Ver previsualización
                  </button>
                </div>
              )}
            </>
          ) : view === "materials" ? (
            <section className="lms-panel card">
              <span className="mini-label">BIBLIOTECA DE TU CURSO</span>
              <h2>Material PDF</h2>
              <p>
                Consulta y descarga el material de los módulos que has
                desbloqueado.
              </p>
              <div className="materials-grid">
                {course.modules.map((m) => (
                  <article key={m.id} className="material-card">
                    <FileText size={30} />
                    <small>MÓDULO {m.id}</small>
                    <h3>{m.title}</h3>
                    <p>{pageCount(m.id)} páginas</p>
                    {m.id <= progress.unlocked ? (
                      <>
                        <button
                          className="text-link"
                          onClick={() => openModule(m.id)}
                        >
                          Estudiar módulo
                          <ArrowRight size={16} />
                        </button>
                        {m.content[0].type === "pdf" && (
                          <a
                            className="text-link"
                            href={m.content[0].src}
                            download
                          >
                            Descargar
                            <Download size={15} />
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="locked-material">
                        <LockKeyhole size={16} />
                        Completa el módulo anterior
                      </span>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ) : view === "progress" ? (
            <section className="lms-panel card">
              <span className="mini-label">CADA PASO CUENTA</span>
              <h2>Tu progreso de aprendizaje</h2>
              <p>
                El avance general se calcula con los módulos completados.
                Visitar las páginas prepara cada módulo para su finalización.
              </p>
              {course.modules.map((m) => (
                <div className="progress-row" key={m.id}>
                  <span>{String(m.id).padStart(2, "0")}</span>
                  <div>
                    <strong>{m.title}</strong>
                    <small>
                      {progress.visited[m.id]?.length ?? 0} de {pageCount(m.id)}{" "}
                      páginas revisadas
                    </small>
                  </div>
                  <progress
                    value={progress.visited[m.id]?.length ?? 0}
                    max={pageCount(m.id)}
                    aria-label={`Páginas revisadas de ${m.title}`}
                  />
                  {progress.completed.includes(m.id) ? (
                    <CheckCircle2 className="green" />
                  ) : (
                    <span>
                      {m.id > progress.unlocked ? "Bloqueado" : "En progreso"}
                    </span>
                  )}
                </div>
              ))}
            </section>
          ) : view === "certificate" ? (
            <section className="lms-panel certificate-panel card">
              <span className="demo-pill">
                PREVISUALIZACIÓN DEMO · SIN VALIDEZ OFICIAL
              </span>
              <h2>{all ? "Curso completado" : "Tu próximo logro te espera"}</h2>
              <p>
                {all
                  ? "Felicitaciones por completar tu recorrido de aprendizaje."
                  : "Completa los 12 módulos para finalizar el recorrido de esta demostración."}
              </p>
              <div className={`certificate-preview ${all ? "earned" : ""}`}>
                <Brand />
                <span className="watermark">DEMOSTRACIÓN</span>
                <Award size={48} />
                <small>PREVISUALIZACIÓN DE CERTIFICADO</small>
                <h3>Reconocimiento de aprendizaje</h3>
                <p>Estudiante Demo</p>
                <strong>Curso OS10 Guardia de Seguridad</strong>
                <div className="brand-line" />
                <span>
                  {progress.completed.length} de 12 módulos completados ·{" "}
                  {progress.percent}%
                </span>
                <p className="fine-print">
                  Diseño de muestra. No es un certificado emitido ni una
                  acreditación oficial.
                </p>
              </div>
              <button className="button navy" onClick={() => setView("course")}>
                {all ? "Volver al material" : "Continuar aprendiendo"}
                <ArrowRight size={17} />
              </button>
            </section>
          ) : (
            <section className="lms-panel card support-panel">
              <Headphones size={40} />
              <h2>Te acompañamos en el recorrido</h2>
              <p>
                Resuelve las dudas más frecuentes sobre el aula de demostración.
              </p>
              {[
                [
                  "¿Cómo desbloqueo el siguiente módulo?",
                  "Revisa todas las páginas del módulo actual. Después pulsa “Marcar módulo como completado”. El siguiente módulo quedará disponible.",
                ],
                [
                  "¿Dónde se guarda mi avance?",
                  "En el almacenamiento local de este navegador. Retomarás tu avance desde este dispositivo; borrar los datos del navegador también lo elimina.",
                ],
                [
                  "¿Por qué no puedo completar el módulo?",
                  "Cada página debe cargarse en el visor. Revisa los indicadores de páginas para encontrar las que todavía no has visitado.",
                ],
                [
                  "¿Este curso entrega una certificación oficial?",
                  "Esta plataforma es una demostración comercial. La tarjeta de certificado es una previsualización sin validez oficial.",
                ],
                [
                  "¿Puedo reiniciar la demostración?",
                  "Sí. Usa Reiniciar demo y confirma la acción. Se elimina únicamente el progreso local de este curso.",
                ],
              ].map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
              <ButtonLink href="/contacto">
                Consultar sobre la capacitación
              </ButtonLink>
            </section>
          )}
          <div className="lms-footnote">
            <ShieldCheck size={14} />
            Demo educativa · El progreso se guarda en este navegador · Sin
            inscripción real
          </div>
        </main>
      </div>
      {feedback && (
        <div className="toast" role="status">
          <Check size={20} />
          <span>{feedback}</span>
          <button aria-label="Cerrar aviso" onClick={() => setFeedback("")}>
            <X size={17} />
          </button>
        </div>
      )}
      {reset && (
        <Modal
          title="¿Reiniciar el progreso de demostración?"
          onClose={() => setReset(false)}
        >
          <p>
            Se borrarán las páginas revisadas y los módulos completados de este
            curso en este navegador. Volverás al módulo 1.
          </p>
          <div className="actions">
            <button
              className="button secondary"
              onClick={() => setReset(false)}
            >
              Conservar progreso
            </button>
            <button
              className="button"
              onClick={() => {
                try {
                  localProgressRepository.reset();
                } catch {
                  setStorageError(true);
                }
                setProgress(freshProgress());
                setReaderSession((value) => value + 1);
                setPage(1);
                setView("course");
                setReset(false);
                setFeedback("Progreso reiniciado. Puedes comenzar nuevamente.");
              }}
            >
              Reiniciar progreso
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
