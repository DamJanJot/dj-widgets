import Clock from '../components/Clock'
import Weather from '../components/Weather'
import Forecast from '../components/Forecast'

export default function Dashboard(){
  return (
    <div className="grid">
      <Clock />
      <Weather />
      <Forecast />
    </div>
  )
}
