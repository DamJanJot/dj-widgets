import { useEffect, useState } from 'react'

type Coin = {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h?: number
}

const COIN_SYMBOL: Record<string, string> = { BTC: 'BTC', ETH: 'ETH', SOL: 'SOL' }

export default function CryptoWidget() {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=24h'
        )
        const data = await res.json()
        setCoins(data as Coin[])
      } catch {
        setCoins([])
      }
    }
    run()
  }, [])

  return (
    <div className="widget crypto-widget">
      <div className="section-heading split">
        <h3>Crypto</h3>
        <span className="muted small">USD / 24h</span>
      </div>
      <ul className="crypto-list">
        {coins.map((coin) => {
          const change = coin.price_change_percentage_24h ?? 0
          return (
            <li key={coin.id}>
              <span className="coin-badge">{COIN_SYMBOL[coin.symbol.toUpperCase()] ?? coin.symbol.toUpperCase()}</span>
              <span className="crypto-name">{coin.name}</span>
              <strong>{coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</strong>
              <span className={change >= 0 ? 'up' : 'down'}>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
            </li>
          )
        })}
        {!coins.length && <li className="small muted">Ładowanie danych...</li>}
      </ul>
    </div>
  )
}
