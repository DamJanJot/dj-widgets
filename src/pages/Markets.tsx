
import GoldHistoryWidget from '@/components/gold-history-widget';
import CurrencyDashboard from '@/components/currency-dashboard';
import CryptoWidget from '@/components/crypto-widget';




export default function Markets(){
  return (
    <div className="grid">

      <div className="card">
        <GoldHistoryWidget />
      </div>

      <div className='card'>
        <CryptoWidget />
      </div>

      <div className='card'>
        <CurrencyDashboard />
      </div>
     
    </div>
  )
}
