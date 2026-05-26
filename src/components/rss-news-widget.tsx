import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

interface Article {
  title: string
  link: string
  pubDate?: string
  thumbnail?: string
}

interface RSSNewsWidgetProps {
  feedUrl: string
}

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

export default function RSSNewsWidget({ feedUrl }: RSSNewsWidgetProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`)
        if (!res.ok) throw new Error(`Błąd API: ${res.status}`)

        const data = await res.json()
        if (!data.items?.length) {
          setError('Brak dostępnych wiadomości.')
          return
        }

        const news = data.items.slice(0, 8).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: formatDate(item.pubDate),
          thumbnail: pickThumbnail(item),
        }))

        setArticles(news)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Nie udało się pobrać danych.')
      }
    }

    fetchRSS()
  }, [feedUrl])

  return (
    <div className="news-widget">
      <h2 className="widget-title">Aktualności</h2>
      {error ? (
        <p className="news-error">{error}</p>
      ) : (
        <div className="news-list">
          {articles.map((article, idx) => (
            <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="news-item">
              <div className="news-item-inner">
                {article.thumbnail && (
                  <div className="news-thumb-wrap">
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
      )}
    </div>
  )
}
