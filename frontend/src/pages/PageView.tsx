import { ArrowUpRight, FileText, Plus, type LucideIcon } from 'lucide-react'
import type { PagePath } from '../navigation'
import type { AppRoute } from '../navigation'
import { useForgeSight } from '../context/useForgeSight'
import { QualityIntelligencePage } from './quality/QualityIntelligencePage'
import { DefectExplorerPage } from './quality/DefectExplorerPage'
import { QualityDetailPage } from './quality/QualityDetailPage'
import { InvestigationCenterPage } from './InvestigationCenterPage'
import { ProcessIntelligencePage, ProductionFlowPage, BottleneckAnalysisPage, ProcessDetailPage } from './process/ProcessPages'
import { EconomicImpactPage } from './EconomicImpactPage'
import { ProfitabilitySimulatorPage } from './ProfitabilitySimulatorPage'

type Page = { path: PagePath; eyebrow: string; title: string; description: string; icon: LucideIcon; next: string }
export function PageView({ page, route }: { page: Page; route: AppRoute }) {
	const { data, isDemoLoaded, loadDemoData } = useForgeSight()
	if (route.path === 'quality-intelligence') return <QualityIntelligencePage route={route} />
	if (route.path === 'defect-explorer') return <DefectExplorerPage route={route} />
	if (route.path === 'investigation-center') return <InvestigationCenterPage route={route} />
	if (route.path === 'process-intelligence') return <ProcessIntelligencePage route={route} />
	if (route.path === 'production-flow') return <ProductionFlowPage route={route} />
	if (route.path === 'bottleneck-analysis') return <BottleneckAnalysisPage route={route} />
	if (route.path === 'economic-impact') return <EconomicImpactPage route={route} />
	if (route.path === 'profitability-simulator') return <ProfitabilitySimulatorPage route={route} />
	if (route.path === 'variable-detail' || route.path === 'stage-detail') return <ProcessDetailPage route={route} />
	if (route.path === 'unit-detail' || route.path === 'uncertainty-detail' || route.path === 'novel-pattern-detail' || route.path === 'defect-detail') return <QualityDetailPage route={route} />
	const Icon = page.icon
	const batch = data?.batches.find((item) => item.batchId === 'B-2048')
	const cooling = data?.productionStages.find((item) => item.stage === 'COOLING')
	const investigation = data?.investigations[0]
	const pageState = isDemoLoaded ? `${data?.label ?? 'Demo dataset'} is available to this workspace.` : page.next
	return <div className="page-view"><div className="page-heading"><div className="heading-icon"><Icon size={21} strokeWidth={1.7} /></div><div><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1></div></div><p className="page-description">{page.description}</p><section className="empty-workspace" aria-labelledby="workspace-state-title"><div className="empty-grid-mark" aria-hidden="true"><span /><span /><span /><span /></div><div className="empty-copy"><span className="empty-label">{isDemoLoaded ? 'Demo dataset loaded' : 'Workspace state'}</span><h2 id="workspace-state-title">{isDemoLoaded ? 'Evidence ready for review' : 'Ready for evidence'}</h2><p>{pageState}</p>{isDemoLoaded && <div className="data-snapshot"><span>{batch?.batchId} / {batch?.line}</span><span>{((batch?.defectRate ?? 0) * 100).toFixed(1)}% defect rate</span><span>{cooling?.stage} / {cooling?.throughput} units/hr</span><span>{investigation?.investigationId}</span></div>}</div><div className="empty-actions">{!isDemoLoaded ? <button className="primary-button" type="button" onClick={loadDemoData}><Plus size={16} /> Load demo data</button> : <span className="primary-button"><FileText size={16} /> Shared evidence loaded</span>}<span className="secondary-button"><FileText size={16} /> Methodology reference <ArrowUpRight size={14} /></span></div></section><div className="page-note"><span className="note-line" /><p>ForgeSight distinguishes observed facts, estimated exposure, simulated intervention outcomes, and hypotheses requiring engineering verification.</p></div></div>
}