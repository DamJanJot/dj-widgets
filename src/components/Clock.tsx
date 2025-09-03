// import { useEffect, useState } from 'react'
// import Card from './Card'
// import { format } from 'date-fns'
// import { pl } from 'date-fns/locale'

// export default function Clock(){
//   const [now,setNow] = useState(new Date())
//   useEffect(()=>{
//     const id=setInterval(()=>setNow(new Date()),1000)
//     return ()=>clearInterval(id)
//   },[])
//   return (
//     <Card className="text-center span-4 row-2">
//       {/* <div className="kpi mono">{format(now,'HH:mm:ss', {locale: pl})}</div> */}
//       <h2 className="kpi mono text-lg font-medium mb-4">{format(now,'HH:mm:ss', {locale: pl})}</h2>
//       {/* <div className="">{format(now,'HH:mm:ss', {locale: pl})}</div> */}
//       <div className="small">{format(now,'dd.MM.yyyy')}</div>
//       <div className="footer">Wschód 05:44:32 &nbsp;&nbsp; Zachód 19:27:53</div>
//     </Card>
//   )
// }


import { useEffect, useState } from 'react'

export default function Clock() {
  const [now, setNow] = useState(new Date())

  // jeśli masz to liczone dynamicznie – podmień niżej:
  const sunrise = '05:44:32'
  const sunset  = '19:27:53'

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const dateStr = now.toLocaleDateString('pl-PL', { day:'2-digit', month:'2-digit', year:'numeric' })
  const timeStr = now.toLocaleTimeString('pl-PL', { hour:'2-digit', minute:'2-digit', second:'2-digit' })

  return (
    <div className="widget">
      <div className="row-between" style={{ flexWrap:'wrap', gap:12 }}>
        <div className="stat">
          <div className="label">Miasto</div>
          <div className="value">Warszawa</div>
        </div>
        <div className="stat">
          <div className="label">Godzina</div>
          <div className="value clock">{timeStr}</div>
        </div>
        <div className="stat">
          <div className="label">Data</div>
          <div className="value">{dateStr}</div>
        </div>
        <div className="stat">
          <div className="label">Wschód</div>
          <div className="value">{sunrise}</div>
        </div>
        <div className="stat">
          <div className="label">Zachód</div>
          <div className="value">{sunset}</div>
        </div>
      </div>
    </div>
  )
}
