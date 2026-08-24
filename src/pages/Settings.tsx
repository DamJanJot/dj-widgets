import { DragEvent, KeyboardEvent, useState } from 'react'
import { Bell, Eye, EyeOff, Globe2, GripVertical, Keyboard, Monitor, Moon, RotateCcw, Shield, Sun } from 'lucide-react'
import { useAppearance, type Appearance } from '@/hooks/use-appearance'
import { shortcutFromEvent, useShortcutConfig } from '@/hooks/use-keyboard-shortcuts'
import { useSidebarConfig, type SidebarItemId } from '@/hooks/use-sidebar-config'

const themeOptions: Array<{ value: Appearance; label: string; icon: typeof Moon }> = [
  { value: 'dark', label: 'Ciemny', icon: Moon },
  { value: 'light', label: 'Jasny', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
]

const settings = [
  { icon: Globe2, title: 'Język', value: 'Polski' },
  { icon: Bell, title: 'Powiadomienia', value: 'Alerty rynkowe i wiadomości' },
  { icon: Shield, title: 'Bezpieczeństwo', value: 'Sesja lokalna' },
]

export default function Settings() {
  const { appearance, updateAppearance } = useAppearance()
  const { settings: sidebarSettings, items, toggleItem, moveItem, resetSidebar } = useSidebarConfig()
  const { commandShortcuts, setShortcut, resetShortcuts } = useShortcutConfig()
  const [draggedId, setDraggedId] = useState<SidebarItemId | null>(null)
  const [recordingPath, setRecordingPath] = useState<string | null>(null)

  const handleDragStart = (event: DragEvent<HTMLDivElement>, id: SidebarItemId) => {
    setDraggedId(id)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', id)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetId: SidebarItemId) => {
    event.preventDefault()
    const sourceId = (event.dataTransfer.getData('text/plain') || draggedId) as SidebarItemId | null
    if (sourceId) moveItem(sourceId, targetId)
    setDraggedId(null)
  }

  const handleShortcutKeyDown = (event: KeyboardEvent<HTMLButtonElement>, path: string) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.key === 'Escape') {
      setRecordingPath(null)
      return
    }

    const shortcut = shortcutFromEvent(event.nativeEvent)
    if (!shortcut) return

    setShortcut(path, shortcut)
    setRecordingPath(null)
  }

  const duplicateShortcuts = commandShortcuts.reduce<string[]>((duplicates, item, _, all) => {
    if (all.filter((entry) => entry.shortcut === item.shortcut).length > 1 && !duplicates.includes(item.shortcut)) {
      duplicates.push(item.shortcut)
    }
    return duplicates
  }, [])

  return (
    <section className="page-shell">
      <h1 className="page-title">Ustawienia</h1>

      <div className="settings-layout">
        <div className="card settings-panel">
          <h2 className="panel-title">Preferencje</h2>

          <div className="theme-panel">
            <div>
              <strong>Motyw</strong>
              <span className="muted small">Zmień wygląd aplikacji</span>
            </div>
            <div className="theme-toggle" role="group" aria-label="Motyw aplikacji">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={appearance === option.value ? 'active' : ''}
                  onClick={() => updateAppearance(option.value)}
                >
                  <option.icon size={16} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-list">
            {settings.map((item) => (
              <div className="settings-row" key={item.title}>
                <item.icon size={20} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.value}</span>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card settings-panel">
          <div className="section-heading split">
            <div>
              <h2 className="panel-title">Widok w sidebarze</h2>
              <p className="muted small">Przeciągnij elementy, aby zmienić kolejność.</p>
            </div>
            <button className="button-like" type="button" onClick={resetSidebar}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="sidebar-sort-list">
            {items.map((item) => {
              const hidden = sidebarSettings.hidden.includes(item.id)
              return (
                <div
                  key={item.id}
                  className={`sidebar-sort-item ${hidden ? 'is-hidden' : ''} ${draggedId === item.id ? 'is-dragging' : ''}`}
                  draggable
                  onDragStart={(event) => handleDragStart(event, item.id)}
                  onDragEnd={() => setDraggedId(null)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, item.id)}
                >
                  <GripVertical size={18} className="drag-handle" />
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.path}</span>
                  </div>
                  {item.required ? (
                    <span className="required-pill">Obowiązkowe</span>
                  ) : (
                    <button
                      type="button"
                      className="visibility-button"
                      onClick={() => toggleItem(item.id)}
                      aria-label={hidden ? `Pokaż ${item.label}` : `Ukryj ${item.label}`}
                    >
                      {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                      {hidden ? 'Ukryte' : 'Widoczne'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="card settings-panel keyboard-panel">
          <div className="section-heading split">
            <div>
              <h2 className="panel-title">Skróty klawiszowe</h2>
              <p className="muted small">Kliknij skrót i wciśnij nową kombinację.</p>
            </div>
            <button className="button-like" type="button" onClick={resetShortcuts}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="shortcut-list">
            {commandShortcuts.map(({ command, shortcut }) => {
              const conflict = duplicateShortcuts.includes(shortcut)
              const recording = recordingPath === command.path
              return (
                <div className={`shortcut-row ${conflict ? 'has-conflict' : ''}`} key={command.path}>
                  <command.icon size={18} />
                  <div>
                    <strong>{command.label}</strong>
                    <span>{command.hint}</span>
                  </div>
                  <button
                    type="button"
                    className={`shortcut-key ${recording ? 'is-recording' : ''}`}
                    onClick={() => setRecordingPath(command.path)}
                    onKeyDown={(event) => handleShortcutKeyDown(event, command.path)}
                    aria-label={`Zmień skrót dla ${command.label}`}
                  >
                    <Keyboard size={15} />
                    {recording ? 'Wciśnij skrót' : shortcut}
                  </button>
                </div>
              )
            })}
          </div>

          {duplicateShortcuts.length > 0 && (
            <p className="shortcut-warning">
              Konflikt: {duplicateShortcuts.join(', ')}. Ostatni pasujący widok może przejąć skrót.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
