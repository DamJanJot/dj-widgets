import { cn } from '@/lib/utils'
export function Skeleton({ className = '' }) {
  return <div className={cn('animate-pulse rounded-md bg-white/10', className)} />
}
