
import GoldHistoryWidget from '@/components/gold-history-widget';
import CurrencyDashboard from '@/components/currency-dashboard';
import CryptoWidget from '@/components/crypto-widget';




export default function Markets(){
  return (
    <div className="content">
      <h1 className="text-2xl font-bold mb-4">Rynki i waluty</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="card lg:col-span-1">
          <GoldHistoryWidget />
        </div>

        <div className='card lg:col-span-1'>
          <CurrencyDashboard />
        </div>
      </div>
      
      <div className='card'>
        <CryptoWidget />
      </div>
     
    </div>
  )
}
