"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type Slot = { day: string; time: string; patient?: string };

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie"];
const TIMES = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00"];
const DEFAULT_BOOKED: Record<string, string> = {
  "Lun-09:00": "Juan Pérez", "Lun-11:00": "Ana Gómez", "Mar-10:00": "Carlos Ruiz",
  "Mié-12:00": "Laura M.", "Jue-15:00": "Diego R.", "Vie-16:00": "Sofía L.",
};

/** Agendador de citas (estilo Doctoralia/Calendly): grilla día×hora con slots
 *  ocupados (paciente) y libres clicables para reservar. Módulo estrella de salud. */
export function AppointmentScheduler({
  professionals = ["Dra. Rodríguez", "Dr. Fernández", "Dra. López"],
  booked = DEFAULT_BOOKED,
}: {
  professionals?: string[];
  booked?: Record<string, string>;
}) {
  const [pro, setPro] = useState(professionals[0]);
  const [picked, setPicked] = useState<string | null>(null);
  const [local, setLocal] = useState<Record<string, string>>(booked);

  const reserve = (key: string) => {
    if (local[key]) return;
    setPicked(key);
    setLocal((b) => ({ ...b, [key]: "Reservado" }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-500">Profesional:</span>
        {(professionals ?? []).map((p) => (
          <button key={p} onClick={() => setPro(p)}
            className={cn("rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer",
              p === pro ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
            {p}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-2" style={{ gridTemplateColumns: `64px repeat(${DAYS?.length}, minmax(96px,1fr))` }}>
          <div />
          {(DAYS ?? []).map((d) => <div key={d} className="pb-1 text-center text-sm font-semibold text-slate-700">{d}</div>)}
          {(TIMES ?? []).map((t) => (
            <FragmentRow key={t} t={t} days={DAYS} local={local} picked={picked} onPick={reserve} />
          ))}
        </div>
      </div>
      {picked ? (
        <p className="rounded-lg bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
          ✓ Cita reservada con {pro} — {picked.replace("-", " · ")}
        </p>
      ) : (
        <p className="text-sm text-slate-500">Toca un horario libre para reservar.</p>
      )}
    </div>
  );
}

function FragmentRow({ t, days, local, picked, onPick }: {
  t: string; days: string[]; local: Record<string, string>; picked: string | null; onPick: (k: string) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-end pr-2 text-xs font-medium text-slate-400">{t}</div>
      {(days ?? []).map((d) => {
        const key = `${d}-${t}`;
        const taken = local[key];
        const isPicked = picked === key;
        return (
          <button key={key} onClick={() => onPick(key)} disabled={!!taken && !isPicked}
            className={cn(
              "h-12 rounded-lg border text-xs font-medium transition",
              isPicked ? "border-brand bg-brand text-white"
              : taken ? "border-slate-200 bg-slate-50 text-slate-500 cursor-default"
              : "border-dashed border-slate-300 text-slate-400 hover:border-brand hover:bg-brand/5 hover:text-brand cursor-pointer"
            )}>
            {taken ? <span className="truncate px-1">{taken}</span> : "+"}
          </button>
        );
      })}
    </>
  );
}

export default AppointmentScheduler;
