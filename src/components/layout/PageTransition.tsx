import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'

type PageTransitionProps = {
  children: ReactNode
  className?: string
}

/**
 * Remounts on pathname change to play a short enter animation.
 * Works for both forward links and browser back/forward.
 */
export default function PageTransition({ children, className }: PageTransitionProps) {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className={cn('page-enter', className)}>
      {children}
    </div>
  )
}
