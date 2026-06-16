import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookText, CalendarDays, LayoutDashboard, LineChart, ListTodo, Newspaper, RadioTower, Search, Settings, User, X } from 'lucide-react'

type Command = {
  label: string
  path: string
  hint: string
  icon: typeof Search
}

const commands: Command[] = [
  { label: 'Dashboard', path: '/dashboard', hint: 'Pogoda, kalendarz i centrum', icon: LayoutDashboard },
  { label: 'Aktualności', path: '/news', hint: 'RSS i działania zbrojne', icon: Newspaper },
  { label: 'Rynki', path: '/markets', hint: 'Złoto, waluty i krypto', icon: LineChart },
  { label: 'Notatki i zadania', path: '/notes', hint: 'Lokalna lista zadań', icon: ListTodo },
  { label: 'Centrum', path: '/operations', hint: 'Alerty i ostatnie działania', icon: RadioTower },
  { label: 'Profil', path: '/profile', hint: 'Informacje użytkownika', icon: User },
  { label: 'Ustawienia', path: '/settings', hint: 'Motyw i sidebar', icon: Settings },
  { label: 'Documentation', path: '/docs', hint: 'Opis modułów', icon: BookText },
  { label: 'Kalendarz', path: '/dashboard', hint: 'Święta i wydarzenia', icon: CalendarDays },
]

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
      if (event.key === 'Escape') onOpenChange(false)
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onOpenChange, open])

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return commands
    return commands.filter((command) =>
      `${command.label} ${command.hint}`.toLowerCase().includes(value)
    )
  }, [query])

  const run = (path: string) => {
    navigate(path)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="command-overlay" role="dialog" aria-modal="true" aria-label="Szybka nawigacja">
      <div className="command-backdrop" onClick={() => onOpenChange(false)} />
      <div className="command-panel">
        <div className="command-search">
          <Search size={18} />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj widoku albo akcji" />
          <button type="button" className="btn-icon" aria-label="Zamknij" onClick={() => onOpenChange(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="command-list">
          {filtered.map((command) => (
            <button type="button" className="command-item" key={`${command.label}-${command.path}`} onClick={() => run(command.path)}>
              <command.icon size={18} />
              <span>
                <strong>{command.label}</strong>
                <small>{command.hint}</small>
              </span>
            </button>
          ))}
          {!filtered.length && <p className="muted command-empty">Brak wyników</p>}
        </div>
      </div>
    </div>
  )
}
