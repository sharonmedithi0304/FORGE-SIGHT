export interface ProfitabilityScenario {
  defectRate: number
  throughput: number
  cycleTime: number | null
  scrapCost: number
  unitCost: number
  sellingPrice: number
  productionVolume: number | null
  downtimeCost: number | null
}

export interface ProfitabilityResult {
  goodUnits: number | null
  defectiveUnits: number | null
  scrapCostImpact: number | null
  throughputDelta: number | null
  revenue: number | null
  materialCost: number | null
  estimatedTotalCost: number | null
  estimatedProfit: number | null
  estimatedMargin: number | null
  missingData: string[]
}

export function calculateProfitabilityScenario(
  scenario: ProfitabilityScenario,
  baselineThroughput: number | null,
): ProfitabilityResult {
  const missingData: string[] = []
  const volume = scenario.productionVolume
  const hasVolume = volume !== null && Number.isFinite(volume)
  const goodUnits = hasVolume ? volume * (1 - scenario.defectRate) : null
  const defectiveUnits = hasVolume ? volume * scenario.defectRate : null
  const scrapCostImpact = defectiveUnits === null ? null : defectiveUnits * scenario.scrapCost
  const revenue = goodUnits === null ? null : goodUnits * scenario.sellingPrice
  const materialCost = hasVolume ? volume * scenario.unitCost : null
  const estimatedTotalCost = materialCost === null || scrapCostImpact === null || scenario.downtimeCost === null
    ? null
    : materialCost + scrapCostImpact + scenario.downtimeCost
  const estimatedProfit = revenue === null || estimatedTotalCost === null ? null : revenue - estimatedTotalCost

  if (!hasVolume) missingData.push('Production volume')
  if (scenario.downtimeCost === null) missingData.push('Downtime cost')

  return {
    goodUnits,
    defectiveUnits,
    scrapCostImpact,
    throughputDelta: baselineThroughput === null ? null : scenario.throughput - baselineThroughput,
    revenue,
    materialCost,
    estimatedTotalCost,
    estimatedProfit,
    estimatedMargin: revenue && estimatedProfit !== null ? estimatedProfit / revenue : null,
    missingData,
  }
}