import CurrencyDashboard from '@/components/currency-dashboard'
import CryptoWidget from '@/components/crypto-widget'
import GoldHistoryWidget from '@/components/gold-history-widget'

export default function Markets(){
  return (
    <div className="grid">
      <div className="grid-col">
        <GoldHistoryWidget />
      </div>
      <div className="grid-col">
        <CryptoWidget />
      </div>
      <div className="grid-col">
        <CurrencyDashboard />
      </div>
    </div>
  )
}
