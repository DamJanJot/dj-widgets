// import Card from './Card'
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
// import { useEffect, useState } from 'react'
// import { api } from '@/api/client'

// type Rate = { base: string; symbol: string; value: number; as_of?: string }

// export default function CurrencyBarChart() {
//   const [data, setData] = useState<{ name: string; value: number }[]>([])

//   useEffect(() => {
//     api.get('/rates?base=PLN').then(r => {
//       const arr = r.data as Rate[]
//       const lastPer = new Map<string, number>()
//       for (const row of arr) if (!lastPer.has(row.symbol)) lastPer.set(row.symbol, Number(row.value))
//       setData(Array.from(lastPer, ([name, value]) => ({ name, value })))
//     }).catch(() => setData([]))
//   }, [])

//   return (
//     <Card title="Kursy walut" className="span-4 row-2">
//       <div className="row" style={{ height: '100%' }}>
//         <div style={{ flex: 1 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div style={{ width: 120 }} className="small">
//           {data.map(d => (
//             <div key={d.name} className="row" style={{ justifyContent: 'space-between' }}>
//               <span>{d.name}</span><b>{d.value.toFixed(2)} PLN</b>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Card>
//   )
// }


import Card from './Card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { useEffect, useState } from 'react'
import { api } from '@/api/client'

type Rate = { base: string; symbol: string; value: number; as_of?: string }

const FLAG: Record<string,string> = {
  USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', CHF: '🇨🇭', PLN: '🇵🇱'
}

export default function CurrencyBarChart() {
  const [data, setData] = useState<{ name: string; value: number; symbol: string }[]>([])

  useEffect(() => {
    api.get('/rates?base=PLN').then(r => {
      const arr = r.data as Rate[]
      const lastPer = new Map<string, number>()
      for (const row of arr) if (!lastPer.has(row.symbol)) lastPer.set(row.symbol, Number(row.value))
      const ds = Array.from(lastPer, ([symbol, value]) => ({ name: `${FLAG[symbol] ?? '🏳️'} ${symbol}`, value, symbol }))
      setData(ds)
    }).catch(() => setData([]))
  }, [])

  return (
    <Card className="widget">
      <h3 className="row-between" style={{marginTop:0}}>
        <span>Kursy walut</span>
      </h3>
      <div className="row" style={{ alignItems:'flex-start', height: 240 }}>
        <div style={{ flex: 1, height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,.12)" strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: 150 }} className="small">
          {data.map(d => (
            <div key={d.symbol} className="row-between">
              <span><span className="flag">{FLAG[d.symbol] ?? '🏳️'}</span> {d.symbol}</span>
              <b>{d.value.toFixed(2)} PLN</b>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
