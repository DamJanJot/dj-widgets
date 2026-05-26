import { FormEvent, useEffect, useState } from 'react'
import { Check, Plus, Trash2 } from 'lucide-react'

type Note = {
  id: string
  text: string
  done: boolean
}

const STORAGE_KEY = 'orbitum.quickNotes'

const defaultNotes: Note[] = [
  { id: 'markets', text: 'Sprawdzić kursy walut i złoto', done: false },
  { id: 'news', text: 'Przejrzeć działania zbrojne', done: false },
  { id: 'repo', text: 'Wypchnąć najnowsze zmiany na GitHub', done: false },
]

export default function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes)
  const [text, setText] = useState('')

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Note[]
      if (Array.isArray(parsed)) setNotes(parsed)
    } catch {
      setNotes(defaultNotes)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const addNote = (event: FormEvent) => {
    event.preventDefault()
    const nextText = text.trim()
    if (!nextText) return
    setNotes((items) => [{ id: crypto.randomUUID(), text: nextText, done: false }, ...items])
    setText('')
  }

  return (
    <div className="quick-notes">
      <form className="quick-note-form" onSubmit={addNote}>
        <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Dodaj zadanie albo notatkę" />
        <button className="button-like primary icon-only" type="submit" aria-label="Dodaj notatkę">
          <Plus size={17} />
        </button>
      </form>

      <div className="quick-note-list">
        {notes.map((note) => (
          <div className={note.done ? 'quick-note done' : 'quick-note'} key={note.id}>
            <button
              className="note-check"
              type="button"
              aria-label="Oznacz jako wykonane"
              onClick={() => setNotes((items) => items.map((item) => item.id === note.id ? { ...item, done: !item.done } : item))}
            >
              {note.done && <Check size={14} />}
            </button>
            <span>{note.text}</span>
            <button
              className="btn-icon"
              type="button"
              aria-label="Usuń notatkę"
              onClick={() => setNotes((items) => items.filter((item) => item.id !== note.id))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
