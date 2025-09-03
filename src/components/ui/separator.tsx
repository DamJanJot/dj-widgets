import { cn } from '@/lib/utils'

export function Separator({ className = '' }) {
  return <div role="separator" className={cn('h-px w-full bg-white/10', className)} />
}
