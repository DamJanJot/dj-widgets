import Card from './Card'
import { getDashboardMock } from '../services/mock'

export default function Forecast(){
  const data = getDashboardMock().forecast
  return (
    <Card className="span-4 row-2">
      <h3>Prognoza 5 dni</h3>
      <div className="row" style={{gap:16}}>
        {data.map(f=> (
          <div key={f.label} style={{textAlign:'center'}}>
            <div className="small">{f.label}</div>
            <div style={{fontWeight:700}}>{f.temp}°C</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
