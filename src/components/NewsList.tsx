import Card from './Card'
import { getDashboardMock } from '../services/mock'

export default function NewsList({title}:{title:string}){
  const items = title === 'Aktualności' ? getDashboardMock().news : getDashboardMock().war
  return (
    <Card title={title} className="span-4 row-2">
      <div className="list">
        {items.map((n,i)=> <div className="list-item" key={i}>• {n.title}</div>)}
      </div>
    </Card>
  )
}
