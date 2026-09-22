import { createContext } from 'react'
import type { DemoDataset } from '../data/types'

export interface ForgeSightContextValue {
  data: DemoDataset | null
  activeInvestigationId: string | null
  isDemoLoaded: boolean
  loadDemoData: () => void
  setActiveInvestigation: (investigationId: string | null) => void
}

export const ForgeSightContext = createContext<ForgeSightContextValue | null>(null)