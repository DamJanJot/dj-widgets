
import WarNewsWidget from '@/components/war-news-widget';
import RSSNewsWidget from '@/components/rss-news-widget';

export default function News(){
  return (
    <div className="content">
      <h1 className="page-title">Aktualnosci</h1>
      <div className="news-layout">
        <div className="card">
            <RSSNewsWidget feedUrl="https://wiadomosci.wp.pl/rss.xml" />
        </div>

        <div className="card">
          <WarNewsWidget />
        </div>
      </div>
    </div>
  )
}
