import Clock from '../components/Clock'
import Weather from '../components/Weather'
import Forecast from '../components/Forecast'
import NewsList from '../components/NewsList'
import CurrencyBarChart from '../components/CurrencyBarChart'
import CryptoCard from '../components/CryptoCard'
import GoldLineChart from '../components/GoldLineChart'


export default function Dashboard(){
  return (
    <div className="grid">
      <Clock />
      <Weather />
      <Forecast />
      <NewsList title="Aktualności" />
      <NewsList title="Działania zbrojne" />
      <CurrencyBarChart />
      <CryptoCard />
      <GoldLineChart />
    </div>
  )
}
