import { useCallback, useEffect, useMemo, useState } from 'react'

export type SidebarItemId =
  | 'dashboard'
  | 'news'
  | 'markets'
  | 'docs'
  | 'operations'
  | 'notes'
  | 'repo'
  | 'info'

export type SidebarItemConfig = {
  id: SidebarItemId
  label: string
  path: string
  required?: boolean
}

export type SidebarSettings = {
  order: SidebarItemId[]
  hidden: SidebarItemId[]
}

export const sidebarItems: SidebarItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'news', label: 'Aktualności', path: '/news' },
  { id: 'markets', label: 'Rynki', path: '/markets' },
  { id: 'docs', label: 'Documentation', path: '/docs' },
  { id: 'operations', label: 'Centrum', path: '/operations' },
  { id: 'notes', label: 'Notatki i zadania', path: '/notes' },
  { id: 'repo', label: 'Repository', path: '/repo' },
  { id: 'info', label: 'Info', path: '/info' },
]

const STORAGE_KEY = 'orbitum.sidebarSettings'
const EVENT_NAME = 'orbitum-sidebar-settings'
const defaultOrder = sidebarItems.map((item) => item.id)

function normalizeSettings(value?: Partial<SidebarSettings> | null): SidebarSettings {
  const incomingOrder = value?.order ?? []
  const order = [
    ...incomingOrder.filter((id): id is SidebarItemId => defaultOrder.includes(id as SidebarItemId)),
    ...defaultOrder.filter((id) => !incomingOrder.includes(id)),
  ]

  const hidden = (value?.hidden ?? []).filter((id): id is SidebarItemId => {
    const item = sidebarItems.find((entry) => entry.id === id)
    return !!item && !item.required
  })

  return { order, hidden }
}

function readSettings(): SidebarSettings {
  if (typeof window === 'undefined') return normalizeSettings()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return normalizeSettings(raw ? JSON.parse(raw) : null)
  } catch {
    return normalizeSettings()
  }
}

function writeSettings(settings: SidebarSettings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: settings }))
}

export function useSidebarConfig() {
  const [settings, setSettings] = useState<SidebarSettings>(() => readSettings())

  useEffect(() => {
    const sync = () => setSettings(readSettings())
    const syncCustom = (event: Event) => {
      const detail = (event as CustomEvent<SidebarSettings>).detail
      setSettings(normalizeSettings(detail))
    }

    window.addEventListener('storage', sync)
    window.addEventListener(EVENT_NAME, syncCustom)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(EVENT_NAME, syncCustom)
    }
  }, [])

  const items = useMemo(() => {
    const byId = new Map(sidebarItems.map((item) => [item.id, item]))
    return settings.order
      .map((id) => byId.get(id))
      .filter((item): item is SidebarItemConfig => !!item)
  }, [settings.order])

  const visibleItems = useMemo(
    () => items.filter((item) => item.required || !settings.hidden.includes(item.id)),
    [items, settings.hidden]
  )

  const updateSettings = useCallback((next: SidebarSettings) => {
    const normalized = normalizeSettings(next)
    setSettings(normalized)
    writeSettings(normalized)
  }, [])

  const toggleItem = useCallback((id: SidebarItemId) => {
    const item = sidebarItems.find((entry) => entry.id === id)
    if (item?.required) return
    const hidden = settings.hidden.includes(id)
      ? settings.hidden.filter((entry) => entry !== id)
      : [...settings.hidden, id]
    updateSettings({ ...settings, hidden })
  }, [settings, updateSettings])

  const moveItem = useCallback((fromId: SidebarItemId, toId: SidebarItemId) => {
    if (fromId === toId) return
    const fromIndex = settings.order.indexOf(fromId)
    const toIndex = settings.order.indexOf(toId)
    if (fromIndex < 0 || toIndex < 0) return
    const order = [...settings.order]
    const [moved] = order.splice(fromIndex, 1)
    order.splice(toIndex, 0, moved)
    updateSettings({ ...settings, order })
  }, [settings, updateSettings])

  const resetSidebar = useCallback(() => updateSettings(normalizeSettings()), [updateSettings])

  return { settings, items, visibleItems, toggleItem, moveItem, resetSidebar } as const
}
