export type UnitClassification = 'ACCEPTABLE' | 'DEFECTIVE' | 'UNCERTAIN' | 'NOVEL'
export type UnitStatus = 'RELEASED' | 'HELD' | 'REVIEW' | 'SCRAPPED'
export type InvestigationStatus = 'OPEN' | 'INVESTIGATING' | 'CONFIRMED' | 'REJECTED' | 'INCONCLUSIVE'
export type EvidenceStatus = 'OBSERVED' | 'ESTIMATED' | 'SIMULATED' | 'HYPOTHESIS'
export type EvidenceStrength = 'LOW' | 'MODERATE' | 'HIGH'

export interface Unit {
  unitId: string
  batchId: string
  line: string
  timestamp: string
  classification: UnitClassification
  defectType?: string
  processStage: string
  status: UnitStatus
}

export interface Batch {
  batchId: string
  line: string
  startTime: string
  endTime: string
  unitCount: number
  defectCount: number
  defectRate: number
  affectedProcessStage: string
}

export interface Defect {
  defectId: string
  defectType: string
  occurrenceCount: number
  affectedUnits: string[]
  affectedBatches: string[]
  affectedLines: string[]
}

export interface ProcessObservation {
  observationId: string
  processStage: string
  variable: 'Temperature' | 'Cycle Time' | 'Pressure' | 'Utilization' | 'Throughput'
  value: number
  unit: string
  timestamp: string
  batchId: string
  line: string
}

export interface ProductionStage {
  stageId: string
  stage: string
  capacity: number
  throughput: number
  cycleTime: number
  utilization: number
  queueWip: number
}

export interface EconomicData {
  economicsId: string
  unitCost: number
  sellingPrice: number
  scrapCost: number
  downtimeCost: number
  revenueExposure: number
}

export interface ProfitabilityScenario {
  scenarioId: string
  label: string
  status: 'BASELINE' | 'SIMULATED'
  unitMargin: number
  expectedDailyMargin: number
  assumption: string
}

export interface Investigation {
  investigationId: string
  batchId: string
  line: string
  defectType: string
  status: InvestigationStatus
  title: string
}

export interface Recommendation {
  id: string
  issue: string
  evidence: string[]
  potentialContributor: string
  affectedArea: string
  estimatedImpact: string
  evidenceStrength: EvidenceStrength
  recommendedInvestigation: string
  status: InvestigationStatus
}

export interface EvidenceItem {
  evidenceId: string
  type: 'DEFECT INCREASE' | 'PROCESS DEVIATION' | 'TEMPORAL ASSOCIATION' | 'BATCH RECURRENCE' | 'POTENTIAL CONTRIBUTOR' | 'BOTTLENECK' | 'THROUGHPUT IMPACT' | 'ECONOMIC IMPACT' | 'RECOMMENDATION'
  status: EvidenceStatus
  statement: string
  sourceIds: string[]
  linkedEvidenceIds: string[]
}

export interface DemoDataset {
  datasetId: string
  label: string
  units: Unit[]
  batches: Batch[]
  defects: Defect[]
  processObservations: ProcessObservation[]
  productionStages: ProductionStage[]
  economics: EconomicData
  profitabilityScenarios: ProfitabilityScenario[]
  investigations: Investigation[]
  recommendations: Recommendation[]
  evidence: EvidenceItem[]
}