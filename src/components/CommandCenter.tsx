import { Link } from 'react-router-dom'
import { Activity, ArrowRight, BellRing, ListTodo, Newspaper, TrendingUp } from 'lucide-react'

const signals = [
  { label: 'Pogoda', value: 'Warszawa aktywna', tone: 'neutral' },
  { label: 'Rynki', value: 'Złoto i waluty online', tone: 'up' },
  { label: 'Wiadomości', value: 'RSS monitorowany', tone: 'neutral' },
]

export default function CommandCenter() {
  return (
    <div className="widget command-center">
      <div className="section-heading split">
        <div>
          <h2 className="widget-title">Centrum operacyjne</h2>
          <p className="muted small">Szybki podgląd stanu aplikacji</p>
        </div>
        <Activity size={22} />
      </div>

      <div className="signal-grid">
        {signals.map((signal) => (
          <div className="signal-card" key={signal.label}>
            <span>{signal.label}</span>
            <strong className={signal.tone === 'up' ? 'up' : ''}>{signal.value}</strong>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <Link to="/markets"><TrendingUp size={16} /> Rynki <ArrowRight size={14} /></Link>
        <Link to="/news"><Newspaper size={16} /> Aktualności <ArrowRight size={14} /></Link>
        <Link to="/notes"><ListTodo size={16} /> Notatki <ArrowRight size={14} /></Link>
        <Link to="/operations"><BellRing size={16} /> Centrum <ArrowRight size={14} /></Link>
      </div>
    </div>
  )
}
