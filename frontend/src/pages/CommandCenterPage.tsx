import { Activity, ArrowDown, ArrowRight, BarChart3, CircleAlert, CircleDollarSign, ClipboardCheck, Gauge, Microscope, Network, ShieldAlert, SlidersHorizontal, Target } from 'lucide-react'
import { useForgeSight } from '../context/useForgeSight'
import { calculateEconomicImpact } from '../data/economicCalculations'
import type { DemoDataset, EvidenceItem } from '../data/types'
import { navigate, type AppRoute, type PagePath } from '../navigation'

const unavailable = 'Not available in supplied data.'
const evidenceTypes: EvidenceItem['type'][] = ['DEFECT INCREASE', 'PROCESS DEVIATION', 'TEMPORAL ASSOCIATION', 'BOTTLENECK', 'POTENTIAL CONTRIBUTOR']

export function CommandCenterPage({ route }: { route: AppRoute }) {
  void route
  const { data, isDemoLoaded, loadDemoData } = useForgeSight()
  if (!isDemoLoaded || !data) return <CommandCenterEmptyState loadDemoData={loadDemoData} />
  return <CommandCenterWorkspace data={data} />
}

function CommandCenterWorkspace({ data }: { data: DemoDataset }) {
  const investigation = data.investigations[0]
  const batch = data.batches.find((item) => item.batchId === investigation?.batchId)
  const comparisonBatch = data.batches.find((item) => item.batchId !== batch?.batchId && item.line === investigation?.line)
  const stage = data.productionStages.find((item) => item.stage === batch?.affectedProcessStage)
  const defect = data.defects.find((item) => item.defectType === investigation?.defectType)
  const affectedUnits = data.units.filter((item) => item.batchId === batch?.batchId && item.line === investigation?.line && item.defectType === investigation?.defectType)
  const recommendation = data.recommendations.find((item) => item.id === 'REC-2048-01') ?? data.recommendations[0]
  const economic = calculateEconomicImpact(data.economics, batch, stage)
  const evidence = evidenceTypes.map((type) => data.evidence.find((item) => item.type === type)).filter((item): item is EvidenceItem => Boolean(item))
  const go = (path: PagePath) => navigate(path)

  return <div className="command-center-page">
    <header className="command-case-header"><div className="command-case-mark"><Target size={23} /></div><div className="command-case-copy"><span className="eyebrow">COMMAND CENTER / PRIMARY CASE</span><h1>{investigation?.investigationId ?? unavailable}</h1><strong>{investigation?.title ?? 'Investigation case unavailable'}</strong><p>{batch?.batchId ?? unavailable} / {investigation?.line ?? unavailable} / {batch?.affectedProcessStage ?? unavailable}</p><div className="command-case-tags"><span>{investigation?.defectType ?? unavailable}</span><span className="status-text review">{investigation?.status ?? unavailable}</span><span className="demo-badge">DEMO MODE</span></div></div></header>
    <div className="command-advisory"><ShieldAlert size={15} /><strong>ADVISORY ONLY</strong><span>No production control. Causal confirmation: NOT ESTABLISHED.</span></div>

    <section className="command-section command-what"><SectionHeading eyebrow="01 / What happened?" title="Surface Crack increase on B-2048" description="Observed quality signal from the supplied batch and defect records." /><div className="command-summary-grid"><Summary label="B-2048 defect rate" value={batch ? `${(batch.defectRate * 100).toFixed(1)}%` : unavailable} status="OBSERVED" /><Summary label="Affected units" value={String(affectedUnits.length)} status="OBSERVED" /><Summary label="Surface Crack occurrences" value={String(defect?.occurrenceCount ?? unavailable)} status="OBSERVED" /><Summary label={`Comparison / ${comparisonBatch?.batchId ?? 'unavailable'}`} value={comparisonBatch ? `${(comparisonBatch.defectRate * 100).toFixed(1)}% defect rate` : unavailable} status={comparisonBatch ? 'OBSERVED' : undefined} /></div><p className="command-note">Occurrence count is distinct from affected unit count. This summary does not establish process causality.</p></section>

    <section className="command-section"><SectionHeading eyebrow="02 / What is associated with it?" title="Evidence available for review" description="Existing evidence records show observed associations and a contributor hypothesis." /><div className="command-evidence-list">{evidence.map((item) => <EvidenceRow key={item.evidenceId} item={item} onOpen={() => go('data-evidence')} />)}{!evidence.length && <p className="command-muted">{unavailable}</p>}</div><div className="command-causal-boundary"><CircleAlert size={16} /><span><strong>Potential contributor:</strong> {data.evidence.find((item) => item.type === 'POTENTIAL CONTRIBUTOR')?.statement ?? unavailable}</span></div></section>

    <section className="command-section"><SectionHeading eyebrow="03 / Operational consequence" title="Cooling context" description="Supplied production-stage values for the affected process stage." /><div className="command-operational-grid"><Summary label="Throughput" value={stage ? `${stage.throughput} units/hr` : unavailable} status="OBSERVED" /><Summary label="Capacity" value={stage ? `${stage.capacity} units/hr` : unavailable} status="SUPPLIED" /><Summary label="Capacity gap" value={stage ? `${stage.capacity - stage.throughput} units/hr` : unavailable} status="DERIVED" /><Summary label="Utilization" value={stage ? `${stage.utilization}%` : unavailable} status="OBSERVED" /><Summary label="Queue / WIP" value={stage ? String(stage.queueWip) : unavailable} status="OBSERVED" /></div><div className="command-inline-actions"><Action label="Inspect Process" icon={Activity} path="process-intelligence" /><Action label="Review Bottleneck" icon={Network} path="bottleneck-analysis" /></div></section>

    <section className="command-section"><div className="command-section-heading"><SectionHeading eyebrow="04 / Economic context" title="Estimated exposure components available" description="Each component remains individually estimated; no aggregate total is presented." /><button className="secondary-button" type="button" onClick={() => go('economic-impact')}><CircleDollarSign size={15} /> Review methodology</button></div><div className="command-economic-list">{economic.rows.map((row) => <div key={row.key}><span>{row.label}</span><strong>{row.displayValue}</strong><span className="status-badge status-estimated">{row.status === 'PARTIAL' ? 'PARTIAL' : 'ESTIMATED'}</span></div>)}</div></section>

    <section className="command-section command-path-section"><SectionHeading eyebrow="05 / Investigation path" title="From signal to engineering review" description="Each step opens an existing ForgeSight module." /><div className="command-path">{pathSteps.map((step, index) => <div className="command-path-step" key={step.label}><button type="button" onClick={() => go(step.path)}><span>{String(index + 1).padStart(2, '0')}</span><step.icon size={17} /><strong>{step.label}</strong><ArrowRight size={14} /></button>{index < pathSteps.length - 1 && <ArrowDown className="command-path-arrow" size={15} />}</div>)}</div></section>

    <section className="command-section"><SectionHeading eyebrow="06 / Recommended investigation" title="Engineering action" description="Supplied recommendation record; not a confirmed root cause." /><div className="command-recommendation"><div><span className="eyebrow">CONTRIBUTOR: HYPOTHESIS - NOT CONFIRMED</span><h2>{recommendation?.potentialContributor ?? unavailable}</h2></div><div className="command-recommendation-meta"><span>Status: <strong>{recommendation?.status ?? unavailable}</strong></span><span>Evidence strength: <strong>{recommendation?.evidenceStrength ?? unavailable}</strong></span></div><p>{recommendation?.recommendedInvestigation ?? 'Further investigation required.'}</p></div></section>

    <section className="command-section command-actions-section"><SectionHeading eyebrow="07 / Primary judge actions" title="Open the working modules" description="Move from summary into the existing engineering workspaces." /><div className="command-actions"><Action label="Investigate" icon={Microscope} path="investigation-center" primary /><Action label="Inspect Process" icon={Activity} path="process-intelligence" /><Action label="Review Bottleneck" icon={Network} path="bottleneck-analysis" /><Action label="Review Economics" icon={CircleDollarSign} path="economic-impact" /><Action label="Simulate" icon={SlidersHorizontal} path="profitability-simulator" /><Action label="Review Evidence" icon={ClipboardCheck} path="data-evidence" /></div></section>

    <div className="command-honesty"><span className="eyebrow">DATA HONESTY</span><span><b>OBSERVED</b> Directly represented in supplied data.</span><span><b>DERIVED</b> Calculated from supplied values.</span><span><b>ESTIMATED</b> Calculated using supplied assumptions.</span><span><b>SIMULATED</b> Scenario output.</span><span><b>HYPOTHESIS</b> Potential explanation requiring verification.</span></div>
  </div>
}

const pathSteps = [
  { label: 'QUALITY SIGNAL', path: 'quality-intelligence' as PagePath, icon: BarChart3 },
  { label: 'DEFECT', path: 'defect-explorer' as PagePath, icon: CircleAlert },
  { label: 'PROCESS EVIDENCE', path: 'process-intelligence' as PagePath, icon: Activity },
  { label: 'OPERATIONAL IMPACT', path: 'bottleneck-analysis' as PagePath, icon: Gauge },
  { label: 'ECONOMIC EXPOSURE', path: 'economic-impact' as PagePath, icon: CircleDollarSign },
  { label: 'INVESTIGATION', path: 'investigation-center' as PagePath, icon: Microscope },
]

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="command-section-heading-copy"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div> }
function Summary({ label, value, status }: { label: string; value: string; status?: string }) { return <div className="command-summary"><span>{label}</span><strong>{value}</strong>{status && <small>{status}</small>}</div> }
function EvidenceRow({ item, onOpen }: { item: EvidenceItem; onOpen: () => void }) { return <button className="command-evidence-row" type="button" onClick={onOpen}><span className={`evidence-status ${item.status.toLowerCase()}`}>{item.status}</span><strong>{item.type}</strong><p>{item.statement}</p><code>{item.evidenceId}</code></button> }
function Action({ label, icon: Icon, path, primary }: { label: string; icon: typeof Activity; path: PagePath; primary?: boolean }) { return <button className={primary ? 'primary-button' : 'secondary-button'} type="button" onClick={() => navigate(path)}><Icon size={15} /> {label}<ArrowRight size={14} /></button> }
function CommandCenterEmptyState({ loadDemoData }: { loadDemoData: () => void }) { return <div className="page-view"><div className="page-heading"><div className="heading-icon"><Target size={21} /></div><div><span className="eyebrow">OVERVIEW</span><h1>Command Center</h1></div></div><p className="page-description">Load the centralized ForgeSight demo dataset to establish the primary investigation context.</p><button className="primary-button" type="button" onClick={loadDemoData}>Load demo data <ArrowRight size={15} /></button></div> }
