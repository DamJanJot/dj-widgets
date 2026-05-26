import { NavLink } from 'react-router-dom'
import { BookText, Info, LayoutDashboard, LineChart, Newspaper, RadioTower, Settings, User } from 'lucide-react'
import { useSidebarConfig, type SidebarItemId } from '@/hooks/use-sidebar-config'

const icons: Record<SidebarItemId, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  news: Newspaper,
  markets: LineChart,
  docs: BookText,
  profile: User,
  operations: RadioTower,
  repo: BookText,
  info: Info,
  settings: Settings,
}

export default function Sidebar() {
  const { visibleItems } = useSidebarConfig()

  return (
    <aside className="sidebar" id="sidebar">
      <div className="brand">
        <img src="/app-logo.svg" alt="Logo Orbitum" className="brand-logo" />
        <span className="brand-name">Orbitum</span>
      </div>

      <nav className="side-nav sidebar-configured-nav">
        {visibleItems.map((item) => {
          const Icon = icons[item.id]
          return (
            <NavLink to={item.path} title={item.label} className="nav-item" key={item.id}>
              <Icon className="nav-icon" size={18} />
              <span className="link-text">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
