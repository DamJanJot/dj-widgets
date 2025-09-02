import NewsList from '../components/NewsList'

export default function News(){
  return (
    <div className="grid">
      <NewsList title="Aktualności" />
      <NewsList title="Działania zbrojne" />
    </div>
  )
}
