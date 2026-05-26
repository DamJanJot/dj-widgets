import { useEffect, useState } from 'react'

type ForecastItem = {
  day: string
  temp: number
  icon: string
}

type Props = {
  city: string
  apiKey: string
  compact?: boolean
}

const daysPl = ['ndz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.']

export default function WeatherForecast({ city, apiKey, compact = false }: Props) {
  const [items, setItems] = useState<ForecastItem[]>([])

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            city
          )}&appid=${apiKey}&units=metric&lang=pl`
        )
        const data = await res.json()

        const byDay: Record<string, any[]> = {}
        for (const x of data.list as any[]) {
          const d = new Date(x.dt * 1000)
          const key = d.toISOString().slice(0, 10)
          ;(byDay[key] ||= []).push(x)
        }

        const daily = Object.entries(byDay)
          .slice(0, 5)
          .map(([key, arr]) => {
            const noonIdx = arr.reduce((best, cur, idx) => {
              const h = new Date(cur.dt * 1000).getHours()
              return Math.abs(h - 12) < Math.abs(new Date(arr[best].dt * 1000).getHours() - 12)
                ? idx
                : best
            }, 0)
            const pick = arr[noonIdx]
            const d = new Date(key)
            return {
              day: daysPl[d.getDay()],
              temp: Math.round(pick.main.temp),
              icon: pick.weather?.[0]?.icon ?? '01d',
            } as ForecastItem
          })

        setItems(daily)
      } catch {
        setItems([])
      }
    }
    run()
  }, [city, apiKey])

  return (
    <div className={compact ? 'forecast-widget forecast-widget-compact' : 'widget forecast-widget'}>
      <h3>Prognoza 5 dni</h3>
      <div className="forecast-row">
        {items.map((x, i) => (
          <div className="forecast-item" key={i}>
            <div className="muted small">{x.day}</div>
            <img src={`https://openweathermap.org/img/wn/${x.icon}.png`} alt="" width={compact ? 26 : 32} height={compact ? 26 : 32} />
            <div className="value">{x.temp}°C</div>
          </div>
        ))}
        {!items.length && <div className="muted small">Ładowanie prognozy...</div>}
      </div>
    </div>
  )
}
