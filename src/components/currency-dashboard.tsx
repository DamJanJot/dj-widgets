import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart, LinearScale, Tooltip, type ChartOptions } from 'chart.js'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)

interface Rate {
  currency: string
  rate: number
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'NOK']

export default function CurrencyDashboard() {
  const [rates, setRates] = useState<Rate[]>([])

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A?format=json')
        const data = await res.json()
        const availableRates = data[0].rates

        const selected = CURRENCIES.map((currency) => {
          const found = availableRates.find((r: any) => r.code === currency)
          return { currency, rate: found ? found.mid : 0 }
        })

        setRates(selected)
      } catch {
        setRates([])
      }
    }

    fetchRates()
  }, [])

  const chartData = useMemo(() => ({
    labels: rates.map((r) => r.currency),
    datasets: [
      {
        label: 'Kurs (PLN)',
        data: rates.map((r) => r.rate),
        backgroundColor: 'rgba(124, 140, 255, 0.72)',
        borderRadius: 6,
      },
    ],
  }), [rates])

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.06)' }, ticks: { color: '#9ca3af' } },
    },
  }

  return (
    <div className="widget currency-widget">
      <div className="section-heading split">
        <h2 className="widget-title">Waluty</h2>
        <span className="muted small">NBP PLN</span>
      </div>

      <div className="currency-grid">
        {rates.map((r) => (
          <div key={r.currency} className="stat compact-stat">
            <div className="label">{r.currency}</div>
            <div className="value">{r.rate.toFixed(2)}</div>
          </div>
        ))}
        {!rates.length && <div className="muted small">Ładowanie kursów...</div>}
      </div>

      <div className="currency-chart-wrap">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
