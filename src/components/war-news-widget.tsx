import { useEffect, useState } from 'react';

interface Article {
    title: string;
    link: string;
    pubDate?: string;
}

export default function WarNewsWidget() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRSS = async () => {
    try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml');
        const data = await res.json();

        const filtered = data.items.filter((item: any) =>
            item.title.toLowerCase().includes('war') ||
            item.title.toLowerCase().includes('conflict') ||
            item.title.toLowerCase().includes('military') ||
            item.title.toLowerCase().includes('ukraine')
        );

        setArticles(filtered.slice(0, 6).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString('pl-PL') : undefined,
        })));
    } catch (err: any) {
        console.error(err);
        setError('Nie udało się pobrać danych.');
    }
};


        fetchRSS();
    }, []);

    return (
        <div className="news-widget">
            <h2 className="widget-title">Dzialania zbrojne</h2>
            {error ? (
                <p className="news-error">{error}</p>
            ) : (
                <ul className="news-list-simple">
                    {articles.map((article, idx) => (
                        <li key={idx} className="news-simple-item">
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-simple-link">
                                <span className="news-simple-title">{article.title}</span>
                                {article.pubDate && <span className="news-simple-date">{article.pubDate}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
