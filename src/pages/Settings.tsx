import { Bell, Globe2, Moon, Shield } from 'lucide-react'

const settings = [
  { icon: Moon, title: 'Motyw', value: 'Ciemny interfejs' },
  { icon: Globe2, title: 'Język', value: 'Polski' },
  { icon: Bell, title: 'Powiadomienia', value: 'Alerty rynkowe i wiadomości' },
  { icon: Shield, title: 'Bezpieczeństwo', value: 'Sesja lokalna' },
]

export default function Settings() {
  return (
    <section className="page-shell">
      <h1 className="page-title">Ustawienia</h1>

      <div className="settings-layout">
        <div className="card settings-panel">
          <h2 className="panel-title">Preferencje</h2>
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
              <div className="value">8 wpisów</div>
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
