import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import type { VoucherTemplate } from '@/types/database'

type TemplateForm = {
  id?: string
  title: string
  description: string
  points_cost: number
  icon: string
  color: string
}

const initialForm: TemplateForm = {
  title: '',
  description: '',
  points_cost: 50,
  icon: 'gift-outline',
  color: 'pink',
}

export function AdminVouchersPage() {
  const [templates, setTemplates] = useState<VoucherTemplate[]>([])
  const [form, setForm] = useState<TemplateForm>(initialForm)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    const [tplRes] = await Promise.all([
      supabase.from('voucher_templates').select('*').order('points_cost', { ascending: true }).returns<VoucherTemplate[]>(),
    ])

    if (tplRes.error) {
      setError(tplRes.error?.message ?? 'No se pudo cargar vales')
      return
    }

    setTemplates(tplRes.data ?? [])
  }

  useEffect(() => {
    void load()
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!form.icon.trim()) {
      setError('El icono no puede estar vacío')
      return
    }

    if (form.id) {
      const { error: updateError } = await supabase.from('voucher_templates').update(form).eq('id', form.id)
      if (updateError) setError(updateError.message)
    } else {
      const { error: insertError } = await supabase.from('voucher_templates').insert(form)
      if (insertError) setError(insertError.message)
    }

    setForm(initialForm)
    await load()
  }

  const removeTemplate = async (id: string) => {
    if (!window.confirm('¿Eliminar plantilla?')) return
    const { error: deleteError } = await supabase.from('voucher_templates').delete().eq('id', id)
    if (deleteError) setError(deleteError.message)
    await load()
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-950">Vales</h1>

      <form className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-5" onSubmit={(e) => { void handleSubmit(e) }}>
        <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Título" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <input value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Descripción" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <input type="number" value={form.points_cost} onChange={(e) => setForm((prev) => ({ ...prev, points_cost: Number(e.target.value) }))} placeholder="Costo" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <input value={form.icon} onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))} placeholder="Icono Ionicons" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <select value={form.color} onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))} className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <option value="pink">pink</option><option value="purple">purple</option><option value="yellow">yellow</option><option value="blue">blue</option><option value="mint">mint</option><option value="green">green</option><option value="orange">orange</option>
          </select>
          <button type="submit" className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">{form.id ? 'Actualizar' : 'Crear'}</button>
        </div>
      </form>

      {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-base font-bold text-slate-900">Plantillas</h2>
        <div className="mt-3 space-y-2">
          {templates.map((template) => (
            <div key={template.id} className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2">
              <p className="text-sm font-semibold text-slate-800">{template.title} · {template.points_cost} pts · {template.icon} · {template.color}</p>
              <div className="flex gap-2">
                <button type="button" className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-slate-700" onClick={() => setForm({ ...template })}>Editar</button>
                <button type="button" className="rounded-lg bg-red-100 px-2 py-1 text-xs font-bold text-red-700" onClick={() => { void removeTemplate(template.id) }}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
