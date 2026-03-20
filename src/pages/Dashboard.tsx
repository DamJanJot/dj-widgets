import Clock from '../components/Clock'
import MiniCalendar from '../components/MiniCalendar'
import WeatherWidget from '@/components/weather_widget';
import WeatherForecast from '@/components/weather-forecast';



export default function Dashboard(){
  return (
    <div className="content">
      <h1 className="page-title">Pulpit nawigacyjny</h1>

      <div className='dashboard-grid'>
        <div className="card">
          <Clock />
        </div>
        
        <div className="card">
          <MiniCalendar />
        </div>
      </div> 

      <div className="card">
        <WeatherWidget city="Warszawa" apiKey="af8b3311443695ee4563e7d85bec9253" />
      </div>
      
      <div className="card">
        <WeatherForecast city="Warszawa" apiKey="af8b3311443695ee4563e7d85bec9253" />
      </div>
    </div>
  )
}
