import GoldHistoryWidget from '@/components/gold-history-widget'
import CurrencyDashboard from '@/components/currency-dashboard'
import CryptoWidget from '@/components/crypto-widget'

export default function Markets() {
  return (
    <section className="page-shell markets-page">
      <h1 className="page-title">Rynki i waluty</h1>

      <div className="markets-layout">
        <div className="card markets-gold-card">
          <GoldHistoryWidget />
        </div>

        <div className="markets-column">
          <div className="card markets-currency-card">
            <CurrencyDashboard />
          </div>

          <div className="card markets-crypto-card">
            <CryptoWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
