import * as React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  className?: string
  children: React.ReactNode
  title?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler
}

export default function TextLink({ href, className, children, ...rest }: Props) {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  const classes = cn('text-sky-400 hover:underline', className)

  if (isInternal) {
    return (
      <Link to={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )
}
