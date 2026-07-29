import { NavLink } from 'react-router-dom'
import { BookText, BriefcaseBusiness, ClipboardList, Info, LayoutDashboard, LineChart, ListTodo, Newspaper, Paintbrush, RadioTower } from 'lucide-react'
import { useSidebarConfig, type SidebarItemId } from '@/hooks/use-sidebar-config'

const icons: Record<SidebarItemId, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  news: Newspaper,
  markets: LineChart,
  dayPlan: ClipboardList,
  projects: BriefcaseBusiness,
  paint: Paintbrush,
  docs: BookText,
  operations: RadioTower,
  notes: ListTodo,
  repo: BookText,
  info: Info,
}

export default function Sidebar() {
  const { visibleItems } = useSidebarConfig()
  const footerItems = visibleItems.filter((item) => item.id === 'repo' || item.id === 'info')
  const topItems = visibleItems.filter((item) => item.id !== 'repo' && item.id !== 'info')

  const closeMobileSidebar = () => {
    if (!window.matchMedia('(max-width: 900px)').matches) return
    document.getElementById('sidebar')?.classList.remove('open')
    window.dispatchEvent(new Event('orbitum-sidebar-close'))
  }

  return (
    <aside className="sidebar" id="sidebar">
      <div className="brand">
        <img src="/android-chrome-192x192.png" alt="Logo Orbitum" className="brand-logo" />
        <span className="brand-name">Orbitum</span>
      </div>

      <nav className="side-nav sidebar-configured-nav">
        {topItems.map((item) => {
          const Icon = icons[item.id]
          return (
            <NavLink to={item.path} aria-label={item.label} data-tooltip={item.label} className="nav-item" key={item.id} onClick={closeMobileSidebar}>
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
              <NavLink to={item.path} aria-label={item.label} data-tooltip={item.label} className="nav-item" key={item.id} onClick={closeMobileSidebar}>
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
