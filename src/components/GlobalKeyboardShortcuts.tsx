import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEditableTarget, shortcutFromEvent, useShortcutConfig } from '@/hooks/use-keyboard-shortcuts'
import { rememberView } from '@/lib/navigation'

export default function GlobalKeyboardShortcuts() {
  const navigate = useNavigate()
  const { commandShortcuts } = useShortcutConfig()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || isEditableTarget(event.target)) return

      const pressed = shortcutFromEvent(event)
      if (!pressed) return

      const match = commandShortcuts.find((item) => item.shortcut === pressed)
      if (!match) return

      event.preventDefault()
      rememberView(match.command.path)
      navigate(match.command.path)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [commandShortcuts, navigate])

  return null
}
