"use client";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

export type POSProduct = { id: string; name: string; price: number; category: string };

const DEFAULT_PRODUCTS: POSProduct[] = [
  { id: "p1", name: "Hamburguesa", price: 11, category: "Principales" },
  { id: "p2", name: "Pizza Margarita", price: 14, category: "Principales" },
  { id: "p3", name: "Ensalada César", price: 9, category: "Entradas" },
  { id: "p4", name: "Papas fritas", price: 5, category: "Entradas" },
  { id: "p5", name: "Limonada", price: 4, category: "Bebidas" },
  { id: "p6", name: "Cerveza", price: 6, category: "Bebidas" },
  { id: "p7", name: "Tiramisú", price: 7, category: "Postres" },
  { id: "p8", name: "Helado", price: 5, category: "Postres" },
];

// colores por categoría (paleta vívida tipo Square)
const CAT_COLOR: Record<string, string> = {};
const PALETTE = ["bg-amber-100 text-amber-800", "bg-emerald-100 text-emerald-800", "bg-sky-100 text-sky-800", "bg-rose-100 text-rose-800", "bg-violet-100 text-violet-800", "bg-orange-100 text-orange-800"];
const money = (n: number) => "$" + n.toFixed(2);

/** Punto de venta (estilo Square/Toast): grid de productos por categoría a color
 *  + ticket en vivo (agregar, cantidad, total, cobrar). Módulo estrella de
 *  restaurante y retail. */
export function POSBoard({ products = DEFAULT_PRODUCTS }: { products?: POSProduct[] }) {
  const cats = useMemo(() => Array.from(new Set((products ?? []).map((p) => p.category))), [products]);
  (cats ?? []).forEach((c, i) => (CAT_COLOR[c] = PALETTE[i % PALETTE?.length]));
  const [cat, setCat] = useState(cats[0]);
  const [ticket, setTicket] = useState<Record<string, number>>({});
  const add = (id: string) => setTicket((t) => ({ ...t, [id]: (t[id] || 0) + 1 }));
  const sub = (id: string) => setTicket((t) => { const n = (t[id] || 0) - 1; const c = { ...t }; if (n <= 0) delete c[id]; else c[id] = n; return c; });
  const lines = Object.entries(ticket).map(([id, q]) => ({ p: (products ?? []).find((x) => x.id === id)!, q })).filter((l) => l.p);
  const total = (lines ?? []).reduce((a, l) => a + l.p.price * l.q, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* catálogo */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(cats ?? []).map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer",
                c === cat ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(products ?? []).filter((p) => p.category === cat).map((p) => (
            <button key={p.id} onClick={() => add(p.id)}
              className="flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
              <span className={cn("mb-3 rounded-lg px-2 py-0.5 text-xs font-semibold", CAT_COLOR[p.category])}>{p.category}</span>
              <span className="font-semibold text-slate-900">{p.name}</span>
              <span className="mt-1 text-sm font-bold text-brand">{money(p.price)}</span>
            </button>
          ))}
        </div>
      </div>
      {/* ticket */}
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-base font-semibold text-slate-900">Cuenta</h3>
        <div className="flex-1 space-y-2">
          {lines?.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Toca un producto para agregarlo.</p>
          ) : (lines ?? []).map((l) => (
            <div key={l.p.id} className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{l.p.name}</p>
                <p className="text-xs text-slate-500">{money(l.p.price)} c/u</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => sub(l.p.id)} className="h-6 w-6 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">−</button>
                <span className="w-5 text-center text-sm font-semibold">{l.q}</span>
                <button onClick={() => add(l.p.id)} className="h-6 w-6 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-slate-200 pt-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">Total</span>
            <span className="text-2xl font-bold text-slate-900">{money(total)}</span>
          </div>
          <button disabled={total === 0}
            className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40 cursor-pointer">
            Cobrar {total > 0 ? money(total) : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

export default POSBoard;
