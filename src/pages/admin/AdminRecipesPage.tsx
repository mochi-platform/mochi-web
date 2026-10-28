import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Report = {
  publication_id: string
  title: string
  owner_name: string
  is_hidden: boolean
  open_reports: number
  reasons: string[]
  last_report_at: string
}

const REASON_LABELS: Record<string, string> = {
  inappropriate: 'Inapropiada',
  spam: 'Spam',
  dangerous: 'Peligrosa',
  copyright: 'Derechos de autor',
  other: 'Otro',
}

export function AdminRecipesPage() {
  const [rows, setRows] = useState<Report[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error: rpcError } = await supabase.rpc('admin_list_recipe_reports')
    if (rpcError) setError(rpcError.message)
    else setRows((data as Report[] | null) ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function resolve(row: Report, hide: boolean) {
    const { error: rpcError } = await supabase.rpc('admin_resolve_recipe_reports', {
      p_publication_id: row.publication_id,
      p_hide: hide,
    })
    if (rpcError) setError(rpcError.message)
    else await load()
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-950">Recetas reportadas</h1>
      {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
      {!rows ? <p className="mt-3 text-sm font-semibold text-slate-700">Cargando...</p> : null}
      {rows?.length === 0 ? <p className="mt-3 text-sm text-slate-600">No hay reportes abiertos.</p> : null}

      <div className="mt-4 space-y-3">
        {rows?.map((row) => (
          <div key={row.publication_id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-base font-bold text-slate-900">{row.title}</p>
                <p className="text-xs text-slate-500">
                  Por {row.owner_name || 'sin nombre'} · {row.open_reports} reporte(s) ·{' '}
                  {row.reasons.map((reason) => REASON_LABELS[reason] ?? reason).join(', ')}
                </p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${row.is_hidden ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {row.is_hidden ? 'Oculta' : 'Visible'}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => void resolve(row, true)} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">Retirar</button>
              <button type="button" onClick={() => void resolve(row, false)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700">Descartar reportes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
