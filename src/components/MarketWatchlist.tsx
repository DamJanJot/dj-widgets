import { FormEvent, useEffect, useMemo, useState } from 'react'
import { BellRing, Plus, Star, Trash2 } from 'lucide-react'

type WatchItem = {
  id: string
  symbol: string
  label: string
  target: string
  note: string
  priority: 'normal' | 'high'
}

const storageKey = 'orbitum.marketWatchlist'

const defaultItems: WatchItem[] = [
  { id: 'gold', symbol: 'XAU', label: 'Złoto', target: '430 PLN/g', note: 'Sprawdzać trend po publikacji NBP', priority: 'high' },
  { id: 'eur', symbol: 'EUR', label: 'Euro', target: '4.35 PLN', note: 'Alert przy mocnym ruchu dziennym', priority: 'normal' },
  { id: 'btc', symbol: 'BTC', label: 'Bitcoin', target: '120k USD', note: 'Obserwować zmienność po weekendzie', priority: 'normal' },
]

function readItems() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
    return Array.isArray(parsed) && parsed.length ? parsed as WatchItem[] : defaultItems
  } catch {
    return defaultItems
  }
}

export default function MarketWatchlist() {
  const [items, setItems] = useState<WatchItem[]>(defaultItems)
  const [symbol, setSymbol] = useState('')
  const [label, setLabel] = useState('')
  const [target, setTarget] = useState('')
  const [note, setNote] = useState('')
  const [priority, setPriority] = useState<WatchItem['priority']>('normal')

  useEffect(() => {
    setItems(readItems())
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items])

  const highPriorityCount = useMemo(() => items.filter((item) => item.priority === 'high').length, [items])

  const addItem = (event: FormEvent) => {
    event.preventDefault()
    const nextSymbol = symbol.trim().toUpperCase()
    const nextLabel = label.trim()
    if (!nextSymbol || !nextLabel) return

    setItems((current) => [
      {
        id: crypto.randomUUID(),
        symbol: nextSymbol,
        label: nextLabel,
        target: target.trim() || 'Bez progu',
        note: note.trim() || 'Brak notatki',
        priority,
      },
      ...current,
    ].slice(0, 8))

    setSymbol('')
    setLabel('')
    setTarget('')
    setNote('')
    setPriority('normal')
  }

  return (
    <div className="widget market-watchlist">
      <div className="section-heading split">
        <div>
          <h2 className="widget-title">Obserwowane</h2>
          <p className="muted small">{items.length} pozycji, {highPriorityCount} priorytet</p>
        </div>
        <BellRing size={22} />
      </div>

      <form className="watchlist-form" onSubmit={addItem}>
        <input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder="Symbol" aria-label="Symbol" />
        <input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Nazwa" aria-label="Nazwa" />
        <input value={target} onChange={(event) => setTarget(event.target.value)} placeholder="Próg / cel" aria-label="Próg lub cel" />
        <select value={priority} onChange={(event) => setPriority(event.target.value as WatchItem['priority'])} aria-label="Priorytet">
          <option value="normal">Normalny</option>
          <option value="high">Wysoki</option>
        </select>
        <input className="watchlist-note-input" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Notatka" aria-label="Notatka" />
        <button className="button-like primary icon-only" type="submit" aria-label="Dodaj obserwowane">
          <Plus size={17} />
        </button>
      </form>

      <div className="watchlist-items">
        {items.map((item) => (
          <div className={item.priority === 'high' ? 'watchlist-item high' : 'watchlist-item'} key={item.id}>
            <span className="watchlist-symbol">{item.symbol}</span>
            <div>
              <div className="watchlist-title-row">
                <strong>{item.label}</strong>
                {item.priority === 'high' && <span><Star size={13} /> Priorytet</span>}
              </div>
              <p>{item.note}</p>
            </div>
            <div className="watchlist-target">
              <span>Cel</span>
              <strong>{item.target}</strong>
            </div>
            <button className="btn-icon" type="button" aria-label={`Usuń ${item.label}`} onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
