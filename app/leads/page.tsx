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

type Lead = {
  id: number;
  nombre: string;
  email: string;
  empresa: string;
  estado: string;
};

const MOCK: Lead[] = [
  { id: 1, nombre: "Juan Pérez", email: "juan@innovalabs.com", empresa: "Innova Labs", estado: "Nuevo" },
  { id: 2, nombre: "Ana Gómez", email: "ana@databridge.io", empresa: "DataBridge", estado: "Contactado" },
  { id: 3, nombre: "Luis Martínez", email: "luis@cloudly.com", empresa: "Cloudly", estado: "Calificado" },
  { id: 4, nombre: "María López", email: "maria@nextwave.co", empresa: "NextWave", estado: "Calificado" },
  { id: 5, nombre: "Pedro Suárez", email: "pedro@brightco.com", empresa: "BrightCo", estado: "Contactado" },
  { id: 6, nombre: "Sofía Vargas", email: "sofia@orbit.dev", empresa: "Orbit", estado: "Perdido" },
];

const tone = (e: string) =>
  e === "Calificado" ? "success" : e === "Contactado" ? "info" : e === "Nuevo" ? "warning" : "danger";

export default function LeadsPage() {
  const [data] = useState(MOCK);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        subtitle="Prospectos en la parte alta del embudo."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/leads/create")}>
            <Plus size={16} /> Nuevo lead
          </Button>
        }
      />

      <Card className="!p-0">
        <DataTable<Lead>
          rows={data}
          columns={[
            {
              key: "nombre",
              header: "Lead",
              render: (r) => (
                <div className="flex items-center gap-3">
                  <Avatar name={r.nombre} />
                  <div>
                    <p className="font-medium text-slate-900">{r.nombre}</p>
                    <p className="text-xs text-slate-500">{r.email}</p>
                  </div>
                </div>
              ),
            },
            { key: "empresa", header: "Empresa" },
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
