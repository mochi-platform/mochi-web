import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { churnRate, estimateMrr, type RevenueRow } from '@/lib/revenue'

const prices = {
  monthly: Number(import.meta.env.VITE_PRICE_MONTHLY ?? 0),
  annual: Number(import.meta.env.VITE_PRICE_ANNUAL ?? 0),
}

export function AdminRevenuePage() {
  const [rows, setRows] = useState<RevenueRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void supabase.rpc('admin_revenue_summary').then(({ data, error: rpcError }) => {
      if (rpcError) setError(rpcError.message)
      else setRows((data as RevenueRow[] | null) ?? [])
    })
  }, [])

  if (error) return <p className="text-sm font-semibold text-red-600">{error}</p>
  if (!rows) return <p className="text-sm font-semibold text-slate-700">Cargando ingresos...</p>

  const mrr = estimateMrr(rows, prices)
  const active = rows.reduce((s, r) => s + r.active_count, 0)

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-950">Ingresos</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Suscripciones activas</p>
          <p className="text-3xl font-black text-slate-900">{active}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">MRR estimado</p>
          <p className="text-3xl font-black text-slate-900">{mrr === null ? '—' : `$${mrr.toFixed(2)}`}</p>
          {mrr === null ? (
            <p className="mt-1 text-xs text-slate-500">Define VITE_PRICE_MONTHLY y VITE_PRICE_ANNUAL para calcularlo.</p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Bajas (30 días)</p>
          <p className="text-3xl font-black text-slate-900">{(churnRate(rows) * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2">Producto</th>
              <th className="px-3 py-2">Tienda</th>
              <th className="px-3 py-2">Activas</th>
              <th className="px-3 py-2">Con renovación</th>
              <th className="px-3 py-2">Bajas 30 d</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.product_id}-${row.store}`} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-slate-900">{row.product_id ?? '—'}</td>
                <td className="px-3 py-2">{row.store ?? '—'}</td>
                <td className="px-3 py-2">{row.active_count}</td>
                <td className="px-3 py-2">{row.renewing_count}</td>
                <td className="px-3 py-2">{row.cancelled_30d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
