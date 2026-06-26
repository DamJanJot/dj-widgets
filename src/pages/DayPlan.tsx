import { FormEvent, useEffect, useMemo, useState } from 'react'
import { CalendarCheck2, CheckCircle2, Clock3, Plus, Target, Trash2 } from 'lucide-react'

type QuickNote = {
  id: string
  text: string
  done: boolean
}

type CalendarEvent = {
  id: string
  date: string
  title: string
}

type PlanSlot = {
  id: string
  time: string
  title: string
}

const notesKey = 'orbitum.quickNotes'
const calendarEventsKey = 'orbitum.calendarEvents'
const focusKey = 'orbitum.dayFocus'
const planSlotsKey = 'orbitum.dayPlanSlots'

const defaultNotes: QuickNote[] = [
  { id: 'markets', text: 'Sprawdzić kursy walut i złoto', done: false },
  { id: 'news', text: 'Przejrzeć działania zbrojne', done: false },
  { id: 'repo', text: 'Wypchnąć najnowsze zmiany na GitHub', done: false },
]

const holidays: Record<string, string[]> = {
  '01-01': ['Nowy Rok'],
  '01-06': ['Trzech Króli'],
  '01-21': ['Dzień Babci'],
  '01-22': ['Dzień Dziadka'],
  '02-14': ['Walentynki'],
  '03-08': ['Dzień Kobiet'],
  '05-01': ['Święto Pracy'],
  '05-02': ['Dzień Flagi'],
  '05-03': ['Święto Konstytucji 3 Maja'],
  '05-26': ['Dzień Mamy'],
  '06-01': ['Dzień Dziecka'],
  '06-23': ['Dzień Ojca'],
  '08-15': ['Wniebowzięcie NMP', 'Święto Wojska Polskiego'],
  '10-14': ['Dzień Edukacji Narodowej'],
  '11-01': ['Wszystkich Świętych'],
  '11-11': ['Narodowe Święto Niepodległości'],
  '12-06': ['Mikołajki'],
  '12-24': ['Wigilia'],
  '12-25': ['Boże Narodzenie'],
  '12-26': ['Drugi dzień świąt'],
  '12-31': ['Sylwester'],
}

function todayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function holidayKey(date = new Date()) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function readList<T>(key: string, fallback: T[]) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
    return Array.isArray(parsed) ? parsed as T[] : fallback
  } catch {
    return fallback
  }
}

export default function DayPlan() {
  const [notes, setNotes] = useState<QuickNote[]>(defaultNotes)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [focus, setFocus] = useState('')
  const [slots, setSlots] = useState<PlanSlot[]>([])
  const [slotTime, setSlotTime] = useState('09:00')
  const [slotTitle, setSlotTitle] = useState('')

  const today = useMemo(() => new Date(), [])
  const currentKey = todayKey(today)
  const currentHolidayKey = holidayKey(today)

  useEffect(() => {
    setNotes(readList<QuickNote>(notesKey, defaultNotes))
    setEvents(readList<CalendarEvent>(calendarEventsKey, []))
    setFocus(window.localStorage.getItem(focusKey) || '')
    setSlots(readList<PlanSlot>(planSlotsKey, []))
  }, [])

  useEffect(() => {
    window.localStorage.setItem(focusKey, focus)
  }, [focus])

  useEffect(() => {
    window.localStorage.setItem(planSlotsKey, JSON.stringify(slots))
  }, [slots])

  const todayEvents = useMemo(() => {
    const builtIn = holidays[currentHolidayKey] ?? []
    const custom = events.filter((event) => event.date === currentKey).map((event) => event.title)
    return [...builtIn, ...custom]
  }, [currentHolidayKey, currentKey, events])

  const openNotes = notes.filter((note) => !note.done)
  const doneCount = notes.length - openNotes.length
  const progress = notes.length ? Math.round((doneCount / notes.length) * 100) : 0

  const addSlot = (event: FormEvent) => {
    event.preventDefault()
    const title = slotTitle.trim()
    if (!title || !slotTime) return
    setSlots((items) => [...items, { id: crypto.randomUUID(), time: slotTime, title }]
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 8))
    setSlotTitle('')
  }

  return (
    <section className="page-shell day-plan-page">
      <h1 className="page-title">Plan dnia</h1>

      <div className="day-plan-grid">
        <div className="card day-card day-card-primary">
          <div className="section-heading split">
            <div>
              <h2 className="panel-title">Dzisiaj</h2>
              <p className="muted small">
                {today.toLocaleDateString('pl-PL', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <CalendarCheck2 size={22} />
          </div>

          <div className="day-focus-box">
            <Target size={20} />
            <label>
              <span>Główny fokus</span>
              <input
                value={focus}
                onChange={(event) => setFocus(event.target.value)}
                placeholder="Co jest dzisiaj najważniejsze?"
              />
            </label>
          </div>

          <div className="day-events">
            <span className="muted small">Święta i wydarzenia</span>
            <strong>{todayEvents.length ? todayEvents.join(', ') : 'Brak świąt i wydarzeń na dzisiaj'}</strong>
          </div>
        </div>

        <div className="card day-card">
          <div className="section-heading split">
            <div>
              <h2 className="panel-title">Zadania</h2>
              <p className="muted small">{doneCount} z {notes.length} wykonane</p>
            </div>
            <CheckCircle2 size={22} />
          </div>

          <div className="progress-track" aria-label={`Postęp zadań ${progress}%`}>
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="day-task-list">
            {openNotes.slice(0, 5).map((note) => (
              <div className="day-task" key={note.id}>
                <span />
                <p>{note.text}</p>
              </div>
            ))}
            {!openNotes.length && <p className="muted small">Wszystko odhaczone. Ładny widok.</p>}
          </div>
        </div>
      </div>

      <div className="card day-card day-schedule-card">
        <div className="section-heading split">
          <div>
            <h2 className="panel-title">Harmonogram</h2>
            <p className="muted small">Krótkie bloki dnia zapisane lokalnie w przeglądarce.</p>
          </div>
          <Clock3 size={22} />
        </div>

        <form className="day-slot-form" onSubmit={addSlot}>
          <input type="time" value={slotTime} onChange={(event) => setSlotTime(event.target.value)} aria-label="Godzina" />
          <input value={slotTitle} onChange={(event) => setSlotTitle(event.target.value)} placeholder="Dodaj blok dnia" />
          <button className="button-like primary icon-only" type="submit" aria-label="Dodaj blok">
            <Plus size={17} />
          </button>
        </form>

        <div className="day-timeline">
          {slots.map((slot) => (
            <div className="day-slot" key={slot.id}>
              <time>{slot.time}</time>
              <p>{slot.title}</p>
              <button className="btn-icon" type="button" aria-label="Usuń blok" onClick={() => setSlots((items) => items.filter((item) => item.id !== slot.id))}>
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {!slots.length && (
            <div className="day-slot-empty">
              <p>Dodaj pierwszy blok, np. przegląd rynków albo szybki przegląd aktualności.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
