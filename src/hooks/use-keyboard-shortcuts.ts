import { useCallback, useEffect, useMemo, useState } from 'react'
import { appCommands } from '@/lib/navigation'

export type ShortcutConfig = {
  path: string
  keys: string
}

const STORAGE_KEY = 'orbitum.keyboardShortcuts'
const EVENT_NAME = 'orbitum-keyboard-shortcuts'
const shortcutCommands = appCommands.filter((command, index, all) => (
  all.findIndex((item) => item.path === command.path) === index
))

export const defaultShortcuts: ShortcutConfig[] = [
  { path: '/dashboard', keys: 'Ctrl+1' },
  { path: '/news', keys: 'Ctrl+2' },
  { path: '/markets', keys: 'Ctrl+3' },
  { path: '/day-plan', keys: 'Ctrl+4' },
  { path: '/projects', keys: 'Ctrl+5' },
  { path: '/apps', keys: 'Ctrl+6' },
  { path: '/paint', keys: 'Ctrl+7' },
  { path: '/notes', keys: 'Ctrl+8' },
  { path: '/settings', keys: 'Ctrl+,' },
]

const validPaths = new Set(appCommands.map((command) => command.path))

function normalizeShortcuts(value?: ShortcutConfig[] | null) {
  const stored = Array.isArray(value) ? value : []
  const byPath = new Map<string, string>()

  for (const shortcut of [...defaultShortcuts, ...stored]) {
    if (validPaths.has(shortcut.path) && shortcut.keys) {
      byPath.set(shortcut.path, shortcut.keys)
    }
  }

  return shortcutCommands
    .filter((command) => byPath.has(command.path))
    .map((command) => ({ path: command.path, keys: byPath.get(command.path) || '' }))
}

function readShortcuts() {
  if (typeof window === 'undefined') return normalizeShortcuts()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return normalizeShortcuts(raw ? JSON.parse(raw) : null)
  } catch {
    return normalizeShortcuts()
  }
}

function writeShortcuts(shortcuts: ShortcutConfig[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts))
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: shortcuts }))
}

export function shortcutFromEvent(event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey'>) {
  const key = event.key === ' ' ? 'Space' : event.key.length === 1 ? event.key.toUpperCase() : event.key
  if (['Control', 'Alt', 'Shift', 'Meta'].includes(key)) return ''

  const parts = [
    event.ctrlKey ? 'Ctrl' : '',
    event.altKey ? 'Alt' : '',
    event.shiftKey ? 'Shift' : '',
    event.metaKey ? 'Meta' : '',
    key,
  ].filter(Boolean)

  return parts.length > 1 ? parts.join('+') : ''
}

export function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return target.isContentEditable || tag === 'input' || tag === 'textarea' || tag === 'select'
}

export function useShortcutConfig() {
  const [shortcuts, setShortcuts] = useState<ShortcutConfig[]>(() => readShortcuts())

  useEffect(() => {
    const sync = () => setShortcuts(readShortcuts())
    const syncCustom = (event: Event) => {
      const detail = (event as CustomEvent<ShortcutConfig[]>).detail
      setShortcuts(normalizeShortcuts(detail))
    }

    window.addEventListener('storage', sync)
    window.addEventListener(EVENT_NAME, syncCustom)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(EVENT_NAME, syncCustom)
    }
  }, [])

  const updateShortcuts = useCallback((next: ShortcutConfig[]) => {
    const normalized = normalizeShortcuts(next)
    setShortcuts(normalized)
    writeShortcuts(normalized)
  }, [])

  const setShortcut = useCallback((path: string, keys: string) => {
    updateShortcuts(shortcuts.map((shortcut) => (
      shortcut.path === path ? { ...shortcut, keys } : shortcut
    )))
  }, [shortcuts, updateShortcuts])

  const resetShortcuts = useCallback(() => updateShortcuts(defaultShortcuts), [updateShortcuts])

  const commandShortcuts = useMemo(() => shortcutCommands
    .map((command) => ({
      command,
      shortcut: shortcuts.find((item) => item.path === command.path)?.keys || '',
    }))
    .filter((item) => item.shortcut), [shortcuts])

  return { shortcuts, commandShortcuts, setShortcut, resetShortcuts } as const
}
