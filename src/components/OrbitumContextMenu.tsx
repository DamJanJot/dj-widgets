import { useEffect, useState } from 'react'
import { ClipboardList, MousePointer2, Pin, Search, Settings } from 'lucide-react'

type MenuState = {
  open: boolean
  x: number
  y: number
}

const actions = [
  { label: 'Szybka nawigacja', hint: 'Paleta komend', icon: Search },
  { label: 'Dodaj do planu', hint: 'Wkrótce', icon: ClipboardList },
  { label: 'Przypnij widok', hint: 'Wkrótce', icon: Pin },
  { label: 'Opcje panelu', hint: 'Wkrótce', icon: Settings },
]

export default function OrbitumContextMenu() {
  const [menu, setMenu] = useState<MenuState>({ open: false, x: 0, y: 0 })

  useEffect(() => {
    const close = () => setMenu((current) => ({ ...current, open: false }))

    const onContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return

      event.preventDefault()
      const menuWidth = 260
      const menuHeight = 250
      setMenu({
        open: true,
        x: Math.min(event.clientX, window.innerWidth - menuWidth - 12),
        y: Math.min(event.clientY, window.innerHeight - menuHeight - 12),
      })
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('contextmenu', onContextMenu)
    window.addEventListener('click', close)
    window.addEventListener('scroll', close, true)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('contextmenu', onContextMenu)
      window.removeEventListener('click', close)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  if (!menu.open) return null

  return (
    <div className="orbitum-context-menu" style={{ left: menu.x, top: menu.y }} role="menu" aria-label="Menu kontekstowe Orbitum">
      <div className="context-menu-header">
        <MousePointer2 size={16} />
        <div>
          <strong>Menu Orbitum</strong>
          <span>Akcje kontekstowe</span>
        </div>
      </div>

      <div className="context-menu-actions">
        {actions.map((action) => (
          <button type="button" key={action.label} role="menuitem" onClick={(event) => event.stopPropagation()}>
            <action.icon size={16} />
            <span>{action.label}</span>
            <small>{action.hint}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
