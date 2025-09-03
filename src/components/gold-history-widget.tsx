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
                startDate.setDate(endDate.getDate() - 6); // 7 dni wstecz

                const formatDate = (d: Date) =>
                    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

                const url = `https://api.nbp.pl/api/cenyzlota/${formatDate(startDate)}/${formatDate(endDate)}?format=json`;

                const res = await fetch(url);
                const data = await res.json();
                console.log("Historia złota:", data);

                const prepared = data.map((entry: any) => ({
                    date: new Date(entry.data).toLocaleDateString('pl-PL', { weekday: 'short' }),
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
        <div className="w-full h-full flex flex-col justify-center">
            <div className="relative h-48">
                <Line data={data} options={options} />
            </div>

            {latestPrice && (
                <p className="text-xl text-center font-bold mt-2">
                    Cena złota (gram): {latestPrice.toFixed(2)} PLN
                </p>
            )}
        </div>
    );
}
