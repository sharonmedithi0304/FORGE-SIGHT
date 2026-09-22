import { useMemo, useState, type ReactNode } from 'react'
import type { Unit } from '../../data/types'
import { Search } from 'lucide-react'
import { navigate } from '../../navigation'

type StatCardProps = { label: string; value: string | number; kind?: 'observed' | 'estimated' | 'simulated' | 'hypothesis'; accent?: string }
export function StatCard({ label, value, kind = 'observed', accent }: StatCardProps) {
  return <div className={`quality-stat ${accent ?? ''}`}><span>{label}</span><strong>{value}</strong><small>{kind}</small></div>
}

export function ChartPanel({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return <section className="quality-panel chart-panel"><div className="panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>
}

export function FilterBar({ filters, values, onChange, onReset }: { filters: { key: string; label: string; options: string[] }[]; values: Record<string, string>; onChange: (key: string, value: string) => void; onReset: () => void }) {
  return <div className="quality-filter-bar"><div className="filter-heading"><span>Filter view</span><button type="button" onClick={onReset}>Reset</button></div>{filters.map((filter) => <label key={filter.key}><span>{filter.label}</span><select value={values[filter.key] ?? ''} onChange={(event) => onChange(filter.key, event.target.value)}><option value="">All</option>{filter.options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>)}</div>
}

function unavailable() { return 'Not available in supplied data.' }
export function QualityRecordTable({ units, search, onSearch, onUnitClick, onDefectClick }: { units: Unit[]; search: string; onSearch: (value: string) => void; onUnitClick?: (unit: Unit) => void; onDefectClick?: (defectType: string) => void }) {
  const [sort, setSort] = useState<{ key: keyof Unit; direction: 'asc' | 'desc' }>({ key: 'timestamp', direction: 'desc' })
  const filtered = useMemo(() => units.filter((unit) => [unit.unitId, unit.batchId, unit.line, unit.classification, unit.defectType ?? '', unit.status].some((value) => value.toLowerCase().includes(search.toLowerCase()))).sort((a, b) => { const left = String(a[sort.key] ?? ''); const right = String(b[sort.key] ?? ''); return sort.direction === 'asc' ? left.localeCompare(right) : right.localeCompare(left) }), [units, search, sort])
  const sortBy = (key: keyof Unit) => setSort((current) => ({ key, direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc' }))
  const header = (label: string, key: keyof Unit) => <button type="button" className="table-sort" onClick={() => sortBy(key)}>{label}{sort.key === key ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ''}</button>
  return <section className="quality-panel records-panel"><div className="panel-heading"><div><h2>Quality record table</h2><p>{filtered.length} supplied records in current view</p></div><label className="table-search"><Search size={15} /><input aria-label="Search quality records" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search records" /></label></div><div className="table-scroll"><table><thead><tr><th>{header('Unit ID', 'unitId')}</th><th>{header('Batch', 'batchId')}</th><th>{header('Line', 'line')}</th><th>{header('Classification', 'classification')}</th><th>Confidence</th><th>Defect</th><th>Location</th><th>{header('Timestamp', 'timestamp')}</th><th>{header('Status', 'status')}</th></tr></thead><tbody>{filtered.map((unit) => <tr key={unit.unitId} onClick={() => onUnitClick?.(unit)}><td className="link-cell">{unit.unitId}</td><td>{unit.batchId}</td><td>{unit.line}</td><td><button type="button" className={`classification-chip ${unit.classification.toLowerCase()}`} onClick={(event) => { event.stopPropagation(); if (unit.classification === 'UNCERTAIN') navigate('uncertainty-detail', unit.unitId); else if (unit.classification === 'NOVEL') navigate('novel-pattern-detail', unit.unitId) }}>{unit.classification === 'NOVEL' ? 'POTENTIAL NOVEL' : unit.classification}</button></td><td className="muted-cell">{unavailable()}</td><td>{unit.defectType ? <button type="button" className="inline-link" onClick={(event) => { event.stopPropagation(); onDefectClick?.(unit.defectType ?? '') }}>{unit.defectType}</button> : unavailable()}</td><td className="muted-cell">{unavailable()}</td><td>{new Date(unit.timestamp).toLocaleString()}</td><td><span className={`status-text ${unit.status.toLowerCase()}`}>{unit.status}</span></td></tr>)}</tbody></table></div></section>
}

