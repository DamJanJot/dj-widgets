import { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip, type ChartOptions } from 'chart.js'

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip)

type RangeKey = '7d' | '1m' | '3m' | '6m'

interface GoldDay {
  date: string
  fullDate: string
  price: number
}

const RANGES: Array<{ key: RangeKey; label: string; days: number }> = [
  { key: '7d', label: 'Tydzień', days: 7 },
  { key: '1m', label: 'Miesiąc', days: 31 },
  { key: '3m', label: '3 mies.', days: 90 },
  { key: '6m', label: '6 mies.', days: 180 },
]

export default function GoldHistoryWidget() {
  const [history, setHistory] = useState<GoldDay[]>([])
  const [range, setRange] = useState<RangeKey>('3m')

  const selectedRange = RANGES.find((item) => item.key === range) ?? RANGES[2]

  useEffect(() => {
    const fetchGoldHistory = async () => {
      try {
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(endDate.getDate() - selectedRange.days)

        const formatDate = (d: Date) =>
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

        const url = `https://api.nbp.pl/api/cenyzlota/${formatDate(startDate)}/${formatDate(endDate)}?format=json`
        const res = await fetch(url)
        const data = await res.json()

        const prepared = data.map((entry: any) => ({
          date: new Date(entry.data).toLocaleDateString('pl-PL', { month: 'short', day: 'numeric' }),
          fullDate: entry.data,
          price: entry.cena,
        }))

        setHistory(prepared)
      } catch {
        setHistory([])
      }
    }

    fetchGoldHistory()
  }, [selectedRange.days])

  const latestPrice = history[history.length - 1]?.price
  const firstPrice = history[0]?.price
  const change = latestPrice && firstPrice ? latestPrice - firstPrice : 0
  const changePercent = latestPrice && firstPrice ? (change / firstPrice) * 100 : 0

  const chartData = useMemo(() => ({
    labels: history.map((d) => d.date),
    datasets: [
      {
        label: 'Cena złota (gram, PLN)',
        data: history.map((d) => d.price),
        fill: false,
        borderColor: '#7c8cff',
        backgroundColor: '#7c8cff',
        tension: 0.35,
        pointRadius: history.length > 45 ? 0 : 2,
      },
    ],
  }), [history])

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', maxTicksLimit: 7 },
      },
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(255,255,255,.06)' },
        ticks: { color: '#9ca3af' },
      },
    },
  }

  return (
    <div className="widget gold-widget">
      <div className="section-heading split">
        <div>
          <h2 className="widget-title">Cena złota</h2>
          <p className="muted small">NBP, gram złota w PLN</p>
        </div>
        <div className="segmented-control" aria-label="Zakres wykresu złota">
          {RANGES.map((item) => (
            <button
              key={item.key}
              type="button"
              className={item.key === range ? 'active' : ''}
              onClick={() => setRange(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="gold-chart-wrap">
        <Line data={chartData} options={options} />
      </div>

      <div className="gold-stats">
        <div className="stat">
          <div className="label">Aktualna cena</div>
          <div className="value">{latestPrice ? `${latestPrice.toFixed(2)} PLN` : '--'}</div>
        </div>
        <div className="stat">
          <div className="label">Zmiana w zakresie</div>
          <div className={`value ${change >= 0 ? 'up' : 'down'}`}>
            {latestPrice ? `${change >= 0 ? '+' : ''}${change.toFixed(2)} PLN (${changePercent.toFixed(2)}%)` : '--'}
          </div>
        </div>
      </div>
    </div>
  )
}
