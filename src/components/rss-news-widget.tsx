import { useEffect, useState } from 'react';

interface Article {
    title: string;
    link: string;
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
                    const news = data.items.slice(0, 5).map((item: any) => ({
                        title: item.title,
                        link: item.link,
                    }));
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

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">Aktualności</h2>
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <ul className="text-sm text-neutral-500 space-y-2">
                    {articles.map((article, idx) => (
                        <li key={idx}>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {article.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
