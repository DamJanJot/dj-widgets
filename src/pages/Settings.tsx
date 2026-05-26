import { DragEvent, useState } from 'react'
import { Bell, Eye, EyeOff, Globe2, GripVertical, Monitor, Moon, RotateCcw, Shield, Sun } from 'lucide-react'
import { useAppearance, type Appearance } from '@/hooks/use-appearance'
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
  const [draggedId, setDraggedId] = useState<SidebarItemId | null>(null)

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
      </div>
    </section>
  )
}
