import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-9 w-full rounded-md bg-white/5 text-white px-3 outline-none',
        'border border-white/10 focus:border-white/20',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
export { Input }
