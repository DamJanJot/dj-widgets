import { Link } from 'react-router-dom'
import { Mail, MapPin, Pencil, ShieldCheck } from 'lucide-react'

const user = {
  name: 'Damian',
  email: 'damian@example.com',
  role: 'Administrator',
  location: 'Warszawa',
  initials: 'D',
}

export default function Profile() {
  return (
    <section className="page-shell">
      <h1 className="page-title">Profil</h1>

      <div className="profile-layout">
        <div className="card profile-hero">
          <div className="profile-avatar">{user.initials}</div>
          <div className="profile-identity">
            <h2>{user.name}</h2>
            <p>{user.role} aplikacji Orbitum</p>
            <div className="profile-actions">
              <Link to="/profile/edit" className="button-like"><Pencil size={16} /> Edytuj profil</Link>
            </div>
          </div>
        </div>

        <div className="card profile-panel">
          <h2 className="panel-title">Informacje</h2>
          <div className="info-list">
            <div><Mail size={16} /><span>Email</span><strong>{user.email}</strong></div>
            <div><MapPin size={16} /><span>Lokalizacja</span><strong>{user.location}</strong></div>
            <div><ShieldCheck size={16} /><span>Status</span><strong>Aktywne konto</strong></div>
          </div>
        </div>

        <div className="card profile-panel wide">
          <h2 className="panel-title">Preferencje pulpitu</h2>
          <div className="preference-grid">
            <div className="stat">
              <div className="label">Miasto domyślne</div>
              <div className="value">Warszawa</div>
            </div>
            <div className="stat">
              <div className="label">Waluta bazowa</div>
              <div className="value">PLN</div>
            </div>
            <div className="stat">
              <div className="label">Widok startowy</div>
              <div className="value">Dashboard</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
