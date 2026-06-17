import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock3 } from 'lucide-react'
import { getCommandByPath, readRecentViews } from '@/lib/navigation'

export default function RecentViews() {
  const [paths, setPaths] = useState<string[]>(() => readRecentViews())

  useEffect(() => {
    const sync = () => setPaths(readRecentViews())
    const syncCustom = (event: Event) => {
      const detail = (event as CustomEvent<string[]>).detail
      setPaths(Array.isArray(detail) ? detail : readRecentViews())
    }

    window.addEventListener('storage', sync)
    window.addEventListener('orbitum-recent-views', syncCustom)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('orbitum-recent-views', syncCustom)
    }
  }, [])

  const recent = useMemo(
    () => paths.map((path) => getCommandByPath(path)).filter(Boolean).slice(0, 4),
    [paths]
  )

  return (
    <div className="widget recent-views">
      <div className="section-heading split">
        <div>
          <h2 className="widget-title">Ostatnio odwiedzane</h2>
          <p className="muted small">Skróty dopasowane do Twojej pracy</p>
        </div>
        <Clock3 size={22} />
      </div>

      <div className="recent-view-list">
        {recent.length ? recent.map((item) => item && (
          <Link to={item.path} className="recent-view-item" key={item.path}>
            <item.icon size={18} />
            <span>
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
            <ArrowRight size={14} />
          </Link>
        )) : (
          <div className="recent-view-empty">Odwiedź kilka paneli, a pojawią się tutaj szybkie skróty.</div>
        )}
      </div>
    </div>
  )
}
