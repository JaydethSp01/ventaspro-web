export const dynamic = "force-dynamic";
import "./globals.css";
import { ProtectedShell } from "@/components/ui/ProtectedShell";

const NAV = [{ href: "/", label: "Inicio" }, { href: "/actividades", label: "Actividades" }, { href: "/contactos", label: "Contactos" }, { href: "/dashboard", label: "Dashboard" }, { href: "/leads", label: "Leads" }, { href: "/oportunidades", label: "Oportunidades" }, { href: "/pipeline", label: "Pipeline" }, { href: "/usuarios", label: "Usuarios" }];

export const metadata = { title: "Ventas Pro", description: "Generado con ScrumDev AI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ProtectedShell items={NAV} title="Ventas Pro">{children}</ProtectedShell>
      </body>
    </html>
  );
}
