import {
  BookText,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  LineChart,
  ListTodo,
  Newspaper,
  RadioTower,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react'

export type AppCommand = {
  label: string
  path: string
  hint: string
  icon: LucideIcon
}

export const appCommands: AppCommand[] = [
  { label: 'Dashboard', path: '/dashboard', hint: 'Pogoda, kalendarz i centrum', icon: LayoutDashboard },
  { label: 'Aktualności', path: '/news', hint: 'RSS i działania zbrojne', icon: Newspaper },
  { label: 'Rynki', path: '/markets', hint: 'Złoto, waluty i krypto', icon: LineChart },
  { label: 'Plan dnia', path: '/day-plan', hint: 'Fokus, zadania i harmonogram', icon: ClipboardList },
  { label: 'Notatki i zadania', path: '/notes', hint: 'Lokalna lista zadań', icon: ListTodo },
  { label: 'Centrum', path: '/operations', hint: 'Alerty i ostatnie działania', icon: RadioTower },
  { label: 'Profil', path: '/profile', hint: 'Informacje użytkownika', icon: User },
  { label: 'Ustawienia', path: '/settings', hint: 'Motyw i sidebar', icon: Settings },
  { label: 'Documentation', path: '/docs', hint: 'Opis modułów', icon: BookText },
  { label: 'Kalendarz', path: '/dashboard', hint: 'Święta i wydarzenia', icon: CalendarDays },
]

export const recentViewsKey = 'orbitum.recentViews'

export function getCommandByPath(path: string) {
  return appCommands.find((command) => command.path === path)
}

export function readRecentViews() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(recentViewsKey) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((path): path is string => typeof path === 'string')
  } catch {
    return []
  }
}

export function rememberView(path: string) {
  if (typeof window === 'undefined') return
  if (!getCommandByPath(path)) return

  const next = [path, ...readRecentViews().filter((item) => item !== path)].slice(0, 6)
  window.localStorage.setItem(recentViewsKey, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('orbitum-recent-views', { detail: next }))
}
