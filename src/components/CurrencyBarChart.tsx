import Card from './Card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { getDashboardMock } from '../services/mock'

export default function CurrencyBarChart(){
  const data = getDashboardMock().currencies
  return (
    <Card title="Kursy walut" className="span-4 row-2">
      <div className="row" style={{height:'100%'}}>
        <div style={{flex:1}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{width:110}} className="small">
          {data.map(d=> <div key={d.name} className="row" style={{justifyContent:'space-between'}}><span>{d.name}</span><b>{d.value} PLN</b></div>)}
        </div>
      </div>
    </Card>
  )
}
