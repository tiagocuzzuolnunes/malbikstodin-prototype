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
        'relative z-110 flex shrink-0 items-center justify-between gap-3 bg-surface transition-[padding] duration-300 ease-out',
        'pt-[max(1rem,env(safe-area-inset-top))]',
        'pl-[max(1rem,env(safe-area-inset-left))]',
        'pr-[max(1rem,env(safe-area-inset-right))]',
        compact ? 'pb-2.5 md:px-7 md:py-3' : 'pb-4 md:p-7',
      )}
    >
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        {onOpenMobileNav ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 p-2 md:hidden"
            aria-label={t('sidebar.openMenu')}
            onClick={onOpenMobileNav}
          >
            <Menu className="h-6 w-6" />
          </Button>
        ) : null}

        <Link to="/" className="flex min-w-0 items-center gap-2 text-foreground md:gap-3">
          <img
            className={cn(
              'w-auto object-contain transition-[height,width] duration-300 ease-out',
              compact ? 'h-7' : 'h-8 md:h-10',
            )}
            src={logo}
            alt={t('brand.logoAlt')}
          />
          <p
            className={cn(
              'hidden font-black overflow-hidden whitespace-nowrap transition-all duration-300 ease-out sm:block',
              compact
                ? 'max-w-0 -translate-x-1 opacity-0'
                : 'max-w-56 translate-x-0 opacity-100',
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
          compact ? 'gap-1.5 md:gap-2' : 'gap-2 md:gap-4',
        )}
      >
        <SettingsMenu compact={compact} />
        <NotificationBell compact={compact} />
        <UserMenu compact={compact} />
      </div>
    </header>
  )
}
