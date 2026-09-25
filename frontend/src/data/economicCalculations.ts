import type { Batch, EconomicData, ProductionStage } from './types'

export type EconomicCategory = 'Scrap / Defect' | 'Downtime' | 'Throughput' | 'Material' | 'Revenue Exposure'

export interface EconomicRow {
  key: string
  label: string
  amount: number | null
  displayValue: string
  status: 'ESTIMATED' | 'PARTIAL'
  basis: string
  formula: string
}

export interface EconomicImpact {
  rows: EconomicRow[]
  total: number | null
  totalDisplay: string
  isPartial: boolean
  missingAssumptions: string[]
  formulas: Array<{ label: string; formula: string; value: string }>
}

const currency = (value: number) => `${value.toLocaleString()} demo currency units`
const unavailable = 'Assumption not available in supplied data.'

export function calculateEconomicImpact(economics?: EconomicData, batch?: Batch, stage?: ProductionStage): EconomicImpact {
  const missingAssumptions: string[] = []
  const scrap = economics && batch ? batch.defectCount * economics.scrapCost : null
  const downtime = economics?.downtimeCost ?? null
  const throughputGap = stage ? Math.max(stage.capacity - stage.throughput, 0) : null
  const unitMargin = economics ? economics.sellingPrice - economics.unitCost : null
  const throughput = throughputGap !== null && unitMargin !== null ? throughputGap * unitMargin : null
  const material = economics && batch ? batch.defectCount * economics.unitCost : null
  const revenue = economics?.revenueExposure ?? null

  if (scrap === null) missingAssumptions.push('Scrap / defect cost inputs')
  if (downtime === null) missingAssumptions.push('Downtime cost')
  if (throughput === null) missingAssumptions.push('Throughput exposure inputs')
  if (material === null) missingAssumptions.push('Material cost inputs')
  if (revenue === null) missingAssumptions.push('Revenue exposure')

  const rows: EconomicRow[] = [
    { key: 'scrap', label: 'Scrap / Defect Cost', amount: scrap, displayValue: scrap === null ? unavailable : currency(scrap), status: scrap === null ? 'PARTIAL' : 'ESTIMATED', basis: 'Defective units x assumed scrap cost', formula: batch && economics ? `${batch.defectCount} defective units x ${economics.scrapCost}` : unavailable },
    { key: 'downtime', label: 'Downtime Cost', amount: downtime, displayValue: downtime === null ? unavailable : currency(downtime), status: downtime === null ? 'PARTIAL' : 'ESTIMATED', basis: 'Supplied downtime cost estimate', formula: downtime === null ? unavailable : 'Supplied economic assumption' },
    { key: 'throughput', label: 'Throughput Loss', amount: throughput, displayValue: throughput === null ? unavailable : currency(throughput), status: throughput === null ? 'PARTIAL' : 'ESTIMATED', basis: 'Capacity gap x derived unit margin', formula: stage && unitMargin !== null ? `${throughputGap} units/hr gap x ${unitMargin} unit margin` : unavailable },
    { key: 'material', label: 'Material Cost', amount: material, displayValue: material === null ? unavailable : currency(material), status: material === null ? 'PARTIAL' : 'ESTIMATED', basis: 'Defective units x supplied unit cost', formula: batch && economics ? `${batch.defectCount} defective units x ${economics.unitCost}` : unavailable },
    { key: 'revenue', label: 'Revenue Exposure', amount: revenue, displayValue: revenue === null ? unavailable : currency(revenue), status: revenue === null ? 'PARTIAL' : 'ESTIMATED', basis: 'Supplied revenue exposure estimate', formula: revenue === null ? unavailable : 'Supplied economic assumption' },
  ]
  const complete = rows.every((row) => row.amount !== null)
  // Components are retained individually; supplied assumptions do not establish that they are non-overlapping.
  const total = null
  return {
    rows,
    total,
    totalDisplay: unavailable,
    isPartial: !complete,
    missingAssumptions,
    formulas: rows.map((row) => ({ label: row.label, formula: row.formula, value: row.displayValue })),
  }
}
