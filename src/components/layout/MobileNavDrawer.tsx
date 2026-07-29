import { useEffect, useId, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { navItems } from '../../config/navigation'
import { cn } from '../../lib/utils'
import { Button, Icon } from '../ui'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const { t } = useTranslation()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-110 md:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={cn(
          'absolute inset-0 bg-foreground/40 transition-opacity duration-300 ease-out',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-label={t('common.close')}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-labelledby={titleId}
        tabIndex={-1}
        inert={open ? undefined : true}
        className={cn(
          'relative z-10 flex h-full w-full max-w-80 flex-col border-r border-border bg-surface shadow-card outline-none transition-transform duration-300 ease-out will-change-transform',
          'pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pb-[env(safe-area-inset-bottom)]',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            {t('brand.header')}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="p-2"
            onClick={onClose}
            aria-label={t('common.close')}
            tabIndex={open ? 0 : -1}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
          aria-label={t('common.mainNav')}
        >
          {navItems.map(({ to, labelKey, icon }) => {
            const label = t(labelKey)

            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  cn(
                    'flex cursor-pointer items-center gap-3 rounded-control px-3 py-3 text-base whitespace-nowrap transition-colors',
                    isActive
                      ? 'bg-foreground/10 font-bold text-foreground'
                      : 'font-medium text-foreground-muted hover:bg-foreground/5 hover:text-foreground',
                  )
                }
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center">
                  <Icon icon={icon} size="md" aria-hidden />
                </span>
                <span>{label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="space-y-1 border-t border-border p-3">
          <div className="flex items-center justify-between gap-3 rounded-control px-3 py-2">
            <p className="text-sm font-medium text-foreground-muted">{t('language.label')}</p>
            <LanguageSwitcher compact />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-control px-3 py-2">
            <p className="text-sm font-medium text-foreground-muted">{t('theme.label')}</p>
            <ThemeToggle compact />
          </div>
        </div>
      </div>
    </div>
  )
}
