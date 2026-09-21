import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://protexxion-academy-demo.vercel.app",
  ),
  title: {
    default: "Protexxion Academy | Capacitación en Seguridad",
    template: "%s | Protexxion Academy",
  },
  description:
    "Capacitación en seguridad privada, cursos para guardias y formación para empresas en Chile. Conoce el aula virtual de PROTEXXION ACADEMY.",
  openGraph: {
    title: "PROTEXXION ACADEMY",
    description: "Personas capacitadas, sociedades más seguras.",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/images/team.webp", width: 1600, height: 900 }],
  },
  icons: { icon: "/icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
