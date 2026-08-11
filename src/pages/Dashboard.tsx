import { useState } from 'react'
import Clock from '../components/Clock'
import MiniCalendar from '../components/MiniCalendar'
import WeatherWidget from '@/components/weather_widget'
import WeatherForecast from '@/components/weather-forecast'
import CommandCenter from '@/components/CommandCenter'
import RecentViews from '@/components/RecentViews'

const WEATHER_API_KEY = 'af8b3311443695ee4563e7d85bec9253'

export default function Dashboard() {
  const [weatherCity, setWeatherCity] = useState('Warszawa')
  const [locationStatus, setLocationStatus] = useState('')

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolokalizacja niedostępna')
      return
    }

    setLocationStatus('Sprawdzam lokalizację...')
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${WEATHER_API_KEY}`
          )
          const [place] = await res.json()
          const city = place?.local_names?.pl ?? place?.name
          if (city) {
            setWeatherCity(city)
            setLocationStatus(`Lokalizacja: ${city}`)
          } else {
            setLocationStatus('Zostaje Warszawa')
          }
        } catch {
          setLocationStatus('Zostaje Warszawa')
        }
      },
      () => setLocationStatus('Zostaje Warszawa'),
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 1000 * 60 * 30 }
    )
  }

  return (
    <section className="page-shell dashboard-page">
      <h1 className="page-title">Pulpit nawigacyjny</h1>

      <div className="dashboard-grid">
        <div className="card dashboard-clock-card">
          <div className="dashboard-weather-actions">
            <span className="muted small">{locationStatus || 'Pogoda lokalna'}</span>
            <button className="button-like ghost" type="button" onClick={useCurrentLocation}>
              Użyj lokalizacji
            </button>
          </div>
          <WeatherWidget city={weatherCity} apiKey={WEATHER_API_KEY} />
          <WeatherForecast city={weatherCity} apiKey={WEATHER_API_KEY} compact />
          <Clock />
        </div>

        <div className="card">
          <MiniCalendar />
        </div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="card">
          <CommandCenter />
        </div>
        <div className="card">
          <RecentViews />
        </div>
      </div>
    </section>
  )
}
