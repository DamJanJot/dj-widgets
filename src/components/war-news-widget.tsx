import { useEffect, useState } from 'react';

interface Article {
    title: string;
    link: string;
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

        setArticles(filtered.slice(0, 5));
    } catch (err: any) {
        console.error(err);
        setError('Nie udało się pobrać danych.');
    }
};


        fetchRSS();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">Działania zbrojne</h2>
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
