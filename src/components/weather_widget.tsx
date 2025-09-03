import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherWidgetProps {
  city: string;
  apiKey: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, apiKey }) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [clouds, setClouds] = useState<number | null>(null);
  const [icon, setIcon] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => {
        console.log('Dane z API:', res.data);  // Dodane logowanie do sprawdzenia co przychodzi

        setTemperature(Math.round(res.data.main.temp));
        setClouds(res.data.clouds?.all ?? 0); // Jeśli clouds.all nie istnieje, da 0
        setIcon(res.data.weather?.[0]?.icon);
      })
      .catch(err => console.error('Błąd pobierania pogody:', err));
  }, [city, apiKey]);

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-4 w-48 flex flex-col items-center shadow-xl">
      <h2 className="text-lg font-medium mb-4">{city}</h2>
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-3xl">{temperature !== null ? `${temperature}` : '--'}&#176;C</span>
        <div className="flex items-center ml-2">
          <span>&#9729; {clouds !== null ? `${clouds}%` : '--'}</span>
        </div>
      </div>

      {/* <div className="mt-4">
        {icon ? (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
            className="h-10 w-10"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 000 20 10 10 0 000-20zM9 12a3 3 0 116 0 3 3 0 01-6 0z" />
          </svg>
        )}
      </div> */}
    </div>
  );
};

export default WeatherWidget;
