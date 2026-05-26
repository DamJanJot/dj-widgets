import { Bell, Globe2, Monitor, Moon, Shield, Sun } from 'lucide-react'
import { useAppearance, type Appearance } from '@/hooks/use-appearance'

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
          <h2 className="panel-title">Widok dashboardu</h2>
          <div className="preference-grid single">
            <div className="stat">
              <div className="label">Układ</div>
              <div className="value">Kompaktowy</div>
            </div>
            <div className="stat">
              <div className="label">Wiadomości</div>
              <div className="value">7 wpisów</div>
            </div>
            <div className="stat">
              <div className="label">Złoto</div>
              <div className="value">Zakres wybierany</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
