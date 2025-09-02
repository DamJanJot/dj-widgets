import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import News from './pages/News'
import Markets from './pages/Markets'
import Docs from './pages/Docs'
import Repository from './pages/Repository'
import useMedia from './hooks/useMedia'
import {
  LayoutDashboard,
  Newspaper,
  LineChart,
  BookText,
  Github,
  type LucideIcon,           // ✅ używamy typu z lucide-react
} from 'lucide-react'

type TopMeta = { label: string; Icon: LucideIcon }  // ✅ Icon: LucideIcon

// mapa ścieżek -> meta (tytuł + ikona do topbaru)
const META: Record<string, TopMeta> = {
  '/':        { label: 'Dashboard',     Icon: LayoutDashboard },
  '/news':    { label: 'Aktualności',   Icon: Newspaper },
  '/markets': { label: 'Rynki',         Icon: LineChart },
  '/repo':    { label: 'Repository',    Icon: Github },
  '/docs':    { label: 'Documentation', Icon: BookText },
}

export default function App() {
  const isDesktop = useMedia('(min-width: 900px)', true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { pathname } = useLocation()
  const meta = META[pathname] ?? { label: 'App', Icon: LayoutDashboard }

  // ustaw domyślny stan po zmianie breakpointu
  useEffect(() => { setSidebarOpen(isDesktop) }, [isDesktop])

  // na mobile zamykaj po nawigacji
  useEffect(() => { if (!isDesktop) setSidebarOpen(false) }, [pathname, isDesktop])

  // ESC zamyka na mobile
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside
        className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
        aria-hidden={!sidebarOpen && !isDesktop}
      >
        <div className="brand">
          <span className="badge">DJ</span> <span>App</span>
        </div>

        <nav className="nav" onClick={() => !isDesktop && setSidebarOpen(false)}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} title="Dashboard">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/news" title="Aktualności">
            <Newspaper size={18} />
            <span>Aktualności</span>
          </NavLink>
          <NavLink to="/markets" title="Rynki">
            <LineChart size={18} />
            <span>Rynki</span>
          </NavLink>
        </nav>

        <div style={{ flex: 1 }} />

        <nav className="nav" onClick={() => !isDesktop && setSidebarOpen(false)}>
          <NavLink to="/repo" title="Repository">
            <Github size={18} />
            <span>Repository</span>
          </NavLink>
          <NavLink to="/docs" title="Documentation">
            <BookText size={18} />
            <span>Documentation</span>
          </NavLink>
        </nav>

        <div className="row small" style={{ marginTop: 8 }}>
          <div className="row" style={{ gap: 10 }}>
            <div className="badge">1</div>
            <div>
              <div>111</div>
              <div className="small">111@111.pl</div>
            </div>
          </div>
          <span className="small">▼</span>
        </div>
      </aside>

      {/* floating edge toggle on desktop */}
      {isDesktop && (
        <button
          className="edge-toggle"
          aria-label={sidebarOpen ? 'Zwiń menu' : 'Rozwiń menu'}
          onClick={() => setSidebarOpen(v => !v)}
        >
          <span className={`edge-arrow ${sidebarOpen ? 'left' : 'right'}`} />
        </button>
      )}

      {/* overlay na mobile */}
      {!isDesktop && sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <main>
        <div className="topbar">
          <button
            className="hamburger"
            aria-label={sidebarOpen ? 'Zwiń menu' : 'Rozwiń menu'}
            onClick={() => setSidebarOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* tytuł + ikona aktywnej sekcji */}
          <div className="row" style={{ gap: 8, fontWeight: 700 }}>
            <meta.Icon size={18} />
            <span>{meta.label}</span>
          </div>

          <div />
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/repo" element={<Repository />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
