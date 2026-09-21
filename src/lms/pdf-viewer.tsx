"use client";
import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Maximize,
  Download,
  ScanLine,
  Check,
} from "lucide-react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
const options = {
  cMapUrl: "/pdfjs/cmaps/",
  standardFontDataUrl: "/pdfjs/standard_fonts/",
  wasmUrl: "/pdfjs/wasm/",
};
export default function PDFViewer({
  src,
  page,
  total,
  visited,
  onPage,
  onViewed,
}: {
  src: string;
  page: number;
  total: number;
  visited: number[];
  onPage: (page: number) => void;
  onViewed: (page: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(600);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  useEffect(() => {
    canvas.current?.scrollTo({ top: 0, left: 0 });
  }, [page]);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(180, entry.contentRect.width - 32)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="pdf-viewer" ref={wrapper}>
      <div className="pdf-toolbar">
        <div className="toolbar-group">
          <button
            aria-label="Página anterior"
            disabled={page === 1 || !loaded}
            onClick={() => onPage(page - 1)}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="page-count">
            Página <strong>{page}</strong> de {total}
          </span>
          <button
            aria-label="Página siguiente"
            disabled={page === total || !loaded}
            onClick={() => onPage(page + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="toolbar-group">
          <button
            aria-label="Reducir zoom"
            disabled={zoom <= 0.6}
            onClick={() => setZoom(Math.max(0.6, zoom - 0.2))}
          >
            <Minus size={18} />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            aria-label="Aumentar zoom"
            disabled={zoom >= 2}
            onClick={() => setZoom(Math.min(2, zoom + 0.2))}
          >
            <Plus size={18} />
          </button>
          <button aria-label="Ajustar al ancho" onClick={() => setZoom(1)}>
            <ScanLine size={19} />
          </button>
        </div>
        <div className="toolbar-group">
          <button
            aria-label="Pantalla completa"
            onClick={() => {
              if (document.fullscreenElement)
                document.exitFullscreen().catch(() => {});
              else wrapper.current?.requestFullscreen?.().catch(() => {});
            }}
          >
            <Maximize size={18} />
          </button>
          <a href={src} download aria-label="Descargar PDF actual">
            <Download size={18} />
          </a>
        </div>
      </div>
      <div className="pdf-body">
        <div className="page-rail" aria-label="Páginas del documento">
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => onPage(n)}
              disabled={!loaded}
              aria-label={`Ir a página ${n}`}
              aria-current={page === n ? "page" : undefined}
              className={`${page === n ? "active" : ""} ${visited.includes(n) ? "viewed" : ""}`}
            >
              <FilePage number={n} />
              {visited.includes(n) && <Check size={11} />}
            </button>
          ))}
        </div>
        <div className="pdf-canvas" ref={canvas}>
          <Document
            key={retry}
            file={src}
            options={options}
            onLoadSuccess={({ numPages }) => {
              setLoaded(numPages === total);
              setError(numPages !== total);
            }}
            onLoadError={() => setError(true)}
            loading={
              <div className="pdf-loading">
                <span className="spinner" />
                Preparando tu material de estudio…
              </div>
            }
            error={
              <div className="pdf-error">
                <h3>No se pudo abrir el material</h3>
                <p>Comprueba tu conexión e inténtalo nuevamente.</p>
                <button
                  className="button"
                  onClick={() => {
                    setError(false);
                    setRetry(retry + 1);
                  }}
                >
                  Volver a intentar
                </button>
              </div>
            }
          >
            {!error && (
              <Page
                pageNumber={page}
                width={Math.min(width, 850) * zoom}
                onRenderSuccess={() => onViewed(page)}
                onRenderError={() => setError(true)}
                loading={
                  <div className="pdf-loading">Cargando página {page}…</div>
                }
              />
            )}
          </Document>
          {error && loaded && (
            <p role="alert">
              No se pudo visualizar la página. Recarga el aula para volver a
              intentarlo.
            </p>
          )}
        </div>
      </div>
      <div className="reader-footer">
        <span>
          <Check size={14} />
          {visited.length} de {total} páginas revisadas
        </span>
        <span>Tu aprendizaje, a tu ritmo</span>
      </div>
    </div>
  );
}
function FilePage({ number }: { number: number }) {
  return (
    <span className="mini-page">
      <span />
      <span />
      <span />
      <b>{number}</b>
    </span>
  );
}
