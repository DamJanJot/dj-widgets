import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, CheckCircle2, Database, GitBranch, Pin, Plus, RadioTower, ServerCog } from 'lucide-react'

type ProjectStatus = 'active' | 'planning' | 'paused'

type ProjectCard = {
  id: string
  name: string
  owner: string
  status: ProjectStatus
  progress: number
  next: string
  signal: string
}

type PinnedItem = {
  id: string
  title: string
  source: string
}

const projects: ProjectCard[] = [
  { id: 'orbitum', name: 'Orbitum', owner: 'Dashboard', status: 'active', progress: 76, next: 'Spinać widoki operacyjne i plan dnia', signal: 'UI demo stabilne' },
  { id: 'optivio', name: 'Optivio', owner: 'Projekty', status: 'planning', progress: 42, next: 'Model metadanych projektów', signal: 'Czeka na bazę' },
  { id: 'taskora', name: 'Taskora', owner: 'Zadania', status: 'planning', progress: 35, next: 'Tablica zadań z kolejką #ali', signal: 'Do integracji' },
  { id: 'komend', name: 'Komend', owner: 'Biblioteka', status: 'paused', progress: 28, next: 'Przypięte komendy na pulpicie', signal: 'Wzorzec gotowy' },
]

const pinnedItems: PinnedItem[] = [
  { id: 'calendar', title: 'Kalendarz i wydarzenia jako wspólna warstwa', source: 'Orbitum' },
  { id: 'db', title: 'Jeden prywatny config serwera dla przyszłych integracji', source: 'Habitat' },
  { id: 'queue', title: 'Zadania #ali wracają ze statusem do głównej kolejki', source: 'Taskora' },
]

const statusLabel: Record<ProjectStatus, string> = {
  active: 'Aktywne',
  planning: 'Planowane',
  paused: 'Wstrzymane',
}

export default function Projects() {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all')

  const visibleProjects = useMemo(
    () => projects.filter((project) => selectedStatus === 'all' || project.status === selectedStatus),
    [selectedStatus]
  )

  const averageProgress = Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)

  return (
    <section className="page-shell projects-page">
      <h1 className="page-title">Projekty</h1>

      <div className="projects-hero card">
        <div>
          <span className="muted small">Mapa ekosystemu</span>
          <h2>Centrum dla Orbitum, Optivio, Taskora i kolejnych modułów</h2>
          <p>
            Lekki widok planowania: statusy, następne kroki i przypięte elementy, które później można podpiąć pod wspólną bazę.
          </p>
        </div>
        <div className="projects-hero-metrics">
          <div>
            <strong>{projects.length}</strong>
            <span>moduły</span>
          </div>
          <div>
            <strong>{averageProgress}%</strong>
            <span>średni postęp</span>
          </div>
          <div>
            <strong>3</strong>
            <span>przypięte</span>
          </div>
        </div>
      </div>

      <div className="projects-layout">
        <div className="card projects-main-card">
          <div className="section-heading split">
            <div>
              <h2 className="panel-title">Moduły</h2>
              <p className="muted small">Filtruj i pilnuj najbliższych kroków.</p>
            </div>
            <div className="segmented-control project-filter" aria-label="Filtr statusu projektów">
              {[
                { key: 'all', label: 'Wszystkie' },
                { key: 'active', label: 'Aktywne' },
                { key: 'planning', label: 'Planowane' },
                { key: 'paused', label: 'Pauza' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={selectedStatus === item.key ? 'active' : ''}
                  onClick={() => setSelectedStatus(item.key as ProjectStatus | 'all')}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="project-card-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <div>
                    <span className={`project-status ${project.status}`}>{statusLabel[project.status]}</span>
                    <h3>{project.name}</h3>
                  </div>
                  <GitBranch size={18} />
                </div>
                <p>{project.next}</p>
                <div className="project-progress">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
                <div className="project-meta">
                  <span>{project.owner}</span>
                  <strong>{project.signal}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="projects-side">
          <div className="card projects-panel">
            <div className="section-heading split">
              <div>
                <h2 className="panel-title">Przypięte</h2>
                <p className="muted small">Rzeczy, które mają nie zginąć w rozwoju.</p>
              </div>
              <Pin size={20} />
            </div>
            <div className="pinned-list">
              {pinnedItems.map((item) => (
                <div className="pinned-item" key={item.id}>
                  <span>{item.source}</span>
                  <strong>{item.title}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="card projects-panel">
            <div className="section-heading split">
              <div>
                <h2 className="panel-title">Architektura</h2>
                <p className="muted small">Kierunek pod przyszłe dane.</p>
              </div>
              <ServerCog size={20} />
            </div>
            <div className="architecture-list">
              <div><Database size={17} /><span>Wspólna baza jako kolejny etap</span></div>
              <div><RadioTower size={17} /><span>Statusy modułów na jednym pulpicie</span></div>
              <div><CalendarClock size={17} /><span>Kalendarz i zadania jako wspólna oś</span></div>
              <div><CheckCircle2 size={17} /><span>Bezpiecznie: teraz nadal tryb demo</span></div>
            </div>
          </div>

          <Link className="button-like primary project-add-button" to="/notes">
            <Plus size={17} />
            Szkic nowego modułu
          </Link>
        </div>
      </div>
    </section>
  )
}
