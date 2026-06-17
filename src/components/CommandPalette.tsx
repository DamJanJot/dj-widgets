import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { appCommands, getCommandByPath, readRecentViews, rememberView } from '@/lib/navigation'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [recentPaths, setRecentPaths] = useState<string[]>(() => readRecentViews())

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
    if (!open) return
    setQuery('')
    setRecentPaths(readRecentViews())
  }, [open])

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return appCommands
    return appCommands.filter((command) =>
      `${command.label} ${command.hint}`.toLowerCase().includes(value)
    )
  }, [query])

  const recent = useMemo(
    () => recentPaths.map((path) => getCommandByPath(path)).filter(Boolean).slice(0, 4),
    [recentPaths]
  )

  const run = (path: string) => {
    rememberView(path)
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

        {!query && recent.length > 0 && (
          <div className="command-section">
            <div className="command-section-title">Ostatnio</div>
            {recent.map((command) => command && (
              <button type="button" className="command-item" key={`recent-${command.path}`} onClick={() => run(command.path)}>
                <command.icon size={18} />
                <span>
                  <strong>{command.label}</strong>
                  <small>{command.hint}</small>
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="command-list">
          {!query && <div className="command-section-title">Wszystkie</div>}
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
