import { useEffect, useState } from 'react';

export default function SunClockWidget() {
    const [time, setTime] = useState(new Date());
    const [sunrise, setSunrise] = useState<string | null>(null);
    const [sunset, setSunset] = useState<string | null>(null);

    useEffect(() => {
        const fetchSunData = async () => {
            try {
                const res = await fetch('https://api.sunrise-sunset.org/json?lat=52.2298&lng=21.0118&formatted=0');
                const data = await res.json();

                setSunrise(new Date(data.results.sunrise).toLocaleTimeString('pl-PL'));
                setSunset(new Date(data.results.sunset).toLocaleTimeString('pl-PL'));
            } catch (err) {
                console.error(err);
            }
        };

        fetchSunData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center">
            {/* <h2 className="text-lg font-semibold">Aktualny czas</h2> */}
            <h2 className="text-2xl mt-2">{time.toLocaleTimeString()}</h2>
            <p className="text-center text-sm text-neutral-400 mb-2">{time.toLocaleDateString()}</p>

            {sunrise && sunset ? (
                <div className="text-center text-sm text-neutral-400">
                    <p className="small">Wschód {sunrise}</p>
                    <p className="small">Zachód {sunset}</p>
                </div>
            ) : (
                <p className="text-sm text-neutral-400">Ładowanie danych słonecznych...</p>
            )}
        </div>
    );
}
