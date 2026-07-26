import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Phone } from 'lucide-react'
import logo from '../../assets/logo.png'
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
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        '-mx-4 mt-10 border-t border-border bg-surface',
        'px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]',
        'sm:-mx-5 sm:px-5',
        'md:-mx-6 md:mt-14 md:px-6 md:pt-10 md:pb-8',
      )}
    >
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 lg:gap-14">
        <div className="min-w-0">
          <Link to="/" className="inline-flex items-center gap-3 text-foreground">
            <img className="h-9 w-auto object-contain" src={logo} alt={t('brand.logoAlt')} />
            <span className="font-black tracking-tight">{t('brand.header')}</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
            {t('footer.quickLinks')}
          </h2>
          <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5" aria-label={t('footer.quickLinks')}>
            {navItems.map(({ to, labelKey }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
            {t('footer.contact')}
          </h2>
          <ul className="mt-4 space-y-3">
            {contactItems.map(({ key, icon: Icon, href }) => {
              const value = t(`footer.${key}`)
              const link = typeof href === 'function' ? href(value) : null

              return (
                <li key={key} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {link ? (
                    <a
                      href={link}
                      className="font-medium transition-colors hover:text-accent"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-medium">{value}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-6 md:hidden">
        <Link to="/" className="inline-flex items-center gap-2.5 self-start text-foreground">
          <img className="h-8 w-auto object-contain" src={logo} alt={t('brand.logoAlt')} />
          <span className="text-sm font-black tracking-tight">{t('brand.header')}</span>
        </Link>

        <p className="text-sm leading-relaxed text-foreground-muted">{t('footer.tagline')}</p>

        <ul className="space-y-3 border-y border-border py-5">
          {contactItems.map(({ key, icon: Icon, href }) => {
            const value = t(`footer.${key}`)
            const link = typeof href === 'function' ? href(value) : null

            return (
              <li key={key}>
                {link ? (
                  <a
                    href={link}
                    className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-control text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {value}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-control text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {value}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <nav aria-label={t('footer.quickLinks')}>
          <p className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
            {t('footer.quickLinks')}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            {navItems.map(({ to, labelKey }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {t(labelKey)}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="mt-8 border-t border-border pt-5 md:mt-10">
        <p className="text-center text-xs text-foreground-muted md:text-left">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  )
}
