import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

type Grant = {
  id: string
  user_id: string
  full_name: string | null
  entitlement: string
  reason: string | null
  expires_at: string | null
  created_at: string
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function AdminGrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState('')
  const [entitlement, setEntitlement] = useState('premium')
  const [reason, setReason] = useState('')
  const [expires, setExpires] = useState('')

  const load = useCallback(async () => {
    const { data, error: rpcError } = await supabase.rpc('admin_list_grants')
    if (rpcError) setError(rpcError.message)
    else setGrants((data as Grant[] | null) ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function onGrant(event: FormEvent) {
    event.preventDefault()
    setError(null)
    if (!UUID.test(userId.trim())) return setError('El ID de usuaria no es válido.')
    const { error: rpcError } = await supabase.rpc('admin_grant_entitlement', {
      p_user_id: userId.trim(),
      p_entitlement: entitlement,
      p_reason: reason.trim() || null,
      p_expires_at: expires ? new Date(expires).toISOString() : null,
    })
    if (rpcError) return setError(rpcError.message)
    setUserId('')
    setReason('')
    setExpires('')
    await load()
  }

  async function onRevoke(grant: Grant) {
    if (!window.confirm(`¿Quitar "${grant.entitlement}" a ${grant.full_name ?? grant.user_id}?`)) return
    const { error: rpcError } = await supabase.rpc('admin_revoke_grant', { p_grant_id: grant.id })
    if (rpcError) setError(rpcError.message)
    else await load()
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-950">Concesiones</h1>
      {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}

      <form onSubmit={onGrant} className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5">
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="ID de usuaria (UUID)" className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2" />
        <select value={entitlement} onChange={(e) => setEntitlement(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
          <option value="premium">Premium</option>
          <option value="unlimited_ai">IA sin límites</option>
        </select>
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motivo" maxLength={200} className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <input type="date" value={expires} onChange={(e) => setExpires(e.target.value)} aria-label="Vence (opcional)" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white md:col-span-5">Conceder</button>
      </form>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2">Usuaria</th>
              <th className="px-3 py-2">Concesión</th>
              <th className="px-3 py-2">Motivo</th>
              <th className="px-3 py-2">Vence</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {grants.map((grant) => (
              <tr key={grant.id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-slate-900">{grant.full_name ?? grant.user_id}</td>
                <td className="px-3 py-2">{grant.entitlement}</td>
                <td className="px-3 py-2">{grant.reason ?? '—'}</td>
                <td className="px-3 py-2">{grant.expires_at ? new Date(grant.expires_at).toLocaleDateString('es-ES') : 'Nunca'}</td>
                <td className="px-3 py-2 text-right">
                  <button type="button" onClick={() => void onRevoke(grant)} className="rounded-lg border border-red-200 px-2 py-1 text-xs font-bold text-red-600">Quitar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
