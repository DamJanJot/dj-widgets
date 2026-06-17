import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { rememberView } from '@/lib/navigation'

export default function RouteMemory() {
  const location = useLocation()

  useEffect(() => {
    rememberView(location.pathname)
  }, [location.pathname])

  return null
}
