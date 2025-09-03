import { NavLink } from 'react-router-dom'
import { Info, LayoutDashboard, Newspaper, LineChart, BookText } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
      <div className="brand">
        <img src="/logo_orbitum_bezbg.png" alt="Logo" className="brand-logo" />
        <span className="brand-name">Orbitum</span>
      </div>

      <nav className="side-nav">
        <NavLink to="/dashboard" title="Dashboard" className="nav-item">
          <LayoutDashboard className="nav-icon" size={18} />
          <span className="link-text">Dashboard</span>
        </NavLink>

        <NavLink to="/news" title="Aktualności" className="nav-item">
          <Newspaper className="nav-icon" size={18} />
          <span className="link-text">Aktualności</span>
        </NavLink>

        <NavLink to="/markets" title="Rynki" className="nav-item">
          <LineChart className="nav-icon" size={18} />
          <span className="link-text">Rynki</span>
        </NavLink>

        <NavLink to="/docs" title="Documentation" className="nav-item">
          <BookText className="nav-icon" size={18} />
          <span className="link-text">Documentation</span>
        </NavLink>
      </nav>

      <div className="side-footer">
        <NavLink to="/repo" title="Repository" className="nav-item">
          <BookText className="nav-icon" size={18} />
          <span className="link-text">Repository</span>
        </NavLink>
        <NavLink to="/info" title="Info " className="nav-item">
          <Info  className="nav-icon" size={18} />
          <span className="link-text">Info </span>
        </NavLink>
      </div>
    </aside>
  )
}


