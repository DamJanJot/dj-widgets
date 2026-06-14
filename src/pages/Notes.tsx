import { CheckCircle2 } from 'lucide-react'
import QuickNotes from '@/components/QuickNotes'

export default function Notes() {
  return (
    <section className="page-shell notes-page">
      <h1 className="page-title">Notatki i zadania</h1>
      <div className="card notes-panel">
        <div className="section-heading split">
          <div>
            <h2 className="panel-title">Lista zadań</h2>
            <p className="muted small">Notatki zapisują się lokalnie w tej przeglądarce.</p>
          </div>
          <CheckCircle2 size={22} />
        </div>
        <QuickNotes />
      </div>
    </section>
  )
}
