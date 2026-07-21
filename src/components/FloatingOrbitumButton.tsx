import { Link } from 'react-router-dom'
import { CalendarDays, ClipboardList, Plus, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

export default function FloatingOrbitumButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="floating-orbitum">
      {open && (
        <div className="floating-panel">
          <div className="floating-panel-header">
            <div>
              <strong>Orbitum</strong>
              <span>Centrum szybkich akcji</span>
            </div>
            <button className="btn-icon" type="button" aria-label="Zamknij szybkie akcje" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="floating-actions">
            <Link to="/day-plan" onClick={() => setOpen(false)}>
              <ClipboardList size={16} />
              Plan dnia
            </Link>
            <Link to="/projects" onClick={() => setOpen(false)}>
              <Sparkles size={16} />
              Projekty
            </Link>
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              <CalendarDays size={16} />
              Dashboard
            </Link>
          </div>
        </div>
      )}

      <button
        className={open ? 'floating-button is-open' : 'floating-button'}
        type="button"
        aria-label={open ? 'Zamknij szybkie akcje Orbitum' : 'Otwórz szybkie akcje Orbitum'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Plus size={22} />}
      </button>
    </div>
  )
}
