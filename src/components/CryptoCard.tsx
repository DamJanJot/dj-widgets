// import Card from './Card'
// import { useEffect, useState } from 'react'
// import { api } from '@/api/client'

// type Crypto = { id: number; symbol: string; name: string; price_usd: number; change_24h: number }

// export default function CryptoCard() {
//   const [data, setData] = useState<Crypto[]>([])

//   useEffect(() => {
//     api.get('/crypto').then(r => setData(r.data as Crypto[])).catch(() => setData([]))
//   }, [])

//   return (
//     <Card className="span-4 row-2" title="Crypto">
//       <div className="list">
//         {data.map(c => (
//           <div key={c.id} className="row" style={{ justifyContent: 'space-between' }}>
//             <span>{c.name} ({c.symbol})</span>
//             <b>{c.price_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</b>
//           </div>
//         ))}
//         {!data.length && <div className="small" style={{ opacity: 0.7 }}>Brak danych.</div>}
//       </div>
//     </Card>
//   )
// }



import Card from './Card'
import { useEffect, useState } from 'react'
import { api } from '@/api/client'

type Crypto = { id: number; symbol: string; name: string; price_usd: number; change_24h: number }

const COIN_EMOJI: Record<string,string> = {
  BTC:'🟠', ETH:'🟣', SOL:'🟩', USDT:'🟡'
}

export default function CryptoCard() {
  const [data, setData] = useState<Crypto[]>([])

  useEffect(() => {
    api.get('/crypto').then(r => setData(r.data as Crypto[])).catch(() => setData([]))
  }, [])

  return (
    <Card className="widget">
      <h3 style={{marginTop:0}}>Crypto</h3>
      <ul className="list">
        {data.map(c => (
          <li key={c.id} className="row-between">
            <span>
              <span className="coin" aria-hidden>{COIN_EMOJI[c.symbol] ?? '⛓️'}</span>
              &nbsp;{c.name} ({c.symbol})
            </span>
            <b className={c.change_24h >= 0 ? 'up' : 'down'}>
              {c.price_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </b>
          </li>
        ))}
        {!data.length && <li className="small muted">Brak danych.</li>}
      </ul>
    </Card>
  )
}
