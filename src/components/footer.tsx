import Link from "next/link";
import { Brand } from "./ui";
import { navigation } from "@/data/site";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            Disciplina. Conocimiento. Oportunidades.
            <br />
            Formación que contribuye a un Chile más seguro.
          </p>
        </div>
        <div>
          <h3>Explora</h3>
          {navigation.slice(0, 4).map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Tu próximo paso</h3>
          <Link href="/cursos/os10-guardia-seguridad">
            Curso OS10 Guardia de Seguridad
          </Link>
          <Link href="/empresas#propuesta">Capacita a tu equipo</Link>
          <Link href="/contacto">Solicitar información</Link>
          <Link href="/nosotros">Nuestra identidad</Link>
        </div>
        <div>
          <h3>Formación con propósito</h3>
          <p>
            Conocimiento aplicado a la seguridad privada, al servicio de
            personas y organizaciones.
          </p>
          <span className="demo-pill">Plataforma demostración</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} PROTEXXION ACADEMY</span>
        <span>Demo comercial · Sin pagos ni cuentas reales</span>
      </div>
    </footer>
  );
}
