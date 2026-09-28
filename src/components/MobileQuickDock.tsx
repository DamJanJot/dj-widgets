import { NavLink } from 'react-router-dom'
import { BriefcaseBusiness, ClipboardList, LayoutDashboard, LineChart, ListTodo, Newspaper } from 'lucide-react'
import { useSidebarConfig, type SidebarItemId } from '@/hooks/use-sidebar-config'

const dockItems: SidebarItemId[] = ['dashboard', 'news', 'markets', 'dayPlan', 'projects', 'notes']

const icons: Partial<Record<SidebarItemId, typeof LayoutDashboard>> = {
  dashboard: LayoutDashboard,
  news: Newspaper,
  markets: LineChart,
  dayPlan: ClipboardList,
  projects: BriefcaseBusiness,
  notes: ListTodo,
}

export default function MobileQuickDock() {
  const { visibleItems } = useSidebarConfig()
  const items = dockItems
    .map((id) => visibleItems.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => !!item)
    .slice(0, 5)

  if (!items.length) return null

  return (
    <nav className="mobile-quick-dock" aria-label="Szybka nawigacja mobilna">
      {items.map((item) => {
        const Icon = icons[item.id] ?? LayoutDashboard
        return (
          <NavLink className="mobile-dock-item" to={item.path} key={item.id} aria-label={item.label}>
            <Icon size={19} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
