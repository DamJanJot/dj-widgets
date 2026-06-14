import { BellRing, Gauge, RadioTower, ShieldAlert } from 'lucide-react'

const alerts = [
  { title: 'Złoto', value: 'Powiadom przy zmianie powyżej 2%', icon: BellRing },
  { title: 'Waluty', value: 'Obserwuj USD, EUR i CHF', icon: Gauge },
  { title: 'Konflikty', value: 'Priorytet dla Ukrainy i Bliskiego Wschodu', icon: ShieldAlert },
]

const timeline = [
  'Odświeżono dashboard i układ rynków',
  'Dodano źródła działań zbrojnych',
  'Wydzielono osobny panel notatek i zadań',
]

export default function Operations() {
  return (
    <section className="page-shell operations-page">
      <h1 className="page-title">Centrum</h1>

      <div className="operations-layout operations-layout-compact">
        <div className="card operations-panel">
          <div className="section-heading">
            <RadioTower size={22} />
            <h2 className="panel-title">Alerty</h2>
          </div>
          <div className="settings-list">
            {alerts.map((alert) => (
              <div className="settings-row" key={alert.title}>
                <alert.icon size={20} />
                <div>
                  <strong>{alert.title}</strong>
                  <span>{alert.value}</span>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card operations-panel">
          <h2 className="panel-title">Ostatnie działania</h2>
          <div className="timeline-list timeline-list-vertical">
            {timeline.map((item) => (
              <div className="timeline-item" key={item}>
                <span />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
