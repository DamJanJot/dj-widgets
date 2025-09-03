import * as React from 'react'
import { cn } from '@/lib/utils'

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement>

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('h-px w-full bg-white/10', className)}
      {...props}
    />
  )
}
