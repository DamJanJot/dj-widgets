import * as React from 'react'

// Proste „no-op” komponenty zgodne z API Radixa.
// Akceptują wszystkie propsy (w tym: delayDuration, asChild, side, align, hidden).
type AnyProps = { children?: React.ReactNode } & Record<string, any>

export function TooltipProvider({ children }: AnyProps) {
  return <>{children}</>
}
export function Tooltip({ children }: AnyProps) {
  return <>{children}</>
}
export function TooltipTrigger({ children }: AnyProps) {
  return <>{children}</>
}
export function TooltipContent({ children }: AnyProps) {
  return <>{children}</>
}
