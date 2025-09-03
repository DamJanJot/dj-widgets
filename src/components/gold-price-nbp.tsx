import { useEffect, useState } from 'react';

export default function GoldPriceNBP() {
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                const res = await fetch('https://api.nbp.pl/api/cenyzlota?format=json');
                const data = await res.json();
                console.log("Cena złota z NBP:", data);
                setPrice(data[0]?.cena);
            } catch (err) {
                console.error('Błąd pobierania ceny złota:', err);
            }
        };

        fetchGoldPrice();
    }, []);

    return (
        <div className="p-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-md font-medium">Cena złota (gram)</h2>
            <p className="text-3xl font-bold">
                {price ? price.toFixed(2) : '...'} PLN
            </p>
        </div>
    );
}

