import { useEffect, useState } from 'react'

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

  return (
    <div className="widget clock-widget">
      <div className="stat">
        <div className="label">Miasto</div>
        <div className="value">Warszawa</div>
      </div>
      <div className="stat">
        <div className="label">Godzina</div>
        <div className="value clock">{timeStr}</div>
      </div>
      <div className="stat">
        <div className="label">Data</div>
        <div className="value">{dateStr}</div>
      </div>
      <div className="stat">
        <div className="label">Wschód</div>
        <div className="value">{sunrise}</div>
      </div>
      <div className="stat">
        <div className="label">Zachód</div>
        <div className="value">{sunset}</div>
      </div>
    </div>
  )
}
