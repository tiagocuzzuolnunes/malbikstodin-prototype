import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './Button'

export type ModalProps = {
  open: boolean
  title: ReactNode
  onClose: () => void
  children: ReactNode
  /** Renders below the scrollable body and stays pinned. */
  footer?: ReactNode
  className?: string
  /** Prefer visible when nested dropdowns need to escape the dialog. */
  contentOverflow?: 'auto' | 'visible'
}

export function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  className,
  contentOverflow = 'auto',
}: ModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-100 flex items-center justify-center p-4',
        'top-(--app-header-height,4.5rem)',
      )}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          // Cap to overlay height (viewport − header − p-4) so tall lists keep vertical padding.
          'relative z-10 flex max-h-[min(44rem,calc(100dvh-var(--app-header-height,4.5rem)-2rem))] w-full max-w-lg flex-col rounded-card border border-border bg-surface p-6 shadow-card outline-none md:p-8',
          contentOverflow === 'visible' ? 'overflow-visible' : 'overflow-hidden',
          className,
        )}
      >
        <div className="mb-6 flex shrink-0 items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="p-2"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div
          className={cn(
            'min-h-0 flex-1',
            contentOverflow === 'visible' ? 'overflow-visible' : 'overflow-y-auto',
          )}
        >
          {children}
        </div>
        {footer ? (
          <div className="mt-5 shrink-0 border-t border-border pt-4">{footer}</div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
