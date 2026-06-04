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

type Actividad = {
  id: number;
  contacto: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  estado: string;
};

const MOCK: Actividad[] = [
  { id: 1, contacto: "Carlos Ruiz", tipo: "Llamada", descripcion: "Cierre de licencias Enterprise", fecha: "2026-06-03", estado: "Completada" },
  { id: 2, contacto: "Elena Ríos", tipo: "Reunión", descripcion: "Demo de migración a la nube", fecha: "2026-06-04", estado: "Pendiente" },
  { id: 3, contacto: "Juan Pérez", tipo: "Email", descripcion: "Envío de propuesta Starter", fecha: "2026-06-02", estado: "Completada" },
  { id: 4, contacto: "Ana Gómez", tipo: "Llamada", descripcion: "Seguimiento integración API", fecha: "2026-06-05", estado: "Pendiente" },
  { id: 5, contacto: "Luis Martínez", tipo: "Reunión", descripcion: "Revisión de soporte premium", fecha: "2026-06-01", estado: "Cancelada" },
];

const tone = (e: string) =>
  e === "Completada" ? "success" : e === "Pendiente" ? "warning" : "danger";

export default function ActividadesPage() {
  const [data] = useState(MOCK);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Actividades"
        subtitle="Llamadas, reuniones y correos del equipo comercial."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/actividades/create")}>
            <Plus size={16} /> Nueva actividad
          </Button>
        }
      />

      <Card className="!p-0">
        <DataTable<Actividad>
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
                    <p className="text-xs text-slate-500">{r.tipo} · {r.descripcion}</p>
                  </div>
                </div>
              ),
            },
            { key: "fecha", header: "Fecha" },
            { key: "estado", header: "Estado", render: (r) => <Badge tone={tone(r.estado)}>{r.estado}</Badge> },
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
