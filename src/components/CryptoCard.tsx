import Card from './Card'
import { getDashboardMock } from '../services/mock'

export default function CryptoCard(){
  const crypto = getDashboardMock().crypto
  return (
    <Card className="span-4 row-2">
      <h3>Crypto</h3>
      <div className="list">
        {crypto.map(([name, val]) => (
          <div key={name} className="row"><span>{name}</span><b>{val}</b></div>
        ))}
      </div>
      <div style={{marginTop:14,fontSize:26,fontWeight:800}}>Cena złota (gram)</div>
      <div className="kpi">401.63 PLN</div>
    </Card>
  )
}
