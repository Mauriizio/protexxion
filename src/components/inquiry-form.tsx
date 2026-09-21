"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
export function InquiryForm({ business = false }: { business?: boolean }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="inquiry card" id="propuesta">
      {sent ? (
        <div className="form-success" role="status">
          <CheckCircle2 size={52} />
          <span className="demo-pill">DEMOSTRACIÓN</span>
          <h2>Tu solicitud está preparada</h2>
          <p>
            Has completado el flujo de{" "}
            {business ? "propuesta empresarial" : "contacto"}. En esta demo, los
            datos no se envían ni se almacenan.
          </p>
          <button className="button" onClick={() => setSent(false)}>
            Realizar otra consulta
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <span className="form-eyebrow">CONVERSEMOS SOBRE TU FORMACIÓN</span>
          <h2>
            {business ? "Solicita una propuesta" : "Da el siguiente paso"}
          </h2>
          <p>
            {business
              ? "Cuéntanos qué necesita tu equipo."
              : "Cuéntanos qué te gustaría aprender."}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.currentTarget.reportValidity()) setSent(true);
            }}
          >
            {business && (
              <>
                <label>
                  Nombre de empresa
                  <input
                    name="company"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="organization"
                    placeholder="Nombre de tu empresa"
                  />
                </label>
                <label>
                  Cantidad aproximada de colaboradores
                  <select name="teamSize" required defaultValue="">
                    <option value="" disabled>
                      Selecciona un rango
                    </option>
                    <option>1 a 10</option>
                    <option>11 a 30</option>
                    <option>31 a 100</option>
                    <option>Más de 100</option>
                  </select>
                </label>
              </>
            )}
            <label>
              Nombre de contacto
              <input
                name="name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="Tu nombre"
              />
            </label>
            <div className="form-row">
              <label>
                Correo
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={150}
                  placeholder="Tu correo electrónico"
                />
              </label>
              <label>
                Teléfono{!business && " (opcional)"}
                <input
                  name="phone"
                  type="tel"
                  required={business}
                  autoComplete="tel"
                  pattern="[+0-9 ()-]{8,20}"
                  title="Ingresa entre 8 y 20 caracteres: números, espacios, +, paréntesis o guiones."
                  placeholder="Tu número de contacto"
                />
              </label>
            </div>
            <label>
              {business ? "Necesidad de capacitación" : "Área de interés"}
              <select name="need" required defaultValue="">
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option>Curso OS10 Guardia de Seguridad</option>
                <option>Capacitación de equipos</option>
                <option>Actualización de conocimientos</option>
                <option>Control de acceso y monitoreo</option>
                <option>Otro programa</option>
              </select>
            </label>
            <label>
              Mensaje
              <textarea
                name="message"
                rows={3}
                required
                minLength={10}
                maxLength={2000}
                placeholder="Cuéntanos tus objetivos y necesidades de capacitación."
              />
            </label>
            <button className="button" type="submit">
              {business ? "Solicitar propuesta" : "Enviar consulta"}
              <ArrowRight size={18} />
            </button>
            <p className="form-disclaimer">
              <ShieldCheck size={17} />
              Flujo de demostración. No se envían ni almacenan datos.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
