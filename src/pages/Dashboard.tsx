import Clock from '../components/Clock'
import MiniCalendar from '../components/MiniCalendar'
import WeatherWidget from '@/components/weather_widget'
import WeatherForecast from '@/components/weather-forecast'

const WEATHER_API_KEY = 'af8b3311443695ee4563e7d85bec9253'

export default function Dashboard() {
  return (
    <section className="page-shell dashboard-page">
      <h1 className="page-title">Pulpit nawigacyjny</h1>

      <div className="dashboard-grid">
        <div className="card dashboard-clock-card">
          <Clock />
          <WeatherWidget city="Warszawa" apiKey={WEATHER_API_KEY} />
        </div>

        <div className="card">
          <MiniCalendar />
        </div>
      </div>

      <div className="card">
        <WeatherForecast city="Warszawa" apiKey={WEATHER_API_KEY} />
      </div>
    </section>
  )
}
