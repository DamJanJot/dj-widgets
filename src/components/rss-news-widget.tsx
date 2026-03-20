import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Article {
    title: string;
    link: string;
    pubDate?: string;
    thumbnail?: string;
}

interface RSSNewsWidgetProps {
    feedUrl: string;
}

export default function RSSNewsWidget({ feedUrl }: RSSNewsWidgetProps) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRSS = async () => {
            try {
                const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
                if (!res.ok) throw new Error(`Błąd API: ${res.status}`);

                const data = await res.json();
                
                if (data.items) {
                    const news = data.items.slice(0, 8).map((item: any) => {
                        const pubDate = new Date(item.pubDate);
                        const formattedDate = pubDate.toLocaleDateString('pl-PL', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: '2-digit' 
                        });
                        
                        // Próba wyciągania thumbnail z content lub description
                        let thumbnail = '';
                        if (item.thumbnail) {
                            thumbnail = item.thumbnail;
                        } else if (item.enclosure?.link) {
                            thumbnail = item.enclosure.link;
                        } else if (item.content) {
                            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) thumbnail = imgMatch[1];
                        } else if (item.description) {
                            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) thumbnail = imgMatch[1];
                        }

                        return {
                            title: item.title,
                            link: item.link,
                            pubDate: formattedDate,
                            thumbnail,
                        };
                    });
                    setArticles(news);
                    setError(null);
                } else {
                    setError('Brak dostępnych wiadomości.');
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Nie udało się pobrać danych.');
            }
        };

        fetchRSS();
    }, [feedUrl]);

    const formatUrl = (url: string) => {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return domain;
        } catch {
            return 'link';
        }
    };

    return (
        <div className="news-widget">
            <h2 className="widget-title">Aktualnosci</h2>
            {error ? (
                <p className="news-error">{error}</p>
            ) : (
                <div className="news-list">
                    {articles.map((article, idx) => (
                        <a
                            key={idx}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-item"
                        >
                            <div className="news-item-inner">
                                {article.thumbnail && (
                                    <div className="news-thumb-wrap">
                                        <img
                                            src={article.thumbnail}
                                            alt=""
                                            className="news-thumb"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="news-content">
                                    <p className="news-title line-clamp-2">
                                        {article.title}
                                    </p>
                                    <div className="news-meta">
                                        <span>{article.pubDate}</span>
                                        <span className="news-dot">•</span>
                                        <span className="news-source">
                                            {formatUrl(article.link)}
                                            <ExternalLink size={12} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
