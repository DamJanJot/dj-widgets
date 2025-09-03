import { Link } from 'react-router-dom'

type Props = {
  user?: { name?: string; email?: string; avatarUrl?: string }
  onLogout?: () => void
  onClose?: () => void
}

export default function UserMenuContent({ user, onLogout, onClose }: Props) {
  return (
    <div className="dropdown-menu">
      <div className="dropdown-header">
        <div className="avatar sm">
          <img src={user?.avatarUrl ?? '/logo_orbitum_bezbg.png'} alt="A" />
        </div>
        <div className="dropdown-user">
          <strong>{user?.name ?? 'Użytkownik'}</strong>
          <div className="muted small">{user?.email ?? '—'}</div>
        </div>
      </div>

      <div className="dropdown-sep" />

      <Link className="dropdown-item" to="/profile" onClick={onClose}>Profil</Link>
      <Link className="dropdown-item" to="/profile/edit" onClick={onClose}>Edytuj profil</Link>
      <Link className="dropdown-item" to="/settings" onClick={onClose}>Ustawienia</Link>

      <div className="dropdown-sep" />

      <button className="dropdown-item danger" onClick={onLogout}>Wyloguj</button>
    </div>
  )
}
