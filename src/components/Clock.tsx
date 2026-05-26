import { useEffect, useState } from 'react'
import { CalendarDays, Clock3, Sunrise, Sunset } from 'lucide-react'

const timeCards = [
  { key: 'time', label: 'Godzina', icon: Clock3 },
  { key: 'date', label: 'Data', icon: CalendarDays },
  { key: 'sunrise', label: 'Wschód', icon: Sunrise },
  { key: 'sunset', label: 'Zachód', icon: Sunset },
] as const

export default function Clock() {
  const [now, setNow] = useState(new Date())

  const sunrise = '05:44:32'
  const sunset = '19:27:53'

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const dateStr = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const values = {
    time: timeStr,
    date: dateStr,
    sunrise,
    sunset,
  }

  return (
    <div className="clock-strip" aria-label="Czas i słońce">
      {timeCards.map((card) => (
        <div className="time-pill" key={card.key}>
          <card.icon size={17} />
          <div>
            <span>{card.label}</span>
            <strong>{values[card.key]}</strong>
          </div>
        </div>
      ))}
    </div>
  )
}
