import { cn } from "@/lib/cn";

type Point = { label: string; value: number };

/** Card con mini gráfico de barras SVG (sin dependencias). Da sensación de
 *  "dashboard con datos" premium sin librerías pesadas. */
export function ChartCard({
  title,
  subtitle,
  data,
  className,
}: {
  title: string;
  subtitle?: string;
  data: Point[];
  className?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex items-end gap-3">
        {(data ?? []).map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-brand/60 to-brand transition-all hover:opacity-90"
                style={{ height: `${Math.max(4, Math.round((d.value / max) * 100))}%` }}
                title={`${d.label}: ${d.value}`}
              />
            </div>
            <span className="text-xs font-medium text-slate-500">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartCard;
