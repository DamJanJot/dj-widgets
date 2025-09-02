import CurrencyBarChart from '../components/CurrencyBarChart'
import CryptoCard from '../components/CryptoCard'
import GoldLineChart from '../components/GoldLineChart'

export default function Markets(){
  return (
    <div className="grid">
      <CurrencyBarChart />
      <CryptoCard />
      <GoldLineChart />
    </div>
  )
}
