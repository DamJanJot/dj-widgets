import { useCallback, useEffect, useRef, useState } from 'react'
import { Bell, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import UserMenuContent from './user-menu-content'
import CommandPalette from './CommandPalette'

const MQ_MOBILE = '(max-width: 900px)'

const TITLE: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/news': 'Aktualności',
  '/markets': 'Rynki',
  '/day-plan': 'Plan dnia',
  '/projects': 'Projekty',
  '/docs': 'Documentation',
  '/profile': 'Profil',
  '/profile/edit': 'Edytuj profil',
  '/settings': 'Ustawienia',
  '/repo': 'Repository',
  '/operations': 'Centrum',
  '/notes': 'Notatki i zadania',
}

export default function Topbar() {
  const loc = useLocation()
  const title = TITLE[loc.pathname] ?? 'Orbitum'
  const user = { name: 'Damian', email: 'damian@example.com' }
  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const [isMobile, setIsMobile] = useState(window.matchMedia(MQ_MOBILE).matches)
  const [collapsed, setCollapsed] = useState(document.body.classList.contains('sidebar-collapsed'))
  const [mobileOpen, setMobileOpen] = useState(!!document.getElementById('sidebar')?.classList.contains('open'))
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [scrolled, setScrolled] = useState(window.scrollY > 8)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const closeSidebar = useCallback(() => {
    document.getElementById('sidebar')?.classList.remove('open')
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(MQ_MOBILE)
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const syncClosed = () => closeSidebar()
    window.addEventListener('orbitum-sidebar-close', syncClosed)
    return () => window.removeEventListener('orbitum-sidebar-close', syncClosed)
  }, [closeSidebar])

  useEffect(() => {
    const onDoc = (event: MouseEvent) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
        setNotifOpen(false)
      }
    }

    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (!isMobile || !mobileOpen) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      if (target.closest('#sidebar') || target.closest('[data-sidebar-toggle="true"]')) return
      closeSidebar()
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [closeSidebar, isMobile, mobileOpen])

  useEffect(() => {
    if (isMobile) closeSidebar()
  }, [closeSidebar, loc.pathname, isMobile])

  const toggleSidebar = () => {
    const el = document.getElementById('sidebar')
    if (!el) return
    if (isMobile) {
      el.classList.toggle('open')
      setMobileOpen(el.classList.contains('open'))
    } else {
      document.body.classList.toggle('sidebar-collapsed')
      setCollapsed(document.body.classList.contains('sidebar-collapsed'))
    }
  }

  const ArrowIcon = isMobile
    ? mobileOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
    : collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />

  const arrowStyle = (isMobile && mobileOpen)
    ? { position: 'fixed' as const, left: 'calc(var(--sidebar-w) + 8px)', top: 10, zIndex: 1201 }
    : undefined

  const headerStyle = (isMobile && mobileOpen)
    ? { paddingLeft: 'calc(var(--sidebar-w))' }
    : undefined

  return (
    <>
      {isMobile && mobileOpen && <div className="scrim show" onClick={closeSidebar} />}

      <header className={`topbar grid3 ${scrolled ? 'is-scrolled' : ''}`} style={headerStyle}>
        <div className="tb-left">
          <button
            className="btn-icon"
            data-sidebar-toggle="true"
            aria-label="Przełącz nawigację"
            onClick={toggleSidebar}
            title="Pokaż/ukryj nawigację"
            style={arrowStyle}
          >
            {ArrowIcon}
          </button>
        </div>

        <div className="tb-center">{title}</div>

        <div className="tb-right" ref={wrapRef}>
          <button
            className="btn-icon topbar-search"
            aria-label="Szybka nawigacja"
            title="Szybka nawigacja"
            onClick={() => { setCommandOpen(true); setMenuOpen(false); setNotifOpen(false) }}
          >
            <Search size={18} />
          </button>

          <button className="btn-icon" aria-label="Powiadomienia" onClick={() => { setNotifOpen((value) => !value); setMenuOpen(false) }}>
            <Bell size={18} />
          </button>

          {notifOpen && (
            <div className="dropdown" style={{ right: 56 }}>
              <div className="dropdown-menu">
                <div className="dropdown-header"><strong>Powiadomienia</strong></div>
                <div className="dropdown-sep" />
                <div className="muted small" style={{ padding: '8px 12px' }}>Brak nowych powiadomień</div>
              </div>
            </div>
          )}

          <div className="avatar-wrap">
            <button className="avatar" aria-label="Profil użytkownika" onClick={() => { setMenuOpen((value) => !value); setNotifOpen(false) }}>
              <span className="avatar-initials" aria-hidden="true">{initials}</span>
            </button>
            {menuOpen && (
              <div className="dropdown">
                <UserMenuContent
                  user={user}
                  onLogout={() => setMenuOpen(false)}
                  onClose={() => setMenuOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
      </header>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
}
