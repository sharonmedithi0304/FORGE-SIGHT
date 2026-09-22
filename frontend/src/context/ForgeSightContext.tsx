import { useState, type ReactNode } from 'react'
import { FORGESIGHT_DEMO_DATA } from '../data/demoData'
import type { DemoDataset } from '../data/types'
import { ForgeSightContext } from './contextValue'

export function ForgeSightProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DemoDataset | null>(null)
  const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null)
  const loadDemoData = () => {
    setData(FORGESIGHT_DEMO_DATA)
    setActiveInvestigationId(FORGESIGHT_DEMO_DATA.investigations[0]?.investigationId ?? null)
  }
  return <ForgeSightContext.Provider value={{ data, activeInvestigationId, isDemoLoaded: data !== null, loadDemoData, setActiveInvestigation: setActiveInvestigationId }}>{children}</ForgeSightContext.Provider>
}