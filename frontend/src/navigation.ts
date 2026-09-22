import type { LucideIcon } from 'lucide-react'
import { Activity, CircleDollarSign, ClipboardCheck, Database, Gauge, Microscope, Network, ScanSearch, ShieldCheck, SlidersHorizontal, Target, Workflow } from 'lucide-react'

export type PagePath = 'command-center' | 'data-ingestion' | 'data-evidence' | 'quality-intelligence' | 'defect-explorer' | 'investigation-center' | 'process-intelligence' | 'production-flow' | 'bottleneck-analysis' | 'economic-impact' | 'profitability-simulator' | 'decision-center' | 'unit-detail' | 'uncertainty-detail' | 'novel-pattern-detail' | 'defect-detail' | 'variable-detail' | 'stage-detail'
export type AppRoute = { path: PagePath; selectedId?: string }
export type NavigationItem = { label: string; path: PagePath; icon: LucideIcon }
export type NavigationSection = { label: string; items: NavigationItem[] }

export const navigationSections: NavigationSection[] = [
  { label: 'Overview', items: [{ label: 'Command Center', path: 'command-center', icon: Gauge }] },
  { label: 'Data', items: [{ label: 'Data Ingestion', path: 'data-ingestion', icon: Database }, { label: 'Data & Evidence', path: 'data-evidence', icon: ClipboardCheck }] },
  { label: 'Quality', items: [{ label: 'Quality Intelligence', path: 'quality-intelligence', icon: ShieldCheck }, { label: 'Defect Explorer', path: 'defect-explorer', icon: ScanSearch }, { label: 'Investigation Center', path: 'investigation-center', icon: Microscope }] },
  { label: 'Process', items: [{ label: 'Process Intelligence', path: 'process-intelligence', icon: Activity }, { label: 'Production Flow', path: 'production-flow', icon: Workflow }, { label: 'Bottleneck Analysis', path: 'bottleneck-analysis', icon: Network }] },
  { label: 'Economics', items: [{ label: 'Economic Impact', path: 'economic-impact', icon: CircleDollarSign }, { label: 'Profitability Simulator', path: 'profitability-simulator', icon: SlidersHorizontal }] },
  { label: 'Decision', items: [{ label: 'Decision Center', path: 'decision-center', icon: Target }] },
]

export const pageDetails: Record<PagePath, { eyebrow: string; title: string; description: string; icon: LucideIcon; next: string }> = {
  'command-center': { eyebrow: 'Overview', title: 'Command Center', description: 'A focused operating view for navigating evidence, quality, process, and economic decisions.', icon: Gauge, next: 'Connect a source to establish the operating context.' },
  'data-ingestion': { eyebrow: 'Data', title: 'Data Ingestion', description: 'Bring approved production and quality sources into a traceable workspace.', icon: Database, next: 'No sources have been connected yet.' },
  'data-evidence': { eyebrow: 'Data', title: 'Data & Evidence', description: 'Review the provenance, coverage, and readiness of evidence used in investigations.', icon: ClipboardCheck, next: 'Evidence will appear here after an approved source is connected.' },
  'quality-intelligence': { eyebrow: 'Quality', title: 'Quality Intelligence', description: 'Frame quality signals for analysis without obscuring the underlying evidence.', icon: ShieldCheck, next: 'Quality intelligence is waiting for source data.' },
  'defect-explorer': { eyebrow: 'Quality', title: 'Defect Explorer', description: 'Inspect defect categories and their contributing evidence in one investigation surface.', icon: ScanSearch, next: 'Connect quality records to begin an exploration.' },
  'investigation-center': { eyebrow: 'Quality', title: 'Investigation Center', description: 'Keep open investigations, questions, and evidence trails organized for review.', icon: Microscope, next: 'There are no active investigations in this workspace.' },
  'process-intelligence': { eyebrow: 'Process', title: 'Process Intelligence', description: 'Understand how work moves through the operation and where evidence is available.', icon: Activity, next: 'Process context will be available once a flow source is connected.' },
  'production-flow': { eyebrow: 'Process', title: 'Production Flow', description: 'Map the movement of material and work across the production system.', icon: Workflow, next: 'No production flow has been defined.' },
  'bottleneck-analysis': { eyebrow: 'Process', title: 'Bottleneck Analysis', description: 'Evaluate constraints with a clear link from operational signal to investigation.', icon: Network, next: 'Bottleneck analysis requires process and throughput evidence.' },
  'economic-impact': { eyebrow: 'Economics', title: 'Economic Impact', description: 'Translate verified operational findings into an auditable economic view.', icon: CircleDollarSign, next: 'Economic impact is unavailable until source assumptions are defined.' },
  'profitability-simulator': { eyebrow: 'Economics', title: 'Profitability Simulator', description: 'Model decision scenarios with explicit assumptions and reviewable inputs.', icon: SlidersHorizontal, next: 'Add scenario assumptions to open a simulation.' },
  'decision-center': { eyebrow: 'Decision', title: 'Decision Center', description: 'Collect reviewed findings and move from evidence toward a documented decision.', icon: Target, next: 'No decision briefs are ready for review.' },
  'unit-detail': { eyebrow: 'Quality', title: 'Unit Detail', description: 'Review the supplied record without adding unsupported confidence or localization.', icon: ShieldCheck, next: 'Select a supplied unit to inspect its record.' },
  'uncertainty-detail': { eyebrow: 'Quality', title: 'Uncertainty Detail', description: 'Review why a supplied observation remains outside a known classification.', icon: ShieldCheck, next: 'Select an uncertain observation to inspect its evidence.' },
  'novel-pattern-detail': { eyebrow: 'Quality', title: 'Potential Novel Pattern', description: 'Review an observation that requires engineering review and is not a confirmed defect.', icon: ShieldCheck, next: 'Select a potential novel observation to inspect it.' },
  'defect-detail': { eyebrow: 'Quality', title: 'Defect Detail', description: 'Review a supplied defect and its observed associations.', icon: ScanSearch, next: 'Select a defect to inspect its detail.' },
  'variable-detail': { eyebrow: 'Process', title: 'Variable Detail', description: 'Review supplied process observations and their observed associations.', icon: Activity, next: 'Select a process variable to inspect its detail.' },
  'stage-detail': { eyebrow: 'Process', title: 'Stage Detail', description: 'Review a production stage and its supplied operating context.', icon: Workflow, next: 'Select a production stage to inspect its detail.' },
}

export function initialPath(): PagePath { const value = window.location.hash.replace(/^#\/?/, '') as PagePath; return value in pageDetails ? value : 'command-center' }
export function initialRoute(): AppRoute {
  const [rawPath, rawQuery] = window.location.hash.replace(/^#\/?/, '').split('?')
  const path = rawPath as PagePath
  const selectedId = new URLSearchParams(rawQuery).get('id') ?? undefined
  return path in pageDetails ? { path, selectedId } : { path: 'command-center' }
}
export function navigate(path: PagePath, selectedId?: string) { window.location.hash = selectedId ? `${path}?id=${encodeURIComponent(selectedId)}` : path }
export function getPageByPath(path: PagePath) { return { path, ...(pageDetails[path] ?? pageDetails['command-center']) } }