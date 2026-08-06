import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { navItems } from '../../config/navigation'
import { cn } from '../../lib/utils'

const contactItems = [
  {
    key: 'address' as const,
    icon: MapPin,
    href: null,
  },
  {
    key: 'phone' as const,
    icon: Phone,
    href: (value: string) => `tel:${value.replace(/\s+/g, '')}`,
  },
  {
    key: 'email' as const,
    icon: Mail,
    href: (value: string) => `mailto:${value}`,
  },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className={cn(
        'border-t border-border bg-surface',
        /* Bleed flush to main edges (must match RootLayout main padding, not shell-scale) */
        'mt-[calc(1.5rem*var(--shell-scale))]',
        '-ml-[max(1rem,env(safe-area-inset-left))]',
        '-mr-[max(1rem,env(safe-area-inset-right))]',
        'pt-[calc(1rem*var(--shell-scale))]',
        'pb-[max(calc(1rem*var(--shell-scale)),env(safe-area-inset-bottom))]',
        'pl-[max(1rem,env(safe-area-inset-left))]',
        'pr-[max(1rem,env(safe-area-inset-right))]',
        'sm:-ml-[max(1.25rem,env(safe-area-inset-left))]',
        'sm:-mr-[max(1.25rem,env(safe-area-inset-right))]',
        'sm:pl-[max(1.25rem,env(safe-area-inset-left))]',
        'sm:pr-[max(1.25rem,env(safe-area-inset-right))]',
        'md:mt-[calc(2rem*var(--shell-scale))]',
        'md:pt-[calc(1.25rem*var(--shell-scale))]',
        'md:pb-[calc(1.25rem*var(--shell-scale))]',
        'md:-ml-[max(1.5rem,env(safe-area-inset-left))]',
        'md:-mr-[max(1.5rem,env(safe-area-inset-right))]',
        'md:pl-[max(1.5rem,env(safe-area-inset-left))]',
        'md:pr-[max(1.5rem,env(safe-area-inset-right))]',
      )}
    >
      <div
        className={cn(
          'grid gap-[calc(1.25rem*var(--shell-scale))]',
          'sm:grid-cols-2 sm:gap-[calc(1.5rem*var(--shell-scale))]',
          'md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]',
          'md:items-start md:gap-[calc(2rem*var(--shell-scale))]',
        )}
      >
        <div className="min-w-0">
          <h2
            className={cn(
              'font-semibold tracking-wide text-foreground-muted uppercase',
              'text-[length:calc(0.75rem*var(--shell-scale))]',
            )}
          >
            {t('footer.quickLinks')}
          </h2>
          <nav
            className={cn(
              'grid grid-cols-2',
              'mt-[calc(0.625rem*var(--shell-scale))]',
              'gap-x-[calc(1rem*var(--shell-scale))]',
              'gap-y-[calc(0.375rem*var(--shell-scale))]',
              'sm:grid-cols-3',
              'md:grid-cols-4',
            )}
            aria-label={t('footer.quickLinks')}
          >
            {navItems.map(({ to, labelKey }) => (
              <Link
                key={to}
                to={to}
                className="font-medium text-foreground transition-colors hover:text-accent text-[length:calc(0.875rem*var(--shell-scale))]"
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="min-w-0">
          <h2
            className={cn(
              'font-semibold tracking-wide text-foreground-muted uppercase',
              'text-[length:calc(0.75rem*var(--shell-scale))]',
            )}
          >
            {t('footer.contact')}
          </h2>
          <ul
            className={cn(
              'mt-[calc(0.625rem*var(--shell-scale))]',
              'flex flex-col gap-[calc(0.375rem*var(--shell-scale))]',
              'sm:gap-[calc(0.5rem*var(--shell-scale))]',
            )}
          >
            {contactItems.map(({ key, icon: Icon, href }) => {
              const value = t(`footer.${key}`)
              const link = typeof href === 'function' ? href(value) : null

              return (
                <li
                  key={key}
                  className="flex min-w-0 items-center gap-[calc(0.5rem*var(--shell-scale))] text-foreground text-[length:calc(0.875rem*var(--shell-scale))]"
                >
                  <Icon
                    className="h-[calc(1rem*var(--shell-scale))] w-[calc(1rem*var(--shell-scale))] shrink-0 text-accent"
                    aria-hidden
                  />
                  {link ? (
                    <a
                      href={link}
                      className="min-w-0 truncate font-medium transition-colors hover:text-accent"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="min-w-0 truncate font-medium">{value}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
