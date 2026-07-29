import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brush,
  Database,
  Eraser,
  FileImage,
  GitBranch,
  ImagePlus,
  Layers3,
  Link2,
  MousePointer2,
  Pencil,
  Save,
  StickyNote,
} from 'lucide-react'

const paintProjects = [
  { name: 'Orbitum Flow', boards: 4, updated: 'dzisiaj', status: 'aktywny' },
  { name: 'UI szkice', boards: 7, updated: 'wczoraj', status: 'roboczy' },
  { name: 'Architektura modułów', boards: 3, updated: '2 dni temu', status: 'plan' },
]

const paintFeatures = [
  { icon: Pencil, title: 'Pisak', text: 'Rysowanie po canvasie z kolorem i grubością pędzla.' },
  { icon: Eraser, title: 'Gumka', text: 'Czyszczenie fragmentów rysunku bez usuwania notatek.' },
  { icon: StickyNote, title: 'Notatki', text: 'Przesuwane karteczki zapisane jako elementy tablicy.' },
  { icon: ImagePlus, title: 'Obrazy', text: 'Wklejanie obrazów ze schowka i dodawanie plików.' },
  { icon: Link2, title: 'Połączenia', text: 'Relacje między notatkami przez linie i strzałki.' },
  { icon: Save, title: 'Autozapis', text: 'Stan tablicy utrwalany po zmianach w bazie danych.' },
]

const schemaTables = [
  'wb_projects',
  'wb_boards',
  'wb_drawings',
  'wb_notes',
  'wb_links',
]

export default function PaintPanel() {
  return (
    <section className="page-shell paint-page">
      <h1 className="page-title">Paint</h1>

      <div className="paint-hero card">
        <div>
          <span className="muted small">DamJanJot/paint</span>
          <h2>Whiteboard jako moduł Orbitum</h2>
          <p>
            Panel oparty o repo Paint: projekty, tablice, rysowanie, notatki, obrazy, połączenia i autozapis. Na razie to widok integracyjny, gotowy pod późniejsze spięcie z backendem.
          </p>
        </div>
        <a className="button-like primary" href="https://github.com/DamJanJot/paint" target="_blank" rel="noreferrer">
          <GitBranch size={17} />
          Repo Paint
        </a>
      </div>

      <div className="paint-layout">
        <div className="paint-main">
          <div className="card paint-board-card">
            <div className="section-heading split">
              <div>
                <h2 className="panel-title">Makieta tablicy</h2>
                <p className="muted small">Układ inspirowany `board.php`: canvas, narzędzia i elementy nad warstwą rysunku.</p>
              </div>
              <Brush size={22} />
            </div>

            <div className="paint-board-preview">
              <div className="paint-toolbar-strip">
                <span><Pencil size={14} /> Pisak</span>
                <span><Eraser size={14} /> Gumka</span>
                <span><StickyNote size={14} /> Notatka</span>
                <span><FileImage size={14} /> Zdjęcie</span>
              </div>

              <div className="paint-canvas-preview">
                <svg viewBox="0 0 620 310" role="img" aria-label="Podgląd tablicy Paint">
                  <path d="M62 210 C160 80 240 250 350 120 S510 76 560 178" />
                  <path d="M92 92 L216 92 L216 160 L92 160 Z" className="paint-shape" />
                  <path d="M400 186 L520 248" className="paint-link" />
                </svg>
                <div className="paint-note note-a">
                  <strong>Pomysł</strong>
                  <span>Canvas + notatki</span>
                </div>
                <div className="paint-note note-b">
                  <strong>Autozapis</strong>
                  <span>drawing + items</span>
                </div>
                <div className="paint-image-card">
                  <ImagePlus size={18} />
                  Obraz
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-heading split">
              <div>
                <h2 className="panel-title">Projekty i tablice</h2>
                <p className="muted small">Model z Paint: projekt zawiera wiele tablic.</p>
              </div>
              <Layers3 size={22} />
            </div>

            <div className="paint-project-list">
              {paintProjects.map((project) => (
                <div className="paint-project-row" key={project.name}>
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.boards} tablice · aktualizacja: {project.updated}</span>
                  </div>
                  <em>{project.status}</em>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="paint-side">
          <div className="card paint-panel">
            <div className="section-heading split">
              <div>
                <h2 className="panel-title">Funkcje</h2>
                <p className="muted small">Zakres wykryty w repo Paint.</p>
              </div>
              <MousePointer2 size={20} />
            </div>
            <div className="paint-feature-list">
              {paintFeatures.map((feature) => (
                <div className="paint-feature" key={feature.title}>
                  <feature.icon size={17} />
                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card paint-panel">
            <div className="section-heading split">
              <div>
                <h2 className="panel-title">Baza</h2>
                <p className="muted small">Tabele z `SQL_whiteboard_v2.sql`.</p>
              </div>
              <Database size={20} />
            </div>
            <div className="paint-schema-list">
              {schemaTables.map((table) => <code key={table}>{table}</code>)}
            </div>
          </div>

          <Link className="button-like primary paint-wide-link" to="/projects">
            Kierunek integracji
            <ArrowRight size={15} />
          </Link>
        </aside>
      </div>
    </section>
  )
}
