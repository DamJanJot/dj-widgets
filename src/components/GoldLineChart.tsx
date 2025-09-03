import Card from './Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'
import { api } from '@/api/client'

type Row = { priced_at: string; price_usd: number }

export default function GoldLineChart() {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    api.get('/gold?days=30').then(r => {
      const arr = (r.data as any[]).map(x => ({ priced_at: x.priced_at, price_usd: Number(x.price_usd) }))
      setRows(arr)
    }).catch(() => setRows([]))
  }, [])

  return (
    <Card className="widget">
      <h3 style={{marginTop:0}}>Złoto (USD)</h3>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows}>
            <CartesianGrid stroke="rgba(255,255,255,.12)" strokeDasharray="3 3" />
            <XAxis dataKey="priced_at" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price_usd" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
