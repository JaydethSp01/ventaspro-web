"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Target, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

const MOCK = {
  stats: [
    { label: "Leads", value: 248, icon: <Users size={20} />, trend: { value: "14%", positive: true } },
    { label: "Oportunidades", value: 32, icon: <Target size={20} />, trend: { value: "9%", positive: true } },
    { label: "MRR", value: "$42.8k", icon: <DollarSign size={20} />, trend: { value: "6%", positive: true } },
    { label: "Conversión", value: "24%", icon: <TrendingUp size={20} />, trend: { value: "2%", positive: false } },
  ],
  pipeline: [
    { label: "Ene", value: 22000 }, { label: "Feb", value: 28000 }, { label: "Mar", value: 25000 },
    { label: "Abr", value: 34000 }, { label: "May", value: 39000 }, { label: "Jun", value: 42800 }, { label: "Jul", value: 47000 },
  ],
  etapas: [
    { n: "Prospecto", p: 34 }, { n: "Calificado", p: 26 },
    { n: "Negociación", p: 22 }, { n: "Cierre", p: 18 },
  ],
  deals: [
    { contacto: "Carlos Ruiz", empresa: "TechCorp", etapa: "Ganado", monto: 18500 },
    { contacto: "Elena Ríos", empresa: "SoftSolutions", etapa: "Negociación", monto: 24000 },
    { contacto: "Juan Pérez", empresa: "Innova Labs", etapa: "Nuevo", monto: 6800 },
    { contacto: "Ana Gómez", empresa: "DataBridge", etapa: "Negociación", monto: 15200 },
    { contacto: "Luis Martínez", empresa: "Cloudly", etapa: "Perdido", monto: 4300 },
  ],
};

const tone = (e: string) =>
  e === "Ganado" ? "success" : e === "Negociación" ? "info" : e === "Nuevo" ? "warning" : "danger";

const money = (n: number) => `$${n.toLocaleString("es-CO")}`;

export default function CRMPage() {
  const [data] = useState(MOCK);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Hero
        title="Buenos días, equipo Ventas"
        subtitle="Tienes 32 oportunidades abiertas y un MRR de $42.8k este mes — el pipeline crece 14%."
        action={
          <Button
            variant="secondary"
            className="!bg-white !text-brand cursor-pointer"
            onClick={() => router.push("/oportunidades/create")}
          >
            <Plus size={16} /> Nueva oportunidad
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(data.stats ?? []).map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} trend={s.trend} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Pipeline por mes" subtitle="Valor del pipeline (USD)" data={data.pipeline} />
        <Card>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Por etapa del embudo</h3>
          <div className="space-y-3">
            {(data.etapas ?? []).map((e) => (
              <div key={e.n}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{e.n}</span>
                  <span className="text-slate-500">{e.p}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${e.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="!p-0">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-900">Deals recientes</h3>
          <Badge tone="brand">{data.deals?.length} activos</Badge>
        </div>
        <ul className="divide-y divide-slate-100">
          {(data.deals ?? []).map((d, i) => (
            <li key={i} className="flex items-center gap-4 p-5">
              <Avatar name={d.contacto} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{d.contacto}</p>
                <p className="truncate text-sm text-slate-500">{d.empresa}</p>
              </div>
              <span className="hidden text-sm font-semibold text-slate-700 sm:block">{money(d.monto)}</span>
              <Badge tone={tone(d.etapa)}>{d.etapa}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
