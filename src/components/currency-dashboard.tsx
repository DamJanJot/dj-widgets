import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);

interface Rate {
    currency: string;
    rate: number;
}



// 💲  💷   💵  💶  💷



export default function CurrencyDashboard() {
    const [rates, setRates] = useState<Rate[]>([]);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A?format=json');
                const data = await res.json();
                const availableRates = data[0].rates;

                const selected = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'NOK', 'SEK', 'CAD', 'AUD'].map((currency) => {
                    const found = availableRates.find((r: any) => r.code === currency);
                    return { currency, rate: found ? found.mid : 0 };
                });

                setRates(selected);
            } catch (err) {
                console.error('Błąd pobierania kursów:', err);
            }
        };

        fetchRates();
    }, []);

    const chartData = {
        labels: rates.map(r => r.currency),
        datasets: [
            {
                label: 'Kurs (PLN)',
                data: rates.map(r => r.rate),
                backgroundColor: 'rgba(79, 70, 229, 0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="flex flex-col gap-4 w-full widget text-center">
            <div>
                <h2 className="text-lg font-semibold mb-4 ">Kursy walut (PLN)</h2>
                <div className="grid grid-cols-3 gap-3">
                    {rates.map((r, idx) => (
                        <div key={idx} className="stat">
                            <div className="label">{r.currency}</div>
                            <div className="value text-base">{r.rate.toFixed(2)} PLN</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-56 mt-2">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
