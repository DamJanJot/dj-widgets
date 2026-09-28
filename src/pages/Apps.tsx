import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Database,
  FileText,
  Folder,
  Image,
  MessageCircle,
  Paintbrush,
  Terminal,
  WalletCards,
} from 'lucide-react'

const modules = [
  { title: 'Notatnik', source: 'modules/notatnik', status: 'W Orbitum', detail: 'Notatki i szybkie wpisy', icon: BookOpen },
  { title: 'ToDo / Taski', source: 'modules/todo + modules/taski', status: 'W Orbitum', detail: 'Zadania, cele i postęp', icon: CheckSquare },
  { title: 'Galeria', source: 'modules/galeria', status: 'Do dodania', detail: 'Zdjęcia, upload i widok siatki', icon: Image },
  { title: 'Kalendarz', source: 'modules/kalendarz', status: 'Częściowo', detail: 'Wydarzenia, święta i przypomnienia', icon: CalendarDays },
  { title: 'Dysk', source: 'modules/dysk', status: 'Do dodania', detail: 'Foldery, pliki i prosty manager', icon: Folder },
  { title: 'Paint', source: 'modules/paint', status: 'W Orbitum', detail: 'Whiteboard i szkice', icon: Paintbrush },
  { title: 'Portfel', source: 'modules/portfel_mobile', status: 'Plan', detail: 'Finanse osobiste i zestawienia', icon: WalletCards },
  { title: 'Chat', source: 'modules/czat', status: 'Plan', detail: 'Rozmowy i powiadomienia', icon: MessageCircle },
  { title: 'Terminal', source: 'modules/terminal_mobile', status: 'Plan', detail: 'Terminal webowy / symulator', icon: Terminal },
  { title: 'Tabele', source: 'modules/tabele', status: 'Plan', detail: 'Arkusze, eksport i zapis', icon: Database },
]

const statusClass: Record<string, string> = {
  'W Orbitum': 'ready',
  'Częściowo': 'partial',
  'Do dodania': 'new',
  Plan: 'planned',
}

export default function Apps() {
  return (
    <section className="page-shell apps-page">
      <div className="apps-hero card">
        <div>
          <span className="muted small">DamJanJot/mobilka</span>
          <h1 className="page-title">Aplikacje</h1>
          <p>
            Katalog modułów przeniesiony koncepcyjnie z repo Mobilka/Optivio. To mapa funkcji, które mogą stopniowo trafiać do Orbitum jako natywne panele.
          </p>
        </div>
        <a className="button-like primary" href="https://github.com/DamJanJot/mobilka" target="_blank" rel="noreferrer">
          <FileText size={17} />
          Repo mobilka
        </a>
      </div>

      <div className="apps-grid">
        {modules.map((module) => (
          <article className="app-module-card card" key={module.title}>
            <div className="app-module-top">
              <module.icon size={22} />
              <span className={`app-module-status ${statusClass[module.status]}`}>{module.status}</span>
            </div>
            <h2>{module.title}</h2>
            <p>{module.detail}</p>
            <code>{module.source}</code>
          </article>
        ))}
      </div>
    </section>
  )
}
