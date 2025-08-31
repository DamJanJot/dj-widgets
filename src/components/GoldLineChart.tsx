import Card from './Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getDashboardMock } from '../services/mock'

export default function GoldLineChart(){
  const data = getDashboardMock().goldSeries
  return (
    <Card className="span-8 row-2">
      <div className="kpi small">Cena złota (gram): 401.63 PLN</div>
      <div style={{height:'calc(100% - 36px)'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
