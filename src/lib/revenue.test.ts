import { describe, expect, it } from 'vitest'
import { churnRate, estimateMrr, isAnnualProduct, type RevenueRow } from './revenue'

const rows: RevenueRow[] = [
  { product_id: 'mochi_monthly', store: 'play_store', active_count: 10, renewing_count: 8, cancelled_30d: 2 },
  { product_id: 'mochi_annual', store: 'play_store', active_count: 6, renewing_count: 5, cancelled_30d: 0 },
]

describe('revenue', () => {
  it('detecta productos anuales', () => {
    expect(isAnnualProduct('mochi_annual')).toBe(true)
    expect(isAnnualProduct('mochi_monthly')).toBe(false)
    expect(isAnnualProduct(null)).toBe(false)
  })
  it('estima el MRR con precios', () => {
    expect(estimateMrr(rows, { monthly: 3, annual: 24 })).toBe(42)
  })
  it('sin precios no inventa un MRR', () => {
    expect(estimateMrr(rows, { monthly: 0, annual: 0 })).toBeNull()
  })
  it('calcula las bajas', () => {
    expect(churnRate(rows)).toBeCloseTo(2 / 18)
    expect(churnRate([])).toBe(0)
  })
})
