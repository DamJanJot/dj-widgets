import Card from './Card'
export default function Weather(){
  return (
    <Card className="span-4 row-2">
      <div className="row" style={{justifyContent:'space-between'}}>
        <div>
          <div style={{opacity:.9}}>Warszawa</div>
          <div className="kpi">20°C</div>
        </div>
        <div className="badge">75%</div>
      </div>
    </Card>
  )
}
