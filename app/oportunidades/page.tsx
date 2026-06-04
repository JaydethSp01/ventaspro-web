"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

type Oportunidad = {
  id: number;
  nombre: string;
  contacto: string;
  etapa: string;
  valor: number;
};

const MOCK: Oportunidad[] = [
  { id: 1, nombre: "Licencias Enterprise", contacto: "Carlos Ruiz", etapa: "Ganado", valor: 18500 },
  { id: 2, nombre: "Migración a la nube", contacto: "Elena Ríos", etapa: "Negociación", valor: 24000 },
  { id: 3, nombre: "Plan Starter anual", contacto: "Juan Pérez", etapa: "Nuevo", valor: 6800 },
  { id: 4, nombre: "Integración API", contacto: "Ana Gómez", etapa: "Negociación", valor: 15200 },
  { id: 5, nombre: "Soporte Premium", contacto: "Luis Martínez", etapa: "Perdido", valor: 4300 },
  { id: 6, nombre: "Renovación SaaS", contacto: "Sofía Vargas", etapa: "Ganado", valor: 12700 },
];

const tone = (e: string) =>
  e === "Ganado" ? "success" : e === "Negociación" ? "info" : e === "Nuevo" ? "warning" : "danger";

const money = (n: number) => `$${n.toLocaleString("es-CO")}`;

export default function OportunidadesPage() {
  const [data] = useState(MOCK);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Oportunidades"
        subtitle="Deals abiertos en tu pipeline de ventas."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/oportunidades/create")}>
            <Plus size={16} /> Nueva oportunidad
          </Button>
        }
      />

      <Card className="!p-0">
        <DataTable<Oportunidad>
          rows={data}
          columns={[
            {
              key: "contacto",
              header: "Contacto",
              render: (r) => (
                <div className="flex items-center gap-3">
                  <Avatar name={r.contacto} />
                  <div>
                    <p className="font-medium text-slate-900">{r.contacto}</p>
                    <p className="text-xs text-slate-500">{r.nombre}</p>
                  </div>
                </div>
              ),
            },
            { key: "etapa", header: "Etapa", render: (r) => <Badge tone={tone(r.etapa)}>{r.etapa}</Badge> },
            {
              key: "valor",
              header: "Valor",
              align: "right",
              render: (r) => <span className="font-semibold text-slate-700">{money(r.valor)}</span>,
            },
            {
              key: "acciones",
              header: "Acciones",
              align: "right",
              render: () => (
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" className="cursor-pointer">
                    <Pencil size={15} /> Editar
                  </Button>
                  <Button variant="danger" className="cursor-pointer">
                    <Trash2 size={15} /> Eliminar
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
