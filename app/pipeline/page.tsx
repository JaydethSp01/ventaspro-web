"use client";
export const dynamic = "force-dynamic";
import { KanbanBoard } from "@/components/ui/KanbanBoard";
import { PageHeader } from "@/components/ui/PageHeader";
export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pipeline de ventas" subtitle="Arrastra tus oportunidades por etapa hasta cerrarlas." />
      <KanbanBoard />
    </div>
  );
}
