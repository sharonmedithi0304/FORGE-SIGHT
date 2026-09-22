import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { getPageByPath, initialRoute, type AppRoute } from './navigation'
import { PageView } from './pages/PageView'

function App() {
  const [route, setRoute] = useState<AppRoute>(initialRoute())

  useEffect(() => {
    const handleHashChange = () => setRoute(initialRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const page = getPageByPath(route.path)
  const activePath = route.path === 'defect-explorer' || route.path === 'defect-detail' ? 'defect-explorer' : route.path === 'quality-intelligence' || route.path === 'unit-detail' || route.path === 'uncertainty-detail' || route.path === 'novel-pattern-detail' ? 'quality-intelligence' : route.path === 'variable-detail' || route.path === 'stage-detail' ? 'process-intelligence' : page.path

  return <AppShell activePath={activePath}><PageView page={page} route={route} /></AppShell>
}

export default App
