import { useEffect, useState } from 'react'
import Card from './Card'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export default function Clock(){
  const [now,setNow] = useState(new Date())
  useEffect(()=>{
    const id=setInterval(()=>setNow(new Date()),1000)
    return ()=>clearInterval(id)
  },[])
  return (
    <Card className="span-4 row-2">
      <div className="kpi mono">{format(now,'HH:mm:ss', {locale: pl})}</div>
      <div className="small">{format(now,'dd.MM.yyyy')}</div>
      <div className="footer">Wschód 05:44:32 &nbsp;&nbsp; Zachód 19:27:53</div>
    </Card>
  )
}
