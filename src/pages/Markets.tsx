import { useState } from 'react'
import { BellRing, SlidersHorizontal, X } from 'lucide-react'
import GoldHistoryWidget from '@/components/gold-history-widget'
import CurrencyDashboard from '@/components/currency-dashboard'
import CryptoWidget from '@/components/crypto-widget'
import MarketWatchlist from '@/components/MarketWatchlist'

export default function Markets() {
  const [watchlistOpen, setWatchlistOpen] = useState(false)

  return (
    <section className="page-shell markets-page">
      <div className="markets-layout">
        <div className="card markets-gold-card">
          <GoldHistoryWidget />
        </div>

        <div className="markets-column">
          <div className="markets-panel-actions">
            <span className="muted small">Panel rynków</span>
            <button className="button-like" type="button" onClick={() => setWatchlistOpen(true)}>
              <SlidersHorizontal size={16} />
              Obserwowane
            </button>
          </div>

          <div className="card markets-currency-card">
            <CurrencyDashboard />
          </div>
        </div>

        <div className="card markets-crypto-card markets-crypto-bottom">
          <CryptoWidget />
        </div>
      </div>

      {watchlistOpen && (
        <div className="market-watchlist-drawer" role="dialog" aria-modal="true" aria-label="Obserwowane rynki">
          <button className="market-watchlist-backdrop" type="button" aria-label="Zamknij obserwowane" onClick={() => setWatchlistOpen(false)} />
          <aside className="market-watchlist-panel">
            <div className="market-watchlist-panel-header">
              <div>
                <strong>Obserwowane</strong>
                <span>Alerty, progi i notatki rynkowe</span>
              </div>
              <button className="btn-icon" type="button" aria-label="Zamknij" onClick={() => setWatchlistOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="card markets-watchlist-card">
              <MarketWatchlist />
            </div>
            <div className="market-watchlist-hint">
              <BellRing size={16} />
              Panel jest ukryty, żeby wykresy rynków miały pełną wysokość.
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}
