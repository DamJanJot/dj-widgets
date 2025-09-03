import { useEffect, useState } from 'react';

interface CurrencyWidgetProps {
    currencies: string[];
}

export default function CurrencyWidget({ currencies }: CurrencyWidgetProps) {
    const [rates, setRates] = useState<{ currency: string; rate: number }[]>([]);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A?format=json');
                const data = await res.json();
                const availableRates = data[0].rates;

                const filtered = currencies.map((currency) => {
                    const found = availableRates.find((r: any) => r.code === currency);
                    return { currency, rate: found ? found.mid : 0 };
                });

                setRates(filtered);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRates();
    }, [currencies]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">Kursy walut</h2>
            <ul className="text-sm text-neutral-500">
                {rates.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                        <span>{item.currency}</span>
                        <span>{item.rate.toFixed(2)} PLN</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
