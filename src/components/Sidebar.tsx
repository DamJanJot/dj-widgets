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
  const mainItems = visibleItems.filter((item) => item.id !== 'settings')
  const footerItems = mainItems.filter((item) => item.id === 'repo' || item.id === 'info')
  const topItems = mainItems.filter((item) => item.id !== 'repo' && item.id !== 'info')

  return (
    <aside className="sidebar" id="sidebar">
      <div className="brand">
        <img src="/app-logo.svg" alt="Logo Orbitum" className="brand-logo" />
        <span className="brand-name">Orbitum</span>
      </div>

      <nav className="side-nav sidebar-configured-nav">
        {topItems.map((item) => {
          const Icon = icons[item.id]
          return (
            <NavLink to={item.path} title={item.label} className="nav-item" key={item.id}>
              <Icon className="nav-icon" size={18} />
              <span className="link-text">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {footerItems.length > 0 && (
        <div className="side-footer">
          {footerItems.map((item) => {
            const Icon = icons[item.id]
            return (
              <NavLink to={item.path} title={item.label} className="nav-item" key={item.id}>
                <Icon className="nav-icon" size={18} />
                <span className="link-text">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      )}
    </aside>
  )
}
