import WarNewsWidget from '@/components/war-news-widget'
import RSSNewsWidget from '@/components/rss-news-widget'

export default function News() {
  return (
    <section className="page-shell news-page news-page-compact">
      <div className="news-layout">
        <div className="card news-card">
          <RSSNewsWidget feedUrl="https://wiadomosci.wp.pl/rss.xml" />
        </div>

        <div className="card news-card">
          <WarNewsWidget />
        </div>
      </div>
    </section>
  )
}
