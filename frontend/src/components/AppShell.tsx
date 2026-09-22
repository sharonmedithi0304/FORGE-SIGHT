import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Menu, Radio, X } from 'lucide-react'
import { navigationSections, navigate, type PagePath } from '../navigation'
import { useForgeSight } from '../context/useForgeSight'

export function AppShell({ activePath, children }: { activePath: PagePath; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data, activeInvestigationId } = useForgeSight()
  const activeInvestigation = data?.investigations.find((item) => item.investigationId === activeInvestigationId)
  return <div className="app-shell">
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`}>
      <div className="brand-lockup"><div className="brand-mark" aria-hidden="true"><span>F</span></div><div className="brand-copy"><strong>ForgeSight</strong><span>Industrial intelligence</span></div><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <nav className="primary-nav" aria-label="Primary navigation">{navigationSections.map((section) => <div className="nav-section" key={section.label}><span className="nav-section-label">{section.label}</span>{section.items.map((item) => { const Icon = item.icon; return <button className={`nav-item ${activePath === item.path ? 'is-active' : ''}`} key={item.path} onClick={() => { navigate(item.path); setMobileOpen(false) }} title={collapsed ? item.label : undefined}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span></button> })}</div>)}</nav>
      <div className="sidebar-footer"><div className="system-status"><span className="status-dot" /> <span>Workspace ready</span></div><span className="version">v0.1 / shell</span></div>
    </aside>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <div className="app-frame"><header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><button className="icon-button collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}>{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button><div className="topbar-title"><span className="topbar-kicker">Workspace</span><span className="topbar-name">Northstar pilot environment</span></div><div className="topbar-actions"><span className="demo-badge"><Radio size={13} /> Demo mode</span><span className="operator"><span className="operator-avatar">OP</span><span className="operator-name">Operator</span></span></div></header><div className="context-bar"><div><span className="context-label">Investigation context</span><span className="context-value">{activeInvestigation ? `${activeInvestigation.investigationId} / ${activeInvestigation.title}` : 'No active investigation'}</span></div><span className="context-hint">{data ? 'Shared demo data loaded' : 'Load demo data to establish context'}</span></div><main className="main-content">{children}</main><footer className="advisory-bar"><span className="advisory-pulse" /><span>Advisory / Simulation only</span><span className="advisory-divider" /><span>No production control</span></footer></div>
  </div>
}