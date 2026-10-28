export type RevenueRow = {
  product_id: string | null
  store: string | null
  active_count: number
  renewing_count: number
  cancelled_30d: number
}

export type Prices = { monthly: number; annual: number }

export const isAnnualProduct = (productId: string | null): boolean => /annual|year|anual/i.test(productId ?? '')

/** MRR estimado = mensuales × precio + anuales × precio / 12. Devuelve null si faltan precios. */
export function estimateMrr(rows: RevenueRow[], prices: Prices): number | null {
  if (!(prices.monthly > 0) || !(prices.annual > 0)) return null
  const total = rows.reduce(
    (sum, row) => sum + row.active_count * (isAnnualProduct(row.product_id) ? prices.annual / 12 : prices.monthly),
    0,
  )
  return Math.round(total * 100) / 100
}

/** Cancelaciones de los últimos 30 días frente a (activas + canceladas). */
export function churnRate(rows: RevenueRow[]): number {
  const active = rows.reduce((s, r) => s + r.active_count, 0)
  const lost = rows.reduce((s, r) => s + r.cancelled_30d, 0)
  return active + lost === 0 ? 0 : lost / (active + lost)
}
