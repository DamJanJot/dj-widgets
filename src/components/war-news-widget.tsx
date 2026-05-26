import { useEffect, useState } from 'react'
import { ExternalLink, ShieldAlert } from 'lucide-react'

interface Article {
  title: string
  link: string
  pubDate?: string
  thumbnail?: string
}

const FEEDS = [
  'https://feeds.bbci.co.uk/news/world/rss.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  'https://www.aljazeera.com/xml/rss/all.xml',
]

const KEYWORDS = [
  'war', 'conflict', 'military', 'army', 'attack', 'strike', 'missile', 'drone', 'ukraine',
  'russia', 'gaza', 'israel', 'nato', 'frontline', 'defence', 'defense',
]

const FALLBACK_ARTICLES: Article[] = [
  {
    title: 'Ukraine war updates and international response',
    link: 'https://www.bbc.com/news/world-europe-60506682',
    pubDate: 'BBC',
  },
  {
    title: 'Russia-Ukraine war news and analysis',
    link: 'https://www.aljazeera.com/tag/ukraine-russia-crisis/',
    pubDate: 'Al Jazeera',
  },
  {
    title: 'Middle East conflict latest coverage',
    link: 'https://www.bbc.com/news/world/middle_east',
    pubDate: 'BBC',
  },
]

function pickThumbnail(item: any) {
  if (item.thumbnail) return item.thumbnail
  if (item.enclosure?.link) return item.enclosure.link
  const html = item.content || item.description || ''
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/)
  return imgMatch?.[1] ?? ''
}

function formatDate(value?: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

function formatUrl(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'link'
  }
}

export default function WarNewsWidget() {
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const batches = await Promise.allSettled(
          FEEDS.map(async (feed) => {
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`)
            if (!res.ok) throw new Error(`Błąd API: ${res.status}`)
            const data = await res.json()
            return data.items || []
          })
        )

        const items = batches
          .flatMap((batch) => batch.status === 'fulfilled' ? batch.value : [])
          .filter(Boolean)

        const filtered = items.filter((item: any) => {
          const haystack = `${item.title ?? ''} ${item.description ?? ''}`.toLowerCase()
          return KEYWORDS.some((keyword) => haystack.includes(keyword))
        })

        const source = filtered.length ? filtered : items
        const news = source.slice(0, 8).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: formatDate(item.pubDate),
          thumbnail: pickThumbnail(item),
        }))

        setArticles(news.length ? news : FALLBACK_ARTICLES)
        setError(null)
      } catch (err: any) {
        setArticles(FALLBACK_ARTICLES)
        setError(err.message || 'Pokazuję zapasowe linki, bo kanał RSS chwilowo nie odpowiada.')
      }
    }

    fetchRSS()
  }, [])

  return (
    <div className="news-widget">
      <div className="section-heading">
        <ShieldAlert size={22} />
        <h2 className="widget-title">Działania zbrojne</h2>
      </div>
      {error && <p className="news-note">{error}</p>}
      <div className="news-list">
        {articles.map((article, idx) => (
          <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="news-item">
            <div className="news-item-inner">
              {article.thumbnail && (
                <div className="news-thumb-wrap compact">
                  <img src={article.thumbnail} alt="" className="news-thumb" onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }} />
                </div>
              )}
              <div className="news-content">
                <p className="news-title line-clamp-2">{article.title}</p>
                <div className="news-meta">
                  <span>{article.pubDate}</span>
                  <span className="news-dot">•</span>
                  <span className="news-source">{formatUrl(article.link)} <ExternalLink size={12} /></span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
