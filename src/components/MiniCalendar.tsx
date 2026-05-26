import { FormEvent, useEffect, useMemo, useState } from 'react'
import { CalendarPlus, ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarDay {
  date: number
  month: number
  year: number
  isCurrentMonth: boolean
}

type CustomEvent = {
  id: string
  date: string
  title: string
}

const STORAGE_KEY = 'orbitum.calendarEvents'

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

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function dateFromKey(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function holidayKey(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatSelectedDate(key: string) {
  return dateFromKey(key).toLocaleDateString('pl-PL', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function MiniCalendar() {
  const today = new Date()
  const todayKey = dateKey(today)

  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [events, setEvents] = useState<CustomEvent[]>([])
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState(todayKey)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as CustomEvent[]
      if (Array.isArray(parsed)) setEvents(parsed)
    } catch {
      setEvents([])
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  }, [events])

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const getPrevMonthDays = (date: Date) => {
    const prevDate = new Date(date.getFullYear(), date.getMonth(), 0)
    const daysInPrevMonth = getDaysInMonth(prevDate)
    const firstDay = getFirstDayOfMonth(date)
    const daysToShow = firstDay === 0 ? 6 : firstDay - 1

    return Array.from({ length: daysToShow }, (_, i) => ({
      date: daysInPrevMonth - daysToShow + i + 1,
      month: prevDate.getMonth(),
      year: prevDate.getFullYear(),
      isCurrentMonth: false,
    }))
  }

  const getCurrentMonthDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date)
    return Array.from({ length: daysInMonth }, (_, i) => ({
      date: i + 1,
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth: true,
    }))
  }

  const getNextMonthDays = (calendarDays: CalendarDay[], date: Date) => {
    const remainingCells = 42 - calendarDays.length
    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    return Array.from({ length: remainingCells }, (_, i) => ({
      date: i + 1,
      month: nextDate.getMonth(),
      year: nextDate.getFullYear(),
      isCurrentMonth: false,
    }))
  }

  const prevDays = getPrevMonthDays(currentDate)
  const currDays = getCurrentMonthDays(currentDate)
  const nextDays = getNextMonthDays([...prevDays, ...currDays], currentDate)
  const allDays = [...prevDays, ...currDays, ...nextDays]

  const monthName = currentDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })

  const selectedItems = useMemo(() => {
    const selected = dateFromKey(selectedDate)
    const builtIn = holidays[holidayKey(selected)] ?? []
    const custom = events.filter((event) => event.date === selectedDate).map((event) => event.title)
    return [...builtIn, ...custom]
  }, [events, selectedDate])

  const selectDay = (day: CalendarDay) => {
    const nextDate = new Date(day.year, day.month, day.date)
    const nextKey = dateKey(nextDate)
    setSelectedDate(nextKey)
    setEventDate(nextKey)
  }

  const addEvent = (event: FormEvent) => {
    event.preventDefault()
    const title = eventTitle.trim()
    if (!title || !eventDate) return
    setEvents((items) => [{ id: crypto.randomUUID(), title, date: eventDate }, ...items].slice(0, 12))
    setSelectedDate(eventDate)
    setCurrentDate(dateFromKey(eventDate))
    setEventTitle('')
  }

  return (
    <div className="widget mini-calendar">
      <div className="mini-calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="btn-icon mini-calendar-nav" aria-label="Poprzedni miesiąc">
          <ChevronLeft size={18} />
        </button>
        <h3 className="mini-calendar-title">{monthName}</h3>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="btn-icon mini-calendar-nav" aria-label="Następny miesiąc">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mini-calendar-grid">
        {['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'].map((day) => (
          <div key={day} className="mini-calendar-weekday">{day}</div>
        ))}

        {allDays.map((day, idx) => {
          if (!day.isCurrentMonth) {
            return <div key={idx} className="mini-calendar-day mini-calendar-day-empty" aria-hidden="true" />
          }

          const cellDate = new Date(day.year, day.month, day.date)
          const cellKey = dateKey(cellDate)
          const hasHoliday = !!holidays[holidayKey(cellDate)]?.length
          const cellEvents = events.filter((item) => item.date === cellKey)
          const hasEvent = cellEvents.length > 0
          const isToday = cellKey === todayKey
          const isSelected = cellKey === selectedDate

          return (
            <button
              type="button"
              key={idx}
              onClick={() => selectDay(day)}
              className={`mini-calendar-day mini-calendar-day-current ${isToday ? 'mini-calendar-day-today' : ''} ${isSelected ? 'mini-calendar-day-selected' : ''} ${hasHoliday || hasEvent ? 'mini-calendar-day-event' : ''}`}
              title={[...(holidays[holidayKey(cellDate)] ?? []), ...cellEvents.map((item) => item.title)].join(', ')}
            >
              {day.date}
            </button>
          )
        })}
      </div>

      <div className="calendar-events-panel">
        <div>
          <span className="muted small">Zaznaczony dzień</span>
          <strong>{formatSelectedDate(selectedDate)}</strong>
          <p className="calendar-selected-items">{selectedItems.length ? selectedItems.join(', ') : 'Brak świąt i wydarzeń'}</p>
        </div>
        <form className="calendar-event-form" onSubmit={addEvent}>
          <input
            type="date"
            value={eventDate}
            onChange={(event) => {
              setEventDate(event.target.value)
              setSelectedDate(event.target.value)
              setCurrentDate(dateFromKey(event.target.value))
            }}
            aria-label="Data wydarzenia"
          />
          <input value={eventTitle} onChange={(event) => setEventTitle(event.target.value)} placeholder="Dodaj wydarzenie" />
          <button className="button-like primary icon-only" type="submit" aria-label="Dodaj wydarzenie">
            <CalendarPlus size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
