import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import logo from '../../assets/logo.png'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import NotificationBell from './NotificationBell'
import SettingsMenu from './SettingsMenu'
import UserMenu from './UserMenu'

type HeaderProps = {
  compact?: boolean
  onOpenMobileNav?: () => void
}

export default function Header({ compact = false, onOpenMobileNav }: HeaderProps) {
  const { t } = useTranslation()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--app-header-height',
        `${header.getBoundingClientRect().height}px`,
      )
    }

    syncHeaderHeight()

    const observer = new ResizeObserver(syncHeaderHeight)
    observer.observe(header)
    window.addEventListener('resize', syncHeaderHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncHeaderHeight)
    }
  }, [compact])

  return (
    <header
      ref={headerRef}
      data-app-header
      className={cn(
        'relative z-110 flex shrink-0 items-center justify-between bg-surface transition-[padding,gap] duration-300 ease-out',
        'gap-[calc(0.625rem*var(--shell-scale))]',
        'pt-[max(calc(0.75rem*var(--shell-scale)),env(safe-area-inset-top))]',
        'pl-[max(calc(0.75rem*var(--shell-scale)),env(safe-area-inset-left))]',
        'pr-[max(calc(0.75rem*var(--shell-scale)),env(safe-area-inset-right))]',
        compact
          ? 'pb-[calc(0.625rem*var(--shell-scale))] md:px-[calc(1.75rem*var(--shell-scale))] md:py-[calc(0.75rem*var(--shell-scale))]'
          : 'pb-[calc(0.75rem*var(--shell-scale))] md:px-[calc(1.25rem*var(--shell-scale))] md:py-[calc(1rem*var(--shell-scale))]',
      )}
    >
      <div
        className={cn(
          'flex min-w-0 items-center',
          'gap-[calc(0.5rem*var(--shell-scale))] md:gap-[calc(0.625rem*var(--shell-scale))]',
        )}
      >
        {onOpenMobileNav ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 p-[calc(0.5rem*var(--shell-scale))] md:hidden"
            aria-label={t('sidebar.openMenu')}
            onClick={onOpenMobileNav}
          >
            <Menu className="h-[calc(1.375rem*var(--shell-scale))] w-[calc(1.375rem*var(--shell-scale))]" />
          </Button>
        ) : null}

        <Link
          to="/"
          className={cn(
            'flex min-w-0 items-center text-foreground',
            'gap-[calc(0.5rem*var(--shell-scale))] md:gap-[calc(0.625rem*var(--shell-scale))]',
          )}
        >
          <img
            className={cn(
              'w-auto object-contain transition-[height,width] duration-300 ease-out',
              compact
                ? 'h-[calc(1.75rem*var(--shell-scale))]'
                : 'h-[calc(1.875rem*var(--shell-scale))] md:h-[calc(2.125rem*var(--shell-scale))]',
            )}
            src={logo}
            alt={t('brand.logoAlt')}
          />
          <p
            className={cn(
              'hidden font-black overflow-hidden whitespace-nowrap transition-all duration-300 ease-out sm:block',
              compact
                ? 'max-w-0 -translate-x-1 text-[length:calc(0.875rem*var(--shell-scale))] opacity-0'
                : 'max-w-[calc(12rem*var(--shell-scale))] translate-x-0 text-[length:calc(0.875rem*var(--shell-scale))] opacity-100',
            )}
            aria-hidden={compact}
          >
            {t('brand.header')}
          </p>
        </Link>
      </div>

      <div
        className={cn(
          'flex shrink-0 items-center transition-[gap] duration-300 ease-out',
          compact
            ? 'gap-[calc(0.375rem*var(--shell-scale))] md:gap-[calc(0.5rem*var(--shell-scale))]'
            : 'gap-[calc(0.5rem*var(--shell-scale))] md:gap-[calc(0.75rem*var(--shell-scale))]',
        )}
      >
        <SettingsMenu compact={compact} />
        <NotificationBell compact={compact} />
        <UserMenu compact={compact} />
      </div>
    </header>
  )
}
