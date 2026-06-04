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

type Contacto = {
  id: number;
  nombre: string;
  empresa: string;
  cargo: string;
  telefono: string;
  tipo: string;
};

const MOCK: Contacto[] = [
  { id: 1, nombre: "Carlos Ruiz", empresa: "TechCorp", cargo: "CTO", telefono: "+57 300 111 2233", tipo: "Cliente" },
  { id: 2, nombre: "Elena Ríos", empresa: "SoftSolutions", cargo: "Gerente de TI", telefono: "+57 311 444 5566", tipo: "Cliente" },
  { id: 3, nombre: "Juan Pérez", empresa: "Innova Labs", cargo: "Fundador", telefono: "+57 320 777 8899", tipo: "Prospecto" },
  { id: 4, nombre: "Ana Gómez", empresa: "DataBridge", cargo: "Directora", telefono: "+57 301 222 3344", tipo: "Prospecto" },
  { id: 5, nombre: "Sofía Vargas", empresa: "Orbit", cargo: "COO", telefono: "+57 315 555 6677", tipo: "Cliente" },
];

const tone = (t: string) => (t === "Cliente" ? "success" : "info");

export default function ContactosPage() {
  const [data] = useState(MOCK);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contactos"
        subtitle="Personas con las que mantienes relación comercial."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/contactos/create")}>
            <Plus size={16} /> Nuevo contacto
          </Button>
        }
      />

      <Card className="!p-0">
        <DataTable<Contacto>
          rows={data}
          columns={[
            {
              key: "nombre",
              header: "Contacto",
              render: (r) => (
                <div className="flex items-center gap-3">
                  <Avatar name={r.nombre} />
                  <div>
                    <p className="font-medium text-slate-900">{r.nombre}</p>
                    <p className="text-xs text-slate-500">{r.cargo} · {r.empresa}</p>
                  </div>
                </div>
              ),
            },
            { key: "telefono", header: "Teléfono" },
            { key: "tipo", header: "Tipo", render: (r) => <Badge tone={tone(r.tipo)}>{r.tipo}</Badge> },
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
