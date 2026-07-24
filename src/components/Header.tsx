import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User } from 'lucide-react'
import logo from '../assets/logo.png'
import { cn } from '../lib/utils'
import { Button } from './ui'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import NotificationBell from './NotificationBell'

type HeaderProps = {
  compact?: boolean
}

export default function Header({ compact = false }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header
      data-app-header
      className={cn(
        'sticky top-0 z-50 flex items-center justify-between bg-surface transition-[padding] duration-300 ease-out',
        compact ? 'px-7 py-3' : 'p-7',
      )}
    >
      <Link to="/" className="flex min-w-0 items-center gap-3 text-foreground">
        <img
          className={cn(
            'w-auto object-contain transition-[height,width] duration-300 ease-out',
            compact ? 'h-7' : 'h-10',
          )}
          src={logo}
          alt={t('brand.logoAlt')}
        />
        <p
          className={cn(
            'overflow-hidden whitespace-nowrap transition-all duration-300 ease-out',
            compact
              ? 'max-w-0 translate-x-[-4px] opacity-0'
              : 'max-w-[14rem] translate-x-0 opacity-100',
          )}
          aria-hidden={compact}
        >
          {t('brand.name')}
        </p>
      </Link>

      <div
        className={cn(
          'flex items-center transition-[gap] duration-300 ease-out',
          compact ? 'gap-2' : 'gap-4',
        )}
      >
        <LanguageSwitcher compact={compact} />
        <ThemeToggle compact={compact} />
        <NotificationBell compact={compact} />
        <Button
          variant="muted"
          size="icon"
          aria-label={t('common.user')}
          className={cn(
            'transition-all duration-300 ease-out',
            compact ? 'p-2' : 'p-3',
          )}
        >
          <User
            className={cn(
              'shrink-0 transition-all duration-300 ease-out',
              compact ? 'h-5 w-5' : 'h-8 w-8',
            )}
          />
        </Button>
      </div>
    </header>
  )
}
