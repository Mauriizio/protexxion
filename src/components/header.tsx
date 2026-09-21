"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserRound, ArrowRight } from "lucide-react";
import { Brand } from "./ui";
import { navigation } from "@/data/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button
          className="icon-button menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Navegación principal"
          className={open ? "main-nav open" : "main-nav"}
        >
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={
                (n.href === "/" ? path === "/" : path.startsWith(n.href))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link className="login" href="/acceso" onClick={() => setOpen(false)}>
            <UserRound size={17} />
            Iniciar sesión
          </Link>
          <Link
            className="button header-cta"
            href="/contacto"
            onClick={() => setOpen(false)}
          >
            Solicitar información
            <ArrowRight size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
