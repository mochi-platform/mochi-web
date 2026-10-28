import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useProfile } from '@/hooks/useProfile'
import { useSession } from '@/hooks/useSession'
import { supabase } from '@/lib/supabase'

const PLAY_SUBSCRIPTIONS_URL = 'https://play.google.com/store/account/subscriptions'

export function AccountPage() {
  const { session, loading, signOut } = useSession()
  const { profile } = useProfile()
  const navigate = useNavigate()
  const [busy, setBusy] = useState<'export' | 'delete' | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [confirmText, setConfirmText] = useState('')

  if (loading) return <p className="p-8 text-sm text-purple-800">Cargando...</p>
  if (!session) {
    navigate('/login', { replace: true })
    return null
  }

  async function exportData() {
    setBusy('export')
    setMessage(null)
    const { data, error } = await supabase.functions.invoke('export-data')
    setBusy(null)
    if (error || !data) {
      setMessage('No se pudo exportar tus datos. Intenta de nuevo en unos minutos.')
      return
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'mis-datos-mochi.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  async function deleteAccount() {
    setBusy('delete')
    setMessage(null)
    const { data, error } = await supabase.functions.invoke('delete-account', {
      body: { confirm: 'ELIMINAR' },
    })
    if (error || !data?.ok) {
      setBusy(null)
      setMessage('No se pudo eliminar la cuenta. Intenta de nuevo en unos minutos.')
      return
    }
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-purple-50 px-4 py-10">
      <h1 className="text-2xl font-extrabold text-purple-900">Mi cuenta</h1>
      <p className="mt-1 text-sm font-semibold text-purple-700">{session.user.email}</p>

      <Card className="mt-6 space-y-3 p-5">
        <h2 className="text-lg font-bold text-purple-900">Suscripción</h2>
        <p className="text-sm text-purple-800">
          Las suscripciones se gestionan en Google Play.
        </p>
        <Button asChild variant="outline">
          <a href={PLAY_SUBSCRIPTIONS_URL} target="_blank" rel="noreferrer noopener">
            Gestionar en Google Play
          </a>
        </Button>
      </Card>

      <Card className="mt-4 space-y-3 p-5">
        <h2 className="text-lg font-bold text-purple-900">Mis datos</h2>
        <p className="text-sm text-purple-800">
          Descarga una copia de los datos que Mochi guarda de ti (derecho de acceso y portabilidad).
        </p>
        <Button onClick={() => void exportData()} disabled={busy !== null}>
          {busy === 'export' ? 'Preparando...' : 'Exportar mis datos'}
        </Button>
      </Card>

      <Card className="mt-4 space-y-3 border-red-200 p-5">
        <h2 className="text-lg font-bold text-red-700">Eliminar mi cuenta</h2>
        <p className="text-sm text-purple-800">
          Se borran tu cuenta y todos tus datos de forma permanente. Si tienes una suscripción, cancélala también en Google Play.
        </p>
        <label className="block text-sm font-semibold text-purple-900" htmlFor="confirm-delete">
          Escribe ELIMINAR para confirmar
        </label>
        <input
          id="confirm-delete"
          className="w-full rounded-xl border border-purple-200 px-3 py-2"
          value={confirmText}
          onChange={(event) => setConfirmText(event.target.value)}
        />
        <Button
          variant="destructive"
          disabled={busy !== null || confirmText !== 'ELIMINAR'}
          onClick={() => void deleteAccount()}
        >
          {busy === 'delete' ? 'Eliminando...' : 'Eliminar mi cuenta'}
        </Button>
      </Card>

      {message ? <p className="mt-4 text-sm font-semibold text-red-600">{message}</p> : null}

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-purple-800">
        {profile?.is_admin ? <Link to="/admin">Panel de administración</Link> : null}
        <Link to="/privacy">Privacidad</Link>
        <Link to="/terms">Términos</Link>
        <button type="button" onClick={() => void signOut()}>
          Cerrar sesión
        </button>
      </div>
    </main>
  )
}
