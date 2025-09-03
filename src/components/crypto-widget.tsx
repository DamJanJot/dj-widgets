import { useEffect, useState } from 'react';

type Coin = { id: string; symbol: string; name: string; current_price: number };

const COIN_EMOJI: Record<string,string> = { BTC:'🟠', ETH:'🟣', SOL:'🟩', USDT:'🟡' };

export default function CryptoWidget() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana'
        );
        const data = await res.json();
        setCoins(data as Coin[]);
      } catch { setCoins([]); }
    };
    run();
  }, []);

  return (
    <div className="widget text-center">
      <h3 style={{marginTop:0}}>Crypto</h3>
      <ul className="list">
        {coins.map(c => (
          <li key={c.id} className="row-between">
            <span><span className="coin">{COIN_EMOJI[c.symbol.toUpperCase()] ?? '⛓️'}</span> {c.name}</span>
            <b>{c.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</b>
          </li>
        ))}
        {!coins.length && <li className="small muted">Brak danych.</li>}
      </ul>
    </div>
  );
}
