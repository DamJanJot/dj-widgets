
import GoldHistoryWidget from '@/components/gold-history-widget';
import CurrencyDashboard from '@/components/currency-dashboard';
import CryptoWidget from '@/components/crypto-widget';




export default function Markets(){
  return (
    <div className="content">
      <h1 className="page-title">Rynki i waluty</h1>

      <div className="markets-layout">
        <div className="markets-column">
          <div className="card">
            <GoldHistoryWidget />
          </div>
        </div>

        <div className="markets-column">
          <div className='card'>
            <CurrencyDashboard />
          </div>

          <div className='card'>
            <CryptoWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
