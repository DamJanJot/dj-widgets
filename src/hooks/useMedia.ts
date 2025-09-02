import { useEffect, useState } from 'react'

export default function useMedia(query: string, defaultState = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return defaultState
    return window.matchMedia(query).matches
  })
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}
