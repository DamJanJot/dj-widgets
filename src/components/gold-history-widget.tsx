import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

interface GoldDay {
    date: string;
    price: number;
}

export default function GoldHistoryWidget() {
    const [history, setHistory] = useState<GoldDay[]>([]);

    useEffect(() => {
        const fetchGoldHistory = async () => {
            try {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(endDate.getDate() - 90); // 90 dni wstecz

                const formatDate = (d: Date) =>
                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

                const url = `https://api.nbp.pl/api/cenyzlota/${formatDate(startDate)}/${formatDate(endDate)}?format=json`;

                const res = await fetch(url);
                const data = await res.json();
                console.log("Historia złota:", data);

                const prepared = data.map((entry: any) => ({
                    date: new Date(entry.data).toLocaleDateString('pl-PL', { month: 'short', day: 'numeric' }),
                    fullDate: entry.data,
                    price: entry.cena,
                }));

                setHistory(prepared);
            } catch (err) {
                console.error('Błąd pobierania historii złota:', err);
            }
        };

        fetchGoldHistory();
    }, []);

    const labels = history.map(d => d.date);
    const prices = history.map(d => d.price);

    const data = {
        labels,
        datasets: [
            {
                label: 'Cena złota (gram, PLN)',
                data: prices,
                fill: false,
                borderColor: '#4f46e5',
                tension: 0.3,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: { beginAtZero: false },
        },
    };

    const latestPrice = history[history.length - 1]?.price;

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-2">Cena złota (ostatnie 90 dni)</h2>
            <div className="relative h-80">
                <Line data={data} options={options} />
            </div>

            {latestPrice && (
                <div className="mt-4 stat">
                    <div className="label">Aktualna cena (gram)</div>
                    <div className="value text-xl">{latestPrice.toFixed(2)} PLN</div>
                </div>
            )}
        </div>
    );
}
