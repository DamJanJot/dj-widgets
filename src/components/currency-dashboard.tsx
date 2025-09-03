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

                const selected = ['USD', 'EUR', 'GBP'].map((currency) => {
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
                <h2 className="text-lg font-semibold mb-2 ">Kursy walut</h2>
                <ul className=" text-sm text-neutral-500 space-y-1">
                    {rates.map((r, idx) => (
                        <li key={idx} className="flex row-between">
                            <span>{r.currency} </span>
                            <span>{r.rate.toFixed(2)} PLN</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="h-48">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
