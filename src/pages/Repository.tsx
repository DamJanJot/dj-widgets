import { Github } from 'lucide-react'

export default function Repository() {
  return (
    <section className="page-shell">
      <h1 className="page-title">Repository</h1>
      <div className="card profile-panel">
        <div className="section-heading">
          <Github size={22} />
          <h2 className="panel-title">dj-widgets</h2>
        </div>
        <p className="muted">Panel Orbitum z dashboardem, aktualnościami, rynkami i widokami użytkownika.</p>
        <a className="button-like" href="https://github.com/DamJanJot/dj-widgets" target="_blank" rel="noreferrer">
          Otwórz GitHub
        </a>
      </div>
    </section>
  )
}
