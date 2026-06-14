import { useEffect, useState } from 'react'
import axios from 'axios'
import { CloudSun, Droplets, Wind } from 'lucide-react'

interface WeatherWidgetProps {
  city: string
  apiKey: string
}

type WeatherState = {
  temperature: number
  clouds: number
  humidity: number
  wind: number
  description: string
}

export default function WeatherWidget({ city, apiKey }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherState | null>(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`)
      .then((res) => {
        setWeather({
          temperature: Math.round(res.data.main.temp),
          clouds: res.data.clouds?.all ?? 0,
          humidity: res.data.main?.humidity ?? 0,
          wind: Math.round((res.data.wind?.speed ?? 0) * 10) / 10,
          description: res.data.weather?.[0]?.description ?? 'pogoda',
        })
      })
      .catch(() => setWeather(null))
  }, [city, apiKey])

  return (
    <div className="weather-inline">
      <div className="weather-location">
        <div className="weather-city">{city}</div>
        <div className="weather-desc">{weather?.description ?? 'Ładowanie pogody'}</div>
      </div>

      <div className="weather-main">
        <CloudSun size={30} />
        <strong>{weather ? `${weather.temperature}°C` : '--°C'}</strong>
      </div>

      <div className="weather-mini-grid">
        <span title="Zachmurzenie"><CloudSun size={14} /> <b>{weather ? `${weather.clouds}%` : '--'}</b></span>
        <span title="Wilgotność"><Droplets size={14} /> <b>{weather ? `${weather.humidity}%` : '--'}</b></span>
        <span title="Prędkość wiatru"><Wind size={14} /> <b>{weather ? `${weather.wind} m/s` : '--'}</b></span>
      </div>
    </div>
  )
}
